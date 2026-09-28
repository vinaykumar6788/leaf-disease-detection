import hashlib
import logging
from datetime import datetime
from typing import Dict, Any, Optional
from fastapi import APIRouter, File, UploadFile, Form, HTTPException, status

try:
    from bson import ObjectId
except ImportError:
    import uuid
    class ObjectId:  # type: ignore
        def __init__(self, val=None):
            self._val = str(val) if val else uuid.uuid4().hex[:24]
        def __str__(self):
            return self._val
        def __repr__(self):
            return f"ObjectId('{self._val}')"

from app.services.cnn_service import cnn_service
from app.services.weather_service import weather_service
from app.services.recommendation_service import recommendation_service
from app.database import predictions_collection

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["Prediction"])

# In-memory history fallback when MongoDB is offline
IN_MEMORY_PREDICTIONS = []

@router.post("/predict")
async def predict_rice_disease(
    file: UploadFile = File(..., description="Rice leaf image file"),
    latitude: float = Form(default=25.3176, description="Field location latitude"),
    longitude: float = Form(default=82.9739, description="Field location longitude")
) -> Dict[str, Any]:
    """
    Predict rice leaf disease from uploaded image, fetch localized weather,
    compute risk score, and return targeted IPM treatment plan.
    """
    # 1. Validate image content type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Uploaded file must be an image (JPEG, PNG, WEBP)."
        )

    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empty image file provided."
            )

        filename = file.filename or "uploaded_leaf.jpg"
        img_hash = hashlib.sha256(image_bytes).hexdigest()[:12]
        seed_key = f"{filename}_{img_hash}"

        # 2. Run CNN Disease Classification
        cnn_result = cnn_service.predict(image_bytes, filename=filename)
        disease = cnn_result["disease"]
        confidence = cnn_result["confidence"]
        all_probabilities = cnn_result["all_probabilities"]

        # 3. Retrieve Micro-climate Weather Data seeded by image and disease
        weather_data = await weather_service.get_weather(
            lat=latitude,
            lon=longitude,
            seed_key=seed_key,
            disease=disease
        )

        # 4. Assess Environmental Risk Level and Prescribe Single Consistent Treatment
        rec_result = recommendation_service.assess(
            disease=disease,
            weather=weather_data,
            cnn_confidence=confidence
        )
        risk_level = rec_result["risk_level"]
        treatment = rec_result["treatment"]

        # 5. Insert Full Document into predictions_collection
        doc_id = ObjectId()
        now = datetime.utcnow()

        db_doc = {
            "_id": doc_id,
            "filename": filename,
            "disease": disease,
            "confidence": confidence,
            "all_probabilities": all_probabilities,
            "risk_level": risk_level,
            "treatment": treatment,
            "weather": weather_data,
            "created_at": now
        }

        try:
            await predictions_collection.insert_one(db_doc)
        except Exception as db_err:
            logger.warning("MongoDB insert failed (%s). Saving to in-memory fallback.", str(db_err))
            IN_MEMORY_PREDICTIONS.insert(0, {
                "id": str(doc_id),
                "filename": filename,
                "disease": disease,
                "confidence": confidence,
                "all_probabilities": all_probabilities,
                "risk_level": risk_level,
                "treatment": treatment,
                "weather": weather_data,
                "created_at": now.isoformat()
            })

        # 6. Return response JSON
        return {
            "id": str(doc_id),
            "filename": filename,
            "disease": disease,
            "confidence": confidence,
            "all_probabilities": all_probabilities,
            "risk_level": risk_level,
            "treatment": treatment,
            "weather": weather_data,
            "created_at": now.isoformat()
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error during disease diagnosis pipeline: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing leaf image: {str(e)}"
        )
