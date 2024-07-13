import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

const BarOption7 = (props) => {
    const style = props.style
    const datas = props.datas

    const minValue = 0;
    const maxValue = Math.max(...datas.data);
    const interval = Math.ceil((maxValue - minValue) / 10);

    const options7 = {
    chart: {
        toolbar:{
            show:false
        },
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal: true,
            endingShape: 'rounded',
            barHeight:"15px",
            borderRadius: 2,
            groupPadding: 0
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '8px'
        }
    },
    series: [{
        data: datas.data,
        dataLabels: {
            style: {
                fontSize: '8px',
                fontWeight: 'bold'
            }
        }
    }],
    xaxis: {
        categories: datas.kategori,
        labels: {
            style: {
                fontSize: '8px',
                colors:'#fff'
            }
        },
        plotOptions: {
            barHeight: "2px"
        }
    },
    yaxis: {
        min: minValue,
        max: maxValue,
        interval: interval,
        labels: {
            style: {
                fontSize: '10px',
                colors:'#fff'
            }
        }
    }
  }

  return(
    <Chart
        style={style}
        height='100%'
        options={options7}
        series={options7.series}
        type={options7.chart.type}
    />
  )
};

export default BarOption7;