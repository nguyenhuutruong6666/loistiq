import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { MapPin, Maximize2, BedDouble, Bath, ArrowUpRight, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group rounded-[20px] sm:rounded-3xl overflow-hidden bg-white border border-black/5 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1.5">
      {/* Khung chứa ảnh đại diện */}
      <div className="relative aspect-16/11 overflow-hidden bg-[#121212]">
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Nhãn danh mục và trạng thái */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-1.5 sm:gap-2 z-10">
          <span className="bg-[#121212]/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
            {property.category}
          </span>
          {property.status === 'Độc quyền' && (
            <span className="bg-[#b8864a] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> Độc Quyền
            </span>
          )}
        </div>

        {/* Mức giá hiển thị trên ảnh */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md text-[#121212] px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-md">
          {property.price}
        </div>
      </div>

      {/* Phần thông tin chi tiết */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Vị trí địa lý */}
          <div className="flex items-center gap-1.5 text-xs text-[#7a7a7a]">
            <MapPin className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Tiêu đề dự án */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121212] group-hover:text-[#8c5a1e] transition-colors leading-snug line-clamp-1">
            {property.title}
          </h3>

          {/* Phụ đề mô tả */}
          <p className="text-xs text-[#5c5c5c] line-clamp-2 leading-relaxed">
            {property.subtitle}
          </p>
        </div>

        {/* Thanh thông số kỹ thuật (Diện tích, số phòng) */}
        <div className="pt-3 sm:pt-4 border-t border-black/5 flex items-center justify-between text-[11px] sm:text-xs text-[#5c5c5c]">
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="flex items-center gap-1" title="Diện tích">
              <Maximize2 className="w-3.5 h-3.5 text-[#b8864a] shrink-0" /> {property.area}
            </span>
            <span className="flex items-center gap-1" title="Phòng ngủ">
              <BedDouble className="w-3.5 h-3.5 text-[#b8864a] shrink-0" /> {property.bedrooms} PN
            </span>
            <span className="flex items-center gap-1" title="Phòng tắm">
              <Bath className="w-3.5 h-3.5 text-[#b8864a] shrink-0" /> {property.bathrooms} PT
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#121212] text-white flex items-center justify-center group-hover:bg-[#b8864a] group-hover:scale-110 transition-all duration-300 shrink-0"
            aria-label={`Xem chi tiết ${property.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
