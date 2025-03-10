const BACKEND_API_BASE_URL = 'http://localhost:8002/api';

export const API_ENDPOINTS = {
  MARKET_DATA: `${BACKEND_API_BASE_URL}/market_data/mock_broker_always_new_data`,
  TABLES: `${BACKEND_API_BASE_URL}/tables`,
  TABLE: `${BACKEND_API_BASE_URL}/table`,
} as const;
