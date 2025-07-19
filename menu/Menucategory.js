import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MenuCategory({ categories, selectedCategory, onCategoryChange }) {
  const categoryEmojis = {
    appetizers: "🥗",
    mains: "🍽️",
    desserts: "🍰",
    beverages: "🥤",
    sides: "🍟",
    specials: "⭐",
  };

  const allCategories = ["all", ...categories];

  return (
    <Card className="sticky top-4 border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {allCategories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onCategoryChange(category)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left smooth-transition ${
                selectedCategory === category
                  ? "bg-emerald-500 text-white shadow-md"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  {category === "all" ? "🍽️" : categoryEmojis[category] || "🍴"}
                </span>
                <span className="font-medium capitalize">
                  {category === "all" ? "All Items" : category}
                </span>
              </div>
              {selectedCategory === category && (
                <Badge className="bg-white text-emerald-600 text-xs">
                  Active
                </Badge>
              )}
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}