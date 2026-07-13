import {
  BadgeCheck,
  CircleDollarSign,
  ShieldCheck,
 Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface ComponentScore {
  id: string;
  title: string;
  score: number;
  color: "green" | "blue" | "purple" | "orange";
  icon: LucideIcon;
}

export const componentScores: ComponentScore[] = [
  {
    id: "cash-flow",
    title: "Cash Flow Score",
    score: 88,
    color: "green",
    icon: CircleDollarSign,
  },
  {
    id: "business",
    title: "Business Stability Score",
    score: 81,
    color: "blue",
    icon: ShieldCheck,
  },
  {
    id: "compliance",
    title: "Compliance Score",
    score: 95,
    color: "purple",
    icon: BadgeCheck,
  },
  {
    id: "alternate",
    title: "Alternate Data Score",
    score: 76,
    color: "orange",
    icon: Sparkles,
  },
];