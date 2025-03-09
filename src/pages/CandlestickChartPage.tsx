import CandlestickChart from "../components/CandlestickChart";
import { useMarketDataFromPoller } from "../hooks/use-market-data-from-poller";
import MarketDataPoller from "../components/MarketDataPoller";

function CandlestickChartPage() {
  const [marketDataArray, handleDataReceived] = useMarketDataFromPoller();

  return (
    <div>
      <h1>Candlestick Chart</h1>

      <MarketDataPoller onDataReceived={handleDataReceived} />

      <div>
        {marketDataArray.length === 0 ? (
          <p>No data available. Click "Fetch More Data" to load market data.</p>
        ) : (
          <CandlestickChart data={marketDataArray} />
        )}
      </div>

      {/* Display raw data in a table */}
      {marketDataArray.length > 0 && (
        <div>
          <h2>Raw Data</h2>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {marketDataArray.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                    <td>{item.open.toFixed(2)}</td>
                    <td>{item.high.toFixed(2)}</td>
                    <td>{item.low.toFixed(2)}</td>
                    <td>{item.close.toFixed(2)}</td>
                    <td>{item.volume.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandlestickChartPage;
