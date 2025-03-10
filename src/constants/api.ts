const BACKEND_API_BASE_URL = 'http://localhost:8002/api';

export const API_ENDPOINTS = {
  MARKET_DATA: `${BACKEND_API_BASE_URL}/market_data/mock_broker_always_new_data`,
  // other endpoints
} as const;
