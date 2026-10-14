# Quick Start Guide 🚀

## Access the Application

The development server is running at: **http://localhost:5174**

## Test Login Credentials

### Quick Access PINs
- **Admin**: `1234` - Full system access
- **Manager**: `2345` - Dashboard, reports, settings  
- **Cashier**: `3456` - Billing, reports
- **Waiter**: `4567` - POS, table management
- **Kitchen**: `5678` - Kitchen display system
- **Storekeeper**: `6789` - Inventory management

## Recommended Test Flow

### 1️⃣ Test Waiter Flow (Most Complete)
1. Login with **Waiter** role (PIN: `4567`)
2. Click on any **green table** (Available status)
3. Browse menu items by category
4. Click **Add** on "Paneer Tikka" - see modifier modal
5. Select "Extra Spicy" and add to order
6. Add more items (try "Mango Lassi")
7. Review order summary on right panel
8. Click **"Send to Kitchen"** button
9. See success toast notification

### 2️⃣ Test Kitchen Display
1. Logout and login as **Kitchen** (PIN: `5678`)
2. See KDS interface with dark theme
3. Switch between stations: HOT, COLD, BAR, DESSERT
4. Watch elapsed time update in real-time
5. Click **Bump** to mark order complete
6. Try **Hold** button to pause an order

### 3️⃣ Test Billing
1. Login as **Cashier** (PIN: `3456`)
2. Select a table from dropdown
3. Review order items and bill summary
4. Apply discount (try 10%)
5. Select payment method (Cash/Card/UPI)
6. Click **Print Bill**

### 4️⃣ Test Admin Dashboard
1. Login as **Admin** (PIN: `1234`)
2. View sales statistics
3. Navigate through sidebar:
   - **Menu** - See all menu items with filters
   - **Inventory** - Check stock levels
   - **Reports** - View analytics
   - **Settings** - Configure restaurant

## Key Features to Explore

### Waiter POS
- ✅ Table status visualization (color-coded)
- ✅ Category-based menu browsing
- ✅ Item modifiers (spice level, add-ons)
- ✅ Real-time order summary
- ✅ Quantity adjustment
- ✅ Running total calculation

### Kitchen Display System
- ✅ Station-based filtering
- ✅ Color-coded time alerts (Green < 5min, Yellow 5-10min, Red > 10min)
- ✅ Order details with modifiers highlighted
- ✅ Bump/Hold actions
- ✅ Real-time elapsed time updates

### Billing
- ✅ GST breakdown (CGST/SGST)
- ✅ Service charge calculation
- ✅ Discount with reason
- ✅ Multiple payment methods
- ✅ Grand total with rounding

### Menu Management
- ✅ Search and filter functionality
- ✅ Veg/Non-veg indicators
- ✅ Availability toggle
- ✅ Price and GST display
- ✅ Category-wise organization

### Inventory
- ✅ Stock level monitoring
- ✅ Low stock alerts
- ✅ Inventory value calculation
- ✅ Reorder level tracking

### Reports
- ✅ Sales summary cards
- ✅ Order type breakdown
- ✅ Payment method analysis
- ✅ Top selling items table
- ✅ Export functionality

## UI/UX Highlights

- **Touch-Friendly**: 44px minimum touch targets
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessible**: WCAG 2.1 AA compliant
- **Modern Design**: Clean, professional interface
- **Color-Coded**: Intuitive status indicators
- **Real-Time**: Live updates and notifications

## Mock Data Available

- **Users**: 6 (one per role)
- **Tables**: 10 with various statuses
- **Menu Items**: 10+ across categories (Starters, Main Course, Breads, Desserts, Beverages)
- **Orders**: Sample orders with items
- **KDS Tickets**: Active tickets in different stations
- **Inventory**: 5 items with stock levels

## Navigation Tips

### Sidebar Navigation
- Click any menu item in sidebar to navigate
- User profile shown at bottom
- Logout button available

### Role-Based Access
- Each role sees only relevant menu items
- Protected routes redirect to login if unauthorized
- Persistent session with Zustand

## Keyboard Shortcuts

- **Tab**: Navigate between inputs
- **Enter**: Submit forms
- **Escape**: Close modals
- **Arrow Keys**: Navigate tables (when focused)

## Common Actions

### Adding Items to Order
1. Select table
2. Choose category
3. Click item card
4. Configure modifiers (if any)
5. Click "Add to Order"

### Adjusting Quantities
- Use **+** / **-** buttons in order summary
- Or click "Remove" to delete item

### Switching Roles
1. Click "Logout" in sidebar
2. Select new role on login screen
3. Enter corresponding PIN

## Troubleshooting

### If page doesn't load:
- Check console for errors (F12)
- Verify dev server is running
- Try refreshing the page

### If images don't load:
- Mock data uses Unsplash images
- Requires internet connection

### If state is stuck:
- Clear browser localStorage
- Refresh the page
- Re-login

## Next Steps

Want to extend the application?

1. **Add Real Backend**: Replace mock data with API calls
2. **WebSocket Integration**: Real-time KDS updates across devices
3. **Payment Gateway**: Integrate Razorpay/Stripe
4. **Printer Integration**: Connect thermal printers
5. **Advanced Charts**: Add Recharts for visual analytics
6. **Multi-Restaurant**: Support multiple outlets
7. **Customer App**: Build customer-facing ordering app

## File Structure

```
src/
├── components/ui/     # Reusable components
├── pages/            # Main pages
├── store/            # State management
├── types/            # TypeScript types
└── data/             # Mock data
```

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review code comments in source files
- Test with different roles to see all features

---

**Enjoy exploring the Restaurant POS + KDS System! 🍽️**
