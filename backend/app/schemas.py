from pydantic import BaseModel
from datetime import datetime


class MarketResponse(BaseModel):
    symbol: str
    name: str
    price: float
    volume: float
    timestamp: datetime

    class Config:
        from_attributes = True


class StrategyResponse(BaseModel):
    symbol: str
    signal: str
    reason: str
    created_at: datetime

    class Config:
        from_attributes = True