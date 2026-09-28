import uuid
from datetime import datetime
from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.schemas.prediction import PredictionResponse, TreatmentDetails
from app.services.ml_service import ml_service
from app.services.treatment_service import treatment_service
from app.database import get_collection

router = APIRouter(prefix="", tags=["Prediction"])

# In-memory storage cache if MongoDB is offline
IN_MEMORY_HISTORY = []

@router.post("/predict", response_model=PredictionResponse)
async def predict_rice_disease(file: UploadFile = File(...)):
    """
    Upload a rice leaf image to predict potential diseases and receive
    tailored organic, chemical, and cultural treatment recommendations.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be a valid image (JPEG, PNG, WEBP, etc.)"
        )

    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empty file uploaded."
            )

        # 1. Run Machine Learning Inference / Heuristic Analysis
        pred_result = ml_service.predict(image_bytes)
        disease_key = pred_result["disease_key"]
        confidence = pred_result["confidence"]
        is_mock = pred_result["is_mock"]

        # 2. Retrieve Treatment Recommendations
        disease_details = treatment_service.get_disease_details(disease_key)

        record_id = str(uuid.uuid4())
        timestamp_str = datetime.utcnow().isoformat()

        response_data = {
            "id": record_id,
            "filename": file.filename or "uploaded_leaf.jpg",
            "disease_name": disease_details["name"],
            "scientific_name": disease_details["scientific_name"],
            "confidence": confidence,
            "severity": disease_details["severity"],
            "description": disease_details["description"],
            "symptoms": disease_details["symptoms"],
            "treatments": TreatmentDetails(**disease_details["treatments"]),
            "is_mock": is_mock,
            "timestamp": timestamp_str
        }

        # 3. Store in MongoDB if available, otherwise in-memory cache
        predictions_col = get_collection("predictions")
        if predictions_col is not None:
            try:
                db_doc = dict(response_data)
                db_doc["_id"] = record_id
                await predictions_col.insert_one(db_doc)
            except Exception as e:
                # Log and fallback to in-memory history
                IN_MEMORY_HISTORY.insert(0, response_data)
        else:
            IN_MEMORY_HISTORY.insert(0, response_data)

        return response_data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the image: {str(e)}"
        )
