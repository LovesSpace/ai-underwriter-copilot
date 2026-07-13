import { useState } from "react";

import AppCard from "@/components/shared/AppCard";

import type { CopilotTab } from "@/types/copilot";

import CopilotTabs from "./CopilotTabs";
import CopilotContent from "./CopilotContent";

interface AISummaryCardProps {
  summary: any;
  assessmentResponse: any
}

const AISummaryCard = ({
  summary,
  assessmentResponse,
}: AISummaryCardProps) => {
  const [activeTab, setActiveTab] =
    useState<CopilotTab>("overview");

  return (
    <AppCard className="space-y-2 p-4">

      {/* Header */}

      <CopilotTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <CopilotContent
        activeTab={activeTab}
        summary={summary}
        assessmentResponse={assessmentResponse}
      />

    </AppCard>
  );
};

export default AISummaryCard;