import { MarketData } from "../interfaces/dbModels";
import DataPoller from "../components/DataPoller";
import { API_ENDPOINTS } from "../constants/api";
import { useAPIData } from "../hooks/use-api-data";

function DataPollerPage() {
  const [marketDataArray, handleMarketDataReceived] = useAPIData<MarketData>({
    fetchUrl: API_ENDPOINTS.MARKET_DATA_BATCH,
  });

  return (
    <div>
      <h1>Data Poller</h1>

      <DataPoller<MarketData> fetchEndpoint={API_ENDPOINTS.MARKET_DATA} onDataReceived={handleMarketDataReceived} />

      {marketDataArray.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {marketDataArray.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.close.toFixed(2)}</td>
                <td>{item.volume.toFixed()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DataPollerPage;
