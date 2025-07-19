{
  "name": "Restaurant",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Restaurant name"
    },
    "description": {
      "type": "string",
      "description": "Restaurant description"
    },
    "cuisine_type": {
      "type": "string",
      "enum": [
        "italian",
        "chinese",
        "indian",
        "mexican",
        "american",
        "thai",
        "japanese",
        "mediterranean",
        "fast_food",
        "desserts"
      ],
      "description": "Type of cuisine"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "Restaurant rating"
    },
    "delivery_time": {
      "type": "string",
      "description": "Estimated delivery time"
    },
    "delivery_fee": {
      "type": "number",
      "description": "Delivery fee"
    },
    "image_url": {
      "type": "string",
      "description": "Restaurant image URL"
    },
    "is_featured": {
      "type": "boolean",
      "default": false,
      "description": "Whether restaurant is featured"
    },
    "is_open": {
      "type": "boolean",
      "default": true,
      "description": "Whether restaurant is currently open"
    },
    "address": {
      "type": "string",
      "description": "Restaurant address"
    },
    "phone": {
      "type": "string",
      "description": "Restaurant phone number"
    }
  },
  "required": [
    "name",
    "cuisine_type",
    "rating",
    "delivery_time"
  ]
}