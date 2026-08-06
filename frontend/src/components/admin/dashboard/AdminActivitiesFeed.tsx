'use client';

import React from 'react';
import { AdminActivity } from '@/data/adminMock';
import { Activity, Clock } from 'lucide-react';

interface AdminActivitiesFeedProps {
  activities: AdminActivity[];
}

export default function AdminActivitiesFeed({ activities }: AdminActivitiesFeedProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-base font-bold text-[#121212] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#8c5a1e]" />
          <span>Nhật Ký Vận Hành Thời Gian Thực (adminMock.ts)</span>
        </h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Live Stream
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-3 rounded-2xl bg-[#FAF7F2]/70 border border-black/5 flex items-start gap-3 text-xs"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                act.type === 'lead'
                  ? 'bg-[#b8864a]'
                  : act.type === 'property'
                  ? 'bg-[#121212]'
                  : act.type === 'newsletter'
                  ? 'bg-blue-600'
                  : 'bg-emerald-600'
              }`}
            />
            <div className="space-y-0.5 flex-1 min-w-0">
              <p className="text-[#333333] leading-snug">
                <strong className="text-[#121212]">{act.user}</strong> {act.action}{' '}
                <span className="text-[#8c5a1e] font-semibold">{act.target}</span>
              </p>
              <div className="flex items-center gap-1 text-[10px] text-[#737373]">
                <Clock className="w-3 h-3 text-[#8c5a1e]" />
                <span>{act.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
