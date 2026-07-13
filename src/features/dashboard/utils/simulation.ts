import type {
  Scenario,
  SimulationResult,
} from "@/types/whatIf";

export const calculateSimulation = (
  scenario: Scenario
): SimulationResult => {

  const baseScore = 84;

  const predictedScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        baseScore
        + scenario.revenueChange * 0.30
        - Math.abs(scenario.electricityChange) * 0.20
        - scenario.vendorPaymentDelay * 0.40
      )
    )
  );

  const scoreChange =
    predictedScore - baseScore;

  const predictedRisk =
    predictedScore >= 90
      ? "Very Low Risk"
      : predictedScore >= 80
      ? "Low Risk"
      : predictedScore >= 70
      ? "Medium Risk"
      : "High Risk";

  const predictedLoan =
    predictedScore >= 90
      ? "₹28 Lakhs"
      : predictedScore >= 80
      ? "₹24 Lakhs"
      : predictedScore >= 70
      ? "₹20 Lakhs"
      : "₹15 Lakhs";

  const predictedConfidence =
    Math.min(
      99,
      Math.max(
        75,
        93 + Math.round(scoreChange / 2)
      )
    );

  return {

    score: {
      current: baseScore,
      predicted: predictedScore,
      change: scoreChange,
    },

    risk: {
      current: "Low Risk",
      predicted: predictedRisk,
    },

    loan: {
      current: "₹20 Lakhs",
      predicted: predictedLoan,
    },

    confidence: {
      current: 93,
      predicted: predictedConfidence,
    },

  };
};