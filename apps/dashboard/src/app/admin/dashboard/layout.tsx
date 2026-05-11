import * as React from "react"
import { DashboardSidebar } from "@/components/layout/DashboardSidebar"
import { DashboardTopbar } from "@/components/layout/DashboardTopbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-beige">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-64">
        <DashboardTopbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </main>

        {/* Footer info */}
        <footer className="p-8 pt-0 max-w-[1280px] mx-auto w-full text-center">
          <p className="text-[11px] text-subtle font-medium uppercase tracking-widest opacity-50">
            Plokitch Operations Console © 2026 Plokitch Digital Ltd. Internal Access Only.
          </p>
        </footer>
      </div>
    </div>
  )
}
