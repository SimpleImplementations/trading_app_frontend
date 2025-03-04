import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MarketData } from "../types";

interface CandlestickChartProps {
  data: MarketData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  // Format the data for candlestick chart
  const seriesData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: [item.open, item.high, item.low, item.close],
  }));

  // Format the data for volume chart
  const volumeData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.volume,
  }));

  // Chart options
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
    },
  };

  const volumeOptions: ApexOptions = {
    chart: {
      height: 160,
      type: "bar",
      brush: {
        enabled: true,
        target: "candles",
      },
      selection: {
        enabled: true,
        xaxis: {
          min: data.length > 0 ? new Date(data[0].timestamp).getTime() : undefined,
          max: data.length > 0 ? new Date(data[data.length - 1].timestamp).getTime() : undefined,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: 0,
              to: Infinity,
              color: "#8ecae6",
            },
          ],
        },
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
      title: {
        text: "Volume",
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  if (data.length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div className="chart-container">
      <div className="candlestick-chart">
        <ReactApexChart options={options} series={[{ data: seriesData }]} type="candlestick" height={350} />
      </div>
      <div className="volume-chart" style={{ marginTop: "20px" }}>
        <ReactApexChart
          options={volumeOptions}
          series={[{ name: "Volume", data: volumeData }]}
          type="bar"
          height={160}
        />
      </div>
    </div>
  );
};

export default CandlestickChart;
