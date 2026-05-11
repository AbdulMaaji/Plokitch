"use client"

import * as React from "react"
import { Search, Bell, ChevronDown, User, LogOut, Settings as SettingsIcon, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DashboardTopbar() {
  return (
    <header className="h-20 bg-white border-b border-divider flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder group-focus-within:text-navy transition-colors" size={18} />
          <Input 
            placeholder="Search orders, vendors, or riders..." 
            className="pl-12 bg-beige/30 border-transparent focus:bg-white focus:border-divider"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Platform Status CTA */}
        <button className="bg-navy text-white px-5 py-2.5 rounded-button text-nav font-semibold flex items-center gap-2 hover:bg-navy/90 transition-all shadow-sm">
          PLATFORM STATUS <ChevronRight size={14} className="text-action" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-subtle hover:text-navy transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-action rounded-full border-2 border-white" />
        </button>

        {/* Vertical Divider */}
        <div className="w-[1px] h-8 bg-divider" />

        {/* Admin Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm border-2 border-transparent group-hover:border-action transition-all">
                SA
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-caption font-bold text-navy leading-none">System Admin</span>
                <span className="text-[10px] text-subtle font-medium uppercase tracking-wider mt-1">Super Admin</span>
              </div>
              <ChevronDown size={14} className="text-subtle" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 rounded-card border-divider shadow-lg p-2">
            <DropdownMenuLabel className="text-caption font-bold text-subtle px-2 py-1.5 uppercase tracking-wider">Account Settings</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-divider" />
            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-md cursor-pointer hover:bg-beige transition-colors">
              <User size={16} /> <span className="font-semibold text-navy">View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-md cursor-pointer hover:bg-beige transition-colors">
              <SettingsIcon size={16} /> <span className="font-semibold text-navy">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-divider" />
            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-md cursor-pointer hover:bg-red-50 text-red-600 transition-colors">
              <LogOut size={16} /> <span className="font-semibold">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
