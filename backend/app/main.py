from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.api import markets, history, analytics, strategy
from app.jobs.scheduler import start_scheduler

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Crypto Market Data Analytics API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(markets.router)
app.include_router(history.router)
app.include_router(analytics.router)
app.include_router(strategy.router)


@app.on_event("startup")
def startup_event():
    start_scheduler()


@app.get("/")
def home():
    return {
        "message": "Crypto Market Analytics Backend Running"
    }