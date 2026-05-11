"use client"

import * as React from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { COLORS } from "@/lib/design-system"

const data = [
  { name: "Mon", total: 2400 },
  { name: "Tue", total: 1398 },
  { name: "Wed", total: 9800 },
  { name: "Thu", total: 3908 },
  { name: "Fri", total: 4800 },
  { name: "Sat", total: 3800 },
  { name: "Sun", total: 4300 },
]

interface RevenueChartProps {
  className?: string
}

const RevenueChart = ({ className }: RevenueChartProps) => {
  return (
    <div className={className}>
      <h3 className="text-body font-bold text-navy mb-6">Revenue Overview</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.action} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={COLORS.action} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: COLORS.subtle }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: COLORS.subtle }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke={COLORS.action} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTotal)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export { RevenueChart }
