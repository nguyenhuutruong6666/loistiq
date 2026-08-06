'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  AdminUser,
  authenticateAdmin,
  persistAdminAuth,
  removeAdminAuth,
  getAdminAuthSnapshot,
  getAdminUserSnapshot,
  getServerAuthSnapshot,
  getServerUserSnapshot,
  subscribeAdminAuth,
} from '@/data/adminAuth';

export type { AdminUser };

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const emptySubscribe = () => () => {};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Kiểm tra môi trường client an toàn cho Hydration
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Đọc trạng thái xác thực từ module data một cách tối ưu
  const isStoredAuth = useSyncExternalStore(
    subscribeAdminAuth,
    getAdminAuthSnapshot,
    getServerAuthSnapshot
  );

  // Đọc thông tin người dùng từ module data
  const currentUser = useSyncExternalStore(
    subscribeAdminAuth,
    getAdminUserSnapshot,
    getServerUserSnapshot
  );

  const isLoading = !isClient;
  const isAuthenticated = isClient && isStoredAuth;
  const user = isAuthenticated ? currentUser : null;

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const result = await authenticateAdmin(email, pass);

    if (result.success && result.user) {
      persistAdminAuth(result.user);
      return { success: true };
    }

    return {
      success: false,
      message: result.message || 'Email hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại!',
    };
  };

  const logout = () => {
    removeAdminAuth();
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
