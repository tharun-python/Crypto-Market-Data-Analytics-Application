import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Markets() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    API.get("/markets").then((res) => setMarkets(res.data));
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="main page">
        <h1>Markets</h1>

        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Markets;