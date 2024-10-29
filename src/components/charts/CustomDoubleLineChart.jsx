import { Box } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const chartData = {
    series: [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 0, 63, 60, 66, 70, 50, 90]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 110, 10, 120]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
            show: false 
          }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '85%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
      },
      fill: {
        opacity: 1
      },
      title: {
        text: 'Estimate',
      },
      tooltip: {
        y: {
          formatter: (val) => `$ ${val} thousands`
        }
      },
      colors: ['#EDB6B6', '#3C41E9'] 
    }
  };

  return (
    <div>
      <Box id="chart" sx={{'.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center':{
        top:'20px !important'
      }}}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}     
        />
      </Box>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
