export interface WaterfallBar {
    label: string;
    value: number;
    start: number;
    end: number;
    isPositive: boolean;
    color: string;
}

export interface WaterfallChartData {
    bars: WaterfallBar[];
    total: number;
    baseScore: number;
    maxValue: number;
    minValue: number;
}

export const buildWaterfallData = (
    totalScore: number,
    componentScores: any[]
): WaterfallChartData => {
    const contributions = componentScores.map((item) => ({
        label: item.name,
        value: Number((item.score * item.weight).toFixed(2)),
    }));

    const sumOfContributions = contributions.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const baseScore = Number(
        (totalScore - sumOfContributions).toFixed(2)
    );

    let runningTotal = baseScore;

    const bars: WaterfallBar[] = contributions.map((item) => {

        const start = runningTotal;

        runningTotal = Number(
            (runningTotal + item.value).toFixed(2)
        );

        return {
            label: item.label,
            value: item.value,
            start,
            end: runningTotal,
            isPositive: item.value >= 0,
            color: item.value >= 0
                ? "#22C55E"
                : "#EF4444",
        };

    });

    const allValues = bars.flatMap((bar) => [
        bar.start,
        bar.end,
    ]);


    return {
        bars,
        total: runningTotal,
        baseScore,
        maxValue: Math.max(...allValues, runningTotal),
        minValue: Math.min(...allValues, baseScore, 0),
    };
};