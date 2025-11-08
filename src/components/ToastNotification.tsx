import React, { useEffect } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useAuthStore } from '../store/authStore';
import { CheckCircle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { user } = useAuthStore();
  const { markAsRead, getNotificationsForRole } = useNotificationStore();

  const userNotifications = user ? getNotificationsForRole(user.role) : [];
  const latestUnread = userNotifications.find((n) => !n.read);

  useEffect(() => {
    if (latestUnread) {
      // Play notification sound (optional)
      // const audio = new Audio('/notification.mp3');
      // audio.play().catch(() => {});
    }
  }, [latestUnread]);

  if (!latestUnread) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            {latestUnread.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {latestUnread.message}
          </p>
        </div>
        <button
          onClick={() => markAsRead(latestUnread.id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Dismiss notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
