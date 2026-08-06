'use client';

import { Bell } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  title: string;
  subtitle?: string;
}

export default function AdminHeader({
  title,
  subtitle,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F3]/95 backdrop-blur-md border-b border-black/5 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 w-full shrink-0">
      {/* Title & Mobile/Desktop Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div>
          <h1 className="font-serif text-lg sm:text-2xl font-bold text-[#121212] leading-tight flex items-center gap-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#7a7a7a] hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Tools & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Add Button */}
        {/* <Link
          href="/admin/properties?action=new"
          className="hidden sm:inline-flex items-center gap-1.5 bg-[#121212] text-white hover:bg-[#b8864a] px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm BĐS Mới</span>
        </Link> */}

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2.5 rounded-full bg-white border border-black/10 text-[#121212] hover:bg-[#FAF7F2] transition-colors relative cursor-pointer"
            aria-label="Thông báo"
          >
            <Bell className="w-4 h-4 text-[#5c5c5c]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#b8864a] ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
