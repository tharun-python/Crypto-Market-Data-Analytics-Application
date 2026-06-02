import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import PriceHistory from "./pages/PriceHistory";
import Analytics from "./pages/Analytics";
import Strategy from "./pages/Strategy";
import Signals from "./pages/Signals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/price-history" element={<PriceHistory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/signals" element={<Signals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;