import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, MoreVertical, Edit2, Trash2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const ChefMenu = () => {
  const menuItems = [
    { id: 1, name: "Truffle Salmon Glaze", category: "Mains", price: "$45.00", stock: 12, active: true },
    { id: 2, name: "Wild Mushroom Risotto", category: "Mains", price: "$32.00", stock: 8, active: true },
    { id: 3, name: "Artisan Bread Pack", category: "Sides", price: "$12.00", stock: 25, active: true },
    { id: 4, name: "Lava Cake Central", category: "Desserts", price: "$18.00", stock: 5, active: false },
    { id: 5, name: "Kaltu Zobo Fusion", category: "Drinks", price: "$8.00", stock: 50, active: true },
  ];

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">My Menu</h1>
            <p className="text-muted-foreground mt-1">Manage your culinary offerings and stock</p>
          </div>
          <Button className="bg-gold hover:bg-gold-light text-background font-black tracking-widest px-8 h-12">
            <Plus size={18} className="mr-2" />
            ADD NEW DISH
          </Button>
        </header>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Search dishes..." className="pl-10 bg-dark-surface border-gold/10 focus:border-gold h-12" />
          </div>
          <div className="flex gap-2">
            {["All", "Mains", "Sides", "Desserts", "Drinks"].map((cat) => (
              <Button key={cat} variant="ghost" className="text-xs font-bold uppercase tracking-widest hover:text-gold">
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all group overflow-hidden">
              <div className="h-48 bg-dark-deep relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <Badge className={`uppercase text-[10px] font-black tracking-tighter ${item.active ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    {item.active ? 'Live' : 'Hidden'}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plus className="text-gold/20 w-12 h-12" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{item.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">{item.category}</p>
                  </div>
                  <p className="text-lg font-black text-gold">{item.price}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gold/5 pt-6 mt-2">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">Stock Level</p>
                    <p className="text-sm font-bold text-white">{item.stock} items remaining</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-gold">
                      <Edit2 size={16} />
                    </Button>
                    <Switch checked={item.active} className="data-[state=checked]:bg-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChefMenu;
