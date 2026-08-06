'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const DEFAULT_ADMIN_USER: AdminUser = {
  name: 'Giám Đốc Quản Trị',
  email: 'admin@loistiq.com',
  role: 'Super Administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
};

const AUTH_STORAGE_KEY = 'loistiq_admin_auth';
const AUTH_CHANGE_EVENT = 'loistiq_admin_auth_change';

const emptySubscribe = () => () => {};

function subscribeAuth(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

function getAuthSnapshot(): boolean {
  try {
    return typeof window !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function getAuthServerSnapshot(): boolean {
  return false;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Kiểm tra môi trường client an toàn cho Hydration
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Đọc trạng thái đăng nhập từ localStorage một cách tối ưu
  const isStoredAuth = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  const isLoading = !isClient;
  const isAuthenticated = isClient && isStoredAuth;
  const user = isAuthenticated ? DEFAULT_ADMIN_USER : null;

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    // Giả lập độ trễ xác thực an toàn
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (email.trim().toLowerCase() === 'admin@loistiq.com' && pass === 'admin123') {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
      } catch (e) {
        console.error('Failed to save auth state to localStorage', e);
      }
      return { success: true };
    }

    return {
      success: false,
      message: 'Email hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại!',
    };
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    } catch (e) {
      console.error('Failed to remove auth state from localStorage', e);
    }
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

