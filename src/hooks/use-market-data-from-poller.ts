import { useState } from "react";
import { MarketData } from "../interfaces/apiModels";

export const useMarketDataFromPoller = () => {
  const [marketDataArray, setMarketDataArray] = useState<MarketData[]>([]);

  const handleDataReceived = (data: MarketData) => {
    setMarketDataArray((prevData) => [...prevData, data]);
  };

  return [marketDataArray, handleDataReceived]  as const;
};