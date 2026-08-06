import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import PhilosophySection from '@/components/client/home/PhilosophySection';
import { PILLARS, ARCHITECTS, MATERIALS } from '@/data/philosophy';

export const metadata: Metadata = {
  title: 'Triết Lý Kiến Trúc & Nghệ Thuật Không Gian | LOISTIQ Luxury Real Estate',
  description:
    'Tìm hiểu triết lý kiến trúc độc bản, tôn vinh nghệ thuật sống thượng lưu và sự giao hòa tuyệt đối giữa thiên nhiên và con người tại LOISTIQ.',
};

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
        {/* Banner Giới Thiệu Đầu Trang */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b8864a]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8864a]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8c5a1e]">
              Tôn Chỉ Thiết Kế Không Gian Độc Bản
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#121212] tracking-tight leading-tight">
            Triết Lý Kiến Trúc & <br />
            <span className="italic font-normal text-[#8c5a1e]">Nghệ Thuật Không Gian.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#5c5c5c] leading-relaxed max-w-2xl mx-auto">
            Tại LOISTIQ, mỗi bất động sản không đơn thuần là một công trình xây dựng, mà là một tác phẩm nghệ thuật trường tồn — nơi kiến trúc đỉnh cao đối thoại cùng vẻ đẹp thiên nhiên bất tận.
          </p>
        </div>

        {/* Phân đoạn GSAP Philosophy Text & Parallax Glass Elements */}
        <div className="rounded-3xl sm:rounded-4xl overflow-hidden border border-black/5 shadow-xl bg-white p-4 sm:p-8">
          <PhilosophySection />
        </div>

        {/* 4 Trụ Cột Triết Lý Thiết Kế */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e]">
              Nền Tảng Vững Chắc
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212]">
              4 Trụ Cột Triết Lý LOISTIQ
            </h2>
            <p className="text-xs sm:text-sm text-[#5c5c5c]">
              Những nguyên lý bất biến định hình nên từng đường nét thiết kế trong mỗi dự án của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 group space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#8c5a1e] group-hover:bg-[#121212] group-hover:text-[#d4a366] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7a7a7a]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121212]">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5c5c5c] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Đội Ngũ Bậc Thầy Kiến Trúc Danh Tiếng */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e]">
              Bàn Tay Của Những Bậc Thầy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212]">
              Đội Ngũ Kiến Trúc Sư Trưởng
            </h2>
            <p className="text-xs sm:text-sm text-[#5c5c5c]">
              Sự hội tụ của những khối óc sáng tạo danh tiếng hàng đầu thế giới với nhiều giải thưởng kiến trúc quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ARCHITECTS.map((arch) => (
              <div
                key={arch.name}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={arch.avatar}
                    alt={arch.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-lg font-bold">{arch.name}</h3>
                    <p className="text-[11px] text-[#d4a366] font-medium">{arch.role}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 grow flex flex-col justify-between">
                  <blockquote className="italic font-serif text-xs sm:text-sm text-[#333333] leading-relaxed border-l-2 border-[#b8864a] pl-3">
                    &ldquo;{arch.quote}&rdquo;
                  </blockquote>

                  <p className="text-xs text-[#7a7a7a] pt-2 border-t border-black/5">
                    {arch.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vật Liệu Tuyển Chọn Thượng Hạng */}
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e]">
              Tiêu Chuẩn Vật Liệu
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212]">
              Vật Liệu Tuyển Chọn Thượng Hạng
            </h2>
            <p className="text-xs sm:text-sm text-[#5c5c5c]">
              Chắt lọc những loại vật liệu bền vững và quý hiếm từ các nhà cung ứng danh tiếng toàn cầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {MATERIALS.map((mat) => (
              <div
                key={mat.name}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm space-y-4 p-5"
              >
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-[#121212] shadow-sm">
                    {mat.origin}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
                    {mat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5c5c] leading-relaxed">
                    {mat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phân đoạn Kêu gọi Hành động (CTA) */}
        <div className="bg-[#121212] text-white rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#b8864a]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#d4a366]/20 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#d4a366] relative z-10">
            Khám Phá Tuyệt Tác
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-2xl mx-auto relative z-10">
            Trải Nghiệm Không Gian Kiến Trúc Độc Bản Của Riêng Bạn
          </h2>
          <p className="text-xs sm:text-sm text-[#a3a3a3] max-w-xl mx-auto leading-relaxed relative z-10">
            Liên hệ với đội ngũ chuyên gia tư vấn kiến trúc của LOISTIQ để nhận hồ sơ thiết kế chi tiết và đặt lịch hẹn tư vấn riêng tư.
          </p>

          <div className="pt-2 relative z-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-[#b8864a] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#8c5a1e] transition-all shadow-lg"
            >
              <span>Xem Toàn Bộ Bộ Sưu Tập</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>Đặt Lịch Tư Vấn KTS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
