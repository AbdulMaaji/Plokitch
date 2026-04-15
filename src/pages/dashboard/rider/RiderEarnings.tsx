import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight,
  Wallet,
  Building,
  CreditCard,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RiderEarnings = () => {
  const stats = [
    { title: "Total Balance", value: "$420.50", icon: Wallet, color: "text-gold" },
    { title: "Last Payout", value: "$310.00", icon: Building, color: "text-emerald-500" },
    { title: "Weekly Goal", value: "85%", icon: TrendingUp, color: "text-blue-500" },
  ];

  const transactions = [
    { id: "TX-901", date: "April 15", type: "Delivery Payout", amount: "$82.40", status: "Pending" },
    { id: "TX-900", date: "April 14", type: "Weekly Withdrawal", amount: "-$310.00", status: "Completed" },
    { id: "TX-899", date: "April 14", type: "Delivery Payout", amount: "$112.00", status: "Completed" },
    { id: "TX-898", date: "April 13", type: "Referral Bonus", amount: "$25.00", status: "Completed" },
  ];

  return (
    <DashboardLayout role="rider">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Earnings</h1>
            <p className="text-muted-foreground mt-1">Track your income and withdraw your balance</p>
          </div>
          <Button className="bg-white text-background hover:bg-gold font-black tracking-[0.2em] px-10 h-12 shadow-xl">
            WITHDRAW FUNDS
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-dark-surface border-gold/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-all" />
              <CardContent className="p-8">
                <stat.icon size={24} className={`${stat.color} mb-4`} />
                <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <ArrowUpRight size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-dark-surface border-gold/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gold/5 pb-6">
              <CardTitle className="text-xl font-heading font-black text-white uppercase tracking-wider">Transaction History</CardTitle>
              <Button variant="ghost" size="sm" className="text-gold font-bold text-[10px] uppercase tracking-widest">
                VIEW ALL
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gold/5">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-gold/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.amount.startsWith('-') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {tx.amount.startsWith('-') ? <CreditCard size={18} /> : <History size={18} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{tx.type}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{tx.date} • {tx.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${tx.amount.startsWith('-') ? 'text-red-500' : 'text-emerald-500'}`}>{tx.amount}</p>
                      <Badge variant="outline" className={`text-[9px] uppercase font-black border-none px-0 mt-1 ${tx.status === 'Pending' ? 'text-amber-500' : 'text-muted-foreground'}`}>
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-dark-surface border-gold/10 p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-4">Elite Rider Bonus</h4>
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold/40">
                  <TrendingUp size={32} className="text-background" />
                </div>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Complete <span className="text-gold font-bold">12 more</span> deliveries this week to unlock a $50 weekend bonus.</p>
                <div className="h-2 bg-dark-deep rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-gold w-[70%]" />
                </div>
                <Button className="w-full bg-gold/10 text-gold hover:bg-gold hover:text-background border border-gold/20 font-black h-12 uppercase tracking-widest text-[11px]">
                  VIEW REQUIREMENTS
                </Button>
              </div>
            </Card>

            <Card className="bg-dark-surface border-gold/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Next Auto-Payout</p>
                  <p className="text-sm font-bold text-white">Monday, April 20</p>
                </div>
              </div>
              <ChevronRightIcon size={20} className="text-muted-foreground" />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ChevronRightIcon = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default RiderEarnings;
