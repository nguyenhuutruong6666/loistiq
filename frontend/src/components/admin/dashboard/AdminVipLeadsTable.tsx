'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VIPLead } from '@/data/adminMock';
import { Phone, Clock, Search, ChevronRight, Check, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface AdminVipLeadsTableProps {
  leads: VIPLead[];
  onUpdateStatus: (id: string, nextStatus: VIPLead['status']) => void;
}

export default function AdminVipLeadsTable({
  leads,
  onUpdateStatus,
}: AdminVipLeadsTableProps) {
  const [leadTab, setLeadTab] = useState<'Tất cả' | 'Mới tiếp nhận' | 'Đã hẹn ngày xem' | 'Thành công'>('Tất cả');
  const [leadSearch, setLeadSearch] = useState('');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchTab = leadTab === 'Tất cả' || lead.status === leadTab;
      const q = leadSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q)) ||
        lead.categoryInterest.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [leads, leadTab, leadSearch]);

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-7 border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#121212] flex items-center gap-2.5">
            <span>Quản Lý Tư Vấn VIP</span>
            <span className="font-sans text-[10px] px-2.5 py-0.5 rounded-full bg-[#b8864a]/15 text-[#8c5a1e] font-bold border border-[#b8864a]/30">
              {leads.length} Hồ Sơ (adminMock.ts)
            </span>
          </h3>
          <p className="text-xs text-[#737373] mt-0.5">
            Xử lý trực tiếp và chuyển đổi trạng thái hồ sơ tư vấn 1-1
          </p>
        </div>

        <Link
          href="/admin/contacts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c5a1e] hover:text-[#121212] transition-colors self-start sm:self-auto"
        >
          <span>Xem toàn bộ hồ sơ</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['Tất cả', 'Mới tiếp nhận', 'Đã hẹn ngày xem', 'Thành công'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setLeadTab(tab)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                leadTab === tab
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#5c5c5c] hover:bg-black/5 hover:text-[#121212]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm khách hàng / BĐS..."
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F2] border border-black/8 rounded-xl text-xs text-[#121212] placeholder-[#a0a0a0] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/8 text-[#737373] font-semibold">
              <th className="pb-3 pr-4">Khách Hàng VIP</th>
              <th className="pb-3 px-4">Dự Án Quan Tâm</th>
              <th className="pb-3 px-4">Ngân Sách</th>
              <th className="pb-3 px-4">Trạng Thái</th>
              <th className="pb-3 pl-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#FAF7F2]/60 transition-colors group">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#b8864a]/15 text-[#8c5a1e] font-bold text-xs flex items-center justify-center border border-[#b8864a]/30 shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#121212] group-hover:text-[#8c5a1e] transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-[#737373] flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#b8864a]" /> {lead.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="text-[#2d2d2d] font-medium max-w-45 truncate">
                    {lead.propertyTitle || lead.categoryInterest}
                  </div>
                  <div className="text-[10px] text-[#737373] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{lead.createdAt}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#8c5a1e] font-bold text-[11px] border border-[#b8864a]/20">
                    {lead.budget}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      lead.status === 'Mới tiếp nhận'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                        : lead.status === 'Đã hẹn ngày xem'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200/80'
                        : lead.status === 'Thành công'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        lead.status === 'Mới tiếp nhận'
                          ? 'bg-amber-500'
                          : lead.status === 'Đã hẹn ngày xem'
                          ? 'bg-blue-500'
                          : lead.status === 'Thành công'
                          ? 'bg-emerald-500'
                          : 'bg-stone-400'
                      }`}
                    />
                    {lead.status}
                  </span>
                </td>

                <td className="py-3.5 pl-4 text-right">
                  {lead.status === 'Mới tiếp nhận' ? (
                    <button
                      onClick={() => onUpdateStatus(lead.id, 'Đã hẹn ngày xem')}
                      className="px-3 py-1.5 rounded-xl bg-[#121212] text-white hover:bg-[#b8864a] text-[11px] font-semibold transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <span>Hẹn Xem Nhà</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : lead.status === 'Đã hẹn ngày xem' ? (
                    <button
                      onClick={() => onUpdateStatus(lead.id, 'Thành công')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Chốt Thành Công</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn tất
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-[#737373] text-xs">
            Không tìm thấy khách hàng nào phù hợp với bộ lọc.
          </div>
        )}
      </div>
    </div>
  );
}
