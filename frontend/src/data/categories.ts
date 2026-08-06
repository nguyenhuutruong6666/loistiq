import { PropertyCategory } from '@/types/property';

/**
 * Danh sách phân loại danh mục bất động sản cao cấp LOISTIQ
 */
export const CATEGORIES: readonly string[] = [
  'Tất cả',
  'Dinh Thự Ven Biển',
  'Penthouse Hoàng Gia',
  'Sky Villa Đẳng Cấp',
  'Biệt Thự Đồi Thông',
  'Căn Hộ Nghệ Thuật',
  'Dinh Thự Sinh Thái',
] as const;

/**
 * Danh sách các danh mục thực tế (không gồm 'Tất cả')
 */
export const PURE_CATEGORIES: readonly PropertyCategory[] = [
  'Dinh Thự Ven Biển',
  'Penthouse Hoàng Gia',
  'Sky Villa Đẳng Cấp',
  'Biệt Thự Đồi Thông',
  'Căn Hộ Nghệ Thuật',
  'Dinh Thự Sinh Thái',
] as const;
