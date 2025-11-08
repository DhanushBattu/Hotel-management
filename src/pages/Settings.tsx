import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <Layout title="Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Restaurant Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Restaurant Name" defaultValue="My Restaurant" />
              <Input label="Phone" defaultValue="+91 98765 43210" />
              <Input label="Email" defaultValue="info@restaurant.com" />
              <Input label="GSTIN" defaultValue="29ABCDE1234F1Z5" />
              <Input label="FSSAI" defaultValue="12345678901234" />
              <Input label="City" defaultValue="Mumbai" />
            </div>
            <Input label="Address" defaultValue="123 Main Street, Area Name" />
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="CGST Rate (%)" type="number" defaultValue="2.5" />
              <Input label="SGST Rate (%)" type="number" defaultValue="2.5" />
              <Input label="Service Charge (%)" type="number" defaultValue="5" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rounding" className="w-4 h-4" defaultChecked />
              <label htmlFor="rounding" className="text-sm text-gray-700">
                Enable automatic rounding
              </label>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Button size="sm">Add User</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: 'Admin User', role: 'Admin', status: 'Active' },
                    { name: 'John Manager', role: 'Manager', status: 'Active' },
                    { name: 'Sarah Cashier', role: 'Cashier', status: 'Active' },
                    { name: 'Mike Waiter', role: 'Waiter', status: 'Active' },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                      <td className="px-4 py-3 text-sm text-green-600">{user.status}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};
