import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit2, Trash2, SlidersHorizontal, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";
import { Loader2 } from "lucide-react";
import { DISH_CATEGORIES } from "@/constants/categories";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

interface Dish {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  active: boolean;
  description?: string;
}

const ChefMenu = () => {
  const { myVendor, menuItems, loading, refreshData, session } = useChefData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Dish>>({
    name: "",
    category: "Mains",
    price: "",
    stock: 0,
    active: true,
    imageUrl: "",
  });

  const categories = ["All", ...DISH_CATEGORIES];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const itemCategory = item.category?.toLowerCase() || "mains";
    const selectedCatLower = selectedCategory.toLowerCase();
    
    const matchesCategory = selectedCategory === "All" || itemCategory === selectedCatLower;
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDish = async () => {
    if (!myVendor) {
      toast.error("Set up your Kitchen Profile in Settings first", {
        description: "You need an active kitchen identity to add dishes."
      });
      return;
    }

    if (!formData.name || !formData.price) {
      toast.error("Required fields missing", {
        description: "Please provide both a name and a price for your dish."
      });
      return;
    }

    setIsUploading(true);
    let finalImageUrl = formData.imageUrl;

    try {
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const res = await fetch(`${API_URL}/api/vendors/${myVendor.id}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl,
          category: formData.category?.toLowerCase(),
          price: formData.price.toString()
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Dish added to menu");
        refreshData();
        setIsAddDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to add dish");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateDish = async () => {
    if (!editingDish || !formData.name || !formData.price || !myVendor) return;

    setIsUploading(true);
    let finalImageUrl = formData.imageUrl;

    try {
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }

      const res = await fetch(`${API_URL}/api/vendors/${myVendor.id}/menu/${editingDish.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: finalImageUrl,
          category: formData.category?.toLowerCase()
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Dish updated");
        refreshData();
        setIsEditDialogOpen(false);
        setEditingDish(null);
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to update dish");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDish = async (id: string) => {
    if (!myVendor) return;
    try {
      const res = await fetch(`${API_URL}/api/vendors/${myVendor.id}/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.session?.token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Dish removed");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to delete dish");
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    if (!myVendor) return;
    try {
      const res = await fetch(`${API_URL}/api/vendors/${myVendor.id}/menu/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.session?.token}`
        },
        body: JSON.stringify({ isAvailable: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(currentStatus ? "Dish hidden" : "Dish is now live");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  };

  const openEditDialog = (dish: any) => {
    setEditingDish(dish);
    setFormData(dish);
    setImagePreview(dish.imageUrl);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Mains",
      price: "",
      stock: 0,
      active: true,
      imageUrl: "",
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <DashboardLayout role="chef">
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div>
            <h1 className="text-4xl font-heading font-black text-white">Culinary Catalog</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage your signature offerings and inventory</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-gold hover:bg-gold-light text-background font-black tracking-widest px-8 h-12 shadow-lg shadow-gold/20">
                <Plus size={18} className="mr-2" />
                CREATE NEW DISH
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-dark-surface border-gold/10 text-white sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-wider text-gold">Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Product Image (High Res)</Label>
                  <input 
                    type="file" 
                    id="dish-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div 
                    onClick={() => document.getElementById('dish-upload')?.click()}
                    className="w-full h-40 rounded-xl border border-dashed border-gold/20 bg-dark-deep flex flex-col items-center justify-center text-muted-foreground gap-2 cursor-pointer hover:bg-gold/5 transition-all overflow-hidden relative group"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Change Photo</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={24} />
                        <span className="text-[10px] font-bold">UPLOAD HIGH-RES PREVIEW</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Dish Name</Label>
                    <Input 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Truffle Infused Risotto" 
                      className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(val) => setFormData({...formData, category: val})}
                    >
                      <SelectTrigger className="bg-dark-deep border-gold/10 focus:border-gold h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-gold/10 text-white">
                        {categories.filter(c => c !== "All").map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Price (₦)</Label>
                    <Input 
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00" 
                      className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Current Stock</Label>
                    <Input 
                      type="number"
                      value={formData.stock} 
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-deep border border-gold/5">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Product Visibility</Label>
                    <Switch 
                      checked={formData.active} 
                      onCheckedChange={(val) => setFormData({...formData, active: val})}
                      className="data-[state=checked]:bg-gold" 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  disabled={isUploading}
                  onClick={handleAddDish} 
                  className="w-full bg-gold hover:bg-gold-light text-background font-black uppercase tracking-widest h-12"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      PREPARING ASSETS...
                    </>
                  ) : (
                    "CONFIRM ADDITION"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search catalog by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-dark-surface border-gold/10 focus:border-gold h-14 rounded-2xl shadow-xl" 
            />
          </div>
          <div className="flex items-center gap-2 bg-dark-surface/50 p-1 rounded-2xl border border-gold/5 backdrop-blur-md">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "secondary" : "ghost"} 
                className={`text-[10px] font-black uppercase tracking-wider h-11 px-6 rounded-xl transition-all ${
                  selectedCategory === cat ? 'bg-gold text-background hover:bg-gold' : 'text-muted-foreground hover:text-gold'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-dark-surface border-gold/10 hover:border-gold/30 transition-all group overflow-hidden rounded-[2rem] shadow-2xl relative">
              <div className="h-48 bg-dark-deep relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <Badge className={`uppercase text-[10px] font-black tracking-widest px-3 py-1 border-none shadow-xl ${item.isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    {item.isAvailable ? 'LIVE' : 'HIDDEN'}
                  </Badge>
                </div>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <SlidersHorizontal size={80} className="text-gold" />
                  </div>
                )}
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-gold/60 uppercase tracking-[0.3em] font-black mt-2">{item.category}</p>
                  </div>
                  <p className="text-xl font-black text-white">₦{Number(item.price).toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gold/5 pt-6 mt-2">
                  <div className="space-y-1">
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Pricing</p>
                    <p className="text-sm font-bold text-emerald-500">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => openEditDialog(item)}
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 border-gold/20 text-gold hover:bg-gold/5 rounded-xl"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      onClick={() => handleDeleteDish(item.id)}
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 border-red-500/20 text-red-500 hover:bg-red-500/5 rounded-xl"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <div className="ml-2 pl-4 border-l border-gold/10">
                      <Switch 
                        checked={item.isAvailable} 
                        onCheckedChange={() => toggleStatus(item.id, item.isAvailable)}
                        className="data-[state=checked]:bg-gold" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/20 mx-auto mb-6">
                <Search size={32} />
             </div>
             <h3 className="text-2xl font-black text-white uppercase tracking-widest">No Dishes Found</h3>
             <p className="text-muted-foreground">Adjust your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-dark-surface border-gold/10 text-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-wider text-gold">Edit Culinary Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Update Photo</Label>
                <input 
                  type="file" 
                  id="dish-upload-edit" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div 
                  onClick={() => document.getElementById('dish-upload-edit')?.click()}
                  className="w-full h-40 rounded-xl border border-dashed border-gold/20 bg-dark-deep flex flex-col items-center justify-center text-muted-foreground gap-2 cursor-pointer hover:bg-gold/5 transition-all overflow-hidden relative group"
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={24} />
                      <span className="text-[10px] font-bold">REPLACE PHOTO</span>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Dish Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => setFormData({...formData, category: val})}
                  >
                    <SelectTrigger className="bg-dark-deep border-gold/10 focus:border-gold h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-gold/10 text-white">
                      {categories.filter(c => c !== "All").map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Price (₦)</Label>
                  <Input 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-widest text-gold/60">Current Stock</Label>
                  <Input 
                    type="number"
                    value={formData.stock} 
                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                    className="bg-dark-deep border-gold/10 focus:border-gold h-11" 
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                disabled={isUploading}
                onClick={handleUpdateDish} 
                className="w-full bg-gold hover:bg-gold-light text-background font-black uppercase tracking-widest h-12"
              >
                {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      OPTIMIZING...
                    </>
                  ) : (
                    "UPDATE ITEM DETAILS"
                  )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ChefMenu;
