from datetime import datetime
from typing import List, Dict, Any
from fastapi import APIRouter, Query, HTTPException, status
from app.database import predictions_collection
from app.routes.predict import IN_MEMORY_PREDICTIONS

router = APIRouter(prefix="/api", tags=["History"])

@router.get("/history", response_model=List[Dict[str, Any]])
async def get_prediction_history(
    limit: int = Query(default=20, ge=1, le=100, description="Number of past predictions to retrieve")
) -> List[Dict[str, Any]]:
    """
    Retrieve past leaf disease predictions and advisories from MongoDB,
    sorted chronologically in descending order.
    """
    try:
        cursor = predictions_collection.find().sort("created_at", -1).limit(limit)
        records = await cursor.to_list(length=limit)
        if records:
            result = []
            for doc in records:
                item = dict(doc)
                if "_id" in item:
                    item["id"] = str(item["_id"])
                    del item["_id"]
                if "created_at" in item and isinstance(item["created_at"], datetime):
                    item["created_at"] = item["created_at"].isoformat()
                result.append(item)
            return result
    except Exception:
        pass

    # In-memory history fallback when MongoDB is offline
    return IN_MEMORY_PREDICTIONS[:limit]

@router.delete("/history/{record_id}")
async def delete_prediction_history_record(record_id: str):
    """
    Delete a specific prediction history record.
    """
    try:
        result = await predictions_collection.delete_one({"$or": [{"_id": record_id}, {"id": record_id}]})
        if result.deleted_count > 0:
            return {"message": "Record successfully removed."}
    except Exception:
        pass

    # Delete from in-memory fallback
    global IN_MEMORY_PREDICTIONS
    original_len = len(IN_MEMORY_PREDICTIONS)
    IN_MEMORY_PREDICTIONS = [r for r in IN_MEMORY_PREDICTIONS if r.get("id") != record_id]
    if len(IN_MEMORY_PREDICTIONS) < original_len:
        return {"message": "Record successfully removed."}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Prediction record not found."
    )
