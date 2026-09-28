import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger(__name__)

# Initialize Motor Async Client
client = AsyncIOMotorClient(settings.get_mongo_url(), serverSelectionTimeoutMS=2000)
database = client[settings.DATABASE_NAME]

# Expose collections directly
predictions_collection = database["predictions"]
users_collection = database["users"]

async def ping_database() -> bool:
    """Check if MongoDB server is reachable."""
    try:
        await client.admin.command("ping")
        return True
    except Exception as e:
        logger.warning("MongoDB ping failed: %s", str(e))
        return False

async def close_database():
    """Close MongoDB connection gracefully."""
    logger.info("Closing MongoDB connection...")
    client.close()
    logger.info("MongoDB connection closed.")
