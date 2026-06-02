import { useCallback, useEffect, useState } from "react";

import API from "../api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import PriceChart from "../components/PriceChart";
import VolumeChart from "../components/VolumeChart";
import SignalCard from "../components/SignalCard";

function Dashboard() {
  const [markets, setMarkets] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [signals, setSignals] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");

  const loadData = useCallback(async () => {
    try {
      const marketRes = await API.get("/markets");
      setMarkets(marketRes.data || []);

      const analyticsRes = await API.get("/analytics");
      setAnalytics(analyticsRes.data || []);

      const signalRes = await API.get("/strategy/results");
      setSignals((signalRes.data || []).slice(0, 5));
    } catch (error) {
      console.log("API Error:", error);
    }
  }, []);

  const refreshData = async () => {
    await API.post("/refresh");
    await loadData();
  };

  const runStrategy = async () => {
    await API.post("/strategy/run");
    await loadData();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadData]);

  const selectedCoin = markets.find((item) => item.symbol === selectedSymbol);

  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        <Topbar onRefresh={refreshData} onRunStrategy={runStrategy} />

        <section className="stats">
          <StatCard title="Total Assets" value={markets.length} change="+ Live data" />

          <StatCard
            title="24h Volume"
            value={`$${formatNumber(selectedCoin?.volume || 0)}`}
            change={`+ ${selectedSymbol} volume`}
          />

          <StatCard
            title={`${selectedSymbol} Price`}
            value={`$${selectedCoin?.price || 0}`}
            change="+ Live price"
          />

          <StatCard
            title="Active Signals"
            value={signals.length}
            change="BUY · SELL · HOLD"
          />
        </section>

        <section className="dashboard-grid">
          <PriceChart
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
            markets={markets}
          />

          <div className="panel signal-panel">
            <div className="panel-head">
              <h2>Strategy Signals</h2>
              <span className="ma-pill">MA Crossover</span>
            </div>

            {signals.length === 0 && <p>No signals yet. Click Run Strategy.</p>}

            {signals.map((item, index) => (
              <SignalCard key={index} signal={item} />
            ))}
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel assets-panel">
            <div className="panel-head">
              <h2>Top 10 Assets</h2>
              <span className="api-pill">GET /markets</span>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asset</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((item, index) => (
                  <tr
                    key={item.id || index}
                    onClick={() => setSelectedSymbol(item.symbol)}
                    className={selectedSymbol === item.symbol ? "active-row" : ""}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <span className="coin">{item.symbol?.[0] || "?"}</span>
                      {item.symbol}
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <VolumeChart data={analytics} />
        </section>
      </main>
    </div>
  );
}

function formatNumber(num) {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  return num;
}

export default Dashboard;