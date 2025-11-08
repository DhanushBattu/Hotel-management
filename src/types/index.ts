// User and Authentication Types
export type UserRole = 'admin' | 'manager' | 'cashier' | 'waiter' | 'kitchen' | 'storekeeper';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  pin?: string;
  email?: string;
  createdAt: Date;
}

// Table Types
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'billing';

export interface Table {
  id: string;
  floorId: string;
  name: string;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  waiterName?: string;
}

// Menu Types
export type FoodType = 'veg' | 'non-veg' | 'egg';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  image?: string;
  prices: {
    dineIn: number;
    takeaway: number;
    delivery: number;
  };
  gstPercent: number;
  hsnCode?: string;
  foodType: FoodType;
  isAvailable: boolean;
  modifiers?: Modifier[];
  recipeId?: string;
}

export interface Modifier {
  id: string;
  name: string;
  options: ModifierOption[];
  required: boolean;
  multiSelect: boolean;
}

export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

// Order Types
export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  tableId?: string;
  tableName?: string;
  tokenNumber?: string;
  orderType: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountReason?: string;
  serviceCharge: number;
  roundOff: number;
  total: number;
  waiterId?: string;
  waiterName?: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  selectedModifiers?: SelectedModifier[];
  notes?: string;
  station: KitchenStation;
}

export interface SelectedModifier {
  modifierId: string;
  optionId: string;
  name: string;
  priceAdjustment: number;
}

// KDS Types
export type KitchenStation = 'HOT' | 'COLD' | 'BAR' | 'DESSERT';
export type TicketStatus = 'pending' | 'preparing' | 'ready' | 'bumped' | 'hold';

export interface KDSTicket {
  id: string;
  orderId: string;
  orderNumber: string;
  tableName?: string;
  tokenNumber?: string;
  station: KitchenStation;
  status: TicketStatus;
  items: OrderItem[];
  priority: boolean;
  createdAt: Date;
  startedAt?: Date;
  bumpedAt?: Date;
  elapsedMinutes: number;
}

// Billing Types
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'split';

export interface Bill {
  id: string;
  billNumber: string;
  orderId: string;
  order: Order;
  cgst: number;
  sgst: number;
  igst: number;
  paymentMethod: PaymentMethod;
  splitPayments?: SplitPayment[];
  amountPaid: number;
  changeGiven: number;
  paidAt: Date;
  cashierId: string;
  cashierName: string;
}

export interface SplitPayment {
  method: PaymentMethod;
  amount: number;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  reorderLevel: number;
  costPrice: number;
  supplierId?: string;
  lastRestocked?: Date;
}

export interface GRN {
  id: string;
  grnNumber: string;
  supplierId: string;
  supplierName: string;
  invoiceNumber: string;
  invoiceDate: Date;
  items: GRNItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'submitted' | 'approved';
  attachment?: string;
  createdBy: string;
  createdAt: Date;
}

export interface GRNItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  rate: number;
  taxPercent: number;
  amount: number;
}

export interface StockAdjustment {
  id: string;
  itemId: string;
  itemName: string;
  currentStock: number;
  adjustmentQuantity: number;
  newStock: number;
  reason: 'wastage' | 'breakage' | 'staff-meal' | 'expiry' | 'correction';
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
}

// Settings Types
export interface RestaurantProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstin: string;
  fssai: string;
  logo?: string;
}

export interface TaxSettings {
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  serviceChargePercent: number;
  enableRounding: boolean;
}

// Report Types
export interface SalesReport {
  date: string;
  totalSales: number;
  ordersCount: number;
  averageOrderValue: number;
  dineInSales: number;
  takeawaySales: number;
  deliverySales: number;
  cashPayments: number;
  cardPayments: number;
  upiPayments: number;
  topSellingItems: TopSellingItem[];
}

export interface TopSellingItem {
  itemId: string;
  itemName: string;
  quantitySold: number;
  revenue: number;
}

// Notification Types
export type NotificationType = 'order-ready' | 'order-bumped' | 'new-order' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  orderId?: string;
  orderNumber?: string;
  tableName?: string;
  tokenNumber?: string;
  targetRole?: UserRole;
  read: boolean;
  createdAt: Date;
}
