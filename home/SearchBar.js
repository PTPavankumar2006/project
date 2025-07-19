import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-6 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Delivery location"
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl w-full md:w-64"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-2 border-gray-200 hover:border-emerald-500 px-4 py-3 rounded-xl smooth-transition"
              >
                <Filter className="w-5 h-5" />
              </Button>
              <Button
                type="submit"
                size="lg"
                className="gradient-primary hover:shadow-lg px-8 py-3 text-lg font-semibold rounded-xl smooth-transition hover-lift"
              >
                Search
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}