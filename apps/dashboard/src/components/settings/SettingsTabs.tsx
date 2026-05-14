"use client"

import * as React from "react"
import { Shield, Bell, CreditCard, Laptop, Save, User, Key, Globe, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SettingsTabsProps {
  initialSettings: any
  auditLogs: any[]
}

export function SettingsTabs({ initialSettings, auditLogs }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Navigation Sidebar */}
      <div className="lg:col-span-1 flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab('profile')}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all",
            activeTab === 'profile' ? "bg-beige text-navy" : "text-subtle hover:bg-beige/50 hover:text-navy"
          )}
        >
          <User size={18} className={activeTab === 'profile' ? "text-action" : ""} /> Profile Settings
        </button>
        <button 
          onClick={() => setActiveTab('operational')}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all",
            activeTab === 'operational' ? "bg-beige text-navy" : "text-subtle hover:bg-beige/50 hover:text-navy"
          )}
        >
          <Globe size={18} className={activeTab === 'operational' ? "text-action" : ""} /> Operational Rules
        </button>
        <button 
          onClick={() => setActiveTab('audit')}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all",
            activeTab === 'audit' ? "bg-beige text-navy" : "text-subtle hover:bg-beige/50 hover:text-navy"
          )}
        >
          <History size={18} className={activeTab === 'audit' ? "text-action" : ""} /> Audit Logs
        </button>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3 flex flex-col gap-8">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
            <div className="p-6 border-b border-divider bg-beige/30">
              <h3 className="text-body font-bold text-navy">Admin Profile</h3>
              <p className="text-caption text-subtle">Your personal administrative identity on the platform.</p>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-white text-2xl font-bold">
                  OC
                </div>
                <Button variant="outline">CHANGE AVATAR</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">FULL NAME</label>
                  <Input defaultValue="Operational Console" className="bg-beige/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">ADMIN EMAIL</label>
                  <Input defaultValue="admin@plokitch.com" disabled className="bg-beige/10" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-beige/10 border-t border-divider flex justify-end">
              <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
                <Save size={18} /> SAVE CHANGES
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'operational' && (
          <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
            <div className="p-6 border-b border-divider bg-beige/30">
              <h3 className="text-body font-bold text-navy">Platform Controls</h3>
              <p className="text-caption text-subtle">Global rules for the Plokitch network.</p>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between p-4 border border-divider rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-navy">Commission Rate</span>
                  <span className="text-caption text-subtle">Standard fee taken from vendor sales.</span>
                </div>
                <div className="flex items-center gap-2 w-24">
                  <Input defaultValue={initialSettings.commissionRate} type="number" className="text-right font-bold" />
                  <span className="font-bold text-navy">%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-divider rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-navy">Maintenance Mode</span>
                  <span className="text-caption text-subtle">Disable customer access.</span>
                </div>
                <div className={cn(
                  "w-12 h-6 rounded-full relative cursor-pointer",
                  initialSettings.maintenanceMode ? "bg-action" : "bg-divider"
                )}>
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                    initialSettings.maintenanceMode ? "right-1" : "left-1"
                  )} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
            <div className="p-6 border-b border-divider bg-beige/30">
              <h3 className="text-body font-bold text-navy">Administrative Audit Logs</h3>
              <p className="text-caption text-subtle">Tamper-proof record of all operational interventions.</p>
            </div>
            <div className="p-0">
              {auditLogs.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center gap-4">
                  <History size={40} className="text-subtle/30" />
                  <p className="text-caption font-medium text-subtle">No audit logs found for the current period.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-beige/10 border-b border-divider">
                        <th className="p-4 text-[10px] font-bold text-subtle uppercase">Action</th>
                        <th className="p-4 text-[10px] font-bold text-subtle uppercase">Entity</th>
                        <th className="p-4 text-[10px] font-bold text-subtle uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="border-b border-divider hover:bg-beige/5">
                          <td className="p-4 font-bold text-navy text-[13px]">{log.action}</td>
                          <td className="p-4 text-[13px] text-subtle">{log.entity_type} ({log.entity_id})</td>
                          <td className="p-4 text-[12px] text-subtle">{new Date(log.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
