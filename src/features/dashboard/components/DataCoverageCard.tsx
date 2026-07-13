import { Info, FileText, Landmark, Smartphone, Settings, Zap, Fuel, ShoppingCart, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import { dataCoverage } from "@/mock/dashboard/dataCoverage";

import DataSourceItem from "./DataSourceItem";

const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

const iconMap: Record<string, LucideIcon> = {
    gst: FileText,
    bank: Landmark,
    upi: Smartphone,
    epfo: Settings,
    electricity: Zap,
    fuel: Fuel,
    purchaseData: ShoppingCart,
    salesData: Receipt,
};

const DataCoverageCard = () => {
    return (
        <AppCard className="mt-4 p-4">

            <div className="mb-4 flex items-center gap-2">

                <h2
                    className="text-base font-bold text-slate-800"
                    style={{ fontFamily: FONT_FAMILY }}
                >
                    Data Coverage &amp; Quality
                </h2>

                <Info className="h-3.5 w-3.5 text-slate-400" />

            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">

                {dataCoverage.map((source) => (
                    <DataSourceItem
                        key={source.id}
                        label={source.label}
                        coverage={source.coverage}
                        quality={source.quality}
                        icon={iconMap[source.id] ?? FileText}
                    />
                ))}

            </div>

        </AppCard>
    );
};

export default DataCoverageCard;