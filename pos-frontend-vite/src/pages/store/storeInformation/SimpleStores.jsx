import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Store, Plus, Edit, Trash2, Users, Package } from "lucide-react";

export default function Stores() {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Main Store",
      brand: "Apna POS Demo",
      email: "main@apnapos.com",
      phone: "+1 234 567 8900",
      status: "ACTIVE",
      branches: 3,
      products: 1250,
      employees: 45
    },
    {
      id: 2,
      name: "Branch Store A",
      brand: "Apna POS Demo",
      email: "branch-a@apnapos.com",
      phone: "+1 234 567 8901",
      status: "ACTIVE",
      branches: 1,
      products: 850,
      employees: 25
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    brand: "",
    email: "",
    phone: ""
  });

  const handleCreateStore = () => {
    if (newStore.name && newStore.brand && newStore.email) {
      const store = {
        id: stores.length + 1,
        ...newStore,
        status: "ACTIVE",
        branches: 0,
        products: 0,
        employees: 0
      };
      setStores([...stores, store]);
      setNewStore({ name: "", brand: "", email: "", phone: "" });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
          <p className="text-muted-foreground">Manage your stores and create new ones</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-primary to-primary/80"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Store
        </Button>
      </div>

      {/* Create Store Form */}
      {showCreateForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Create New Store</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  value={newStore.name}
                  onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                  placeholder="Enter store name"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  value={newStore.brand}
                  onChange={(e) => setNewStore({...newStore, brand: e.target.value})}
                  placeholder="Enter brand name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStore.email}
                  onChange={(e) => setNewStore({...newStore, email: e.target.value})}
                  placeholder="store@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newStore.phone}
                  onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateStore}>Create Store</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Store className="w-8 h-8 text-primary" />
                <Badge variant={store.status === "ACTIVE" ? "default" : "secondary"}>
                  {store.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{store.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{store.brand}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{store.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{store.phone}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Package className="w-4 h-4" />
                    <span className="font-bold">{store.products}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Store className="w-4 h-4" />
                    <span className="font-bold">{store.branches}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Branches</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Users className="w-4 h-4" />
                    <span className="font-bold">{store.employees}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Employees</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
