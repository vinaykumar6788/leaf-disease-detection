from datetime import datetime
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field

class WeatherData(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Relative humidity percentage")
    rainfall: float = Field(default=0.0, description="Rainfall volume (mm) or precipitation probability")
    wind_speed: float = Field(default=0.0, description="Wind speed in meters per second")
    description: str = Field(default="Clear", description="Weather condition description")

class PredictionResponse(BaseModel):
    id: Optional[str] = Field(default=None, description="Unique prediction record ID")
    disease: str = Field(..., description="Detected rice leaf disease or condition")
    confidence: float = Field(..., description="Prediction confidence score in percentage")
    all_probabilities: Dict[str, float] = Field(default_factory=dict, description="Class probabilities for all known diseases")
    risk_level: str = Field(..., description="Severity or risk level (e.g. Low, Moderate, High, Severe, Healthy)")
    treatment: Union[List[str], Dict[str, Any], Any] = Field(default_factory=list, description="Recommended organic, chemical, and cultural treatments")
    weather: Optional[WeatherData] = Field(default=None, description="Micro-climate weather data at diagnosis time")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of diagnosis")

class PredictionRecord(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    filename: Optional[str] = Field(default="leaf.jpg", description="Uploaded leaf image file name")
    disease: str
    confidence: float
    all_probabilities: Dict[str, float] = Field(default_factory=dict)
    risk_level: str
    treatment: Union[List[str], Dict[str, Any], Any] = Field(default_factory=list)
    weather: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
