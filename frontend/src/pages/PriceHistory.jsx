import { useEffect, useState } from "react";

import API from "../api";
import Sidebar from "../components/Sidebar";
import PriceChart from "../components/PriceChart";

function PriceHistory() {
  const [markets, setMarkets] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    API.get("/markets")
      .then((res) => {
        const marketList = res.data || [];
        setMarkets(marketList);

        if (marketList.length && !marketList.some((item) => item.symbol === selectedSymbol)) {
          setSelectedSymbol(marketList[0].symbol);
        }
      })
      .catch((err) => console.log("Markets Error:", err));
  }, [selectedSymbol]);

  useEffect(() => {
    if (!selectedSymbol) return;

    API.get("/history", {
      params: { symbol: selectedSymbol, limit: 30 },
    })
      .then((res) => setHistoryData(res.data || []))
      .catch((err) => console.log("History Error:", err));
  }, [selectedSymbol]);

  return (
    <div className="layout">
      <Sidebar />

      <main className="main page">
        <h1>Price History</h1>

        <PriceChart
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
          markets={markets}
          historyData={historyData}
        />
      </main>
    </div>
  );
}

export default PriceHistory;