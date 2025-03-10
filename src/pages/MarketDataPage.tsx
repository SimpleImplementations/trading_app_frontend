import { useState } from "react";
import { MarketData } from "../interfaces/apiModels";
import { API_ENDPOINTS } from "../constants/api";

function MarketDataPage() {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.MARKET_DATA);
      const json = await response.json();
      console.log(json);
      setMarketDataArray((prevData) => [...prevData, json as MarketData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = async () => {
    try {
      await fetch(API_ENDPOINTS.START_SERVER_POLLING, {
        method: "POST",
      });
      alert("Polling started on server");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Market Data</h1>

      <div>
        <button onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Get Market Data"}
        </button>
        <button onClick={startPolling}>Start Server Polling</button>
      </div>

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

export default MarketDataPage;
