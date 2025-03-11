const BACKEND_API_BASE_URL = 'http://localhost:8002/api';

export const API_ENDPOINTS = {
  START_SERVER_POLLING: `${BACKEND_API_BASE_URL}/start_polling/mock_broker_always_new_data`,
  MARKET_DATA: `${BACKEND_API_BASE_URL}/market_data`,
  MARKET_DATA_BATCH: `${BACKEND_API_BASE_URL}/batch/market_data`,
  TABLES: `${BACKEND_API_BASE_URL}/tables`,
  TABLE: `${BACKEND_API_BASE_URL}/table`,
} as const;