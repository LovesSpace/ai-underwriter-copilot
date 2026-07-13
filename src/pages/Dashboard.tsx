import { useLocation } from "react-router-dom";

import BusinessHeader from "@/features/dashboard/components/BusinessHeader";
import FinancialHealthCard from "@/features/dashboard/components/FinancialHealthCard";
import AISummaryCard from "@/features/dashboard/components/AISummaryCard";
import WhatIfSimulator from "@/features/dashboard/components/WhatIfSimulator";
import ComponentScoreCard from "@/features/dashboard/components/ComponentScoreCard";
import ScoreExplanationCard from "@/features/dashboard/components/ScoreExplanationCard";
import TrendsCard from "@/features/dashboard/components/TrendsCard";
import DataCoverageCard from "@/features/dashboard/components/DataCoverageCard";
import AICopilotChatCard from "@/features/dashboard/components/AICopilotChatCard";

const Dashboard = () => {

  const location = useLocation();

  const { assessmentRequest, assessmentResponse, } = location.state ?? {};

  if (!assessmentRequest || !assessmentResponse) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            No Assessment Available
          </h2>

          <p className="mt-2 text-slate-500">
            Please create a new assessment from the Assessments page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <BusinessHeader
        businessProfile={assessmentRequest.business_profile}
      />

      <div className="grid grid-cols-12 gap-2.5">

        {/* Left + Center wrapper (spans 9) */}

        <div className="col-span-9">

          <div className="grid grid-cols-9 gap-2.5">

            {/* Left Column */}

            <div className="col-span-3">
              <div className="space-y-4">
                <FinancialHealthCard
                  summary={assessmentResponse.summary}
                />
                <ComponentScoreCard scores={assessmentResponse.component_scores} />
              </div>
            </div>

            {/* Center Column */}

            <div className="col-span-6">
              <AISummaryCard
                summary={assessmentResponse.llm_analysis}
                assessmentResponse={assessmentResponse}
              />
              <ScoreExplanationCard
                totalScore={
                  assessmentResponse.summary.financial_health_score
                }
                componentScores={
                  assessmentResponse.component_scores
                }
              />
            </div>

          </div>

          {/* Data Coverage - spans full width of Left+Center (9 cols) */}

          <div className="mt-4">
            <DataCoverageCard
              // summary={assessmentResponse.summary}
              // componentScores={assessmentResponse.component_scores}
            />
          </div>

        </div>

        {/* Right Column */}

        <div className="col-span-3">
          <WhatIfSimulator />
          <TrendsCard />
          <AICopilotChatCard />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;