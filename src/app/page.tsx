"use client";

import { useState, useMemo } from "react";
import { MetricWeights, MetricKey, WeightPreset } from "@/lib/types";
import { SITES } from "@/lib/sites-data";
import { rankSites } from "@/lib/scoring";
import { PRESETS, DEFAULT_WEIGHTS } from "@/lib/presets";
import { Header } from "@/components/dashboard/Header";
import { MetricWeightsPanel } from "@/components/dashboard/MetricWeightsPanel";
import { PresetButtons } from "@/components/dashboard/PresetButtons";
import { SiteList } from "@/components/dashboard/SiteList";

export default function HomePage() {
  const [weights, setWeights] = useState<MetricWeights>({ ...DEFAULT_WEIGHTS });
  const [expandedSiteId, setExpandedSiteId] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>("expert");

  const rankedSites = useMemo(() => rankSites(SITES, weights), [weights]);

  const avgScore =
    rankedSites.length > 0
      ? rankedSites.reduce((s, r) => s + r.overallScore, 0) /
        rankedSites.length
      : 0;

  const handleWeightChange = (key: MetricKey, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };

  const handlePresetSelect = (preset: WeightPreset) => {
    setWeights({ ...preset.weights });
    setActivePreset(preset.id);
  };

  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
    setActivePreset("expert");
  };

  const handleToggle = (id: string) => {
    setExpandedSiteId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-ocean-gradient">
      <Header
        totalSites={rankedSites.length}
        avgScore={avgScore}
        topSite={rankedSites[0] ?? null}
      />

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">
          {/* Left sidebar */}
          <aside className="w-[300px] flex-shrink-0 sticky top-[73px] space-y-4 max-h-[calc(100vh-97px)] overflow-y-auto pb-6">
            <PresetButtons
              activePreset={activePreset}
              onSelect={handlePresetSelect}
            />
            <MetricWeightsPanel
              weights={weights}
              onWeightChange={handleWeightChange}
              onReset={handleReset}
            />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <SiteList
              sites={rankedSites}
              expandedSiteId={expandedSiteId}
              onToggle={handleToggle}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
