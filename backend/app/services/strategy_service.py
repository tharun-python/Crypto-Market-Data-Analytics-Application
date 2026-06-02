from sqlalchemy.orm import Session
from app.models import MarketData, StrategyResult


def run_strategy_logic(db: Session):
    symbols = db.query(MarketData.symbol).distinct().all()
    results = []

    for item in symbols:
        symbol = item[0]

        history = (
            db.query(MarketData)
            .filter(MarketData.symbol == symbol)
            .order_by(MarketData.timestamp.desc())
            .limit(20)
            .all()
        )

        if len(history) < 5:
            signal = "HOLD"
            reason = "Not enough historical data"
        else:
            prices = [h.price for h in reversed(history)]

            short_ma = sum(prices[-5:]) / 5
            long_ma = sum(prices) / len(prices)

            if short_ma > long_ma:
                signal = "BUY"
                reason = "Short moving average is above long moving average"
            elif short_ma < long_ma:
                signal = "SELL"
                reason = "Short moving average is below long moving average"
            else:
                signal = "HOLD"
                reason = "No clear trend"

        result = StrategyResult(
            symbol=symbol,
            signal=signal,
            reason=reason
        )

        db.add(result)
        results.append(result)

    db.commit()

    return {
        "message": "Strategy executed successfully",
        "results": [
            {
                "symbol": r.symbol,
                "signal": r.signal,
                "reason": r.reason
            }
            for r in results
        ]
    }