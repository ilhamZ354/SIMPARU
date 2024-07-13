import Chart from "react-apexcharts";

const PieOption = (props) =>{
    const style = props.style;

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
        series: [80, 123, 40, 165], 
        labels: ['TAV', 'TKJ', 'TBO', 'TBSM'], 
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