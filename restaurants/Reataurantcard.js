import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Truck, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RestaurantCard({ restaurant, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl smooth-transition hover-lift">
        <div className="relative">
          <img
            src={restaurant.image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
            alt={restaurant.name}
            className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
          />
          
          {/* Featured Badge */}
          {restaurant.is_featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-emerald-500 text-white">
                Featured
              </Badge>
            </div>
          )}
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 smooth-transition">
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>
          
          {/* Closed Overlay */}
          {!restaurant.is_open && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-white">
                Closed
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {restaurant.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {restaurant.description || "Delicious food awaits you"}
            </p>
            
            {/* Restaurant Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                <span>${restaurant.delivery_fee || 2.99}</span>
              </div>
            </div>
            
            {/* Cuisine Type */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="capitalize">
                {restaurant.cuisine_type?.replace("_", " ") || "Various"}
              </Badge>
              <Link to={createPageUrl("Menu") + `?restaurant=${restaurant.id}`}>
                <Button
                  size="sm"
                  className="gradient-primary hover:shadow-md smooth-transition"
                  disabled={!restaurant.is_open}
                >
                  View Menu
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}