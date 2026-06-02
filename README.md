# CryptoLens

CryptoLens is a modern cryptocurrency market analytics dashboard with a React + Vite frontend and a FastAPI backend.

## Features

- Responsive dark-themed dashboard
- Market data from CoinGecko
- Price history charts and volume analytics
- Moving average crossover strategy signals
- Refresh and run strategy endpoints
- SQLite database persistence with SQLAlchemy
- Scheduled background refresh every 5 minutes

## Folder structure

- `backend/` - FastAPI backend code and SQLite database
- `frontend/` - React + Vite dashboard UI

## Install and run

### Backend

```powershell
cd "c:\Users\ADMIN\Desktop\interview task\backend"
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```powershell
cd "c:\Users\ADMIN\Desktop\interview task\frontend"
npm install
npm run dev
```

## API

- `GET /markets`
- `GET /history?symbol=BTC&limit=30`
- `GET /analytics`
- `POST /refresh`
- `POST /strategy/run`
- `GET /strategy/results`
