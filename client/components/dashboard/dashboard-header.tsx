"use client";

import { RefreshCw, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DashboardHeaderProps = {
  title?: string;
  description?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
};

export function DashboardHeader({
  title = "Your workspace",
  description = "Monitor, index, and explore your GitHub repositories.",
  searchValue = "",
  onSearchChange,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-6 border-b border-border/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          DevPilot workspace
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
        {onSearchChange && (
          <div className="relative min-w-0 flex-1 sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search repositories..."
              className="pl-9"
              aria-label="Search repositories"
            />
          </div>
        )}
        {onRefresh && (
          <Button onClick={onRefresh} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Syncing..." : "Sync GitHub"}
          </Button>
        )}
      </div>
    </header>
  );
}
