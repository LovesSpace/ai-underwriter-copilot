import type { CopilotTab } from "@/types/copilot";

import OverviewTab from "./OverviewTab";

interface Props {
  activeTab: CopilotTab;
  summary: any;
  assessmentResponse: any;
}

const CopilotContent = ({
  activeTab,
  summary,
  assessmentResponse,
}: Props) => {

  switch (activeTab) {

    case "overview":
      return (
        <OverviewTab
          summary={summary}
          assessmentResponse={assessmentResponse}
        />
      );

    case "why":
      return (
        <div>
          Why This Score coming next...
        </div>
      );

    case "evidence":
      return (
        <div>
          Evidence coming next...
        </div>
      );

    case "recommendations":
      return (
        <div>
          Recommendations coming next...
        </div>
      );
  }

};

export default CopilotContent;