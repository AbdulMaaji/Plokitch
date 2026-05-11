import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  Search,
  MoreVertical,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminPanel = () => {
  const pendingApprovals = [
    { id: "USR-001", name: "Chef Alessandro", role: "Chef", submission: "2 hours ago", status: "Reviewing" },
    { id: "USR-002", name: "Marco Polo", role: "Rider", submission: "5 hours ago", status: "Background Check" },
    { id: "USR-003", name: "Elena Gilbert", role: "Chef", submission: "1 day ago", status: "Pending" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 font-body">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-black text-white mb-2">Platform Oversight</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Admin Command Center</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 flex gap-2">
              <ShieldCheck size={18} />
              Security Logs
            </Button>
            <Button className="bg-gold hover:bg-gold-light text-background font-black px-8">
              GENERATE REPORT
            </Button>
          </div>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-dark-surface border-gold/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-gold/10 border border-gold/20 text-gold">
                  <TrendingUp size={20} />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">+24%</Badge>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-tighter">Gross GMV</p>
              <h3 className="text-2xl font-black text-white mt-1">₦1.24M</h3>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-gold/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500">
                  <Users size={20} />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">+12%</Badge>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-tighter">Total Users</p>
              <h3 className="text-2xl font-black text-white mt-1">12,402</h3>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-gold/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500">
                  <ShoppingBag size={20} />
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-none">-2%</Badge>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-tighter">Orders (MoM)</p>
              <h3 className="text-2xl font-black text-white mt-1">45,012</h3>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-gold/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                  <Activity size={20} />
                </div>
                <Badge className="bg-red-500/10 text-red-500 border-none">Active</Badge>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-tighter">System Health</p>
              <h3 className="text-2xl font-black text-white mt-1">99.9%</h3>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management Table */}
          <Card className="lg:col-span-2 bg-dark-surface border-gold/10 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-heading font-bold text-white uppercase tracking-wider">Onboarding Queue</CardTitle>
                <p className="text-xs text-muted-foreground">Approve or reject new chefs and riders</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search applicants..." className="h-8 pl-8 text-xs bg-dark-deep border-gold/10 w-48" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-dark-deep/50 border-y border-gold/5">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] md:text-xs uppercase font-black text-gold/60 py-4">Applicant</TableHead>
                      <TableHead className="text-[10px] md:text-xs uppercase font-black text-gold/60 py-4">Role</TableHead>
                      <TableHead className="hidden md:table-cell text-xs uppercase font-black text-gold/60 py-4">Submitted</TableHead>
                      <TableHead className="text-[10px] md:text-xs uppercase font-black text-gold/60 py-4">Status</TableHead>
                      <TableHead className="text-[10px] md:text-xs uppercase font-black text-gold/60 py-4 text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((user) => (
                      <TableRow key={user.id} className="border-gold/5 hover:bg-gold/5 transition-colors">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm">{user.name}</span>
                            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{user.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[8px] md:text-[10px] border-gold/20 text-gold uppercase px-1.5">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{user.submission}</TableCell>
                        <TableCell>
                          <span className="text-[10px] md:text-xs font-medium text-white">{user.status}</span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1 md:gap-2">
                            <Button size="icon" variant="ghost" className="h-7 w-7 md:h-8 md:w-8 text-emerald-500 hover:bg-emerald-500/10">
                              <Check size={14} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 md:h-8 md:w-8 text-red-500 hover:bg-red-500/10">
                              <X size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts and Updates */}
          <div className="space-y-6">
            <Card className="bg-dark-surface border-gold/10 overflow-hidden">
              <CardHeader className="bg-red-500/5 pb-4">
                <CardTitle className="text-sm font-black text-red-500 flex items-center gap-2 uppercase tracking-widest">
                  <AlertTriangle size={18} />
                  Critical Incidents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p className="text-xs font-bold text-white mb-1">Server Latency (High)</p>
                  <p className="text-[10px] text-muted-foreground">US-East-1 region experiencing 450ms delay in order processing.</p>
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs font-bold text-white mb-1">Payment Webhook Delay</p>
                  <p className="text-[10px] text-muted-foreground">Stripe webhooks are being retried due to endpoint timeout.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-surface border-gold/10">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Global Heat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 rounded-xl bg-dark-deep border border-gold/10 relative overflow-hidden flex items-center justify-center group">
                  <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=world')] opacity-10" />
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gold/30 rounded-full blur-xl animate-pulse" />
                    <div className="absolute top-10 left-10 w-12 h-12 bg-red-500/20 rounded-full blur-2xl animate-pulse delay-700" />
                    <p className="text-[10px] text-muted-foreground uppercase opacity-50 font-black">Live Data Streamed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
