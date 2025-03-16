import { StrategyType } from "../constants/enums";

export interface StrategyParams {
    strategy_type: string;
}

export interface EMACrossoverParams extends StrategyParams {
    strategy_type: StrategyType.EMACROSSOVER;
    fast_period: number;
    slow_period: number;
}

export type StrategyParamsUnion = EMACrossoverParams;

export interface AppParameters {
    strategy: StrategyType;
    strategy_params: StrategyParamsUnion;
}