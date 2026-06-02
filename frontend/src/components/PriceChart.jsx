import { useState, useMemo } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

function PriceChart({ selectedSymbol, setSelectedSymbol, markets, historyData = [] }) {
  const [range, setRange] = useState("1D");

  const selectedCoin = markets.find((item) => item.symbol === selectedSymbol);
  const base = selectedCoin?.price || 1000;

  const chartData = useMemo(() => {
    if (!historyData || historyData.length === 0) {
      return getFallbackData(base, range);
    }

    const points = historyData.map((item) => ({
      label: formatHistoryLabel(item.timestamp, range),
      price: item.price,
    }));

    const visiblePoints = getRangePoints(points, range);

    return visiblePoints.map((item, index) => ({
      ...item,
      ma: calculateMovingAverage(visiblePoints, index, 5),
    }));
  }, [historyData, base, range]);

  return (
    <div className="panel price-panel">
      <div className="panel-head">
        <div>
          <h2>{selectedSymbol} / USD — Price Chart</h2>
          <p>Moving average crossover · {range} window</p>
        </div>

        <div className="chart-controls">
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="coin-select"
          >
            {markets.map((item) => (
              <option key={item.symbol} value={item.symbol}>
                {item.symbol}
              </option>
            ))}
          </select>

          <div className="tabs">
            {["1D", "7D", "1M"].map((item) => (
              <button
                key={item}
                className={`tab ${range === item ? "active" : ""}`}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={chartData}>
          <CartesianGrid stroke="#3c3c39" strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="#9b9b96" />

          <YAxis
            stroke="#9b9b96"
            domain={["dataMin - 10", "dataMax + 10"]}
            tickFormatter={(value) => `$${formatChartValue(value)}`}
          />

          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(4)}`, "Price"]}
            contentStyle={{
              background: "#222",
              border: "1px solid #444",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="price"
            fill="#1fb386"
            fillOpacity={0.12}
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22b386"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#22b386",
              stroke: "#dff5ef",
              strokeWidth: 2,
            }}
          />

          <Line
            type="monotone"
            dataKey="ma"
            stroke="#e0aa3e"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function getRangePoints(points, range) {
  if (range === "1D") return points.slice(-8);
  if (range === "7D") return points.slice(-14);
  return points.slice(-30);
}

function calculateMovingAverage(points, index, windowSize) {
  const start = Math.max(0, index - windowSize + 1);
  const slice = points.slice(start, index + 1);
  return slice.reduce((sum, item) => sum + item.price, 0) / slice.length;
}

function formatHistoryLabel(timestamp, range) {
  const date = new Date(timestamp);
  if (range === "1D") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getFallbackData(base, range) {
  if (range === "1D") {
    return [
      { label: "10AM", price: base * 0.96, ma: base * 0.95 },
      { label: "11AM", price: base * 0.99, ma: base * 0.96 },
      { label: "12PM", price: base * 0.98, ma: base * 0.97 },
      { label: "1PM", price: base * 1.01, ma: base * 0.98 },
      { label: "2PM", price: base * 1.03, ma: base * 0.99 },
      { label: "3PM", price: base * 1.05, ma: base * 1.01 },
      { label: "4PM", price: base * 1.06, ma: base * 1.02 },
    ];
  }

  if (range === "7D") {
    return [
      { label: "Mon", price: base * 0.94, ma: base * 0.93 },
      { label: "Tue", price: base * 0.97, ma: base * 0.94 },
      { label: "Wed", price: base * 0.96, ma: base * 0.95 },
      { label: "Thu", price: base * 0.99, ma: base * 0.96 },
      { label: "Fri", price: base * 1.02, ma: base * 0.98 },
      { label: "Sat", price: base * 1.05, ma: base * 1.0 },
      { label: "Sun", price: base * 1.06, ma: base * 1.02 },
    ];
  }

  return [
    { label: "W1", price: base * 0.9, ma: base * 0.89 },
    { label: "W2", price: base * 0.94, ma: base * 0.91 },
    { label: "W3", price: base * 0.98, ma: base * 0.94 },
    { label: "W4", price: base * 1.01, ma: base * 0.96 },
    { label: "W5", price: base * 0.99, ma: base * 0.98 },
    { label: "W6", price: base * 1.04, ma: base * 1.0 },
    { label: "W7", price: base * 1.07, ma: base * 1.03 },
  ];
}

function formatChartValue(value) {
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  if (value >= 1) return Number(value).toFixed(2);
  return Number(value).toFixed(4);
}

export default PriceChart;