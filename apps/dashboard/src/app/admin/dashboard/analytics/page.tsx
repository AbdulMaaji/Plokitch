"use client"

import * as React from "react"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Sparkles, 
  Calendar, 
  RefreshCcw,
  ShoppingBag,
  DollarSign,
  MessageSquareWarning,
  Zap,
  Store,
  Bike,
  Heart,
  AlertCircle,
  Target
} from "lucide-react"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { COLORS } from "@/lib/design-system"

// New Analytics Components
import { AIInsightCard } from "@/components/analytics/AIInsightCard"
import { PredictiveMetricCard } from "@/components/analytics/PredictiveMetricCard"
import { PlatformHealthIndicator } from "@/components/analytics/PlatformHealthIndicator"
import { RiskDetectionFeed } from "@/components/analytics/RiskDetectionFeed"
import { AIRecommendationCard } from "@/components/analytics/AIRecommendationCard"

// --- Mock Data ---

const ORDER_TRENDS = [
  { time: "00:00", value: 120 }, { time: "03:00", value: 80 }, { time: "06:00", value: 450 },
  { time: "09:00", value: 1200 }, { time: "12:00", value: 2400 }, { time: "15:00", value: 1800 },
  { time: "18:00", value: 3200 }, { time: "21:00", value: 1600 }
]

const REVENUE_TRENDS = [
  { day: "Mon", rev: 12400 }, { day: "Tue", rev: 15600 }, { day: "Wed", rev: 18200 },
  { day: "Thu", rev: 14800 }, { day: "Fri", rev: 22400 }, { day: "Sat", rev: 28900 },
  { day: "Sun", rev: 24500 }
]

const COMPLAINT_TRENDS = [
  { week: "W1", count: 42 }, { week: "W2", count: 38 }, { week: "W3", count: 56 },
  { week: "W4", count: 24 }, { week: "W5", count: 31 }
]

const PERFORMANCE_DATA = [
  { name: "Pickup", score: 92 }, { name: "Transit", score: 88 }, { name: "Handover", score: 95 },
  { name: "Support", score: 84 }, { name: "Fulfillment", score: 90 }
]

// --- Helper Components ---

const MiniSparkline = ({ data, color }: { data: any[], color: string }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  
  if (!mounted) return <div className="h-8 w-24" />

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const OperationalScoreCard = ({ title, value, trend, isUp, insight, icon: Icon, sparklineData }: any) => (
  <div className="bg-white p-6 rounded-card border border-divider shadow-sm hover:border-navy/20 transition-all flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="p-2.5 rounded-lg bg-navy/5 text-navy">
        <Icon size={18} />
      </div>
      <MiniSparkline data={sparklineData} color={isUp ? "#22c55e" : "#ef4444"} />
    </div>
    <div>
      <p className="text-caption font-bold text-subtle uppercase tracking-wider">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <h3 className="text-h2 font-bold text-navy">{value}</h3>
        <div className={cn("flex items-center gap-0.5 text-[11px] font-bold mb-1", isUp ? "text-green-600" : "text-red-600")}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}%
        </div>
      </div>
      <p className="text-[10px] text-subtle mt-2 font-medium leading-relaxed italic border-l-2 border-divider pl-2">
        {insight}
      </p>
    </div>
  </div>
)

const AnalyticsTrendChart = ({ title, children }: any) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <div className="bg-white p-6 rounded-card border border-divider shadow-sm flex flex-col gap-6">
      <h3 className="text-caption font-bold text-navy uppercase tracking-widest">{title}</h3>
      <div className="h-[250px] w-full">
        {mounted ? children : <div className="w-full h-full bg-beige/10 animate-pulse rounded-lg" />}
      </div>
    </div>
  )
}

// --- Main Page ---

export default function AnalyticsPage() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const sparklineData = React.useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({ value: Math.floor(Math.random() * 50) + 20 })),
  [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-h1 font-bold text-navy">AI Operational Analytics</h1>
            <div className="px-2 py-0.5 rounded-full bg-navy text-white text-[9px] font-bold tracking-widest flex items-center gap-1">
              <Sparkles size={10} fill="currentColor" /> AI LIVE
            </div>
          </div>
          <p className="text-body text-subtle">Real-time platform intelligence, operational insights, and predictive performance monitoring.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white rounded-button border border-divider p-1">
            <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold">24H</Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold bg-navy text-white">7D</Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-[11px] font-bold">30D</Button>
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-10">
            <Download size={18} /> EXPORT REPORT
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-10">
            <Sparkles size={18} /> GENERATE SUMMARY
          </Button>
        </div>
      </div>

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OperationalScoreCard 
          title="Total Orders Today" value="4,284" trend="12.4" isUp={true} icon={ShoppingBag}
          insight="Orders surging in Central District peak hours." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Platform Revenue" value="₦128,450" trend="8.2" isUp={true} icon={DollarSign}
          insight="Revenue per order up by 4% vs last week." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Resolution Rate" value="94.2%" trend="2.1" isUp={true} icon={MessageSquareWarning}
          insight="Refund escalations decreased by 14%." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Dispatch Efficiency" value="88.5%" trend="4.5" isUp={false} icon={Zap}
          insight="Pickup delays increased in Lagos Island." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Vendor Health" value="4.8/5" trend="0.5" isUp={true} icon={Store}
          insight="Fulfillment quality steady across top vendors." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Rider Reliability" value="96.8%" trend="1.2" isUp={true} icon={Bike}
          insight="Average transit time reduced by 48 seconds." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Customer CSAT" value="4.9" trend="0.2" isUp={true} icon={Heart}
          insight="High satisfaction reported for quick deliveries." sparklineData={sparklineData}
        />
        <OperationalScoreCard 
          title="Failed Delivery Rate" value="1.2%" trend="0.8" isUp={true} icon={AlertCircle}
          insight="Anomaly: Failed payouts affecting 4 riders." sparklineData={sparklineData}
        />
      </div>

      {/* AI Insights Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-action/10 text-action">
              <Sparkles size={18} />
            </div>
            <h3 className="text-caption font-bold text-navy uppercase tracking-widest">AI Operational Intelligence</h3>
          </div>
          <span className="text-[10px] font-bold text-subtle uppercase">Last Analysis: 2m ago</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AIInsightCard 
            severity="HIGH" timestamp="12:45 PM" title="Dispatch Delay Anomaly"
            description="Late-night dispatch delays increased in Abuja between 8PM–11PM. Impacting 12% of orders."
            trend="Projected recovery: 2h"
          />
          <AIInsightCard 
            severity="MODERATE" timestamp="12:30 PM" title="Vendor Complaint Spike"
            description="Vendor complaint frequency is rising for high-volume restaurants in Downtown Zone."
            trend="Root cause: Delayed preparation"
          />
          <AIInsightCard 
            severity="LOW" timestamp="12:15 PM" title="Efficiency Optimization"
            description="Rider reassignment algorithm improved delivery completion by 14% in Lekki area."
            trend="Saved 12.4 mins per cycle"
          />
          <AIInsightCard 
            severity="CRITICAL" timestamp="12:00 PM" title="Payment Gateway Latency"
            description="Peak failed deliveries occurred during 480ms latency spike in Stripe-PB-02 gateway."
            trend="Monitoring incident PB-99"
          />
        </div>
      </div>

      {/* Operational Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalyticsTrendChart title="Orders Over Time (Peak Hourly Distribution)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ORDER_TRENDS}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.action} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={COLORS.action} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="value" stroke={COLORS.action} strokeWidth={3} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Revenue Trends (Daily Operational Performance)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} tickFormatter={(value) => `₦${(value/1000).toFixed(0)}k`} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} formatter={(value: any) => [`₦${value.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="rev" fill={COLORS.navy} radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Complaint Volume Trends (Weekly Stability)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COMPLAINT_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="stepAfter" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: "#ef4444" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Fulfillment Quality (Phase-wise Efficiency)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PERFORMANCE_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={COLORS.divider} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.navy, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="score" fill={COLORS.action} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>
      </div>

      {/* Predictive & Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-navy/5 text-navy">
              <Calendar size={18} />
            </div>
            <h3 className="text-caption font-bold text-navy uppercase tracking-widest">Predictive Intelligence</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PredictiveMetricCard 
              title="Dispatch Forecast" prediction="High probability of congestion"
              confidence={88} impact="Average delivery time +14m"
              recommendation="Activate surge dispatch optimization during evening peak hours (6PM-9PM)."
              isPositive={false}
            />
            <PredictiveMetricCard 
              title="Demand Surge" prediction="32% growth expected this weekend"
              confidence={94} impact="Estimated +2,400 additional orders"
              recommendation="Onboard 45 temporary riders and enable 'Fast-Track' vendor payouts."
              isPositive={true}
            />
          </div>

          <div className="bg-white p-8 rounded-card border border-divider shadow-card">
            <h3 className="text-caption font-bold text-navy uppercase tracking-widest mb-8">Platform Health Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <PlatformHealthIndicator label="Payment Gateway Stability" value={98} status="OPTIMAL" />
              <PlatformHealthIndicator label="Dispatch Core Engine" value={100} status="OPTIMAL" />
              <PlatformHealthIndicator label="Vendor Fulfillment quality" value={84} status="STABLE" />
              <PlatformHealthIndicator label="Rider Network Availability" value={92} status="OPTIMAL" />
              <PlatformHealthIndicator label="Complaint Pressure Index" value={62} status="DEGRADED" />
              <PlatformHealthIndicator label="Customer Satisfaction Score" value={96} status="OPTIMAL" />
            </div>
          </div>
        </div>

        {/* Risk Feed Sidebar */}
        <RiskDetectionFeed />
      </div>

      {/* AI Recommendations Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-50 text-green-600">
            <Target size={18} />
          </div>
          <h3 className="text-caption font-bold text-navy uppercase tracking-widest">AI Strategic Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AIRecommendationCard 
            priority="CRITICAL" department="Rider"
            title="Increase rider allocation in Surulere"
            impact="+18% Delivery Completion"
          />
          <AIRecommendationCard 
            priority="HIGH" department="Vendor"
            title="Audit 'The Gourmet Kitchen' quality"
            impact="-42% Weekly Complaints"
          />
          <AIRecommendationCard 
            priority="MEDIUM" department="Dispatch"
            title="Enable auto-scaling for night dispatch"
            impact="14m Reduction in wait time"
          />
          <AIRecommendationCard 
            priority="MEDIUM" department="Experience"
            title="Review loyalty credit for 800+ users"
            impact="+12% Customer Retention"
          />
        </div>
      </div>
    </div>
  )
}
