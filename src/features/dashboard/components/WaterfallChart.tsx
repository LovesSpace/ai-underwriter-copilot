import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import type {
    CustomSeriesRenderItemAPI,
    CustomSeriesRenderItemParams,
    CustomSeriesRenderItemReturn,
} from "echarts";

import type { EChartsOption } from "echarts";

import { buildWaterfallData } from "../utils/waterfall";
import { niceScale } from "../utils/niceScale";

interface WaterfallChartProps {
    totalScore: number;
    componentScores: any[];
}
const WaterfallChart = ({
    totalScore,
    componentScores,
}: WaterfallChartProps) => {

    const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

    // const { bars, total, minValue, maxValue } = buildWaterfallData(totalScore);

    const { bars, total, minValue, maxValue } =
        buildWaterfallData(
            totalScore,
            componentScores,
        );


    const categories = [
        ...bars.map((bar) => bar.label),
        "Total Score",
    ];

    const chartData: any[] = [
        ...bars.map((bar) => ({
            ...bar,
            type: "bar",
        })),

        {
            label: "Total Score",
            value: total,
            start: 0,
            end: total,
            isPositive: true,
            type: "total",
        },
    ];

    // Y axis: floor min down to nearest 20, ceil max up to nearest 20
    // const yAxisMin = Math.max(0, Math.floor(minValue / 20) * 20);
    // const yAxisMax = Math.ceil(Math.max(maxValue, total) / 20) * 20 + 20;

    const { min: yAxisMin, max: yAxisMax,} = niceScale(
        minValue,
        Math.max(maxValue, total),
        5
    );

    const greenGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#16A34A" },
        { offset: 1, color: "#86EFAC" },
    ]);

    const redGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#DC2626" },
        { offset: 1, color: "#FCA5A5" },
    ]);

    const blueGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#2563EB" },
        { offset: 1, color: "#BFDBFE" },
    ]);

    function renderItem(
        params: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI,
    ): CustomSeriesRenderItemReturn {

        const data = chartData[params.dataIndex];

        const isLastContribution =
            params.dataIndex >= bars.length - 1;

        const start = api.coord([params.dataIndex, data.start]);
        const end = api.coord([params.dataIndex, data.end]);

        const size = api.size?.([1, 0]) as number[] | undefined;

        const barWidth = (size?.[0] ?? 20) * 0.45;

        const x = start[0] - barWidth / 2;

        const y = data.isPositive
            ? end[1]
            : start[1];

        let connector = null;

        const height = Math.abs(start[1] - end[1]);


        if (!isLastContribution) {

            const next = chartData[params.dataIndex + 1];

            const currentEnd = api.coord([
                params.dataIndex,
                data.end,
            ]);

            const nextStart = api.coord([
                params.dataIndex + 1,
                next.start,
            ]);

            connector = {
                type: "line",

                shape: {
                    x1: currentEnd[0] + barWidth / 2,
                    y1: currentEnd[1],
                    x2: nextStart[0] - barWidth / 2,
                    y2: nextStart[1],
                },

                style: {
                    stroke: "#94A3B8",
                    lineWidth: 1,
                    lineDash: [4, 4],
                },
            };

        }

        const children: any[] = [];

        if (connector) {
            children.push(connector);
        }

        const fill =
            data.type === "total"
                ? blueGradient
                : data.isPositive
                    ? greenGradient
                    : redGradient;

        children.push({
            type: "rect",

            shape: {
                x,
                y,
                width: barWidth,
                height: Math.max(height, 2),
                r: 2,
            },

            style: {
                fill,
            },
        });

        const isTotal = data.type === "total";

        children.push({
            type: "text",

            x: start[0],

            y: isTotal ? y - 14 : data.isPositive ? y - 8 : y + height + 10,

            style: {
                text: isTotal ? String(data.value) : `${data.value > 0 ? "+" : ""}${data.value}`,
                fill: isTotal ? "#0F172A" : data.isPositive ? "#166534" : "#DC2626",
                fontSize: isTotal ? 16 : 11,   // was 22 / 14
                fontWeight: 700,
                fontFamily: FONT_FAMILY,
                align: "center",
                verticalAlign: "middle",
            },
        });

        return {
            type: "group",
            children,
        };
    }

    const option: EChartsOption = {

        animationDuration: 1200,
        animationEasing: "cubicOut",

        grid: {
            left: 45,
            right: 20,
            top: 55,
            bottom: 65,
            containLabel: false,
        },

        tooltip: {
            trigger: "item",
            backgroundColor: "#FFFFFF",
            borderColor: "#CBD5E1",
            borderWidth: 1,
            textStyle: {
                color: "#0F172A",
            },
            formatter(params: any) {

                const data = params.data;

                if (data.type === "total") {
                    return `<b>Total Score</b><br/>${data.value}`;
                }

                return `
        <b>${data.label}</b><br/>
        Contribution:
        ${data.value > 0 ? "+" : ""}
        ${data.value}
    `;

            },
        },

        xAxis: {
            type: "category",
            data: categories,

            axisTick: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: "#CBD5E1",
                },
            },

            axisLabel: {
                fontSize: 10,        // was 11
                lineHeight: 14,      // was 16
                color: "#475569",
                interval: 0,
                fontWeight: 600,
                fontFamily: FONT_FAMILY,
                formatter: (value: string) => value.split(" ").join("\n"),
            },
        },

        yAxis: {
            type: "value",

            min: yAxisMin,

            max: yAxisMax,

            interval: 20,

            axisLine: {
                show: false,
            },

            axisTick: {
                show: false,
            },

            axisLabel: {
                fontFamily: FONT_FAMILY,
                fontSize: 10,   // was 11
                color: "#94A3B8",
            },

            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#E2E8F0",
                },
            },
        },

        series: [
            {
                type: "custom",

                coordinateSystem: "cartesian2d",

                renderItem,

                data: chartData,
            },
        ],

    };

    return (

        <ReactECharts

            option={option}

            style={{
                height: 260,
                width: "100%",
            }}

        />

    );

};

export default WaterfallChart;