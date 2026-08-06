'use client';

import React from 'react';
import { NewsletterSubscriber } from '@/data/adminMock';
import { Mail, Clock, Check, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface AdminSubscribersCardProps {
  subscribers: NewsletterSubscriber[];
}

export default function AdminSubscribersCard({ subscribers }: AdminSubscribersCardProps) {
  const { showToast } = useToast();

  const handleSendReport = () => {
    showToast({
      type: 'info',
      title: 'Bản Tin VIP LOISTIQ',
      description: `Đã sẵn sàng gửi báo cáo thị trường tháng mới đến ${subscribers.length} nhà đầu tư VIP!`,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-base font-bold text-[#121212] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#8c5a1e]" />
            <span>Bản Tin Nhà Đầu Tư VIP</span>
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8c5a1e] border border-[#b8864a]/20">
            {subscribers.length} Đăng Ký
          </span>
        </div>
        <p className="text-xs text-[#737373]">
          Danh sách email nhận thông tin phân tích độc quyền từ adminMock.ts
        </p>
      </div>

      <div className="space-y-3 divide-y divide-black/5">
        {subscribers.map((sub) => (
          <div key={sub.id} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
            <div className="space-y-0.5 min-w-0 pr-2">
              <p className="font-medium text-[#121212] truncate">{sub.email}</p>
              <p className="text-[10px] text-[#737373] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#b8864a]" /> {sub.subscribedAt}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200/60 shrink-0">
              <Check className="w-3 h-3" /> {sub.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-black/5">
        <button
          onClick={handleSendReport}
          className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#121212] hover:text-white border border-black/8 text-[#121212] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 text-[#8c5a1e]" />
          <span>Gửi Báo Cáo Thị Trường VIP</span>
        </button>
      </div>
    </div>
  );
}
