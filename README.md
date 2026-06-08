# CryptoLens - Crypto Market Data Analytics Application

## Overview

CryptoLens is a cryptocurrency market analytics application built using React (Vite) for the frontend and FastAPI for the backend. The application fetches cryptocurrency market data, stores it in a local database, performs technical analysis, and presents insights through an interactive dashboard.

---

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Data Source Used

The application uses the CoinGecko API as the primary data source.

Data collected includes:

- Cryptocurrency prices
- Market capitalization
- Trading volume
- Historical price data

API Source:

https://www.coingecko.com/en/api

---

## Architecture Overview

### Frontend

Technology Stack:

- React
- Vite
- Recharts
- Axios

Responsibilities:

- Display market analytics
- Visualize historical price trends
- Show trading signals
- Provide responsive user interface

### Backend

Technology Stack:

- FastAPI
- SQLAlchemy
- SQLite
- APScheduler

Responsibilities:

- Fetch cryptocurrency data
- Store market data
- Generate analytics
- Execute trading strategy
- Expose REST APIs

### Database

SQLite is used for storing:

- Market information
- Historical price records
- Strategy results

### Workflow

1. Fetch market data from CoinGecko.
2. Store data in SQLite database.
3. Calculate analytics and indicators.
4. Generate strategy signals.
5. Display results in dashboard.

---

## Strategy Explanation

### Moving Average Crossover Strategy

The application implements a simple Moving Average (MA) crossover strategy.

#### Buy Signal

Generated when:

```text
Short-Term MA crosses above Long-Term MA
```

This indicates potential upward momentum.

#### Sell Signal

Generated when:

```text
Short-Term MA crosses below Long-Term MA
```

This indicates potential downward momentum.

#### Purpose

The strategy helps identify possible market entry and exit points using historical price trends.

---

## Assumptions and Limitations

### Assumptions

- CoinGecko API is available and returns valid data.
- Internet connection is available during data refresh.
- Historical data is sufficient for moving average calculations.

### Limitations

- Uses a simple technical strategy only.
- No real-time WebSocket market updates.
- SQLite is not ideal for large-scale production workloads.
- Signals should not be considered financial advice.
- API rate limits may affect data availability.

---

## Possible Improvements

Future enhancements may include:

- Real-time market updates using WebSockets
- Multiple technical indicators (RSI, MACD, Bollinger Bands)
- User authentication and personalized watchlists
- Portfolio tracking functionality
- PostgreSQL database support
- Docker deployment
- Cloud hosting and CI/CD pipeline
- Advanced strategy backtesting
- Alert and notification system

---

## API Endpoints

### Market Data

```http
GET /markets
```

Returns cryptocurrency market information.

### Historical Data

```http
GET /history?symbol=BTC&limit=30
```

Returns historical market data.

### Analytics

```http
GET /analytics
```

Returns calculated analytics.

### Refresh Market Data

```http
POST /refresh
```

Fetches latest market information.

### Run Strategy

```http
POST /strategy/run
```

Executes trading strategy.

### Strategy Results

```http
GET /strategy/results
```

Returns generated signals and results.

---

## Project Structure

```text
crypto-market-data-Analytics-application/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── database.db
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Author

Tharun 

Crypto Market Data Analytics Application