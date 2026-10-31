import { Activity, CheckCircle2, Code2, FolderGit2 } from "lucide-react";
import type { Repository } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

type OverviewDashboardProps = {
  repos: Repository[];
};

export function OverviewDashboard({ repos }: OverviewDashboardProps) {
  const total = repos.length;
  const indexed = repos.filter((repo) => repo.indexStatus === "COMPLETED").length;
  const indexing = repos.filter((repo) => repo.indexStatus === "INDEXING").length;
  const languages = new Set(repos.map((repo) => repo.language).filter(Boolean)).size;

  const stats = [
    { label: "Repositories", value: total, icon: FolderGit2, detail: "Connected to DevPilot" },
    { label: "Successfully indexed", value: indexed, icon: CheckCircle2, detail: "Ready for exploration" },
    { label: "Currently indexing", value: indexing, icon: Activity, detail: "Active indexing jobs" },
    { label: "Languages detected", value: languages, icon: Code2, detail: "Across your repositories" },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/70">
          <CardContent className="flex items-start justify-between p-5">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <stat.icon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
