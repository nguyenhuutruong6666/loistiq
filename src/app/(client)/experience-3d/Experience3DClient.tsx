'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROPERTIES } from '@/data/properties';
import { Rotate3d, Sparkles, ArrowUpRight, Compass, Eye, ShieldCheck, Layers, Maximize2 } from 'lucide-react';
import Carousel3DGallery from '@/components/home/Carousel3DGallery';

const propertiesWith3D = PROPERTIES.filter((p) => p.sketchfabModelUrl);

export default function Experience3DClient() {
  const [activePropertyId, setActivePropertyId] = useState(propertiesWith3D[0]?.id || 'loistiq-grand-ocean-villa');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const selectedProperty = propertiesWith3D.find((p) => p.id === activePropertyId) || propertiesWith3D[0];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Khối trình diễn Mô hình 3D tương tác chính */}
      <div className="bg-white rounded-3xl sm:rounded-4xl border border-black/5 shadow-xl p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
        {/* Bộ chọn các mô hình dinh thự 3D */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-5">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e] block mb-1">
              Phòng Trình Chiếu Không Gian Ảo
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#121212]">
              {selectedProperty.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5c5c5c] mt-0.5">
              {selectedProperty.location} • {selectedProperty.price}
            </p>
          </div>

          {/* Danh sách nút chọn dinh thự */}
          <div className="flex flex-wrap items-center gap-2">
            {propertiesWith3D.map((prop) => (
              <button
                key={prop.id}
                onClick={() => setActivePropertyId(prop.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activePropertyId === prop.id
                    ? 'bg-[#121212] text-white shadow-md'
                    : 'bg-[#FAF7F2] text-[#5c5c5c] hover:text-[#121212] hover:bg-[#EFECE5] border border-black/5'
                }`}
              >
                {prop.title}
              </button>
            ))}
          </div>
        </div>

        {/* Khung iframe 3D Sketchfab tương tác */}
        <div
          className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF9F5] border border-black/10 shadow-inner transition-all duration-300 ${
            isFullscreen ? 'aspect-video lg:aspect-21/9' : 'aspect-4/3 sm:aspect-video lg:aspect-21/10'
          }`}
        >
          {/* Gợi ý tương tác */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#b8864a]/30 shadow-md text-[10px] sm:text-xs font-semibold text-[#121212] pointer-events-none">
            <Rotate3d className="w-3.5 h-3.5 text-[#b8864a] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Kéo chuột / vuốt để xoay 360°</span>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-[10px] sm:text-xs font-medium backdrop-blur-md shadow-md transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isFullscreen ? 'Thu gọn góc nhìn' : 'Mở rộng góc nhìn'}</span>
          </button>

          {selectedProperty.sketchfabModelUrl && (
            <iframe
              key={selectedProperty.id}
              title={`${selectedProperty.title} 3D Showcase`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
              src={selectedProperty.sketchfabModelUrl}
              loading="lazy"
            />
          )}
        </div>

        {/* Thanh công cụ & Chi tiết dinh thự */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#5c5c5c]">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#b8864a]" />
              <span>{selectedProperty.area}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#b8864a]" />
              <span>{selectedProperty.bedrooms} Phòng ngủ Suites</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#b8864a]" />
              <span>Sở hữu lâu dài (Sổ đỏ)</span>
            </div>
          </div>

          <Link
            href={`/properties/${selectedProperty.id}`}
            className="inline-flex items-center justify-center gap-2 bg-[#121212] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#333333] transition-all self-start sm:self-auto shadow"
          >
            <span>Xem Đầy Đủ Chi Tiết & Mặt Bằng</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#b8864a]" />
          </Link>
        </div>
      </div>

      {/* Hướng dẫn trải nghiệm VR và công nghệ số hóa 3D */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-[#FAF7F2] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-black/5 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8c5a1e]">
            <Rotate3d className="w-5 h-5 text-[#b8864a]" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
            Tương Tác Không Gian 360°
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5c5c] leading-relaxed">
            Sử dụng thao tác giữ chuột trái để xoay quanh dinh thự, chuột phải để dịch chuyển và con lăn để phóng to từng chi tiết nội thất.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-black/5 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8c5a1e]">
            <Eye className="w-5 h-5 text-[#b8864a]" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
            Kính Thực Tế Ảo VR Headset
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5c5c] leading-relaxed">
            Hỗ trợ kết nối trực tiếp với Apple Vision Pro, Meta Quest và HTC Vive để bước đi thực tế trong dinh thự như ngoài đời thật.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-black/5 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#8c5a1e]">
            <Sparkles className="w-5 h-5 text-[#b8864a]" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
            Độ Chính Xác Chuẩn 1:1
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5c5c] leading-relaxed">
            Số hóa chi tiết từng vân đá cẩm thạch Calacatta, hệ thống ánh sáng tự nhiên theo từng khung giờ trong ngày từ bản vẽ kiến trúc.
          </p>
        </div>
      </div>

      {/* Băng chuyền 3D Gallery hình trụ 360 độ */}
      <div className="space-y-4 sm:space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e]">
            Bộ Sưu Tập Tuyệt Tác
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212]">
            Băng Chuyền 3D Gallery 360°
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5c5c]">
            Rê chuột vào vòng xoay để dừng lại và nhấp vào bất kỳ tác phẩm nào để chuyển sang dinh thự tương ứng.
          </p>
        </div>

        {/* Nhúng component Carousel3DGallery */}
        <div className="rounded-3xl sm:rounded-4xl overflow-hidden border border-black/5 shadow-xl">
          <Carousel3DGallery />
        </div>
      </div>

      {/* Phân đoạn Kêu gọi Đặt lịch trải nghiệm VR trực tiếp */}
      <div className="bg-[#121212] text-white rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#b8864a]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#d4a366]/20 rounded-full blur-3xl pointer-events-none" />

        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#d4a366] relative z-10">
          Trải Nghiệm Đẳng Cấp Thượng Lưu
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-2xl mx-auto relative z-10">
          Trải Nghiệm Phòng Chiếu VR Thực Tế Tại Showroom LOISTIQ
        </h2>
        <p className="text-xs sm:text-sm text-[#a3a3a3] max-w-xl mx-auto leading-relaxed relative z-10">
          Đội ngũ chuyên viên LOISTIQ luôn sẵn sàng đón tiếp quý khách tại phòng chiếu VR chuyên biệt với trang thiết bị cao cấp nhất.
        </p>

        <div className="pt-2 relative z-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#b8864a] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#8c5a1e] transition-all shadow-lg"
          >
            <span>Đặt Lịch Trải Nghiệm VR 1-1</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </Link>
          <a
            href="tel:18006666"
            className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <span>Hotline VIP: 1800 6666</span>
          </a>
        </div>
      </div>
    </div>
  );
}
