'use client';

import React, { useState } from 'react';
import {
  Property,
  PropertyCategory,
  PropertyStatus,
  PropertyFeature,
  PropertyAmenity,
  PropertyFloorPlan,
  PropertyBentoSize,
} from '@/types/property';
import { CATEGORIES } from '@/data/categories';
import { CITIES } from '@/data/locations';
import {
  X,
  Sparkles,
  Building2,
  Image as ImageIcon,
  FileText,
  Layers,
  Sparkle,
  UserCheck,
  Plus,
  Trash2,
  Box,
  Compass,
} from 'lucide-react';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Partial<Property>) => void;
  initialData?: Property | null;
}

const STATUS_OPTIONS: PropertyStatus[] = ['Đang mở bán', 'Độc quyền', 'Sắp ra mắt', 'Đã bàn giao'];

const AVAILABLE_FEATURE_ICONS = [
  'Maximize',
  'Home',
  'Bed',
  'Bath',
  'Compass',
  'ShieldCheck',
  'Flame',
  'Layers',
  'Award',
  'Eye',
  'Key',
  'Anchor',
];

const DEFAULT_ARCHITECT = {
  name: 'KTS. Jean-Luc Moreau',
  role: 'Kiến trúc sư trưởng - Moreau & Associates',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  quote: 'Kiến trúc đỉnh cao là sự hòa quyện tuyệt đối giữa cảnh sắc thiên nhiên và không gian sống thượng lưu.',
};

const DEFAULT_FORM_DATA: Partial<Property> = {
  title: '',
  subtitle: '',
  slug: '',
  category: 'Dinh Thự Ven Biển',
  price: '185 Tỷ VNĐ',
  rawPrice: 185,
  location: 'Bãi Trường, Phú Quốc',
  address: 'Đại lộ Hoàng Hôn, Bãi Trường, Dương Tơ, TP. Phú Quốc',
  city: 'Phú Quốc',
  status: 'Độc quyền',
  heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600',
  galleryImages: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
  ],
  sketchfabModelUrl: 'https://sketchfab.com/models/e30700a3565f41e3bd6c2751eccfe5f5/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2',
  virtualTour360Url: '',
  area: '1,250 m²',
  bedrooms: 6,
  bathrooms: 8,
  floors: 3,
  yearBuilt: 2026,
  description: [
    'Tuyệt tác dinh thự mặt biển độc bản với bến du thuyền riêng và tầm nhìn hoàng hôn panorama 360 độ.',
    'Thiết kế mở giao hòa tuyệt đối với đại dương, toàn bộ nội thất được may đo từ các thương hiệu xa xỉ hàng đầu thế giới.',
  ],
  highlights: [
    'Hồ bơi vô cực nước mặn tràn bờ nối liền đại dương',
    'Bến đỗ du thuyền tư nhân chuẩn quốc tế',
    'Hầm rượu vang nhiệt độ chuẩn lưu trữ 1,500 chai',
    'Rạp chiếu phim tư gia Dolby Atmos chuẩn rạp quốc tế',
  ],
  features: [
    { icon: 'Maximize', label: 'Diện tích khuôn viên', value: '1,250 m²' },
    { icon: 'Home', label: 'Diện tích xây dựng', value: '780 m²' },
    { icon: 'Bed', label: 'Phòng ngủ Master', value: '6 Suites' },
    { icon: 'Bath', label: 'Phòng tắm cao cấp', value: '8 Phòng' },
    { icon: 'Compass', label: 'Hướng phong thủy', value: 'Tây Nam - View Biển' },
    { icon: 'ShieldCheck', label: 'Pháp lý', value: 'Sở hữu lâu dài (Sổ đỏ)' },
  ],
  amenities: [
    { name: 'Bến du thuyền riêng', description: 'Cầu tàu tư nhân đón du thuyền dài tới 60 feet' },
    { name: 'Hồ bơi vô cực 3 tầng', description: 'Nước ấm lọc điện phân muối khoáng thiên nhiên' },
    { name: 'Dịch vụ Butler 24/7', description: 'Đội ngũ quản gia chuyên nghiệp đào tạo theo chuẩn Anh Quốc' },
    { name: 'Bãi đáp trực thăng', description: 'Cách bãi đáp Helipad chỉ 3 phút di chuyển' },
  ],
  floorPlans: [
    {
      name: 'Mặt bằng Tầng Trệt - Đại sảnh & Hồ bơi',
      area: '380 m²',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
      bedrooms: 1,
      bathrooms: 2,
    },
    {
      name: 'Mặt bằng Tầng 2 - Master Suites & Ban công',
      area: '260 m²',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
      bedrooms: 3,
      bathrooms: 3,
    },
  ],
  architect: DEFAULT_ARCHITECT,
  featuredInCarousel: true,
  bentoSize: 'large',
};

type TabType = 'basic' | 'media' | 'content' | 'features' | 'floorplans' | 'architect';

function PropertyModalForm({
  initialData,
  onClose,
  onSave,
}: {
  initialData?: Property | null;
  onClose: () => void;
  onSave: (property: Partial<Property>) => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [formData, setFormData] = useState<Partial<Property>>(() => {
    if (initialData) {
      return {
        ...initialData,
        description: initialData.description || [],
        highlights: initialData.highlights || [],
        features: initialData.features || [],
        amenities: initialData.amenities || [],
        floorPlans: initialData.floorPlans || [],
        galleryImages: initialData.galleryImages || [],
        architect: initialData.architect || DEFAULT_ARCHITECT,
      };
    }
    return DEFAULT_FORM_DATA;
  });

  // Tự sinh slug từ tiêu đề nếu slug rỗng
  const handleTitleChange = (val: string) => {
    const updates: Partial<Property> = { title: val };
    if (!initialData && (!formData.slug || formData.slug.startsWith('loistiq-') || formData.slug === '')) {
      const generatedSlug = 'loistiq-' + val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      updates.slug = generatedSlug;
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handlePriceChange = (val: string) => {
    const match = val.match(/\d+(\.\d+)?/);
    const rawPrice = match ? parseFloat(match[0]) : (formData.rawPrice || 0);
    setFormData((prev) => ({ ...prev, price: val, rawPrice }));
  };

  // Quản lý Gallery Images
  const handleAddGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), ''],
    }));
  };

  const handleUpdateGalleryImage = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.galleryImages || [])];
      updated[index] = val;
      return { ...prev, galleryImages: updated };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index),
    }));
  };

  // Quản lý Descriptions
  const handleAddDescription = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...(prev.description || []), ''],
    }));
  };

  const handleUpdateDescription = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.description || [])];
      updated[index] = val;
      return { ...prev, description: updated };
    });
  };

  const handleRemoveDescription = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      description: (prev.description || []).filter((_, i) => i !== index),
    }));
  };

  // Quản lý Highlights
  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), ''],
    }));
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.highlights || [])];
      updated[index] = val;
      return { ...prev, highlights: updated };
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, i) => i !== index),
    }));
  };

  // Quản lý Features
  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), { icon: 'Maximize', label: '', value: '' }],
    }));
  };

  const handleUpdateFeature = (index: number, key: keyof PropertyFeature, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.features || [])];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, features: updated };
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  // Quản lý Amenities
  const handleAddAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...(prev.amenities || []), { name: '', description: '' }],
    }));
  };

  const handleUpdateAmenity = (index: number, key: keyof PropertyAmenity, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.amenities || [])];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, amenities: updated };
    });
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: (prev.amenities || []).filter((_, i) => i !== index),
    }));
  };

  // Quản lý Floor Plans
  const handleAddFloorPlan = () => {
    setFormData((prev) => ({
      ...prev,
      floorPlans: [
        ...(prev.floorPlans || []),
        {
          name: `Mặt bằng Tầng ${(prev.floorPlans || []).length + 1}`,
          area: '250 m²',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
          bedrooms: 2,
          bathrooms: 2,
        },
      ],
    }));
  };

  const handleUpdateFloorPlan = <K extends keyof PropertyFloorPlan>(
    index: number,
    key: K,
    val: PropertyFloorPlan[K]
  ) => {
    setFormData((prev) => {
      const updated = [...(prev.floorPlans || [])];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, floorPlans: updated };
    });
  };

  const handleRemoveFloorPlan = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      floorPlans: (prev.floorPlans || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const categories = CATEGORIES.filter((c) => c !== 'Tất cả') as PropertyCategory[];
  const cities = CITIES.filter((c) => c !== 'Tất cả vị trí');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FCFAF6] w-full max-w-4xl rounded-3xl sm:rounded-4xl shadow-2xl border border-[#b8864a]/20 overflow-hidden my-6 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 bg-[#F5EFE6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b8864a] text-white flex items-center justify-center shadow-md shadow-[#b8864a]/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1a1816]">
                  {initialData ? 'Chỉnh Sửa Dinh Thự Độc Bản' : 'Khởi Tạo Bất Động Sản Hạng Sang'}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#b8864a]/15 text-[#8c5a1e] rounded-full border border-[#b8864a]/30">
                  LOISTIQ Elite
                </span>
              </div>
              <p className="text-xs text-[#70685c] mt-0.5">
                Cập nhật đầy đủ thông số kiến trúc, mô hình 3D, mặt bằng và trải nghiệm thực tế ảo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#70685c] hover:text-[#1a1816] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-black/5 bg-white flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none py-2">
          {[
            { id: 'basic', label: 'Thông Tin Cơ Bản', icon: Building2 },
            { id: 'media', label: 'Hình Ảnh & 3D/VR', icon: ImageIcon },
            { id: 'content', label: 'Mô Tả & Điểm Nhấn', icon: FileText },
            { id: 'features', label: 'Thông Số & Tiện Ích', icon: Layers },
            { id: 'floorplans', label: 'Bản Vẽ Mặt Bằng', icon: Sparkle },
            { id: 'architect', label: 'Kiến Trúc Sư', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1a1816] text-[#FAF7F2] shadow-sm'
                    : 'text-[#666] hover:text-[#1a1816] hover:bg-[#F5EFE6]/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#b8864a]' : 'text-[#888]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: THÔNG TIN CƠ BẢN */}
          {activeTab === 'basic' && (
            <div className="space-y-5 animate-in fade-in-50 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Tên Dinh Thự / Biệt Thự / Penthouse *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Ví dụ: The Grand Ocean Sanctuary"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:ring-2 focus:ring-[#b8864a]/20 transition-all font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Phụ Đề / Mô Tả Ngắn Tinh Tế *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Ví dụ: Dinh thự mặt biển với bến du thuyền riêng & hồ bơi vô cực chân mây"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:ring-2 focus:ring-[#b8864a]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Slug Định Danh SEO (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="loistiq-grand-ocean-villa"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#666] font-mono focus:outline-none focus:border-[#b8864a]"
                  />
                  <p className="text-[10px] text-[#888] mt-1">Đường dẫn: /properties/{formData.slug || 'slug-dinh-thu'}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Danh Mục Bất Động Sản *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as PropertyCategory })
                    }
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Mức Giá Hiển Thị (Tiền Tỷ / Triệu Đô) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price || ''}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="185 Tỷ VNĐ"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] font-semibold focus:outline-none focus:border-[#b8864a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Trạng Thái Niêm Yết *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as PropertyStatus })
                    }
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Tỉnh / Thành Phố *
                  </label>
                  <select
                    value={formData.city || 'Phú Quốc'}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Vị Trí Rút Gọn (Ví dụ: Bãi Trường, Phú Quốc) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bãi Trường, Phú Quốc"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#333] mb-1.5">
                    Địa Chỉ Chi Tiết *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Đại lộ Hoàng Hôn, Bãi Trường, Dương Tơ, TP. Phú Quốc"
                    className="w-full bg-white border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:col-span-2 bg-[#F3ECE0]/50 p-4 rounded-2xl border border-black/5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">
                      Diện Tích *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area || ''}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="1,250 m²"
                      className="w-full bg-white border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">
                      Phòng Ngủ
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bedrooms ?? 4}
                      onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">
                      Phòng Tắm
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bathrooms ?? 5}
                      onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">
                      Số Tầng
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.floors ?? 3}
                      onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) || 1 })}
                      className="w-full bg-white border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#555] mb-1">
                      Năm Hoàn Thiện
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2100"
                      value={formData.yearBuilt ?? 2026}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) || 2026 })}
                      className="w-full bg-white border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:col-span-2 items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-black/5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featuredInCarousel"
                      checked={formData.featuredInCarousel ?? false}
                      onChange={(e) => setFormData({ ...formData, featuredInCarousel: e.target.checked })}
                      className="w-4 h-4 text-[#b8864a] rounded focus:ring-[#b8864a] border-gray-300 cursor-pointer"
                    />
                    <label htmlFor="featuredInCarousel" className="text-xs font-semibold text-[#121212] cursor-pointer">
                      Ghim nổi bật trên Vòng Xoay 3D Gallery (Trang chủ)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-[#666]">Kiểu Bento Grid:</label>
                    <select
                      value={formData.bentoSize || 'small'}
                      onChange={(e) =>
                        setFormData({ ...formData, bentoSize: e.target.value as PropertyBentoSize })
                      }
                      className="bg-[#F8F7F3] border border-black/10 rounded-lg py-1 px-2 text-xs font-medium"
                    >
                      <option value="large">Large (Lớn)</option>
                      <option value="wide">Wide (Rộng ngang)</option>
                      <option value="small">Small (Vừa)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HÌNH ẢNH & 3D/VR */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              {/* Hero Image */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-3">
                <label className="block text-xs font-bold text-[#121212]">
                  Ảnh Bìa Chính (Hero Image URL 4K) *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="url"
                    required
                    value={formData.heroImage || ''}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                  />
                  {formData.heroImage && (
                    <div className="w-24 h-16 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-black/10 shadow-xs">
                      <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Bộ Sưu Tập Ảnh Chi Tiết (Gallery Images)</h3>
                    <p className="text-[11px] text-[#777]">Các góc nhìn kiến trúc, nội thất phòng khách, phòng ngủ master</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3 py-1.5 rounded-lg bg-[#b8864a]/15 text-[#8c5a1e] hover:bg-[#b8864a]/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm URL Ảnh</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.galleryImages || []).map((imgUrl, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#F8F7F3] p-2 rounded-xl border border-black/5">
                      <span className="text-[11px] font-mono text-[#888] w-6 text-center">{idx + 1}.</span>
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => handleUpdateGalleryImage(idx, e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-white border border-black/10 rounded-lg py-1.5 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                      />
                      {imgUrl && (
                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-black/10 shrink-0">
                          <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D & VR 360 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
                    <Box className="w-4 h-4 text-[#b8864a]" />
                    <span>Sketchfab 3D Embed URL</span>
                  </div>
                  <p className="text-[10px] text-[#777]">URL nhúng mô hình 3D tương tác Sketchfab (iframe)</p>
                  <input
                    type="url"
                    value={formData.sketchfabModelUrl || ''}
                    onChange={(e) => setFormData({ ...formData, sketchfabModelUrl: e.target.value })}
                    placeholder="https://sketchfab.com/models/.../embed"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] font-mono text-[11px]"
                  />
                </div>

                <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
                    <Compass className="w-4 h-4 text-[#b8864a]" />
                    <span>Virtual Tour 360° URL</span>
                  </div>
                  <p className="text-[10px] text-[#777]">Đường dẫn trải nghiệm thực tế ảo Matterport hoặc Kuula</p>
                  <input
                    type="url"
                    value={formData.virtualTour360Url || ''}
                    onChange={(e) => setFormData({ ...formData, virtualTour360Url: e.target.value })}
                    placeholder="https://my.matterport.com/show/?m=..."
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MÔ TẢ & ĐIỂM NHẤN */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              {/* Descriptions */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Các Đoạn Văn Mô Tả Kiến Trúc & Cảm Hứng</h3>
                    <p className="text-[11px] text-[#777]">Mỗi đoạn văn thể hiện một góc nhìn nghệ thuật về bất động sản</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDescription}
                    className="px-3 py-1.5 rounded-lg bg-[#b8864a]/15 text-[#8c5a1e] hover:bg-[#b8864a]/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Đoạn</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.description || []).map((desc, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#F8F7F3] p-3 rounded-xl border border-black/5">
                      <span className="text-[11px] font-mono text-[#888] pt-2 w-6 text-center">{idx + 1}.</span>
                      <textarea
                        rows={2}
                        value={desc}
                        onChange={(e) => handleUpdateDescription(idx, e.target.value)}
                        placeholder="Nhập nội dung đoạn mô tả..."
                        className="flex-1 bg-white border border-black/10 rounded-xl p-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDescription(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Điểm Nhấn Độc Quyền (Highlights)</h3>
                    <p className="text-[11px] text-[#777]">Danh sách các đặc quyền nổi bật nhất của dinh thự</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3 py-1.5 rounded-lg bg-[#b8864a]/15 text-[#8c5a1e] hover:bg-[#b8864a]/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Điểm Nhấn</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.highlights || []).map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#F8F7F3] p-2 rounded-xl border border-black/5">
                      <div className="w-2 h-2 rounded-full bg-[#b8864a] shrink-0 ml-2" />
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                        placeholder="Ví dụ: Hồ bơi vô cực nước mặn tràn bờ 120 m²..."
                        className="flex-1 bg-white border border-black/10 rounded-lg py-1.5 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THÔNG SỐ & TIỆN ÍCH */}
          {activeTab === 'features' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              {/* Features List */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Thông Số Kỹ Thuật (Features Box)</h3>
                    <p className="text-[11px] text-[#777]">Biểu tượng, nhãn thông số và giá trị cụ thể</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 rounded-lg bg-[#b8864a]/15 text-[#8c5a1e] hover:bg-[#b8864a]/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Thông Số</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.features || []).map((feat, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#F8F7F3] p-2.5 rounded-xl border border-black/5 items-center">
                      <div className="sm:col-span-3">
                        <select
                          value={feat.icon || 'Maximize'}
                          onChange={(e) => handleUpdateFeature(idx, 'icon', e.target.value)}
                          className="w-full bg-white border border-black/10 rounded-lg py-1.5 px-2 text-xs text-[#121212]"
                        >
                          {AVAILABLE_FEATURE_ICONS.map((iconName) => (
                            <option key={iconName} value={iconName}>
                              Icon: {iconName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={feat.label}
                          onChange={(e) => handleUpdateFeature(idx, 'label', e.target.value)}
                          placeholder="Nhãn (Vd: Hướng nhìn)"
                          className="w-full bg-white border border-black/10 rounded-lg py-1.5 px-2.5 text-xs text-[#121212]"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={feat.value}
                          onChange={(e) => handleUpdateFeature(idx, 'value', e.target.value)}
                          placeholder="Giá trị (Vd: Trực diện Biển)"
                          className="w-full bg-white border border-black/10 rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#121212]"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities List */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Đặc Quyền & Tiện Ích Đẳng Cấp (Amenities)</h3>
                    <p className="text-[11px] text-[#777]">Tên dịch vụ tiện ích và mô tả chi tiết quyền lợi</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="px-3 py-1.5 rounded-lg bg-[#b8864a]/15 text-[#8c5a1e] hover:bg-[#b8864a]/25 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Tiện Ích</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.amenities || []).map((amenity, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#F8F7F3] p-3 rounded-xl border border-black/5 items-center">
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={amenity.name}
                          onChange={(e) => handleUpdateAmenity(idx, 'name', e.target.value)}
                          placeholder="Tên tiện ích (Vd: Quản gia Butler 24/7)"
                          className="w-full bg-white border border-black/10 rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#121212]"
                        />
                      </div>

                      <div className="sm:col-span-7">
                        <input
                          type="text"
                          value={amenity.description}
                          onChange={(e) => handleUpdateAmenity(idx, 'description', e.target.value)}
                          placeholder="Mô tả quyền lợi (Vd: Phục vụ theo tiêu chuẩn hoàng gia Anh...)"
                          className="w-full bg-white border border-black/10 rounded-lg py-1.5 px-2.5 text-xs text-[#555]"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BẢN VẼ MẶT BẰNG */}
          {activeTab === 'floorplans' && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#121212]">Sơ Đồ Bản Vẽ Mặt Bằng Từng Tầng (Floor Plans)</h3>
                  <p className="text-[11px] text-[#777]">Bản vẽ phối cảnh bố trí các tầng kèm diện tích và số lượng phòng</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFloorPlan}
                  className="px-3 py-1.5 rounded-lg bg-[#b8864a] text-white hover:bg-[#8c5a1e] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Tầng Mặt Bằng</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.floorPlans || []).map((fp, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-black/5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-black/5 pb-2">
                      <span className="text-xs font-bold text-[#b8864a]">Bản Vẽ Mặt Bằng #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFloorPlan(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa tầng này</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#555] mb-1">Tên Tầng Mặt Bằng</label>
                        <input
                          type="text"
                          value={fp.name}
                          onChange={(e) => handleUpdateFloorPlan(idx, 'name', e.target.value)}
                          placeholder="Mặt bằng Tầng Trệt - Đại sảnh"
                          className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#555] mb-1">Diện Tích Tầng</label>
                        <input
                          type="text"
                          value={fp.area}
                          onChange={(e) => handleUpdateFloorPlan(idx, 'area', e.target.value)}
                          placeholder="380 m²"
                          className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-[#555] mb-1">Đường Dẫn Ảnh Mặt Bằng (URL)</label>
                        <div className="flex gap-3">
                          <input
                            type="url"
                            value={fp.image}
                            onChange={(e) => handleUpdateFloorPlan(idx, 'image', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="flex-1 bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212]"
                          />
                          {fp.image && (
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-black/5 shrink-0 border border-black/10">
                              <img src={fp.image} alt={fp.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:col-span-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#555] mb-1">Số Phòng Ngủ</label>
                          <input
                            type="number"
                            min="0"
                            value={fp.bedrooms ?? 1}
                            onChange={(e) => handleUpdateFloorPlan(idx, 'bedrooms', parseInt(e.target.value) || 0)}
                            className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#555] mb-1">Số Phòng Tắm</label>
                          <input
                            type="number"
                            min="0"
                            value={fp.bathrooms ?? 1}
                            onChange={(e) => handleUpdateFloorPlan(idx, 'bathrooms', parseInt(e.target.value) || 0)}
                            className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: KIẾN TRÚC SƯ */}
          {activeTab === 'architect' && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="bg-white p-6 rounded-2xl border border-black/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#b8864a]/20 text-[#8c5a1e] flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#121212]">Thông Tin Kiến Trúc Sư Trưởng & Triết Lý</h3>
                    <p className="text-[11px] text-[#777]">Tôn vinh người thổi hồn kiến trúc vào từng tuyệt tác độc bản</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Tên Kiến Trúc Sư *</label>
                    <input
                      type="text"
                      required
                      value={formData.architect?.name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architect: { ...(formData.architect || DEFAULT_ARCHITECT), name: e.target.value },
                        })
                      }
                      placeholder="KTS. Jean-Luc Moreau"
                      className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333] mb-1">Chức Vụ / Đơn Vị Thiết Kế *</label>
                    <input
                      type="text"
                      required
                      value={formData.architect?.role || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architect: { ...(formData.architect || DEFAULT_ARCHITECT), role: e.target.value },
                        })
                      }
                      placeholder="Kiến trúc sư trưởng - Moreau & Associates"
                      className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#333] mb-1">URL Ảnh Chân Dung KTS *</label>
                    <div className="flex gap-3">
                      <input
                        type="url"
                        required
                        value={formData.architect?.avatar || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            architect: { ...(formData.architect || DEFAULT_ARCHITECT), avatar: e.target.value },
                          })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                      />
                      {formData.architect?.avatar && (
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-black/10 shrink-0 border border-black/10">
                          <img
                            src={formData.architect.avatar}
                            alt={formData.architect.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#333] mb-1">Triết Lý Thiết Kế / Danh Ngôn *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.architect?.quote || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architect: { ...(formData.architect || DEFAULT_ARCHITECT), quote: e.target.value },
                        })
                      }
                      placeholder="Mỗi mét vuông không gian là một tác phẩm nghệ thuật vị nhân sinh..."
                      className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl p-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-[11px] text-[#888]">
              * Bắt buộc hoàn tất các trường thông tin quan trọng trước khi lưu
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-black/15 text-xs font-semibold text-[#5c5c5c] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#121212] hover:bg-[#b8864a] text-white text-xs font-semibold shadow-lg shadow-black/10 transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b8864a]" />
                <span>{initialData ? 'Lưu Thay Đổi Dinh Thự' : 'Tạo Bất Động Sản'}</span>
              </button>
            </div>
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
