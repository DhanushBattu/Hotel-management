import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { mockTables, mockOrders } from '../data/mockData';
import { CreditCard, Smartphone, Banknote, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export const Billing: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash');
  const [discount, setDiscount] = useState(0);

  const occupiedTables = mockTables.filter((t) => t.status === 'occupied' || t.status === 'billing');
  const selectedOrder = mockOrders[0]; // Mock order for demo

  const subtotal = selectedOrder?.subtotal || 0;
  const taxAmount = subtotal * 0.05;
  const serviceCharge = subtotal * 0.05;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount + serviceCharge - discountAmount;

  const handlePrintBill = () => {
    toast.success('Bill printed successfully!');
  };

  return (
    <Layout title="Billing">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Order Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                label="Table"
                options={[
                  { value: '', label: 'Select a table' },
                  ...occupiedTables.map((t) => ({ value: t.id, label: t.name })),
                ]}
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
              />
            </CardContent>
          </Card>

          {selectedOrder && (
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>CGST (2.5%)</span>
                <span className="font-medium">₹{(taxAmount / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>SGST (2.5%)</span>
                <span className="font-medium">₹{(taxAmount / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Service Charge (5%)</span>
                <span className="font-medium">₹{serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Discount</span>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-24 text-right"
                  min="0"
                  max="100"
                />
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount Amount</span>
                  <span className="font-medium">-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300">
                <span>Grand Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Banknote className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Cash</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">UPI</p>
                </button>
              </div>

              <Button size="lg" className="w-full" onClick={handlePrintBill}>
                <Printer className="w-5 h-5 mr-2" />
                Print Bill
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
