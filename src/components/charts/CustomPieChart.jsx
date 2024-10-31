import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CustomPieChart = ({ data }) => {
  const [series] = useState(data); 
  const [options] = useState({
    chart: {
      width: 380,
      type: "pie",
      //  toolbar: {
      //     show: true, // Enable or disable the toolbar completely
      //     tools: {
      //       download: true, // Disable the download option
      //     },
      //   },
    },
    labels: ["Showers", "Mirrors", "WineCallers"],
    colors: ["#8477DA", "#00A773", "#0156C7"], 
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CustomPieChart;
