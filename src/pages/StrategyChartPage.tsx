import { useAPIData } from "../hooks/useApiData";
import { API_ENDPOINTS } from "../constants/api";
import { MarketData, IndicatorsSet, StrategyData, PortfolioStatus } from "../interfaces/dbModels";
import DataPoller from "../components/DataPoller";
import EMACrossoverChart from "../components/chart/EMACrossoverChart";
import { useIndicatorProcessing } from "../hooks/useIndicatorProcessing";
import { useBackendConfig } from "../contexts/BackendConfigContext";
import { StrategyType } from "../constants/enums";
import PortfolioChart from "../components/chart/PortfolioChart";

function StrategyChartPage() {
  const backendConfig = useBackendConfig();

  const [marketDataArray, handleMarketDataReceived] = useAPIData<MarketData>({
    fetchUrl: API_ENDPOINTS.MARKET_DATA_BATCH,
  });

  const [indicatorSetsArray, handleIndicatorSetReceived] = useAPIData<IndicatorsSet>({
    fetchUrl: API_ENDPOINTS.INDICATORS_SET_BATCH,
  });

  const indicatorDataByType = useIndicatorProcessing(indicatorSetsArray);

  const [strategyDataArray, handleStrategyDataReceived] = useAPIData<StrategyData>({
    fetchUrl: API_ENDPOINTS.STRATEGY_BATCH,
  });

  const [portfolioDataArray, handlePortfolioDataReceived] = useAPIData<PortfolioStatus>({
    fetchUrl: API_ENDPOINTS.PORTFOLIO_STATUS_BATCH,
  });

  return (
    <div className="strategy-analysis-page">
      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleMarketDataReceived} />
      <DataPoller<IndicatorsSet>
        fetchEndpoint={API_ENDPOINTS.INDICATORS_SET}
        onDataReceived={handleIndicatorSetReceived}
      />
      <DataPoller<StrategyData> fetchEndpoint={API_ENDPOINTS.STRATEGY} onDataReceived={handleStrategyDataReceived} />

      <DataPoller<PortfolioStatus>
        fetchEndpoint={API_ENDPOINTS.PORTFOLIO_STATUS}
        onDataReceived={handlePortfolioDataReceived}
      />

      <div>
        <div>
          <p>
            <strong>Strategy:</strong> {backendConfig.strategy}
          </p>
          {backendConfig.strategy === StrategyType.EMACROSSOVER && (
            <p>
              <strong>Parameters:</strong> Fast EMA: {backendConfig.strategyParams.fast_period}, Slow EMA:{" "}
              {backendConfig.strategyParams.slow_period}
            </p>
          )}
        </div>
      </div>

      <div>
        {backendConfig.strategy === StrategyType.EMACROSSOVER && (
          <EMACrossoverChart
            marketData={marketDataArray}
            indicatorData={indicatorDataByType}
            strategyData={strategyDataArray}
          />
        )}
      </div>

      <div>
        <PortfolioChart data={portfolioDataArray} />
      </div>
    </div>
  );
}

export default StrategyChartPage;
