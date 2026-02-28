import { Site, MetricWeights, MetricKey, ScoredSite } from "./types";
import { METRIC_KEYS } from "./metrics";

export function calculateSiteScore(
  site: Site,
  weights: MetricWeights
): ScoredSite {
  const totalWeight = METRIC_KEYS.reduce(
    (sum, key) => sum + weights[key],
    0
  );

  if (totalWeight === 0) {
    return {
      ...site,
      overallScore: 0,
      rank: 0,
      metricContributions: Object.fromEntries(
        METRIC_KEYS.map((key) => [key, 0])
      ) as Record<MetricKey, number>,
    };
  }

  const metricContributions = {} as Record<MetricKey, number>;
  let overallScore = 0;

  METRIC_KEYS.forEach((key) => {
    const normalizedWeight = weights[key] / totalWeight;
    const contribution = site.metrics[key] * normalizedWeight;
    metricContributions[key] = contribution;
    overallScore += contribution;
  });

  return {
    ...site,
    overallScore: Math.round(overallScore * 10) / 10,
    rank: 0,
    metricContributions,
  };
}

export function rankSites(
  sites: Site[],
  weights: MetricWeights
): ScoredSite[] {
  const scored = sites.map((site) => calculateSiteScore(site, weights));
  scored.sort((a, b) => b.overallScore - a.overallScore);
  scored.forEach((site, index) => {
    site.rank = index + 1;
  });
  return scored;
}
