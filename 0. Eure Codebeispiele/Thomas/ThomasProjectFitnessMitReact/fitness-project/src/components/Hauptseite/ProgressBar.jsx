import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../../styles/Apex.css';



const ProgressBar = () => {
  const [state] = React.useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      colors: ['lightseagreen'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
        },
      },
      labels: ['Fortschritt'],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={350}
        
      />
    </div>
  );
};

export default ProgressBar;
