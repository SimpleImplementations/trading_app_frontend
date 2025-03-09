import { createContext, ReactNode, useContext, useState } from "react";
import { ExecutionConfigContextType } from "../types/executionContextConfigType";
import { ExecutionConfig } from "../interfaces/executionConfig";


const ExecutionConfigContext = createContext<ExecutionConfigContextType>({
  executionConfig: null,
  updateExecutionConfig: () => {},
});

export function useExecutionConfig() {
  const context = useContext(ExecutionConfigContext);
  if (!context.executionConfig) {
    throw new Error("useExecutionConfig must be used after configuration is initialized");
  }
  return context.executionConfig;
}

export function useExecutionConfigUnsafe() {
  const context = useContext(ExecutionConfigContext);
  return context.executionConfig;
}

export function useUpdateExecutionConfig() {
  const context = useContext(ExecutionConfigContext);
  if (context.executionConfig) {
    return (_config: any) => {
      console.warn("Configuration already set for this app instance. Update ignored.");
      return null;
    };

  }
  return context.updateExecutionConfig;
}

export function ExecutionConfigProvider({children}: { 
  children: ReactNode;
}) {
  
  const [executionConfig, setExecutionConfig] = useState<ExecutionConfig | null>(null)

  const updateExecutionConfig = (executionConfig: ExecutionConfig) => {
    setExecutionConfig(executionConfig);
  };

  const value = {executionConfig, updateExecutionConfig};

  return (
    <ExecutionConfigContext.Provider value={value}>
      {children}
    </ExecutionConfigContext.Provider>
  );
}