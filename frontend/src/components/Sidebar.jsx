import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Clock,
  BarChart3,
  Bot,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <SlidersHorizontal size={20} />
        </div>
        <div>
          <h2>CryptoLens</h2>
          <p>Market Analytics</p>
        </div>
      </div>

      <p className="side-title">OVERVIEW</p>

      <NavLink to="/" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/markets" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <TrendingUp size={18} /> Markets
      </NavLink>

      <NavLink to="/price-history" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <Clock size={18} /> Price History
      </NavLink>

      <p className="side-title">ANALYTICS</p>

      <NavLink to="/analytics" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <BarChart3 size={18} /> Analytics
      </NavLink>

      <NavLink to="/strategy" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <Bot size={18} /> Strategy
      </NavLink>

      <NavLink to="/signals" className={({ isActive }) => `nav ${isActive ? "active" : ""}`}>
        <Bell size={18} /> Signals
      </NavLink>
    </aside>
  );
}

export default Sidebar;