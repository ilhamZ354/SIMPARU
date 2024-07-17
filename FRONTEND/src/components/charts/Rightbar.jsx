import ReactEcharts from "echarts-for-react";

const Rightbar = ({style, data}) => {

    console.log(data)
    const options7 = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 7
            }
        },
        yAxis: {
            type: 'category',
            data: Object.keys(data),
            axisLabel: {
                fontSize: 8
            }
        },
        series: [{
            type: 'bar',
            data: Object.values(data),
            label: {
                show: true,
                position: 'inside',
                fontSize: 7,
                fontWeight: 'bold'
            },
            barWidth: '20px',
            itemStyle: {
                borderRadius: [0, 5, 5, 0]
            }
        }]
    };

    return (
        <ReactEcharts
            style={style}
            option={options7}
        />
    );
}

export default Rightbar;
