'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ExternalLink,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAdminAuth } from '@/context/AdminAuthContext';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { ADMIN_NAV_ITEMS } from '@/data/adminNavigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-black/10 bg-white">
        {/* 1. Header with Logo and Brand */}
        <SidebarHeader className="h-16 p-0 px-4 flex flex-row items-center border-b border-black/10 justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/10 shrink-0 bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="LOISTIQ Logo"
                fill
                sizes="32px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="font-bold text-sm tracking-tight text-[#09090b] truncate">
                LOISTIQ
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#71717a] font-medium">
                CỔNG QUẢN TRỊ
              </span>
            </div>
          </div>
        </SidebarHeader>

        {/* 2. Scrollable Content with Navigation Groups */}
        <SidebarContent className="bg-white">
          {/* Main Management Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Hệ Thống Quản Lý</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ADMIN_NAV_ITEMS.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} size="default">
                        <Link href={item.href}>
                          <Icon className={isActive ? 'text-white' : 'text-[#71717a]'} />
                          <span className={isActive ? 'text-white font-medium' : 'text-[#09090b]'}>
                            {item.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge
                          className={
                            isActive
                              ? 'bg-white/20 text-white font-medium'
                              : 'bg-[#f4f4f5] text-[#71717a] border border-black/5 font-medium'
                          }
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Client Portal Link Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Khách Hàng</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/" target="_blank">
                      <ExternalLink className="text-[#71717a]" />
                      <span className="text-[#09090b]">Xem Trang Khách Hàng</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* 3. Sticky Footer with Admin Info & Logout */}
        <SidebarFooter className="border-t border-black/10 bg-[#fafafa]">
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-black/10 shadow-xs group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#f4f4f5] border border-black/10 flex items-center justify-center text-[#09090b] font-bold text-xs shrink-0">
                AD
              </div>
              <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="text-xs font-semibold text-[#09090b] truncate">
                  {user?.name || 'Giám Đốc Quản Trị'}
                </p>
                <p className="text-[10px] text-[#71717a] font-medium truncate">
                  {user?.role || 'Super Administrator'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLogoutConfirmOpen(true)}
              title="Đăng xuất"
              className="p-1.5 rounded-md text-[#71717a] hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer group-data-[collapsible=icon]:hidden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </SidebarFooter>

        {/* 4. Resizable / Collapsible Rail */}
        <SidebarRail />
      </Sidebar>

      {/* Confirm Logout Dialog */}
      <ConfirmDialog
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={logout}
        title="Xác nhận đăng xuất"
        message="Quý khách có chắc chắn muốn đăng xuất khỏi Cổng Quản Trị LOISTIQ không?"
        confirmText="Đăng xuất"
        cancelText="Ở lại"
        isDestructive={true}
      />
    </>
  );
}
