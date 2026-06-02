from apscheduler.schedulers.background import BackgroundScheduler
from app.database import SessionLocal
from app.services.coingecko_service import fetch_market_data


def scheduled_fetch():
    db = SessionLocal()
    try:
        fetch_market_data(db)
    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(scheduled_fetch, "interval", minutes=5)
    scheduler.start()