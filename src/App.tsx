import { BrowserRouter, Link, Route, Routes } from "react-router";
import MarketDataPage from "./pages/MarketDataPage";
import CandlestickChartPage from "./pages/CandlestickChartPage";
import HomePage from "./pages/HomePage";
import DataPollerPage from "./pages/DataPollerPage";
import ExecutionConfigPage from "./pages/ExecutionConfigPage";
import { ExecutionConfigProvider } from "./contexts/ExecutionConfigContext";
import RenderIfConfigured from "./components/RenderIfConfigured";
import TablesPage from "./pages/TablesPage";

function App() {
  return (
    <BrowserRouter>
      <ExecutionConfigProvider>
        <div className="app-container">
          <nav>
            <Link to="/">Home</Link> |<Link to="/market-data">Market Data</Link> |
            <Link to="/chart">Candlestick Chart</Link> |<Link to="/data-poller">Data Poller</Link> |
            <Link to="/execution-config">Execution Config</Link> | <Link to="/tables">Tables</Link>
          </nav>

          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/market-data" element={<RenderIfConfigured children={<MarketDataPage />} />} />
              <Route path="/chart" element={<RenderIfConfigured children={<CandlestickChartPage />} />} />
              <Route path="/data-poller" element={<RenderIfConfigured children={<DataPollerPage />} />} />
              <Route path="/tables" element={<RenderIfConfigured children={<TablesPage />} />} />
              <Route path="/execution-config" element={<ExecutionConfigPage />} />
            </Routes>
          </div>
        </div>
      </ExecutionConfigProvider>
    </BrowserRouter>
  );
}

export default App;
