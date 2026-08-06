'use client';

import React, { useState } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface DistributionItem {
  name: string;
  count: string;
  valuation: string;
  value: number;
  color: string;
}

interface ShadcnAssetDistributionCardProps {
  categoryDistribution: DistributionItem[];
  cityDistribution: DistributionItem[];
  totalProperties: number;
}

export default function ShadcnAssetDistributionCard({
  categoryDistribution,
  cityDistribution,
  totalProperties,
}: ShadcnAssetDistributionCardProps) {
  const [mode, setMode] = useState<'category' | 'city'>('category');
  const isMounted = useIsMounted();

  const data = mode === 'category' ? categoryDistribution : cityDistribution;

  return (
    <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Cơ Cấu Danh Mục Tài Sản
          </h3>
          <p className="text-sm text-[#71717a]">
            Tỷ trọng phân bổ theo loại hình và vị trí địa lý
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#f4f4f5] rounded-lg text-xs font-medium">
          <button
            onClick={() => setMode('category')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'category' ? 'bg-white text-[#09090b] shadow-xs' : 'text-[#71717a]'
            }`}
          >
            Loại Hình
          </button>
          <button
            onClick={() => setMode('city')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              mode === 'city' ? 'bg-white text-[#09090b] shadow-xs' : 'text-[#71717a]'
            }`}
          >
            Địa Bàn
          </button>
        </div>
      </div>

      <div className="h-44 w-full relative flex items-center justify-center">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}% thị phần`, name]}
                contentStyle={{
                  backgroundColor: '#09090b',
                  borderColor: '#27272a',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : null}

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-[#09090b]">{totalProperties}</span>
          <span className="text-[10px] font-medium text-[#71717a] uppercase tracking-wider">
            Bất Động Sản
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-black/5 max-h-48 overflow-y-auto scrollbar-none">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs py-0.5">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#09090b] font-medium truncate max-w-40">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[#71717a]">
              <span>{item.valuation}</span>
              <span className="text-[#09090b] font-semibold">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
