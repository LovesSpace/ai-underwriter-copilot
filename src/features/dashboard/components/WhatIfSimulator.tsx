import { useState } from "react";

import AppCard from "@/components/shared/AppCard";

import type { Scenario } from "@/types/whatIf";

import SimulatorSlider from "./SimulatorSlider";
import SimulatedOutcome from "./SimulatedOutcome";
import { calculateSimulation } from "../utils/simulation";


const WhatIfSimulator = () => {
    const [scenario, setScenario] = useState<Scenario>({
        revenueChange: 10,
        electricityChange: -5,
        vendorPaymentDelay: -3,
    });

    const simulation = calculateSimulation(scenario);

    const updateScenario = <
        K extends keyof Scenario
    >(
        key: K,
        value: Scenario[K]
    ) => {
        setScenario(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <AppCard className="space-y-3 p-3">

            {/* Header */}

            <div>

                <div className="flex items-center gap-2">

                    <h2
                        className="text-base font-bold text-slate-800"
                        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                    >
                        What-If Simulator
                    </h2>

                </div>

            </div>

            {/* Sliders */}

            <div className="space-y-2.5">

                <SimulatorSlider
                    label="Revenue Change"
                    value={scenario.revenueChange}
                    min={-50}
                    max={50}
                    suffix="%"
                    onChange={(value) =>
                        updateScenario("revenueChange", value)
                    }
                />

                <SimulatorSlider
                    label="Electricity Change"
                    value={scenario.electricityChange}
                    min={-50}
                    max={50}
                    suffix="%"
                    onChange={(value) =>
                        updateScenario("electricityChange", value)
                    }
                />

                <SimulatorSlider
                    label="Vendor Payment Delay"
                    value={scenario.vendorPaymentDelay}
                    min={-30}
                    max={30}
                    suffix=" Days"
                    onChange={(value) =>
                        updateScenario("vendorPaymentDelay", value)
                    }
                />

            </div>

            {/* Simulated Result */}

            <SimulatedOutcome
                simulation={simulation}
            />

        </AppCard>
    );
};

export default WhatIfSimulator;