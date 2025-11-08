import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { mockUsers } from '../data/mockData';
import type { UserRole } from '../types';
import { ChefHat, Users, CreditCard, Utensils, Package, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const roleIcons: Record<UserRole, React.ReactNode> = {
  admin: <Shield className="w-8 h-8" />,
  manager: <Users className="w-8 h-8" />,
  cashier: <CreditCard className="w-8 h-8" />,
  waiter: <Utensils className="w-8 h-8" />,
  kitchen: <ChefHat className="w-8 h-8" />,
  storekeeper: <Package className="w-8 h-8" />,
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
  manager: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  cashier: 'bg-green-100 text-green-600 hover:bg-green-200',
  waiter: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
  kitchen: 'bg-red-100 text-red-600 hover:bg-red-200',
  storekeeper: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
};

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const roles: UserRole[] = ['admin', 'manager', 'cashier', 'waiter', 'kitchen', 'storekeeper'];

  const handleLogin = () => {
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    if (!pin) {
      toast.error('Please enter PIN');
      return;
    }

    const user = mockUsers.find((u) => u.role === selectedRole && u.pin === pin);

    if (user) {
      login(user);
      toast.success(`Welcome, ${user.name}!`);
      
      // Navigate based on role
      switch (user.role) {
        case 'waiter':
          navigate('/waiter');
          break;
        case 'kitchen':
          navigate('/kds');
          break;
        case 'cashier':
          navigate('/billing');
          break;
        case 'admin':
        case 'manager':
          navigate('/dashboard');
          break;
        case 'storekeeper':
          navigate('/inventory');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      toast.error('Invalid PIN');
      setPin('');
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-4 sm:p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Restaurant POS</h1>
          <p className="text-gray-600 dark:text-gray-300">Select your role and enter PIN to continue</p>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Select Role</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                  selectedRole === role
                    ? 'border-primary bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${roleColors[role]}`}
              >
                <div className="flex flex-col items-center gap-2">
                  {roleIcons[role]}
                  <span className="font-medium capitalize">{role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PIN Input */}
        {selectedRole && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Enter PIN</h2>
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-gray-50"
                  >
                    {pin[i] ? '•' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handlePinInput(String(digit))}
                  className="h-12 sm:h-14 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold text-lg transition-colors text-gray-900 dark:text-gray-50"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="h-12 sm:h-14 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold text-lg transition-colors text-gray-900 dark:text-gray-50"
              >
                ←
              </button>
              <button
                onClick={() => handlePinInput('0')}
                className="h-12 sm:h-14 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold text-lg transition-colors text-gray-900 dark:text-gray-50"
              >
                0
              </button>
              <button
                onClick={() => setPin('')}
                className="h-12 sm:h-14 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold text-sm transition-colors text-gray-900 dark:text-gray-50"
              >
                Clear
              </button>
            </div>

            <Button
              onClick={handleLogin}
              size="lg"
              className="w-full max-w-xs mx-auto block"
              disabled={pin.length !== 4}
            >
              Login
            </Button>

            <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-4">
              Hint: Default PIN for all roles is their position in the list (1234, 2345, etc.)
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
