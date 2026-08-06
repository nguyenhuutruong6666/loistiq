'use client';

import React from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const MONTHLY_OVERVIEW_DATA = [
  { name: 'Thg 1', total: 2800, count: 12 },
  { name: 'Thg 2', total: 2850, count: 14 },
  { name: 'Thg 3', total: 2400, count: 11 },
  { name: 'Thg 4', total: 5400, count: 28 },
  { name: 'Thg 5', total: 4600, count: 22 },
  { name: 'Thg 6', total: 3900, count: 19 },
  { name: 'Thg 7', total: 3500, count: 16 },
  { name: 'Thg 8', total: 4900, count: 25 },
  { name: 'Thg 9', total: 4950, count: 26 },
  { name: 'Thg 10', total: 5200, count: 27 },
  { name: 'Thg 11', total: 2100, count: 9 },
  { name: 'Thg 12', total: 4100, count: 20 },
];

export default function ShadcnOverviewBarChart() {
  const isMounted = useIsMounted();

  return (
    <div className="col-span-1 lg:col-span-4 rounded-xl border border-black/10 bg-white p-6 shadow-xs">
      <div className="flex flex-col space-y-1.5 pb-4">
        <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
          Tổng Quan Doanh Thu & Giao Dịch
        </h3>
        <p className="text-sm text-[#71717a]">
          Tổng quan giá trị giao dịch và lượng tương tác 12 tháng qua
        </p>
      </div>

      <div className="h-87.5 w-full pt-4">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_OVERVIEW_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <XAxis
                dataKey="name"
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
                tickFormatter={(value) => `${value}T`}
              />
              <Tooltip
                cursor={{ fill: '#f4f4f5' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border border-black/10 bg-[#09090b] text-white p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-semibold text-[#f4f4f5]">{label}</p>
                        <p className="text-white/80">
                          Giá trị ước tính: <strong className="text-white">{data.total} Tỷ VNĐ</strong>
                        </p>
                        <p className="text-white/80">
                          Yêu cầu tiếp nhận: <strong className="text-white">{data.count} Khách</strong>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="total"
                fill="#18181b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f4f4f5]/50 rounded-lg">
            <div className="w-5 h-5 border-2 border-[#18181b] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
