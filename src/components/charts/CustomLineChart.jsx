import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CustomLineChart = ({ dataType, data }) => {
  // Remove duplicate dates by converting to a Map (or other methods)
  const uniqueBarData = Array.from(
    new Map(data.map((item) => [item.x, item])).values()
  );
  const dates = uniqueBarData.map((item) => item.x); 
  const [chartData] = useState({
    series: [
      {
        name: dataType,
        data: uniqueBarData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        // toolbar: {
        //   show: true, // Enable or disable the toolbar completely
        //   tools: {
        //     download: false, // Disable the download option
        //   },
        // },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: dataType,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      colors: ["#8477DA"],
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default CustomLineChart;
