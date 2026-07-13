export interface TrendSeries {
    id: string;
    label: string;
    unit: string;
    color: string;
    data: number[];
    currentValue: number;
    changePercent: number;
    changeDirection: "up" | "down";
}

export interface TrendsData {
    months: string[];
    series: TrendSeries[];
}

export const trends: TrendsData = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

    series: [
        {
            id: "revenue",
            label: "Revenue",
            unit: "₹ Lakhs",
            color: "#3B82F6",
            data: [36.2, 37.8, 38.4, 40.1, 41.3, 42.6],
            currentValue: 42.6,
            changePercent: 15,
            changeDirection: "up",
        },
        {
            id: "cashInflow",
            label: "Cash Inflow",
            unit: "₹ Lakhs",
            color: "#22C55E",
            data: [34.5, 35.2, 36.4, 36.9, 37.8, 38.7],
            currentValue: 38.7,
            changePercent: 12,
            changeDirection: "up",
        },
        {
            id: "electricity",
            label: "Electricity",
            unit: "Units",
            color: "#F97316",
            data: [13500, 13200, 13050, 12900, 12600, 12450],
            currentValue: 12450,
            changePercent: 8,
            changeDirection: "down",
        },
    ],
};