'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PROPERTIES } from '@/data/properties';
import { MapPin, Maximize2, BedDouble, ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BentoGridSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hiệu ứng xuất hiện so le khi cuộn đến lưới Bento
      gsap.from('.bento-card-item', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  const grandVilla = PROPERTIES[0];
  const zenithPenthouse = PROPERTIES[1];
  const pineHill = PROPERTIES[2];
  const marinaSky = PROPERTIES[3];

  return (
    <section
      id="featured-bento"
      ref={containerRef}
      className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 bg-[#F8F7F3] border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Phần tiêu đề & Lời dẫn phân đoạn */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b8864a]/10 border border-[#8c5a1e]/30 text-[#8c5a1e] text-[10px] sm:text-xs font-semibold uppercase tracking-[2px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dự Án Biểu Tượng 2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight">
              Tuyệt Tác Kiến Trúc <br />
              <span className="italic font-normal text-[#8c5a1e]">Được săn đón nhất.</span>
            </h2>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#121212] hover:text-[#b8864a] transition-colors group self-start md:self-end pb-1 border-b border-[#121212]/30"
          >
            <span>Khám phá toàn bộ 25+ dinh thự</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Lưới Bento 4 ô linh hoạt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 auto-rows-85 sm:auto-rows-95 lg:auto-rows-105">
          {/* Ô số 1: Dinh thự biển lớn (chiếm 2 cột trên desktop) */}
          <div className="bento-card-item md:col-span-2 group relative rounded-3xl sm:rounded-[28px] overflow-hidden bg-[#121212] shadow-xl border border-black/5">
            <Link href={`/properties/${grandVilla.id}`} className="block w-full h-full">
              {/* Nhãn trạng thái */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md text-[#121212] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                {grandVilla.status}
              </div>

              {/* Nhãn mức giá */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-[#121212]/80 backdrop-blur-md text-[#d4a366] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border border-white/10 shadow-md">
                {grandVilla.price}
              </div>

              {/* Ảnh nền biệt thự */}
              <img
                src={grandVilla.heroImage}
                alt={grandVilla.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Lớp phủ chuyển màu & văn bản */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-10 text-white">
                <div className="flex items-center gap-2 text-xs text-[#d4a366] mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{grandVilla.location}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 group-hover:text-[#d4a366] transition-colors line-clamp-1">
                  {grandVilla.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mb-3 sm:mb-4 max-w-xl">
                  {grandVilla.subtitle}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 sm:pt-3 border-t border-white/15">
                  <div className="flex items-center gap-3 sm:gap-5 text-xs text-white/90">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#b8864a]" /> {grandVilla.area}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#b8864a]" /> {grandVilla.bedrooms} PN
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4a366] group-hover:translate-x-1 transition-transform">
                    Xem chi tiết <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Ô số 2: Penthouse (chiếm 1 cột) */}
          <div className="bento-card-item md:col-span-1 group relative rounded-3xl sm:rounded-[28px] overflow-hidden bg-[#121212] shadow-xl border border-black/5">
            <Link href={`/properties/${zenithPenthouse.id}`} className="block w-full h-full">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md text-[#121212] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-md">
                {zenithPenthouse.category}
              </div>

              <img
                src={zenithPenthouse.heroImage}
                alt={zenithPenthouse.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                <span className="text-xs text-[#d4a366] font-semibold mb-1 truncate">
                  {zenithPenthouse.price} • {zenithPenthouse.city}
                </span>
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-[#d4a366] transition-colors line-clamp-1">
                  {zenithPenthouse.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-white/90 group-hover:text-[#d4a366] transition-colors">
                  Khám phá tuyệt tác <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Ô số 3: Biệt thự đồi thông (chiếm 1 cột) */}
          <div className="bento-card-item md:col-span-1 group relative rounded-3xl sm:rounded-[28px] overflow-hidden bg-[#121212] shadow-xl border border-black/5">
            <Link href={`/properties/${pineHill.id}`} className="block w-full h-full">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md text-[#121212] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-md">
                {pineHill.category}
              </div>

              <img
                src={pineHill.heroImage}
                alt={pineHill.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                <span className="text-xs text-[#d4a366] font-semibold mb-1 truncate">
                  {pineHill.price} • {pineHill.city}
                </span>
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-[#d4a366] transition-colors line-clamp-1">
                  {pineHill.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-white/90 group-hover:text-[#d4a366] transition-colors">
                  Xem chi tiết <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Ô số 4: Sky Villa rộng (chiếm 2 cột trên desktop) */}
          <div className="bento-card-item md:col-span-2 group relative rounded-3xl sm:rounded-[28px] overflow-hidden bg-[#121212] shadow-xl border border-black/5">
            <Link href={`/properties/${marinaSky.id}`} className="block w-full h-full">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md text-[#121212] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                Gói Nội Thất Ý
              </div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-[#121212]/80 backdrop-blur-md text-[#d4a366] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border border-white/10 shadow-md">
                {marinaSky.price}
              </div>

              <img
                src={marinaSky.heroImage}
                alt={marinaSky.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-8 lg:p-10 text-white">
                <div className="flex items-center gap-2 text-xs text-[#d4a366] mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{marinaSky.location}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 group-hover:text-[#d4a366] transition-colors line-clamp-1">
                  {marinaSky.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mb-3 sm:mb-4 max-w-xl">
                  {marinaSky.subtitle}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 sm:pt-3 border-t border-white/15">
                  <div className="flex items-center gap-3 sm:gap-5 text-xs text-white/90">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#b8864a]" /> {marinaSky.area}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#b8864a]" /> {marinaSky.bedrooms} PN
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4a366] group-hover:translate-x-1 transition-transform">
                    Xem chi tiết <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGridSection;
