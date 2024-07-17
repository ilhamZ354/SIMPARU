import Chart from "react-apexcharts";

const Radial = ({data}) => {

    const options6 = {
        chart: {
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "14px",
                color: undefined,
                offsetY: 30
              },
              value: {
                offsetY: 0,
                fontSize: "16px",
                color: undefined,
                formatter: function (val) {
                  return val;
                }
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          }
        },
        stroke: {
          dashArray: 2
        },
        series: [data],
        labels: ["Rata-rata"]
      };

      return(
        <Chart 
        height={324}
        options={options6}
        series={options6.series}
        type={options6.chart.type}
        />
      );
};

export default Radial;