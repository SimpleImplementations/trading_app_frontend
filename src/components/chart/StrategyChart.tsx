import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StrategyData } from "../../interfaces/dbModels";
import { OperationType } from "../../constants/enums";

interface StrategyChartProps {
  data: StrategyData[];
}

const StrategyChart: React.FC<StrategyChartProps> = ({ data }) => {
  const operationTypes = Object.values(OperationType);

  interface SeriesItem {
    name: string;
    data: Array<{
      x: number;
      y: number;
      operation: string;
    }>;
    color: string;
  }

  const series: SeriesItem[] = [];

  const operationConfig = {
    [OperationType.OPEN_LONG]: { color: "rgb(0, 227, 150)", shape: "circle" as const, size: 8 },
    [OperationType.OPEN_SHORT]: { color: "rgb(255, 69, 96)", shape: "square" as const, size: 8 },
    [OperationType.CLOSE_LONG]: { color: "rgb(0, 143, 251)", shape: "triangle" as const, size: 8 },
    [OperationType.CLOSE_SHORT]: { color: "rgb(254, 176, 25)", shape: "diamond" as const, size: 8 },
    [OperationType.NONE]: { color: "rgba(150, 150, 150, 0)", shape: "circle" as const, size: 4 },
  };

  operationTypes.forEach((opType) => {
    const filteredPoints = data
      .filter((item) => item.operation_type === opType)
      .map((item) => ({
        x: new Date(item.timestamp).getTime(),
        y: 0,
        operation: item.operation_type,
      }));

    // Only add series if it has data points
    if (filteredPoints.length > 0) {
      series.push({
        name: opType,
        data: filteredPoints,
        color: operationConfig[opType].color,
      });
    }
  });

  // Find indices for each operation type in the series array
  const seriesIndices: Record<string, number> = {};
  series.forEach((s, index) => {
    seriesIndices[s.name] = index;
  });

  const options: ApexOptions = {
    chart: {
      type: "scatter",
      height: 160,
      id: "strategy",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
        allowMouseWheelZoom: false,
      },
      animations: {
        enabled: false, // Disable animations for better performance
      },
      background: "#1a1a1a",
      foreColor: "#f0f0f0",
    },
    grid: {
      borderColor: "#333333",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    title: {
      text: "Strategy Signals",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide Y-axis labels as we're only using it for signal placement
        minWidth: 200,
        maxWidth: 200,
        offsetX: 0, // Ensure this is identical between charts
      },
      axisBorder: {
        offsetX: 0, // Ensure axis border offset is identical
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      y: {
        formatter: (_, { seriesIndex, dataPointIndex, w }) => {
          const point = w.config.series[seriesIndex].data[dataPointIndex];
          return `Operation: ${point.operation}`;
        },
      },
      marker: {
        show: true,
      },
    },
    markers: {
      size: 8,
      strokeWidth: 0,
      hover: {
        size: 10,
      },
      discrete: Object.entries(operationConfig)
        .filter(([opType]) => seriesIndices[opType] !== undefined)
        .map(([opType, config]) => ({
          seriesIndex: seriesIndices[opType],
          dataPointIndex: -1,
          shape: config.shape,
          size: config.size,
        })),
    },
    legend: {
      show: true,
      position: "top",
    },
  };

  if (data.length === 0) {
    return <div>No strategy signals available</div>;
  }

  return (
    <div className="chart-container strategy-chart">
      <ReactApexChart options={options} series={series} type="scatter" height={160} width="100%" />
    </div>
  );
};

export default StrategyChart;
