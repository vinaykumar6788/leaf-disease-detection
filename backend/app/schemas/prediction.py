from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TreatmentDetails(BaseModel):
    organic: List[str] = Field(default_factory=list, description="Organic & biological remedies")
    chemical: List[str] = Field(default_factory=list, description="Targeted chemical controls and fungicides/bactericides")
    cultural: List[str] = Field(default_factory=list, description="Agronomic practices and water management")
    prevention: List[str] = Field(default_factory=list, description="Preventive measures for future seasons")

class PredictionResponse(BaseModel):
    id: Optional[str] = None
    filename: str
    disease_name: str
    scientific_name: str
    confidence: float
    severity: str
    description: str
    symptoms: List[str]
    treatments: TreatmentDetails
    is_mock: bool = False
    timestamp: str

class DiseaseInfoResponse(BaseModel):
    id: str
    name: str
    scientific_name: str
    pathogen_type: str
    description: str
    symptoms: List[str]
    favorable_conditions: str
    treatments: TreatmentDetails

class WeatherAdvisoryResponse(BaseModel):
    city: str
    temperature: float
    humidity: float
    condition: str
    wind_speed: float
    rainfall_probability: float
    disease_risk_level: str
    advisory: str
    high_risk_diseases: List[str]

class HealthResponse(BaseModel):
    status: str
    database_connected: bool
    model_loaded: bool
    version: str
