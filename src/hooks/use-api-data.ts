import { useEffect, useState } from "react";
import { DBModel } from "../interfaces/apiModels";

interface UseAPIDataProps {
  fetchUrl: string;
  initialFetch?: boolean;
}

export const useAPIData = <T extends DBModel>({
  fetchUrl,
  initialFetch = true,
}: UseAPIDataProps) => {
  const [dataArray, setDataArray] = useState<T[]>([]);

  const handleDataReceived = (data: T | T[]) => {
    setDataArray((prevData) => {
      if (Array.isArray(data)) {
        // For batch
        // Sort the entire dataset
        const newData = [...prevData, ...data];
        return newData.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampA - timestampB;
        });
      } else {
        // For single data points

        // Check if we already have a data point with this timestamp
        const existingPoint = prevData.find(
          (item) => item.timestamp === data.timestamp
        );
        if (existingPoint) {
          return prevData;
        }

        if (prevData.length > 0) {
          const lastTimestamp = new Date(
            prevData[prevData.length - 1].timestamp
          ).getTime();
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
    if (initialFetch) {
      const fetchInitialData = async () => {
        try {
          const response = await fetch(fetchUrl);
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
  }, [fetchUrl, initialFetch]);

  return [dataArray, handleDataReceived] as const;
};