'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ShadcnMetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
}

export default function ShadcnMetricCard({
  title,
  value,
  subtext,
  icon: Icon,
}: ShadcnMetricCardProps) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-[#71717a]">{title}</h3>
        <Icon className="h-4 w-4 text-[#71717a]" />
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-[#09090b]">{value}</div>
        <p className="text-xs text-[#71717a]">{subtext}</p>
      </div>
    </div>
  );
}
