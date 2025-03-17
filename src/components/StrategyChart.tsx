import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { StrategyData } from "../interfaces/dbModels";
import { OperationType } from "../constants/enums";

interface StrategyChartProps {
  data: StrategyData[];
}

const StrategyChart: React.FC<StrategyChartProps> = ({ data }) => {
  // Filter out NONE operations as they don't need markers
  const filteredData = data.filter((item) => item.operation_type !== OperationType.NONE);

  // Create series for each operation type
  const operationTypes = Object.values(OperationType).filter((op) => op !== OperationType.NONE);

  const series = operationTypes
    .map((opType) => {
      const filteredPoints = filteredData
        .filter((item) => item.operation_type === opType)
        .map((item) => ({
          x: new Date(item.timestamp).getTime(),
          y: 0, // We'll adjust this with the yaxis.labels.formatter
          operation: item.operation_type,
        }));

      return {
        name: opType,
        data: filteredPoints,
      };
    })
    .filter((series) => series.data.length > 0); // Only include series with data

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
      fixed: {
        enabled: false,
        position: "topRight",
        offsetY: 10,
      },
    },
    markers: {
      size: 8,
      strokeWidth: 0,
      hover: {
        size: 10,
      },
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: -1,
          shape: "circle", // OPEN_LONG
          size: 8,
        },
        {
          seriesIndex: 1,
          dataPointIndex: -1,
          shape: "square", // OPEN_SHORT
          size: 8,
        },
        {
          seriesIndex: 2,
          dataPointIndex: -1,
          shape: "triangle", // CLOSE_LONG
          size: 8,
        },
        {
          seriesIndex: 3,
          dataPointIndex: -1,
          shape: "diamond", // CLOSE_SHORT
          size: 8,
        },
        {
          seriesIndex: 4,
          dataPointIndex: -1,
          shape: "cross", // CLOSE_LONG_OPEN_SHORT
          size: 10,
        },
        {
          seriesIndex: 5,
          dataPointIndex: -1,
          shape: "plus", // CLOSE_SHORT_OPEN_LONG
          size: 10,
        },
      ],
    },
    colors: [
      // Colors for different operation types
      "#00E396", // OPEN_LONG - Green
      "#FF4560", // OPEN_SHORT - Red
      "#008FFB", // CLOSE_LONG - Blue
      "#FEB019", // CLOSE_SHORT - Orange
      "#775DD0", // CLOSE_LONG_OPEN_SHORT - Purple
      "#00D9E9", // CLOSE_SHORT_OPEN_LONG - Cyan
    ],
    legend: {
      show: true,
      position: "top",
    },
  };

  if (data.length === 0 || filteredData.length === 0) {
    return <div>No strategy signals available</div>;
  }

  return (
    <div className="strategy-chart">
      <ReactApexChart options={options} series={series} type="scatter" height={160} width="100%" />
    </div>
  );
};

export default StrategyChart;
