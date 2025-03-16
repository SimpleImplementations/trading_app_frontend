// src/interfaces/executionConfig.ts
import { StrategyType } from "../constants/enums";
import { StrategyParamsUnion } from "../interfaces/models";

export interface ExecutionConfig {
  readonly brokerType: string;
  readonly pollingIntervalMs: number;
  readonly strategy: StrategyType;
  readonly strategyParams: StrategyParamsUnion;
}

export const defaultConfig: ExecutionConfig = {
  brokerType: 'mock_broker_always_new_data',
  pollingIntervalMs: 5000,
  strategy: StrategyType.EMACROSSOVER,
  strategyParams: {
    strategy_type: StrategyType.EMACROSSOVER,
    fast_period: 12,
    slow_period: 26
  }
};