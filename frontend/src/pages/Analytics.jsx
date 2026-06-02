import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    API.get("/analytics").then((res) => setAnalytics(res.data));
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="main page">
        <h1>Analytics</h1>

        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price Change %</th>
                <th>Volume Change %</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((item, index) => (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{item.price_change_percent}%</td>
                  <td>{item.volume_change_percent}%</td>
                  <td>{item.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Analytics;