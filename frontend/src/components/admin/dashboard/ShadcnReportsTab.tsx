'use client';

import React from 'react';
import { PROPERTIES } from '@/data/properties';
import { Download, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ShadcnReportsTab() {
  const { showToast } = useToast();

  const handleExport = (format: string) => {
    showToast({
      type: 'success',
      title: 'Đang tải xuống báo cáo...',
      description: `Báo cáo danh mục định giá LOISTIQ (${format}) đã được khởi tạo thành công!`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-base leading-none tracking-tight text-[#09090b]">
            Báo Cáo Thẩm Định & Kiểm Toán Danh Mục
          </h3>
          <p className="text-sm text-[#71717a] mt-1">
            Báo cáo kiểm toán danh mục 30 bất động sản và hồ sơ khách hàng VIP
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-1.5 rounded-lg border border-black/10 hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Xuất CSV</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-white text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Báo Cáo PDF</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-black/10 bg-white overflow-hidden shadow-xs">
        <div className="p-6 pb-4 border-b border-black/5">
          <h4 className="font-semibold text-sm text-[#09090b]">Danh Mục Bất Động Sản Bàn Giao</h4>
          <p className="text-xs text-[#71717a]">Tổng hợp dữ liệu kiểm toán từ properties.ts</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black/10 bg-[#fafafa] text-[#71717a] font-medium">
                <th className="py-3 px-6">Bất Động Sản</th>
                <th className="py-3 px-6">Phân Khúc</th>
                <th className="py-3 px-6">Vị Trí</th>
                <th className="py-3 px-6">Định Giá</th>
                <th className="py-3 px-6">Trạng Thái Pháp Lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {PROPERTIES.slice(0, 8).map((prop) => (
                <tr key={prop.id} className="hover:bg-[#f4f4f5]/50 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-[#09090b]">{prop.title}</td>
                  <td className="py-3.5 px-6 text-[#71717a]">{prop.category}</td>
                  <td className="py-3.5 px-6 text-[#71717a]">{prop.city}</td>
                  <td className="py-3.5 px-6 font-semibold text-[#09090b]">{prop.price}</td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {prop.status || 'Độc quyền'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
