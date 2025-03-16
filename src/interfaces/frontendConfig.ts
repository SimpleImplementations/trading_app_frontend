export interface FrontendConfig {
    pollingIntervalMs: number;
  }
  
  export const defaultFrontendConfig: FrontendConfig = {
    pollingIntervalMs: 5000,
  };