import Chart from "react-apexcharts";

const PieOption = ({ style, data}) =>{

    const options3 = {
        chart: {
            type: "pie",
            width: "100%",
            height: 400, 
            stroke: null,
            padAngle: 5
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "12px", 
                fontWeight: "bold"
            },
        },
        series: Object.values(data), 
        labels: Object.keys(data), 
        legend: {
            show: true,
            position: "bottom",
            labels: {
                colors: '#fff'
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 480
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ]
    };

      return(
        <Chart
            style={style}
            height={240}
            options={options3}
            series={options3.series}
            type={options3.chart.type}
        />
      )
}

export default PieOption;