import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";

const Bar = (props) => {
    const style = props.style
    const data = props.data
    const dataValue = props.dataValue
    const theme = props.theme

    const [color, setColor] = useState();
    const [barColor, setBarColor] = useState();
    const minValue = 0;
    const maxValue = Math.max(...dataValue);
    const interval = Math.ceil((maxValue - minValue) / 10);

    useEffect(() => {
        if (theme == "dark") {
            setColor("#fff");
            setBarColor("#FF7F3E")
        } else {
            setColor("#146C94");
            setBarColor("#6c94bb")
        }
    }, []);
    console.log(color)

    const echartBasicLineOption = {
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
                type: "line",
                animation: true,
            }
        },
        grid: {
            top: "10%",
            left: "40",
            right: "40",
            bottom: "40",
        },
        xAxis: {
            type: "category",
            data: data,
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: "8",
                color: color,
            },
            axisTick: {
                show: false,
            }
        },
        yAxis: {
            type: "value",
            min: minValue,
            max: maxValue,
            interval: interval,
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: "8",
                color: color,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: color,
                    opacity: 0.2,
                    width: 0.7,
                },
            },
            ticks: {
                fontSize: "8px"
            }
        },
        series: [
            {
                data: dataValue,
                type: "bar",
                showSymbol: true,
                smooth: false,
                color: "#639",
                lineStyle: {
                    color: "#6c94bb",
                    opacity: 1,
                    width: 1,
                },
                itemStyle: {
                    show: false,
                    color: barColor,
                    borderColor: barColor,
                    borderWidth: 1,
                },
            },
        ],
    };

    return (
        <ReactEcharts
            style={style}
            option={echartBasicLineOption}
        />
    );
}

export default Bar;