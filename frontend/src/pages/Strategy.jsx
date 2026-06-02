import { useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Strategy() {
  const [result, setResult] = useState([]);

  const runStrategy = async () => {
    const res = await API.post("/strategy/run");
    setResult(res.data.results);
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main page">
        <h1>Strategy</h1>

        <button onClick={runStrategy}>Run Strategy</button>

        <div className="panel mt">
          {result.map((item, index) => (
            <div className="signal-item" key={index}>
              <div>
                <h3>{item.symbol}</h3>
                <p>{item.reason}</p>
              </div>
              <span className={`badge ${item.signal.toLowerCase()}`}>
                {item.signal}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Strategy;