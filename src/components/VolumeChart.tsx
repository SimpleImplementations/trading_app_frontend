import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MarketData } from "../interfaces/apiModels";

interface VolumeChartProps {
  data: MarketData[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const volumeData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.volume,
  }));

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
    <div className="volume-chart">
      <ReactApexChart
        options={volumeOptions}
        series={[{ name: "Volume", data: volumeData }]}
        type="bar"
        height={160}
        width="100%"
      />
    </div>
  );
};

export default VolumeChart;
