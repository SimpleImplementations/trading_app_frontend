import { createContext, ReactNode, useContext, useState } from "react";
import { BackendConfig } from "../interfaces/backendConfig";

const BackendConfigContext = createContext<
  | {
      backendConfig: BackendConfig | null;
      updateBackendConfig: (config: BackendConfig) => void;
    }
  | undefined
>(undefined);

export function useBackendConfig() {
  const context = useContext(BackendConfigContext);
  if (!context) {
    throw new Error("useBackendConfig must be used within a BackendConfigProvider");
  }
  if (!context.backendConfig) {
    throw new Error("Backend configuration has not been initialized");
  }
  return context.backendConfig;
}

export function useBackendConfigUnsafe() {
  const context = useContext(BackendConfigContext);
  if (!context) {
    throw new Error("useBackendConfigUnsafe must be used within a BackendConfigProvider");
  }
  return context.backendConfig;
}

export function useUpdateBackendConfig() {
  const context = useContext(BackendConfigContext);
  if (!context) {
    throw new Error("useUpdateBackendConfig must be used within a BackendConfigProvider");
  }
  return context.updateBackendConfig;
}

export function BackendConfigProvider({ children }: { children: ReactNode }) {
  const [backendConfig, setBackendConfig] = useState<BackendConfig | null>(null);

  const updateBackendConfig = (config: BackendConfig) => {
    setBackendConfig(config);
  };

  return (
    <BackendConfigContext.Provider value={{ backendConfig, updateBackendConfig }}>
      {children}
    </BackendConfigContext.Provider>
  );
}
