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
import { 
  getExecutiveMetricsAction, 
  getAiInsightsAction, 
  getRevenueAnalyticsAction,
  getOperationalAnalyticsAction,
  getVendorAnalyticsAction,
  getCustomerAnalyticsAction,
  getPredictionsAction
} from "@/app/actions/analytics-actions"

// New Analytics Components
import { AIInsightCard } from "@/components/analytics/AIInsightCard"
import { PredictiveMetricCard } from "@/components/analytics/PredictiveMetricCard"
import { PlatformHealthIndicator } from "@/components/analytics/PlatformHealthIndicator"
import { RiskDetectionFeed } from "@/components/analytics/RiskDetectionFeed"
import { AIRecommendationCard } from "@/components/analytics/AIRecommendationCard"

// --- Helper Components ---

const MiniSparkline = ({ data, color }: { data: any[], color: string }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  
  if (!mounted) return <div className="h-8 w-24" />

  const chartData = (data || []).map((v, i) => ({ value: v, id: i }))

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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
        {trend && (
          <div className={cn("flex items-center gap-0.5 text-[11px] font-bold mb-1", isUp ? "text-green-600" : "text-red-600")}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
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
  const [timeframe, setTimeframe] = React.useState("week")
  const [isLive, setIsLive] = React.useState(true)
  const [lastRefreshed, setLastRefreshed] = React.useState(new Date())

  // Data States
  const [metrics, setMetrics] = React.useState<any>(null)
  const [insights, setInsights] = React.useState<any[]>([])
  const [revenueTrends, setRevenueTrends] = React.useState<any[]>([])
  const [operationalData, setOperationalData] = React.useState<any[]>([])
  const [vendorStats, setVendorStats] = React.useState<any>(null)
  const [customerStats, setCustomerStats] = React.useState<any>(null)
  const [predictions, setPredictions] = React.useState<any[]>([])

  const fetchData = React.useCallback(async () => {
    try {
      const [m, ins, rev, op, vend, cust, pred] = await Promise.all([
        getExecutiveMetricsAction(),
        getAiInsightsAction(),
        getRevenueAnalyticsAction(timeframe),
        getOperationalAnalyticsAction(timeframe),
        getVendorAnalyticsAction(),
        getCustomerAnalyticsAction(),
        getPredictionsAction()
      ])
      
      setMetrics(m)
      setInsights(ins as any[])
      setRevenueTrends(rev)
      setOperationalData(op)
      setVendorStats(vend)
      setCustomerStats(cust)
      setPredictions(pred)
      setLastRefreshed(new Date())
    } catch (error) {
      console.error("Analytics fetch failed", error)
    }
  }, [timeframe])

  React.useEffect(() => {
    setMounted(true)
    fetchData()
    let interval: any
    if (isLive) {
      interval = setInterval(fetchData, 30000)
    }
    return () => clearInterval(interval)
  }, [isLive, fetchData])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">AI Operational Intelligence</h1>
            <div className="px-3 py-1 rounded-full bg-navy text-white text-[9px] font-bold tracking-[0.2em] flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI LIVE ENGINE
            </div>
          </div>
          <p className="text-[15px] font-medium text-subtle/80">Real-time platform intelligence, pattern recognition, and predictive monitoring.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white rounded-full border border-divider p-1 shadow-sm">
            {['today', 'week', 'month'].map((t) => (
              <Button 
                key={t}
                onClick={() => setTimeframe(t)}
                variant="ghost" 
                size="sm" 
                className={cn(
                  "h-8 px-4 text-[11px] font-black rounded-full uppercase tracking-widest",
                  timeframe === t ? "bg-navy text-white shadow-md" : "text-subtle hover:text-navy"
                )}
              >
                {t === 'today' ? '24H' : t === 'week' ? '7D' : '30D'}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-10 border-divider font-bold">
            <Download size={18} /> EXPORT
          </Button>
          <Button 
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "text-white flex items-center gap-2 h-10 px-6 font-bold shadow-md transition-all",
              isLive ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy/90"
            )}
          >
            {isLive ? <RefreshCcw size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {isLive ? "MONITORING LIVE" : "PAUSED"}
          </Button>
        </div>
      </div>

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OperationalScoreCard 
          title="Active Orders" value={metrics?.activeOrders.current || "---"} 
          trend={metrics?.activeOrders.trend} isUp={true} icon={ShoppingBag}
          insight="Real-time volume distribution across zones." 
          sparklineData={metrics?.activeOrders.sparkline}
        />
        <OperationalScoreCard 
          title="Est. Revenue" value={`₦${(metrics?.revenue.current || 0).toLocaleString()}`} 
          trend={metrics?.revenue.trend} isUp={true} icon={DollarSign}
          insight="Gross revenue intelligence for selected period." 
          sparklineData={metrics?.revenue.sparkline}
        />
        <OperationalScoreCard 
          title="Active Customers" value={metrics?.activeEngagement.customers || "---"} 
          trend="+14%" isUp={true} icon={Heart}
          insight="Behavioral retention is trending upward." 
          sparklineData={[12, 45, 32, 67, 45, 89, 72, 94]}
        />
        <OperationalScoreCard 
          title="Fulfillment Efficiency" value={`${metrics?.vendorHealth.percentage || 0}%`} 
          trend={metrics?.failedDeliveries.trend} isUp={false} icon={Zap}
          insight="Dispatch latency detected in some clusters." 
          sparklineData={metrics?.failedDeliveries.sparkline}
        />
      </div>

      {/* AI Insights Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-action/10 text-action shadow-sm">
              <Sparkles size={18} />
            </div>
            <h3 className="text-caption font-bold text-navy uppercase tracking-[0.2em]">Operational Intelligence</h3>
          </div>
          <span className="text-[10px] font-bold text-subtle uppercase tracking-widest flex items-center gap-2">
            <RefreshCcw size={10} className={isLive ? "animate-spin" : ""} />
            Sync: {lastRefreshed.toLocaleTimeString()}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, idx) => (
            <AIInsightCard 
              key={idx}
              severity={insight.severity} 
              timestamp={insight.timestamp} 
              title={insight.title}
              description={insight.description}
              trend={insight.trend}
            />
          ))}
        </div>
      </div>

      {/* Operational Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalyticsTrendChart title="Operational Volume Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrends}>
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
              <Area type="monotone" dataKey="orders" stroke={COLORS.action} strokeWidth={3} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Revenue Performance Analytics">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.divider} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.subtle }} tickFormatter={(value) => `₦${(value/1000).toFixed(0)}k`} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} formatter={(value: any) => [`₦${value.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill={COLORS.navy} radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Fulfillment Quality (Lifecycle Efficiency)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={operationalData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={COLORS.divider} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: COLORS.navy, fontWeight: 700 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="score" fill={COLORS.action} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsTrendChart>

        <AnalyticsTrendChart title="Platform Health Indicators">
          <div className="flex flex-col gap-6 py-4">
             <PlatformHealthIndicator label="Payment Stability" value={98} status="OPTIMAL" />
             <PlatformHealthIndicator label="Dispatch Core" value={100} status="OPTIMAL" />
             <PlatformHealthIndicator label="Vendor Quality" value={metrics?.vendorHealth.percentage || 0} status={metrics?.vendorHealth.percentage > 80 ? "OPTIMAL" : "STABLE"} />
             <PlatformHealthIndicator label="Rider Network" value={92} status="OPTIMAL" />
          </div>
        </AnalyticsTrendChart>
      </div>

      {/* Predictive & Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-navy/5 text-navy shadow-sm">
              <Calendar size={18} />
            </div>
            <h3 className="text-caption font-bold text-navy uppercase tracking-[0.2em]">Predictive Intelligence</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((p, i) => (
              <PredictiveMetricCard 
                key={i}
                title={p.title} 
                prediction={p.prediction}
                confidence={p.confidence} 
                impact={p.impact}
                recommendation={p.recommendation}
                isPositive={p.isPositive}
              />
            ))}
          </div>

          <div className="bg-white p-10 rounded-[32px] border border-divider shadow-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Target size={120} className="text-navy" />
            </div>
            <h3 className="text-caption font-bold text-navy uppercase tracking-[0.2em] mb-10">AI Strategic Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>
        </div>

        {/* Risk Feed Sidebar */}
        <div className="h-full">
           <RiskDetectionFeed insights={insights} />
        </div>
      </div>
    </div>
  )
}
