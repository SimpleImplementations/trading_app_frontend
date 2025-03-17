import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IndicatorData } from "../../interfaces/dbModels";

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
      id: "indicators",
      toolbar: {
        autoSelected: "zoom",
        show: true,
        tools: {
          pan: false, // Disable the pan tool in the toolbar
        },
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
    },
    title: {
      text: data[0].name,
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
        show: true,
        minWidth: 200,
        maxWidth: 200,
        offsetX: 0, // Ensure this is identical between charts
        align: "left", // Ensure label alignment is identical
        padding: 4, // Set explicit padding and keep identical
        formatter: (value) => value.toFixed(2),
      },
      axisBorder: {
        offsetX: 0, // Ensure axis border offset is identical
      },
      title: {
        text: data[0].name,
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
        series={[{ name: data[0].name, data: seriesData }]}
        type="line"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default IndicatorChart;
