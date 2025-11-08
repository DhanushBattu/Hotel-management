<<<<<<< HEAD
# Hotel-management
=======
# Restaurant POS + KDS System 🍽️

A comprehensive Restaurant Point of Sale (POS) and Kitchen Display System (KDS) built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Modules
- **User Authentication** - Role-based login with PIN support (Admin, Manager, Cashier, Waiter, Kitchen, Storekeeper)
- **Waiter POS** - Touch-friendly tablet interface for order taking with table management
- **Kitchen Display System** - Real-time order display with color-coded timing alerts
- **Billing Interface** - Complete billing with GST breakdown and multiple payment methods
- **Menu Management** - Full CRUD operations for menu items with modifiers
- **Inventory Management** - Stock tracking, GRN, and stock adjustments
- **Reports & Analytics** - Sales reports, top-selling items, and payment breakdowns
- **Settings** - Restaurant profile, tax configuration, and user management

### Key Highlights
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Touch-optimized for tablets (44px minimum touch targets)
- ✅ Role-based access control
- ✅ Real-time KDS updates with elapsed time tracking
- ✅ GST-compliant billing (CGST/SGST/IGST)
- ✅ Mock data for testing all workflows
- ✅ Accessibility compliant (WCAG 2.1 AA)

## 🎨 Design System

**Color Palette:**
- Primary: `#10b981` (Emerald Green)
- Secondary: `#3b82f6` (Blue)
- Accent: `#f59e0b` (Amber)

**Typography:** Inter font family

## 📦 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Build Tool:** Vite

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Default Login Credentials

All users use PIN-based authentication:

| Role | PIN | Access |
|------|-----|--------|
| Admin | 1234 | Full system access |
| Manager | 2345 | Dashboard, reports, settings |
| Cashier | 3456 | Billing, reports |
| Waiter | 4567 | POS, table management |
| Kitchen | 5678 | Kitchen display system |
| Storekeeper | 6789 | Inventory management |

## 📱 User Flows

### Flow 1: Waiter Takes Order
1. Login as Waiter (PIN: 4567)
2. Select an available table
3. Browse menu by category
4. Add items with modifiers
5. Review order summary
6. Send to kitchen

### Flow 2: Kitchen Prepares Order
1. Login as Kitchen (PIN: 5678)
2. View tickets by station (HOT/COLD/BAR)
3. Monitor elapsed time (color-coded)
4. Bump when ready

### Flow 3: Cashier Generates Bill
1. Login as Cashier (PIN: 3456)
2. Select table with completed order
3. Apply discounts if needed
4. Select payment method
5. Print bill

### Flow 4: Manager Views Reports
1. Login as Manager (PIN: 2345)
2. Navigate to Reports
3. View sales analytics
4. Export data

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── Layout.tsx    # Main layout with sidebar
├── pages/            # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── WaiterDashboard.tsx
│   ├── KDS.tsx
│   ├── Billing.tsx
│   ├── MenuManagement.tsx
│   ├── Inventory.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── store/            # Zustand state management
│   ├── authStore.ts
│   └── orderStore.ts
├── types/            # TypeScript type definitions
├── data/             # Mock data
└── App.tsx           # Main app with routing
```

## 🎯 Key Components

### UI Components
- `Button` - Primary, secondary, ghost, danger variants
- `Card` - Container with header and content sections
- `Input` - Form input with label and error handling
- `Select` - Dropdown with label
- `Modal` - Accessible modal dialog
- `Badge` - Status indicators

### Pages
- **Login** - Role selection with PIN pad
- **WaiterDashboard** - Table view + menu ordering
- **KDS** - Kitchen display with ticket management
- **Billing** - Invoice generation with payment
- **MenuManagement** - Menu CRUD operations
- **Inventory** - Stock management
- **Reports** - Analytics dashboard
- **Settings** - Configuration panel

## 🔧 Configuration

### Tax Settings
- CGST: 2.5%
- SGST: 2.5%
- Service Charge: 5%
- Rounding: Enabled

### Kitchen Stations
- **HOT** - Starters, Main Course, Breads
- **COLD** - Salads, Cold appetizers
- **BAR** - Beverages, Drinks
- **DESSERT** - Sweets, Desserts

## 🚦 Status Indicators

### Table Status
- 🟢 **Available** - Ready for new orders
- 🔴 **Occupied** - Currently serving
- 🔵 **Reserved** - Pre-booked
- 🟡 **Billing** - Payment in progress

### KDS Time Alerts
- 🟢 **< 5 min** - On time
- 🟡 **5-10 min** - Attention needed
- 🔴 **> 10 min** - Urgent

## 📊 Mock Data

The application includes comprehensive mock data:
- 6 users (one per role)
- 10 tables with various statuses
- 10+ menu items across categories
- Sample orders and KDS tickets
- Inventory items with stock levels

## 🎨 Responsive Design

- **Mobile:** 320px - 767px (single column)
- **Tablet:** 768px - 1023px (optimized for POS)
- **Desktop:** 1024px+ (full layout with sidebar)

## ⚡ Performance Targets

- Initial load: < 2 seconds
- Menu search: < 300ms
- KDS update: < 500ms
- Print trigger: < 1 second

## 🔒 Security Features

- Role-based access control
- Protected routes
- Session management with Zustand persist
- PIN-based authentication

## 📝 License

This project is built as a demonstration of a modern Restaurant POS system.

## 🤝 Contributing

This is a complete working prototype. Feel free to extend with:
- Real backend API integration
- WebSocket for real-time updates
- Actual payment gateway integration
- Receipt printer integration
- Advanced reporting with charts

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
>>>>>>> 4107d0b ( Preview)
