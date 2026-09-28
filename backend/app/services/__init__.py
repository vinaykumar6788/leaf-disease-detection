from app.services.cnn_service import cnn_service, CNNService
from app.services.weather_service import weather_service, WeatherService
from app.services.recommendation_service import recommendation_service, RecommendationService
from app.services.treatment_service import treatment_service

__all__ = [
    "cnn_service",
    "CNNService",
    "weather_service",
    "WeatherService",
    "recommendation_service",
    "RecommendationService",
    "treatment_service"
]
