import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TrendingUp, DollarSign, ShoppingBag, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Date Filter */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Today</Button>
            <Button variant="ghost" size="sm">Yesterday</Button>
            <Button variant="ghost" size="sm">This Week</Button>
            <Button variant="ghost" size="sm">This Month</Button>
            <Button variant="ghost" size="sm">Custom</Button>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">₹45,230</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% vs yesterday</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">87</p>
                  <p className="text-sm text-green-600 mt-1">+8.2% vs yesterday</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹520</p>
                  <p className="text-sm text-red-600 mt-1">-2.4% vs yesterday</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Order Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Dine-in</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹28,500</p>
                    <p className="text-sm text-gray-500">63%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Takeaway</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹11,230</p>
                    <p className="text-sm text-gray-500">25%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-gray-700">Delivery</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹5,500</p>
                    <p className="text-sm text-gray-500">12%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-700">UPI</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹22,115</p>
                    <p className="text-sm text-gray-500">49%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-gray-700">Card</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹15,792</p>
                    <p className="text-sm text-gray-500">35%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-gray-700">Cash</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹7,323</p>
                    <p className="text-sm text-gray-500">16%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Quantity Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { rank: 1, name: 'Paneer Tikka', qty: 24, revenue: 6720 },
                    { rank: 2, name: 'Butter Chicken', qty: 18, revenue: 6840 },
                    { rank: 3, name: 'Margherita Pizza', qty: 15, revenue: 6750 },
                    { rank: 4, name: 'Dal Makhani', qty: 22, revenue: 5280 },
                    { rank: 5, name: 'Garlic Naan', qty: 45, revenue: 2700 },
                  ].map((item) => (
                    <tr key={item.rank} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">#{item.rank}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{item.name}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {item.qty} orders
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">₹{item.revenue.toLocaleString()}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
