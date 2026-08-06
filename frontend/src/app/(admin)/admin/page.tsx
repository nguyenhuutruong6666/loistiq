'use client';

import React, { useState, useMemo } from 'react';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from 'lucide-react';

import {
  ShadcnMetricCard,
  ShadcnOverviewBarChart,
  ShadcnRecentSalesCard,
  ShadcnAnalyticsTab,
  ShadcnReportsTab,
  ShadcnNotificationsTab,
  ShadcnAssetDistributionCard,
  ShadcnDataFoundationCard,
} from '@/components/admin/dashboard';

// Dữ liệu từ thư mục src/data
import { PROPERTIES } from '@/data/properties';
import { PURE_CATEGORIES } from '@/data/categories';
import { CITIES } from '@/data/locations';
import { INITIAL_LEADS, INITIAL_SUBSCRIBERS } from '@/data/adminMock';
import { ADMIN_ACCOUNTS } from '@/data/adminAuth';
import { PILLARS, ARCHITECTS, MATERIALS } from '@/data/philosophy';
import { ADMIN_NAV_ITEMS } from '@/data/adminNavigation';

type TabType = 'overview' | 'analytics' | 'reports' | 'notifications';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // 1. Tính toán Tổng Định Giá Danh Mục BĐS (properties.ts)
  const totalValuation = useMemo(() => {
    return PROPERTIES.reduce((sum, p) => sum + (p.rawPrice || 0), 0);
  }, []);

  // 2. Tính toán Phân Bổ Theo Danh Mục (categories.ts + properties.ts)
  const categoryDistribution = useMemo(() => {
    const counts: Record<string, { count: number; totalValuation: number }> = {};

    PURE_CATEGORIES.forEach((cat) => {
      counts[cat] = { count: 0, totalValuation: 0 };
    });

    PROPERTIES.forEach((p) => {
      const cat = p.category;
      if (!counts[cat]) {
        counts[cat] = { count: 0, totalValuation: 0 };
      }
      counts[cat].count += 1;
      counts[cat].totalValuation += p.rawPrice || 0;
    });

    const categoryColors: Record<string, string> = {
      'Dinh Thự Ven Biển': '#18181b',
      'Penthouse Hoàng Gia': '#3f3f46',
      'Sky Villa Đẳng Cấp': '#71717a',
      'Biệt Thự Đồi Thông': '#a1a1aa',
      'Dinh Thự Sinh Thái': '#52525b',
      'Căn Hộ Nghệ Thuật': '#27272a',
    };

    const total = PROPERTIES.length || 1;
    return Object.entries(counts)
      .filter(([, data]) => data.count > 0)
      .map(([name, data]) => ({
        name,
        count: `${data.count} BĐS`,
        valuation: `${data.totalValuation.toLocaleString('vi-VN')} Tỷ`,
        value: Math.round((data.count / total) * 100),
        color: categoryColors[name] || '#18181b',
      }));
  }, []);

  // 3. Tính toán Phân Bổ Theo Vị Trí / Thành Phố (locations.ts + properties.ts)
  const cityDistribution = useMemo(() => {
    const counts: Record<string, { count: number; totalValuation: number }> = {};

    CITIES.forEach((city) => {
      counts[city] = { count: 0, totalValuation: 0 };
    });

    PROPERTIES.forEach((p) => {
      const city = p.city || 'Khác';
      if (!counts[city]) {
        counts[city] = { count: 0, totalValuation: 0 };
      }
      counts[city].count += 1;
      counts[city].totalValuation += p.rawPrice || 0;
    });

    const cityColors = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#52525b', '#27272a', '#d4d4d8', '#09090b'];
    const total = PROPERTIES.length || 1;

    return Object.entries(counts)
      .filter(([, data]) => data.count > 0)
      .map(([name, data], idx) => ({
        name,
        count: `${data.count} BĐS`,
        valuation: `${data.totalValuation.toLocaleString('vi-VN')} Tỷ`,
        value: Math.round((data.count / total) * 100),
        color: cityColors[idx % cityColors.length],
      }));
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header Quản Trị Top Bar */}
      <AdminHeader
        title="Bảng Điều Khiển Tổng Quan"
        subtitle="Hệ thống quản trị và kiểm toán danh mục bất động sản LOISTIQ"
      />

      {/* Nội dung cuộn chính */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 max-w-7xl mx-auto pb-16">
          
          {/* Thanh chọn Tab */}
          <div className="flex items-center">
            <div className="inline-flex h-9 items-center justify-center rounded-lg bg-[#f4f4f5] p-1 text-[#71717a]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-[#09090b] shadow-xs'
                    : 'hover:text-[#09090b]'
                }`}
              >
                Tổng Quan
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-white text-[#09090b] shadow-xs'
                    : 'hover:text-[#09090b]'
                }`}
              >
                Phân Tích
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'reports'
                    ? 'bg-white text-[#09090b] shadow-xs'
                    : 'hover:text-[#09090b]'
                }`}
              >
                Báo Cáo
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-white text-[#09090b] shadow-xs'
                    : 'hover:text-[#09090b]'
                }`}
              >
                Thông Báo
              </button>
            </div>
          </div>

          {/* TAB 1: TỔNG QUAN (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Thẻ Chỉ Số Trọng Yếu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ShadcnMetricCard
                  title="Tổng Định Giá Danh Mục"
                  value={`${totalValuation.toLocaleString('vi-VN')} Tỷ`}
                  subtext="+20.1% so với quý trước"
                  icon={DollarSign}
                />
                <ShadcnMetricCard
                  title="Đăng Ký Bản Tin VIP"
                  value={`+${INITIAL_SUBSCRIBERS.length}`}
                  subtext="+180.1% nhà đầu tư VIP đăng ký"
                  icon={Users}
                />
                <ShadcnMetricCard
                  title="Bất Động Sản Độc Quyền"
                  value={`+${PROPERTIES.length}`}
                  subtext="+19% danh mục bàn giao mới"
                  icon={CreditCard}
                />
                <ShadcnMetricCard
                  title="Hồ Sơ VIP Đang Xử Lý"
                  value={`+${INITIAL_LEADS.length}`}
                  subtext="+3 hồ sơ mới tiếp nhận"
                  icon={Activity}
                />
              </div>

              {/* Lưới chính: Biểu đồ tổng quan + Hồ sơ tư vấn gần đây */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <ShadcnOverviewBarChart />
                <ShadcnRecentSalesCard leads={INITIAL_LEADS} />
              </div>

              {/* Lưới phụ: Cơ cấu danh mục & Nền tảng kiến trúc */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ShadcnAssetDistributionCard
                  categoryDistribution={categoryDistribution}
                  cityDistribution={cityDistribution}
                  totalProperties={PROPERTIES.length}
                />
                <ShadcnDataFoundationCard
                  pillars={PILLARS}
                  architects={ARCHITECTS}
                  materials={MATERIALS}
                  accounts={ADMIN_ACCOUNTS}
                  adminNavItems={ADMIN_NAV_ITEMS}
                />
              </div>
            </div>
          )}

          {/* TAB 2: PHÂN TÍCH (ANALYTICS) */}
          {activeTab === 'analytics' && <ShadcnAnalyticsTab />}

          {/* TAB 3: BÁO CÁO (REPORTS) */}
          {activeTab === 'reports' && <ShadcnReportsTab />}

          {/* TAB 4: THÔNG BÁO (NOTIFICATIONS) */}
          {activeTab === 'notifications' && <ShadcnNotificationsTab />}

        </div>
      </div>
    </div>
  );
}
