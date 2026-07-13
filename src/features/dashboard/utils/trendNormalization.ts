import type { TrendSeries } from "@/mock/dashboard/trends";

export interface NormalizedSeries extends TrendSeries {
    normalizedData: number[];
}

// Divides the chart into one horizontal "lane" per series (in array order,
// top to bottom) and normalizes each series only within its own lane.
// This keeps every line visually independent so they never cross,
// while still showing each series' own relative trend shape.
export const normalizeSeriesToLanes = (
    series: TrendSeries[]
): NormalizedSeries[] => {

    const laneCount = series.length;
    const laneHeight = 100 / laneCount; // e.g. 3 series -> ~33.3 each
    const padding = laneHeight * 0.18;   // breathing room within each lane

    return series.map((s, index) => {
        const min = Math.min(...s.data);
        const max = Math.max(...s.data);
        const range = max - min || 1;

        // Lane top-to-bottom: series[0] gets the highest lane
        const laneTop = 100 - index * laneHeight;
        const laneBottom = laneTop - laneHeight;

        const usableTop = laneTop - padding;
        const usableBottom = laneBottom + padding;
        const usableRange = usableTop - usableBottom;

        const normalizedData = s.data.map((value) => {
            const ratio = (value - min) / range;
            return usableBottom + ratio * usableRange;
        });

        return {
            ...s,
            normalizedData,
        };
    });
};