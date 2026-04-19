import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";

const OrderOverview = () => {
  const globalOrders = [
    { id: "ORD-9921", customer: "Sophia Chen", chef: "Chef Andre", amount: "₦112.50", status: "In Transit", priority: "High" },
    { id: "ORD-9922", customer: "Marcus Wright", chef: "Elena's Kitchen", amount: "₦45.00", status: "Preparing", priority: "Medium" },
    { id: "ORD-9923", customer: "Elena R.", chef: "Pasta Palace", amount: "₦78.20", status: "Delivered", priority: "Normal" },
    { id: "ORD-9924", customer: "David Smith", chef: "Chef Andre", amount: "₦92.00", status: "Ready for Pickup", priority: "High" },
    { id: "ORD-9925", customer: "Aisha Khan", chef: "Kaltu Bites", amount: "₦54.00", status: "Cancelled", priority: "Low" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black text-white">Order Stream</h1>
              <p className="text-muted-foreground mt-1">Live monitoring of all platform transactions</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-dark-surface border border-gold/10 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Live Updates Active</span>
            </div>
          </div>
        </header>

        <Card className="bg-dark-surface border-gold/10">
          <CardHeader className="p-8 border-b border-gold/5">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search orders, customers, or vendors..." className="pl-10 h-12 bg-dark-deep border-gold/10 focus:border-gold" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-12 border-gold/10 bg-dark-deep text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
                  <Filter size={16} className="mr-2" />
                  Filter Status
                </Button>
                <Button variant="outline" className="h-12 border-gold/10 bg-dark-deep text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
                  <Clock size={16} className="mr-2" />
                  Time Range
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-dark-deep/40">
                <TableRow className="border-gold/5 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6 pl-8">Order Information</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Participants</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Amount</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Priority</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Status</TableHead>
                  <TableHead className="text-right py-6 pr-8 text-[10px] uppercase font-black text-gold/60">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {globalOrders.map((order) => (
                  <TableRow key={order.id} className="border-gold/5 hover:bg-gold/5 transition-all group">
                    <TableCell className="py-6 pl-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-base">{order.id}</span>
                        <span className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Gombe Central Area</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest w-8">Chef:</span>
                          <span className="text-xs font-bold text-white">{order.chef}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest w-8">User:</span>
                          <span className="text-xs font-medium text-white/80">{order.customer}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 font-black text-gold text-base">{order.amount}</TableCell>
                    <TableCell className="py-6">
                      <div className="flex items-center gap-2">
                         {order.priority === 'High' && <AlertCircle size={14} className="text-red-500 animate-pulse" />}
                         <span className={`text-[10px] font-black uppercase tracking-widest ${
                           order.priority === 'High' ? 'text-red-500' : 
                           order.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                         }`}>{order.priority}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <Badge className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                        order.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        order.status === 'Preparing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6 pr-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-gold hover:bg-gold/10">
                          <Eye size={18} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground">
                          <MoreHorizontal size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderOverview;
