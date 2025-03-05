import { useEffect, useRef, useState } from "react";
import { MarketData } from "../types";

function DataPoller() {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002/api/market_data/mock_broker_always_new_data");
      const json = await response.json();
      console.log(json);
      setMarketDataArray((prevData) => [...prevData, json as MarketData]);
    } catch (error) {
      console.error(error);
    }
  };

  const startClientPolling = () => {
    // Only start if not already polling
    if (!isPolling) {
      setIsPolling(true);

      // Start the interval and store the interval ID
      pollingIntervalRef.current = window.setInterval(() => {
        fetchData();
      }, 5000); // Poll every 5 seconds
    }
  };

  const stopClientPolling = () => {
    if (isPolling && pollingIntervalRef.current !== null) {
      // Clear the interval
      window.clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsPolling(false);
    }
  };

  // Clean up the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current !== null) {
        window.clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Data Poller</h1>

      <div>
        <button onClick={isPolling ? stopClientPolling : startClientPolling}>
          {isPolling ? "Stop Client Polling" : "Start Client Polling"}
        </button>
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

export default DataPoller;
