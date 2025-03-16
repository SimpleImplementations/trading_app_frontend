import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IndicatorData } from "../interfaces/dbModels";

interface IndicatorChartProps {
  data: IndicatorData[];
}

const IndicatorChart: React.FC<IndicatorChartProps> = ({ data }) => {
  const seriesData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.value,
  }));

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
      },
      zoom: {
        enabled: true,
        type: "x",
      },
      animations: {
        enabled: false,
      },
    },
    title: {
      text: "Indicator Chart",
      align: "left",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  if (data.length === 0) {
    return <div>No indicator data available for the chart</div>;
  }

  return (
    <div className="indicator-chart">
      <ReactApexChart
        options={options}
        series={[{ name: data[0]?.name || "Indicator", data: seriesData }]}
        type="line"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default IndicatorChart;
