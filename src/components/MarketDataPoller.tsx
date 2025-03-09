import { useEffect, useRef, useState } from "react";
import { MarketData } from "../interfaces/apiModels";
import { useExecutionConfig } from "../contexts/ExecutionConfigContext";

interface DataPollerProps {
  onDataReceived: (data: MarketData) => void;
}

function MarketDataPoller({ onDataReceived }: DataPollerProps) {
  const executionConfig = useExecutionConfig();

  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);
  const alreadyCalledOnce = useRef(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002/api/market_data/mock_broker_always_new_data");
      const json = await response.json();
      console.log(json);
      if (json !== null) {
        onDataReceived(json as MarketData);
      } else {
        stopPolling();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startPolling = () => {
    if (!isPolling) {
      setIsPolling(true);

      pollingIntervalRef.current = window.setInterval(() => {
        fetchData();
      }, executionConfig.pollingIntervalMs);
    }
  };

  const stopPolling = () => {
    // don't check of isPolling because with strict mode it seems to be false
    if (pollingIntervalRef.current !== null) {
      window.clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsPolling(false);
      console.log("properly stopped polling");
    }
  };

  useEffect(() => {
    // // Only set up polling once, even if effect runs twice, this ocurres because of the strict mode
    if (!alreadyCalledOnce.current) {
      alreadyCalledOnce.current = true;
      fetchData(); // Initial data fetch
    }

    startPolling(); // Start the polling interval

    return () => {
      // Cleanup function
      stopPolling();
    };
  }, []);

  return null;
}

export default MarketDataPoller;
