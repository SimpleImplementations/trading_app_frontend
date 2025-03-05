import { createContext, useContext, ReactNode } from "react";
import { ExecutionConfig } from "../types/executionConfig";
import { executionConfig } from "../config";

const ExecutionConfigContext = createContext<ExecutionConfig>(executionConfig);

export function ExecutionConfigProvider({ children }: { children: ReactNode }) {
  return <ExecutionConfigContext.Provider value={executionConfig}>{children}</ExecutionConfigContext.Provider>;
}

export function useConfig() {
  return useContext(ExecutionConfigContext);
}
