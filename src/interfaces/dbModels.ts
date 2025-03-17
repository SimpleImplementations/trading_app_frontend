import { OperationType } from "../constants/enums";

export interface DBModel {
  timestamp: string; // ISO format string
}

export interface MarketData extends DBModel {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface IndicatorData extends DBModel {
  name: string;
  symbol: string;
  value: number;
}

export interface IndicatorsSet extends DBModel {
  indicators_dict: { [key: string]: IndicatorData };
}

export interface EMAData extends IndicatorData {
  period: number;
}

export interface StrategyData extends DBModel {
  symbol: string;
  operation_type: OperationType;
}

export interface EMACrossoverData extends StrategyData {
  fast_period: number;
  slow_period: number;
}
