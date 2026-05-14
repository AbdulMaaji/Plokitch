import * as React from "react"
import { SettingsTabs } from "@/components/settings/SettingsTabs"
import { api } from "@/lib/api"

export default async function SettingsPage() {
  const settings = await api.settings.getPlatformSettings();
  const auditLogs = await api.settings.getAuditLogs();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Platform Settings</h1>
        <p className="text-[15px] font-medium text-subtle/80">Configure global platform rules and manage administrative access.</p>
      </div>

      <SettingsTabs initialSettings={settings} auditLogs={auditLogs} />
    </div>
  )
}
