import { useCallback, useEffect } from "react";

export interface DataFetcherProps<T> {
  fetchEndpoint: string;
  onDataReceived: (data: T) => void;
}

function DataFetcher<T>({ fetchEndpoint, onDataReceived }: DataFetcherProps<T>) {
  const transform = (data: any): T => {
    return data as T;
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(fetchEndpoint);
      const json = await response.json();

      console.log(json);
      const transformedData = transform(json);
      onDataReceived(transformedData);
    } catch (error) {
      console.error(error);
    }
  }, [fetchEndpoint, onDataReceived]);

  useEffect(() => {
    fetchData();
  }, [fetchEndpoint]);

  return { fetchData };
}

export default DataFetcher;
