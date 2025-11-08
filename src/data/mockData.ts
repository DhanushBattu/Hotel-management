import type { User, Table, MenuItem, Order, KDSTicket, InventoryItem } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    pin: '1234',
    email: 'admin@restaurant.com',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'John Manager',
    role: 'manager',
    pin: '2345',
    email: 'manager@restaurant.com',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Sarah Cashier',
    role: 'cashier',
    pin: '3456',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Mike Waiter',
    role: 'waiter',
    pin: '4567',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Chef Kumar',
    role: 'kitchen',
    pin: '5678',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    name: 'Store Manager',
    role: 'storekeeper',
    pin: '6789',
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Tables
export const mockTables: Table[] = [
  { id: '1', floorId: '1', name: 'Table 1', capacity: 2, status: 'available' },
  { id: '2', floorId: '1', name: 'Table 2', capacity: 4, status: 'occupied', currentOrderId: 'order-1', waiterName: 'Mike Waiter' },
  { id: '3', floorId: '1', name: 'Table 3', capacity: 4, status: 'available' },
  { id: '4', floorId: '1', name: 'Table 4', capacity: 6, status: 'reserved' },
  { id: '5', floorId: '1', name: 'Table 5', capacity: 2, status: 'available' },
  { id: '6', floorId: '1', name: 'Table 6', capacity: 4, status: 'billing', currentOrderId: 'order-2' },
  { id: '7', floorId: '1', name: 'Table 7', capacity: 4, status: 'available' },
  { id: '8', floorId: '1', name: 'Table 8', capacity: 8, status: 'available' },
  { id: '9', floorId: '1', name: 'Table 9', capacity: 2, status: 'occupied', currentOrderId: 'order-3' },
  { id: '10', floorId: '1', name: 'Table 10', capacity: 4, status: 'available' },
];

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Paneer Tikka',
    category: 'Starters',
    subcategory: 'Indian',
    description: 'Grilled cottage cheese marinated in spices',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
    prices: { dineIn: 280, takeaway: 260, delivery: 280 },
    gstPercent: 5,
    hsnCode: '12345',
    foodType: 'veg',
    isAvailable: true,
    modifiers: [
      {
        id: 'm1',
        name: 'Spice Level',
        options: [
          { id: 'o1', name: 'Mild', priceAdjustment: 0 },
          { id: 'o2', name: 'Medium', priceAdjustment: 0 },
          { id: 'o3', name: 'Extra Spicy', priceAdjustment: 0 },
        ],
        required: true,
        multiSelect: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Chicken Tikka',
    category: 'Starters',
    subcategory: 'Indian',
    description: 'Tender chicken pieces marinated in yogurt and spices',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    prices: { dineIn: 320, takeaway: 300, delivery: 320 },
    gstPercent: 5,
    foodType: 'non-veg',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    category: 'Main Course',
    subcategory: 'Italian',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    prices: { dineIn: 450, takeaway: 420, delivery: 450 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
    modifiers: [
      {
        id: 'm2',
        name: 'Extra Toppings',
        options: [
          { id: 'o4', name: 'Extra Cheese', priceAdjustment: 50 },
          { id: 'o5', name: 'Olives', priceAdjustment: 30 },
          { id: 'o6', name: 'Mushrooms', priceAdjustment: 40 },
        ],
        required: false,
        multiSelect: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Butter Chicken',
    category: 'Main Course',
    subcategory: 'Indian',
    description: 'Creamy tomato-based curry with tender chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    prices: { dineIn: 380, takeaway: 360, delivery: 380 },
    gstPercent: 5,
    foodType: 'non-veg',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Dal Makhani',
    category: 'Main Course',
    subcategory: 'Indian',
    description: 'Black lentils cooked in butter and cream',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    prices: { dineIn: 240, takeaway: 220, delivery: 240 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Garlic Naan',
    category: 'Breads',
    description: 'Soft flatbread topped with garlic and butter',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    prices: { dineIn: 60, takeaway: 55, delivery: 60 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
  },
  {
    id: '7',
    name: 'Gulab Jamun',
    category: 'Desserts',
    description: 'Sweet dumplings soaked in sugar syrup',
    image: 'https://images.unsplash.com/photo-1589301773859-bb024d3f4f2f?w=400',
    prices: { dineIn: 120, takeaway: 110, delivery: 120 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Mango Lassi',
    category: 'Beverages',
    description: 'Refreshing yogurt-based mango drink',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    prices: { dineIn: 80, takeaway: 75, delivery: 80 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
  },
  {
    id: '9',
    name: 'Caesar Salad',
    category: 'Starters',
    subcategory: 'Continental',
    description: 'Crisp romaine lettuce with Caesar dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    prices: { dineIn: 220, takeaway: 200, delivery: 220 },
    gstPercent: 5,
    foodType: 'veg',
    isAvailable: true,
  },
  {
    id: '10',
    name: 'Grilled Chicken Burger',
    category: 'Main Course',
    subcategory: 'Continental',
    description: 'Juicy grilled chicken patty with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    prices: { dineIn: 280, takeaway: 260, delivery: 280 },
    gstPercent: 5,
    foodType: 'non-veg',
    isAvailable: true,
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-001',
    tableId: '2',
    tableName: 'Table 2',
    orderType: 'dine-in',
    status: 'preparing',
    items: [
      {
        id: 'item-1',
        menuItemId: '1',
        name: 'Paneer Tikka',
        quantity: 2,
        price: 280,
        station: 'HOT',
        selectedModifiers: [
          { modifierId: 'm1', optionId: 'o3', name: 'Extra Spicy', priceAdjustment: 0 },
        ],
      },
      {
        id: 'item-2',
        menuItemId: '8',
        name: 'Mango Lassi',
        quantity: 2,
        price: 80,
        station: 'BAR',
      },
    ],
    subtotal: 720,
    taxAmount: 36,
    discount: 0,
    serviceCharge: 36,
    roundOff: 0,
    total: 792,
    waiterId: '4',
    waiterName: 'Mike Waiter',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    updatedAt: new Date(),
  },
];

// Mock KDS Tickets
export const mockKDSTickets: KDSTicket[] = [
  {
    id: 'ticket-1',
    orderId: 'order-1',
    orderNumber: 'ORD-001',
    tableName: 'Table 2',
    station: 'HOT',
    status: 'preparing',
    items: [
      {
        id: 'item-1',
        menuItemId: '1',
        name: 'Paneer Tikka',
        quantity: 2,
        price: 280,
        station: 'HOT',
        selectedModifiers: [
          { modifierId: 'm1', optionId: 'o3', name: 'Extra Spicy', priceAdjustment: 0 },
        ],
      },
    ],
    priority: false,
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    elapsedMinutes: 8,
  },
  {
    id: 'ticket-2',
    orderId: 'order-1',
    orderNumber: 'ORD-001',
    tableName: 'Table 2',
    station: 'BAR',
    status: 'pending',
    items: [
      {
        id: 'item-2',
        menuItemId: '8',
        name: 'Mango Lassi',
        quantity: 2,
        price: 80,
        station: 'BAR',
      },
    ],
    priority: false,
    createdAt: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    elapsedMinutes: 3,
  },
];

// Mock Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Paneer',
    category: 'Dairy',
    currentStock: 25,
    unit: 'kg',
    reorderLevel: 10,
    costPrice: 300,
    lastRestocked: new Date('2024-11-05'),
  },
  {
    id: '2',
    name: 'Chicken',
    category: 'Meat',
    currentStock: 30,
    unit: 'kg',
    reorderLevel: 15,
    costPrice: 250,
    lastRestocked: new Date('2024-11-06'),
  },
  {
    id: '3',
    name: 'Tomatoes',
    category: 'Vegetables',
    currentStock: 8,
    unit: 'kg',
    reorderLevel: 10,
    costPrice: 40,
    lastRestocked: new Date('2024-11-04'),
  },
  {
    id: '4',
    name: 'Onions',
    category: 'Vegetables',
    currentStock: 15,
    unit: 'kg',
    reorderLevel: 10,
    costPrice: 30,
    lastRestocked: new Date('2024-11-05'),
  },
  {
    id: '5',
    name: 'Rice',
    category: 'Grains',
    currentStock: 50,
    unit: 'kg',
    reorderLevel: 20,
    costPrice: 60,
    lastRestocked: new Date('2024-11-01'),
  },
];

// Helper function to generate order number
let orderCounter = 1;
export const generateOrderNumber = (): string => {
  return `ORD-${String(orderCounter++).padStart(3, '0')}`;
};

// Helper function to generate bill number
let billCounter = 1;
export const generateBillNumber = (): string => {
  return `BILL-${String(billCounter++).padStart(4, '0')}`;
};
