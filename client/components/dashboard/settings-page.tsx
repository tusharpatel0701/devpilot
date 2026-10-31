"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import {
  ExternalLink,
  LogOut,
  Monitor,
  Moon,
  Play,
  RefreshCw,
  Sun,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { useRepos, useRefreshRepos, useStartIndexing } from "@/hooks/use-repo";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card">
      <div className="border-b border-border/60 px-6 py-5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="divide-y divide-border/60 px-6">{children}</div>
    </section>
  );
}

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

export function SettingsPage() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: repos = [] } = useRepos();
  const refreshMutation = useRefreshRepos();
  const indexMutation = useStartIndexing();

  const notIndexed = useMemo(
    () =>
      repos.filter(
        (repo) =>
          repo.indexStatus !== "COMPLETED" && repo.indexStatus !== "INDEXING",
      ),
    [repos],
  );

  const login = user?.githubUsername;
  const displayName = user?.displayName || login || "Your account";
  const avatarSrc =
    user?.avatarUrl || (login ? `https://github.com/${login}.png` : undefined);

  return (
    <main className="space-y-8">
      <DashboardHeader
        title="Settings"
        description="Manage your account, appearance and GitHub connection."
      />

      <div className="mx-auto max-w-3xl space-y-6">
        {/* Profile */}
        <Panel
          title="Profile"
          description="Your details come from GitHub, so they are read-only here."
        >
          <div className="flex items-center gap-4 py-5">
            <Avatar className="size-16">
              <AvatarImage src={avatarSrc} alt={displayName} />
              <AvatarFallback className="text-lg">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{displayName}</p>
              {login && (
                <p className="truncate text-sm text-muted-foreground">
                  @{login}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/settings/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Edit on GitHub
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>
        </Panel>

        {/* Appearance */}
        <Panel title="Appearance">
          <Row
            title="Theme"
            description="Choose how DevPilot looks on this device."
          >
            <div
              role="group"
              aria-label="Theme"
              className="flex gap-1 rounded-xl border border-border/60 bg-muted/40 p-1"
            >
              {THEMES.map(({ value, label, icon: Icon }) => {
                const isActive = mounted && theme === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setTheme(value)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>
          </Row>
        </Panel>

        {/* GitHub & indexing */}
        <Panel
          title="GitHub and indexing"
          description="Keep your repositories in sync and ready to chat with."
        >
          <Row
            title="Sync repositories"
            description={`${repos.length} ${repos.length === 1 ? "repository" : "repositories"} connected. Sync to pick up new or renamed repos.`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
            >
              <RefreshCw
                className={cn(
                  "mr-2 h-4 w-4",
                  refreshMutation.isPending && "animate-spin",
                )}
              />
              {refreshMutation.isPending ? "Syncing..." : "Sync now"}
            </Button>
          </Row>

          <Row
            title="Index repositories in bulk"
            description={
              notIndexed.length === 0
                ? "Every repository is already indexed or being indexed."
                : `${notIndexed.length} ${notIndexed.length === 1 ? "repository is" : "repositories are"} not indexed yet, including any that failed.`
            }
          >
            <Button
              size="sm"
              onClick={() =>
                notIndexed.forEach((repo) => indexMutation.mutate(repo.id))
              }
              disabled={notIndexed.length === 0}
            >
              <Play className="mr-2 h-4 w-4" />
              Index {notIndexed.length > 0 ? notIndexed.length : "all"}
            </Button>
          </Row>

          <Row
            title="GitHub access"
            description="Review or revoke DevPilot's access to your account on GitHub."
          >
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/settings/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Manage on GitHub
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Row>
        </Panel>

        {/* Session */}
        <Panel title="Session">
          <Row
            title="Sign out"
            description="You will need to sign in with GitHub again to come back."
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logout.isPending ? "Signing out..." : "Sign out"}
            </Button>
          </Row>
        </Panel>
      </div>
    </main>
  );
}