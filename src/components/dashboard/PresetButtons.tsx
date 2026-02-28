"use client";

import { WeightPreset, MetricWeights } from "@/lib/types";
import { PRESETS } from "@/lib/presets";
import {
  Scale,
  ShieldAlert,
  History,
  Sparkles,
  Thermometer,
  GraduationCap,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  ShieldAlert,
  History,
  Sparkles,
  Thermometer,
  GraduationCap,
};

interface PresetButtonsProps {
  activePreset: string | null;
  onSelect: (preset: WeightPreset) => void;
}

export function PresetButtons({ activePreset, onSelect }: PresetButtonsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">
          Quick Presets
        </h2>
      </div>
      <div className="p-3 grid grid-cols-1 gap-2">
        {PRESETS.map((preset) => {
          const Icon = ICON_MAP[preset.icon] ?? Scale;
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200
                ${
                  isActive
                    ? "bg-teal-50 border-teal-300 border ring-1 ring-teal-200 text-teal-800"
                    : "bg-slate-50 border border-transparent hover:bg-slate-100 hover:border-slate-200 text-slate-700"
                }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive ? "text-teal-600" : "text-slate-400"
                }`}
              />
              <div className="min-w-0">
                <div className="text-xs font-medium truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {preset.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
