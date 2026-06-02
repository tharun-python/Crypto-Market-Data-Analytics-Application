import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import SignalCard from "../components/SignalCard";

function Signals() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    API.get("/strategy/results").then((res) => setSignals(res.data));
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="main page">
        <h1>Signals</h1>

        <div className="panel">
          {signals.map((item, index) => (
            <SignalCard key={index} signal={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Signals;