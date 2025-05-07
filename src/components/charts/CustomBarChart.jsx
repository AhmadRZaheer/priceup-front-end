// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// const CustomBarChart = () => {
//   const [chartData] = useState({
//     series: [{
//       name: 'Servings',
//       data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35, 29, 56, 40, 50, 38, 42, 33, 47, 28, 53, 36, 44, 48, 34, 32, 57, 39, 49]
//     }],
//     options: {
//       chart: {
//         height: 350,
//         type: 'bar',
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 10,
//           columnWidth: '50%',
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: 0
//       },
//       grid: {
//         row: {
//           colors: ['#fff', '#f2f2f2']
//         }
//       },
//       xaxis: {
//         labels: {
//           rotate: -45
//         },
//         categories: Array.from({ length: 31 }, (_, i) => i + 1), // Days 1 to 31
//         tickPlacement: 'on'
//       },
//       yaxis: {
//         title: {
//           text: 'Servings per Day',
//         },
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shade: 'light',
//           type: "horizontal",
//           shadeIntensity: 0.25,
//           gradientToColors: undefined,
//           inverseColors: true,
//           opacityFrom: 0.85,
//           opacityTo: 0.85,
//           stops: [50, 0, 100]
//         },
//       }
//     }
//   });
//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// }
// export default CustomBarChart;

// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// const CustomBarChart = ({ month, year }) => {
//   // Function to get the number of days in a month
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month, 0).getDate();
//   };

//   const daysInMonth = getDaysInMonth(month, year);

//   // Function to generate an array of date strings like "October 1", "October 2", etc.
//   const generateDateLabels = (month, year) => {
//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const labels = [];
//     for (let day = 1; day <= daysInMonth; day++) {
//       labels.push(`${monthNames[month - 1]} ${day}`);
//     }
//     return labels;
//   };

//   const [chartData] = useState({
//     series: [{
//       name: 'Servings',
//       data: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 100)) // Random data for each day
//     }],
//     options: {
//       chart: {
//         height: 350,
//         type: 'bar',
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 10,
//           columnWidth: '50%',
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: 0
//       },
//       grid: {
//         row: {
//           colors: ['#fff', '#f2f2f2']
//         }
//       },
//       xaxis: {
//         labels: {
//           rotate: -45
//         },
//         categories: generateDateLabels(month, year), // Proper date labels for x-axis
//         tickPlacement: 'on'
//       },
//       yaxis: {
//         title: {
//           text: 'Servings per Day',
//         },
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shade: 'light',
//           type: "horizontal",
//           shadeIntensity: 0.25,
//           gradientToColors: undefined,
//           inverseColors: true,
//           opacityFrom: 0.85,
//           opacityTo: 0.85,
//           stops: [50, 0, 100]
//         },
//       }
//     }
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };
// export default CustomBarChart;


import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomBarChart = ({dataType,data}) => {
  const [series] = useState([{
    name: dataType,
    data
  }]);

  const options = {
    chart: {
      type: 'bar',
      height: 380,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: (val) => new Date(val).toLocaleDateString('en-US'), // Use native JS to format date
      },
    },
    title: {
      text: dataType,
    },
    tooltip: {
      x: {
        formatter: (val) => new Date(val).toLocaleDateString('en-US'), // Use native JS for tooltip formatting
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '90%', 
      },      
    },
    colors: ['#8477DA'],

  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={380} />
      </div>
    </div>
  );
};

export default CustomBarChart;






