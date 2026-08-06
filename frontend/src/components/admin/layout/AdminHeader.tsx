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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10 px-4 sm:px-8 h-16 flex items-center justify-between gap-4 w-full shrink-0">
      {/* Title & Mobile/Desktop Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8 rounded-lg border border-black/10 hover:bg-[#f4f4f5] text-[#09090b]" />

        <div>
          <h1 className="font-bold text-base sm:text-lg text-[#09090b] leading-tight flex items-center gap-2 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#71717a] hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Tools & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2 rounded-lg bg-white border border-black/10 text-[#09090b] hover:bg-[#f4f4f5] transition-colors relative cursor-pointer"
            aria-label="Thông báo"
          >
            <Bell className="w-4 h-4 text-[#71717a]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#18181b] ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
