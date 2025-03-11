import { useEffect, useState } from "react";
import { MarketData } from "../interfaces/apiModels";
import { API_ENDPOINTS } from "../constants/api";

export const useMarketData = () => {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);

  const handleDataReceived = (data: MarketData | MarketData[]) => {
    if (Array.isArray(data)) {
      setMarketDataArray((prevData) => [...prevData, ...data]);
    } else {
      setMarketDataArray((prevData) => [...prevData, data]);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.MARKET_DATA_BATCH);
        const json = await response.json();
        
        const transformedData = json as MarketData[];
        handleDataReceived(transformedData);
      } catch (error) {
        console.error("Error fetching initial market data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return [marketDataArray, handleDataReceived]  as const;
};