import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MarketData } from "../interfaces/apiModels";

interface CandlestickChartProps {
  data: MarketData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const seriesData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: [item.open, item.high, item.low, item.close],
  }));

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      id: "candles",
      toolbar: {
        autoSelected: "pan",
        show: true,
      },
      zoom: {
        enabled: true,
      },
      brush: {
        enabled: true,
        target: "volume",
      },
      selection: {
        enabled: true,
        xaxis: {
          min: data.length > 0 ? new Date(data[0].timestamp).getTime() : undefined,
          max: data.length > 0 ? new Date(data[data.length - 1].timestamp).getTime() : undefined,
        },
      },
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
        minWidth: 200,
        maxWidth: 200,
        offsetX: 0, // Ensure this is identical between charts
        align: "left", // Ensure label alignment is identical
        padding: 4, // Set explicit padding and keep identical
      },
      axisBorder: {
        offsetX: 0, // Ensure axis border offset is identical
      },
    },
  };

  if (data.length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div className="candlestick-chart">
      <ReactApexChart options={options} series={[{ data: seriesData }]} type="candlestick" height={400} width="100%" />
    </div>
  );
};

export default CandlestickChart;
