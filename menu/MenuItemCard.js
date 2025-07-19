import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Leaf, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuItemCard({ item, index, onAddToCart, isOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl smooth-transition hover-lift">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/3 relative">
            <img
              src={item.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
              alt={item.name}
              className="w-full h-32 md:h-full object-cover group-hover:scale-105 smooth-transition"
            />
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {item.is_vegetarian && (
                <Badge className="bg-green-500 text-white text-xs">
                  <Leaf className="w-3 h-3 mr-1" />
                  Veg
                </Badge>
              )}
              {item.is_spicy && (
                <Badge className="bg-red-500 text-white text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  Spicy
                </Badge>
              )}
              {item.is_popular && (
                <Badge className="bg-orange-500 text-white text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <CardContent className="md:w-2/3 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              <div className="text-lg font-bold text-emerald-600">
                ${item.price.toFixed(2)}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description || "Delicious and freshly prepared"}
            </p>
            
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                <p className="text-xs text-gray-600">
                  {item.ingredients.join(", ")}
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {item.category}
                </Badge>
                {item.preparation_time && (
                  <span className="text-xs text-gray-500">
                    {item.preparation_time}
                  </span>
                )}
              </div>
              
              <Button
                size="sm"
                className="gradient-primary hover:shadow-md smooth-transition"
                onClick={() => onAddToCart(item)}
                disabled={!isOpen}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}