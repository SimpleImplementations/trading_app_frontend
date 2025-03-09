import { useEffect, useRef, useState } from "react";
import { MarketData } from "../interfaces/apiModels";

interface DataPollerProps {
  onDataReceived: (data: MarketData) => void;
}

function MarketDataPoller({ onDataReceived }: DataPollerProps) {
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002/api/market_data/mock_broker_always_new_data");
      const json = await response.json();
      console.log(json);
      onDataReceived(json as MarketData);
    } catch (error) {
      console.error(error);
    }
  };

  const startClientPolling = () => {
    if (!isPolling) {
      setIsPolling(true);

      pollingIntervalRef.current = window.setInterval(() => {
        fetchData();
      }, 5000); // Poll every 5 seconds
    }
  };

  const stopClientPolling = () => {
    if (isPolling && pollingIntervalRef.current !== null) {
      window.clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsPolling(false);
    }
  };

  useEffect(() => {
    return () => { // cleanup function
      if (pollingIntervalRef.current !== null) { 
        window.clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);
  
  return <div>
          <button onClick={isPolling ? stopClientPolling : startClientPolling}>
            {isPolling ? "Stop Client Polling" : "Start Client Polling"}
          </button>
        </div>
}

export default MarketDataPoller;