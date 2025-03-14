import { useState } from "react";
import { API_ENDPOINTS } from "../constants/api";
import { useExecutionConfig } from "../contexts/ExecutionConfigContext";

function ConfigureBackend() {
  const executionConfig = useExecutionConfig();
  const [configMessage, setConfigMessage] = useState("");
  const [pollingMessage, setPollingMessage] = useState("");

  const sendConfiguration = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.SET_STRATEGY + executionConfig.strategy, {
        method: "POST",
      });

      const data = await response.json();
      setConfigMessage(data.message);
    } catch (error) {
      console.error(error);
      setConfigMessage("Error setting configuration");
    }
  };

  const startPolling = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.START_SERVER_POLLING + executionConfig.brokerType, {
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
      <div>
        <button onClick={sendConfiguration}>Send Configuration to backend</button>
        {configMessage && <p>{configMessage}</p>}
      </div>
      <div>
        <button onClick={startPolling}>Start Server Polling</button>
        {pollingMessage && <p>{pollingMessage}</p>}
      </div>
    </div>
  );
}

export default ConfigureBackend;
