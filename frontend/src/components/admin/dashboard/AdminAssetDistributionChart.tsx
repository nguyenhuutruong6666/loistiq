'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface DistributionItem {
  name: string;
  count: string;
  valuation: string;
  value: number;
  color: string;
}

interface AdminAssetDistributionChartProps {
  categoryDistribution: DistributionItem[];
  cityDistribution: DistributionItem[];
  totalProperties: number;
  categoryCount: number;
  cityCount: number;
}

export default function AdminAssetDistributionChart({
  categoryDistribution,
  cityDistribution,
  totalProperties,
  categoryCount,
  cityCount,
}: AdminAssetDistributionChartProps) {
  const [distributionMode, setDistributionMode] = useState<'category' | 'city'>('category');
  const isMounted = useIsMounted();

  const currentDistributionData = distributionMode === 'category' ? categoryDistribution : cityDistribution;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#121212]">Cơ Cấu Tài Sản</h3>
            <p className="text-xs text-[#737373]">Dữ liệu từ categories.ts & locations.ts</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Theo Loại Hình vs Theo Thành Phố */}
      <div className="flex items-center gap-1 p-1 bg-[#FAF7F2] rounded-xl border border-black/5 text-xs font-semibold">
        <button
          onClick={() => setDistributionMode('category')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
            distributionMode === 'category'
              ? 'bg-[#121212] text-white shadow-2xs'
              : 'text-[#666] hover:text-[#121212]'
          }`}
        >
          Theo Loại Hình ({categoryCount})
        </button>
        <button
          onClick={() => setDistributionMode('city')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
            distributionMode === 'city'
              ? 'bg-[#121212] text-white shadow-2xs'
              : 'text-[#666] hover:text-[#121212]'
          }`}
        >
          Theo Thành Phố ({cityCount})
        </button>
      </div>

      {/* Donut Chart */}
      <div className="h-40 w-full relative flex items-center justify-center">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {currentDistributionData.map((entry, index) => (
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

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-extrabold text-[#121212]">{totalProperties}</span>
          <span className="text-[9px] font-semibold text-[#8c5a1e] uppercase tracking-wider">
            Dinh Thự
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="space-y-1.5 pt-2 border-t border-black/5 max-h-48 overflow-y-auto scrollbar-none">
        {currentDistributionData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs py-0.5">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#333333] font-medium truncate max-w-36">
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
  );
}
