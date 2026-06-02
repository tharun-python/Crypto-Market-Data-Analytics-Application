from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import MarketData
from app.schemas import MarketResponse

router = APIRouter(tags=["History"])


@router.get("/history", response_model=list[MarketResponse])
def history(
    symbol: str = Query(...),
    limit: int = Query(100),
    db: Session = Depends(get_db)
):
    records = (
        db.query(MarketData)
        .filter(MarketData.symbol == symbol.upper())
        .order_by(MarketData.timestamp.desc())
        .limit(limit)
        .all()
    )

    return list(reversed(records))