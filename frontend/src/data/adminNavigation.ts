import { LucideIcon, LayoutDashboard, Building2, Users } from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import { INITIAL_LEADS } from '@/data/adminMock';

export interface AdminNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: string;
  badgeClass?: string;
}

// Danh mục các liên kết điều hướng trong Sidebar Quản Trị
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
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
    badge: `${PROPERTIES.length}`,
  },
  {
    name: 'Quản Lý Tư Vấn',
    href: '/admin/contacts',
    icon: Users,
    badge: `${INITIAL_LEADS.filter((l) => l.status === 'Mới tiếp nhận').length || INITIAL_LEADS.length} Mới`,
    badgeClass: 'bg-[#b8864a] text-white',
  },
];
