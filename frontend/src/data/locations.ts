/**
 * Danh sách các vị trí / thành phố bất động sản trọng điểm của LOISTIQ
 */
export const LOCATIONS: readonly string[] = [
  'Tất cả vị trí',
  'Phú Quốc',
  'TP. Hồ Chí Minh',
  'Đà Lạt',
  'Đà Nẵng',
  'Hà Nội',
  'Nha Trang',
  'Hạ Long',
  'Hội An',
] as const;

/**
 * Danh sách các thành phố / vị trí thực tế (không gồm 'Tất cả vị trí')
 */
export const CITIES: readonly string[] = [
  'Phú Quốc',
  'TP. Hồ Chí Minh',
  'Đà Lạt',
  'Đà Nẵng',
  'Hà Nội',
  'Nha Trang',
  'Hạ Long',
  'Hội An',
] as const;
