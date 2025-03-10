import { useState, useCallback } from "react";
import { API_ENDPOINTS } from "../constants/api";

function TablesPage() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState<boolean>(false);
  const [isLoadingTableData, setIsLoadingTableData] = useState<boolean>(false);
  const [tablesError, setTablesError] = useState<string | null>(null);
  const [tableDataError, setTableDataError] = useState<string | null>(null);

  // Fetch the list of tables
  const fetchTables = useCallback(async () => {
    setIsLoadingTables(true);
    setTablesError(null);

    try {
      const response = await fetch(API_ENDPOINTS.TABLES);

      if (!response.ok) {
        throw new Error(`Failed to fetch tables: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setTables(data);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTablesError(error instanceof Error ? error.message : String(error));
      setTables([]);
    } finally {
      setIsLoadingTables(false);
    }
  }, []);

  // Fetch the data for a specific table
  const fetchTableData = useCallback(async (tableName: string) => {
    if (!tableName) return;

    setIsLoadingTableData(true);
    setTableDataError(null);

    try {
      const response = await fetch(`${API_ENDPOINTS.TABLE}/${tableName}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data for table ${tableName}: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setTableData(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setTableDataError(error instanceof Error ? error.message : String(error));
      setTableData([]);
    } finally {
      setIsLoadingTableData(false);
    }
  }, []);

  // Handle table selection
  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    fetchTableData(tableName);
  };

  return (
    <div className="tables-page">
      <div className="controls">
        <button onClick={fetchTables} disabled={isLoadingTables}>
          {isLoadingTables ? "Loading Tables..." : "Load Tables"}
        </button>
        {tablesError && <div className="error">Error: {tablesError}</div>}
      </div>

      <div className="content-container">
        {/* Table list */}
        <div className="table-list">
          <h2>Database Tables</h2>
          {tables.length > 0 ? (
            <ul>
              {tables.map((tableName) => (
                <li key={tableName}>
                  <button
                    onClick={() => handleTableSelect(tableName)}
                    className={tableName === selectedTable ? "selected" : ""}
                  >
                    {tableName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tables loaded. Click "Load Tables" to fetch tables.</p>
          )}
        </div>

        {/* Table data display */}
        <div className="table-data">
          {selectedTable && (
            <div>
              <h2>Table: {selectedTable}</h2>
              {tableDataError && <div className="error">Error: {tableDataError}</div>}

              {isLoadingTableData ? (
                <p>Loading table data...</p>
              ) : tableData.length > 0 ? (
                <div>
                  <table>
                    <thead>
                      <tr>
                        {/* Create headers from the first data item's keys */}
                        {Object.keys(tableData[0] || {}).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Each row of data gets its own table row */}
                      {tableData.map((row, rowIndex) => {
                        const allKeys = Object.keys(tableData[0] || {});
                        return (
                          <tr key={rowIndex}>
                            {/* Render each cell with its own value */}
                            {allKeys.map((key, colIndex) => {
                              const value = row[key];
                              return (
                                <td key={`${rowIndex}-${colIndex}`}>
                                  {value === null || value === undefined
                                    ? ""
                                    : typeof value === "object"
                                      ? JSON.stringify(value)
                                      : String(value)}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No data available for this table.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TablesPage;
