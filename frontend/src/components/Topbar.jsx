import { RefreshCw, Play } from "lucide-react";

function Topbar({ onRefresh, onRunStrategy }) {
  return (
    <header className="topbar">
      <div className="title-wrap">
        <h1>Dashboard<span className="live-dot"></span></h1>
        <p>Live · Updated now</p>
      </div>

      <div className="top-actions">
        <button onClick={onRefresh}>
          <RefreshCw size={18} />
          Refresh
        </button>

        <button onClick={onRunStrategy} className="run-btn">
          <Play size={18} />
          Run Strategy
        </button>
      </div>
    </header>
  );
}

export default Topbar;