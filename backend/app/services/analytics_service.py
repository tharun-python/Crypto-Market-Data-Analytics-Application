import pandas as pd
from sqlalchemy.orm import Session
from app.models import MarketData


def get_analytics_data(db: Session):
    records = db.query(MarketData).all()

    if not records:
        return []

    data = []

    for item in records:
        data.append({
            "symbol": item.symbol,
            "name": item.name,
            "price": item.price,
            "volume": item.volume,
            "timestamp": item.timestamp
        })

    df = pd.DataFrame(data)
    output = []

    for symbol in df["symbol"].unique():
        coin_df = df[df["symbol"] == symbol].sort_values("timestamp")

        if len(coin_df) < 2:
            continue

        first = coin_df.iloc[0]
        last = coin_df.iloc[-1]

        price_change = ((last["price"] - first["price"]) / first["price"]) * 100
        volume_change = ((last["volume"] - first["volume"]) / first["volume"]) * 100

        if price_change > 1:
            trend = "UP"
        elif price_change < -1:
            trend = "DOWN"
        else:
            trend = "SIDEWAYS"

        output.append({
            "symbol": symbol,
            "name": last["name"],
            "current_price": round(last["price"], 2),
            "current_volume": round(last["volume"], 2),
            "price_change_percent": round(price_change, 2),
            "volume_change_percent": round(volume_change, 2),
            "trend": trend
        })

    return sorted(output, key=lambda x: x["price_change_percent"], reverse=True)