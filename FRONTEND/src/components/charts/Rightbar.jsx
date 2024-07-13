import ReactEcharts from "echarts-for-react";

const Rightbar = (props) => {
    const style = props.style;

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
            data: ['TKJ','TBSM','TAV', 'TBO'],
            axisLabel: {
                fontSize: 8
            }
        },
        series: [{
            type: 'bar',
            data: [34, 45, 23, 33],
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
