from typing import Dict, Any
from fastapi import APIRouter, Query
from app.services.weather_service import weather_service

router = APIRouter(prefix="/api", tags=["Weather"])

@router.get("/weather")
async def get_weather_data(
    lat: float = Query(default=25.3176, description="Latitude of crop region"),
    lon: float = Query(default=82.9739, description="Longitude of crop region")
) -> Dict[str, Any]:
    """
    Get live or simulated micro-meteorological conditions (temperature, humidity, rainfall, wind) for given coordinates.
    """
    weather = await weather_service.get_weather(lat=lat, lon=lon)
    return weather
