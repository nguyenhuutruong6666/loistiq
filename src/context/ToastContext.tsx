'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle, AlertVariant } from '@/components/reui/alert';
import { CircleCheck, CircleAlert, TriangleAlert, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, description, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, description, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CircleCheck className="w-5 h-5 shrink-0" />;
      case 'error':
        return <CircleAlert className="w-5 h-5 shrink-0" />;
      case 'warning':
        return <TriangleAlert className="w-5 h-5 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 shrink-0" />;
    }
  };

  const getVariant = (type: ToastType): AlertVariant => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}

      {/* Floating Toasts Container: Hiển thị góc trên cùng bên phải toàn ứng dụng */}
      <aside
        aria-label="Thông báo hệ thống"
        aria-live="polite"
        className="fixed top-20 right-4 sm:right-6 z-9999 flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto transition-all duration-300 transform translate-y-0 opacity-100 shadow-2xl animate-in slide-in-from-top-4 fade-in"
          >
            <Alert variant={getVariant(toast.type)} className="shadow-lg border backdrop-blur-md">
              {getIcon(toast.type)}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5 pr-2">
                  <AlertTitle className="text-sm font-serif font-bold">{toast.title}</AlertTitle>
                  {toast.description && (
                    <AlertDescription className="text-xs">{toast.description}</AlertDescription>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Đóng"
                  className="opacity-70 hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-black/5 cursor-pointer -mr-2 -mt-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </Alert>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
