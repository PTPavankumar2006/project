import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function RestaurantFilters({ selectedCuisine, onCuisineChange, sortBy, onSortChange }) {
  const cuisineOptions = [
    { value: "all", label: "All Cuisines" },
    { value: "italian", label: "Italian" },
    { value: "chinese", label: "Chinese" },
    { value: "indian", label: "Indian" },
    { value: "mexican", label: "Mexican" },
    { value: "american", label: "American" },
    { value: "thai", label: "Thai" },
    { value: "japanese", label: "Japanese" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "fast_food", label: "Fast Food" },
    { value: "desserts", label: "Desserts" },
  ];

  const sortOptions = [
    { value: "rating", label: "Rating" },
    { value: "delivery_time", label: "Delivery Time" },
    { value: "delivery_fee", label: "Delivery Fee" },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Cuisine:</span>
        <Select value={selectedCuisine} onValueChange={onCuisineChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Active Filters */}
      <div className="flex items-center space-x-2">
        {selectedCuisine !== "all" && (
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => onCuisineChange("all")}
          >
            {cuisineOptions.find(c => c.value === selectedCuisine)?.label} ✕
          </Badge>
        )}
      </div>
    </div>
  );
}