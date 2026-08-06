'use client';

import React from 'react';
import Link from 'next/link';
import { AdminNavItem } from '@/data/adminNavigation';
import { NavLink } from '@/data/navigation';
import { FolderTree, ExternalLink } from 'lucide-react';

interface AdminNavigationStructureCardProps {
  adminNavItems: AdminNavItem[];
  clientNavLinks: NavLink[];
  footerCollectionLinks: NavLink[];
}

export default function AdminNavigationStructureCard({
  adminNavItems,
  clientNavLinks,
  footerCollectionLinks,
}: AdminNavigationStructureCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#b8864a]/30 flex items-center justify-center text-[#8c5a1e]">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#121212]">Cấu Trúc Điều Hướng</h3>
              <p className="text-xs text-[#737373]">Dữ liệu từ navigation.ts & adminNavigation.ts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Admin Nav */}
        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-black/5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5a1e]">
            Menu Quản Trị ({adminNavItems.length} Mục)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {adminNavItems.map((item) => (
              <span
                key={item.href}
                className="px-2 py-0.5 rounded-md bg-white border border-black/5 text-[11px] font-medium text-[#333]"
              >
                {item.name} {item.badge ? `(${item.badge})` : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Client Nav Links */}
        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-black/5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5a1e]">
            Trang Khách Hàng ({clientNavLinks.length} Liên kết chính)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {clientNavLinks.map((link) => (
              <span
                key={link.href}
                className="px-2 py-0.5 rounded-md bg-white border border-black/5 text-[11px] font-medium text-[#333]"
              >
                {link.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Collections */}
        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-black/5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c5a1e]">
            Bộ Sưu Tập Footer ({footerCollectionLinks.length} Mục)
          </span>
          <p className="text-[11px] text-[#666] line-clamp-1">
            {footerCollectionLinks.map((f) => f.name).join(' • ')}
          </p>
        </div>
      </div>

      <Link
        href="/"
        target="_blank"
        className="py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#121212] hover:text-white border border-black/8 text-[#121212] font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
      >
        <span>Xem Website Khách Hàng</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
