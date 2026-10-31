"use client";

import {
  ExternalLink,
  FolderGit2,
  LockKeyhole,
  Play,
  RefreshCw,
} from "lucide-react";

import type { Repository } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LanguageBadge } from "@/components/dashboard/language-badge";
import { RepoStatus } from "@/components/dashboard/repo-status";
import { IndexErrorAlert } from "@/components/dashboard/index-error-alert";

type RepoCardProps = {
  repo: Repository;
  onStartIndexing: (repoId: string) => void;
  isStarting?: boolean;
};

export function RepoCard({
  repo,
  onStartIndexing,
  isStarting = false,
}: RepoCardProps) {

  const isIndexing = repo.indexStatus === "INDEXING";

  return (
    <Card className="group flex h-full flex-col border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">

      {/* Repository Header */}
      <CardHeader className="space-y-3">

        <div className="flex items-start justify-between gap-3">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <FolderGit2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-base font-semibold">
                {repo.name}
              </CardTitle>

              <CardDescription className="truncate text-xs">
                {repo.owner}
              </CardDescription>
            </div>

          </div>

          {repo.isPrivate && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground">
              <LockKeyhole className="h-3 w-3" />
              Private
            </span>
          )}

        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
          {repo.description || "No description provided for this repository."}
        </p>

        <div className="flex flex-wrap items-center gap-2">

          <LanguageBadge language={repo.language} />

          <span className="text-xs text-muted-foreground">
            Default branch: {repo.defaultBranch}
          </span>

        </div>

      </CardHeader>

      {/* Repository Content */}
      <CardContent className="flex-1 space-y-4">

        <RepoStatus
          indexStatus={repo.indexStatus}
          filesProcessed={repo.filesProcessed}
          filesTotal={repo.filesTotal}
          chunkCount={repo.chunkCount}
        />

        <IndexErrorAlert message={repo.errorMessage} />

      </CardContent>

      {/* Repository Footer */}
      <CardFooter className="flex items-center justify-between gap-2 border-t bg-muted/20 pt-4">

        {/* GitHub Link - Base UI compatible */}
        {repo.htmlUrl ? (
          <Button
  variant="ghost"
  size="sm"
  nativeButton={false}
  render={
    <a
      href={repo.htmlUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
    />
  }
>
  GitHub
  <ExternalLink className="ml-2 h-3.5 w-3.5" />
</Button>
        ) : (
          <span />
        )}

        {/* Start Indexing */}
        <Button
          size="sm"
          onClick={() => onStartIndexing(repo.id)}
          disabled={isStarting || isIndexing}
        >

          {isStarting ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}

          {isIndexing
            ? "Indexing..."
            : repo.indexStatus === "COMPLETED"
              ? "Re-index"
              : "Start indexing"}

        </Button>

      </CardFooter>

    </Card>
  );
}