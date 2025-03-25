import { useState } from "react";
import { useBackendConfigUnsafe, useUpdateBackendConfig } from "../contexts/BackendConfigContext";
import { AvailableSymbols, StrategyType } from "../constants/enums";
import { EMACrossoverParams } from "../interfaces/models";
import { BackendConfig, defaultBackendConfig } from "../interfaces/backendConfig";

function BackendConfigPage() {
  const backendConfig = useBackendConfigUnsafe() || defaultBackendConfig;
  const updateBackendConfig = useUpdateBackendConfig();

  const [localConfig, setLocalConfig] = useState<BackendConfig>(backendConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [wasEverEdited, setWasEverEdited] = useState(useBackendConfigUnsafe() ? true : false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "strategy") {
      // When strategy changes, update the strategy type and reset the params
      const strategyType = value as StrategyType;

      // Create appropriate strategy params based on selected strategy
      if (strategyType === StrategyType.EMACROSSOVER) {
        const newStrategyParams: EMACrossoverParams = {
          strategy_type: StrategyType.EMACROSSOVER,
          fast_period: 12,
          slow_period: 26,
        };

        setLocalConfig((prevConfig) => ({
          ...prevConfig,
          strategy: strategyType,
          strategyParams: newStrategyParams,
        }));
      }
    } else if (id.startsWith("strategyParams.")) {
      // Handle strategy params changes
      const paramName = id.split(".")[1];

      setLocalConfig((prevConfig) => {
        const updatedParams = { ...prevConfig.strategyParams };

        // Type guard to ensure we're working with the right param type
        if (paramName === "fast_period" || paramName === "slow_period") {
          if (prevConfig.strategy === StrategyType.EMACROSSOVER) {
            const emaParams = updatedParams as EMACrossoverParams;
            emaParams[paramName] = Number(value);
          }
        }

        return {
          ...prevConfig,
          strategyParams: updatedParams,
        };
      });
    } else {
      // Handle other regular fields
      setLocalConfig((prevConfig) => ({
        ...prevConfig,
        [id]: value,
      }));
    }
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    setLocalConfig((prevConfig) => {
      if (checked) {
        // Add symbol if it's not already in the array
        return {
          ...prevConfig,
          symbols: [...prevConfig.symbols, value],
        };
      } else {
        // Remove symbol from the array
        return {
          ...prevConfig,
          symbols: prevConfig.symbols.filter((symbol) => symbol !== value),
        };
      }
    });
  };

  const handleSave = () => {
    updateBackendConfig(localConfig);
    setWasEverEdited(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalConfig(backendConfig);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (wasEverEdited) {
      alert("Backend configuration can only be edited once and is now locked.");
      return;
    }
    setIsEditing(true);
  };

  // Helper to get current config
  const currentConfig = localConfig;
  const emaParams =
    currentConfig.strategy === StrategyType.EMACROSSOVER ? (currentConfig.strategyParams as EMACrossoverParams) : null;

  return (
    <div className="config-page">
      <h1>Backend Configuration</h1>
      <p className="description">
        {isEditing
          ? "Edit backend configuration settings."
          : wasEverEdited
            ? "Current backend configuration settings (locked)."
            : "Current backend configuration settings."}
      </p>

      <div className="config-form">
        <div className="form-group">
          <label htmlFor="brokerType">Broker Type:</label>
          {isEditing ? (
            <select
              id="brokerType"
              value={currentConfig.brokerType}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="mock_broker_always_new_data">mock_broker_always_new_data</option>
            </select>
          ) : (
            <input type="text" id="brokerType" value={currentConfig.brokerType} readOnly className="form-control" />
          )}
          <small>The type of data broker used for market data</small>
        </div>

        <div className="form-group">
          <label htmlFor="strategy">Trading Strategy:</label>
          {isEditing ? (
            <select id="strategy" value={currentConfig.strategy} onChange={handleInputChange} className="form-control">
              <option value={StrategyType.EMACROSSOVER}>EMA Crossover</option>
            </select>
          ) : (
            <input
              type="text"
              id="strategy"
              value={currentConfig.strategy === StrategyType.EMACROSSOVER ? "EMA Crossover" : currentConfig.strategy}
              readOnly
              className="form-control"
            />
          )}
          <small>The trading strategy used for market analysis</small>
        </div>

        {/* Strategy-specific parameters */}
        {currentConfig.strategy === StrategyType.EMACROSSOVER && emaParams && (
          <div className="strategy-params">
            <h3>EMA Crossover Parameters</h3>

            <div className="form-group">
              <label htmlFor="strategyParams.fast_period">Fast Period:</label>
              <input
                type="number"
                id="strategyParams.fast_period"
                value={emaParams.fast_period}
                onChange={handleInputChange}
                readOnly={!isEditing}
                min="1"
                className="form-control"
              />
              <small>Fast EMA period</small>
            </div>

            <div className="form-group">
              <label htmlFor="strategyParams.slow_period">Slow Period:</label>
              <input
                type="number"
                id="strategyParams.slow_period"
                value={emaParams.slow_period}
                onChange={handleInputChange}
                readOnly={!isEditing}
                min="1"
                className="form-control"
              />
              <small>Slow EMA period</small>
            </div>
          </div>
        )}

        {/* Symbols Selection */}
        <div className="symbols-section">
          <h3>Trading Symbols</h3>
          <div className="symbols-grid">
            {Object.values(AvailableSymbols).map((symbol) => (
              <div key={symbol} className="symbol-checkbox">
                <input
                  type="checkbox"
                  id={`symbol-${symbol}`}
                  value={symbol}
                  checked={currentConfig.symbols.includes(symbol)}
                  onChange={handleSymbolChange}
                  disabled={!isEditing}
                />
                <label htmlFor={`symbol-${symbol}`}>{symbol}</label>
              </div>
            ))}
          </div>
          <small>Select the symbols to include in trading</small>
        </div>

        <div className="button-group">
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Configuration
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit} disabled={wasEverEdited}>
              {wasEverEdited ? "Configuration Locked" : "Edit Configuration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BackendConfigPage;
