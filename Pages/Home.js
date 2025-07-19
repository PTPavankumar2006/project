import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Restaurant } from "@/entities/Restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, Clock, Truck, MapPin, ArrowRight, Zap, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import FeaturedRestaurants from "../components/home/FeaturedRestaurants";
import CuisineCategories from "../components/home/CuisineCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatsSection from "../components/home/StatsSection";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const allRestaurants = await Restaurant.list("-rating");
      setRestaurants(allRestaurants);
      setFeaturedRestaurants(allRestaurants.filter(r => r.is_featured).slice(0, 6));
    } catch (error) {
      console.error("Error loading restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to restaurants page with search query
      window.location.href = createPageUrl("Restaurants") + `?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <SearchBar onSearch={handleSearch} />
      <CuisineCategories />
      <FeaturedRestaurants 
        restaurants={featuredRestaurants} 
        isLoading={isLoading} 
      />
      <WhyChooseUs />
      <StatsSection />
      
      {/* Call to Action Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to satisfy your cravings?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join thousands of food lovers who trust FoodieExpress for their daily meals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Restaurants")}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold smooth-transition hover-lift"
                >
                  Browse Restaurants
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold smooth-transition"
              >
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}