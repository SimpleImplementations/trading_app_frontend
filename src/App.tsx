import { BrowserRouter, Link, Route, Routes } from "react-router";
import MarketDataPage from "./pages/MarketDataPage";
import CandlestickChartPage from "./pages/CandlestickChartPage";
import HomePage from "./pages/HomePage";
import DataPoller from "./pages/DataPoller";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link> |<Link to="/market-data">Market Data</Link> |
          <Link to="/chart">Candlestick Chart</Link> |<Link to="/data-poller">Data Poller</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market-data" element={<MarketDataPage />} />
            <Route path="/chart" element={<CandlestickChartPage />} />
            <Route path="/data-poller" element={<DataPoller />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
