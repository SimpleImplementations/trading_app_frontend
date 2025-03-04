import { BrowserRouter, Link, Route, Routes } from "react-router";
import MarketDataPage from "./MarketDataPage";

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
          <Link to="/">Home</Link> |<Link to="/market-data">Market Data</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market-data" element={<MarketDataPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
