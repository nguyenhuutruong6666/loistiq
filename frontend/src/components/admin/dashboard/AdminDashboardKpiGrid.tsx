'use client';

import React from 'react';
import AdminStatCard from '@/components/admin/dashboard/AdminStatCard';
import { Coins, Users, MapPin, ShieldCheck } from 'lucide-react';

interface AdminDashboardKpiGridProps {
  totalValuation: number;
  propertyCount: number;
  leadsCount: number;
  pendingLeadsCount: number;
  activeCitiesCount: number;
  totalCitiesCount: number;
  subscribersCount: number;
  adminAccountsCount: number;
}

export default function AdminDashboardKpiGrid({
  totalValuation,
  propertyCount,
  leadsCount,
  pendingLeadsCount,
  activeCitiesCount,
  totalCitiesCount,
  subscribersCount,
  adminAccountsCount,
}: AdminDashboardKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* 1. properties.ts */}
      <AdminStatCard
        title="Tổng Giá Trị Danh Mục"
        value={`${totalValuation.toLocaleString('vi-VN')}+ Tỷ`}
        subtext={`${propertyCount} Bất động sản độc quyền`}
        change="+14.8% quý này"
        isPositive={true}
        icon={Coins}
      />

      {/* 2. adminMock.ts */}
      <AdminStatCard
        title="Hồ Sơ Tư Vấn VIP"
        value={`${leadsCount} Khách Hàng`}
        subtext={`${pendingLeadsCount} Yêu cầu mới tiếp nhận`}
        change="+3 mới tuần này"
        isPositive={true}
        icon={Users}
      />

      {/* 3. locations.ts */}
      <AdminStatCard
        title="Phủ Sóng Địa Bàn"
        value={`${activeCitiesCount} / ${totalCitiesCount} Vùng`}
        subtext="Phú Quốc, TP.HCM, Đà Lạt, Đà Nẵng..."
        change="100% Trọng điểm"
        isPositive={true}
        icon={MapPin}
      />

      {/* 4. adminAuth.ts & adminMock.ts */}
      <AdminStatCard
        title="Bản Tin & Quản Trị"
        value={`${subscribersCount} Đăng Ký VIP`}
        subtext={`${adminAccountsCount} Quản trị viên điều hành`}
        change="100% Bảo mật NDA"
        isPositive={true}
        icon={ShieldCheck}
      />
    </div>
  );
}
