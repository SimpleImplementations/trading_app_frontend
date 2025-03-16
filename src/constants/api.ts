const BACKEND_API_BASE_URL = 'http://localhost:8002/api';

export const API_ENDPOINTS = {
  TABLES: `${BACKEND_API_BASE_URL}/tables`,
  TABLE: `${BACKEND_API_BASE_URL}/table/`,
  START_SERVER_POLLING: `${BACKEND_API_BASE_URL}/start_polling/`,
  STRATEGY_PARAMS: `${BACKEND_API_BASE_URL}/strategy-params`,

  MARKET_DATA: `${BACKEND_API_BASE_URL}/market_data`,
  MARKET_DATA_BATCH: `${BACKEND_API_BASE_URL}/batch/market_data`,

  INDICATOR_DATA: `${BACKEND_API_BASE_URL}/indicator/ema_data`,
  INDICATOR_DATA_BATCH: `${BACKEND_API_BASE_URL}/batch/indicator/ema_data`,
} as const;