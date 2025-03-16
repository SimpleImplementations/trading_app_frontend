import { StrategyType } from "../constants/enums";

interface StrategyParams {
    strategy_type: StrategyType;
    }

interface EMACrossoverParams extends StrategyParams {
    strategy_type: StrategyType.EMACROSSOVER;
    fast_period: number;
    slow_period: number;
    }

type StrategyParamsUnion = EMACrossoverParams;

interface AppParameters {
    strategy: StrategyType;
    strategy_params: StrategyParamsUnion;
    }