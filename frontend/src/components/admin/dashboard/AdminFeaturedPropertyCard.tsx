'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { Flame, ExternalLink, MapPin } from 'lucide-react';

interface AdminFeaturedPropertyCardProps {
  property: Property;
}

export default function AdminFeaturedPropertyCard({ property }: AdminFeaturedPropertyCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl border border-black/8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.04)] p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8c5a1e] bg-[#b8864a]/10 px-2.5 py-1 rounded-full">
          <Flame className="w-3 h-3 text-[#b8864a]" />
          Dinh Thự Tiêu Biểu (properties.ts)
        </span>
        <Link
          href={`/properties/${property.slug}`}
          target="_blank"
          className="text-[#737373] hover:text-[#121212] transition-colors p-1"
          title="Xem trên web"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative h-40 w-full rounded-2xl overflow-hidden">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <p className="text-xs font-bold leading-tight line-clamp-1">
              {property.title}
            </p>
            <p className="text-[10px] text-white/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#f5d59f]" /> {property.location}
            </p>
          </div>
          <span className="text-xs font-extrabold text-[#f5d59f] shrink-0">
            {property.price}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] py-1 bg-[#FAF7F2] rounded-xl border border-black/5">
        <div>
          <span className="text-[#737373] block">Diện Tích</span>
          <strong className="text-[#121212]">{property.area}</strong>
        </div>
        <div>
          <span className="text-[#737373] block">Phòng Ngủ</span>
          <strong className="text-[#121212]">{property.bedrooms} Suites</strong>
        </div>
        <div>
          <span className="text-[#737373] block">Năm Xây</span>
          <strong className="text-[#121212]">{property.yearBuilt}</strong>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <Link
          href={`/admin/properties?edit=${property.id}`}
          className="py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-black/5 text-[#121212] font-semibold text-center transition-colors"
        >
          Chỉnh Sửa BĐS
        </Link>
        <Link
          href="/admin/properties"
          className="py-2 px-3 rounded-xl bg-[#121212] hover:bg-[#b8864a] text-white font-semibold text-center transition-colors"
        >
          Toàn Bộ Danh Mục
        </Link>
      </div>
    </div>
  );
}
