# Restaurant POS System - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete Restaurant POS system with database and backend.

## Prerequisites

- **Node.js** 18+ and npm
- **MySQL** 8.0+
- **Git** (optional)

## 📦 Installation Steps

### Step 1: Install MySQL

#### Windows:
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run installer and select "MySQL Server" and "MySQL Workbench"
3. Set root password during installation (remember this!)
4. Complete installation

#### Mac:
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### Step 2: Create Database

Open MySQL command line or MySQL Workbench:

```sql
CREATE DATABASE restaurant_pos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 3: Import Database Schema

**Option A: Command Line**
```bash
cd c:\Users\dhanu\OneDrive\Desktop\restaurant
mysql -u root -p restaurant_pos < database/schema.sql
```

**Option B: MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your server
3. File → Open SQL Script → Select `database/schema.sql`
4. Execute (⚡ icon)

### Step 4: Configure Environment

Create `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=restaurant_pos

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 5: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 6: Install Frontend Dependencies

```bash
cd ..
npm install
```

### Step 7: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 8: Access the Application

Open your browser and go to: **http://localhost:5173**

## 🔐 Default Login Credentials

After database setup, use these credentials:

- **Admin**: PIN `1234`
- **Manager**: PIN `2345` (if created)
- **Cashier**: PIN `3456` (if created)
- **Waiter**: PIN `4567` (if created)

## 📍 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Backend API | http://localhost:3001 | REST API server |
| API Health | http://localhost:3001/api/health | Health check |
| MySQL | localhost:3306 | Database server |

## 🎯 Features Implemented

### ✅ Hamburger Menu in KDS
- Admin and Manager can access navigation from KDS page
- Click hamburger icon (☰) in top-left of KDS
- Navigate to Dashboard, Menu, Inventory, Reports, Settings

### ✅ Add New Dish (Admin Only)
1. Login as Admin (PIN: 1234)
2. Go to Menu Management
3. Click "Add Item" button
4. Fill in the form:
   - Basic Info (Name, Category, Food Type, etc.)
   - Pricing (Dine-in, Takeaway, Delivery)
   - Modifiers (optional - Size, Spice Level, etc.)
5. Click "Add Item" to save

### ✅ Database Integration
- Complete MySQL schema with 14 tables
- RESTful API with Express.js
- CRUD operations for all entities
- Proper relationships and foreign keys

## 🧪 Testing the Setup

### 1. Test Database Connection
```bash
mysql -u root -p
USE restaurant_pos;
SHOW TABLES;
```

You should see 14 tables.

### 2. Test Backend API
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Restaurant POS API is running"
}
```

### 3. Test Frontend
- Open http://localhost:5173
- Login with PIN 1234
- Navigate through different pages
- Try adding a new menu item

## 📊 Database Tables

1. **users** - System users
2. **menu_categories** - Food categories
3. **menu_items** - Menu items
4. **modifiers** - Item customizations
5. **modifier_options** - Modifier choices
6. **restaurant_tables** - Table management
7. **orders** - Customer orders
8. **order_items** - Order line items
9. **order_item_modifiers** - Selected modifiers
10. **inventory_items** - Stock items
11. **inventory_transactions** - Stock movements
12. **kds_tickets** - Kitchen tickets
13. **notifications** - System notifications
14. **settings** - App settings

## 🔧 Troubleshooting

### Database Connection Failed
**Error**: `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution**:
1. Check MySQL is running: `mysql -u root -p`
2. Verify password in `.env` file
3. Grant privileges:
```sql
GRANT ALL PRIVILEGES ON restaurant_pos.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3001`

**Solution**:
- Change PORT in `.env` to 3002 or another free port
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:3001 | xargs kill`

### Frontend Can't Connect to Backend
**Error**: CORS or Network errors

**Solution**:
1. Ensure backend is running on port 3001
2. Check FRONTEND_URL in backend `.env` matches frontend URL
3. Restart both servers

### MySQL Not Found
**Error**: `mysql: command not found`

**Solution**:
- Add MySQL to PATH:
  - Windows: Add `C:\Program Files\MySQL\MySQL Server 8.0\bin` to PATH
  - Mac: MySQL should be in PATH after brew install
  - Linux: Reinstall: `sudo apt install mysql-client`

## 📝 API Usage Examples

### Add New Menu Item via API
```bash
curl -X POST http://localhost:3001/api/menu/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Butter Chicken",
    "category_id": "get-from-categories-endpoint",
    "food_type": "non-veg",
    "price_dine_in": 350,
    "kitchen_station": "HOT"
  }'
```

### Get All Menu Items
```bash
curl http://localhost:3001/api/menu/items
```

### Create Order
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "order_type": "dine-in",
    "items": [...]
  }'
```

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#your-color',
    // ...
  }
}
```

### Add New User Roles
1. Update `users` table enum
2. Update frontend types in `src/types/index.ts`
3. Add role-specific routes

### Modify Database Schema
1. Edit `database/schema.sql`
2. Drop and recreate database
3. Update backend models

## 📚 Additional Resources

- **Database Schema**: See `database/schema.sql`
- **API Documentation**: See `backend/README.md`
- **Database Guide**: See `database/README.md`

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify all services are running
3. Check console logs for errors
4. Review database connection settings

## 🎉 Next Steps

After setup:

1. ✅ Test all features
2. ✅ Add sample menu items
3. ✅ Create test orders
4. ✅ Explore KDS functionality
5. ✅ Generate reports

## 📦 Project Structure

```
restaurant/
├── backend/              # Express.js API server
│   ├── config/          # Database config
│   ├── routes/          # API routes
│   └── server.js        # Main server
├── database/            # Database files
│   ├── schema.sql       # Database schema
│   └── README.md        # DB setup guide
├── src/                 # Frontend React app
│   ├── components/      # UI components
│   ├── pages/          # Page components
│   ├── store/          # State management
│   └── types/          # TypeScript types
├── .env                # Environment variables (create this)
└── package.json        # Frontend dependencies
```

---

**🎊 Congratulations! Your Restaurant POS system is now fully set up!**
