'use client';

import React, { useState, useMemo } from 'react';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import { INITIAL_LEADS, VIPLead } from '@/data/adminMock';
import { useToast } from '@/context/ToastContext';
import {
  Users,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Clock,
} from 'lucide-react';

const STATUS_TABS: Array<'Tất cả' | VIPLead['status']> = [
  'Tất cả',
  'Mới tiếp nhận',
  'Đã liên hệ',
  'Đã hẹn ngày xem',
  'Thành công',
  'Đã hủy',
];

export default function AdminContactsPage() {
  const [leads, setLeads] = useState<VIPLead[]>(INITIAL_LEADS);
  const [activeTab, setActiveTab] = useState<'Tất cả' | VIPLead['status']>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchTab = activeTab === 'Tất cả' || lead.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q));

      return matchTab && matchSearch;
    });
  }, [leads, activeTab, searchQuery]);

  const handleStatusChange = (id: string, newStatus: VIPLead['status']) => {
    setLeads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast({
      type: 'success',
      title: 'Đã cập nhật trạng thái khách hàng!',
      description: `Khách hàng đã chuyển sang trạng thái: "${newStatus}"`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Quản Lý Tư Vấn"
        subtitle="Quản lý khách hàng danh giá đăng ký tham quan và tư vấn riêng tư"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 pb-12">
        {/* Status Tabs & Search */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-black/5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {STATUS_TABS.map((tab) => {
              const count =
                tab === 'Tất cả'
                  ? leads.length
                  : leads.filter((l) => l.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5c5c5c] hover:bg-[#EFECE5]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === tab
                        ? 'bg-white/20 text-white'
                        : 'bg-black/5 text-[#7a7a7a]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, SĐT, email..."
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 pl-9 pr-4 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Lead Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl border border-black/5 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              {/* Header: Customer Name & Status Dropdown */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#121212]">
                      {lead.name}
                    </h3>
                  </div>
                  <div className="text-[11px] text-[#7a7a7a] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#b8864a]" />
                    <span>Gửi lúc: {lead.createdAt}</span>
                  </div>
                </div>

                {/* Status Dropdown */}
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(lead.id, e.target.value as VIPLead['status'])
                  }
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border border-black/10 focus:outline-none cursor-pointer ${
                    lead.status === 'Mới tiếp nhận'
                      ? 'bg-amber-100 text-amber-800'
                      : lead.status === 'Đã hẹn ngày xem'
                      ? 'bg-blue-100 text-blue-800'
                      : lead.status === 'Thành công'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <option value="Mới tiếp nhận">Mới tiếp nhận</option>
                  <option value="Đã liên hệ">Đã liên hệ</option>
                  <option value="Đã hẹn ngày xem">Đã hẹn ngày xem</option>
                  <option value="Thành công">Thành công</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>

              {/* Details */}
              <div className="space-y-2.5 text-xs text-[#333333]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-[#5c5c5c]">
                    <Phone className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                    <span className="font-semibold text-[#121212]">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5c5c5c] truncate">
                    <Mail className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#b8864a]/15 space-y-1">
                  <div className="text-[11px] text-[#7a7a7a]">Dự án quan tâm:</div>
                  <div className="font-semibold text-[#8c5a1e]">
                    {lead.propertyTitle || lead.categoryInterest}
                  </div>
                  <div className="text-[11px] text-[#5c5c5c]">
                    Ngân sách: <strong>{lead.budget}</strong>
                  </div>
                </div>

                {lead.message && (
                  <div className="p-3 rounded-2xl bg-[#F8F7F3] border border-black/5 text-xs text-[#5c5c5c] flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#b8864a] shrink-0 mt-0.5" />
                    <p className="italic leading-relaxed">{lead.message}</p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] text-white hover:bg-[#b8864a] text-[11px] font-semibold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Gọi VIP</span>
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/15 text-[#333333] hover:bg-black/5 text-[11px] font-semibold transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Gửi Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="py-16 text-center text-xs text-[#7a7a7a] space-y-2 bg-white rounded-3xl border border-black/5">
            <Users className="w-8 h-8 mx-auto text-[#b8864a]/50" />
            <p>Không có yêu cầu tư vấn nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
