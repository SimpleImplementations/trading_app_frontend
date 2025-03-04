import { BrowserRouter, Link, Route, Routes } from "react-router";
import MarketDataPage from "./MarketDataPage";
import CandlestickChartPage from "./CandlestickChartPage";

function HomePage() {
  return (
    <>
      <h1>Market Data App</h1>
      <p>Click on Market Data to view the dashboard</p>
    </>
  );
}

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
