# Restaurant POS Database Setup Guide

## Prerequisites

- MySQL 8.0 or higher
- Node.js 18+ (for backend server)
- npm or yarn

## Database Setup

### 1. Install MySQL

**Windows:**
- Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
- Run the installer and select "MySQL Server" and "MySQL Workbench"
- Set root password during installation

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE restaurant_pos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Import Schema

**Option 1: Using MySQL Command Line**
```bash
mysql -u root -p restaurant_pos < database/schema.sql
```

**Option 2: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `schema.sql`
4. Execute the script

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=restaurant_pos

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your_secret_key_here_change_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 5. Verify Database Setup

Connect to MySQL and verify tables:

```sql
USE restaurant_pos;
SHOW TABLES;
```

You should see all the tables listed.

## Database Structure

### Core Tables

1. **users** - System users (admin, manager, cashier, waiter)
2. **menu_categories** - Food categories (Starters, Main Course, etc.)
3. **menu_items** - Menu items with pricing and details
4. **modifiers** - Customization options (Size, Spice Level, etc.)
5. **modifier_options** - Specific modifier choices
6. **restaurant_tables** - Table management
7. **orders** - Customer orders
8. **order_items** - Items in each order
9. **order_item_modifiers** - Selected modifiers for order items
10. **inventory_items** - Stock management
11. **inventory_transactions** - Stock movement tracking
12. **kds_tickets** - Kitchen Display System tickets
13. **notifications** - System notifications
14. **settings** - Application settings

## Default Credentials

After running the schema, you'll have:

- **Admin User**
  - PIN: `1234`
  - Role: Admin
  - Full system access

## Localhost URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **MySQL**: localhost:3306

## Next Steps

1. Install backend dependencies (see backend/README.md)
2. Start the backend server
3. Start the frontend development server
4. Access the application at http://localhost:5173

## Database Maintenance

### Backup Database
```bash
mysqldump -u root -p restaurant_pos > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u root -p restaurant_pos < backup_20240101.sql
```

### Reset Database (WARNING: Deletes all data)
```sql
DROP DATABASE restaurant_pos;
CREATE DATABASE restaurant_pos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Then re-import schema.sql
```

## Troubleshooting

### Connection Refused
- Ensure MySQL service is running
- Check firewall settings
- Verify port 3306 is not blocked

### Access Denied
- Verify username and password in .env
- Grant proper privileges:
```sql
GRANT ALL PRIVILEGES ON restaurant_pos.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Character Encoding Issues
- Ensure database uses utf8mb4
- Check connection string includes charset parameter

## Support

For issues or questions, refer to the main README.md or contact the development team.
