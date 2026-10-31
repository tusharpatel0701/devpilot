import { AppShell } from "@/components/layout/app-shell";
import { OverviewPage } from "@/components/dashboard/overview-page";

export default function Page() {
  return (
    <AppShell>
      <OverviewPage />
    </AppShell>
  );
}