import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: "😊" },
    { number: "500+", label: "Restaurant Partners", icon: "🍴" },
    { number: "1M+", label: "Orders Delivered", icon: "🚚" },
    { number: "4.8", label: "Average Rating", icon: "⭐" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Food Lovers Everywhere
          </h2>
          <p className="text-xl text-emerald-100">
            Join our growing community of satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-emerald-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}