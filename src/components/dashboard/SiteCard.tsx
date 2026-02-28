"use client";

import { ScoredSite, MetricKey } from "@/lib/types";
import { METRICS } from "@/lib/metrics";
import {
  ChevronDown,
  MapPin,
  AlertTriangle,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react";

interface SiteCardProps {
  site: ScoredSite;
  isExpanded: boolean;
  onToggle: () => void;
}

function getScoreTier(score: number) {
  if (score >= 80) return { label: "Excellent", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", ring: "ring-emerald-500" };
  if (score >= 65) return { label: "Good", bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", ring: "ring-teal-500" };
  if (score >= 50) return { label: "Fair", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", ring: "ring-amber-500" };
  return { label: "Poor", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", ring: "ring-red-500" };
}

function getRegionColor(region: string) {
  switch (region) {
    case "North Coast":
      return "bg-blue-100 text-blue-700";
    case "Central Coast":
      return "bg-emerald-100 text-emerald-700";
    case "South Coast":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const tier = getScoreTier(score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className={tier.text}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${tier.text}`}>
          {score.toFixed(0)}
        </span>
      </div>
    </div>
  );
}

function MetricBar({
  metricKey,
  score,
}: {
  metricKey: MetricKey;
  score: number;
}) {
  const metric = METRICS.find((m) => m.key === metricKey)!;
  const tier = getScoreTier(score);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-slate-500 w-16 text-right truncate">
        {metric.shortLabel}
      </span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${metric.barColor} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[11px] font-mono text-slate-600 w-6 text-right">
        {score}
      </span>
    </div>
  );
}

export function SiteCard({ site, isExpanded, onToggle }: SiteCardProps) {
  const tier = getScoreTier(site.overallScore);
  const regionColor = getRegionColor(site.region);

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm transition-all duration-300 overflow-hidden
        ${isExpanded ? `${tier.border} shadow-md` : "border-slate-200 hover:border-slate-300 hover:shadow"}`}
    >
      {/* Main row - always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3.5 flex items-center gap-4"
      >
        {/* Rank */}
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold
          ${site.rank <= 3 ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"}`}>
          {site.rank}
        </div>

        {/* Name & location */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {site.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${regionColor}`}
            >
              {site.region}
            </span>
            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500">{site.location}</span>
          </div>
        </div>

        {/* Risk flags */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {site.riskFlags.map((flag, i) => {
            const flagIcon =
              flag.type === "high" ? (
                <AlertTriangle className="w-3 h-3" />
              ) : flag.type === "medium" ? (
                <AlertCircle className="w-3 h-3" />
              ) : (
                <Info className="w-3 h-3" />
              );
            const flagColor =
              flag.type === "high"
                ? "bg-red-50 text-red-600 border-red-200"
                : flag.type === "medium"
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-blue-50 text-blue-600 border-blue-200";

            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${flagColor}`}
                title={flag.label}
              >
                {flagIcon}
                <span className="hidden lg:inline">{flag.label}</span>
              </span>
            );
          })}
        </div>

        {/* Score ring */}
        <ScoreRing score={site.overallScore} />

        {/* Expand chevron */}
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200
            ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3 animate-in fade-in duration-200">
          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed">
            {site.description}
          </p>

          {/* Coordinates */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />
            <span>
              {site.coordinates.lat.toFixed(4)}°N,{" "}
              {Math.abs(site.coordinates.lng).toFixed(4)}°W
            </span>
            <a
              href={`https://www.google.com/maps?q=${site.coordinates.lat},${site.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700"
              onClick={(e) => e.stopPropagation()}
            >
              View Map <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Score breakdown label */}
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold text-slate-700">
              Metric Scores
            </h4>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tier.bg} ${tier.text}`}
            >
              {tier.label} — {site.overallScore.toFixed(1)}
            </span>
          </div>

          {/* Metric bars - 2 columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {METRICS.map((metric) => (
              <MetricBar
                key={metric.key}
                metricKey={metric.key}
                score={site.metrics[metric.key]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
