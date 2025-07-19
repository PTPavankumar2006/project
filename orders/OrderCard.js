import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function OrderCard({ order, index, onSelect, getStatusColor, getStatusIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl smooth-transition hover-lift">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {order.restaurant_name}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Order #{order.id?.slice(-8) || "N/A"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${getStatusColor(order.status)} capitalize flex items-center gap-1`}>
                {getStatusIcon(order.status)}
                {order.status?.replace("_", " ")}
              </Badge>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${(order.total_amount + (order.delivery_fee || 0)).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(order.created_date), "MMM d, yyyy • h:mm a")}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{order.delivery_address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{order.phone_number}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
            <div className="space-y-2">
              {order.items?.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {order.items?.length > 3 && (
                <p className="text-sm text-gray-500">
                  +{order.items.length - 3} more items
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>${order.total_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span>${(order.delivery_fee || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${(order.total_amount + (order.delivery_fee || 0)).toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              {order.estimated_delivery_time && (
                <span>Est. delivery: {order.estimated_delivery_time}</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(order)}
              className="hover:bg-emerald-50 hover:border-emerald-500 smooth-transition"
            >
              <Eye className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}