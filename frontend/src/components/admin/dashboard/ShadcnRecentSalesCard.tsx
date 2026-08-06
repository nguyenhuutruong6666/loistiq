'use client';

import React from 'react';
import Link from 'next/link';
import { VIPLead } from '@/data/adminMock';
import { ArrowUpRight } from 'lucide-react';

interface ShadcnRecentSalesCardProps {
  leads: VIPLead[];
}

export default function ShadcnRecentSalesCard({ leads }: ShadcnRecentSalesCardProps) {
  // Helper lấy 2 chữ cái đầu làm initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="col-span-1 lg:col-span-3 rounded-xl border border-black/10 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Hồ Sơ Tư Vấn VIP Mới Nhất
          </h3>
          <p className="text-sm text-[#71717a]">
            Ghi nhận {leads.length} khách hàng VIP quan tâm gần đây
          </p>
        </div>
        <Link
          href="/admin/contacts"
          className="text-xs font-medium text-[#71717a] hover:text-[#09090b] inline-flex items-center gap-1 transition-colors"
        >
          <span>Xem tất cả</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-6 pt-2">
        {leads.slice(0, 5).map((lead) => (
          <div key={lead.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-9 w-9 rounded-full bg-[#f4f4f5] border border-black/5 flex items-center justify-center font-medium text-xs text-[#09090b] shrink-0">
                {getInitials(lead.name)}
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium leading-none text-[#09090b] truncate">
                  {lead.name}
                </p>
                <p className="text-xs text-[#71717a] truncate">{lead.email}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-semibold text-sm text-[#09090b]">
                {lead.budget.includes('Trên') ? '+185 Tỷ' : '+85 Tỷ'}
              </span>
              <p className="text-[11px] text-[#71717a]">{lead.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
