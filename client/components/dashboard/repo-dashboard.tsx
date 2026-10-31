"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  FolderGit2,
  RefreshCw,
  SearchX,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
import { RepoCard } from "@/components/dashboard/repo-card";
import { useRepos, useRefreshRepos, useStartIndexing } from "@/hooks/use-repo";

type StatusFilter = "ALL" | "COMPLETED" | "INDEXING" | "FAILED" | "PENDING";

const FILTERS: { value: StatusFilter; label: string; dot?: string }[] = [
  { value: "ALL", label: "All" },
  { value: "COMPLETED", label: "Indexed", dot: "bg-emerald-500" },
  { value: "INDEXING", label: "Indexing", dot: "bg-indigo-500" },
  { value: "FAILED", label: "Failed", dot: "bg-red-500" },
  { value: "PENDING", label: "Not indexed", dot: "bg-muted-foreground/50" },
];

/** Anything that is not indexed, indexing or failed counts as "not indexed". */
function getBucket(indexStatus: string): StatusFilter {
  if (
    indexStatus === "COMPLETED" ||
    indexStatus === "INDEXING" ||
    indexStatus === "FAILED"
  ) {
    return indexStatus;
  }
  return "PENDING";
}

function RepoCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <Skeleton className="h-1 w-full rounded-none" />

      <div className="space-y-5 p-5">
        <div className="flex items-center gap-3.5">
          <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        <Skeleton className="h-20 w-full rounded-xl" />
      </div>

      <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-5 py-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
}

export function RepoDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const {
    data: repos = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRepos();
  const refreshMutation = useRefreshRepos();
  const indexMutation = useStartIndexing();

  // Search narrows the list first, so the filter counts always match the search.
  const searchedRepos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return repos;
    return repos.filter((repo) =>
      [repo.name, repo.fullName, repo.owner, repo.description, repo.language]
        .some((value) => value?.toLowerCase().includes(term))
    );
  }, [repos, search]);

  const counts = useMemo(() => {
    const result: Record<StatusFilter, number> = {
      ALL: searchedRepos.length,
      COMPLETED: 0,
      INDEXING: 0,
      FAILED: 0,
      PENDING: 0,
    };
    for (const repo of searchedRepos) {
      result[getBucket(repo.indexStatus)] += 1;
    }
    return result;
  }, [searchedRepos]);

  const filteredRepos = useMemo(() => {
    if (statusFilter === "ALL") return searchedRepos;
    return searchedRepos.filter(
      (repo) => getBucket(repo.indexStatus) === statusFilter
    );
  }, [searchedRepos, statusFilter]);

  const isFiltering = search.trim() !== "" || statusFilter !== "ALL";
  const showContent = !isLoading && !isError;

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
  }

  return (
    <main className="space-y-10">
      <DashboardHeader
        searchValue={search}
        onSearchChange={setSearch}
        onRefresh={() => refreshMutation.mutate()}
        isRefreshing={refreshMutation.isPending}
      />

      {showContent && <OverviewDashboard repos={repos} />}

      <section className="space-y-5">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-semibold tracking-tight">
                Repositories
              </h2>
              {showContent && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                  {repos.length}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isFiltering
                ? `Showing ${filteredRepos.length} of ${repos.length} repositories`
                : "Choose a repository to index so DevPilot can understand your code."}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading || isFetching}
          >
            <RefreshCw
              className={cn("mr-2 h-3.5 w-3.5", isFetching && "animate-spin")}
            />
            Refresh list
          </Button>
        </div>

        {/* Status filter */}
        {showContent && repos.length > 0 && (
          <div
            role="group"
            aria-label="Filter repositories by index status"
            className="flex w-full max-w-full gap-1 overflow-x-auto rounded-xl border border-border/60 bg-muted/40 p-1 sm:w-fit"
          >
            {FILTERS.map((filter) => {
              const isActive = statusFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setStatusFilter(filter.value)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter.dot && (
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", filter.dot)}
                    />
                  )}
                  {filter.label}
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      isActive ? "text-foreground/70" : "text-muted-foreground/70"
                    )}
                  >
                    {counts[filter.value]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <RepoCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Could not load repositories</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-3">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred."}
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetch()}
              >
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty */}
        {showContent && filteredRepos.length === 0 && (
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border px-6 py-20 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-inset ring-primary/20">
              {isFiltering ? (
                <SearchX className="h-7 w-7" />
              ) : (
                <FolderGit2 className="h-7 w-7" />
              )}
            </div>

            <h3 className="relative text-lg font-semibold tracking-tight">
              {isFiltering
                ? "No repositories match your filters"
                : "No repositories yet"}
            </h3>
            <p className="relative mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {isFiltering
                ? "Try another name, owner, description or language, or switch the status filter."
                : "Sync your GitHub account to bring your repositories into DevPilot."}
            </p>

            {isFiltering ? (
              <Button
                variant="outline"
                className="relative mt-6"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            ) : (
              <Button
                className="relative mt-6 shadow-sm shadow-primary/25"
                onClick={() => refreshMutation.mutate()}
                disabled={refreshMutation.isPending}
              >
                <RefreshCw
                  className={cn(
                    "mr-2 h-4 w-4",
                    refreshMutation.isPending && "animate-spin"
                  )}
                />
                Sync GitHub
              </Button>
            )}
          </div>
        )}

        {/* Repository grid */}
        {showContent && filteredRepos.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRepos.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onStartIndexing={(id) => indexMutation.mutate(id)}
                isStarting={
                  indexMutation.isPending && indexMutation.variables === repo.id
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}