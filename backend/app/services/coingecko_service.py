import requests
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import settings
from app.models import MarketData

COINGECKO_URL = f"{settings.COINGECKO_BASE_URL}/coins/markets"


def fetch_market_data(db: Session):
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": settings.TOP_COINS_LIMIT,
        "page": 1,
        "sparkline": "false"
    }

    response = requests.get(COINGECKO_URL, params=params, timeout=10)
    response.raise_for_status()

    coins = response.json()

    for coin in coins:
        market = MarketData(
            symbol=coin["symbol"].upper(),
            name=coin["name"],
            price=coin["current_price"],
            volume=coin["total_volume"],
            timestamp=datetime.utcnow()
        )
        db.add(market)

    db.commit()

    return {
        "message": "Market data fetched successfully",
        "count": len(coins)
    }


def get_latest_markets(db: Session):
    symbols = db.query(MarketData.symbol).distinct().all()
    result = []

    for item in symbols:
        symbol = item[0]

        latest = (
            db.query(MarketData)
            .filter(MarketData.symbol == symbol)
            .order_by(MarketData.timestamp.desc())
            .first()
        )

        if latest:
            result.append(latest)

    return result