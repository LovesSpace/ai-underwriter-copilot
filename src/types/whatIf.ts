export interface Scenario {
  revenueChange: number;
  electricityChange: number;
  vendorPaymentDelay: number;
}

export interface SimulationResult {
  score: {
    current: number;
    predicted: number;
    change: number;
  };

  risk: {
    current: string;
    predicted: string;
  };

  loan: {
    current: string;
    predicted: string;
  };

  confidence: {
    current: number;
    predicted: number;
  };
}