'use client';

import React, { useState } from 'react';
import { Property } from '@/types/property';
import {
  Rotate3d,
  Image as ImageIcon,
  Maximize2,
  BedDouble,
  Bath,
  Compass,
  ShieldCheck,
  Building,
  CircleCheck,
  CheckCircle2,
  CalendarCheck,
  Phone,
  Layers,
  Sparkles,
  Heart,
  Share2,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/context/ToastContext';

interface PropertyDetailClientProps {
  property: Property;
}

/**
 * Component tương tác phía client cho trang chi tiết bất động sản:
 * Chuyển đổi xem Gallery ảnh / Mô hình 3D xoay 360° / Sơ đồ mặt bằng,
 * và form đăng ký lịch tư vấn private 1-1.
 */
export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [viewMode, setViewMode] = useState<'gallery' | '3d' | 'floorplan'>('gallery');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { showToast } = useToast();

  // Trạng thái của Form đặt lịch tư vấn
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    notes: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast({
      type: 'success',
      title: 'Đăng ký tham quan thành công!',
      description: `Quản gia cá nhân của LOISTIQ sẽ liên hệ tới số ${formData.phone} trong vòng 15 phút.`,
    });
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Thanh công cụ chuyển đổi chế độ xem (Hỗ trợ lướt cuộn ngang trên thiết bị di động) */}
      <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-black/5 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
              viewMode === 'gallery'
                ? 'bg-[#121212] text-white shadow-md'
                : 'text-[#5c5c5c] hover:bg-[#F8F7F3] hover:text-[#121212]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Bộ Sưu Tập ({property.galleryImages.length})</span>
          </button>

          {property.sketchfabModelUrl && (
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                viewMode === '3d'
                  ? 'bg-[#8c5a1e] text-white shadow-md'
                  : 'text-[#8c5a1e] bg-[#b8864a]/10 hover:bg-[#b8864a]/20'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Mô Hình 3D 360°</span>
            </button>
          )}

          {property.floorPlans.length > 0 && (
            <button
              onClick={() => setViewMode('floorplan')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                viewMode === 'floorplan'
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'text-[#5c5c5c] hover:bg-[#F8F7F3] hover:text-[#121212]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Mặt Bằng</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 pr-1 shrink-0">
          <button
            onClick={() => {
              const nextState = !isSaved;
              setIsSaved(nextState);
              showToast({
                type: 'info',
                title: nextState ? 'Đã lưu vào danh sách yêu thích' : 'Đã bỏ lưu bất động sản',
                description: property.title,
              });
            }}
            className={`p-2 sm:p-2.5 rounded-xl border border-black/10 transition-colors cursor-pointer ${
              isSaved ? 'text-red-500 bg-red-50' : 'text-[#5c5c5c] hover:text-[#121212]'
            }`}
            title="Lưu vào danh sách yêu thích"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showToast({
                  type: 'success',
                  title: 'Đã sao chép liên kết!',
                  description: 'Liên kết chi tiết dinh thự đã được lưu vào bộ nhớ tạm.',
                });
              }
            }}
            className="p-2 sm:p-2.5 rounded-xl border border-black/10 text-[#5c5c5c] hover:text-[#121212] transition-colors cursor-pointer"
            title="Chia sẻ liên kết"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Khu vực hiển thị nội dung Media tương ứng */}
      {viewMode === 'gallery' && (
        <div className="space-y-3 sm:space-y-4">
          {/* Ảnh lớn chính */}
          <div className="relative aspect-16/10 sm:aspect-video lg:aspect-21/10 w-full rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#121212] shadow-xl">
            <img
              src={property.galleryImages[activeImageIndex] || property.heroImage}
              alt={property.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full">
              Ảnh {activeImageIndex + 1} / {property.galleryImages.length}
            </div>
          </div>

          {/* Dải ảnh thumbnail xem trước (Hỗ trợ cuộn ngang) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 overflow-x-auto pb-1">
            {property.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-16/10 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#b8864a] scale-100 shadow-md ring-2 ring-[#b8864a]/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === '3d' && property.sketchfabModelUrl && (
        <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-21/10 rounded-[20px] sm:rounded-[28px] overflow-hidden bg-white border border-black/10 shadow-2xl p-2 sm:p-4">
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#b8864a]/30 shadow-md text-[10px] sm:text-xs font-semibold text-[#121212] animate-bounce-hint pointer-events-none">
            <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b8864a] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Kéo xoay 360° không gian 3D</span>
          </div>

          <iframe
            title={`${property.title} 3D Tour`}
            className="w-full h-full rounded-xl sm:rounded-2xl border-0"
            allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
            src={property.sketchfabModelUrl}
            loading="lazy"
          />
        </div>
      )}

      {/* Chế độ xem sơ đồ mặt bằng các tầng */}
      {viewMode === 'floorplan' && property.floorPlans.length > 0 && (
        <div className="bg-white p-4 sm:p-8 lg:p-10 rounded-[20px] sm:rounded-[28px] border border-black/5 shadow-lg space-y-4 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-black/10 pb-3 sm:pb-4">
            {property.floorPlans.map((fp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFloorPlanIndex(idx)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFloorPlanIndex === idx
                    ? 'bg-[#121212] text-white shadow'
                    : 'bg-[#F8F7F3] text-[#5c5c5c] hover:text-[#121212]'
                }`}
              >
                {fp.name} ({fp.area})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 aspect-16/10 bg-[#FAF9F5] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 p-3 sm:p-4 flex items-center justify-center">
              <img
                src={property.floorPlans[activeFloorPlanIndex].image}
                alt={property.floorPlans[activeFloorPlanIndex].name}
                className="max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="lg:col-span-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#5c5c5c]">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121212]">
                {property.floorPlans[activeFloorPlanIndex].name}
              </h3>
              <div className="space-y-2 pt-2 border-t border-black/10">
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span>Diện tích tầng:</span>
                  <strong className="text-[#121212]">{property.floorPlans[activeFloorPlanIndex].area}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span>Phòng ngủ:</span>
                  <strong className="text-[#121212]">{property.floorPlans[activeFloorPlanIndex].bedrooms} Phòng</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span>Phòng tắm:</span>
                  <strong className="text-[#121212]">{property.floorPlans[activeFloorPlanIndex].bathrooms} Phòng</strong>
                </div>
              </div>
              <p className="text-[11px] text-[#7a7a7a] pt-1">
                * Bản vẽ mặt bằng chi tiết được cung cấp chính thức bởi Moreau & Associates Architecture Hub.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lưới bố cục chính: Cột trái (Thông số, mô tả, tiện ích) & Cột phải (Form tư vấn VIP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cột trái (8 cột): Thông số, câu chuyện kiến trúc, tiện ích, kiến trúc sư */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-12">
          {/* Khối thông số kỹ thuật chi tiết */}
          <div className="bg-white p-5 sm:p-8 rounded-[20px] sm:rounded-[28px] border border-black/5 shadow-md">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8c5a1e] mb-4 sm:mb-6">
              Thông Số Kiến Trúc Chi Tiết
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <Maximize2 className="w-3.5 h-3.5 text-[#b8864a]" /> Diện tích khuôn viên
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">{property.area}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <BedDouble className="w-3.5 h-3.5 text-[#b8864a]" /> Phòng ngủ Master
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">{property.bedrooms} Phòng</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <Bath className="w-3.5 h-3.5 text-[#b8864a]" /> Phòng tắm sang trọng
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">{property.bathrooms} Phòng</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <Building className="w-3.5 h-3.5 text-[#b8864a]" /> Số tầng cao
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">{property.floors} Tầng</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <Compass className="w-3.5 h-3.5 text-[#b8864a]" /> Năm hoàn thiện
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">{property.yearBuilt}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b8864a]" /> Tình trạng pháp lý
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-[#121212]">Sổ đỏ vĩnh viễn</p>
              </div>
            </div>
          </div>

          {/* Mô tả câu chuyện và phong cách kiến trúc */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#121212]">
              Kiến Trúc & Không Gian Sống
            </h2>
            <div className="space-y-3 text-xs sm:text-base text-[#5c5c5c] leading-relaxed">
              {property.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Các điểm nhấn độc quyền */}
          <div className="bg-[#EFECE5] p-5 sm:p-8 rounded-[20px] sm:rounded-[28px] border border-black/5 space-y-4 sm:space-y-5">
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#121212]">
              Điểm Nhấn Độc Quyền
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {property.highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8c5a1e] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hệ thống tiện ích cao cấp */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#121212]">
              Hệ Tiện Ích Đặc Quyền
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#b8864a] shrink-0" />
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#121212]">
                      {amenity.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#7a7a7a] leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trích dẫn từ kiến trúc sư trưởng */}
          {property.architect && (
            <div className="bg-white p-5 sm:p-8 rounded-[20px] sm:rounded-[28px] border border-[#b8864a]/30 shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <img
                src={property.architect.avatar}
                alt={property.architect.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#b8864a] shadow-sm shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <p className="font-serif italic text-xs sm:text-base text-[#121212] leading-relaxed">
                  &ldquo;{property.architect.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#121212]">
                    {property.architect.name}
                  </h4>
                  <span className="text-[11px] sm:text-xs text-[#7a7a7a]">
                    {property.architect.role}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cột phải (4 cột): Khối đặt lịch hẹn trải nghiệm & Hotline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 sm:p-8 rounded-[20px] sm:rounded-[28px] border border-black/10 shadow-xl space-y-5 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#8c5a1e] block mb-1">
                Tư Vấn Bảo Mật 1-1
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
                Đặt Lịch Trải Nghiệm
              </h3>
              <p className="text-xs text-[#7a7a7a] mt-1 leading-relaxed">
                Được đón tiếp bằng du thuyền / xe sang riêng tư và tham quan trực tiếp cùng chuyên gia bất động sản cấp cao.
              </p>
            </div>

            {formSubmitted ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <Alert variant="success" className="p-4 sm:p-5">
                  <CircleCheck className="w-5 h-5" />
                  <div className="space-y-1">
                    <AlertTitle className="text-sm font-serif font-bold">
                      Đăng Ký Thành Công!
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      Quản gia cá nhân của LOISTIQ sẽ liên hệ với quý khách qua số điện thoại <strong>{formData.phone}</strong> trong vòng 15 phút để xác nhận lịch trình tham quan.
                    </AlertDescription>
                  </div>
                </Alert>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[#8c5a1e] underline hover:text-[#121212] transition-colors cursor-pointer"
                  >
                    Đăng ký lịch hẹn khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4 text-xs">
                <div>
                  <label className="block text-[#333333] font-medium mb-1">
                    Họ và Tên Quý Khách *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-1">
                    Số Điện Thoại VIP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0908 xxx xxx"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@vip.com"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-1">
                    Ngày Dự Kiến Xem Nhà
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-medium mb-1">
                    Yêu Cầu Đặc Biệt
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Yêu cầu đón rước bằng du thuyền / xe chuyên dụng, xem hồ sơ pháp lý..."
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2.5 sm:py-3 px-3.5 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#121212] text-white py-3.5 rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#8c5a1e] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4 text-[#d4a366]" />
                  <span>Xác Nhận Đặt Lịch Xem Nhà</span>
                </button>

                <p className="text-[10px] text-[#7a7a7a] text-center">
                  🔒 Toàn bộ thông tin định danh và tài chính của Quý khách được mã hóa bảo mật tuyệt đối.
                </p>
              </form>
            )}

            {/* Số điện thoại hỗ trợ nhanh */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
              <span className="text-[#5c5c5c]">Tư vấn trực tiếp 24/7:</span>
              <a
                href="tel:18006666"
                className="font-bold text-[#8c5a1e] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> 1800 6666
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
