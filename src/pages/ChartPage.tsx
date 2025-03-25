import CandlestickChart from "../components/chart/CandlestickChart";
import DataPoller from "../components/DataPoller";
import IndicatorChart from "../components/chart/IndicatorChart";
import { MarketData, IndicatorsSet, StrategyData, PortfolioStatus } from "../interfaces/dbModels";
import { API_ENDPOINTS } from "../constants/api";
import VolumeChart from "../components/chart/VolumeChart";
import { useAPIData } from "../hooks/useApiData";
import { useIndicatorProcessing } from "../hooks/useIndicatorProcessing";
import StrategyChart from "../components/chart/StrategyChart";
import PortfolioChart from "../components/chart/PortfolioChart";
import { useSymbolContext } from "../contexts/SymbolContext";

function ChartPage() {
  const { selectedSymbol } = useSymbolContext();

  const [marketDataArray, handleMarketDataReceived] = useAPIData<MarketData>({
    fetchUrl: API_ENDPOINTS.MARKET_DATA_BATCH,
    symbol: selectedSymbol,
  });

  // const [indicatorSetsArray, handleIndicatorSetReceived] = useAPIData<IndicatorsSet>({
  //   fetchUrl: API_ENDPOINTS.INDICATORS_SET_BATCH,
  // });

  // const indicatorDataByType = useIndicatorProcessing(indicatorSetsArray);

  // const [strategyDataArray, handleStrategyDataReceived] = useAPIData<StrategyData>({
  //   fetchUrl: API_ENDPOINTS.STRATEGY_BATCH,
  // });

  // const [portfolioDataArray, handlePortfolioDataReceived] = useAPIData<PortfolioStatus>({
  //   fetchUrl: API_ENDPOINTS.PORTFOLIO_STATUS_BATCH,
  // });

  return (
    <div>
      <DataPoller<MarketData>
        fetchEndpoint={API_ENDPOINTS.MARKET_DATA}
        onDataReceived={handleMarketDataReceived}
        symbol={selectedSymbol}
      />
      {/* 
      <DataPoller<IndicatorsSet>
        fetchEndpoint={API_ENDPOINTS.INDICATORS_SET}
        onDataReceived={handleIndicatorSetReceived}
      />

      <DataPoller<StrategyData> fetchEndpoint={API_ENDPOINTS.STRATEGY} onDataReceived={handleStrategyDataReceived} />

      <DataPoller<PortfolioStatus>
        fetchEndpoint={API_ENDPOINTS.PORTFOLIO_STATUS}
        onDataReceived={handlePortfolioDataReceived}
      /> */}

      <div>
        <h1>Market Data Charts</h1>
        <CandlestickChart data={marketDataArray} />
      </div>

      <div>
        <VolumeChart data={marketDataArray} />
      </div>

      {/* Render indicator charts */}
      {/* {Object.keys(indicatorDataByType).length > 0 && (
        <div>
          {Object.entries(indicatorDataByType).map(([indicatorName, dataArray]) => (
            <div key={indicatorName}>
              <IndicatorChart data={dataArray} />
            </div>
          ))}
        </div>
      )} */}

      {/* <div>
        <StrategyChart data={strategyDataArray} />
      </div> */}

      {/* <div>
        <PortfolioChart data={portfolioDataArray} />
      </div> */}
    </div>
  );
}

export default ChartPage;
