import { ExecutionConfig } from "../interfaces/executionConfig";

export type ExecutionConfigContextType = {
  executionConfig: ExecutionConfig | null;
  updateExecutionConfig: (executionConfig: ExecutionConfig) => void;
};
