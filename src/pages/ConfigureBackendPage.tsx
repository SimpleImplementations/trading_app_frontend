import { useState } from "react";
import { API_ENDPOINTS } from "../constants/api";
import { useBackendConfig } from "../contexts/BackendConfigContext";
import { StrategyType } from "../constants/enums";

function ConfigureBackend() {
  const backendConfig = useBackendConfig();
  const [configMessage, setConfigMessage] = useState("");
  const [pollingMessage, setPollingMessage] = useState("");

  const sendConfiguration = async () => {
    try {
      // Format data to exactly match backend Pydantic model
      const appParameters = {
        strategy_type: backendConfig.strategy,
        strategy_params: {
          ...backendConfig.strategyParams,
          // Ensure strategy_type is exactly as expected by the backend
          strategy_type: backendConfig.strategyParams.strategy_type,
        },
      };

      console.log("Sending to backend:", JSON.stringify(appParameters, null, 2));

      const response = await fetch(API_ENDPOINTS.STRATEGY_PARAMS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appParameters),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      setConfigMessage(data.message || "Configuration sent successfully");
    } catch (error) {
      console.error(error);
      setConfigMessage(`Error setting configuration: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const startPolling = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.START_SERVER_POLLING + backendConfig.brokerType, {
        method: "POST",
      });

      const data = await response.json();
      setPollingMessage(data.message || "Polling started on server");
    } catch (error) {
      console.error(error);
      setPollingMessage("Error starting polling");
    }
  };

  return (
    <div>
      <h1>Configure Backend</h1>
      <div className="config-summary">
        <h2>Current Configuration</h2>
        <p>
          <strong>Strategy:</strong> {backendConfig.strategy}
        </p>
        <p>
          <strong>Broker:</strong> {backendConfig.brokerType}
        </p>

        {backendConfig.strategy === StrategyType.EMACROSSOVER && (
          <div className="strategy-params">
            <p>
              <strong>Fast Period:</strong> {backendConfig.strategyParams.fast_period}
            </p>
            <p>
              <strong>Slow Period:</strong> {backendConfig.strategyParams.slow_period}
            </p>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <div>
          <button onClick={sendConfiguration}>Send Configuration to backend</button>
          {configMessage && <p className="message">{configMessage}</p>}
        </div>
        <div>
          <button onClick={startPolling}>Start Server Polling</button>
          {pollingMessage && <p className="message">{pollingMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ConfigureBackend;
