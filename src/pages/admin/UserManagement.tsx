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
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX,
  Mail,
  ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";

const UserManagement = () => {
  const users = [
    { id: "USR-001", name: "Chef Alessandro", role: "Chef", joined: "2024-01-12", status: "Active", verified: true },
    { id: "USR-002", name: "Marco Polo", role: "Rider", joined: "2024-02-01", status: "Inactive", verified: true },
    { id: "USR-003", name: "Elena Gilbert", role: "Chef", joined: "2024-02-15", status: "Active", verified: false },
    { id: "USR-004", name: "Sophia Chen", role: "Customer", joined: "2024-03-01", status: "Active", verified: true },
    { id: "USR-005", name: "David Miller", role: "Rider", joined: "2024-03-10", status: "Suspended", verified: true },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-black text-white">User Management</h1>
              <p className="text-muted-foreground mt-1">Global directory of chefs, riders, and customers</p>
            </div>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 font-bold uppercase tracking-widest px-6 h-12">
              EXPORT DATA
            </Button>
            <Button className="bg-gold hover:bg-gold-light text-background font-black tracking-widest px-8 h-12 shadow-lg shadow-gold/20">
              INVITE USER
            </Button>
          </div>
        </header>

        <Card className="bg-dark-surface border-gold/10">
          <CardHeader className="border-b border-gold/5 pb-8 p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" size={20} />
                <Input placeholder="Search users by name, email or ID..." className="h-14 pl-12 bg-dark-deep border-gold/10 focus:border-gold rounded-xl shadow-inner text-sm" />
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="h-14 px-8 border-gold/10 bg-dark-deep text-gold hover:bg-gold/5 rounded-xl font-bold uppercase tracking-widest text-[11px]">
                  <Filter size={18} className="mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {['All Users', 'Chefs', 'Riders', 'Customers', 'Pending Approval'].map((tab, idx) => (
                <Button 
                  key={tab} 
                  variant="ghost" 
                  className={`h-8 px-4 rounded-full text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'bg-gold/10 text-gold hover:bg-gold/20' : 'text-muted-foreground hover:text-gold'}`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-dark-deep/40">
                <TableRow className="border-gold/5 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6 pl-8">User Information</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Identity</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Joined Date</TableHead>
                  <TableHead className="text-[10px] uppercase font-black text-gold/60 py-6">Status</TableHead>
                  <TableHead className="text-right py-6 pr-8 text-[10px] uppercase font-black text-gold/60">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-gold/5 hover:bg-gold/5 transition-all group">
                    <TableCell className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-gold/20 bg-dark-deep overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-base">{user.name}</h4>
                            {user.verified && <ShieldCheck size={14} className="text-blue-500" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground font-black tracking-widest uppercase">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <Badge className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm shadow-black/20 ${
                        user.role === 'Chef' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                        user.role === 'Rider' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6 text-sm text-muted-foreground font-medium">{user.joined}</TableCell>
                    <TableCell className="py-6">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                          user.status === 'Suspended' ? 'bg-red-500' : 'bg-muted-foreground'
                        }`} />
                        <span className="text-xs font-bold text-white">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 pr-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-emerald-500 hover:bg-emerald-500/10">
                          <UserCheck size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-blue-500 hover:bg-blue-500/10">
                          <Mail size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-red-500 hover:bg-red-500/10">
                          <UserX size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground">
                          <MoreVertical size={16} />
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

export default UserManagement;
