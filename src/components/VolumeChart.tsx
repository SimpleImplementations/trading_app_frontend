import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { MarketData } from "../interfaces/dbModels";

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
      id: "volume",
      brush: {
        enabled: false,
        autoScaleYaxis: false,
      },
      toolbar: { show: false },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
        allowMouseWheelZoom: false,
      },
      selection: {
        enabled: false,
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
      title: {
        text: "Volume",
      },
      labels: {
        show: false,
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
