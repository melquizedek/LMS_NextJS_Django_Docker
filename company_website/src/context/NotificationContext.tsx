'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationItem {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextValue {
  showNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    ({ message, title, type, duration = 4500 }: Omit<NotificationItem, 'id'>) => {
      const id = 'notif-' + Math.random().toString(36).substring(2, 9);
      setNotifications((prev) => [...prev, { id, message, title, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          dismissNotification(id);
        }, duration);
      }
    },
    [dismissNotification]
  );

  const showSuccess = useCallback(
    (message: string, title?: string) => showNotification({ type: 'success', message, title }),
    [showNotification]
  );

  const showError = useCallback(
    (message: string, title?: string) => showNotification({ type: 'error', message, title }),
    [showNotification]
  );

  const showInfo = useCallback(
    (message: string, title?: string) => showNotification({ type: 'info', message, title }),
    [showNotification]
  );

  return (
    <NotificationContext.Provider
      value={{ showNotification, showSuccess, showError, showInfo, dismissNotification }}
    >
      {children}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex items-start gap-3 text-slate-800"
            >
              {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
              {n.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              {n.type === 'info' && <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />}
              {n.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}

              <div className="flex-1 text-sm">
                {n.title && <div className="font-semibold text-slate-900 mb-0.5">{n.title}</div>}
                <div className="text-slate-600 leading-snug">{n.message}</div>
              </div>

              <button
                onClick={() => dismissNotification(n.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}
