import React from "react";
import { useSymbolContext } from "../contexts/SymbolContext";

function SymbolSelector() {
  const { availableSymbols, selectedSymbol, setSelectedSymbol } = useSymbolContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  return (
    <div className="symbol-selector">
      <label htmlFor="symbol-select">Symbol:</label>
      <select id="symbol-select" value={selectedSymbol} onChange={handleChange} className="symbol-select">
        {availableSymbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SymbolSelector;
