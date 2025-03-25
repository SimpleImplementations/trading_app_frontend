import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useBackendConfig } from "./BackendConfigContext";

type SymbolContextType = {
  availableSymbols: string[];
  selectedSymbol: string;
  setSelectedSymbol: (symbol: string) => void;
};

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export function useSymbolContext() {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error("useSymbolContext must be used within a SymbolProvider");
  }
  return context;
}

export function SymbolProvider({ children }: { children: ReactNode }) {
  const backendConfig = useBackendConfig();
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");

  // Initialize with the first symbol from backend config
  useEffect(() => {
    if (backendConfig.symbols.length > 0 && !selectedSymbol) {
      setSelectedSymbol(backendConfig.symbols[0]);
    }
  }, [backendConfig.symbols, selectedSymbol]);

  const value = {
    availableSymbols: backendConfig.symbols,
    selectedSymbol,
    setSelectedSymbol,
  };

  return <SymbolContext.Provider value={value}>{children}</SymbolContext.Provider>;
}
