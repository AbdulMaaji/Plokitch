"use client"

import * as React from "react"
import { Shield, Bell, CreditCard, Laptop, Save, User, Key, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-h1 font-bold text-navy">Platform Settings</h1>
        <p className="text-body text-subtle">Configure global platform rules and manage administrative access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar (Local) */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-beige text-navy font-bold">
            <User size={18} className="text-action" /> Profile Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-subtle hover:bg-beige hover:text-navy transition-all font-medium">
            <Shield size={18} /> Security & Access
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-subtle hover:bg-beige hover:text-navy transition-all font-medium">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-subtle hover:bg-beige hover:text-navy transition-all font-medium">
            <CreditCard size={18} /> Payment Config
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-subtle hover:bg-beige hover:text-navy transition-all font-medium">
            <Globe size={18} /> Operational Rules
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Profile Section */}
          <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
            <div className="p-6 border-b border-divider bg-beige/30">
              <h3 className="text-body font-bold text-navy">Admin Profile</h3>
              <p className="text-caption text-subtle">Your personal administrative identity on the platform.</p>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-white text-2xl font-bold">
                  SA
                </div>
                <Button variant="outline">CHANGE AVATAR</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">FULL NAME</label>
                  <Input defaultValue="System Admin" className="bg-beige/20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">ADMIN EMAIL</label>
                  <Input defaultValue="admin@plokitch.com" disabled className="bg-beige/10" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">ROLE</label>
                  <Input defaultValue="Super Administrator" disabled className="bg-beige/10" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-caption font-bold text-navy uppercase">TIMEZONE</label>
                  <Input defaultValue="GMT+1 (Lagos)" className="bg-beige/20" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-beige/10 border-t border-divider flex justify-end">
              <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2">
                <Save size={18} /> SAVE CHANGES
              </Button>
            </div>
          </div>

          {/* Platform Controls */}
          <div className="bg-white rounded-card border border-divider shadow-card overflow-hidden">
            <div className="p-6 border-b border-divider bg-beige/30">
              <h3 className="text-body font-bold text-navy">Platform Operations Control</h3>
              <p className="text-caption text-subtle">Global switches for the Plokitch delivery network.</p>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between p-4 border border-divider rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-navy">Maintenance Mode</span>
                  <span className="text-caption text-subtle">Temporarily disable customer ordering platform.</span>
                </div>
                <div className="w-12 h-6 bg-divider rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-divider rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-navy">Auto-Dispatch System</span>
                  <span className="text-caption text-subtle">Automatically assign riders based on proximity.</span>
                </div>
                <div className="w-12 h-6 bg-action rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
