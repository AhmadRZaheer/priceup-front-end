// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexChart = ({dataType,data}) => {
//     console.log(data,'data')
//   // Data with daily values
//   const Data = [
//     { x: "2019-01-01", y: 400 },
//     { x: "2019-01-02", y: 420 },
//     { x: "2019-01-03", y: 430 },
//     { x: "2019-01-04", y: 440 },
//     { x: "2019-01-05", y: 450 },
//     { x: "2019-01-06", y: 460 },
//     { x: "2019-01-07", y: 470 },
//     { x: "2019-01-08", y: 480 },
//     { x: "2019-01-09", y: 490 },
//     { x: "2019-01-10", y: 500 },
//     { x: "2019-01-11", y: 510 },
//     { x: "2019-01-12", y: 520 },
//     { x: "2019-01-13", y: 530 },
//     { x: "2019-01-14", y: 540 },
//     { x: "2019-01-15", y: 550 },
//   ];

//   const [chartData] = useState({
//     series: [
//       {
//         name: "Customers",
//         data: data, // Use the Data array with x and y values
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//         height: 350,
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth", // Use "smooth" for a smoother line
//       },
//       title: {
//         text: "Customers",
//         align: "left",
//       },
//       xaxis: {
//         type: "datetime", // Ensure the x-axis is treated as datetime
//         labels: {
//           formatter: function (value) {
//             const date = new Date(value);
//             return date.toISOString().split("T")[0]; // Show all dates
//           },
//         },
//         tickAmount: data?.length ?? 0, // Adjust for desired number of ticks
//         // min: new Date("2019-01-01").getTime(), // Uncomment if needed
//         // max: new Date("2019-01-15").getTime(), // Uncomment if needed
//       },
//     //   yaxis: {
//     //     opposite: true,
//     //     title: {
//     //       text: "Price",
//     //     },
//     //   },
//       legend: {
//         horizontalAlign: "left",
//       },
//       grid: {
//         row: {
//           colors: ["#f3f3f3", "transparent"], // Alternating row colors
//           opacity: 0.5,
//         },
//       },
//       colors: ["#8477DA"], // Custom color for the chart
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={chartData.options}
//           series={chartData.series}
//           type="area"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// };

// export default ApexChart;
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CustomAreaChart = ({ dataType, data }) => {
  const uniqueBarData = Array.from(
    new Map(data.map((item) => [item.x, item])).values()
  );
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
        type: "area",
        zoom: {
          enabled: false,
        },
        //   toolbar: {
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
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default CustomAreaChart;
