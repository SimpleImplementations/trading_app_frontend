import { useState } from "react";
import { defaultConfig, ExecutionConfig } from "../interfaces/executionConfig";
import { useExecutionConfigUnsafe, useUpdateExecutionConfig } from "../contexts/ExecutionConfigContext";

function ExecutionConfigPage() {
  const executionConfig = useExecutionConfigUnsafe();
  const setExecutionConfig = useUpdateExecutionConfig();

  const [componentExecutionConfig, setComponentExecutionConfig] = useState<ExecutionConfig>(defaultConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [wasEverEdited, setWasEverEdited] = useState(executionConfig ? true : false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setComponentExecutionConfig((prevConfig) => ({
      ...prevConfig,
      [id]: id === "pollingIntervalMs" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    setExecutionConfig(componentExecutionConfig);

    setWasEverEdited(true);
    console.log("Saving new configuration:", executionConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setExecutionConfig(defaultConfig);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (wasEverEdited) {
      alert("Configuration can only be edited once and is now locked.");
      return;
    }
    setIsEditing(true);
  };

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
          <label htmlFor="apiBaseUrl">API Base URL:</label>
          <input
            type="text"
            id="apiBaseUrl"
            value={executionConfig ? executionConfig.apiBaseUrl : componentExecutionConfig.apiBaseUrl}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="form-control"
          />
          <small>The base URL for all API requests</small>
        </div>

        <div className="form-group">
          <label htmlFor="brokerType">Broker Type:</label>
          {isEditing ? (
            <select
              id="brokerType"
              value={executionConfig ? executionConfig.brokerType : componentExecutionConfig.brokerType}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="mock_broker_always_new_data">mock_broker_always_new_data</option>
            </select>
          ) : (
            <input
              type="text"
              id="brokerType"
              value={executionConfig ? executionConfig.brokerType : componentExecutionConfig.brokerType}
              readOnly
              className="form-control"
            />
          )}
          <small>The type of data broker used for market data</small>
        </div>

        <div className="form-group">
          <label htmlFor="pollingIntervalMs">Polling Interval (ms):</label>
          <input
            type="number"
            id="pollingIntervalMs"
            value={executionConfig ? executionConfig.pollingIntervalMs : componentExecutionConfig.pollingIntervalMs}
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
            <select
              id="strategy"
              value={executionConfig ? executionConfig.strategy : componentExecutionConfig.strategy}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="ema_crossover">EMA Crossover</option>
            </select>
          ) : (
            <input
              type="text"
              id="strategy"
              value={executionConfig ? executionConfig.strategy : componentExecutionConfig.strategy}
              readOnly
              className="form-control"
            />
          )}
          <small>The trading strategy used for market analysis</small>
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
