from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.analytics_service import get_analytics_data

router = APIRouter(tags=["Analytics"])


@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):
    return get_analytics_data(db)