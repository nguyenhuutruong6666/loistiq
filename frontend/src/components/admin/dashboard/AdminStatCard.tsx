'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  accentColor?: string;
}

export default function AdminStatCard({
  title,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl border border-black/8 p-5 sm:p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:border-[#b8864a]/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
      {/* Top subtle ambient glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#b8864a]/5 rounded-full blur-2xl group-hover:bg-[#b8864a]/10 transition-colors duration-500 pointer-events-none" />

      {/* Header: Title & Modern Icon */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">
          {title}
        </span>
        <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/20 flex items-center justify-center text-[#8c5a1e] group-hover:bg-[#8c5a1e] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-2xs shrink-0">
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Middle: Big Stat Value */}
      <div className="space-y-2.5">
        <div className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
          {value}
        </div>

        {/* Footer: Trend badge & context subtext */}
        {(change || subtext) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-black/5">
            {change && (
              <span
                className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md text-[11px] shadow-2xs ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {change}
              </span>
            )}
            {subtext && (
              <span className="text-[11px] font-medium text-[#737373] truncate">
                {subtext}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
