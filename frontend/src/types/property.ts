//Định nghĩa các loại danh mục bất động sản cao cấp
export type PropertyCategory =
  | 'Dinh Thự Ven Biển'
  | 'Penthouse Hoàng Gia'
  | 'Sky Villa Đẳng Cấp'
  | 'Biệt Thự Đồi Thông'
  | 'Căn Hộ Nghệ Thuật'
  | 'Dinh Thự Sinh Thái';

//Trạng thái mở bán của bất động sản
export type PropertyStatus = 'Đang mở bán' | 'Độc quyền' | 'Sắp ra mắt' | 'Đã bàn giao';

//Thông số kỹ thuật đặc trưng của bất động sản
export interface PropertyFeature {
  icon: string;
  label: string;
  value: string;
}

//Tiện ích cao cấp đi kèm
export interface PropertyAmenity {
  name: string;
  description: string;
  icon?: string;
}

//Sơ đồ mặt bằng các tầng
export interface PropertyFloorPlan {
  name: string;
  area: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
}

//Kích thước hiển thị dạng Bento Grid
export type PropertyBentoSize = 'large' | 'small' | 'wide';

//Giao diện cấu trúc đầy đủ của một bất động sản
export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: PropertyCategory;
  price: string;
  rawPrice: number; 
  location: string;
  address: string;
  city: string;
  status: PropertyStatus;
  heroImage: string;
  galleryImages: string[];
  sketchfabModelUrl?: string; 
  virtualTour360Url?: string; 
  area: string;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  yearBuilt: number;
  description: string[];
  highlights: string[];
  features: PropertyFeature[];
  amenities: PropertyAmenity[];
  floorPlans: PropertyFloorPlan[];
  architect: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
  featuredInCarousel?: boolean;
  bentoSize?: PropertyBentoSize;
}

