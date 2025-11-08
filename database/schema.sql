-- Restaurant POS Database Schema
-- Database: restaurant_pos

-- Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'manager', 'cashier', 'waiter') NOT NULL,
    pin VARCHAR(4) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu Categories
CREATE TABLE menu_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items
CREATE TABLE menu_items (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id VARCHAR(36) NOT NULL,
    subcategory VARCHAR(50),
    food_type ENUM('veg', 'non-veg') NOT NULL,
    image_url VARCHAR(255),
    price_dine_in DECIMAL(10, 2) NOT NULL,
    price_takeaway DECIMAL(10, 2) NOT NULL,
    price_delivery DECIMAL(10, 2) NOT NULL,
    gst_percent DECIMAL(5, 2) DEFAULT 5.00,
    is_available BOOLEAN DEFAULT TRUE,
    preparation_time INT DEFAULT 15,
    kitchen_station ENUM('HOT', 'COLD', 'BAR', 'DESSERT') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE
);

-- Menu Item Modifiers
CREATE TABLE modifiers (
    id VARCHAR(36) PRIMARY KEY,
    menu_item_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    multi_select BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Modifier Options
CREATE TABLE modifier_options (
    id VARCHAR(36) PRIMARY KEY,
    modifier_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (modifier_id) REFERENCES modifiers(id) ON DELETE CASCADE
);

-- Tables
CREATE TABLE restaurant_tables (
    id VARCHAR(36) PRIMARY KEY,
    table_number VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('available', 'occupied', 'reserved', 'billing') DEFAULT 'available',
    current_order_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    table_id VARCHAR(36),
    token_number VARCHAR(10),
    order_type ENUM('dine-in', 'takeaway', 'delivery') NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'served', 'completed', 'cancelled') DEFAULT 'pending',
    waiter_id VARCHAR(36),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL,
    service_charge DECIMAL(10, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cash', 'card', 'upi') DEFAULT NULL,
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(id) ON DELETE SET NULL,
    FOREIGN KEY (waiter_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Order Items
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    menu_item_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'preparing', 'ready', 'served') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
);

-- Order Item Modifiers (Selected modifiers for each order item)
CREATE TABLE order_item_modifiers (
    id VARCHAR(36) PRIMARY KEY,
    order_item_id VARCHAR(36) NOT NULL,
    modifier_option_id VARCHAR(36) NOT NULL,
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
    FOREIGN KEY (modifier_option_id) REFERENCES modifier_options(id) ON DELETE RESTRICT
);

-- Inventory Items
CREATE TABLE inventory_items (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    current_stock DECIMAL(10, 2) NOT NULL,
    reorder_level DECIMAL(10, 2) NOT NULL,
    cost_price DECIMAL(10, 2) NOT NULL,
    supplier_name VARCHAR(100),
    last_restock_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inventory Transactions
CREATE TABLE inventory_transactions (
    id VARCHAR(36) PRIMARY KEY,
    inventory_item_id VARCHAR(36) NOT NULL,
    transaction_type ENUM('purchase', 'usage', 'wastage', 'adjustment') NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit_cost DECIMAL(10, 2),
    total_cost DECIMAL(10, 2),
    notes TEXT,
    created_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- KDS Tickets
CREATE TABLE kds_tickets (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    order_number VARCHAR(20) NOT NULL,
    station ENUM('HOT', 'COLD', 'BAR', 'DESSERT') NOT NULL,
    status ENUM('pending', 'preparing', 'hold', 'ready', 'bumped') DEFAULT 'pending',
    priority BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bumped_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Notifications
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('order-ready', 'order-bumped', 'new-order', 'info') NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    order_id VARCHAR(36),
    target_role ENUM('admin', 'manager', 'cashier', 'waiter'),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Settings
CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Default Settings
INSERT INTO settings (id, setting_key, setting_value, description) VALUES
(UUID(), 'cgst_rate', '2.5', 'CGST Rate Percentage'),
(UUID(), 'sgst_rate', '2.5', 'SGST Rate Percentage'),
(UUID(), 'service_charge', '5', 'Service Charge Percentage'),
(UUID(), 'enable_rounding', 'true', 'Enable automatic bill rounding'),
(UUID(), 'restaurant_name', 'My Restaurant', 'Restaurant Name'),
(UUID(), 'currency', 'INR', 'Currency Code');

-- Insert Default Admin User
INSERT INTO users (id, name, email, role, pin, is_active) VALUES
(UUID(), 'Admin User', 'admin@restaurant.com', 'admin', '1234', TRUE);

-- Insert Default Categories
INSERT INTO menu_categories (id, name, display_order) VALUES
(UUID(), 'Starters', 1),
(UUID(), 'Main Course', 2),
(UUID(), 'Breads', 3),
(UUID(), 'Rice & Biryani', 4),
(UUID(), 'Desserts', 5),
(UUID(), 'Beverages', 6);

-- Create Indexes for Performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_kds_tickets_station ON kds_tickets(station, status);
CREATE INDEX idx_notifications_target ON notifications(target_role, is_read);
