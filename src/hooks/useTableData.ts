import { useState, useCallback } from "react";
import { API_ENDPOINTS } from "../constants/api";

export function useTableData() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoadingTableData, setIsLoadingTableData] = useState<boolean>(false);
  const [tableDataError, setTableDataError] = useState<string | null>(null);

  const fetchTableData = useCallback(async (tableName: string) => {
    if (!tableName) return;

    setIsLoadingTableData(true);
    setTableDataError(null);

    try {
      const response = await fetch(API_ENDPOINTS.TABLE + tableName);

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

  return {
    tableData,
    isLoadingTableData,
    tableDataError,
    fetchTableData
  };
}