'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  Mail,
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

const NAV_ITEMS = [
  {
    name: 'Bảng Điều Khiển',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Quản Lý BĐS',
    href: '/admin/properties',
    icon: Building2,
    badge: '10',
  },
  {
    name: 'Yêu Cầu Tư Vấn & Lịch VIP',
    href: '/admin/contacts',
    icon: Users,
    badge: '5 Mới',
    badgeClass: 'bg-[#b8864a] text-white',
  },
  {
    name: 'Bản Tin & Tạp Chí',
    href: '/admin/newsletter',
    icon: Mail,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-black/10 bg-[#FAF7F2]">
      {/* 1. Header with Logo and Brand */}
      <SidebarHeader className="border-b border-black/5">
        <div className="flex items-center gap-3 p-1">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#b8864a]/40 shrink-0 shadow-xs">
            <Image
              src="/logo.png"
              alt="LOISTIQ Admin"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
            <span className="font-serif text-lg font-bold tracking-tight text-[#121212] leading-none">
              LOISTIQ
            </span>
            <span className="text-[9px] uppercase tracking-[2px] text-[#8c5a1e] font-semibold mt-1">
              Cổng Quản Trị
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. Scrollable Content with Navigation Groups */}
      <SidebarContent>
        {/* Main Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Hệ Thống Quản Lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} size="default">
                      <Link href={item.href}>
                        <Icon className={isActive ? 'text-white' : 'text-[#8c5a1e]'} />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge
                        className={
                          isActive
                            ? 'bg-black/20 text-white'
                            : item.badgeClass || 'bg-black/5 text-[#5c5c5c]'
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
                    <ExternalLink className="text-[#8c5a1e]" />
                    <span>Xem Trang Khách Hàng</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Sticky Footer with Admin Info & Logout */}
      <SidebarFooter className="border-t border-black/5 bg-[#F3EFE6]/50">
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-white border border-black/5 shadow-2xs group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#b8864a]/15 border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e] font-extrabold text-xs shrink-0">
              AD
            </div>
            <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-semibold text-[#121212] truncate">
                {user?.name || 'Giám Đốc Quản Trị'}
              </p>
              <p className="text-[10px] text-[#8c5a1e] font-medium truncate">
                {user?.role || 'Super Administrator'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Đăng xuất"
            className="p-1.5 rounded-lg text-[#7a7a7a] hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>

      {/* 4. Resizable / Collapsible Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
