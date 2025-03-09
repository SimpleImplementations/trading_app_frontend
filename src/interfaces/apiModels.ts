
interface DBModel {
  timestamp: string; // ISO format string
}

export interface MarketData extends DBModel {
  symbol: string; // min length 1, max length 10
  open: number; // greater than 0
  high: number; // greater than 0
  low: number; // greater than 0
  close: number; // greater than 0
  volume: number; // greater than or equal to 0
}