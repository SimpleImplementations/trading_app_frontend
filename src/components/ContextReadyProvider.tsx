import { useState, useEffect, ReactNode } from "react";
import { useSymbolContext } from "../contexts/SymbolContext";

interface ContextReadyProviderProps {
  children: ReactNode;
}

/**
 * A component that ensures all context values are fully initialized
 * before rendering children that might make API calls
 */
function ContextReadyProvider({ children }: ContextReadyProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const { selectedSymbol } = useSymbolContext();

  useEffect(() => {
    // Only set ready when we have a valid symbol
    if (selectedSymbol) {
      console.log("Context is ready with symbol:", selectedSymbol);
      setIsReady(true);
    }
  }, [selectedSymbol]);

  if (!isReady) {
    return <div>Initializing...</div>;
  }

  return <>{children}</>;
}

export default ContextReadyProvider;
