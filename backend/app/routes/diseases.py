from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.prediction import DiseaseInfoResponse
from app.services.treatment_service import treatment_service

router = APIRouter(prefix="", tags=["Diseases"])

@router.get("/diseases", response_model=List[DiseaseInfoResponse])
async def get_all_diseases():
    """
    Retrieve comprehensive knowledge base and management guides for all rice leaf diseases.
    """
    diseases = treatment_service.list_all_diseases()
    return diseases

@router.get("/diseases/{disease_id}", response_model=DiseaseInfoResponse)
async def get_disease_by_id(disease_id: str):
    """
    Retrieve specific disease details and treatment protocols by disease ID.
    """
    details = treatment_service.get_disease_details(disease_id)
    if not details or details.get("id") != disease_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disease '{disease_id}' not found."
        )
    return details
