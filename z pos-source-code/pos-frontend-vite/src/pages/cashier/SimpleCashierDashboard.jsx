import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, CreditCard, DollarSign, User, Search } from "lucide-react";

export default function CashierDashboard() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product A", price: 29.99, quantity: 2 },
    { id: 2, name: "Product B", price: 19.99, quantity: 1 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r p-4">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h2 className="text-xl font-bold">Apna POS</h2>
        </div>
        
        <nav className="space-y-2">
          <Button variant="default" className="w-full justify-start">
            <ShoppingCart className="w-4 h-4 mr-2" />
            POS Terminal
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="w-4 h-4 mr-2" />
            Order History
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <RotateCcw className="w-4 h-4 mr-2" />
            Returns/Refunds
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Customer Lookup
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Receipt className="w-4 h-4 mr-2" />
            Shift Summary
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Product Catalog */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">POS Terminal</h1>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 1, name: "Product A", price: 29.99, category: "Electronics" },
              { id: 2, name: "Product B", price: 19.99, category: "Food" },
              { id: 3, name: "Product C", price: 49.99, category: "Clothing" },
              { id: 4, name: "Product D", price: 9.99, category: "Food" },
              { id: 5, name: "Product E", price: 99.99, category: "Electronics" },
              { id: 6, name: "Product F", price: 39.99, category: "Clothing" }
            ].map(product => (
              <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">${product.price}</span>
                    <Button size="sm" onClick={() => {
                      const existing = cartItems.find(item => item.id === product.id);
                      if (existing) {
                        updateQuantity(product.id, 1);
                      } else {
                        setCartItems([...cartItems, { ...product, quantity: 1 }]);
                      }
                    }}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="w-96 bg-card border-l p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Current Order</h2>
            <Badge variant="secondary">{cartItems.length} items</Badge>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="text-2xl font-bold text-primary">${getTotal()}</span>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-2">
              <Button className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <DollarSign className="w-4 h-4 mr-2" />
                Cash Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
