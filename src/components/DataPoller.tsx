import { useEffect, useRef, useState } from "react";
import { useFrontendConfig } from "../contexts/FrontendConfigContext";

export interface DataPollerProps<T> {
  fetchEndpoint: string;
  onDataReceived: (data: T) => void;
  symbol?: string;
}

function DataPoller<T>({ fetchEndpoint, onDataReceived, symbol }: DataPollerProps<T>) {
  const frontendConfig = useFrontendConfig();
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);

  const transform = (data: any): T => {
    return data as T;
  };

  // Build URL with symbol as path parameter if provided
  const buildUrl = (): string => {
    if (symbol) {
      return `${fetchEndpoint}/${symbol}`;
    }
    return fetchEndpoint;
  };

  const fetchData = async () => {
    try {
      const url = buildUrl();
      const response = await fetch(url);
      const json = await response.json();

      if (json !== null) {
        const transformedData = transform(json);
        onDataReceived(transformedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const startPolling = () => {
    if (!isPolling) {
      setIsPolling(true);
      pollingIntervalRef.current = window.setInterval(fetchData, frontendConfig.pollingIntervalMs);
    }
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current !== null) {
      window.clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsPolling(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Start polling
    startPolling();

    // Cleanup on unmount or when dependencies change
    return () => {
      stopPolling();
    };
  }, [symbol, fetchEndpoint]);

  // Restart polling when interval changes
  useEffect(() => {
    if (isPolling) {
      stopPolling();
      startPolling();
    }
  }, [frontendConfig.pollingIntervalMs]);

  return null;
}

export default DataPoller;
