'use client';

import React, { useState, useMemo } from 'react';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import PropertyModal from '@/components/admin/properties/PropertyModal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PROPERTIES } from '@/data/properties';
import { CATEGORIES } from '@/data/categories';
import { Property, PropertyStatus } from '@/types/property';
import { useToast } from '@/context/ToastContext';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 10;

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string; title: string }>({
    isOpen: false,
    id: '',
    title: '',
  });

  const { showToast } = useToast();

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      const matchCat = selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'Tất cả' || item.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q);

      return matchCat && matchStatus && matchSearch;
    });
  }, [properties, selectedCategory, selectedStatus, searchQuery]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages] as (number | 'ellipsis')[];
    }
    if (currentPage >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as (number | 'ellipsis')[];
    }
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages] as (number | 'ellipsis')[];
  }, [currentPage, totalPages]);

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleSaveProperty = (formData: Partial<Property>) => {
    if (editingProperty) {
      // Cập nhật BĐS
      setProperties((prev) =>
        prev.map((item) => (item.id === editingProperty.id ? ({ ...item, ...formData } as Property) : item))
      );
      showToast({
        type: 'success',
        title: 'Đã cập nhật bất động sản!',
        description: `Thông tin dinh thự "${formData.title}" đã được lưu thành công.`,
      });
    } else {
      // Thêm mới BĐS
      const newId = `prop-${Date.now()}`;
      const newProperty: Property = {
        id: newId,
        slug: formData.slug || `loistiq-${Date.now()}`,
        title: formData.title || 'Dinh Thự Mới',
        subtitle: formData.subtitle || 'Tuyệt tác bất động sản nghỉ dưỡng',
        category: formData.category || 'Dinh Thự Ven Biển',
        price: formData.price || '100 Tỷ VNĐ',
        rawPrice: formData.rawPrice || 100,
        location: formData.location || 'Phú Quốc',
        address: formData.address || 'Bãi Trường, Phú Quốc',
        city: formData.city || 'Phú Quốc',
        status: formData.status || 'Đang mở bán',
        heroImage: formData.heroImage || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
        galleryImages: formData.galleryImages && formData.galleryImages.length > 0 
          ? formData.galleryImages 
          : [formData.heroImage || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'],
        sketchfabModelUrl: formData.sketchfabModelUrl,
        virtualTour360Url: formData.virtualTour360Url,
        area: formData.area || '1,000 m²',
        bedrooms: formData.bedrooms ?? 4,
        bathrooms: formData.bathrooms ?? 5,
        floors: formData.floors ?? 3,
        yearBuilt: formData.yearBuilt ?? 2026,
        description: formData.description && formData.description.length > 0
          ? formData.description
          : ['Tuyệt tác kiến trúc hiện đại mang đậm dấu ấn cá nhân.'],
        highlights: formData.highlights && formData.highlights.length > 0
          ? formData.highlights
          : ['Tầm nhìn panorama đại dương', 'Hồ bơi vô cực nước mặn', 'Bến du thuyền riêng'],
        features: formData.features && formData.features.length > 0
          ? formData.features
          : [
              { icon: 'Maximize', label: 'Diện tích', value: formData.area || '1,000 m²' },
              { icon: 'Bed', label: 'Phòng ngủ', value: `${formData.bedrooms || 4} PN` },
              { icon: 'Bath', label: 'Phòng tắm', value: `${formData.bathrooms || 5} PT` },
            ],
        amenities: formData.amenities && formData.amenities.length > 0
          ? formData.amenities
          : [
              { name: 'Hồ bơi riêng', description: 'Hồ bơi tràn viền tầm nhìn đại dương' },
              { name: 'Hầm rượu & Cigar Lounge', description: 'Không gian thưởng thức riêng tư' },
            ],
        floorPlans: formData.floorPlans || [],
        architect: formData.architect || {
          name: 'Marco Rossi',
          role: 'Kiến Trúc Sư Trưởng LOISTIQ',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          quote: 'Mỗi chi tiết đều được may đo riêng cho gia chủ thượng lưu.',
        },
        featuredInCarousel: formData.featuredInCarousel ?? false,
        bentoSize: formData.bentoSize || 'small',
      };

      setProperties((prev) => [newProperty, ...prev]);
      showToast({
        type: 'success',
        title: 'Đã thêm bất động sản mới!',
        description: `Dinh thự "${newProperty.title}" đã được niêm yết vào danh mục.`,
      });
    }
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      id,
      title,
    });
  };

  const confirmDeleteProperty = () => {
    if (!deleteDialog.id) return;
    setProperties((prev) => prev.filter((item) => item.id !== deleteDialog.id));
    showToast({
      type: 'info',
      title: 'Đã xóa bất động sản',
      description: `Dinh thự "${deleteDialog.title}" đã được gỡ khỏi danh sách hiển thị.`,
    });
  };

  const handleChangeStatus = (id: string, newStatus: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast({
      type: 'success',
      title: 'Đổi trạng thái thành công',
      description: `Bất động sản đã chuyển sang trạng thái: ${newStatus}`,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Quản Lý Bất Động Sản"
        subtitle={`Tổng cộng ${properties.length} dinh thự & căn hộ độc bản trong hệ thống`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 pb-12">
        {/* Thanh công cụ: Tìm kiếm, Bộ lọc & Nút Thêm mới */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-black/5 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm tên dinh thự, thành phố..."
                className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl py-2 pl-9 pr-4 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Category */}
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full sm:w-auto bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Filter Status */}
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full sm:w-auto bg-[#F8F7F3] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
            >
              <option value="Tất cả">Tất cả trạng thái</option>
              <option value="Đang mở bán">Đang mở bán</option>
              <option value="Độc quyền">Độc quyền</option>
              <option value="Sắp ra mắt">Sắp ra mắt</option>
              <option value="Đã bàn giao">Đã bàn giao</option>
            </select>
          </div>

          {/* Button Thêm mới */}
          <button
            onClick={handleOpenAdd}
            className="w-full sm:w-auto bg-[#121212] hover:bg-[#b8864a] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Dinh Thự Mới</span>
          </button>
        </div>

        {/* Bảng danh sách BĐS */}
        <div className="bg-white rounded-3xl sm:rounded-4xl border border-black/5 shadow-xs overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-black/5 text-[#7a7a7a] font-semibold">
                  <th className="py-3.5 pl-6 pr-4">Bất Động Sản</th>
                  <th className="py-3.5 px-4">Danh Mục</th>
                  <th className="py-3.5 px-4">Mức Giá</th>
                  <th className="py-3.5 px-4">Vị Trí</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 pr-6 pl-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {paginatedProperties.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                    {/* Ảnh & Tên */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.heroImage}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                        />
                        <div className="max-w-xs">
                          <div className="font-semibold text-[#121212] truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#7a7a7a] truncate mt-0.5">
                            {item.area} • {item.bedrooms} PN • {item.bathrooms} PT
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Danh mục */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#121212]/5 text-[#333333] text-[11px] font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Giá */}
                    <td className="py-4 px-4 font-bold text-[#8c5a1e] text-sm">
                      {item.price}
                    </td>

                    {/* Vị trí */}
                    <td className="py-4 px-4 text-[#5c5c5c]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                        <span className="truncate max-w-35">{item.city}</span>
                      </div>
                    </td>

                    {/* Trạng thái Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleChangeStatus(item.id, e.target.value as PropertyStatus)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border border-black/10 focus:outline-none cursor-pointer ${
                          item.status === 'Độc quyền'
                            ? 'bg-[#b8864a] text-white'
                            : item.status === 'Đang mở bán'
                            ? 'bg-emerald-50 text-emerald-700'
                            : item.status === 'Sắp ra mắt'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="Đang mở bán">Đang mở bán</option>
                        <option value="Độc quyền">Độc quyền</option>
                        <option value="Sắp ra mắt">Sắp ra mắt</option>
                        <option value="Đã bàn giao">Đã bàn giao</option>
                      </select>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 pr-6 pl-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/properties/${item.id}`}
                          target="_blank"
                          title="Xem trang thực tế"
                          className="p-1.5 rounded-lg border border-black/10 hover:bg-[#FAF7F2] text-[#5c5c5c] hover:text-[#121212] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Chỉnh sửa"
                          className="p-1.5 rounded-lg border border-black/10 hover:bg-[#FAF7F2] text-[#5c5c5c] hover:text-[#121212] transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          title="Xóa bất động sản"
                          className="p-1.5 rounded-lg border border-black/10 hover:bg-rose-50 text-[#5c5c5c] hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProperties.length === 0 && (
            <div className="py-12 text-center text-xs text-[#7a7a7a] space-y-2">
              <Building2 className="w-8 h-8 mx-auto text-[#b8864a]/50" />
              <p>Không tìm thấy bất động sản nào khớp với tiêu chí tìm kiếm.</p>
            </div>
          )}

          {/* Phân trang Admin (10 cái / trang) */}
          <div className="p-4 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF7F2]/40">
            <div className="text-xs text-[#7a7a7a]">
              Hiển thị{' '}
              <strong className="text-[#121212]">
                {filteredProperties.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} -{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}
              </strong>{' '}
              trong tổng số <strong className="text-[#121212]">{filteredProperties.length}</strong> bất động sản
            </div>

            {totalPages > 1 && (
              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {pageNumbers.map((page, idx) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Property Modal */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProperty}
        initialData={editingProperty}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, id: '', title: '' })}
        onConfirm={confirmDeleteProperty}
        title="Xác nhận xóa bất động sản"
        message={`Quý khách có chắc chắn muốn xóa dinh thự "${deleteDialog.title}" khỏi hệ thống LOISTIQ không? Hành động này không thể hoàn tác.`}
        confirmText="Xóa bất động sản"
        cancelText="Giữ lại"
        isDestructive={true}
      />
    </div>
  );
}
