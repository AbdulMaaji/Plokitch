"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface DonutChartCardProps {
  title: string
  subtitle: string
  percentage: number
  percentageLabel: string
  data: { name: string; value: number; color: string }[]
  metrics: { label: string; value: number; color: string }[]
  className?: string
}

export function DonutChartCard({
  title,
  subtitle,
  percentage,
  percentageLabel,
  data,
  metrics,
  className
}: DonutChartCardProps) {
  return (
    <div className={cn("bg-white p-10 rounded-card border border-divider shadow-card flex flex-col justify-between h-full", className)}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[16px] font-heading font-bold text-navy">{title}</h3>
            <p className="text-[11px] font-bold text-subtle uppercase tracking-widest">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-10">
          <div className="w-32 h-32 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[20px] font-bold text-navy leading-none">{percentage}%</span>
              <span className="text-[9px] font-bold text-subtle uppercase tracking-tighter mt-1 text-center px-2">{percentageLabel}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 w-full">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", metric.color)} />
                  <span className="text-[11px] font-bold text-navy">{metric.value}</span>
                </div>
                <span className="text-[10px] font-bold text-subtle uppercase tracking-tight whitespace-nowrap">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
