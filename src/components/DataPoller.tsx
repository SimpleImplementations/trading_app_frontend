import { useEffect, useRef, useState } from "react";
import { useExecutionConfig } from "../contexts/ExecutionConfigContext";

export interface DataPollerProps<T> {
  fetchEndpoint: string;
  onDataReceived: (data: T) => void;
}

function DataPoller<T>({ fetchEndpoint, onDataReceived }: DataPollerProps<T>) {
  const executionConfig = useExecutionConfig();
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);
  const alreadyCalledOnce = useRef(false);

  const transform = (data: any): T => {
    return data as T;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(fetchEndpoint);
      const json = await response.json();

      console.log(json);
      if (json !== null) {
        const transformedData = transform(json);
        onDataReceived(transformedData);
      } else {
        // TODO check if this should be consider a valid response
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

export default DataPoller;
