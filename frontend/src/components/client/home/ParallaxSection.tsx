'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, CalendarCheck, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // Hiệu ứng Parallax chuyển động ảnh nền theo nhịp cuộn trang
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // Hiệu ứng hiển thị chữ và các nút kêu gọi hành động
      gsap.fromTo(
        '.parallax-anim',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-[55vh] sm:min-h-[65vh] lg:min-h-[70vh] overflow-hidden flex items-center justify-center py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 bg-[#121212]"
    >
      {/* Vùng chứa ảnh nền với ngữ cảnh xếp chồng độc lập (z-0) */}
      <div className="absolute top-[-15%] left-0 w-full h-[130%] z-0 overflow-hidden pointer-events-none">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=2400"
          alt="Kiến trúc dinh thự nghỉ dưỡng hoàng hôn"
          className="w-full h-full object-cover object-center will-change-transform"
        />

        {/* Lớp phủ chuyển màu bán trong suốt làm nổi bật độ tương phản của chữ */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/60" />
      </div>

      {/* Nội dung thông điệp chính (nằm trên lớp nền z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-5 sm:space-y-8">
        {/* Nhãn đặc quyền */}
        <div className="parallax-anim inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[4px] text-[#d4a366] font-semibold border border-[#d4a366]/40 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a366]" />
          <span>Đặc Quyền Chủ Nhân LOISTIQ</span>
        </div>

        {/* Tiêu đề chính */}
        <h2 className="parallax-anim font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.15] text-white drop-shadow-2xl">
          Định hình lại <br />
          <span className="font-normal italic text-[#d4a366]">Không gian sống.</span>
        </h2>

        {/* Đoạn văn mô tả */}
        <p className="parallax-anim text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Dịch vụ tư vấn đầu tư và thiết kế dinh thự cá nhân hóa 1-1, mang đậm dấu ấn phong cách và vị thế độc bản của từng gia chủ thượng lưu.
        </p>

        {/* Các nút hành động */}
        <div className="parallax-anim pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 bg-[#d4a366] text-[#121212] px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-white hover:text-[#121212] transition-all duration-300 shadow-2xl hover:shadow-[#d4a366]/30 hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4 text-[#121212]" />
            <span>Đặt Lịch Tư Vấn Private 1-1</span>
          </Link>

          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/30 text-white text-xs sm:text-sm font-medium bg-black/40 hover:bg-white hover:text-[#121212] backdrop-blur-md transition-all duration-300"
          >
            <span>Khám Phá Danh Mục Biệt Thự</span>
            <ArrowUpRight className="w-4 h-4 text-[#d4a366]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
