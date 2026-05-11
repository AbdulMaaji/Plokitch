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
  MoreVertical, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  MapPin, 
  Receipt,
  Utensils
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChefOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { data: session } = authClient.useSession();

  const fetchOrders = async () => {
    if (!session?.session?.token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${session.session.token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch kitchen orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [session]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    if (!session?.session?.token) return;
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => 
          o.id === orderId ? { ...o, status: newStatus } : o
        ));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        toast.success(`Order marked as ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'pending': return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-black tracking-widest uppercase text-[10px]">Pending</Badge>;
      case 'confirmed': return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-black tracking-widest uppercase text-[10px]">Confirmed</Badge>;
      case 'preparing': return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 font-black tracking-widest uppercase text-[10px]">Preparing</Badge>;
      case 'ready': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black tracking-widest uppercase text-[10px]">Ready</Badge>;
      case 'picking':
      case 'delivering': return <Badge className="bg-gold/10 text-gold border-gold/20 font-black tracking-widest uppercase text-[10px]">Out for Delivery</Badge>;
      case 'completed': return <Badge className="bg-white/5 text-white/40 border-white/10 font-black tracking-widest uppercase text-[10px]">Completed</Badge>;
      case 'cancelled': return <Badge className="bg-red-500/10 text-red-500 border-red-500/20 font-black tracking-widest uppercase text-[10px]">Cancelled</Badge>;
      default: return <Badge className="bg-white/10 text-white font-black tracking-widest uppercase text-[10px]">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Kitchen Orders</h1>
            <p className="text-muted-foreground mt-1">Accept, manage, and complete your active orders</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 font-black tracking-widest px-6 h-12" onClick={fetchOrders}>
              REFRESH
            </Button>
            <Button className="bg-gold hover:bg-gold-light text-background font-black tracking-widest px-8 h-12">
              <Download size={18} className="mr-2" />
              EXPORT
            </Button>
          </div>
        </header>

        <Card className="bg-dark-surface border-gold/10 overflow-hidden rounded-[2rem] shadow-2xl">
          <CardHeader className="border-b border-gold/5 pb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search order ID or customer..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-dark-deep border-gold/10 focus:border-gold rounded-xl transition-all" 
                />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="h-12 border-gold/20 text-gold hover:bg-gold/5 rounded-xl px-6">
                  <Filter size={18} className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-dark-deep/50 border-b border-gold/5">
                  <TableRow className="border-gold/5 hover:bg-transparent">
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 px-8 text-[10px]">Order ID</TableHead>
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 text-[10px]">Customer</TableHead>
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 text-[10px]">Items</TableHead>
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 text-[10px]">Total</TableHead>
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 text-[10px]">Status</TableHead>
                    <TableHead className="text-gold font-black uppercase tracking-widest py-6 text-right pr-8 text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    [1,2,3].map(i => (
                      <TableRow key={i} className="border-gold/5">
                        <TableCell colSpan={6} className="py-8 animate-pulse text-center text-white/20">Loading internal data...</TableCell>
                      </TableRow>
                    ))
                  ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-gold/5 hover:bg-gold/5 transition-all">
                      <TableCell className="font-bold text-white py-8 px-8">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell className="text-white font-medium py-8">{order.customer?.name || "Customer"}</TableCell>
                      <TableCell className="text-muted-foreground py-8">
                        {order.items.length} items
                      </TableCell>
                      <TableCell className="text-gold font-black py-8">₦{Number(order.totalAmount).toLocaleString()}</TableCell>
                      <TableCell className="py-8">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-right py-8 pr-8">
                        <div className="flex items-center justify-end gap-2">
                           <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setSelectedOrder(order)}
                            className="h-10 w-10 border-gold/20 text-gold hover:bg-gold hover:text-background"
                          >
                            <Eye size={18} />
                          </Button>

                          {order.status === 'pending' && (
                            <Button 
                              onClick={() => updateStatus(order.id, 'confirmed')}
                              className="h-10 bg-gold text-background font-black text-[10px] tracking-widest uppercase"
                            >
                              Confirm
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button 
                              onClick={() => updateStatus(order.id, 'preparing')}
                              className="h-10 bg-blue-500 text-white font-black text-[10px] tracking-widest uppercase hover:bg-blue-400"
                            >
                              Prepare
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button 
                              onClick={() => updateStatus(order.id, 'ready')}
                              className="h-10 bg-emerald-500 text-white font-black text-[10px] tracking-widest uppercase hover:bg-emerald-400"
                            >
                              Ready
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-24 text-center">
                        <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">No active culinary requests</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-dark-deep border-gold/20 text-white max-w-2xl rounded-[2rem]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex flex-col">
                    <DialogTitle className="text-2xl font-black text-white uppercase tracking-tighter">
                      Order Details
                    </DialogTitle>
                    <DialogDescription className="text-gold/60 font-bold uppercase tracking-widest text-[10px]">
                      #{selectedOrder.id}
                    </DialogDescription>
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </DialogHeader>

              <div className="space-y-8 mt-4">
                {/* Customer & DeliveryInfo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-dark-surface border border-gold/10">
                    <div className="flex items-center gap-3 mb-4 text-gold">
                      <Receipt size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Customer info</span>
                    </div>
                    <p className="text-lg font-bold text-white">{selectedOrder.customer?.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedOrder.customer?.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customer?.phone || "No phone provided"}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-dark-surface border border-gold/10">
                    <div className="flex items-center gap-3 mb-4 text-gold">
                      <MapPin size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Delivery To</span>
                    </div>
                    <p className="text-sm text-white font-medium">{selectedOrder.deliveryAddress?.street}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedOrder.deliveryAddress?.city}, {selectedOrder.deliveryAddress?.state}</p>
                    {selectedOrder.deliveryAddress?.instructions && (
                      <p className="text-[10px] text-amber-500 mt-2 italic">"{selectedOrder.deliveryAddress.instructions}"</p>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gold">
                    <Utensils size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Ordered Items</span>
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold font-bold text-xs border border-gold/20">
                            {item.quantity}x
                          </div>
                          <span className="font-bold text-white uppercase text-xs tracking-wide">{item.name}</span>
                        </div>
                        <span className="text-sm font-black text-gold">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-6 border-t border-gold/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Total Amount</p>
                    <p className="text-3xl font-black text-gold">₦{Number(selectedOrder.totalAmount).toLocaleString()}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4 pt-4">
                   {selectedOrder.status === 'pending' && (
                    <Button 
                      onClick={() => updateStatus(selectedOrder.id, 'confirmed')}
                      className="flex-1 h-14 bg-gold text-background font-black uppercase tracking-widest rounded-xl"
                    >
                      CONFIRM ORDER
                    </Button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <Button 
                      onClick={() => updateStatus(selectedOrder.id, 'preparing')}
                      className="flex-1 h-14 bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-400"
                    >
                      START PREPARING
                    </Button>
                  )}
                  {selectedOrder.status === 'preparing' && (
                    <Button 
                      onClick={() => updateStatus(selectedOrder.id, 'ready')}
                      className="flex-1 h-14 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400"
                    >
                      MARK AS READY
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedOrder(null)}
                    className="h-14 px-8 border-gold/20 text-gold hover:bg-gold hover:text-background font-black uppercase tracking-widest rounded-xl"
                  >
                    CLOSE
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ChefOrders;
