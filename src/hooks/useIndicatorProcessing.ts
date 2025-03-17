import { useMemo } from "react";
import { IndicatorsSet, IndicatorData } from "../interfaces/dbModels";

/**
 * Custom hook to process indicator sets into organized collections by indicator type
 * 
 * @param indicatorSetsArray Array of indicator sets from the API
 * @returns Record where keys are indicator names and values are arrays of that indicator's data
 */
export function useIndicatorProcessing(indicatorSetsArray: IndicatorsSet[]) {
  const indicatorDataByType = useMemo(() => {
    const result: Record<string, IndicatorData[]> = {};
    
    indicatorSetsArray.forEach(set => {
      Object.entries(set.indicators_dict).forEach(([key, indicator]) => {
        // Create array for this indicator type if it doesn't exist
        if (!result[key]) {
          result[key] = [];
        }
        
        // Add the indicator data with the timestamp from the set
        result[key].push({
          ...indicator,
          timestamp: set.timestamp
        });
      });
    });
    
    // Sort each indicator array by timestamp
    Object.keys(result).forEach(key => {
      result[key].sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    });
    
    return result;
  }, [indicatorSetsArray]);

  return indicatorDataByType;
}