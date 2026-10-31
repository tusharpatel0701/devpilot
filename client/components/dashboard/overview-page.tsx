"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Play,
  RefreshCw,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";
import { LanguageIcon } from "@/components/icons/language-icon";
import { useRepos, useRefreshRepos, useStartIndexing } from "@/hooks/use-repo";

// Change this if your repositories page lives on a different route.
const REPOS_HREF = "/dashboard";

type Bucket = "COMPLETED" | "INDEXING" | "FAILED" | "PENDING";

const SEGMENTS: { key: Bucket; label: string; bar: string }[] = [
  { key: "COMPLETED", label: "Indexed", bar: "bg-emerald-500" },
  { key: "INDEXING", label: "Indexing", bar: "bg-indigo-500" },
  { key: "FAILED", label: "Failed", bar: "bg-red-500" },
  { key: "PENDING", label: "Not indexed", bar: "bg-muted-foreground/40" },
];

function getBucket(status: string): Bucket {
  return status === "COMPLETED" || status === "INDEXING" || status === "FAILED"
    ? status
    : "PENDING";
}

function Panel({
  title,
  description,
  action,
  className,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function OverviewPage() {
  const { data: repos = [], isLoading, isError, refetch } = useRepos();
  const refreshMutation = useRefreshRepos();
  const indexMutation = useStartIndexing();

  const stats = useMemo(() => {
    const counts: Record<Bucket, number> = {
      COMPLETED: 0,
      INDEXING: 0,
      FAILED: 0,
      PENDING: 0,
    };
    let files = 0;
    let filesTotal = 0;
    let chunks = 0;
    const langs = new Map<string, number>();

    for (const repo of repos) {
      counts[getBucket(repo.indexStatus)] += 1;
      files += repo.filesProcessed ?? 0;
      filesTotal += repo.filesTotal ?? 0;
      chunks += repo.chunkCount ?? 0;
      const lang = repo.language || "Not detected";
      langs.set(lang, (langs.get(lang) ?? 0) + 1);
    }

    return {
      counts,
      files,
      filesTotal,
      chunks,
      languages: [...langs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
      failed: repos.filter((r) => getBucket(r.indexStatus) === "FAILED"),
      pending: repos.filter((r) => getBucket(r.indexStatus) === "PENDING"),
    };
  }, [repos]);

  const total = repos.length;
  const percentIndexed = total
    ? Math.round((stats.counts.COMPLETED / total) * 100)
    : 0;
  const maxLang = stats.languages[0]?.[1] ?? 1;

  return (
    <main className="space-y-8">
      <DashboardHeader
        title="Overview"
        description="See how your repositories are doing at a glance."
        onRefresh={() => refreshMutation.mutate()}
        isRefreshing={refreshMutation.isPending}
      />

      {isLoading && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
          <span className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            Could not load your repositories.
          </span>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {!isLoading && !isError && total === 0 && (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No repositories yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sync your GitHub account to bring your repositories into DevPilot.
          </p>
          <Button
            className="mt-5"
            onClick={() => refreshMutation.mutate()}
            disabled={refreshMutation.isPending}
          >
            <RefreshCw
              className={cn(
                "mr-2 h-4 w-4",
                refreshMutation.isPending && "animate-spin",
              )}
            />
            Sync GitHub
          </Button>
        </div>
      )}

      {!isLoading && !isError && total > 0 && (
        <>
          <OverviewDashboard repos={repos} />

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              {/* Indexing progress */}
              <Panel
                title="Indexing progress"
                description="How much of your code DevPilot can answer questions about."
              >
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-5xl font-semibold tracking-tight tabular-nums">
                      {percentIndexed}%
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      of repositories indexed
                    </span>
                  </div>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {stats.counts.COMPLETED} / {total}
                  </span>
                </div>

                <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-muted">
                  {SEGMENTS.map((segment) => (
                    <div
                      key={segment.key}
                      className={cn(
                        "h-full transition-all duration-500",
                        segment.bar,
                      )}
                      style={{
                        width: `${(stats.counts[segment.key] / total) * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {SEGMENTS.map((segment) => (
                    <span
                      key={segment.key}
                      className="inline-flex items-center gap-2 text-muted-foreground"
                    >
                      <span
                        className={cn("size-2 rounded-full", segment.bar)}
                      />
                      {segment.label}
                      <span className="tabular-nums text-foreground">
                        {stats.counts[segment.key]}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5 sm:grid-cols-3">
                  {[
                    ["Files processed", stats.files.toLocaleString()],
                    ["Files found", stats.filesTotal.toLocaleString()],
                    ["Chunks created", stats.chunks.toLocaleString()],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xl font-semibold tabular-nums">
                        {value}
                      </p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Needs attention */}
              <Panel
                title="Needs attention"
                description="Repositories where indexing failed."
              >
                {stats.failed.length === 0 ? (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Nothing failed. All good.
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {stats.failed.slice(0, 3).map((repo) => (
                      <li
                        key={repo.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {repo.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {repo.errorMessage || "Indexing failed."}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => indexMutation.mutate(repo.id)}
                          disabled={
                            indexMutation.isPending &&
                            indexMutation.variables === repo.id
                          }
                        >
                          <RefreshCw className="mr-2 h-3.5 w-3.5" />
                          Retry
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>

            <div className="space-y-5">
              {/* Languages */}
              <Panel
                title="Languages"
                description="Across your repositories."
              >
                <ul className="space-y-4">
                  {stats.languages.map(([name, count]) => (
                    <li key={name} className="flex items-center gap-3">
                      <LanguageIcon
                        language={name}
                        variant="tile"
                        className="size-9 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="truncate font-medium">{name}</span>
                          <span className="tabular-nums text-muted-foreground">
                            {count}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary/70"
                            style={{ width: `${(count / maxLang) * 100}%` }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>

              {/* Ready to index */}
              <Panel
                title="Ready to index"
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={REPOS_HREF} />}
                  >
                    All repos
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                }
              >
                {stats.pending.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Every repository has been indexed.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {stats.pending.slice(0, 5).map((repo) => (
                      <li
                        key={repo.id}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {repo.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {repo.owner}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => indexMutation.mutate(repo.id)}
                          disabled={
                            indexMutation.isPending &&
                            indexMutation.variables === repo.id
                          }
                        >
                          <Play className="mr-1.5 h-3.5 w-3.5" />
                          Index
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          </div>
        </>
      )}
    </main>
  );
}