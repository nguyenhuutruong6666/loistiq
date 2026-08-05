'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowUpRight, Rotate3d } from 'lucide-react';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          '.hero-title',
          {
            y: 35,
            opacity: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          '.hero-desc',
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-actions',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.hero-stats-item',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          '-=0.5'
        )
        .from(
          '.hero-3d-container',
          {
            scale: 0.92,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.1)',
          },
          '-=1'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-72px)] flex items-center justify-between px-4 sm:px-6 lg:px-12 pt-1 sm:pt-3 lg:pt-4 pb-8 sm:pb-12 lg:pb-14 overflow-hidden bg-[#F8F7F3]"
    >
      {/* Vùng màu nền khuếch tán tạo chiều sâu */}
      <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#d4a366]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#b8864a]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
        {/* Cột trái: Nội dung tiêu đề, lời dẫn và các nút kêu gọi hành động */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6">
          {/* Nhãn giới thiệu độc quyền */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-[#b8864a]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-[#8c5a1e]">
              Tuyệt Tác Bất Động Sản Độc Bản 2026
            </span>
          </div>

          {/* Tiêu đề chính */}
          <div className="space-y-2">
            <h1 className="hero-title font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#121212] leading-[1.15] sm:leading-[1.1]">
              Nghệ thuật <br />
              <span className="italic font-normal text-[#8c5a1e]">Sống thượng lưu.</span>
            </h1>
          </div>

          {/* Lời dẫn mô tả */}
          <p className="hero-desc text-sm sm:text-base lg:text-lg text-[#5c5c5c] leading-relaxed max-w-xl">
            Khám phá bộ sưu tập dinh thự biển, Sky Villa và Penthouse hoàng gia được kiến tạo bởi những kiến trúc sư danh tiếng thế giới. Nơi mỗi mét vuông là một tuyên ngôn vị thế.
          </p>

          {/* Các nút điều hướng */}
          <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2.5 bg-[#121212] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium hover:bg-[#333333] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Xem Toàn Bộ Dự Án</span>
              <ArrowUpRight className="w-4 h-4 text-[#b8864a]" />
            </Link>

            <a
              href="#experience-3d"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-black/15 bg-white/70 text-xs sm:text-sm font-medium text-[#121212] hover:bg-white hover:border-[#b8864a] transition-all duration-300 backdrop-blur-sm shadow-sm"
            >
              <Rotate3d className="w-4 h-4 text-[#b8864a]" />
              <span>Trải Nghiệm 3D Gallery</span>
            </a>
          </div>

          {/* Số liệu thống kê bảo chứng uy tín */}
          <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-6 border-t border-black/10">
            <div className="hero-stats-item">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#121212]">
                100%
              </span>
              <p className="text-[10px] sm:text-xs text-[#7a7a7a] mt-0.5 leading-tight">
                Sổ đỏ sở hữu lâu dài
              </p>
            </div>
            <div className="hero-stats-item">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#121212]">
                25+
              </span>
              <p className="text-[10px] sm:text-xs text-[#7a7a7a] mt-0.5 leading-tight">
                Dinh thự giới hạn
              </p>
            </div>
            <div className="hero-stats-item">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#121212]">
                24/7
              </span>
              <p className="text-[10px] sm:text-xs text-[#7a7a7a] mt-0.5 leading-tight">
                Quản gia VIP riêng
              </p>
            </div>
          </div>
        </div>

        {/* Ảnh hero hiển thị trên Mobile & Tablet thay thế iframe 3D (nhẹ hơn, nhanh hơn) */}
        <div className="block lg:hidden relative w-full aspect-4/3 rounded-[20px] overflow-hidden bg-white border border-black/5 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=900"
            alt="LOISTIQ Dinh thự cao cấp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4a366] block">Bộ Sưu Tập Độc Bản</span>
            <p className="text-sm font-serif font-bold">LOISTIQ Grand Sanctuary</p>
          </div>
          <a
            href="#experience-3d"
            className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-[#121212] border border-[#b8864a]/30 shadow"
          >
            <Rotate3d className="w-3 h-3 text-[#b8864a]" />
            Trải Nghiệm 3D
          </a>
        </div>

        {/* Cột phải: Trình chiếu mô hình 3D tương tác (Ẩn trên mobile, hiện từ lg) */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 justify-center lg:justify-end">
          <div className="hero-3d-container relative w-full max-w-155 aspect-square rounded-3xl sm:rounded-[36px] bg-white border border-black/5 shadow-2xl p-2.5 sm:p-4 overflow-hidden group">
            {/* Gợi ý tương tác chạm xoay */}
            <div className="absolute top-4 right-4 sm:top-7 sm:right-7 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#b8864a]/30 shadow-lg text-[10px] sm:text-xs font-semibold text-[#121212] animate-bounce-hint pointer-events-none">
              <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b8864a] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Chạm & Xoay 360°</span>
            </div>

            {/* Thẻ thông tin dưới góc mô hình */}
            <div className="absolute bottom-4 left-4 sm:bottom-7 sm:left-7 z-20 bg-black/75 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-white/10 max-w-55 sm:max-w-70">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#d4a366] block">
                Không Gian 3D Mẫu
              </span>
              <p className="text-[11px] sm:text-xs font-medium text-white/95 truncate">
                Dinh Thự Grand Sanctuary 360°
              </p>
            </div>

            {/* Khung iframe nhúng Sketchfab 3D - Ẩn trên màn hình rất nhỏ để tránh chiếm không gian */}
            <div className="w-full h-full rounded-[18px] sm:rounded-[28px] overflow-hidden bg-[#FAF9F5]">
              <iframe
                title="LOISTIQ Luxury 3D Model"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                src="https://sketchfab.com/models/e30700a3565f41e3bd6c2751eccfe5f5/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
