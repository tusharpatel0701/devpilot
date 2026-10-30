"use client";
import { RequireAuth } from "@/components/providers/require-auth";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardPage() {
    return (
        <RequireAuth>
            <AppShell hideHeader>
               <div><h1>Welcome to Dev Pilot</h1></div>
            </AppShell>
        </RequireAuth>
    )
}