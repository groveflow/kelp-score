"use client";

import { ScoredSite } from "@/lib/types";
import { SiteCard } from "./SiteCard";
import { List } from "lucide-react";

interface SiteListProps {
  sites: ScoredSite[];
  expandedSiteId: string | null;
  onToggle: (id: string) => void;
}

export function SiteList({ sites, expandedSiteId, onToggle }: SiteListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Ranked Restoration Sites
          </h2>
        </div>
        <span className="text-xs text-slate-500">
          {sites.length} sites ranked by your priorities
        </span>
      </div>
      <div className="space-y-2">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            isExpanded={expandedSiteId === site.id}
            onToggle={() => onToggle(site.id)}
          />
        ))}
      </div>
    </div>
  );
}
