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

  const portfolioBookValueData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.portfolio_book_value,
  }));

  const realizedPnlValueData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.realized_pnl,
  }));

  const unrealizedPnlValueData = data.map((item) => ({
    x: new Date(item.timestamp),
    y: item.unrealized_pnl,
  }));

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      id: "portfolio",
      toolbar: {
        autoSelected: "zoom",
        show: true,
        tools: {
          pan: false,
        },
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
      events: {
        mounted: function (chart) {
          chart.hideSeries("Cash");
          chart.hideSeries("Position Value");
          chart.hideSeries("Realized PNL");
          chart.hideSeries("Unrealized PNL");
        },
      },
    },
    title: {
      text: "Portfolio Status",
      align: "left",
    },
    colors: ["#00E396", "#008FFB", "#FEB019", "#FF4560", "#775DD0", "#26C6DA"], // Green, Blue, Orange , Coral, Purple, Cyan
    stroke: {
      curve: "stepline",
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
        offsetX: 0,
        align: "left",
        padding: 4,
        formatter: (value) => value.toFixed(2),
      },
      axisBorder: {
        offsetX: 0,
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
    grid: {
      borderColor: "#333333",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    {
      name: "Cash",
      data: cashData,
    },
    {
      name: "Position Value",
      data: positionValueData,
    },
    {
      name: "Portfolio Value",
      data: portfolioValueData,
    },
    {
      name: "Portfolio Book Value",
      data: portfolioBookValueData,
    },
    {
      name: "Realized PNL",
      data: realizedPnlValueData,
    },
    {
      name: "Unrealized PNL",
      data: unrealizedPnlValueData,
    },
  ];

  if (data.length === 0) {
    return <div>No portfolio data available for the chart</div>;
  }

  return (
    <div className="chart-container portfolio-chart">
      <ReactApexChart options={options} series={series} type="line" height={350} width="100%" />
    </div>
  );
};

export default PortfolioChart;
