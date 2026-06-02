from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import MarketData
from app.schemas import MarketResponse
from app.services.coingecko_service import fetch_market_data, get_latest_markets

router = APIRouter(tags=["Markets"])


@router.post("/refresh")
def refresh_data(db: Session = Depends(get_db)):
    return fetch_market_data(db)


@router.get("/markets", response_model=list[MarketResponse])
def markets(db: Session = Depends(get_db)):
    return get_latest_markets(db)


@router.get("/prices", response_model=MarketResponse)
def prices(symbol: str = Query(...), db: Session = Depends(get_db)):
    latest = (
        db.query(MarketData)
        .filter(MarketData.symbol == symbol.upper())
        .order_by(MarketData.timestamp.desc())
        .first()
    )

    if not latest:
        raise HTTPException(status_code=404, detail="Symbol not found")

    return latest