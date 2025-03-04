import { BrowserRouter, Link, Route, Routes } from "react-router";
import MarketDataPage from "./pages/MarketDataPage";
import CandlestickChartPage from "./pages/CandlestickChartPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link> |<Link to="/market-data">Market Data</Link> |
          <Link to="/chart">Candlestick Chart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market-data" element={<MarketDataPage />} />
          <Route path="/chart" element={<CandlestickChartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
