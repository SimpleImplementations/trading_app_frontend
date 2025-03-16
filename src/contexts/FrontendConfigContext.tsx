import { createContext, ReactNode, useContext, useState } from "react";
import { FrontendConfig, defaultFrontendConfig } from "../interfaces/frontendConfig";

type FrontendConfigContextType = {
  frontendConfig: FrontendConfig;
  updateFrontendConfig: (config: Partial<FrontendConfig>) => void;
};

const FrontendConfigContext = createContext<FrontendConfigContextType | undefined>(undefined);

export function useFrontendConfig() {
  const context = useContext(FrontendConfigContext);
  if (!context) {
    throw new Error("useFrontendConfig must be used within a FrontendConfigProvider");
  }
  return context.frontendConfig;
}

export function useUpdateFrontendConfig() {
  const context = useContext(FrontendConfigContext);
  if (!context) {
    throw new Error("useUpdateFrontendConfig must be used within a FrontendConfigProvider");
  }
  return context.updateFrontendConfig;
}

export function FrontendConfigProvider({ children }: { children: ReactNode }) {
  const [frontendConfig, setFrontendConfig] = useState<FrontendConfig>(defaultFrontendConfig);

  const updateFrontendConfig = (configUpdate: Partial<FrontendConfig>) => {
    setFrontendConfig((currentConfig) => ({
      ...currentConfig,
      ...configUpdate,
    }));
  };

  const value = { frontendConfig, updateFrontendConfig };

  return <FrontendConfigContext.Provider value={value}>{children}</FrontendConfigContext.Provider>;
}
