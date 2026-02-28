"use client";

import { MetricWeights, MetricKey } from "@/lib/types";
import { METRICS } from "@/lib/metrics";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { DEFAULT_WEIGHTS } from "@/lib/presets";

interface MetricWeightsPanelProps {
  weights: MetricWeights;
  onWeightChange: (key: MetricKey, value: number) => void;
  onReset: () => void;
}

export function MetricWeightsPanel({
  weights,
  onWeightChange,
  onReset,
}: MetricWeightsPanelProps) {
  const isDefault = METRICS.every(
    (m) => weights[m.key] === DEFAULT_WEIGHTS[m.key]
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Attribute Weightings
          </h2>
        </div>
        {!isDefault && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
      <div className="p-4 space-y-4">
        {METRICS.map((metric) => (
          <div key={metric.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-700">
                {metric.shortLabel}
              </label>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {weights[metric.key]}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={weights[metric.key]}
                onChange={(e) =>
                  onWeightChange(metric.key, Number(e.target.value))
                }
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-teal-600
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:h-1.5
                  [&::-webkit-slider-runnable-track]:bg-slate-200
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-teal-600
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-white
                  [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:-mt-[5px]
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110"
              />
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
