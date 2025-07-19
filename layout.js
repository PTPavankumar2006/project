import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, ShoppingBag, User, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Home", url: createPageUrl("Home"), icon: Home },
    { name: "Restaurants", url: createPageUrl("Restaurants"), icon: Search },
    { name: "Orders", url: createPageUrl("Orders"), icon: ShoppingBag },
    { name: "Profile", url: createPageUrl("Profile"), icon: User },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <style>
        {`
          :root {
            --primary-emerald: #059669;
            --primary-emerald-light: #10b981;
            --accent-orange: #f97316;
            --accent-orange-light: #fb923c;
            --glass-bg: rgba(255, 255, 255, 0.25);
            --glass-border: rgba(255, 255, 255, 0.18);
          }
          
          .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
          }
          
          .gradient-primary {
            background: linear-gradient(135deg, var(--primary-emerald) 0%, var(--primary-emerald-light) 100%);
          }
          
          .gradient-accent {
            background: linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-orange-light) 100%);
          }
          
          .smooth-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍽️</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                FoodieExpress
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg smooth-transition ${
                    isActive(item.url)
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-emerald-600"
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Deliver to</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-emerald-600"
              >
                <Phone className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Support</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 z-50">
        <div className="grid grid-cols-4 py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              className={`flex flex-col items-center justify-center py-2 px-1 smooth-transition ${
                isActive(item.url)
                  ? "text-emerald-600"
                  : "text-gray-600"
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive(item.url) ? "scale-110" : ""}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🍽️</span>
                </div>
                <span className="text-xl font-bold">FoodieExpress</span>
              </div>
              <p className="text-gray-400 text-sm">
                Delicious food delivered to your doorstep in minutes. Your favorite restaurants, one tap away.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to={createPageUrl("Home")} className="hover:text-white smooth-transition">Home</Link></li>
                <li><Link to={createPageUrl("Restaurants")} className="hover:text-white smooth-transition">Restaurants</Link></li>
                <li><Link to={createPageUrl("Orders")} className="hover:text-white smooth-transition">Orders</Link></li>
                <li><Link to={createPageUrl("Profile")} className="hover:text-white smooth-transition">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white smooth-transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white smooth-transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white smooth-transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white smooth-transition">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white smooth-transition">
                  <span className="sr-only">Facebook</span>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 smooth-transition">
                    <span className="text-sm">f</span>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white smooth-transition">
                  <span className="sr-only">Twitter</span>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 smooth-transition">
                    <span className="text-sm">t</span>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white smooth-transition">
                  <span className="sr-only">Instagram</span>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 smooth-transition">
                    <span className="text-sm">i</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FoodieExpress. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}