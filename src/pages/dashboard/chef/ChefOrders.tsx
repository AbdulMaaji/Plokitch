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
import { MoreVertical, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChefOrders = () => {
  const orders = [
    { id: "ORD-9921", date: "2024-04-15", customer: "Sophia Chen", total: "$112.50", status: "Preparing", payment: "Paid" },
    { id: "ORD-9922", date: "2024-04-15", customer: "Marcus Wright", total: "$45.00", status: "Ready", payment: "Paid" },
    { id: "ORD-9923", date: "2024-04-14", customer: "Elena Rodriguez", total: "$78.20", status: "Delivered", payment: "Paid" },
    { id: "ORD-9924", date: "2024-04-14", customer: "David Smith", total: "$92.00", status: "Cancelled", payment: "Refunded" },
    { id: "ORD-9925", date: "2024-04-13", customer: "Aisha Khan", total: "$54.00", status: "Delivered", payment: "Paid" },
  ];

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Order History</h1>
            <p className="text-muted-foreground mt-1">Manage and track all kitchen orders</p>
          </div>
          <Button className="bg-gold hover:bg-gold-light text-background font-black tracking-widest px-8 h-12">
            <Download size={18} className="mr-2" />
            EXPORT LIST
          </Button>
        </header>

        <Card className="bg-dark-surface border-gold/10 overflow-hidden">
          <CardHeader className="border-b border-gold/5 pb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search order ID or customer..." className="pl-10 bg-dark-deep border-gold/10 focus:border-gold" />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5">
                  <Filter size={18} className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-dark-deep/50">
                <TableRow className="border-gold/5 hover:bg-transparent">
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Order ID</TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Date</TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Customer</TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Total</TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Status</TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider py-6">Payment</TableHead>
                  <TableHead className="text-right py-6 pr-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-gold/5 hover:bg-gold/5 transition-colors">
                    <TableCell className="font-bold text-white py-6">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground py-6">{order.date}</TableCell>
                    <TableCell className="text-white font-medium py-6">{order.customer}</TableCell>
                    <TableCell className="text-gold font-bold py-6">{order.total}</TableCell>
                    <TableCell className="py-6">
                      <Badge className={`
                        px-3 py-1 font-bold text-[10px] uppercase tracking-widest
                        ${order.status === 'Preparing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : ''}
                        ${order.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : ''}
                        ${order.status === 'Delivered' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : ''}
                        ${order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : ''}
                      `}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-6">{order.payment}</TableCell>
                    <TableCell className="text-right py-6 pr-8">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <MoreVertical size={18} />
                      </Button>
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

export default ChefOrders;
