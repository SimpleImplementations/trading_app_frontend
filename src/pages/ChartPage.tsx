import CandlestickChart from "../components/CandlestickChart";
import { useMarketData } from "../hooks/use-market-data";
import DataPoller from "../components/DataPoller";
import { MarketData } from "../interfaces/apiModels";
import { API_ENDPOINTS } from "../constants/api";
import VolumeChart from "../components/VolumeChart";

function ChartPage() {
  const [marketDataArray, handleDataReceived] = useMarketData();

  return (
    <div>
      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleDataReceived} />
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
