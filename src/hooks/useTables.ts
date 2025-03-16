import { useState, useCallback } from "react";
import { API_ENDPOINTS } from "../constants/api";

export function useTables() {
  const [tables, setTables] = useState<string[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState<boolean>(false);
  const [tablesError, setTablesError] = useState<string | null>(null);

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

  return {
    tables,
    isLoadingTables,
    tablesError,
    fetchTables
  };
}