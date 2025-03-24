import { BrowserRouter, Link, Route, Routes } from "react-router";
import ConfigureBackend from "./pages/ConfigureBackendPage";
import ChartPage from "./pages/ChartPage";
import HomePage from "./pages/HomePage";
import DataPollerPage from "./pages/DataPollerPage";
import FrontendConfigPage from "./pages/FrontendConfigPage";
import { FrontendConfigProvider } from "./contexts/FrontendConfigContext";
import RenderIfConfigured from "./components/RenderIfConfigured";
import TablesPage from "./pages/TablesPage";
import IndicatorPollerPage from "./pages/IndicatorPollerPage";
import { BackendConfigProvider } from "./contexts/BackendConfigContext";
import BackendConfigPage from "./pages/BackendConfigPage";
import StrategyChartPage from "./pages/StrategyChartPage";
import StrategyPollerPage from "./pages/PortfolioPollerPage";

function App() {
  return (
    <BrowserRouter>
      <FrontendConfigProvider>
        <BackendConfigProvider>
          <div className="app-container">
            <nav>
              <Link to="/">Home</Link> |<Link to="/configure-backend">Configure Backend</Link> |
              <Link to="/frontend-config">Frontend Config</Link> |<Link to="/backend-config">Backend Config</Link> |
              <Link to="/chart">Candlestick Chart</Link> |<Link to="/strategy-analysis">Strategy Analysis</Link> |
              <Link to="/data-poller">Data Poller</Link> |<Link to="/indicator-poller">Indicator Poller</Link> |
              <Link to="/portfolio-poller">Potfolio Poller</Link> |<Link to="/tables">Tables</Link>
            </nav>

            <div className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/configure-backend" element={<RenderIfConfigured children={<ConfigureBackend />} />} />
                <Route path="/frontend-config" element={<FrontendConfigPage />} />
                <Route path="/backend-config" element={<BackendConfigPage />} />
                <Route path="/chart" element={<RenderIfConfigured children={<ChartPage />} />} />
                <Route path="/strategy-analysis" element={<RenderIfConfigured children={<StrategyChartPage />} />} />
                <Route path="/data-poller" element={<RenderIfConfigured children={<DataPollerPage />} />} />
                <Route path="/indicator-poller" element={<RenderIfConfigured children={<IndicatorPollerPage />} />} />
                <Route path="/portfolio-poller" element={<RenderIfConfigured children={<StrategyPollerPage />} />} />
                <Route path="/tables" element={<RenderIfConfigured children={<TablesPage />} />} />
              </Routes>
            </div>
          </div>
        </BackendConfigProvider>
      </FrontendConfigProvider>
    </BrowserRouter>
  );
}

export default App;
