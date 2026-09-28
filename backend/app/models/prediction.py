from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class PredictionRecord(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    filename: str
    disease_name: str
    scientific_name: Optional[str] = None
    confidence: float
    severity: str
    symptoms: List[str] = []
    treatments: Dict[str, Any] = {}
    is_mock: bool = False
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
