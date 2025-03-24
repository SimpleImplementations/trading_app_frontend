import DataPoller from "../components/DataPoller";
import { API_ENDPOINTS } from "../constants/api";
import { useAPIData } from "../hooks/useApiData";
import { PortfolioStatus } from "../interfaces/dbModels";

function StrategyPollerPage() {
  const [portfolioDataArray, handlePortfolioDataReceived] = useAPIData<PortfolioStatus>({
    fetchUrl: API_ENDPOINTS.PORTFOLIO_STATUS_BATCH,
    dedupTimestamps: true,
  });

  return (
    <div>
      <h1>Data Poller Strategy</h1>
      <DataPoller<PortfolioStatus>
        fetchEndpoint={API_ENDPOINTS.PORTFOLIO_STATUS}
        onDataReceived={handlePortfolioDataReceived}
      />

      {portfolioDataArray.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>timestamp</th>
              <th>cash</th>
              <th>position_value</th>
              <th>portfolio_value</th>
              <th>portfolio_book_value</th>
              <th>unrealized_pnl</th>
              <th>realized_pnl</th>
            </tr>
          </thead>
          <tbody>
            {portfolioDataArray.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.cash}</td>
                <td>{item.position_value}</td>
                <td>{item.portfolio_value}</td>
                <td>{item.portfolio_book_value}</td>
                <td>{item.unrealized_pnl}</td>
                <td>{item.realized_pnl}</td>
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

export default StrategyPollerPage;
