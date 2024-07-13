import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";

const Line = (props) => {
    const style = props.style
    const data = props.data
    const dataValue = props.dataValue

    const color = '#fff';
    const minValue = Math.min(...dataValue);
    const maxValue = Math.max(...dataValue);
    const interval = Math.ceil((maxValue - minValue) / 5);

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
                color: color
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
                color: color
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
                fontSize: "1px"
            }
        },
        series: [
            {
                data: dataValue,
                type: "line",
                showSymbol: true,
                smooth: false,
                color: "#639",
                lineStyle: {
                    color: "#fff",
                    opacity: 1,
                    width: 1.5,
                },
                itemStyle: {
                    show: false,
                    color: "#FF7F3E",
                    borderColor: "#2C4E80",
                    borderWidth: 2,
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

export default Line;