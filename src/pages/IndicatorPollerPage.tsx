import DataPoller from "../components/DataPoller";
import { API_ENDPOINTS } from "../constants/api";
import { useAPIData } from "../hooks/use-api-data";
import { EMACrossoverData } from "../interfaces/apiModels";

function IndicatorPollerPage() {
  const [emaDataArray, handleDataReceived] = useAPIData<EMACrossoverData>({
    fetchUrl: API_ENDPOINTS.INDICATOR_DATA_BATCH,
  });

  return (
    <div>
      <h1>Data Poller Indicator</h1>

      <DataPoller<EMACrossoverData> fetchEndpoint={API_ENDPOINTS.INDICATOR_DATA} onDataReceived={handleDataReceived} />

      {emaDataArray.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Fast Period</th>
              <th>operation_type</th>
            </tr>
          </thead>
          <tbody>
            {emaDataArray.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.fast_period}</td>
                <td>{item.operation_type}</td>
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
