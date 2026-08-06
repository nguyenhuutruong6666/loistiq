import React from 'react';
import { Metadata } from 'next';
import Experience3DClient from './Experience3DClient';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trải Nghiệm 3D & VR Tour Không Gian | LOISTIQ Luxury Real Estate',
  description:
    'Khám phá công nghệ số hóa 3D 360 độ và trải nghiệm thực tế ảo VR các dinh thự triệu đô độc quyền từ LOISTIQ.',
};

export default function Experience3DPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Tiêu đề trang */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b8864a]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#b8864a]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8c5a1e]">
              Công Nghệ Số Hóa Không Gian Độc Bản
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#121212] tracking-tight leading-tight">
            Trải Nghiệm 3D & <span className="italic font-normal text-[#8c5a1e]">VR Showroom.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#5c5c5c] leading-relaxed max-w-2xl mx-auto">
            Chiêm ngưỡng từng đường nét kiến trúc, góc ban công hướng biển và không gian nội thất với độ phân giải siêu nét chuẩn 360° trước khi đặt lịch tham quan thực tế.
          </p>
        </div>

        {/* Nội dung tương tác 3D Client Component */}
        <Experience3DClient />
      </div>
    </div>
  );
}
