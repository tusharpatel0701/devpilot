"use client";

import { useState } from "react";
import { Bell, Code2, Eye, Settings2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SettingsDashboard() {
  const [indexNotifications, setIndexNotifications] = useState(true);
  const [showPrivateRepos, setShowPrivateRepos] = useState(true);
  const [compactCards, setCompactCards] = useState(false);

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 text-sm text-primary">
          <Settings2 className="h-4 w-4" /> Workspace preferences
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize how your DevPilot repository workspace is displayed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" /> Notifications
          </CardTitle>
          <CardDescription>Choose which activity indicators you want to see.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="index-notifications">Indexing notifications</Label>
              <p className="text-sm text-muted-foreground">Show in-app feedback when indexing starts or fails.</p>
            </div>
            <Switch id="index-notifications" checked={indexNotifications} onCheckedChange={setIndexNotifications} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4 text-primary" /> Repository visibility
          </CardTitle>
          <CardDescription>Control which repositories appear in your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="private-repos">Show private repositories</Label>
              <p className="text-sm text-muted-foreground">Include private repositories returned by GitHub.</p>
            </div>
            <Switch id="private-repos" checked={showPrivateRepos} onCheckedChange={setShowPrivateRepos} />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="compact-cards">Compact repository cards</Label>
              <p className="text-sm text-muted-foreground">Use a denser layout when browsing repositories.</p>
            </div>
            <Switch id="compact-cards" checked={compactCards} onCheckedChange={setCompactCards} />
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            <Code2 className="mt-0.5 h-4 w-4 shrink-0" />
            These preferences are currently local to this page. Connect them to your user-settings API to persist them across sessions.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
