import { AppShell } from "@/components/layout/app-shell";
import { SettingsPage } from "@/components/dashboard/settings-page";

export default function Page() {
  return (
    <AppShell>
      <SettingsPage />
    </AppShell>
  );
}