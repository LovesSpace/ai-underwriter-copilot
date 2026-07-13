import { Info, MapPin, Wallet, Zap, ArrowUp, ArrowDown } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import { trends } from "@/mock/dashboard/trends";

import TrendChart from "./TrendChart";

const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

const iconMap: Record<string, typeof MapPin> = {
    revenue: MapPin,
    cashInflow: Wallet,
    electricity: Zap,
};

const TrendsCard = () => {
    return (
        <AppCard className="mt-4 p-4">

            {/* Header */}

            <div className="mb-4 flex items-center gap-2">

                <h2
                    className="text-base font-bold text-slate-800"
                    style={{ fontFamily: FONT_FAMILY }}
                >
                    Trends
                </h2>

                <span className="text-sm font-medium text-slate-400">
                    (Last 6 Months)
                </span>

                <Info className="h-3.5 w-3.5 text-slate-400" />

            </div>

            {/* Legend */}

            <div className="mb-3 space-y-2.5">

                {trends.series.map((s) => {

                    const Icon = iconMap[s.id] ?? MapPin;
                    const isUp = s.changeDirection === "up";

                    return (
                        <div
                            key={s.id}
                            className="flex items-center gap-2"
                        >

                            <Icon
                                className="h-3.5 w-3.5 shrink-0"
                                style={{ color: s.color }}
                            />

                            <span className="text-xs font-medium text-slate-600">
                                {s.label} ({s.unit})
                            </span>

                            <span className="text-sm font-bold text-slate-900">
                                {s.currentValue.toLocaleString()}
                            </span>

                            <span
                                className={
                                    isUp
                                        ? "flex items-center text-xs font-semibold text-green-600"
                                        : "flex items-center text-xs font-semibold text-red-500"
                                }
                            >
                                {isUp
                                    ? <ArrowUp className="h-3 w-3" />
                                    : <ArrowDown className="h-3 w-3" />}

                                {s.changePercent}%
                            </span>

                        </div>
                    );

                })}

            </div>

            {/* Chart */}

            <TrendChart trends={trends} />

        </AppCard>
    );
};

export default TrendsCard;