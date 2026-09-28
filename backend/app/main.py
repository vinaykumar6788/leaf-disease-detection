import sys
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure UTF-8 output encoding on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.routes import predict, weather, history
from app.database import ping_database, close_database

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("rice-guard")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event
    try:
        print("🚀 RiceGuard API started")
    except UnicodeEncodeError:
        print("[*] RiceGuard API started")
    logger.info("RiceGuard API started")
    yield
    # Shutdown event
    await close_database()
    logger.info("RiceGuard Backend shutdown complete.")

app = FastAPI(
    title="RiceGuard API",
    version="1.0.0",
    description="AI-Based Early Rice Leaf Disease Detection and Treatment Recommendation System",
    lifespan=lifespan
)

# CORS middleware allowing localhost and local network access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers under /api prefix
app.include_router(predict.router)
app.include_router(weather.router)
app.include_router(history.router)

@app.get("/")
async def root():
    return {"status": "RiceGuard API running"}

@app.get("/health")
async def health_check():
    db_status = await ping_database()
    return {
        "status": "healthy",
        "database": "connected" if db_status else "disconnected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
