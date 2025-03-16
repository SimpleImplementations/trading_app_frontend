import { StrategyType } from "../constants/enums";
import { StrategyParamsUnion } from "./models";

export interface BackendConfig {
  readonly brokerType: string;
  readonly strategy: StrategyType;
  readonly strategyParams: StrategyParamsUnion;
}

export const defaultBackendConfig: BackendConfig = {
  brokerType: 'mock_broker_always_new_data',
  strategy: StrategyType.EMACROSSOVER,
  strategyParams: {
    strategy_type: StrategyType.EMACROSSOVER,
    fast_period: 12,
    slow_period: 26
  }
};