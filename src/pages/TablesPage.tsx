import { useState } from "react";
import { useTables } from "../hooks/useTables";
import { useTableData } from "../hooks/useTableData";

function TablesPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const { tables, isLoadingTables, tablesError, fetchTables } = useTables();
  const { tableData, isLoadingTableData, tableDataError, fetchTableData } = useTableData();

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
