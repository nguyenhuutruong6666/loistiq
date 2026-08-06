'use client';

import React from 'react';
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
import ShadcnMetricCard from './ShadcnMetricCard';
import { Eye, Users, Compass, Clock } from 'lucide-react';

const WEEKLY_TRAFFIC_DATA = [
  { day: 'Thứ 2', visitors: 780, clicks: 560 },
  { day: 'Thứ 3', visitors: 740, clicks: 520 },
  { day: 'Thứ 4', visitors: 390, clicks: 230 },
  { day: 'Thứ 5', visitors: 820, clicks: 590 },
  { day: 'Thứ 6', visitors: 310, clicks: 190 },
  { day: 'Thứ 7', visitors: 580, clicks: 380 },
  { day: 'Chủ Nhật', visitors: 990, clicks: 680 },
];

export default function ShadcnAnalyticsTab() {
  const isMounted = useIsMounted();

  return (
    <div className="space-y-6">
      {/* 4 Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ShadcnMetricCard
          title="Tổng Lượt Truy Cập 3D"
          value="4,250+"
          subtext="+24.5% so với tuần trước"
          icon={Eye}
        />
        <ShadcnMetricCard
          title="Khách Hàng VIP Định Danh"
          value="1,890"
          subtext="+12.3% tài khoản xác thực"
          icon={Users}
        />
        <ShadcnMetricCard
          title="Phiên Khảo Sát VR Tour"
          value="850"
          subtext="89% hoàn tất tour toàn cảnh"
          icon={Compass}
        />
        <ShadcnMetricCard
          title="Thời Gian Lưu Lại TB"
          value="6m 45s"
          subtext="+1m 12s so với chuẩn ngành"
          icon={Clock}
        />
      </div>

      {/* Traffic Overview Chart */}
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs">
        <div className="space-y-1 pb-4">
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Tổng Quan Lượng Truy Cập
          </h3>
          <p className="text-sm text-[#71717a]">
            Lượt tương tác và khách truy cập độc quyền theo tuần trên toàn hệ thống LOISTIQ
          </p>
        </div>

        <div className="h-87.5 w-full pt-4">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-black/10 bg-[#09090b] text-white p-2.5 shadow-md text-xs space-y-1">
                          <p className="font-semibold text-[#f4f4f5]">{label}</p>
                          <p className="text-white/80">
                            Khách truy cập: <strong className="text-white">{data.visitors} lượt</strong>
                          </p>
                          <p className="text-white/80">
                            Lượt tương tác 3D: <strong className="text-white">{data.clicks} lượt</strong>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#18181b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#visitorGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#71717a"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#clickGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#f4f4f5]/50 rounded-lg">
              <div className="w-5 h-5 border-2 border-[#18181b] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
