import { MetricDefinition } from "./types";

export const METRICS: MetricDefinition[] = [
  {
    key: "siteAccessibility",
    label: "Site Accessibility",
    shortLabel: "Site Accessibility",
    description:
      "Diver and boat access feasibility. Considers proximity to launch points, harbor infrastructure, current strength, and logistical ease for restoration teams.",
    color: "text-violet-600",
    barColor: "bg-violet-500",
  },
  {
    key: "historicalPresence",
    label: "Historical Kelp Presence",
    shortLabel: "Historical Kelp Presence",
    description:
      "Percentage of years with kelp canopy detected in satellite record (1984-2024). Higher values indicate consistent historical kelp habitat.",
    color: "text-emerald-600",
    barColor: "bg-emerald-500",
  },
  {
    key: "sstSuitability",
    label: "Sea Surface Temperature",
    shortLabel: "Sea Surface Temperature",
    description:
      "Proximity to optimal kelp growth temperature range (10-15\u00b0C). Scores decrease as temperatures deviate from ideal.",
    color: "text-blue-600",
    barColor: "bg-blue-500",
  },
  {
    key: "nutrientAvailability",
    label: "Nutrient Availability",
    shortLabel: "Nutrient Availability",
    description:
      "Nitrate and phosphate concentration proxy based on upwelling strength and oceanographic patterns.",
    color: "text-cyan-600",
    barColor: "bg-cyan-500",
  },
  {
    key: "depthSuitability",
    label: "Depth Suitability",
    shortLabel: "Depth Suitability",
    description:
      "Proximity to optimal kelp depth range (5-20m). Shallow rocky substrate with good light penetration.",
    color: "text-indigo-600",
    barColor: "bg-indigo-500",
  },
  {
    key: "urchinDensityRisk",
    label: "Low Urchin Risk",
    shortLabel: "Low Urchin Risk",
    description:
      "Inverse of purple sea urchin barren threat. High score = low urchin density = safer for kelp restoration.",
    color: "text-rose-600",
    barColor: "bg-rose-500",
  },
  {
    key: "waveExposure",
    label: "Wave Exposure Suitability",
    shortLabel: "Wave Exposure Suitability",
    description:
      "Wave energy suitability. Moderate exposure is ideal for nutrient mixing; extreme exposure damages kelp.",
    color: "text-sky-600",
    barColor: "bg-sky-500",
  },
  {
    key: "proximityToKelp",
    label: "Proximity to Existing Kelp",
    shortLabel: "Proximity to Existing Kelp",
    description:
      "Distance to nearest existing kelp bed. Closer beds provide natural spore dispersal and genetic connectivity.",
    color: "text-green-600",
    barColor: "bg-green-500",
  },
  {
    key: "waterClarity",
    label: "Water Clarity",
    shortLabel: "Water Clarity",
    description:
      "Light penetration and turbidity levels. Clear water allows photosynthesis at greater depths.",
    color: "text-amber-600",
    barColor: "bg-amber-500",
  },
];

export const METRIC_KEYS = METRICS.map((m) => m.key);
