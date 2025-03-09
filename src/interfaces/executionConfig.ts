export interface ExecutionConfig {
  readonly apiBaseUrl: string;
  readonly brokerType: string;
  readonly pollingIntervalMs: number;
}

export const defaultConfig: ExecutionConfig = {
  apiBaseUrl: 'http://localhost:8002/api',
  brokerType: 'mock_broker_always_new_data',
  pollingIntervalMs: 5000
};