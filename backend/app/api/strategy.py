from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import StrategyResult
from app.schemas import StrategyResponse
from app.services.strategy_service import run_strategy_logic

router = APIRouter(tags=["Strategy"])


@router.post("/strategy/run")
def run_strategy(db: Session = Depends(get_db)):
    return run_strategy_logic(db)


@router.get("/strategy/results", response_model=list[StrategyResponse])
def strategy_results(db: Session = Depends(get_db)):
    return (
        db.query(StrategyResult)
        .order_by(StrategyResult.created_at.desc())
        .all()
    )