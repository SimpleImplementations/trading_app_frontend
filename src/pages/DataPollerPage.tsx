import { useState } from "react";
import { MarketData } from "../interfaces/apiModels";
import MarketDataPoller from "../components/MarketDataPoller";

function DataPollerPage() {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);

  const handleDataReceived = (data: MarketData) => {
    setMarketDataArray((prevData) => [...prevData, data]);
  };

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
