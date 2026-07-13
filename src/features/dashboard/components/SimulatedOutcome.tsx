import { ArrowRight } from "lucide-react";

import type { SimulationResult } from "@/types/whatIf";

interface SimulatedOutcomeProps {
  simulation: SimulationResult;
}
const SimulatedOutcome = ({
   simulation,
}: SimulatedOutcomeProps) => {

  return (
    <div
      className="
        rounded-xl
        border
        border-green-100
        bg-gradient-to-br
        from-green-50
        to-white
        p-2
      "
    >
      <h3 className="mb-2 text-[13px] font-bold text-green-800">
        Simulated Outcome
      </h3>

      <div className="space-y-3">

        {/* Score */}

        <div className="grid grid-cols-[1.3fr_auto_auto_auto] items-center gap-2">

          <span className="text-[10px] text-slate-600">
            Financial Health Score
          </span>

          <span className="text-[11px] font-semibold">
            {simulation.score.current}
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />

          <div className="flex items-center gap-2">

            <span className="text-xs font-bold text-green-700">
              {simulation.score.predicted}
            </span>

            <span
              className="
                rounded-md
                bg-green-100
                px-1.5
                py-0.5
                text-[10px]
                font-semibold
                text-green-700
              "
            >
              ↑ {simulation.score.change} pts
            </span>

          </div>

        </div>

        {/* Risk */}

        <div className="grid grid-cols-[1.3fr_auto_auto_auto] items-center gap-2">

          <span className="text-[10px] text-slate-600">
            Risk Category
          </span>

          <span className="text-[11px] font-semibold">
            {simulation.risk.current}
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />

          <span className="text-[11px] font-semibold text-green-700">
            {simulation.risk.predicted}
          </span>

        </div>

        {/* Loan */}

        <div className="grid grid-cols-[1.3fr_auto_auto_auto] items-center gap-2">

          <span className="text-[10px] text-slate-600">
            Suggested Loan
          </span>

          <span className="text-[11px] font-semibold">
            {simulation.loan.current}
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />

          <span className="text-[11px] font-semibold">
            {simulation.loan.predicted}
          </span>

        </div>

        {/* Confidence */}

        <div className="grid grid-cols-[1.3fr_auto_auto_auto] items-center gap-2">

          <span className="text-[10px] text-slate-600">
            Confidence
          </span>

          <span className="text-[11px] font-semibold">
            {simulation.confidence.current}%
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-slate-400" />

          <span className="text-[11px] font-semibold">
            {simulation.confidence.predicted}%
          </span>

        </div>

      </div>

    </div>
  );
};

export default SimulatedOutcome;