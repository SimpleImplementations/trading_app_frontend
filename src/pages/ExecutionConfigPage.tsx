import { executionConfig } from "../config";

function ExecutionConfigPage() {
  return (
    <div className="config-page">
      <h1>Application Configuration</h1>
      <p className="description">Current execution configuration settings.</p>

      <div className="config-form">
        <div className="form-group">
          <label htmlFor="apiBaseUrl">API Base URL:</label>
          <input type="text" id="apiBaseUrl" value={executionConfig.apiBaseUrl} readOnly className="form-control" />
          <small>The base URL for all API requests</small>
        </div>

        <div className="form-group">
          <label htmlFor="brokerType">Broker Type:</label>
          <input type="text" id="brokerType" value={executionConfig.brokerType} readOnly className="form-control" />
          <small>The type of data broker used for market data</small>
        </div>

        <div className="form-group">
          <label htmlFor="pollingIntervalMs">Polling Interval (ms):</label>
          <input
            type="number"
            id="pollingIntervalMs"
            value={executionConfig.pollingIntervalMs}
            readOnly
            className="form-control"
          />
          <small>How frequently to poll for new data (in milliseconds)</small>
        </div>

        <div className="config-info">
          <h3>About Configuration</h3>
          <p>
            These settings are read-only and defined at the application level. In the future, there will be ways to
            select different configurations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutionConfigPage;
