import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockTables, mockMenuItems, generateOrderNumber } from '../data/mockData';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import type { Table, MenuItem, OrderItem } from '../types';
import { Plus, Minus, Send, Leaf, Drumstick } from 'lucide-react';
import toast from 'react-hot-toast';

export const WaiterDashboard: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modifierModal, setModifierModal] = useState<{ item: MenuItem; isOpen: boolean } | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<any[]>([]);
  
  const { currentOrder, addItemToOrder, removeItemFromOrder, updateItemQuantity, submitOrder } = useOrderStore();
  const { user } = useAuthStore();

  const categories = ['All', ...Array.from(new Set(mockMenuItems.map((item) => item.category)))];

  const filteredMenuItems = selectedCategory === 'All'
    ? mockMenuItems
    : mockMenuItems.filter((item) => item.category === selectedCategory);

  const tableStatusColors: Record<Table['status'], string> = {
    available: 'bg-green-100 border-green-300 text-green-800',
    occupied: 'bg-red-100 border-red-300 text-red-800',
    reserved: 'bg-blue-100 border-blue-300 text-blue-800',
    billing: 'bg-amber-100 border-amber-300 text-amber-800',
  };

  const handleTableSelect = (table: Table) => {
    if (table.status === 'available' || table.status === 'occupied') {
      setSelectedTable(table);
    }
  };

  const handleAddItem = (menuItem: MenuItem) => {
    if (menuItem.modifiers && menuItem.modifiers.length > 0) {
      setModifierModal({ item: menuItem, isOpen: true });
      setSelectedModifiers([]);
    } else {
      addItemDirectly(menuItem, []);
    }
  };

  const addItemDirectly = (menuItem: MenuItem, modifiers: any[]) => {
    const orderItem: OrderItem = {
      id: `item-${Date.now()}`,
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity: 1,
      price: menuItem.prices.dineIn,
      station: getStationForCategory(menuItem.category),
      selectedModifiers: modifiers,
    };
    addItemToOrder(orderItem);
    toast.success(`${menuItem.name} added to order`);
  };

  const getStationForCategory = (category: string): 'HOT' | 'COLD' | 'BAR' | 'DESSERT' => {
    if (category === 'Beverages') return 'BAR';
    if (category === 'Desserts') return 'DESSERT';
    if (category === 'Starters' || category === 'Main Course' || category === 'Breads') return 'HOT';
    return 'COLD';
  };

  const handleSendToKitchen = () => {
    if (!selectedTable || !currentOrder || !currentOrder.items || currentOrder.items.length === 0) {
      toast.error('Please add items to the order');
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      orderType: 'dine-in' as const,
      status: 'pending' as const,
      items: currentOrder.items,
      subtotal: currentOrder.subtotal || 0,
      taxAmount: (currentOrder.subtotal || 0) * 0.05,
      discount: 0,
      serviceCharge: (currentOrder.subtotal || 0) * 0.05,
      roundOff: 0,
      total: (currentOrder.subtotal || 0) * 1.1,
      waiterId: user?.id,
      waiterName: user?.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    submitOrder(order);
    toast.success('Order sent to kitchen!');
    setSelectedTable(null);
  };

  return (
    <Layout title="Waiter POS">
      <div className="h-full flex gap-6">
        {/* Left Panel - Tables or Menu */}
        <div className="flex-1 flex flex-col">
          {!selectedTable ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Table</h2>
              <div className="grid grid-cols-4 gap-4">
                {mockTables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleTableSelect(table)}
                    disabled={table.status === 'reserved' || table.status === 'billing'}
                    className={`p-6 rounded-xl border-2 transition-all touch-target ${
                      tableStatusColors[table.status]
                    } ${
                      table.status === 'reserved' || table.status === 'billing'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-md cursor-pointer'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-lg font-bold mb-1">{table.name}</p>
                      <p className="text-sm capitalize">{table.status}</p>
                      <p className="text-xs mt-1">Capacity: {table.capacity}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedTable.name}</h2>
                  <p className="text-sm text-gray-500">Select items to add to order</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedTable(null)}>
                  Change Table
                </Button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                {filteredMenuItems.map((item) => (
                  <Card
                    key={item.id}
                    hover
                    className={`relative ${!item.isAvailable ? 'opacity-50' : ''}`}
                  >
                    <div className="aspect-[4/3] relative mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2">
                        {item.foodType === 'veg' ? (
                          <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center bg-white rounded">
                            <Leaf className="w-3 h-3 text-green-600 fill-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center bg-white rounded">
                            <Drumstick className="w-3 h-3 text-red-600 fill-red-600" />
                          </div>
                        )}
                      </div>
                      {!item.isAvailable && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="error">86</Badge>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-primary mb-3">₹{item.prices.dineIn}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleAddItem(item)}
                      disabled={!item.isAvailable}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Order Summary */}
        {selectedTable && (
          <div className="w-96 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {currentOrder?.items && currentOrder.items.length > 0 ? (
                  currentOrder.items.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                            <p className="text-xs text-gray-500 italic mt-1">
                              {item.selectedModifiers.map((m) => m.name).join(', ')}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateItemQuantity(item.id, item.quantity - 1);
                              } else {
                                removeItemFromOrder(item.id);
                              }
                            }}
                            className="w-7 h-7 rounded bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItemFromOrder(item.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No items added yet</p>
                    <p className="text-sm mt-1">Select items from the menu</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{currentOrder?.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (5%)</span>
                  <span className="font-medium">₹{((currentOrder?.subtotal || 0) * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Service Charge (5%)</span>
                  <span className="font-medium">₹{((currentOrder?.subtotal || 0) * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{((currentOrder?.subtotal || 0) * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-4"
                onClick={handleSendToKitchen}
                disabled={!currentOrder?.items || currentOrder.items.length === 0}
              >
                <Send className="w-5 h-5 mr-2" />
                Send to Kitchen
              </Button>
            </Card>
          </div>
        )}
      </div>

      {/* Modifier Modal */}
      {modifierModal && (
        <Modal
          isOpen={modifierModal.isOpen}
          onClose={() => setModifierModal(null)}
          title={`Customize ${modifierModal.item.name}`}
          size="md"
        >
          <div className="space-y-6">
            {modifierModal.item.modifiers?.map((modifier) => (
              <div key={modifier.id}>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {modifier.name}
                  {modifier.required && <span className="text-red-500 ml-1">*</span>}
                </h4>
                <div className="space-y-2">
                  {modifier.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type={modifier.multiSelect ? 'checkbox' : 'radio'}
                          name={modifier.id}
                          value={option.id}
                          onChange={(e) => {
                            if (modifier.multiSelect) {
                              if (e.target.checked) {
                                setSelectedModifiers([...selectedModifiers, { modifierId: modifier.id, optionId: option.id, name: option.name, priceAdjustment: option.priceAdjustment }]);
                              } else {
                                setSelectedModifiers(selectedModifiers.filter((m) => m.optionId !== option.id));
                              }
                            } else {
                              setSelectedModifiers([...selectedModifiers.filter((m) => m.modifierId !== modifier.id), { modifierId: modifier.id, optionId: option.id, name: option.name, priceAdjustment: option.priceAdjustment }]);
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span className="font-medium text-gray-900">{option.name}</span>
                      </div>
                      {option.priceAdjustment > 0 && (
                        <span className="text-sm text-gray-600">+₹{option.priceAdjustment}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                addItemDirectly(modifierModal.item, selectedModifiers);
                setModifierModal(null);
              }}
            >
              Add to Order
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};
