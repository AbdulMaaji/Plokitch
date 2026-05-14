"use client"

import * as React from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, ComposedChart } from "recharts"
import { COLORS } from "@/lib/design-system"

interface RevenueChartProps {
  data: { time: string; revenue: number; orders: number }[]
  totals?: {
    revenue: number
    orders: number
    avgOrderValue: number
    completionRate: number
  }
  className?: string
}

const RevenueChart = ({ data, totals, className }: RevenueChartProps) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] font-heading font-bold text-navy">Revenue Performance (Today)</h3>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-[12px] font-bold text-subtle uppercase tracking-wider">Revenue (₦)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" />
            <span className="text-[12px] font-bold text-subtle uppercase tracking-wider">Orders</span>
          </div>
        </div>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.action} stopOpacity={0.15}/>
                <stop offset="95%" stopColor={COLORS.action} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 26, 64, 0.05)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: COLORS.subtle, fontWeight: 500 }} 
              dy={15}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: COLORS.subtle, fontWeight: 500 }} 
              tickFormatter={(value) => `₦${(value/1000).toFixed(0)}K`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: COLORS.subtle, fontWeight: 500 }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 8px 32px rgba(0,26,64,0.12)',
                fontSize: '12px',
                padding: '12px'
              }} 
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke={COLORS.action} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              dot={{ r: 4, fill: COLORS.action, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats Footer */}
      <div className="grid grid-cols-4 gap-4 mt-12 pt-8 border-t border-divider">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">Total Revenue</span>
          <span className="text-[22px] font-bold text-navy">₦{(totals?.revenue || 0).toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">Total Orders</span>
          <span className="text-[22px] font-bold text-navy">{totals?.orders || 0}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">Avg Order Value</span>
          <span className="text-[22px] font-bold text-navy">₦{(totals?.avgOrderValue || 0).toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">Completion Rate</span>
          <span className="text-[22px] font-bold text-navy">{(totals?.completionRate || 0).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

export { RevenueChart }
