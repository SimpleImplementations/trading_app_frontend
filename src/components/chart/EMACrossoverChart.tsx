import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MarketData, IndicatorData, StrategyData } from "../../interfaces/dbModels";
import { OperationType } from "../../constants/enums";

interface EMACrossoverChartProps {
  marketData: MarketData[];
  indicatorData: Record<string, IndicatorData[]>;
  strategyData: StrategyData[];
}

const EMACrossoverChart: React.FC<EMACrossoverChartProps> = ({ marketData, indicatorData, strategyData }) => {
  // Format candlestick data
  const candlestickData = marketData.map((item) => ({
    x: new Date(item.timestamp),
    y: [item.open, item.high, item.low, item.close],
  }));

  type CandlestickDataPoint = { x: Date; y: number[] };
  type LineDataPoint = { x: Date; y: number };

  // Create series
  const candlestickSeries = {
    name: "Price",
    type: "candlestick" as const,
    data: candlestickData as CandlestickDataPoint[],
  };

  // Define EMA line colors with transparency
  const emaColors = ["rgba(255, 42, 42, 0.7)", "rgba(255, 235, 56, 0.7)"];

  // Collect indicator series
  const indicatorSeries = Object.entries(indicatorData)
    .map(([indicatorName, data], index) => {
      if (data.length === 0) return null;

      const formattedData = data.map((item) => ({
        x: new Date(item.timestamp),
        y: item.value,
      }));

      return {
        name: indicatorName,
        type: "line" as const,
        data: formattedData as LineDataPoint[],
        color: emaColors[index % emaColors.length],
      };
    })
    .filter((series) => series !== null);

  // Combine the series
  const series = [candlestickSeries, ...indicatorSeries] as any[];

  // Filter out NONE operations
  const filteredStrategyData = strategyData.filter((item) => item.operation_type !== OperationType.NONE);

  // Map operations to marker shapes and colors
  const operationConfig = {
    [OperationType.OPEN_LONG]: { shape: "circle", fillColor: "#00E396", size: 6 },
    [OperationType.OPEN_SHORT]: { shape: "square", fillColor: "#FF4560", size: 6 },
    [OperationType.CLOSE_LONG]: { shape: "triangle", fillColor: "#008FFB", size: 6 },
    [OperationType.CLOSE_SHORT]: { shape: "diamond", fillColor: "#FEB019", size: 6 },
  };

  // Create annotations for strategy signals
  const annotations = {
    points: filteredStrategyData.map((signal) => {
      // Find market data with the same timestamp to get price level
      const matchingMarketData = marketData.find((md) => md.timestamp === signal.timestamp);

      let yPosition = 0;
      if (matchingMarketData) {
        // Position signals above or below candles based on operation type
        if (signal.operation_type === OperationType.OPEN_LONG || signal.operation_type === OperationType.CLOSE_SHORT) {
          yPosition = matchingMarketData.low - (matchingMarketData.high - matchingMarketData.low) * 0.2; // Below candle
        } else {
          yPosition = matchingMarketData.high + (matchingMarketData.high - matchingMarketData.low) * 0.2; // Above candle
        }
      }

      const signal_char = signal.operation_type === OperationType.OPEN_LONG ? "L" : "S";

      const config = operationConfig[signal.operation_type as keyof typeof operationConfig];

      return {
        x: new Date(signal.timestamp).getTime(),
        y: yPosition,
        marker: {
          size: config?.size || 6,
          fillColor: config?.fillColor || "#FFFFFF",
          shape: config?.shape || "circle",
          radius: 2,
        },
        label: {
          borderColor: config?.fillColor || "#FFFFFF",
          text: signal_char,
          style: {
            color: "#fff",
            background: config?.fillColor || "#FFFFFF",
          },
          offsetY: 0,
        },
      };
    }),
  };

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 500,
      id: "ema-crossover",
      toolbar: {
        autoSelected: "zoom",
        show: true,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
        allowMouseWheelZoom: false,
      },
      animations: {
        enabled: false,
      },
    },
    title: {
      text: "EMA Crossover Strategy Analysis",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        style: {
          colors: "#ffffff",
        },
      },
      axisBorder: {
        color: "#444444",
      },
      axisTicks: {
        color: "#444444",
      },
    },
    yaxis: {
      labels: {
        show: true,
        minWidth: 200,
        maxWidth: 200,
        offsetX: 0,
        align: "left",
        padding: 4,
        formatter: (value) => parseFloat(value.toFixed(2)).toString(),
        style: {
          colors: "#ffffff",
        },
      },
      axisBorder: {
        offsetX: 0,
        color: "#444444",
      },
    },
    tooltip: {
      shared: false,
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        // Custom tooltip for candlestick
        if (seriesIndex === 0) {
          const data = w.config.series[0].data[dataPointIndex];
          const date = new Date(data.x).toLocaleString();
          const [open, high, low, close] = data.y;

          return `
            <div class="apexcharts-tooltip-box">
              <div style="padding: 10px; background: #1a1a1a; color: #f0f0f0; border: 1px solid #333">
                <div><b>Date:</b> ${date}</div>
                <div><b>Open:</b> ${open.toFixed(2)}</div>
                <div><b>High:</b> ${high.toFixed(2)}</div>
                <div><b>Low:</b> ${low.toFixed(2)}</div>
                <div><b>Close:</b> ${close.toFixed(2)}</div>
              </div>
            </div>
          `;
        }

        // Default tooltip for indicators
        return "";
      },
    },
    annotations,
    stroke: {
      width: [1, 2, 2], // Width for candlestick and lines
      curve: "smooth",
    },
    legend: {
      show: true,
      labels: {
        colors: "#ffffff",
      },
    },
    grid: {
      borderColor: "#333333",
      row: {
        colors: ["transparent"],
        opacity: 0.1,
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26a69a",
          downward: "#ef5350",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
  };

  if (marketData.length === 0) {
    return <div>No market data available for the chart</div>;
  }

  return (
    <div className="chart-container candlestick-chart">
      <ReactApexChart options={options} series={series} type="candlestick" height={600} width="100%" />
    </div>
  );
};

export default EMACrossoverChart;
