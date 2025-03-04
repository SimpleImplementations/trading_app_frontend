import { useState, useEffect } from "react";
import { MarketData } from "../types";
import CandlestickChart from "../components/CandlestickChart";

function CandlestickChartPage() {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8002/api/market_data/mock_broker_always_new_data");
      const json = await response.json();
      setMarketDataArray((prevData) => [...prevData, json as MarketData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data when component mounts
    fetchData();
  }, []);

  // Render loading state
  if (loading && marketDataArray.length === 0) {
    return <div>Loading chart data...</div>;
  }

  // Render empty state
  if (marketDataArray.length === 0) {
    return <div>No market data available. Try refreshing.</div>;
  }

  return (
    <div>
      <h1>Candlestick Chart</h1>

      <div className="button-container">
        <button onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Fetch More Data"}
        </button>
      </div>

      <div>
        {marketDataArray.length === 0 && !loading ? (
          <p>No data available. Click "Fetch More Data" to load market data.</p>
        ) : loading && marketDataArray.length === 0 ? (
          <p>Loading chart data...</p>
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
