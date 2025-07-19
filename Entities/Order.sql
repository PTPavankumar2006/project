{
  "name": "Order",
  "type": "object",
  "properties": {
    "restaurant_id": {
      "type": "string",
      "description": "ID of the restaurant"
    },
    "restaurant_name": {
      "type": "string",
      "description": "Name of the restaurant"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "menu_item_id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "quantity": {
            "type": "number"
          },
          "special_instructions": {
            "type": "string"
          }
        }
      },
      "description": "Items in the order"
    },
    "total_amount": {
      "type": "number",
      "description": "Total order amount"
    },
    "delivery_fee": {
      "type": "number",
      "description": "Delivery fee"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled"
      ],
      "default": "pending",
      "description": "Order status"
    },
    "delivery_address": {
      "type": "string",
      "description": "Delivery address"
    },
    "phone_number": {
      "type": "string",
      "description": "Customer phone number"
    },
    "special_instructions": {
      "type": "string",
      "description": "Special delivery instructions"
    },
    "estimated_delivery_time": {
      "type": "string",
      "description": "Estimated delivery time"
    }
  },
  "required": [
    "restaurant_id",
    "restaurant_name",
    "items",
    "total_amount",
    "delivery_address",
    "phone_number"
  ]
}