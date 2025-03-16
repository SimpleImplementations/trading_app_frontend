import { useState } from "react";
import { defaultConfig, ExecutionConfig } from "../interfaces/executionConfig";
import { useExecutionConfigUnsafe, useUpdateExecutionConfig } from "../contexts/ExecutionConfigContext";
import { StrategyType } from "../constants/enums";
import { EMACrossoverParams } from "../interfaces/models";

function ExecutionConfigPage() {
  const executionConfig = useExecutionConfigUnsafe();
  const setExecutionConfig = useUpdateExecutionConfig();

  const [componentExecutionConfig, setComponentExecutionConfig] = useState<ExecutionConfig>(
    executionConfig || defaultConfig,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [wasEverEdited, setWasEverEdited] = useState(executionConfig ? true : false);

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

        setComponentExecutionConfig((prevConfig) => ({
          ...prevConfig,
          strategy: strategyType,
          strategyParams: newStrategyParams,
        }));
      }
    } else if (id.startsWith("strategyParams.")) {
      // Handle strategy params changes
      const paramName = id.split(".")[1];

      setComponentExecutionConfig((prevConfig) => {
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
      setComponentExecutionConfig((prevConfig) => ({
        ...prevConfig,
        [id]: id === "pollingIntervalMs" ? Number(value) : value,
      }));
    }
  };

  const handleSave = () => {
    setExecutionConfig(componentExecutionConfig);
    setWasEverEdited(true);
    console.log("Saving new configuration:", componentExecutionConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setComponentExecutionConfig(executionConfig || defaultConfig);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (wasEverEdited) {
      alert("Configuration can only be edited once and is now locked.");
      return;
    }
    setIsEditing(true);
  };

  // Helper to get current config (either from context or local state)
  const currentConfig = executionConfig || componentExecutionConfig;
  const emaParams =
    currentConfig.strategy === StrategyType.EMACROSSOVER ? (currentConfig.strategyParams as EMACrossoverParams) : null;

  return (
    <div className="config-page">
      <h1>Application Configuration</h1>
      <p className="description">
        {isEditing
          ? "Edit execution configuration settings."
          : wasEverEdited
            ? "Current execution configuration settings (locked)."
            : "Current execution configuration settings."}
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
          <label htmlFor="pollingIntervalMs">Polling Interval (ms):</label>
          <input
            type="number"
            id="pollingIntervalMs"
            value={currentConfig.pollingIntervalMs}
            onChange={handleInputChange}
            readOnly={!isEditing}
            min="1000"
            className="form-control"
          />
          <small>How frequently to poll for new data (in milliseconds)</small>
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

        <div className="config-info">
          <h3>About Configuration</h3>
          <p>
            {isEditing
              ? "Edit your configuration settings. Changes will be applied after saving. Note: You can only edit the configuration once."
              : wasEverEdited
                ? "These settings define the application behavior and are now locked. Configuration can only be edited once."
                : 'These settings define the application behavior. Click "Edit Configuration" to make changes. You can only edit the configuration once.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutionConfigPage;
