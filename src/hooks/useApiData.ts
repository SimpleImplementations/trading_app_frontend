import { useEffect, useRef, useState } from "react";
import { DBModel } from "../interfaces/dbModels";

interface UseAPIDataProps {
  fetchUrl: string;
  initialFetch?: boolean;
  dedupTimestamps?: boolean;
  symbol?: string;
}

export const useAPIData = <T extends DBModel>({
  fetchUrl,
  initialFetch = true,
  dedupTimestamps = false,
  symbol
}: UseAPIDataProps) => {
  const [dataArray, setDataArray] = useState<T[]>([]);
  const alreadyCalledOnce = useRef(false);

  const buildUrl = (baseUrl: string): string => {
    // Append the symbol as a query parameter if available
    console.log("SYMBOL", symbol);
    const url = symbol ? `${baseUrl}/${symbol}` : baseUrl;
    console.log("API request URL:", url);
    return url;
  };

  const handleDataReceived = (data: T | T[]) => {
    setDataArray((prevData) => {
      if (Array.isArray(data)) {
        // For batch
        const newData = [...prevData, ...data];
        newData.sort((a, b) => {return a.id - b.id;});

        if (dedupTimestamps) {
          const uniqueTimestamps = new Map<string, T>();

          for (const item of newData) {
            uniqueTimestamps.set(item.timestamp, item); // the set overrides with the new one
          }
          return Array.from(uniqueTimestamps.values());
        }
        return newData;
      } else {
        // For single data points

        // Check if we already have a data point with this id
        const existingPoint = prevData.find(
          (item) => item.id === data.id
        );
        if (existingPoint) {
          return prevData;
        }

        if (prevData.length > 0) {
          const lastElement = prevData[prevData.length - 1];
          if (dedupTimestamps && lastElement.timestamp === data.timestamp) {
            prevData.pop();
            return [...prevData, data];
          }
          return [...prevData, data];
        }
        // If this is our first data point, just return it
        return [...prevData, data];
      }
    });
  };

  useEffect(() => {
    // Reset data when symbol changes
    setDataArray([]);
    alreadyCalledOnce.current = false;
  }, [symbol]);

  useEffect(() => {
    if (initialFetch && !alreadyCalledOnce.current) {
      alreadyCalledOnce.current = true;
      const fetchInitialData = async () => {
        try {
          const url = buildUrl(fetchUrl);
          const response = await fetch(url);
          const json = await response.json();
          
          // Safely cast the response to the expected type
          // Assuming the API returns data in the correct format
          const typedData = json as T[];
          handleDataReceived(typedData);
        } catch (error) {
          console.error(`Error fetching initial data from ${fetchUrl}:`, error);
        }
      };

      fetchInitialData();
    }
  }, [fetchUrl, initialFetch, symbol]);

  return [dataArray, handleDataReceived] as const;
};