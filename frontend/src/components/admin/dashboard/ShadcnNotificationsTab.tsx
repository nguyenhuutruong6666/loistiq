'use client';

import React from 'react';
import { INITIAL_ACTIVITIES } from '@/data/adminMock';
import { Bell, CheckCheck, Clock, ShieldCheck, Mail, Building2, User } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ShadcnNotificationsTab() {
  const { showToast } = useToast();

  const handleMarkAllRead = () => {
    showToast({
      type: 'info',
      title: 'Thông báo',
      description: 'Đã đánh dấu toàn bộ thông báo là đã đọc.',
    });
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'lead':
        return 'Tư vấn VIP';
      case 'property':
        return 'Bất động sản';
      case 'newsletter':
        return 'Bản tin đầu tư';
      default:
        return 'Hệ thống';
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Thông Báo Hệ Thống
          </h3>
          <p className="text-sm text-[#71717a]">
            Nhật ký hoạt động và thông báo tức thời từ hệ thống LOISTIQ
          </p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="px-3 py-1.5 rounded-lg border border-black/10 hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Đánh dấu đã đọc</span>
        </button>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs divide-y divide-black/5">
        {INITIAL_ACTIVITIES.map((act) => (
          <div key={act.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#09090b] shrink-0">
              {act.type === 'lead' ? (
                <User className="w-4 h-4" />
              ) : act.type === 'property' ? (
                <Building2 className="w-4 h-4" />
              ) : act.type === 'newsletter' ? (
                <Mail className="w-4 h-4" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-sm text-[#09090b] font-medium leading-tight">
                <strong>{act.user}</strong> {act.action}{' '}
                <span className="text-[#09090b] font-semibold underline">{act.target}</span>
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#71717a]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {act.time}
                </span>
                <span>•</span>
                <span>{getEventTypeName(act.type)}</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
          </div>
        ))}

        <div className="py-4 last:pb-0 flex items-start gap-4 text-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-sm text-[#09090b] font-medium leading-tight">
              <strong>Hệ thống Bảo mật NDA</strong> đã hoàn tất chu kỳ sao lưu và mã hóa dữ liệu 3 lớp
            </p>
            <p className="text-[11px] text-[#71717a]">12 giờ trước • Xác thực bảo mật định kỳ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
