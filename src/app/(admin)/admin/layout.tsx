'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // Nếu đang ở trang Login, render trực tiếp không có Sidebar
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] text-[#121212] font-sans antialiased">
        {children}
      </div>
    );
  }

  // Đang kiểm tra phiên đăng nhập
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center font-sans antialiased">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#b8864a] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#8c5a1e] font-semibold">
            Đang xác thực quyền Quản Trị...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#121212] font-sans antialiased flex w-full">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="flex flex-col h-svh overflow-hidden">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
