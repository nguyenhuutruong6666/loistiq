'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhilosophyPillar, Architect, Material } from '@/data/philosophy';
import { AdminAccountCredential } from '@/data/adminAuth';
import { AdminNavItem } from '@/data/adminNavigation';
import { ShieldCheck } from 'lucide-react';

interface ShadcnDataFoundationCardProps {
  pillars: PhilosophyPillar[];
  architects: Architect[];
  materials: Material[];
  accounts: AdminAccountCredential[];
  adminNavItems: AdminNavItem[];
}

export default function ShadcnDataFoundationCard({
  pillars,
  architects,
  materials,
  accounts,
  adminNavItems,
}: ShadcnDataFoundationCardProps) {
  const [tab, setTab] = useState<'philosophy' | 'accounts' | 'structure'>('philosophy');

  return (
    <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Nền Tảng Dữ Liệu & Kiến Trúc
          </h3>
          <p className="text-sm text-[#71717a]">
            Triết lý kiến trúc, tài khoản quản trị và cấu trúc website
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#f4f4f5] rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setTab('philosophy')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              tab === 'philosophy' ? 'bg-white text-[#09090b] shadow-xs' : 'text-[#71717a]'
            }`}
          >
            Triết Lý ({pillars.length})
          </button>
          <button
            onClick={() => setTab('accounts')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              tab === 'accounts' ? 'bg-white text-[#09090b] shadow-xs' : 'text-[#71717a]'
            }`}
          >
            Quản Trị ({accounts.length})
          </button>
          <button
            onClick={() => setTab('structure')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              tab === 'structure' ? 'bg-white text-[#09090b] shadow-xs' : 'text-[#71717a]'
            }`}
          >
            Cấu Trúc ({adminNavItems.length})
          </button>
        </div>
      </div>

      <div className="pt-2 min-h-55">
        {/* Philosophy Sub-view */}
        {tab === 'philosophy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-[#09090b] block border-b border-black/5 pb-1">
                4 Trụ Cột Triết Lý
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.tag} className="p-2 rounded-lg bg-[#fafafa] border border-black/5 space-y-0.5">
                      <div className="font-medium text-[#09090b] flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#18181b]" />
                        <span className="truncate">{p.title}</span>
                      </div>
                      <p className="text-[11px] text-[#71717a] line-clamp-2">{p.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-[#09090b] block border-b border-black/5 pb-1">
                Kiến Trúc Sư Trưởng
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {architects.map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#fafafa] border border-black/5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image src={a.avatar} alt={a.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#09090b] truncate">{a.name}</p>
                      <p className="text-[10px] text-[#71717a] truncate">{a.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-[#09090b] block border-b border-black/5 pb-1">
                Vật Liệu Tuyển Chọn
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {materials.map((m) => (
                  <div key={m.name} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#fafafa] border border-black/5">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0">
                      <Image src={m.image} alt={m.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#09090b] truncate">{m.name}</p>
                      <p className="text-[10px] text-[#71717a] truncate">{m.origin}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Accounts Sub-view */}
        {tab === 'accounts' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accounts.map((acc) => (
                <div key={acc.email} className="p-3 rounded-lg bg-[#fafafa] border border-black/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image src={acc.user.avatar} alt={acc.user.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#09090b] truncate">{acc.user.name}</p>
                      <p className="text-[11px] text-[#71717a] truncate">{acc.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-black/10 text-[#09090b] shrink-0">
                    {acc.user.role}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-[#09090b] text-white flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Chuẩn Bảo Mật 3 Lớp & Quản Lý Phiên Độc Lập
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">Đang Hoạt Động</span>
            </div>
          </div>
        )}

        {/* Structure Sub-view */}
        {tab === 'structure' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-[#fafafa] border border-black/5 space-y-2">
              <span className="font-semibold text-[#09090b] block">Menu Quản Trị Hệ Thống</span>
              <div className="flex flex-wrap gap-1.5">
                {adminNavItems.map((item) => (
                  <span key={item.href} className="px-2.5 py-1 rounded-md bg-white border border-black/10 text-[#09090b]">
                    {item.name} {item.badge ? `(${item.badge})` : ''}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[#fafafa] border border-black/5 space-y-2">
              <span className="font-semibold text-[#09090b] block">Phân Tuyến Khách Hàng (LOISTIQ Public)</span>
              <p className="text-[#71717a] leading-relaxed">
                Bao gồm Trang Chủ, Bộ Sưu Tập 30 Dinh Thự, Phòng Trải Nghiệm 3D/VR Tour, Triết Lý Kiến Trúc và Cổng Liên Hệ Trực Tuyến.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
