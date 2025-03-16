import { useState } from "react";
import { useFrontendConfig, useUpdateFrontendConfig } from "../contexts/FrontendConfigContext";

function FrontendConfigPage() {
  const frontendConfig = useFrontendConfig();
  const updateFrontendConfig = useUpdateFrontendConfig();

  const [pollingInterval, setPollingInterval] = useState(frontendConfig.pollingIntervalMs);

  const handleSave = () => {
    updateFrontendConfig({ pollingIntervalMs: pollingInterval });
  };

  return (
    <div className="config-page">
      <h1>Frontend Configuration</h1>
      <p className="description">These settings control the frontend behavior and can be changed at any time.</p>

      <div className="config-form">
        <div className="form-group">
          <label htmlFor="pollingIntervalMs">Polling Interval (ms):</label>
          <input
            type="number"
            id="pollingIntervalMs"
            value={pollingInterval}
            onChange={(e) => setPollingInterval(Number(e.target.value))}
            min="1000"
            className="form-control"
          />
          <small>How frequently to poll for new data (in milliseconds)</small>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={pollingInterval === frontendConfig.pollingIntervalMs}
          >
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={() => setPollingInterval(frontendConfig.pollingIntervalMs)}>
            Reset
          </button>
        </div>

        <p className="note">Current polling interval: {frontendConfig.pollingIntervalMs}ms</p>
      </div>
    </div>
  );
}

export default FrontendConfigPage;
