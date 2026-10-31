import { CheckCircle2, Clock3, LoaderCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type RepoStatusProps = {
  indexStatus: string;
  filesProcessed?: number;
  filesTotal?: number;
  chunkCount?: number;
  compact?: boolean;
};

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "border-muted bg-muted/50 text-muted-foreground" },
  QUEUED: { label: "Queued", className: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  INDEXING: { label: "Indexing", className: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  COMPLETED: { label: "Completed", className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  FAILED: { label: "Failed", className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

export function RepoStatus({
  indexStatus,
  filesProcessed = 0,
  filesTotal = 0,
  chunkCount = 0,
  compact = false,
}: RepoStatusProps) {
  const status = statusConfig[indexStatus] ?? {
    label: indexStatus || "Unknown",
    className: "border-muted bg-muted/50 text-muted-foreground",
  };
  const progress = filesTotal > 0
    ? Math.min(100, Math.round((filesProcessed / filesTotal) * 100))
    : 0;

  const Icon = indexStatus === "INDEXING"
    ? LoaderCircle
    : indexStatus === "COMPLETED"
      ? CheckCircle2
      : indexStatus === "FAILED"
        ? XCircle
        : Clock3;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="outline" className={status.className}>
          <Icon className={`mr-1.5 h-3.5 w-3.5 ${indexStatus === "INDEXING" ? "animate-spin" : ""}`} />
          {status.label}
        </Badge>
        {!compact && (
          <span className="text-xs text-muted-foreground">
            {filesProcessed.toLocaleString()} / {filesTotal.toLocaleString()} files · {chunkCount.toLocaleString()} chunks
          </span>
        )}
      </div>
      {!compact && (
        <div className="space-y-1">
          <Progress value={progress} className="h-1.5" />
          <p className="text-right text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}
    </div>
  );
}
