import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function VolumeChart({ data }) {
  return (
    <div className="panel volume-panel">
      <div className="panel-head">
        <h2>Volume Analytics</h2>
        <span className="api-pill">GET /analytics</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="symbol" stroke="#9b9b96" />
          <YAxis stroke="#9b9b96" />
          <Tooltip />
          <Bar dataKey="current_volume" fill="#22b386" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;