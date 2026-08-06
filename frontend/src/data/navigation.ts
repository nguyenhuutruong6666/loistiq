export interface NavLink {
  name: string;
  href: string;
}

//Danh sách liên kết điều hướng chính của website LOISTIQ
export const NAV_LINKS: NavLink[] = [
  { name: 'Trang Chủ', href: '/' },
  { name: 'Bộ Sưu Tập', href: '/properties' },
  { name: 'Trải Nghiệm 3D', href: '/experience-3d' },
  { name: 'Triết Lý Kiến Trúc', href: '/philosophy' },
  { name: 'Liên Hệ', href: '/contact' },
];

//Danh sách danh mục bộ sưu tập hiển thị ở Footer
export const FOOTER_COLLECTION_LINKS: NavLink[] = [
  { name: 'Dinh Thự Ven Biển', href: '/properties?category=Dinh+Thự+Ven+Biển' },
  { name: 'Penthouse Hoàng Gia', href: '/properties?category=Penthouse+Hoàng+Gia' },
  { name: 'Sky Villa Đẳng Cấp', href: '/properties?category=Sky+Villa+Đẳng+Cấp' },
  { name: 'Biệt Thự Đồi Thông', href: '/properties?category=Biệt+Thự+Đồi+Thông' },
  { name: 'Dinh Thự Sinh Thái', href: '/properties?category=Dinh+Thự+Sinh+Thái' },
];

//Danh sách dịch vụ đặc quyền hiển thị ở Footer
export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { name: 'Phòng Chiếu 3D & VR Tour', href: '/experience-3d' },
  { name: 'Triết Lý Kiến Trúc', href: '/philosophy' },
];
