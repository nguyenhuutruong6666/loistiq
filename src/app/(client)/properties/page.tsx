'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROPERTIES, CATEGORIES, LOCATIONS } from '@/data/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import { Search, RotateCcw, Building2, Sparkles } from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Tất cả';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState<string>('Tất cả vị trí');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'all' | 'asc' | 'desc'>('all');

  // Lọc và sắp xếp danh sách bất động sản theo tiêu chí người dùng
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Lọc theo danh mục
      const matchesCategory =
        selectedCategory === 'Tất cả' || p.category === selectedCategory;

      // Lọc theo vị trí địa lý / thành phố
      const matchesLocation =
        selectedLocation === 'Tất cả vị trí' || p.city === selectedLocation;

      // Tìm kiếm theo từ khóa
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query);

      return matchesCategory && matchesLocation && matchesSearch;
    }).sort((a, b) => {
      if (priceSort === 'asc') return a.rawPrice - b.rawPrice;
      if (priceSort === 'desc') return b.rawPrice - a.rawPrice;
      return 0;
    });
  }, [selectedCategory, selectedLocation, searchQuery, priceSort]);

  // Đặt lại toàn bộ bộ lọc về trạng thái ban đầu
  const handleResetFilters = () => {
    setSelectedCategory('Tất cả');
    setSelectedLocation('Tất cả vị trí');
    setSearchQuery('');
    setPriceSort('all');
  };

  return (
    <div className="py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-10">
      {/* Tiêu đề trang & Giới thiệu */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b8864a]/10 border border-[#8c5a1e]/30 text-[#8c5a1e] text-[10px] sm:text-xs font-semibold uppercase tracking-[2px]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Danh Mục Độc Quyền</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight">
          Bộ Sưu Tập Bất Động Sản Hạng Sang
        </h1>
        <p className="text-xs sm:text-base text-[#5c5c5c] leading-relaxed">
          Tuyển tập những dinh thự ven biển, Penthouse và Sky Villa mang kiến trúc độc bản tại các vị trí đắt giá nhất Việt Nam.
        </p>
      </div>

      {/* Thanh tìm kiếm & Bộ lọc */}
      <div className="bg-white p-4 sm:p-8 rounded-[20px] sm:rounded-[28px] border border-black/5 shadow-lg space-y-4 sm:space-y-6">
        {/* Tìm kiếm theo từ khóa & Chọn khu vực */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Ô nhập từ khóa tìm kiếm */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#7a7a7a] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên dinh thự, thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-full py-2.5 sm:py-3 pl-11 pr-4 text-xs sm:text-sm text-[#121212] placeholder-[#7a7a7a] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            />
          </div>

          {/* Lựa chọn thành phố / vị trí */}
          <div className="md:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sắp xếp theo mức giá */}
          <div className="md:col-span-3">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as 'all' | 'asc' | 'desc')}
              className="w-full bg-[#F8F7F3] border border-black/10 rounded-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            >
              <option value="all">Sắp xếp: Mặc định</option>
              <option value="asc">Giá: Thấp đến cao</option>
              <option value="desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Các nút bấm chọn nhanh danh mục (Hỗ trợ lướt cuộn ngang mượt mà trên di động) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-black/5 -mx-2 px-2 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#121212] text-white shadow-md'
                    : 'bg-[#F8F7F3] text-[#5c5c5c] hover:text-[#121212] hover:bg-[#EFECE5]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Thống kê số lượng kết quả và nút hoàn tác */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7a7a7a] pt-1">
          <span>
            Hiển thị <strong>{filteredProperties.length}</strong> bất động sản phù hợp
          </span>

          {(selectedCategory !== 'Tất cả' ||
            selectedLocation !== 'Tất cả vị trí' ||
            searchQuery !== '' ||
            priceSort !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#8c5a1e] hover:underline font-medium"
            >
              <RotateCcw className="w-3 h-3" /> Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Lưới danh sách các bất động sản */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20 bg-white rounded-3xl sm:rounded-4xl border border-black/5 p-6 sm:p-8 space-y-4">
          <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#b8864a] mx-auto opacity-70" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
            Không tìm thấy bất động sản phù hợp
          </h3>
          <p className="text-xs sm:text-sm text-[#7a7a7a] max-w-md mx-auto">
            Vui lòng thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để xem thêm các dinh thự hiện có.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 bg-[#121212] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-medium hover:bg-[#333333] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Xem lại toàn bộ dự án
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Trang chính bộ sưu tập bất động sản với Suspense boundary
 */
export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-[#7a7a7a]">Đang tải danh mục...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
