import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function CuisineCategories() {
  const categories = [
    { name: "Italian", emoji: "🍕", color: "bg-red-100 text-red-800", cuisine: "italian" },
    { name: "Chinese", emoji: "🥡", color: "bg-yellow-100 text-yellow-800", cuisine: "chinese" },
    { name: "Indian", emoji: "🍛", color: "bg-orange-100 text-orange-800", cuisine: "indian" },
    { name: "Mexican", emoji: "🌮", color: "bg-green-100 text-green-800", cuisine: "mexican" },
    { name: "Japanese", emoji: "🍣", color: "bg-pink-100 text-pink-800", cuisine: "japanese" },
    { name: "Thai", emoji: "🍜", color: "bg-purple-100 text-purple-800", cuisine: "thai" },
    { name: "Fast Food", emoji: "🍔", color: "bg-blue-100 text-blue-800", cuisine: "fast_food" },
    { name: "Desserts", emoji: "🍰", color: "bg-indigo-100 text-indigo-800", cuisine: "desserts" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Cuisine
          </h2>
          <p className="text-xl text-gray-600">
            Discover flavors from around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl("Restaurants") + `?cuisine=${category.cuisine}`}
                className="block group"
              >
                <div className="glass-effect rounded-2xl p-6 text-center hover:shadow-lg smooth-transition hover-lift">
                  <div className="text-4xl mb-3 group-hover:scale-110 smooth-transition">
                    {category.emoji}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                    Popular
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}