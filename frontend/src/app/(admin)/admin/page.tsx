'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import { PROPERTIES } from '@/data/properties';
import { INITIAL_LEADS, INITIAL_ACTIVITIES, VIPLead } from '@/data/adminMock';
import { useToast } from '@/context/ToastContext';
import { useIsMounted } from '@/hooks/useIsMounted';
import {
  ArrowUpRight,
  Sparkles,
  Phone,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldCheck,
  Search,
  Flame,
  Layers,
  Activity,
  ExternalLink,
  ChevronRight,
  Check,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Dữ liệu biểu đồ tăng trưởng & tương tác khách hàng VIP theo tháng
const REVENUE_ANALYTICS_DATA = [
  { month: 'T2', views: 1420, inquiries: 18, deals: 320 },
  { month: 'T3', views: 1890, inquiries: 24, deals: 450 },
  { month: 'T4', views: 2450, inquiries: 32, deals: 580 },
  { month: 'T5', views: 2200, inquiries: 28, deals: 520 },
  { month: 'T6', views: 3100, inquiries: 45, deals: 780 },
  { month: 'T7', views: 3680, inquiries: 54, deals: 940 },
  { month: 'T8', views: 4250, inquiries: 68, deals: 1180 },
];

// Phân bổ danh mục bất động sản cao cấp
const CATEGORY_DISTRIBUTION = [
  { name: 'Dinh Thự Ven Biển', value: 42, color: '#b8864a', count: '4 Dinh Thự', valuation: '780 Tỷ' },
  { name: 'Penthouse Hoàng Gia', value: 28, color: '#1f1f1f', count: '3 Căn Hộ', valuation: '520 Tỷ' },
  { name: 'Sky Villa Nghỉ Dưỡng', value: 18, color: '#8c5a1e', count: '2 Căn Hộ', valuation: '360 Tỷ' },
  { name: 'Biệt Thự Đồi Thông', value: 12, color: '#d4af37', count: '1 Dinh Thự', valuation: '190 Tỷ' },
];

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<VIPLead[]>(INITIAL_LEADS);
  const [chartMetric, setChartMetric] = useState<'inquiries' | 'views' | 'deals'>('inquiries');
  const [leadTab, setLeadTab] = useState<'Tất cả' | 'Mới tiếp nhận' | 'Đã hẹn ngày xem' | 'Thành công'>('Tất cả');
  const [leadSearch, setLeadSearch] = useState('');
  const isMounted = useIsMounted();

  const { showToast } = useToast();

  const handleUpdateStatus = (id: string, nextStatus: VIPLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead))
    );
    showToast({
      type: 'success',
      title: 'Đã cập nhật trạng thái!',
      description: `Yêu cầu của khách hàng đã chuyển sang: "${nextStatus}"`,
    });
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchTab = leadTab === 'Tất cả' || lead.status === leadTab;
      const q = leadSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q)) ||
        lead.categoryInterest.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [leads, leadTab, leadSearch]);

  // Bất động sản nổi bật (featured showcase)
  const featuredProperty = PROPERTIES[0];

  return (
    <div className="flex flex-col h-full">
      {/* Header Quản Trị - Cố định phía trên */}
      <AdminHeader
        title="Bảng Điều Khiển Tổng Quan"
        subtitle="Hệ thống điều hành danh mục bất động sản siêu sang & khách hàng VIP LOISTIQ"
      />

      {/* Nội dung cuộn */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-16">

        {/* 2. Key Performance Indicators (KPIs)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AdminStatCard
            title="Tổng Giá Trị Danh Mục"
            value="1,850+ Tỷ"
            subtext="10 Dinh thự độc quyền"
            change="+12.4% quý này"
            isPositive={true}
            icon={Coins}
          />
          <AdminStatCard
            title="Khách Hàng VIP Đang Xử Lý"
            value={`${pendingLeads.length} Yêu Cầu`}
            subtext="Cần phản hồi trong 15p"
            change="3 Mới tiếp nhận"
            isPositive={true}
            icon={Users}
          />
          <AdminStatCard
            title="Lịch Hẹn Private Tour"
            value="18 Lượt"
            subtext="Tỷ lệ xác nhận 94%"
            change="+28.5% so với T7"
            isPositive={true}
            icon={CalendarCheck}
          />
          <AdminStatCard
            title="Tỷ Lệ Chốt Giao Dịch"
            value="24.8%"
            subtext="Chu kỳ đàm phán: 21 ngày"
            change="+4.2% mục tiêu"
            isPositive={true}
            icon={Award}
          />
        </div> */}

        {/* 3. Visual Analytics: Growth Trend Area Chart + Asset Distribution Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Chart (2 cols): Xu hướng tương tác & quan tâm */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
                      Xu Hướng Quan Tâm & Yêu Cầu VIP
                    </h3>
                    <p className="text-xs text-[#737373]">
                      Theo dõi lưu lượng tương tác tour 3D & số lượt đăng ký tư vấn kín
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric Selector Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF7F2] border border-black/5 self-start sm:self-auto">
                <button
                  onClick={() => setChartMetric('inquiries')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartMetric === 'inquiries'
                      ? 'bg-[#121212] text-white shadow-2xs'
                      : 'text-[#5c5c5c] hover:text-[#121212]'
                  }`}
                >
                  Yêu Cầu VIP
                </button>
                <button
                  onClick={() => setChartMetric('views')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartMetric === 'views'
                      ? 'bg-[#121212] text-white shadow-2xs'
                      : 'text-[#5c5c5c] hover:text-[#121212]'
                  }`}
                >
                  Lượt Xem 3D
                </button>
                <button
                  onClick={() => setChartMetric('deals')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    chartMetric === 'deals'
                      ? 'bg-[#121212] text-white shadow-2xs'
                      : 'text-[#5c5c5c] hover:text-[#121212]'
                  }`}
                >
                  Quy Mô (Tỷ VNĐ)
                </button>
              </div>
            </div>

            {/* Recharts Area Container */}
            <div className="h-64 sm:h-72 w-full pt-2">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={REVENUE_ANALYTICS_DATA}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b8864a" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#b8864a" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#121212" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#121212" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeOpacity={0.05} vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={{ stroke: '#000000', strokeOpacity: 0.1 }}
                      tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#737373', fontSize: 11 }}
                      tickFormatter={(val) => (chartMetric === 'deals' ? `${val}T` : `${val}`)}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#121212] text-white p-3 rounded-xl shadow-xl border border-[#b8864a]/40 text-xs space-y-1.5">
                              <p className="font-bold text-[#f5d59f] border-b border-white/10 pb-1">
                                Tháng {label} - Chi tiết hiệu suất
                              </p>
                              <div className="space-y-1 text-white/80">
                                <p className="flex justify-between gap-4">
                                  <span>Yêu Cầu VIP:</span>
                                  <strong className="text-white font-semibold">{data.inquiries} khách</strong>
                                </p>
                                <p className="flex justify-between gap-4">
                                  <span>Lượt xem 3D:</span>
                                  <strong className="text-white font-semibold">{data.views} lượt</strong>
                                </p>
                                <p className="flex justify-between gap-4">
                                  <span>Ước tính deal:</span>
                                  <strong className="text-[#f5d59f] font-semibold">{data.deals} Tỷ VNĐ</strong>
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={chartMetric}
                      stroke="#b8864a"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#goldGradient)"
                      activeDot={{ r: 6, fill: '#b8864a', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2]/50 rounded-2xl">
                  <div className="w-6 h-6 border-2 border-[#b8864a] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Bottom Summary Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-black/5 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#737373] font-bold">
                  Tháng Cao Điểm
                </span>
                <p className="font-bold text-[#121212]">Tháng 8 (68 Khách VIP)</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#737373] font-bold">
                  Tăng Trưởng TB
                </span>
                <p className="font-bold text-emerald-700">+18.4% / Tháng</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#737373] font-bold">
                  Tương Tác 3D
                </span>
                <p className="font-bold text-[#8c5a1e]">4,250+ Lượt Xem</p>
              </div>
            </div>
          </div>

          {/* Right Chart (1 col): Phân bổ loại hình danh mục */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#121212]">Cơ Cấu Danh Mục</h3>
                  <p className="text-xs text-[#737373]">Phân bổ theo loại hình tài sản</p>
                </div>
              </div>
            </div>

            {/* Donut Chart with Recharts */}
            <div className="h-44 w-full relative flex items-center justify-center">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {CATEGORY_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}% thị phần`, name]}
                      contentStyle={{
                        backgroundColor: '#121212',
                        borderColor: '#b8864a',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '11px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : null}

              {/* Center text of Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#121212]">{PROPERTIES.length}</span>
                <span className="text-[10px] font-semibold text-[#8c5a1e] uppercase tracking-wider">
                  Dinh Thự
                </span>
              </div>
            </div>

            {/* Category breakdown list */}
            <div className="space-y-2.5 pt-2 border-t border-black/5">
              {CATEGORY_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#333333] font-medium truncate max-w-35">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-[#737373] text-[11px]">{item.valuation}</span>
                    <span className="text-[#121212]">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Interactive VIP Inquiries & Action Management Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left (2 cols): Bảng Yêu Cầu Khách Hàng VIP Tương Tác */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-5">
            {/* Header with Title & All link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#121212] flex items-center gap-2.5">
                  <span>Quản Lý Tư Vấn</span>
                  <span className="font-sans text-[10px] px-2.5 py-0.5 rounded-full bg-[#b8864a]/15 text-[#8c5a1e] font-bold border border-[#b8864a]/30">
                    {leads.length} Khách Hàng
                  </span>
                </h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Xử lý trực tiếp và chuyển đổi trạng thái hồ sơ tư vấn 1-1
                </p>
              </div>

              <Link
                href="/admin/contacts"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c5a1e] hover:text-[#121212] transition-colors self-start sm:self-auto"
              >
                <span>Xem toàn bộ hồ sơ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {(['Tất cả', 'Mới tiếp nhận', 'Đã hẹn ngày xem', 'Thành công'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLeadTab(tab)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      leadTab === tab
                        ? 'bg-[#121212] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#5c5c5c] hover:bg-black/5 hover:text-[#121212]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm khách hàng / BĐS..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F2] border border-black/8 rounded-xl text-xs text-[#121212] placeholder-[#a0a0a0] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-black/8 text-[#737373] font-semibold">
                    <th className="pb-3 pr-4">Khách Hàng VIP</th>
                    <th className="pb-3 px-4">Dự Án Quan Tâm</th>
                    <th className="pb-3 px-4">Ngân Sách</th>
                    <th className="pb-3 px-4">Trạng Thái</th>
                    <th className="pb-3 pl-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF7F2]/60 transition-colors group">
                      {/* Name & Contact */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#b8864a]/15 text-[#8c5a1e] font-bold text-xs flex items-center justify-center border border-[#b8864a]/30 shrink-0">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#121212] group-hover:text-[#8c5a1e] transition-colors">
                              {lead.name}
                            </div>
                            <div className="text-[11px] text-[#737373] flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#b8864a]" /> {lead.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Property or Category */}
                      <td className="py-3.5 px-4">
                        <div className="text-[#2d2d2d] font-medium max-w-45 truncate">
                          {lead.propertyTitle || lead.categoryInterest}
                        </div>
                        <div className="text-[10px] text-[#737373] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{lead.createdAt}</span>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#8c5a1e] font-bold text-[11px] border border-[#b8864a]/20">
                          {lead.budget}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            lead.status === 'Mới tiếp nhận'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                              : lead.status === 'Đã hẹn ngày xem'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200/80'
                              : lead.status === 'Thành công'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              lead.status === 'Mới tiếp nhận'
                                ? 'bg-amber-500'
                                : lead.status === 'Đã hẹn ngày xem'
                                ? 'bg-blue-500'
                                : lead.status === 'Thành công'
                                ? 'bg-emerald-500'
                                : 'bg-stone-400'
                            }`}
                          />
                          {lead.status}
                        </span>
                      </td>

                      {/* Quick Action Button */}
                      <td className="py-3.5 pl-4 text-right">
                        {lead.status === 'Mới tiếp nhận' ? (
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'Đã hẹn ngày xem')}
                            className="px-3 py-1.5 rounded-xl bg-[#121212] text-white hover:bg-[#b8864a] text-[11px] font-semibold transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                          >
                            <span>Hẹn Xem Nhà</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : lead.status === 'Đã hẹn ngày xem' ? (
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'Thành công')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Chốt Thành Công</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn tất
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-8 text-[#737373] text-xs">
                  Không tìm thấy khách hàng nào phù hợp với bộ lọc.
                </div>
              )}
            </div>
          </div>

          {/* Right (1 col): Featured Property Showcase & Operational Timeline */}
          <div className="space-y-6">
            {/* Featured Showcase Card */}
            {featuredProperty && (
              <div className="group relative overflow-hidden bg-white rounded-3xl border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8c5a1e] bg-[#b8864a]/10 px-2.5 py-1 rounded-full">
                    <Flame className="w-3 h-3 text-[#b8864a]" />
                    Dinh Thự Nổi Bật Nhất
                  </span>
                  <Link
                    href={`/properties/${featuredProperty.slug}`}
                    target="_blank"
                    className="text-[#737373] hover:text-[#121212] transition-colors p-1"
                    title="Xem trên web"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <div className="relative h-36 w-full rounded-2xl overflow-hidden">
                  <Image
                    src={featuredProperty.heroImage}
                    alt={featuredProperty.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <p className="text-xs font-bold leading-tight line-clamp-1">
                        {featuredProperty.title}
                      </p>
                      <p className="text-[10px] text-white/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#f5d59f]" /> {featuredProperty.location}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-[#f5d59f] shrink-0">
                      {featuredProperty.price}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <Link
                    href={`/admin/properties?edit=${featuredProperty.id}`}
                    className="py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-black/5 text-[#121212] font-semibold text-center transition-colors"
                  >
                    Chỉnh Sửa BĐS
                  </Link>
                  <Link
                    href="/admin/properties"
                    className="py-2 px-3 rounded-xl bg-[#121212] hover:bg-[#b8864a] text-white font-semibold text-center transition-colors"
                  >
                    Toàn Bộ Danh Mục
                  </Link>
                </div>
              </div>
            )}

            {/* Live Operational Activity Log */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-[#121212] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#8c5a1e]" />
                  <span>Nhật Ký Vận Hành Mới</span>
                </h3>
                <span className="text-[10px] text-[#737373]">Thời gian thực</span>
              </div>

              <div className="space-y-3.5">
                {INITIAL_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        act.type === 'lead'
                          ? 'bg-[#b8864a]'
                          : act.type === 'property'
                          ? 'bg-[#121212]'
                          : 'bg-emerald-600'
                      }`}
                    />
                    <div className="space-y-0.5 flex-1">
                      <p className="text-[#333333] leading-snug">
                        <strong className="text-[#121212]">{act.user}</strong> {act.action}{' '}
                        <span className="text-[#8c5a1e] font-semibold">{act.target}</span>
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-[#737373]">
                        <Clock className="w-3 h-3" />
                        <span>{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Health & Security Compliance Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-black/6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#b8864a]/20 flex items-center justify-center text-[#8c5a1e] shadow-2xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                Thời Gian Phản Hồi VIP
              </p>
              <p className="text-sm font-extrabold text-[#121212]">
                ~ 12 Phút <span className="text-[11px] font-semibold text-emerald-700">(Đạt chuẩn 5★)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#b8864a]/20 flex items-center justify-center text-[#8c5a1e] shadow-2xs shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                Chỉ Số Hài Lòng (CSAT)
              </p>
              <p className="text-sm font-extrabold text-[#121212]">
                99.2% <span className="text-[11px] font-semibold text-[#8c5a1e]">(Hồ sơ riêng biệt)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#b8864a]/20 flex items-center justify-center text-[#8c5a1e] shadow-2xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                Bảo Mật Thông Tin NDA
              </p>
              <p className="text-sm font-extrabold text-[#121212]">
                100% Tuân Thủ <span className="text-[11px] font-semibold text-emerald-700">(Mã hóa 3 lớp)</span>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
