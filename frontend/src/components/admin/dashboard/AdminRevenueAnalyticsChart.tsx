'use client';

import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useIsMounted } from '@/hooks/useIsMounted';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export interface RevenueMetricItem {
  month: string;
  views: number;
  inquiries: number;
  deals: number;
}

const DEFAULT_ANALYTICS_DATA: RevenueMetricItem[] = [
  { month: 'T2', views: 1420, inquiries: 18, deals: 320 },
  { month: 'T3', views: 1890, inquiries: 24, deals: 450 },
  { month: 'T4', views: 2450, inquiries: 32, deals: 580 },
  { month: 'T5', views: 2200, inquiries: 28, deals: 520 },
  { month: 'T6', views: 3100, inquiries: 45, deals: 780 },
  { month: 'T7', views: 3680, inquiries: 54, deals: 940 },
  { month: 'T8', views: 4250, inquiries: 68, deals: 1180 },
];

export default function AdminRevenueAnalyticsChart({
  data = DEFAULT_ANALYTICS_DATA,
}: {
  data?: RevenueMetricItem[];
}) {
  const [chartMetric, setChartMetric] = useState<'inquiries' | 'views' | 'deals'>('inquiries');
  const isMounted = useIsMounted();

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
              Xu Hướng Tương Tác & Giao Dịch
            </h3>
            <p className="text-xs text-[#737373]">
              Lưu lượng khách hàng VIP truy cập 3D Tour và quy mô tài sản đăng ký
            </p>
          </div>
        </div>

        {/* Metric Selector */}
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

      {/* Area Chart */}
      <div className="h-64 sm:h-72 w-full pt-2">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b8864a" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#b8864a" stopOpacity={0.0} />
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
                    const item = payload[0].payload as RevenueMetricItem;
                    return (
                      <div className="bg-[#121212] text-white p-3 rounded-xl shadow-xl border border-[#b8864a]/40 text-xs space-y-1.5">
                        <p className="font-bold text-[#f5d59f] border-b border-white/10 pb-1">
                          Tháng {label} - Chi tiết hiệu suất
                        </p>
                        <div className="space-y-1 text-white/80">
                          <p className="flex justify-between gap-4">
                            <span>Yêu Cầu VIP:</span>
                            <strong className="text-white font-semibold">{item.inquiries} khách</strong>
                          </p>
                          <p className="flex justify-between gap-4">
                            <span>Lượt xem 3D:</span>
                            <strong className="text-white font-semibold">{item.views} lượt</strong>
                          </p>
                          <p className="flex justify-between gap-4">
                            <span>Ước tính deal:</span>
                            <strong className="text-[#f5d59f] font-semibold">{item.deals} Tỷ VNĐ</strong>
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

      {/* Bottom Indicators */}
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
  );
}
