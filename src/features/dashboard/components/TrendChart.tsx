import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

import type { TrendsData } from "@/mock/dashboard/trends";
import { normalizeSeriesToLanes } from "../utils/trendNormalization";

const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

interface TrendChartProps {
    trends: TrendsData;
}

const TrendChart = ({ trends }: TrendChartProps) => {

    const { months } = trends;
    const normalized = normalizeSeriesToLanes(trends.series);

    const option: EChartsOption = {

        animationDuration: 900,
        animationEasing: "cubicOut",

        grid: {
            left: 0,
            right: 15,
            top: 10,
            bottom: 25,
            containLabel: true,
        },

        tooltip: {
            trigger: "axis",
            backgroundColor: "#FFFFFF",
            borderColor: "#E2E8F0",
            borderWidth: 1,
            textStyle: {
                color: "#0F172A",
                fontFamily: FONT_FAMILY,
                fontSize: 12,
            },
            formatter: (params: any) => {
                const month = params[0]?.axisValue;

                const lines = params.map((p: any) => {
                    const s = normalized[p.seriesIndex];
                    const realValue = s.data[p.dataIndex];

                    return `${p.marker} ${s.label}: <b>${realValue.toLocaleString()}</b> ${s.unit}`;
                });

                return `<b>${month}</b><br/>${lines.join("<br/>")}`;
            },
        },

        xAxis: {
            type: "category",
            data: months,
            boundaryGap: false,

            axisLine: {
                lineStyle: { color: "#E2E8F0" },
            },

            axisTick: { show: false },

            axisLabel: {
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                color: "#94A3B8",
            },
        },

        yAxis: {
            type: "value",
            show: false,
            min: 0,
            max: 100,
        },

        series: normalized.map((s) => ({
            name: s.label,
            type: "line",
            data: s.normalizedData,
            smooth: false,   // was true
            symbol: "circle",
            symbolSize: 7,
            clip: false, 
            lineStyle: {
                width: 2,
                color: s.color,
            },
            itemStyle: {
                color: s.color,
                borderWidth: 2,
                borderColor: "#FFFFFF",
            },
            showSymbol: true,
        })),

    };

    return (
        <ReactECharts
            option={option}
            style={{
                height: 160,
                width: "100%",
            }}
        />
    );

};

export default TrendChart;