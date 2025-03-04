import { useState, useEffect } from "react";
import { MarketData } from "./types";
import CandlestickChart from "./CandlestickChart";

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

      <div className="button-container" style={{ marginBottom: "20px" }}>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch More Data"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
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
        <div style={{ marginTop: "30px" }}>
          <h2>Raw Data</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Timestamp</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>Open</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>High</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>Low</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>Close</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>Volume</th>
                </tr>
              </thead>
              <tbody>
                {marketDataArray.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                      {item.open.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                      {item.high.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                      {item.low.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                      {item.close.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                      {item.volume.toFixed(0)}
                    </td>
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
