'use client';

import React, { useState, useMemo } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { INITIAL_SUBSCRIBERS, NewsletterSubscriber } from '@/data/adminMock';
import { useToast } from '@/context/ToastContext';
import {
  Mail,
  Copy,
  Search,
  CheckCircle2,
  Trash2,
  Sparkles,
} from 'lucide-react';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(INITIAL_SUBSCRIBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const q = searchQuery.toLowerCase().trim();
      return !q || sub.email.toLowerCase().includes(q);
    });
  }, [subscribers, searchQuery]);

  const handleCopyAll = () => {
    const emails = subscribers.map((s) => s.email).join(', ');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emails);
      showToast({
        type: 'success',
        title: 'Đã sao chép danh sách Email!',
        description: `Đã lưu ${subscribers.length} email khách hàng vào bộ nhớ tạm.`,
      });
    }
  };

  const handleToggleStatus = (id: string) => {
    setSubscribers((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const nextStatus = sub.status === 'Hoạt động' ? 'Tạm dừng' : 'Hoạt động';
          return { ...sub, status: nextStatus };
        }
        return sub;
      })
    );
    showToast({
      type: 'info',
      title: 'Đã cập nhật trạng thái email',
      description: 'Trạng thái nhận bản tin đã được thay đổi.',
    });
  };

  const handleDelete = (id: string, email: string) => {
    if (confirm(`Quý khách có muốn xóa email "${email}" khỏi danh sách?`)) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      showToast({
        type: 'info',
        title: 'Đã xóa email',
        description: `Email ${email} đã được gỡ khỏi danh sách.`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - Cố định phía trên */}
      <AdminHeader
        title="Bản Tin & Tạp Chí LOISTIQ"
        subtitle={`Quản lý danh sách ${subscribers.length} độc giả thượng lưu đăng ký nhận bản tin`}
      />

      {/* Nội dung cuộn */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 pb-12">
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#8c5a1e] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#7a7a7a]">Tổng Số Độc Giả</div>
                <div className="text-2xl font-extrabold text-[#121212]">{subscribers.length} Độc Giả</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#7a7a7a]">Đang Hoạt Động</div>
                <div className="text-2xl font-extrabold text-[#121212]">
                  {subscribers.filter((s) => s.status === 'Hoạt động').length} Email
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#b8864a]/15 text-[#8c5a1e] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#7a7a7a]">Tỷ Lệ Mở Thư (Open Rate)</div>
                <div className="text-2xl font-extrabold text-[#8c5a1e]">94.6%</div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-black/5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm địa chỉ email..."
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 pl-9 pr-4 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleCopyAll}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#121212] text-white hover:bg-[#b8864a] text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Sao Chép Tất Cả</span>
              </button>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-3xl sm:rounded-4xl border border-black/5 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-black/5 text-[#7a7a7a] font-semibold">
                    <th className="py-3.5 pl-6 pr-4">Địa Chỉ Email</th>
                    <th className="py-3.5 px-4">Ngày Đăng Ký</th>
                    <th className="py-3.5 px-4">Trạng Thái</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                      <td className="py-4 pl-6 pr-4 font-medium text-[#121212]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                          <span>{sub.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#7a7a7a]">{sub.subscribedAt}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(sub.id)}
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            sub.status === 'Hoạt động'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {sub.status}
                        </button>
                      </td>
                      <td className="py-4 pr-6 pl-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(sub.email);
                                showToast({
                                  type: 'success',
                                  title: 'Đã sao chép email',
                                  description: sub.email,
                                });
                              }
                            }}
                            title="Sao chép email"
                            className="p-1.5 rounded-lg border border-black/10 hover:bg-[#FAF7F2] text-[#5c5c5c] hover:text-[#121212] transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id, sub.email)}
                            title="Xóa khỏi danh sách"
                            className="p-1.5 rounded-lg border border-black/10 hover:bg-rose-50 text-[#5c5c5c] hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubscribers.length === 0 && (
              <div className="py-12 text-center text-xs text-[#7a7a7a] space-y-2">
                <Mail className="w-8 h-8 mx-auto text-[#b8864a]/50" />
                <p>Không tìm thấy email nào khớp với từ khóa tìm kiếm.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
