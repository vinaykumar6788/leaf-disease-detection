import os
from typing import Optional

try:
    from pydantic_settings import BaseSettings, SettingsConfigDict

    class Settings(BaseSettings):
        MONGODB_URL: str = "mongodb://localhost:27017"
        MONGODB_URI: Optional[str] = None
        DATABASE_NAME: str = "rice_guard_db"
        OPENWEATHER_API_KEY: str = "your_openweather_api_key_here"
        MODEL_PATH: str = "app/ml_models/rice_leaf_model.h5"

        model_config = SettingsConfigDict(
            env_file=".env",
            env_file_encoding="utf-8",
            extra="ignore"
        )

        def get_mongo_url(self) -> str:
            uri = self.MONGODB_URI or self.MONGODB_URL or "mongodb://localhost:27017"
            return uri.strip()

except ImportError:
    # Graceful fallback when pydantic-settings is not yet installed in active environment
    class Settings:  # type: ignore
        MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        MONGODB_URI: Optional[str] = os.getenv("MONGODB_URI")
        DATABASE_NAME: str = os.getenv("DATABASE_NAME", "rice_guard_db")
        OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY", "your_openweather_api_key_here")
        MODEL_PATH: str = os.getenv("MODEL_PATH", "app/ml_models/rice_leaf_model.h5")

        def get_mongo_url(self) -> str:
            uri = self.MONGODB_URI or self.MONGODB_URL or "mongodb://localhost:27017"
            return uri.strip()

settings = Settings()
