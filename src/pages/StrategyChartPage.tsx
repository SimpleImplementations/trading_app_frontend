import { useAPIData } from "../hooks/useApiData";
import { API_ENDPOINTS } from "../constants/api";
import { MarketData, IndicatorsSet, StrategyData } from "../interfaces/dbModels";
import DataPoller from "../components/DataPoller";
import EMACrossoverChart from "../components/chart/EMACrossoverChart";
import { useIndicatorProcessing } from "../hooks/useIndicatorProcessing";
import { useBackendConfig } from "../contexts/BackendConfigContext";
import { StrategyType } from "../constants/enums";

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
    fetchUrl: API_ENDPOINTS.STRATEGY_SET_BATCH,
  });

  return (
    <div className="strategy-analysis-page">
      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleMarketDataReceived} />
      <DataPoller<IndicatorsSet>
        fetchEndpoint={API_ENDPOINTS.INDICATORS_SET}
        onDataReceived={handleIndicatorSetReceived}
      />
      <DataPoller<StrategyData>
        fetchEndpoint={API_ENDPOINTS.STRATEGY_SET}
        onDataReceived={handleStrategyDataReceived}
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
        <EMACrossoverChart
          marketData={marketDataArray}
          indicatorData={indicatorDataByType}
          strategyData={strategyDataArray}
        />
      </div>
    </div>
  );
}

export default StrategyChartPage;
