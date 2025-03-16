import CandlestickChart from "../components/CandlestickChart";
import DataPoller from "../components/DataPoller";
import { MarketData } from "../interfaces/dbModels";
import { API_ENDPOINTS } from "../constants/api";
import VolumeChart from "../components/VolumeChart";
import { useAPIData } from "../hooks/use-api-data";

function ChartPage() {
  const [marketDataArray, handleMarketDataReceived] = useAPIData<MarketData>({
    fetchUrl: API_ENDPOINTS.MARKET_DATA_BATCH,
  });

  return (
    <div>
      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleMarketDataReceived} />
      <div>
        <CandlestickChart data={marketDataArray} />
      </div>
      <div>
        <VolumeChart data={marketDataArray} />
      </div>
    </div>
  );
}

export default ChartPage;
