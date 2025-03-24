import { useEffect, useRef, useState } from "react";
import { DBModel } from "../interfaces/dbModels";

interface UseAPIDataProps {
  fetchUrl: string;
  initialFetch?: boolean;
}

export const useAPIData = <T extends DBModel>({
  fetchUrl,
  initialFetch = true,
}: UseAPIDataProps) => {
  const [dataArray, setDataArray] = useState<T[]>([]);
  const alreadyCalledOnce = useRef(false);

  const handleDataReceived = (data: T | T[]) => {
    setDataArray((prevData) => {
      if (Array.isArray(data)) {
        // For batch
        const newData = [...prevData, ...data];
        return newData.sort((a, b) => {return a.id - b.id;});
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
          // If the new point is newer than our most recent point, just append it
          if (data.id >= prevData[prevData.length - 1].id) {
            return [...prevData, data];
          }
          // Otherwise, it's an out-of-order point and we need to sort
          else {
            return [...prevData, data].sort((a, b) => {
              return a.id - b.id;
            });
          }
        }
        // If this is our first data point, just return it
        return [...prevData, data];
      }
    });
  };

  useEffect(() => {
    if (initialFetch && !alreadyCalledOnce.current) {
      alreadyCalledOnce.current = true;
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