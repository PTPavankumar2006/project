{
  "name": "MenuItem",
  "type": "object",
  "properties": {
    "restaurant_id": {
      "type": "string",
      "description": "ID of the restaurant this item belongs to"
    },
    "name": {
      "type": "string",
      "description": "Menu item name"
    },
    "description": {
      "type": "string",
      "description": "Item description"
    },
    "price": {
      "type": "number",
      "description": "Item price"
    },
    "category": {
      "type": "string",
      "enum": [
        "appetizers",
        "mains",
        "desserts",
        "beverages",
        "sides",
        "specials"
      ],
      "description": "Menu category"
    },
    "image_url": {
      "type": "string",
      "description": "Item image URL"
    },
    "is_vegetarian": {
      "type": "boolean",
      "default": false,
      "description": "Whether item is vegetarian"
    },
    "is_vegan": {
      "type": "boolean",
      "default": false,
      "description": "Whether item is vegan"
    },
    "is_spicy": {
      "type": "boolean",
      "default": false,
      "description": "Whether item is spicy"
    },
    "is_popular": {
      "type": "boolean",
      "default": false,
      "description": "Whether item is popular"
    },
    "ingredients": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of ingredients"
    },
    "preparation_time": {
      "type": "string",
      "description": "Preparation time"
    }
  },
  "required": [
    "restaurant_id",
    "name",
    "price",
    "category"
  ]
}