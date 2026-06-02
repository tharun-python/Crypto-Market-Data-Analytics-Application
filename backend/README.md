# CryptoLens Backend

FastAPI backend for the CryptoLens dashboard.

## Requirements

- Python 3.11+
- Dependencies installed from `requirements.txt`

## Run

```powershell
cd "c:\Users\ADMIN\Desktop\interview task\backend"
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - health route
- `GET /markets` - latest market list
- `GET /history?symbol=BTC&limit=30` - price history
- `GET /analytics` - trend and volume analytics
- `POST /refresh` - refresh CoinGecko market feed
- `POST /strategy/run` - execute MA crossover strategy
- `GET /strategy/results` - strategy signals
