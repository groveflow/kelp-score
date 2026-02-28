export type MetricKey =
  | "historicalPresence"
  | "sstSuitability"
  | "nutrientAvailability"
  | "depthSuitability"
  | "urchinDensityRisk"
  | "waveExposure"
  | "proximityToKelp"
  | "waterClarity"
  | "siteAccessibility";

export interface MetricDefinition {
  key: MetricKey;
  label: string;
  shortLabel: string;
  description: string;
  color: string; // Tailwind bg color class
  barColor: string; // Tailwind bg color for the score bar
}

export type MetricScores = Record<MetricKey, number>;
export type MetricWeights = Record<MetricKey, number>;

export interface RiskFlag {
  type: "high" | "medium" | "low";
  label: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  region: "North Coast" | "Central Coast" | "South Coast";
  description: string;
  metrics: MetricScores;
  riskFlags: RiskFlag[];
}

export interface ScoredSite extends Site {
  overallScore: number;
  rank: number;
  metricContributions: Record<MetricKey, number>;
}

export interface WeightPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  weights: MetricWeights;
}
