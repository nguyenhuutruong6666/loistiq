import { Property } from '@/types/property';

export const PROPERTIES: Property[] = [
  {
    id: 'loistiq-grand-ocean-villa',
    slug: 'loistiq-grand-ocean-villa',
    title: 'The Grand Ocean Sanctuary',
    subtitle: 'Dinh thự mặt biển với bến du thuyền riêng & hồ bơi vô cực chân mây',
    category: 'Dinh Thự Ven Biển',
    price: '185 Tỷ VNĐ',
    rawPrice: 185,
    location: 'Bãi Trường, Phú Quốc',
    address: 'Đại lộ Hoàng Hôn, Bãi Trường, Dương Tơ, TP. Phú Quốc',
    city: 'Phú Quốc',
    status: 'Độc quyền',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    ],
    sketchfabModelUrl: 'https://sketchfab.com/models/e30700a3565f41e3bd6c2751eccfe5f5/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2',
    area: '1,250 m²',
    bedrooms: 6,
    bathrooms: 8,
    floors: 3,
    yearBuilt: 2025,
    description: [
      'The Grand Ocean Sanctuary là biểu tượng đỉnh cao của phong cách sống thượng lưu bên bờ đại dương trong xanh.',
      'Sở hữu bãi biển riêng tư dài hơn 50m, kiến trúc mở ngập tràn ánh sáng nhiệt đới cùng hệ kính Low-E tràn viền kịch trần mang toàn bộ vẻ đẹp hoàng hôn vào từng góc phòng.',
      'Từng chi tiết được hoàn thiện thủ công với đá cẩm thạch Calacatta Ý, gỗ Teak nguyên khối và hệ thống smarthome điều khiển thông minh chuẩn 5 sao quốc tế.'
    ],
    highlights: [
      'Hồ bơi vô cực nước mặn tràn bờ 120 m² nối liền đại dương',
      'Bến đỗ du thuyền tư nhân chuẩn quốc tế',
      'Hầm rượu vang nhiệt độ chuẩn lưu trữ 1,500 chai',
      'Rạp chiếu phim tư gia Dolby Atmos 12 ghế da cao cấp',
      'Khu vực chăm sóc sức khỏe Spa & Sauna đá muối Himalaya riêng biệt'
    ],
    features: [
      { icon: 'Maximize', label: 'Diện tích khuôn viên', value: '1,250 m²' },
      { icon: 'Home', label: 'Diện tích xây dựng', value: '780 m²' },
      { icon: 'Bed', label: 'Phòng ngủ Master', value: '6 Suites' },
      { icon: 'Bath', label: 'Phòng tắm cao cấp', value: '8 Phòng' },
      { icon: 'Compass', label: 'Hướng phong thủy', value: 'Tây Nam - View Biển' },
      { icon: 'ShieldCheck', label: 'Pháp lý', value: 'Sở hữu lâu dài (Sổ đỏ)' }
    ],
    amenities: [
      { name: 'Bến du thuyền riêng', description: 'Cầu tàu tư nhân đón du thuyền dài tới 60 feet' },
      { name: 'Hồ bơi vô cực 3 tầng', description: 'Nước ấm lọc điện phân muối khoáng thiên nhiên' },
      { name: 'Dịch vụ Butler 24/7', description: 'Đội ngũ quản gia chuyên nghiệp đào tạo theo chuẩn Anh Quốc' },
      { name: 'Bãi đáp trực thăng', description: 'Cách bãi đáp Helipad chỉ 3 phút di chuyển' }
    ],
    floorPlans: [
      { name: 'Mặt bằng Tầng Trệt - Đại sảnh & Hồ bơi', area: '380 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 1, bathrooms: 2 },
      { name: 'Mặt bằng Tầng 2 - Master Suites & Ban công', area: '260 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', bedrooms: 3, bathrooms: 3 },
      { name: 'Mặt bằng Tầng 3 - Sky Lounge & Rooftop Garden', area: '140 m²', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', bedrooms: 2, bathrooms: 3 }
    ],
    architect: {
      name: 'KTS. Jean-Luc Moreau',
      role: 'Kiến trúc sư trưởng - Moreau & Associates',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      quote: 'Kiến trúc không chỉ là những bức tường vững chãi, mà là sự hòa quyện tuyệt đối giữa đại dương hùng vĩ và tâm hồn con người.'
    },
    featuredInCarousel: true,
    bentoSize: 'large'
  },
  {
    id: 'loistiq-the-zenith-sky-penthouse',
    slug: 'loistiq-the-zenith-sky-penthouse',
    title: 'The Zenith Sky Penthouse',
    subtitle: 'Tuyệt tác Penthouse 3 tầng trên đỉnh tháp ngắm trọn toàn cảnh Landmark 81 & Sông Sài Gòn',
    category: 'Penthouse Hoàng Gia',
    price: '120 Tỷ VNĐ',
    rawPrice: 120,
    location: 'Thủ Thiêm, TP. Thủ Đức, TP.HCM',
    address: 'Tầng 42-45 Tháp The Crown, Đại lộ Mai Chí Thọ, Thủ Thiêm',
    city: 'TP. Hồ Chí Minh',
    status: 'Đang mở bán',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    sketchfabModelUrl: 'https://sketchfab.com/models/8d913bda48f84217902e6829982c494f/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2',
    area: '620 m²',
    bedrooms: 4,
    bathrooms: 5,
    floors: 3,
    yearBuilt: 2026,
    description: [
      'The Zenith Sky Penthouse tọa lạc tại tầng cao nhất của biểu tượng kiến trúc Thủ Thiêm, mang đến góc nhìn panorama 360 độ ôm trọn vẹn sự phồn hoa của trung tâm Sài Gòn.',
      'Thiết kế thông tầng ấn tượng với chiều cao trần lên tới 7.2m, cầu thang xoắn ốc điêu khắc bằng titan nguyên khối, và ban công chân mây có bể sục Jacuzzi kính chịu lực ngắm pháo hoa lễ hội.'
    ],
    highlights: [
      'Tầm nhìn panorama 360 độ hướng sông Sài Gòn và trung tâm Quận 1',
      'Thang máy riêng biệt bảo mật thẻ từ sinh trắc học FaceID',
      'Bể bơi kính vô cực lưng chừng trời trên độ cao 180m',
      'Nội thất đặt đóng độc bản từ hãng B&B Italia và Poliform'
    ],
    features: [
      { icon: 'Maximize', label: 'Tổng diện tích sàn', value: '620 m²' },
      { icon: 'Bed', label: 'Phòng ngủ hoàng gia', value: '4 Master Suites' },
      { icon: 'Bath', label: 'Phòng tắm dát vàng', value: '5 Phòng' },
      { icon: 'Compass', label: 'Hướng nhìn', value: 'Đông Nam - Trực diện Sông' },
      { icon: 'Layers', label: 'Độ cao trần', value: '7.2 mét thông tầng' },
      { icon: 'ShieldCheck', label: 'Bảo mật', value: 'Vip Private Elevator' }
    ],
    amenities: [
      { name: 'Hồ bơi sục Jacuzzi chân mây', description: 'Nằm tại sân thượng riêng biệt với hệ thống sưởi thông minh' },
      { name: 'Phòng thử Cigar & Rượu quý', description: 'Được cách âm và điều hòa độ ẩm tiêu chuẩn quốc tế' },
      { name: 'Chỗ đỗ xe định danh riêng', description: '02 vị trí đỗ xe rộng rãi tại hầm VIP kèm trạm sạc xe điện nhanh' }
    ],
    floorPlans: [
      { name: 'Tầng 42 - Không gian sinh hoạt chung & Bếp mở', area: '250 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 1, bathrooms: 1 },
      { name: 'Tầng 43 - Phòng ngủ Master & Thư viện', area: '230 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', bedrooms: 3, bathrooms: 3 },
      { name: 'Tầng 44 - Sky Garden & Hồ bơi vô cực', area: '140 m²', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', bedrooms: 0, bathrooms: 1 }
    ],
    architect: {
      name: 'KTS. Nguyễn Văn Lợi',
      role: 'Giám đốc Thiết kế Sáng tạo LOISTIQ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      quote: 'Sống trên tầng cao là trải nghiệm ngắm nhìn thế giới chuyển động chậm lại trong khi giữ trọn sự tĩnh lặng tuyệt đối cho tâm hồn.'
    },
    featuredInCarousel: true,
    bentoSize: 'small'
  },
  {
    id: 'loistiq-pine-hill-mansion',
    slug: 'loistiq-pine-hill-mansion',
    title: 'The Pine Hill Estate',
    subtitle: 'Dinh thự sinh thái nghỉ dưỡng ẩn mình giữa rừng thông cổ thụ Đà Lạt',
    category: 'Biệt Thự Đồi Thông',
    price: '95 Tỷ VNĐ',
    rawPrice: 95,
    location: 'Đồi Dinh 1, TP. Đà Lạt',
    address: 'Đường Trần Quang Diệu, Phường 10, TP. Đà Lạt, Lâm Đồng',
    city: 'Đà Lạt',
    status: 'Độc quyền',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200'
    ],
    area: '2,500 m²',
    bedrooms: 5,
    bathrooms: 6,
    floors: 2,
    yearBuilt: 2024,
    description: [
      'The Pine Hill Estate được lấy cảm hứng từ kiến trúc Bắc Âu giao thoa với phong cách biệt thự Pháp cổ kính đặc trưng của xứ sở sương mù.',
      'Sở hữu khuôn viên vườn thông nguyên sinh rộng hơn 2.500m², lò sưởi đốt củi phong cách cổ điển, suối nước tự nhiên uốn lượn và nhà kính ngắm sao đêm tinh khôi.'
    ],
    highlights: [
      'Khuôn viên rừng thông nguyên sinh biệt lập 2,500 m²',
      'Nhà kính vọng cảnh ngắm sao đêm 360 độ',
      'Vườn trà hữu cơ & hồ cá Koi tự nhiên',
      'Hệ thống sưởi sàn nhiệt công nghệ Thụy Sĩ bảo đảm ấm áp quanh năm'
    ],
    features: [
      { icon: 'Maximize', label: 'Diện tích đất đồi', value: '2,500 m²' },
      { icon: 'Home', label: 'Diện tích xây dựng', value: '520 m²' },
      { icon: 'Bed', label: 'Phòng ngủ gia đình', value: '5 Phòng' },
      { icon: 'Compass', label: 'Hướng view', value: 'Thung lũng thông reo' },
      { icon: 'Flame', label: 'Tiện ích sưởi', value: 'Lò sưởi củi đá tự nhiên' }
    ],
    amenities: [
      { name: 'Khu lửa trại ngoài trời', description: 'Không gian sum vầy gia đình ấm cúng giữa tiết trời se lạnh' },
      { name: 'Nhà kính thưởng trà', description: 'Trồng các loài hoa quý hiếm xứ ôn đới' }
    ],
    floorPlans: [
      { name: 'Mặt bằng Tầng 1 - Phòng khách lớn & Bếp sưởi', area: '300 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 2, bathrooms: 2 },
      { name: 'Mặt bằng Tầng 2 - Phòng ngủ ngắm thông & Ban công', area: '220 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', bedrooms: 3, bathrooms: 4 }
    ],
    architect: {
      name: 'KTS. Henrik Lindqvist',
      role: 'Chuyên gia Kiến trúc Cảnh quan Sinh thái',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      quote: 'Một ngôi nhà đẹp nhất là ngôi nhà như mọc lên tự nhiên từ lòng đất mẹ, không phá vỡ bất kỳ nhịp thở nào của thiên nhiên.'
    },
    featuredInCarousel: true,
    bentoSize: 'small'
  },
  {
    id: 'loistiq-marina-bay-sky-villa',
    slug: 'loistiq-marina-bay-sky-villa',
    title: 'The Riviera Marina Sky Villa',
    subtitle: 'Biệt thự trên không với sân vườn rộng 200m² view trọn vịnh biển Đà Nẵng',
    category: 'Sky Villa Đẳng Cấp',
    price: '78 Tỷ VNĐ',
    rawPrice: 78,
    location: 'Sơn Trà, TP. Đà Nẵng',
    address: 'Đại lộ Võ Nguyên Giáp, Phường Phước Mỹ, Quận Sơn Trà, Đà Nẵng',
    city: 'Đà Nẵng',
    status: 'Đang mở bán',
    heroImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200'
    ],
    area: '480 m²',
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    yearBuilt: 2025,
    description: [
      'The Riviera Marina Sky Villa là sự kết hợp hoàn mỹ giữa tiện nghi của một biệt thự mặt đất và tầm nhìn thoáng đãng không giới hạn từ trên cao.',
      'Sân vườn treo nhiệt đới riêng biệt rộng 200m² với thảm cỏ xanh mướt, hồ bơi cá nhân và quầy bar BBQ ngoài trời phục vụ những bữa tiệc riêng tư đẳng cấp.'
    ],
    highlights: [
      'Sân vườn treo riêng 200m² trên tầng cao',
      'Tầm nhìn trực diện bãi biển Mỹ Khê và bán đảo Sơn Trà',
      'Bàn giao gói nội thất nhập khẩu từ Ý trị giá 15 Tỷ VNĐ'
    ],
    features: [
      { icon: 'Maximize', label: 'Diện tích tổng thể', value: '480 m²' },
      { icon: 'Bed', label: 'Phòng ngủ Panorama', value: '4 Phòng' },
      { icon: 'Bath', label: 'Phòng tắm kính', value: '4 Phòng' },
      { icon: 'Compass', label: 'Hướng view', value: 'Đông Bắc - Trực diện biển' }
    ],
    amenities: [
      { name: 'Hồ bơi sục vô cực trên không', description: 'Trải nghiệm ngắm trọn bình minh trên biển Đà Nẵng' },
      { name: 'Sân golf 3D trong nhà', description: 'Hệ thống mô phỏng hơn 100 sân golf danh tiếng thế giới' }
    ],
    floorPlans: [
      { name: 'Tầng Duplex 1 - Living Room & Sky Garden', area: '280 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 2, bathrooms: 2 },
      { name: 'Tầng Duplex 2 - Master Suites', area: '200 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', bedrooms: 2, bathrooms: 2 }
    ],
    architect: {
      name: 'KTS. Lê Quang Vũ',
      role: 'Đồng sáng lập LOISTIQ Architecture',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      quote: 'Mỗi mét vuông không gian là một tác phẩm điêu khắc ánh sáng và sự thư giãn tuyệt đối.'
    },
    featuredInCarousel: true,
    bentoSize: 'wide'
  },
  {
    id: 'loistiq-tay-ho-heritage-mansion',
    slug: 'loistiq-tay-ho-heritage-mansion',
    title: 'The Tay Ho Heritage Villa',
    subtitle: 'Dinh thự di sản ven Hồ Tây với kiến trúc Indochine giao hòa tân cổ điển Pháp',
    category: 'Căn Hộ Nghệ Thuật',
    price: '210 Tỷ VNĐ',
    rawPrice: 210,
    location: 'Quảng An, Tây Hồ, Hà Nội',
    address: 'Đường Quảng An, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    city: 'Hà Nội',
    status: 'Độc quyền',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
    ],
    area: '850 m²',
    bedrooms: 5,
    bathrooms: 6,
    floors: 4,
    yearBuilt: 2025,
    description: [
      'The Tay Ho Heritage Villa là tuyệt tác bất động sản danh giá bậc nhất thủ đô, sở hữu vị trí vàng đắt giá tại bán đảo Quảng An thơ mộng.',
      'Sự kết hợp tinh xảo giữa vẻ đẹp hoài niệm của phong cách Đông Dương (Indochine) và sự tiện nghi xa hoa hiện đại.'
    ],
    highlights: [
      'Mặt tiền trực diện Hồ Tây lộng gió',
      'Vườn cảnh quan bonsai Nhật Bản & hồ cá Koi tiền tỷ',
      'Phòng tranh nghệ thuật & không gian tiếp khách ngoại giao'
    ],
    features: [
      { icon: 'Maximize', label: 'Diện tích khuôn viên', value: '850 m²' },
      { icon: 'Home', label: 'Diện tích sử dụng', value: '1,100 m²' },
      { icon: 'Bed', label: 'Phòng ngủ VIP', value: '5 Phòng' },
      { icon: 'Compass', label: 'Hướng phong thủy', value: 'Chính Nam - Sinh tài lộc' }
    ],
    amenities: [
      { name: 'Phòng tiếp khách Ngoại giao', description: 'Được cách âm cao cấp với quầy bar rượu thượng hạng' },
      { name: 'Vườn thiền trà đạo', description: 'Không gian tĩnh tâm ngắm sóng nước Hồ Tây' }
    ],
    floorPlans: [
      { name: 'Tầng 1 - Đại sảnh & Hồ cá Koi', area: '300 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 1, bathrooms: 2 },
      { name: 'Tầng 2 & 3 - Phòng ngủ Master', area: '450 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', bedrooms: 4, bathrooms: 4 }
    ],
    architect: {
      name: 'KTS. Trần Hoàng Bách',
      role: 'Nghệ nhân Kiến trúc Di sản',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      quote: 'Giữ gìn hồn cốt văn hóa Tràng An trong một hình hài đương đại đầy kiêu hãnh.'
    },
    featuredInCarousel: true,
    bentoSize: 'small'
  },
  {
    id: 'loistiq-eco-valley-mansion',
    slug: 'loistiq-eco-valley-mansion',
    title: 'The Eco Valley Mansion',
    subtitle: 'Khu dinh thự sinh thái xanh thuần khiết tại thung lũng Ba Vì',
    category: 'Dinh Thự Sinh Thái',
    price: '65 Tỷ VNĐ',
    rawPrice: 65,
    location: 'Ba Vì, Hà Nội',
    address: 'Thung lũng Bản Xôi, Yên Bài, Ba Vì, Hà Nội',
    city: 'Hà Nội',
    status: 'Sắp ra mắt',
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
    ],
    area: '3,200 m²',
    bedrooms: 6,
    bathrooms: 7,
    floors: 2,
    yearBuilt: 2026,
    description: [
      'Nằm ẩn mình giữa thung lũng Ba Vì thanh bình, The Eco Valley Mansion là thiên đường tái tạo năng lượng cho cả gia đình.',
      'Sử dụng 100% năng lượng mặt trời thông minh, hồ sinh thái tự nhiên và hệ sinh thái vườn cây ăn quả hữu cơ rộng lớn.'
    ],
    highlights: [
      'Khuôn viên xanh tự nhiên hơn 3,200 m²',
      'Hồ bơi tự nhiên lọc nước bằng thực vật sinh học',
      'Trang trại organic riêng biệt cung cấp thực phẩm sạch 365 ngày'
    ],
    features: [
      { icon: 'Maximize', label: 'Tổng diện tích khu đất', value: '3,200 m²' },
      { icon: 'Bed', label: 'Phòng ngủ Biophilic', value: '6 Phòng' },
      { icon: 'Leaf', label: 'Tiêu chuẩn xanh', value: 'LEED Platinum Quốc Tế' },
      { icon: 'Compass', label: 'Hướng nhìn', value: 'Dãy núi Ba Vì hùng vĩ' }
    ],
    amenities: [
      { name: 'Khu Farm-to-Table', description: 'Không gian tiệc nướng dã ngoại với nguyên liệu thu hoạch tại vườn' },
      { name: 'Đường dạo bộ sinh thái', description: 'Đường sỏi tự nhiên dài 500m dưới tán cây cổ thụ' }
    ],
    floorPlans: [
      { name: 'Mặt bằng Tổng thể - Khu sinh hoạt và Nhà khách', area: '650 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', bedrooms: 6, bathrooms: 7 }
    ],
    architect: {
      name: 'KTS. Mai Thảo Linh',
      role: 'Kiến trúc sư Xanh - Green Architecture Hub',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      quote: 'Sự xa xỉ cao nhất trong tương lai chính là không khí trong lành, cây xanh và sự an yên trong tâm hồn.'
    },
    featuredInCarousel: true,
    bentoSize: 'small'
  }
];

/**
 * Dữ liệu các slide hiển thị trên vòng xoay 3D Gallery (Carousel3DGallery)
 */
export const CAROUSEL_GALLERY_ITEMS = [
  { id: 'loistiq-grand-ocean-villa', src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600', label: 'Grand Ocean Sanctuary', category: 'Dinh Thự Biển', price: '185 Tỷ' },
  { id: 'loistiq-the-zenith-sky-penthouse', src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600', label: 'Zenith Sky Penthouse', category: 'Penthouse Hoàng Gia', price: '120 Tỷ' },
  { id: 'loistiq-pine-hill-mansion', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600', label: 'Pine Hill Estate', category: 'Biệt Thự Đồi Thông', price: '95 Tỷ' },
  { id: 'loistiq-marina-bay-sky-villa', src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600', label: 'Riviera Marina Sky Villa', category: 'Sky Villa Đẳng Cấp', price: '78 Tỷ' },
  { id: 'loistiq-tay-ho-heritage-mansion', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', label: 'Tay Ho Heritage Villa', category: 'Dinh Thự Di Sản', price: '210 Tỷ' },
  { id: 'loistiq-eco-valley-mansion', src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600', label: 'Eco Valley Mansion', category: 'Dinh Thự Sinh Thái', price: '65 Tỷ' },
  { id: 'loistiq-the-zenith-sky-penthouse', src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600', label: 'Crown Sky Lounge', category: 'Không Gian Sống', price: 'VIP Club' },
  { id: 'loistiq-grand-ocean-villa', src: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=600', label: 'Infinity Ocean Suite', category: 'Phòng Ngủ Master', price: 'Private' },
  { id: 'loistiq-pine-hill-mansion', src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600', label: 'Nordic Glass Garden', category: 'Nhà Kính Vọng Cảnh', price: 'Exclusive' },
  { id: 'loistiq-marina-bay-sky-villa', src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600', label: 'Sky Duplex Haven', category: 'Kiến Trúc Đương Đại', price: 'Limited' }
];

/**
 * Danh sách phân loại danh mục bất động sản
 */
export const CATEGORIES = [
  'Tất cả',
  'Dinh Thự Ven Biển',
  'Penthouse Hoàng Gia',
  'Sky Villa Đẳng Cấp',
  'Biệt Thự Đồi Thông',
  'Căn Hộ Nghệ Thuật',
  'Dinh Thự Sinh Thái'
];

/**
 * Danh sách các vị trí / thành phố bất động sản trọng điểm
 */
export const LOCATIONS = [
  'Tất cả vị trí',
  'Phú Quốc',
  'TP. Hồ Chí Minh',
  'Đà Lạt',
  'Đà Nẵng',
  'Hà Nội'
];
