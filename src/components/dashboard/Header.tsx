"use client";

import { ScoredSite } from "@/lib/types";
import { Leaf, MapPin, TrendingUp, Award } from "lucide-react";

interface HeaderProps {
  totalSites: number;
  avgScore: number;
  topSite: ScoredSite | null;
}

export function Header({ totalSites, avgScore, topSite }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                KelpScore
              </h1>
              <p className="text-sm text-slate-500">
                California Kelp Restoration Site Selector
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">Sites:</span>
              <span className="font-semibold text-slate-900">{totalSites}</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">Avg Score:</span>
              <span className="font-semibold text-slate-900">
                {avgScore.toFixed(1)}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-slate-500">Top Site:</span>
              <span className="font-semibold text-teal-700">
                {topSite?.name ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
