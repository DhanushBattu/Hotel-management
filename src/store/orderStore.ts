import { create } from 'zustand';
import type { Order, OrderItem } from '../types';

interface OrderState {
  currentOrder: Partial<Order> | null;
  orders: Order[];
  addItemToOrder: (item: OrderItem) => void;
  removeItemFromOrder: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCurrentOrder: () => void;
  setCurrentOrder: (order: Partial<Order>) => void;
  submitOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  currentOrder: null,
  orders: [],
  
  addItemToOrder: (item) => set((state) => {
    const currentOrder = state.currentOrder || { items: [] };
    const existingItemIndex = currentOrder.items?.findIndex(
      (i) => i.menuItemId === item.menuItemId && 
             JSON.stringify(i.selectedModifiers) === JSON.stringify(item.selectedModifiers)
    );

    let updatedItems = [...(currentOrder.items || [])];
    
    if (existingItemIndex !== undefined && existingItemIndex >= 0) {
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity,
      };
    } else {
      updatedItems.push(item);
    }

    const subtotal = updatedItems.reduce((sum, i) => {
      const modifierTotal = i.selectedModifiers?.reduce((modSum, mod) => modSum + mod.priceAdjustment, 0) || 0;
      return sum + ((i.price + modifierTotal) * i.quantity);
    }, 0);

    return {
      currentOrder: {
        ...currentOrder,
        items: updatedItems,
        subtotal,
      },
    };
  }),

  removeItemFromOrder: (itemId) => set((state) => {
    if (!state.currentOrder?.items) return state;
    
    const updatedItems = state.currentOrder.items.filter((i) => i.id !== itemId);
    const subtotal = updatedItems.reduce((sum, i) => {
      const modifierTotal = i.selectedModifiers?.reduce((modSum, mod) => modSum + mod.priceAdjustment, 0) || 0;
      return sum + ((i.price + modifierTotal) * i.quantity);
    }, 0);

    return {
      currentOrder: {
        ...state.currentOrder,
        items: updatedItems,
        subtotal,
      },
    };
  }),

  updateItemQuantity: (itemId, quantity) => set((state) => {
    if (!state.currentOrder?.items) return state;
    
    const updatedItems = state.currentOrder.items.map((i) =>
      i.id === itemId ? { ...i, quantity } : i
    );
    
    const subtotal = updatedItems.reduce((sum, i) => {
      const modifierTotal = i.selectedModifiers?.reduce((modSum, mod) => modSum + mod.priceAdjustment, 0) || 0;
      return sum + ((i.price + modifierTotal) * i.quantity);
    }, 0);

    return {
      currentOrder: {
        ...state.currentOrder,
        items: updatedItems,
        subtotal,
      },
    };
  }),

  clearCurrentOrder: () => set({ currentOrder: null }),

  setCurrentOrder: (order) => set({ currentOrder: order }),

  submitOrder: (order) => set((state) => ({
    orders: [...state.orders, order],
    currentOrder: null,
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
    ),
  })),
}));
