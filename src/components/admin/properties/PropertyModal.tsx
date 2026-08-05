'use client';

import React, { useState } from 'react';
import { Property, PropertyCategory, PropertyStatus } from '@/types/property';
import { CATEGORIES } from '@/data/properties';
import { X, Sparkles, Building2 } from 'lucide-react';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Partial<Property>) => void;
  initialData?: Property | null;
}

const STATUS_OPTIONS: PropertyStatus[] = ['Đang mở bán', 'Độc quyền', 'Sắp ra mắt', 'Đã bàn giao'];

const DEFAULT_FORM_DATA: Partial<Property> = {
  title: '',
  subtitle: '',
  category: 'Dinh Thự Ven Biển',
  price: '95 Tỷ VNĐ',
  rawPrice: 95,
  location: 'Bãi Trường, Phú Quốc',
  address: 'Đại lộ Hoàng Hôn, Bãi Trường, TP. Phú Quốc',
  city: 'Phú Quốc',
  status: 'Độc quyền',
  heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
  area: '850 m²',
  bedrooms: 5,
  bathrooms: 6,
  floors: 3,
  yearBuilt: 2026,
};

function PropertyModalForm({
  initialData,
  onClose,
  onSave,
}: {
  initialData?: Property | null;
  onClose: () => void;
  onSave: (property: Partial<Property>) => void;
}) {
  const [formData, setFormData] = useState<Partial<Property>>(() => initialData || DEFAULT_FORM_DATA);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const categories = CATEGORIES.filter((c) => c !== 'Tất cả') as PropertyCategory[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl sm:rounded-4xl shadow-2xl border border-black/10 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-black/5 bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b8864a]/20 text-[#8c5a1e] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#121212]">
                {initialData ? 'Chỉnh Sửa Bất Động Sản' : 'Thêm Bất Động Sản Mới'}
              </h2>
              <p className="text-xs text-[#7a7a7a]">
                Cập nhật thông tin vào hệ thống danh mục độc quyền LOISTIQ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#5c5c5c] hover:text-[#121212] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Tên & Phụ đề */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Tên Dinh Thự / Dự Án *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: The Grand Ocean Mansion"
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Phụ Đề / Mô Tả Ngắn *
              </label>
              <input
                type="text"
                required
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Ví dụ: Tuyệt tác dinh thự mặt biển biệt lập với bến du thuyền riêng"
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>
          </div>

          {/* Danh mục & Trạng thái */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Danh Mục Bất Động Sản *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as PropertyCategory })
                }
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Trạng Thái Niêm Yết *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as PropertyStatus })
                }
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Giá & Thành phố */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Mức Giá Hiển Thị *
              </label>
              <input
                type="text"
                required
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ví dụ: 120 Tỷ VNĐ"
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Thành Phố / Tỉnh Thành *
              </label>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ví dụ: Phú Quốc"
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>
          </div>

          {/* Địa chỉ & Vị trí */}
          <div>
            <label className="block text-xs font-semibold text-[#333333] mb-1">
              Vị Trí Địa Lý / Khu Vực *
            </label>
            <input
              type="text"
              required
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ví dụ: Bãi Trường, Phú Quốc"
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            />
          </div>

          {/* Thông số kỹ thuật */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Diện Tích *
              </label>
              <input
                type="text"
                required
                value={formData.area || ''}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="1,200 m²"
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Phòng Ngủ
              </label>
              <input
                type="number"
                min="1"
                value={formData.bedrooms || 4}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 1 })}
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1">
                Phòng Tắm
              </label>
              <input
                type="number"
                min="1"
                value={formData.bathrooms || 5}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })}
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
              />
            </div>
          </div>

          {/* URL Ảnh Đại Diện */}
          <div>
            <label className="block text-xs font-semibold text-[#333333] mb-1">
              Đường Dẫn Ảnh Bìa (Hero Image URL) *
            </label>
            <input
              type="url"
              required
              value={formData.heroImage || ''}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-black/5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-black/15 text-xs font-semibold text-[#5c5c5c] hover:bg-black/5 transition-colors cursor-pointer"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#121212] text-white hover:bg-[#b8864a] text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{initialData ? 'Lưu Thay Đổi' : 'Tạo Bất Động Sản'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PropertyModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: PropertyModalProps) {
  if (!isOpen) return null;

  return (
    <PropertyModalForm
      key={initialData?.id ?? 'create-new-property'}
      initialData={initialData}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

