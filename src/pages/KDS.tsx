import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { KDSTicket, KitchenStation } from '../types';
import { mockKDSTickets } from '../data/mockData';
import { Clock, CheckCircle, Pause, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const KDS: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<KitchenStation>('HOT');
  const [tickets, setTickets] = useState<KDSTicket[]>(mockKDSTickets);
  const { user, logout } = useAuthStore();

  const stations: KitchenStation[] = ['HOT', 'COLD', 'BAR', 'DESSERT'];

  // Update elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) => ({
          ...ticket,
          elapsedMinutes: Math.floor((Date.now() - ticket.createdAt.getTime()) / 60000),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredTickets = tickets.filter((ticket) => ticket.station === selectedStation && ticket.status !== 'bumped');

  const handleBump = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: 'bumped', bumpedAt: new Date() }
          : ticket
      )
    );
  };

  const handleHold = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: ticket.status === 'hold' ? 'preparing' : 'hold' }
          : ticket
      )
    );
  };

  const getTimeColor = (minutes: number) => {
    if (minutes < 5) return 'text-green-600 bg-green-100';
    if (minutes < 10) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getTicketBorderColor = (minutes: number) => {
    if (minutes < 5) return 'border-green-300';
    if (minutes < 10) return 'border-amber-300';
    return 'border-red-300 border-2';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kitchen Display System</h1>
            <p className="text-sm text-gray-400">Station: {selectedStation}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <Button variant="ghost" onClick={logout} className="text-white">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Station Tabs */}
      <div className="bg-gray-800 px-6 py-3 flex gap-2 border-b border-gray-700">
        {stations.map((station) => {
          const stationTickets = tickets.filter((t) => t.station === station && t.status !== 'bumped');
          return (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors relative ${
                selectedStation === station
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {station}
              {stationTickets.length > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stationTickets.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tickets Grid */}
      <div className="p-6">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">All Clear!</h2>
            <p className="text-gray-400">No pending orders for {selectedStation} station</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className={`bg-gray-800 border-2 ${getTicketBorderColor(ticket.elapsedMinutes)} ${
                  ticket.status === 'hold' ? 'opacity-60' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {ticket.orderNumber}
                    </h3>
                    <p className="text-lg text-gray-300">
                      {ticket.tableName || ticket.tokenNumber}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-semibold ${getTimeColor(ticket.elapsedMinutes)}`}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    {ticket.elapsedMinutes}m
                  </div>
                </div>

                {/* Priority Badge */}
                {ticket.priority && (
                  <Badge variant="error" className="mb-3">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    RUSH ORDER
                  </Badge>
                )}

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {ticket.items.map((item) => (
                    <div key={item.id} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-xl font-bold text-white">
                            {item.quantity}x {item.name}
                          </p>
                          {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                            <p className="text-sm text-amber-400 italic mt-1 font-medium">
                              {item.selectedModifiers.map((m) => m.name).join(', ')}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-sm text-gray-400 mt-1">Note: {item.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => handleBump(ticket.id)}
                    disabled={ticket.status === 'hold'}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Bump
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => handleHold(ticket.id)}
                    className="text-white border border-gray-600"
                  >
                    <Pause className="w-5 h-5" />
                  </Button>
                </div>

                {ticket.status === 'hold' && (
                  <div className="mt-2 text-center text-amber-400 text-sm font-medium">
                    ON HOLD
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
