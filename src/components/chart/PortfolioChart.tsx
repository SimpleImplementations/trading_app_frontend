import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { PortfolioStatus } from "../../interfaces/dbModels";

interface PortfolioChartProps {
  data: PortfolioStatus[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  // Prepare data for each line series
  const cashData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.cash,
  }));

  const positionValueData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.position_value,
  }));

  const portfolioValueData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.portfolio_value,
  }));

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      id: "portfolio",
      toolbar: {
        autoSelected: "zoom",
        show: true,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      animations: {
        enabled: false, // Disable animations for better performance
      },
      events: {
        mounted: function (chart) {
          // Hide first two series on initial render
          chart.hideSeries("Cash");
          chart.hideSeries("Position Value");
        },
      },
    },
    title: {
      text: "Portfolio Status",
      align: "left",
    },
    colors: ["#00E396", "#008FFB", "#FEB019"],
    stroke: {
      curve: "straight",
      width: [2, 2, 2],
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
      title: {
        text: "Value",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
    },
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Cash",
      data: cashData,
      visible: false,
    },
    {
      name: "Position Value",
      data: positionValueData,
      visible: false,
    },
    {
      name: "Portfolio Value",
      data: portfolioValueData,
      visible: true,
    },
  ];

  if (data.length === 0) {
    return <div>No portfolio data available for the chart</div>;
  }

  return (
    <div className="portfolio-chart">
      <ReactApexChart options={options} series={series} type="line" height={350} width="100%" />
    </div>
  );
};

export default PortfolioChart;
