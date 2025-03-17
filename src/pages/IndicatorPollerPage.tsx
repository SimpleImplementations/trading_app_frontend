import DataPoller from "../components/DataPoller";
import { API_ENDPOINTS } from "../constants/api";
import { useAPIData } from "../hooks/useApiData";
import { EMAData } from "../interfaces/dbModels";

function IndicatorPollerPage() {
  const [emaDataArray, handleEmaDataReceived] = useAPIData<EMAData>({
    fetchUrl: API_ENDPOINTS.INDICATOR_DATA_BATCH,
  });

  return (
    <div>
      <h1>Data Poller Indicator</h1>

      <DataPoller<EMAData> fetchEndpoint={API_ENDPOINTS.INDICATOR_DATA} onDataReceived={handleEmaDataReceived} />

      {emaDataArray.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>timestamp</th>
              <th>name</th>
              <th>period</th>
              <th>symbol</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {emaDataArray.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.name}</td>
                <td>{item.period}</td>
                <td>{item.symbol}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default IndicatorPollerPage;
