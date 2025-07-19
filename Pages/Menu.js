import React, { useState, useEffect } from "react";
import { Restaurant } from "@/entities/Restaurant";
import { MenuItem } from "@/entities/MenuItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Truck, ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import MenuCategory from "../components/menu/MenuCategory";
import MenuItemCard from "../components/menu/MenuItemCard";
import CartSidebar from "../components/menu/CartSidebar";

export default function Menu() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurant');
    
    if (restaurantId) {
      loadRestaurantData(restaurantId);
    } else {
      navigate(createPageUrl("Restaurants"));
    }
  }, [navigate]);

  const loadRestaurantData = async (restaurantId) => {
    try {
      const restaurants = await Restaurant.list();
      const currentRestaurant = restaurants.find(r => r.id === restaurantId);
      
      if (currentRestaurant) {
        setRestaurant(currentRestaurant);
        
        // Load menu items
        const items = await MenuItem.filter({ restaurant_id: restaurantId });
        setMenuItems(items);
      } else {
        navigate(createPageUrl("Restaurants"));
      }
    } catch (error) {
      console.error("Error loading restaurant data:", error);
      navigate(createPageUrl("Restaurants"));
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];
  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-200 h-48 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <Link to={createPageUrl("Restaurants")}>
            <Button className="gradient-primary">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Restaurant Header */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-emerald-600 to-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <img
            src={restaurant.image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30"
            onClick={() => navigate(createPageUrl("Restaurants"))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {restaurant.name}
              </h1>
              <p className="text-gray-600 mb-4">
                {restaurant.description || "Delicious food awaits you"}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">
                    {restaurant.rating || 4.5}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.delivery_time || "25-30 min"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4" />
                  <span>${restaurant.delivery_fee || 2.99} delivery</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant="outline" 
                className="capitalize text-lg px-4 py-2"
              >
                {restaurant.cuisine_type?.replace("_", " ") || "Various"}
              </Badge>
              {restaurant.is_open ? (
                <Badge className="bg-green-500 text-white">
                  Open Now
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Closed
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Menu Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <MenuCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === "all" ? "All Items" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} items available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item, index) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onAddToCart={addToCart}
                  isOpen={restaurant.is_open}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No items in this category
                </h3>
                <p className="text-gray-600">
                  Try selecting a different category or browse all items
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Cart Button */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            size="lg"
            className="gradient-primary hover:shadow-lg rounded-full px-6 py-3 text-lg font-semibold smooth-transition"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {getCartItemCount()} items • ${getCartTotal().toFixed(2)}
          </Button>
        </motion.div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        restaurant={restaurant}
        onUpdateQuantity={updateCartQuantity}
        total={getCartTotal()}
      />
    </div>
  );
}