export interface ScoreContribution {
  label: string;
  value: number;
}

export const scoreBreakdown: ScoreContribution[] = [
  {
    label: "Revenue",
    value: 18,
  },
  {
    label: "GST",
    value: 14,
  },
  {
    label: "Cash Flow",
    value: 11,
  },
  {
    label: "Vendor",
    value: 9,
  },
  {
    label: "Electricity",
    value: -5,
  },
  {
    label: "Fuel",
    value: -4,
  },
  {
    label: "Customer",
    value: -2,
  },
];