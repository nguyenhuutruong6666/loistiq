'use client';

import React from 'react';
import Image from 'next/image';
import { AdminAccountCredential } from '@/data/adminAuth';
import { KeyRound, ShieldCheck } from 'lucide-react';

interface AdminAccountsCardProps {
  accounts: AdminAccountCredential[];
}

export default function AdminAccountsCard({ accounts }: AdminAccountsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#121212]">Tài Khoản Quản Trị</h3>
              <p className="text-xs text-[#737373]">Dữ liệu từ adminAuth.ts</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {accounts.length} Tài Khoản
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {accounts.map((acc) => (
          <div
            key={acc.email}
            className="p-3 rounded-2xl bg-[#FAF7F2]/70 border border-black/5 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#b8864a]/30">
                <Image
                  src={acc.user.avatar}
                  alt={acc.user.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#121212] truncate">{acc.user.name}</p>
                <p className="text-[11px] text-[#737373] truncate">{acc.email}</p>
                <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider font-bold text-[#8c5a1e]">
                  {acc.user.role}
                </span>
              </div>
            </div>
            <span className="px-2 py-1 rounded-md bg-white text-emerald-700 text-[10px] font-bold border border-black/5 shrink-0 shadow-2xs">
              Active
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-[#121212] text-white text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[#f5d59f] font-bold flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn Bảo Mật 3 Lớp
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">100% Sẵn sàng</span>
        </div>
        <p className="text-[10px] text-white/70">
          Phiên đăng nhập được quản lý bằng Snapshot Store độc lập và lưu trữ mã hóa an toàn.
        </p>
      </div>
    </div>
  );
}
