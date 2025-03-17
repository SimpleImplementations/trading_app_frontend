import CandlestickChart from "../components/CandlestickChart";
import DataPoller from "../components/DataPoller";
import IndicatorChart from "../components/IndicatorChart";
import { MarketData, IndicatorsSet } from "../interfaces/dbModels";
import { API_ENDPOINTS } from "../constants/api";
import VolumeChart from "../components/VolumeChart";
import { useAPIData } from "../hooks/useApiData";
import { useIndicatorProcessing } from "../hooks/useIndicatorProcessing";

function ChartPage() {
  const [marketDataArray, handleMarketDataReceived] = useAPIData<MarketData>({
    fetchUrl: API_ENDPOINTS.MARKET_DATA_BATCH,
  });

  const [indicatorSetsArray, handleIndicatorSetReceived] = useAPIData<IndicatorsSet>({
    fetchUrl: API_ENDPOINTS.INDICATORS_SET_BATCH,
  });

  const indicatorDataByType = useIndicatorProcessing(indicatorSetsArray);

  return (
    <div>
      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleMarketDataReceived} />

      <DataPoller<IndicatorsSet>
        fetchEndpoint={API_ENDPOINTS.INDICATORS_SET}
        onDataReceived={handleIndicatorSetReceived}
      />

      <div>
        <h1>Market Data Charts</h1>
        <CandlestickChart data={marketDataArray} />
      </div>

      <div>
        <VolumeChart data={marketDataArray} />
      </div>

      {/* Render indicator charts */}
      {Object.keys(indicatorDataByType).length > 0 && (
        <div>
          <h1>Indicator Charts</h1>
          {Object.entries(indicatorDataByType).map(([indicatorName, dataArray]) => (
            <div key={indicatorName} style={{ marginBottom: "20px" }}>
              <h2>{indicatorName}</h2>
              <IndicatorChart data={dataArray} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChartPage;
