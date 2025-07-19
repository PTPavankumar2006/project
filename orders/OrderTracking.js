import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Phone, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function OrderTracking({ order, onClose, getStatusColor, getStatusIcon }) {
  const trackingSteps = [
    { key: "pending", label: "Order Placed", description: "Your order has been received" },
    { key: "confirmed", label: "Order Confirmed", description: "Restaurant is preparing your order" },
    { key: "preparing", label: "Preparing", description: "Your food is being prepared" },
    { key: "ready", label: "Ready for Pickup", description: "Order is ready for delivery" },
    { key: "out_for_delivery", label: "Out for Delivery", description: "Your order is on its way" },
    { key: "delivered", label: "Delivered", description: "Order has been delivered" },
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.key === order.status);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Order Tracking
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  {order.restaurant_name} • Order #{order.id?.slice(-8) || "N/A"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Current Status */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getStatusColor(order.status)} capitalize text-lg px-4 py-2 flex items-center gap-2`}>
                  {getStatusIcon(order.status)}
                  {order.status?.replace("_", " ")}
                </Badge>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {format(new Date(order.created_date), "MMM d, yyyy • h:mm a")}
                  </div>
                  {order.estimated_delivery_time && (
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Est. delivery: {order.estimated_delivery_time}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Progress</h3>
              <div className="space-y-4">
                {trackingSteps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`flex items-center space-x-4 ${
                      index <= currentStepIndex ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStepIndex ? "bg-emerald-500 text-white" : "bg-gray-200"
                    }`}>
                      {index <= currentStepIndex ? (
                        getStatusIcon(step.key)
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.label}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-6 ml-4 ${
                        index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Delivery Address</div>
                  <div className="text-sm text-gray-600">{order.delivery_address}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Phone Number</div>
                  <div className="text-sm text-gray-600">{order.phone_number}</div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      {item.special_instructions && (
                        <p className="text-sm text-gray-600 mt-1">
                          Note: {item.special_instructions}
                        </p>
                      )}
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${(order.delivery_fee || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${(order.total_amount + (order.delivery_fee || 0)).toFixed(2)}</span>
              </div>
            </div>

            {/* Special Instructions */}
            {order.special_instructions && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-800">Special Instructions</div>
                <div className="text-sm text-yellow-700 mt-1">{order.special_instructions}</div>
              </div>
            )}
          </CardContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}