import { useEffect, useState } from "react";
import { MarketData } from "../interfaces/dbModels";
import { API_ENDPOINTS } from "../constants/api";

export const useMarketData = () => {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);

  const handleDataReceived = (data: MarketData | MarketData[]) => {
    setMarketDataArray((prevData) => {
      if (Array.isArray(data)) {
        // For batch
        // Sort the entire dataset
        const newData = [...prevData, ...data];
        return newData.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampA - timestampB;});
        } else {
          // For single data points

          // Check if we already have a data point with this timestamp
          const existingPoint = prevData.find(
            item => item.timestamp === data.timestamp
          );
          if (existingPoint) {
            return prevData;
          }

          if (prevData.length > 0) {
            const lastTimestamp = new Date(prevData[prevData.length - 1].timestamp).getTime();
            const newTimestamp = new Date(data.timestamp).getTime();
            
            // If the new point is newer than our most recent point, just append it
            if (newTimestamp >= lastTimestamp) {
              return [...prevData, data];
            } 
            // Otherwise, it's an out-of-order point and we need to sort
            else {
              return [...prevData, data].sort((a, b) => {
                const timestampA = new Date(a.timestamp).getTime();
                const timestampB = new Date(b.timestamp).getTime();
                return timestampA - timestampB;
              });
            }
          }
        // If this is our first data point, just return it
        return [...prevData, data];
        }
      });
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