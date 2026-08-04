import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import { MapPin, Sparkles } from 'lucide-react';
import PropertyDetailClient from './PropertyDetailClient';

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

/**
 * Tự động tạo metadata SEO cho từng trang chi tiết bất động sản
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return {
      title: 'Bất động sản không tồn tại | LOISTIQ',
    };
  }

  return {
    title: `${property.title} | LOISTIQ Luxury Real Estate`,
    description: property.subtitle,
    openGraph: {
      title: `${property.title} | LOISTIQ`,
      description: property.subtitle,
      images: [property.heroImage],
    },
  };
}

/**
 * Trang chi tiết bất động sản (Server Component)
 */
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  // Danh sách bất động sản liên quan (loại trừ bất động sản hiện tại)
  const relatedProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F7F3] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Tiêu đề & Thông tin mức giá */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-black/10">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#121212] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {property.category}
              </span>
              <span className="bg-[#b8864a]/15 text-[#8c5a1e] border border-[#b8864a]/30 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#b8864a]" /> {property.status}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5c5c5c]">
              <MapPin className="w-4 h-4 text-[#b8864a] shrink-0" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Mức giá niêm yết */}
          <div className="flex flex-col lg:items-end gap-1 sm:gap-2">
            <div className="text-left lg:text-right">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7a7a7a] font-medium block">
                Giá Bán Niêm Yết Độc Quyền
              </span>
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#8c5a1e]">
                {property.price}
              </span>
            </div>
          </div>
        </div>

        {/* Khối tương tác xem Gallery, Mô hình 3D, Mặt bằng và Form đặt lịch tư vấn */}
        <PropertyDetailClient property={property} />

        {/* Bộ sưu tập liên quan cùng phân khúc */}
        <div className="pt-10 sm:pt-16 border-t border-black/10 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e] block mb-1">
                Gợi Ý Dành Cho Bạn
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#121212]">
                Các Tuyệt Tác Cùng Phân Khúc
              </h2>
            </div>
            <Link
              href="/properties"
              className="text-xs sm:text-sm font-semibold text-[#121212] hover:text-[#b8864a] transition-colors"
            >
              Xem tất cả bộ sưu tập →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {relatedProperties.map((relProperty) => (
              <PropertyCard key={relProperty.id} property={relProperty} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
