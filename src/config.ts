import { ExecutionConfig } from './types/executionConfig';

export const executionConfig: ExecutionConfig = Object.freeze({
  apiBaseUrl: "http://localhost:8002/api",
  brokerType: "mock_broker_always_new_data",
  pollingIntervalMs: 5000,
});