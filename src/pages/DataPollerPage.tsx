import { MarketData } from "../interfaces/apiModels";
import MarketDataPoller from "../components/MarketDataPoller";
import { useMarketDataFromPoller } from "../hooks/use-market-data-from-poller";

function DataPollerPage() {
  const [marketDataArray, handleDataReceived] = useMarketDataFromPoller();

  return (
    <div>
      <h1>Data Poller</h1>

      <MarketDataPoller onDataReceived={handleDataReceived} />

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
