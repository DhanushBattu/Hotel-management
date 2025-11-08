# Restaurant POS Backend API

Express.js backend server for the Restaurant POS system.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=restaurant_pos

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Database

Make sure MySQL is running and the database is created:

```bash
# From the root directory
mysql -u root -p restaurant_pos < database/schema.sql
```

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on http://localhost:3001

## API Endpoints

### Menu Management

- `GET /api/menu/categories` - Get all menu categories
- `GET /api/menu/items` - Get all menu items
- `GET /api/menu/items/:id` - Get single menu item with modifiers
- `POST /api/menu/items` - Add new menu item (Admin only)
- `PUT /api/menu/items/:id` - Update menu item
- `DELETE /api/menu/items/:id` - Delete menu item
- `PATCH /api/menu/items/:id/availability` - Toggle item availability (86)

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order with items
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status

### Inventory

- `GET /api/inventory` - Get all inventory items

### Users

- `GET /api/users` - Get all users
- `POST /api/users/login` - User login with PIN

### Tables

- `GET /api/tables` - Get all restaurant tables

### KDS (Kitchen Display System)

- `GET /api/kds/tickets` - Get KDS tickets (with optional station filter)

### Reports

- `GET /api/reports/sales` - Get sales report (with date range)

### Settings

- `GET /api/settings` - Get all settings
- `PUT /api/settings/:key` - Update a setting

## Example API Calls

### Add New Menu Item

```bash
curl -X POST http://localhost:3001/api/menu/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Paneer Tikka",
    "description": "Grilled cottage cheese with spices",
    "category_id": "category-uuid-here",
    "subcategory": "Tandoori",
    "food_type": "veg",
    "price_dine_in": 280,
    "price_takeaway": 250,
    "price_delivery": 300,
    "gst_percent": 5,
    "preparation_time": 20,
    "kitchen_station": "HOT",
    "modifiers": [
      {
        "name": "Spice Level",
        "is_required": true,
        "multi_select": false,
        "options": [
          { "name": "Mild", "price_adjustment": 0 },
          { "name": "Medium", "price_adjustment": 0 },
          { "name": "Hot", "price_adjustment": 0 }
        ]
      }
    ]
  }'
```

### Create Order

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "table_id": "table-uuid",
    "order_type": "dine-in",
    "waiter_id": "waiter-uuid",
    "items": [
      {
        "menu_item_id": "item-uuid",
        "quantity": 2,
        "unit_price": 280,
        "notes": "Extra spicy"
      }
    ]
  }'
```

## Testing

Test the API health:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Restaurant POS API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Port Already in Use
If port 3001 is already in use, change the PORT in `.env` file.

### Database Connection Failed
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;`

### CORS Errors
- Verify FRONTEND_URL in `.env` matches your frontend URL
- Check that frontend is running on the specified port

## Project Structure

```
backend/
├── config/
│   └── database.js       # Database connection
├── routes/
│   ├── menu.js          # Menu management endpoints
│   ├── orders.js        # Order management endpoints
│   ├── inventory.js     # Inventory endpoints
│   ├── users.js         # User management endpoints
│   ├── tables.js        # Table management endpoints
│   ├── kds.js           # KDS endpoints
│   ├── reports.js       # Reports endpoints
│   └── settings.js      # Settings endpoints
├── server.js            # Main server file
├── package.json         # Dependencies
└── .env                 # Environment variables (create this)
```

## Next Steps

1. Connect frontend to backend API
2. Implement authentication middleware
3. Add input validation
4. Add error logging
5. Implement file upload for menu item images
6. Add WebSocket for real-time KDS updates

## Support

For issues, check the main project README or database setup guide.
