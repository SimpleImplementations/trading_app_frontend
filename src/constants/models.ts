export enum DBTableTypes {
    MARKET_DATA = 'market_data',
    INDICATOR = 'indicator',
    STRATEGY = 'strategy'
  }
  
export enum DBIndicators {
    EMA = 'ema'
    }

export enum DBStrategies {
    EMA_CROSSOVER = 'ema_crossover'
    }

export enum OperationType {
    OPEN_SHORT = "open_short",
    OPEN_LONG = "open_long",
    CLOSE_SHORT = "close_short",
    CLOSE_LONG = "close_long",

    CLOSE_LONG_OPEN_SHORT = "close_long_open_short",
    CLOSE_SHORT_OPEN_LONG = "close_short_open_long",
    NONE = ""
    }
