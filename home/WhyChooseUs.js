import React from "react";
import { Zap, Shield, Heart, Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      description: "Get your food delivered in under 30 minutes with our optimized delivery network.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Contactless delivery and secure payment options for your peace of mind.",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Heart,
      title: "Quality Guaranteed",
      description: "Fresh ingredients and top-rated restaurants ensure every meal is perfect.",
      color: "text-red-600",
      bg: "bg-red-100"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Curated selection of the best restaurants with exceptional customer service.",
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track your order from kitchen to doorstep with live updates.",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Serving 50+ cities with thousands of restaurant partners nationwide.",
      color: "text-indigo-600",
      bg: "bg-indigo-100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose FoodieExpress?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another food delivery app. We're your gateway to culinary excellence,
            delivered with care and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-xl smooth-transition hover-lift">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 smooth-transition`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}