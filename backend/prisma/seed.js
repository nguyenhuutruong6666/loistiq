require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const SEED_PROPERTIES = [
  {
    "id": "loistiq-grand-ocean-villa",
    "slug": "loistiq-grand-ocean-villa",
    "title": "The Grand Ocean Sanctuary",
    "subtitle": "Dinh thự mặt biển với bến du thuyền riêng & hồ bơi vô cực chân mây",
    "category": "Dinh Thự Ven Biển",
    "price": "185 Tỷ VNĐ",
    "rawPrice": 185,
    "location": "Bãi Trường, Phú Quốc",
    "address": "Đại lộ Hoàng Hôn, Bãi Trường, Dương Tơ, TP. Phú Quốc",
    "city": "Phú Quốc",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    ],
    "sketchfabModelUrl": "https://sketchfab.com/models/e30700a3565f41e3bd6c2751eccfe5f5/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2",
    "area": "1,250 m²",
    "bedrooms": 6,
    "bathrooms": 8,
    "floors": 3,
    "yearBuilt": 2025,
    "description": [
      "The Grand Ocean Sanctuary là biểu tượng đỉnh cao của phong cách sống thượng lưu bên bờ đại dương trong xanh.",
      "Sở hữu bãi biển riêng tư dài hơn 50m, kiến trúc mở ngập tràn ánh sáng nhiệt đới cùng hệ kính Low-E tràn viền kịch trần mang toàn bộ vẻ đẹp hoàng hôn vào từng góc phòng.",
      "Từng chi tiết được hoàn thiện thủ công với đá cẩm thạch Calacatta Ý, gỗ Teak nguyên khối và hệ thống smarthome điều khiển thông minh chuẩn 5 sao quốc tế."
    ],
    "highlights": [
      "Hồ bơi vô cực nước mặn tràn bờ 120 m² nối liền đại dương",
      "Bến đỗ du thuyền tư nhân chuẩn quốc tế",
      "Hầm rượu vang nhiệt độ chuẩn lưu trữ 1,500 chai",
      "Rạp chiếu phim tư gia Dolby Atmos 12 ghế da cao cấp",
      "Khu vực chăm sóc sức khỏe Spa & Sauna đá muối Himalaya riêng biệt"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích khuôn viên",
        "value": "1,250 m²"
      },
      {
        "icon": "Home",
        "label": "Diện tích xây dựng",
        "value": "780 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Master",
        "value": "6 Suites"
      },
      {
        "icon": "Bath",
        "label": "Phòng tắm cao cấp",
        "value": "8 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng phong thủy",
        "value": "Tây Nam - View Biển"
      },
      {
        "icon": "ShieldCheck",
        "label": "Pháp lý",
        "value": "Sở hữu lâu dài (Sổ đỏ)"
      }
    ],
    "amenities": [
      {
        "name": "Bến du thuyền riêng",
        "description": "Cầu tàu tư nhân đón du thuyền dài tới 60 feet"
      },
      {
        "name": "Hồ bơi vô cực 3 tầng",
        "description": "Nước ấm lọc điện phân muối khoáng thiên nhiên"
      },
      {
        "name": "Dịch vụ Butler 24/7",
        "description": "Đội ngũ quản gia chuyên nghiệp đào tạo theo chuẩn Anh Quốc"
      },
      {
        "name": "Bãi đáp trực thăng",
        "description": "Cách bãi đáp Helipad chỉ 3 phút di chuyển"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng Tầng Trệt - Đại sảnh & Hồ bơi",
        "area": "380 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Mặt bằng Tầng 2 - Master Suites & Ban công",
        "area": "260 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 3
      },
      {
        "name": "Mặt bằng Tầng 3 - Sky Lounge & Rooftop Garden",
        "area": "140 m²",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 3
      }
    ],
    "architect": {
      "name": "KTS. Jean-Luc Moreau",
      "role": "Kiến trúc sư trưởng - Moreau & Associates",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Kiến trúc không chỉ là những bức tường vững chãi, mà là sự hòa quyện tuyệt đối giữa đại dương hùng vĩ và tâm hồn con người."
    },
    "featuredInCarousel": true,
    "bentoSize": "large"
  },
  {
    "id": "loistiq-the-zenith-sky-penthouse",
    "slug": "loistiq-the-zenith-sky-penthouse",
    "title": "The Zenith Sky Penthouse",
    "subtitle": "Tuyệt tác Penthouse 3 tầng trên đỉnh tháp ngắm trọn toàn cảnh Landmark 81 & Sông Sài Gòn",
    "category": "Penthouse Hoàng Gia",
    "price": "120 Tỷ VNĐ",
    "rawPrice": 120,
    "location": "Thủ Thiêm, TP. Thủ Đức, TP.HCM",
    "address": "Tầng 42-45 Tháp The Crown, Đại lộ Mai Chí Thọ, Thủ Thiêm",
    "city": "TP. Hồ Chí Minh",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    ],
    "sketchfabModelUrl": "https://sketchfab.com/models/8d913bda48f84217902e6829982c494f/embed?ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&ui_vr=0&preload=1&autostart=1&ui_hint=2&autospin=0.2",
    "area": "620 m²",
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 3,
    "yearBuilt": 2026,
    "description": [
      "The Zenith Sky Penthouse tọa lạc tại tầng cao nhất của biểu tượng kiến trúc Thủ Thiêm, mang đến góc nhìn panorama 360 độ ôm trọn vẹn sự phồn hoa của trung tâm Sài Gòn.",
      "Thiết kế thông tầng ấn tượng với chiều cao trần lên tới 7.2m, cầu thang xoắn ốc điêu khắc bằng titan nguyên khối, và ban công chân mây có bể sục Jacuzzi kính chịu lực ngắm pháo hoa lễ hội."
    ],
    "highlights": [
      "Tầm nhìn panorama 360 độ hướng sông Sài Gòn và trung tâm Quận 1",
      "Thang máy riêng biệt bảo mật thẻ từ sinh trắc học FaceID",
      "Bể bơi kính vô cực lưng chừng trời trên độ cao 180m",
      "Nội thất đặt đóng độc bản từ hãng B&B Italia và Poliform"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Tổng diện tích sàn",
        "value": "620 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ hoàng gia",
        "value": "4 Master Suites"
      },
      {
        "icon": "Bath",
        "label": "Phòng tắm dát vàng",
        "value": "5 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Đông Nam - Trực diện Sông"
      },
      {
        "icon": "Layers",
        "label": "Độ cao trần",
        "value": "7.2 mét thông tầng"
      },
      {
        "icon": "ShieldCheck",
        "label": "Bảo mật",
        "value": "Vip Private Elevator"
      }
    ],
    "amenities": [
      {
        "name": "Hồ bơi sục Jacuzzi chân mây",
        "description": "Nằm tại sân thượng riêng biệt với hệ thống sưởi thông minh"
      },
      {
        "name": "Phòng thử Cigar & Rượu quý",
        "description": "Được cách âm và điều hòa độ ẩm tiêu chuẩn quốc tế"
      },
      {
        "name": "Chỗ đỗ xe định danh riêng",
        "description": "02 vị trí đỗ xe rộng rãi tại hầm VIP kèm trạm sạc xe điện nhanh"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 42 - Không gian sinh hoạt chung & Bếp mở",
        "area": "250 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 1
      },
      {
        "name": "Tầng 43 - Phòng ngủ Master & Thư viện",
        "area": "230 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 3
      },
      {
        "name": "Tầng 44 - Sky Garden & Hồ bơi vô cực",
        "area": "140 m²",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 0,
        "bathrooms": 1
      }
    ],
    "architect": {
      "name": "KTS. Nguyễn Văn Lợi",
      "role": "Giám đốc Thiết kế Sáng tạo LOISTIQ",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "quote": "Sống trên tầng cao là trải nghiệm ngắm nhìn thế giới chuyển động chậm lại trong khi giữ trọn sự tĩnh lặng tuyệt đối cho tâm hồn."
    },
    "featuredInCarousel": true,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-pine-hill-mansion",
    "slug": "loistiq-pine-hill-mansion",
    "title": "The Pine Hill Estate",
    "subtitle": "Dinh thự sinh thái nghỉ dưỡng ẩn mình giữa rừng thông cổ thụ Đà Lạt",
    "category": "Biệt Thự Đồi Thông",
    "price": "95 Tỷ VNĐ",
    "rawPrice": 95,
    "location": "Đồi Dinh 1, TP. Đà Lạt",
    "address": "Đường Trần Quang Diệu, Phường 10, TP. Đà Lạt, Lâm Đồng",
    "city": "Đà Lạt",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "2,500 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 2,
    "yearBuilt": 2024,
    "description": [
      "The Pine Hill Estate được lấy cảm hứng từ kiến trúc Bắc Âu giao thoa với phong cách biệt thự Pháp cổ kính đặc trưng của xứ sở sương mù.",
      "Sở hữu khuôn viên vườn thông nguyên sinh rộng hơn 2.500m², lò sưởi đốt củi phong cách cổ điển, suối nước tự nhiên uốn lượn và nhà kính ngắm sao đêm tinh khôi."
    ],
    "highlights": [
      "Khuôn viên rừng thông nguyên sinh biệt lập 2,500 m²",
      "Nhà kính vọng cảnh ngắm sao đêm 360 độ",
      "Vườn trà hữu cơ & hồ cá Koi tự nhiên",
      "Hệ thống sưởi sàn nhiệt công nghệ Thụy Sĩ bảo đảm ấm áp quanh năm"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích đất đồi",
        "value": "2,500 m²"
      },
      {
        "icon": "Home",
        "label": "Diện tích xây dựng",
        "value": "520 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ gia đình",
        "value": "5 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng view",
        "value": "Thung lũng thông reo"
      },
      {
        "icon": "Flame",
        "label": "Tiện ích sưởi",
        "value": "Lò sưởi củi đá tự nhiên"
      }
    ],
    "amenities": [
      {
        "name": "Khu lửa trại ngoài trời",
        "description": "Không gian sum vầy gia đình ấm cúng giữa tiết trời se lạnh"
      },
      {
        "name": "Nhà kính thưởng trà",
        "description": "Trồng các loài hoa quý hiếm xứ ôn đới"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng Tầng 1 - Phòng khách lớn & Bếp sưởi",
        "area": "300 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Mặt bằng Tầng 2 - Phòng ngủ ngắm thông & Ban công",
        "area": "220 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Henrik Lindqvist",
      "role": "Chuyên gia Kiến trúc Cảnh quan Sinh thái",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      "quote": "Một ngôi nhà đẹp nhất là ngôi nhà như mọc lên tự nhiên từ lòng đất mẹ, không phá vỡ bất kỳ nhịp thở nào của thiên nhiên."
    },
    "featuredInCarousel": true,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-marina-bay-sky-villa",
    "slug": "loistiq-marina-bay-sky-villa",
    "title": "The Riviera Marina Sky Villa",
    "subtitle": "Biệt thự trên không với sân vườn rộng 200m² view trọn vịnh biển Đà Nẵng",
    "category": "Sky Villa Đẳng Cấp",
    "price": "78 Tỷ VNĐ",
    "rawPrice": 78,
    "location": "Sơn Trà, TP. Đà Nẵng",
    "address": "Đại lộ Võ Nguyên Giáp, Phường Phước Mỹ, Quận Sơn Trà, Đà Nẵng",
    "city": "Đà Nẵng",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "480 m²",
    "bedrooms": 4,
    "bathrooms": 4,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Riviera Marina Sky Villa là sự kết hợp hoàn mỹ giữa tiện nghi của một biệt thự mặt đất và tầm nhìn thoáng đãng không giới hạn từ trên cao.",
      "Sân vườn treo nhiệt đới riêng biệt rộng 200m² với thảm cỏ xanh mướt, hồ bơi cá nhân và quầy bar BBQ ngoài trời phục vụ những bữa tiệc riêng tư đẳng cấp."
    ],
    "highlights": [
      "Sân vườn treo riêng 200m² trên tầng cao",
      "Tầm nhìn trực diện bãi biển Mỹ Khê và bán đảo Sơn Trà",
      "Bàn giao gói nội thất nhập khẩu từ Ý trị giá 15 Tỷ VNĐ"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích tổng thể",
        "value": "480 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Panorama",
        "value": "4 Phòng"
      },
      {
        "icon": "Bath",
        "label": "Phòng tắm kính",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng view",
        "value": "Đông Bắc - Trực diện biển"
      }
    ],
    "amenities": [
      {
        "name": "Hồ bơi sục vô cực trên không",
        "description": "Trải nghiệm ngắm trọn bình minh trên biển Đà Nẵng"
      },
      {
        "name": "Sân golf 3D trong nhà",
        "description": "Hệ thống mô phỏng hơn 100 sân golf danh tiếng thế giới"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng Duplex 1 - Living Room & Sky Garden",
        "area": "280 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng Duplex 2 - Master Suites",
        "area": "200 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      }
    ],
    "architect": {
      "name": "KTS. Lê Quang Vũ",
      "role": "Đồng sáng lập LOISTIQ Architecture",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      "quote": "Mỗi mét vuông không gian là một tác phẩm điêu khắc ánh sáng và sự thư giãn tuyệt đối."
    },
    "featuredInCarousel": true,
    "bentoSize": "wide"
  },
  {
    "id": "loistiq-tay-ho-heritage-mansion",
    "slug": "loistiq-tay-ho-heritage-mansion",
    "title": "The Tay Ho Heritage Villa",
    "subtitle": "Dinh thự di sản ven Hồ Tây với kiến trúc Indochine giao hòa tân cổ điển Pháp",
    "category": "Căn Hộ Nghệ Thuật",
    "price": "210 Tỷ VNĐ",
    "rawPrice": 210,
    "location": "Quảng An, Tây Hồ, Hà Nội",
    "address": "Đường Quảng An, Phường Quảng An, Quận Tây Hồ, Hà Nội",
    "city": "Hà Nội",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "850 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 4,
    "yearBuilt": 2025,
    "description": [
      "The Tay Ho Heritage Villa là tuyệt tác bất động sản danh giá bậc nhất thủ đô, sở hữu vị trí vàng đắt giá tại bán đảo Quảng An thơ mộng.",
      "Sự kết hợp tinh xảo giữa vẻ đẹp hoài niệm của phong cách Đông Dương (Indochine) và sự tiện nghi xa hoa hiện đại."
    ],
    "highlights": [
      "Mặt tiền trực diện Hồ Tây lộng gió",
      "Vườn cảnh quan bonsai Nhật Bản & hồ cá Koi tiền tỷ",
      "Phòng tranh nghệ thuật & không gian tiếp khách ngoại giao"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích khuôn viên",
        "value": "850 m²"
      },
      {
        "icon": "Home",
        "label": "Diện tích sử dụng",
        "value": "1,100 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ VIP",
        "value": "5 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng phong thủy",
        "value": "Chính Nam - Sinh tài lộc"
      }
    ],
    "amenities": [
      {
        "name": "Phòng tiếp khách Ngoại giao",
        "description": "Được cách âm cao cấp với quầy bar rượu thượng hạng"
      },
      {
        "name": "Vườn thiền trà đạo",
        "description": "Không gian tĩnh tâm ngắm sóng nước Hồ Tây"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Đại sảnh & Hồ cá Koi",
        "area": "300 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 & 3 - Phòng ngủ Master",
        "area": "450 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 4,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Trần Hoàng Bách",
      "role": "Nghệ nhân Kiến trúc Di sản",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Giữ gìn hồn cốt văn hóa Tràng An trong một hình hài đương đại đầy kiêu hãnh."
    },
    "featuredInCarousel": true,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-eco-valley-mansion",
    "slug": "loistiq-eco-valley-mansion",
    "title": "The Eco Valley Mansion",
    "subtitle": "Khu dinh thự sinh thái xanh thuần khiết tại thung lũng Ba Vì",
    "category": "Dinh Thự Sinh Thái",
    "price": "65 Tỷ VNĐ",
    "rawPrice": 65,
    "location": "Ba Vì, Hà Nội",
    "address": "Thung lũng Bản Xôi, Yên Bài, Ba Vì, Hà Nội",
    "city": "Hà Nội",
    "status": "Sắp ra mắt",
    "heroImage": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "3,200 m²",
    "bedrooms": 6,
    "bathrooms": 7,
    "floors": 2,
    "yearBuilt": 2026,
    "description": [
      "Nằm ẩn mình giữa thung lũng Ba Vì thanh bình, The Eco Valley Mansion là thiên đường tái tạo năng lượng cho cả gia đình.",
      "Sử dụng 100% năng lượng mặt trời thông minh, hồ sinh thái tự nhiên và hệ sinh thái vườn cây ăn quả hữu cơ rộng lớn."
    ],
    "highlights": [
      "Khuôn viên xanh tự nhiên hơn 3,200 m²",
      "Hồ bơi tự nhiên lọc nước bằng thực vật sinh học",
      "Trang trại organic riêng biệt cung cấp thực phẩm sạch 365 ngày"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Tổng diện tích khu đất",
        "value": "3,200 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Biophilic",
        "value": "6 Phòng"
      },
      {
        "icon": "Leaf",
        "label": "Tiêu chuẩn xanh",
        "value": "LEED Platinum Quốc Tế"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Dãy núi Ba Vì hùng vĩ"
      }
    ],
    "amenities": [
      {
        "name": "Khu Farm-to-Table",
        "description": "Không gian tiệc nướng dã ngoại với nguyên liệu thu hoạch tại vườn"
      },
      {
        "name": "Đường dạo bộ sinh thái",
        "description": "Đường sỏi tự nhiên dài 500m dưới tán cây cổ thụ"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng Tổng thể - Khu sinh hoạt và Nhà khách",
        "area": "650 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 6,
        "bathrooms": 7
      }
    ],
    "architect": {
      "name": "KTS. Mai Thảo Linh",
      "role": "Kiến trúc sư Xanh - Green Architecture Hub",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Sự xa xỉ cao nhất trong tương lai chính là không khí trong lành, cây xanh và sự an yên trong tâm hồn."
    },
    "featuredInCarousel": true,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-coral-cove-mansion",
    "slug": "loistiq-coral-cove-mansion",
    "title": "The Coral Cove Palace",
    "subtitle": "Dinh thự đảo ngọc tư nhân với rạn san hô nguyên sinh & bãi đáp thủy phi cơ",
    "category": "Dinh Thự Ven Biển",
    "price": "160 Tỷ VNĐ",
    "rawPrice": 160,
    "location": "Vịnh Nha Trang, Khánh Hòa",
    "address": "Bán đảo Hòn Tre, Vịnh Nha Trang, Tỉnh Khánh Hòa",
    "city": "Nha Trang",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "1,680 m²",
    "bedrooms": 6,
    "bathrooms": 7,
    "floors": 3,
    "yearBuilt": 2025,
    "description": [
      "The Coral Cove Palace tọa lạc trên vịnh biển Nha Trang thơ mộng, sở hữu bờ vịnh san hô biệt lập và bãi cát trắng mịn riêng tư.",
      "Thiết kế dạng cánh cung đón gió biển tự nhiên, sử dụng kết cấu bê tông siêu bền chống muối biển và kính cường lực chống bão cấp 16."
    ],
    "highlights": [
      "Rạn san hô tự nhiên dài 100m ngay trước thềm dinh thự",
      "Bến đáp thủy phi cơ và tàu cao tốc tư nhân",
      "Hồ bơi nước khoáng biển ấm 150m² view trọn vịnh Nha Trang"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích khuôn viên",
        "value": "1,680 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ hoàng gia",
        "value": "6 Suites"
      },
      {
        "icon": "Bath",
        "label": "Phòng tắm Jacuzzi",
        "value": "7 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng phong thủy",
        "value": "Đông Nam - Vượng khí"
      }
    ],
    "amenities": [
      {
        "name": "Trung tâm lặn biển Scuba Diving",
        "description": "Trang thiết bị lặn chuyên nghiệp có hướng dẫn viên riêng"
      },
      {
        "name": "Hầm xì gà biển sâu",
        "description": "Kiểm soát nhiệt ẩm điện tử chuẩn Thụy Sĩ"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng Trệt - Ocean Lounge & Pool Deck",
        "area": "500 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Master Suites Panorama",
        "area": "400 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 4,
        "bathrooms": 5
      }
    ],
    "architect": {
      "name": "KTS. Robert Sterling",
      "role": "Kiến trúc sư Quốc tế ven biển",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "quote": "Khi kiến trúc hòa quyện vào làn nước xanh ngọc, không gian sống trở thành một kỳ nghỉ dưỡng bất tận."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-saigon-riverfront-chateau",
    "slug": "loistiq-saigon-riverfront-chateau",
    "title": "The Royal Saigon River Chateau",
    "subtitle": "Lâu đài ven sông Sài Gòn phong cách Tân Cổ Điển Pháp bề thế bậc nhất Thảo Điền",
    "category": "Dinh Thự Ven Biển",
    "price": "240 Tỷ VNĐ",
    "rawPrice": 240,
    "location": "Thảo Điền, TP. Thủ Đức, TP.HCM",
    "address": "Đường Nguyễn Văn Hưởng, Phường Thảo Điền, TP. Thủ Đức",
    "city": "TP. Hồ Chí Minh",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "1,450 m²",
    "bedrooms": 7,
    "bathrooms": 9,
    "floors": 4,
    "yearBuilt": 2025,
    "description": [
      "Tọa lạc tại vị trí độc tôn ven sông Sài Gòn thuộc bán đảo Thảo Điền danh giá, lâu đài sở hữu mặt tiền sông thoáng đãng hơn 45m.",
      "Cổng đúc đồng nguyên khối, đại sảnh lát đá Onyx xuyên sáng nhập từ Tây Ban Nha và hệ thống đèn chùm pha lê Baccarat lung linh."
    ],
    "highlights": [
      "Mặt tiền sông Sài Gòn rộng 45m với công viên cảnh quan riêng",
      "Hồ bơi dát vàng 24K với hệ thống lọc khoáng tinh khiết",
      "Gara hầm chứa được 8 siêu xe kèm thang nâng thông minh"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích đất",
        "value": "1,450 m²"
      },
      {
        "icon": "Home",
        "label": "Diện tích xây dựng",
        "value": "2,100 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ tổng thống",
        "value": "7 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Chính Tây - Hoàng hôn sông"
      }
    ],
    "amenities": [
      {
        "name": "Cầu tàu du thuyền riêng",
        "description": "Có thể neo đậu du thuyền đến 80 feet an toàn"
      },
      {
        "name": "Phòng tiệc đại yến 40 khách",
        "description": "Bếp thương mại chuẩn Michelin phục vụ đầu bếp riêng"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng Hầm - Gara siêu xe & Wine Cellar",
        "area": "500 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 1
      },
      {
        "name": "Tầng 1 - Đại sảnh Hoàng Gia & Phòng khách",
        "area": "450 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      }
    ],
    "architect": {
      "name": "KTS. Antoine de Saint-Germain",
      "role": "Kiến trúc sư Hoàng Gia Châu Âu",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      "quote": "Đẳng cấp đích thực không phô trương ồn ào mà toát lên từ sự tinh tế và tỉ mỉ trong từng đường nét phào chỉ."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-emerald-sky-penthouse",
    "slug": "loistiq-emerald-sky-penthouse",
    "title": "The Emerald Sky Penthouse",
    "subtitle": "Penthouse thông tầng giữa trung tâm Ba Đình nhìn trọn Hồ Tây và Vườn Bách Thảo",
    "category": "Penthouse Hoàng Gia",
    "price": "110 Tỷ VNĐ",
    "rawPrice": 110,
    "location": "Ba Đình, Hà Nội",
    "address": "Đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội",
    "city": "Hà Nội",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "540 m²",
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 2,
    "yearBuilt": 2026,
    "description": [
      "The Emerald Sky Penthouse tọa lạc tại vị trí kim cương của quận Ba Đình lịch sử, mở ra tầm nhìn bao quát toàn bộ vẻ đẹp tĩnh lặng của Hồ Tây.",
      "Phong cách thiết kế Modern Luxury với điểm nhấn màu ngọc lục bảo quý phái, các vách tường bọc lụa dệt tay từ làng nghề tơ tằm Vạn Phúc cao cấp."
    ],
    "highlights": [
      "Khu vườn chân mây 80m² ngắm trọn pháo hoa trung tâm thủ đô",
      "Thang máy tốc độ cao bảo mật mã hóa AES-256",
      "Bể sục khoáng Osen Nhật Bản trên cao ngắm hoàng hôn"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích sử dụng",
        "value": "540 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ tổng thống",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng view",
        "value": "Tây Bắc - Trực diện Hồ Tây"
      },
      {
        "icon": "ShieldCheck",
        "label": "Bảo mật",
        "value": "Lớp an ninh 4 vòng 24/7"
      }
    ],
    "amenities": [
      {
        "name": "Khu vực thưởng trà thượng hạng",
        "description": "Bộ bàn trà gỗ Mun hoa và đồ gốm sứ nghệ thuật cổ"
      },
      {
        "name": "Phòng chiếu phim 4K HDR",
        "description": "Hệ thống âm thanh Bowers & Wilkins cao cấp"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 35 - Không gian sinh hoạt & Sky Lounge",
        "area": "290 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 36 - Master Suite & Ban công kính",
        "area": "250 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 3
      }
    ],
    "architect": {
      "name": "KTS. Hoàng Hải Đăng",
      "role": "Chuyên gia Kiến trúc Căn hộ Siêu sang",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      "quote": "Một không gian sống đẳng cấp phải mang lại cảm giác bình yên tuyệt đối giữa lòng đô thị phồn hoa."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-danang-ocean-penthouse",
    "slug": "loistiq-danang-ocean-penthouse",
    "title": "The Ocean Crown Penthouse",
    "subtitle": "Penthouse trên tầng cao nhất trục đường biển tỷ đô ngắm trọn vịnh Đà Nẵng",
    "category": "Penthouse Hoàng Gia",
    "price": "88 Tỷ VNĐ",
    "rawPrice": 88,
    "location": "Ngũ Hành Sơn, TP. Đà Nẵng",
    "address": "Đường Trường Sa, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng",
    "city": "Đà Nẵng",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "490 m²",
    "bedrooms": 4,
    "bathrooms": 4,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Ocean Crown Penthouse vươn mình kiêu hãnh trên dải bờ biển Non Nước danh tiếng, đem lại cảm giác tự do bất tận trước biển trời bao la.",
      "Sân thượng riêng tư với hồ bơi vô cực sục khoáng khí và quầy lounge ngắm sao đêm biển Đông."
    ],
    "highlights": [
      "Tầm nhìn panorama không giới hạn từ bán đảo Sơn Trà đến Cù Lao Chàm",
      "Hồ bơi chân mây nước tràn dài 14m",
      "Ban công kính siêu trong suốt không khung"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "490 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ hướng biển",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Đông - Trực diện bình minh"
      }
    ],
    "amenities": [
      {
        "name": "Sân bay trực thăng",
        "description": "Đặc quyền sử dụng bãi đáp trực thăng tại đỉnh tháp"
      },
      {
        "name": "Dịch vụ đầu bếp riêng tư",
        "description": "Phục vụ các món hải sản thượng hạng tận phòng"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Phòng khách & Bếp đảo",
        "area": "260 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Phòng ngủ Master & Bể bơi",
        "area": "230 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 2
      }
    ],
    "architect": {
      "name": "KTS. David Chipperfield Design",
      "role": "Đơn vị tư vấn kiến trúc quốc tế",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Ánh sáng và tầm nhìn mở chính là những vật liệu đắt giá nhất của công trình."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-the-aurora-sky-villa",
    "slug": "loistiq-the-aurora-sky-villa",
    "title": "The Aurora Cloud Sky Villa",
    "subtitle": "Sky Villa thông tầng đẳng cấp quốc tế view trọn bán đảo Thanh Đa & sông Sài Gòn",
    "category": "Sky Villa Đẳng Cấp",
    "price": "92 Tỷ VNĐ",
    "rawPrice": 92,
    "location": "Bình Thạnh, TP.HCM",
    "address": "Đường Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, TP.HCM",
    "city": "TP. Hồ Chí Minh",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "510 m²",
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 2,
    "yearBuilt": 2026,
    "description": [
      "The Aurora Cloud Sky Villa mang vẻ đẹp hiện đại, thanh thoát của phong cách kiến trúc vị lai (Futuristic Luxury).",
      "Trang bị hệ thống kính điện thông minh chuyển đổi độ mờ theo góc chiếu mặt trời, mang lại sự riêng tư tối thượng và tiết kiệm năng lượng."
    ],
    "highlights": [
      "Hồ bơi thác nước vô cực trên cao ngắm Landmark 81 rực rỡ",
      "Phòng tập Gym & Yoga trên mây riêng tư",
      "Hệ thống lọc không khí y tế cấp độ bệnh viện"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "510 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ cao cấp",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Đông Nam - Đón gió sông"
      }
    ],
    "amenities": [
      {
        "name": "Khu xông hơi khô tuyết lạnh Cryo",
        "description": "Trải nghiệm hồi phục thể lực chuẩn vận động viên Olympic"
      },
      {
        "name": "Quầy Cocktail Bar nghệ thuật",
        "description": "Trang bị máy pha rượu tự động tích hợp AI"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Phòng khách lớn & Bếp mở",
        "area": "270 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Phòng ngủ Master & Spa tại gia",
        "area": "240 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 3
      }
    ],
    "architect": {
      "name": "KTS. Elena Vasileva",
      "role": "Chuyên gia Thiết kế Tương lai",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Công nghệ và cảm xúc không hề đối nghịch nhau, chúng cùng kiến tạo nên ngôi nhà của kỷ nguyên mới."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-halong-bay-sky-villa",
    "slug": "loistiq-halong-bay-sky-villa",
    "title": "The Horizon Ha Long Sky Villa",
    "subtitle": "Biệt thự trên không chiêm ngưỡng trọn vẹn kỳ quan thiên nhiên thế giới Vịnh Hạ Long",
    "category": "Sky Villa Đẳng Cấp",
    "price": "82 Tỷ VNĐ",
    "rawPrice": 82,
    "location": "Bãi Cháy, TP. Hạ Long",
    "address": "Đường Hạ Long, Phường Bãi Cháy, TP. Hạ Long, Quảng Ninh",
    "city": "Hạ Long",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "460 m²",
    "bedrooms": 4,
    "bathrooms": 4,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Horizon Ha Long Sky Villa tọa lạc trên đỉnh tháp ngắm cảnh cao nhất Bãi Cháy, mang đến góc nhìn thần thoại về hàng ngàn hòn đảo đá vôi kỳ vĩ.",
      "Không gian sống giao thoa giữa ánh sáng biển trời và đá Marble xám vân rồng quý phái."
    ],
    "highlights": [
      "Trực diện toàn cảnh Vịnh Hạ Long di sản thế giới",
      "Bể sục khoáng nóng Onsen trên cao nhập khẩu trực tiếp",
      "Phòng tiếp khách trần cao 6.8m dát vàng viền"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "460 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ View Vịnh",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Nam - View trọn vịnh di sản"
      }
    ],
    "amenities": [
      {
        "name": "Du thuyền thưởng ngoạn riêng",
        "description": "Đặc quyền 30 ngày du ngoạn vịnh mỗi năm trên du thuyền 5 sao"
      },
      {
        "name": "Hồ bơi 4 mùa sưởi nhiệt",
        "description": "Nhiệt độ nước duy trì 32°C lý tưởng cả mùa đông"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Khu tiếp khách & Terrace",
        "area": "250 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Phòng ngủ Suites",
        "area": "210 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 2
      }
    ],
    "architect": {
      "name": "KTS. Nguyễn Quốc Thái",
      "role": "Kiến trúc sư Trưởng dự án Vịnh Bắc Bộ",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "quote": "Mỗi buổi sớm thức giấc ngắm sương bảng lảng trên mặt vịnh là một bức tranh thủy mặc vô giá."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-tuyen-lam-serenity-villa",
    "slug": "loistiq-tuyen-lam-serenity-villa",
    "title": "The Tuyen Lam Lake Sanctuary",
    "subtitle": "Dinh thự ven hồ Tuyền Lâm với bến thuyền Kayak riêng & rừng thông nguyên sinh",
    "category": "Biệt Thự Đồi Thông",
    "price": "105 Tỷ VNĐ",
    "rawPrice": 105,
    "location": "Hồ Tuyền Lâm, TP. Đà Lạt",
    "address": "Khu du lịch Quốc gia Hồ Tuyền Lâm, Phường 4, TP. Đà Lạt",
    "city": "Đà Lạt",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "2,800 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Tuyen Lam Lake Sanctuary là chốn ẩn mình hoàn hảo giữa thiên nhiên tĩnh lặng của hồ Tuyền Lâm huyền ảo.",
      "Sử dụng gỗ Thông đỏ quý hiếm và đá phiến tự nhiên, lò sưởi ấm cúng và sân thượng ngắm sương sớm mặt hồ."
    ],
    "highlights": [
      "Khu đất biệt lập 2,800m² giáp mặt nước hồ Tuyền Lâm",
      "Cầu tàu gỗ riêng cho thuyền buồm và chèo SUP",
      "Vườn thảo mộc hữu cơ và hoa lavender rực rỡ"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích đất",
        "value": "2,800 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ ấm cúng",
        "value": "5 Phòng"
      },
      {
        "icon": "Flame",
        "label": "Hệ thống sưởi",
        "value": "Sưởi sàn Thụy Sĩ"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Mặt nước hồ Tuyền Lâm"
      }
    ],
    "amenities": [
      {
        "name": "Khu lều Glamping sang trọng",
        "description": "Không gian cắm trại ngắm dải ngân hà đêm"
      },
      {
        "name": "Hầm rượu vang sườn đồi",
        "description": "Được xây âm trong lòng đất duy trì nhiệt độ 14°C"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Phòng khách lớn & Sảnh tiệc sưởi",
        "area": "320 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Master Suites ngắm hồ",
        "area": "260 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Lars Mikkelsen",
      "role": "Chuyên gia Kiến trúc Bắc Âu",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      "quote": "Sự tĩnh lặng của mặt hồ và tiếng thông reo là bản hòa tấu chữa lành tuyệt diệu nhất."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-langbiang-alpine-chalet",
    "slug": "loistiq-langbiang-alpine-chalet",
    "title": "The Lang Biang Alpine Chalet",
    "subtitle": "Chalet phong cách Thụy Sĩ trên đỉnh đồi ngắm trọn dải núi Lang Biang hùng vĩ",
    "category": "Biệt Thự Đồi Thông",
    "price": "72 Tỷ VNĐ",
    "rawPrice": 72,
    "location": "Lạc Dương, Lâm Đồng",
    "address": "Chân đồi Radar, Thị trấn Lạc Dương, Tỉnh Lâm Đồng",
    "city": "Đà Lạt",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "1,900 m²",
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 2,
    "yearBuilt": 2024,
    "description": [
      "The Lang Biang Alpine Chalet mang âm hưởng nhà gỗ vùng núi Alps Thụy Sĩ với mái dốc truyền thống và ban công gỗ chạm khắc tinh tế.",
      "Nơi tận hưởng những buổi chiều sương mù giăng kín lối bên tách cà phê Arabica Cầu Đất trứ danh."
    ],
    "highlights": [
      "Độ cao 1,600m so với mực nước biển, khí hậu mát lạnh quanh năm",
      "Phòng xông hơi Sauna gỗ tuyết tùng Phần Lan",
      "Bể sục khoáng nước nóng ngoài trời giữa rừng cây"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích khuôn viên",
        "value": "1,900 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ ấm áp",
        "value": "4 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Đỉnh Lang Biang mây phủ"
      }
    ],
    "amenities": [
      {
        "name": "Khu nướng BBQ sườn đồi",
        "description": "Trang bị bếp nướng củi than phong cách Âu"
      },
      {
        "name": "Vườn hoa cẩm tú cầu",
        "description": "Nở rộ quanh năm phủ kín khuôn viên"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Đại sảnh & Lò sưởi củi",
        "area": "220 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Phòng ngủ áp mái Chalet",
        "area": "180 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 3
      }
    ],
    "architect": {
      "name": "KTS. Hans Peter Gruber",
      "role": "Kiến trúc sư Núi cao Thụy Sĩ",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "quote": "Mỗi khúc gỗ là một nhân chứng của thời gian và hơi thở đại ngàn."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-opera-art-penthouse",
    "slug": "loistiq-opera-art-penthouse",
    "title": "The Opera Maison d'Art",
    "subtitle": "Căn hộ nghệ thuật trưng bày kiệt tác hội họa nhìn thẳng Nhà hát Thành Phố",
    "category": "Căn Hộ Nghệ Thuật",
    "price": "135 Tỷ VNĐ",
    "rawPrice": 135,
    "location": "Quận 1, TP. Hồ Chí Minh",
    "address": "Đường Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM",
    "city": "TP. Hồ Chí Minh",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "430 m²",
    "bedrooms": 3,
    "bathrooms": 4,
    "floors": 1,
    "yearBuilt": 2025,
    "description": [
      "The Opera Maison d'Art nằm trên đại lộ Đồng Khởi danh giá, là nơi lưu giữ bộ sưu tập tranh sơn mài và điêu khắc nghệ thuật đương đại Việt Nam.",
      "Trang bị hệ thống chiếu sáng bảo tàng chuyên dụng ERCO của Đức và kiểm soát vi khí hậu bảo tồn tranh cổ."
    ],
    "highlights": [
      "Góc nhìn trực diện Nhà Hát Lớn TP.HCM và khách sạn Continental",
      "Không gian Gallery nghệ thuật riêng biệt rộng 150m²",
      "Hệ thống âm thanh Hi-End Goldmund Thụy Sĩ"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "430 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Gallery",
        "value": "3 Suites"
      },
      {
        "icon": "ShieldCheck",
        "label": "Bảo tàng tư nhân",
        "value": "Hệ thống bảo quản độ ẩm 55%"
      }
    ],
    "amenities": [
      {
        "name": "Phòng nếm rượu & Thưởng tranh",
        "description": "Được thiết kế riêng cho những buổi gặp gỡ giới sưu tập tinh hoa"
      },
      {
        "name": "Thang máy độc quyền",
        "description": "Di chuyển thẳng vào sảnh căn hộ không tiếp xúc"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng tổng thể - Art Gallery & Master Suites",
        "area": "430 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Vũ Trọng Khôi",
      "role": "Curator & Kiến trúc sư Nghệ thuật",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      "quote": "Ngôi nhà không chỉ để ở, nó là bảo tàng sống của tình yêu cái đẹp và văn hóa."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-hoian-heritage-residence",
    "slug": "loistiq-hoian-heritage-residence",
    "title": "The Ancient Hoi An Manor",
    "subtitle": "Dinh thự di sản ven sông Hoài giao hòa kiến trúc phố cổ và tinh hoa hiện đại",
    "category": "Căn Hộ Nghệ Thuật",
    "price": "115 Tỷ VNĐ",
    "rawPrice": 115,
    "location": "Cẩm Nam, TP. Hội An",
    "address": "Đường Nguyễn Tri Phương, Phường Cẩm Nam, TP. Hội An, Quảng Nam",
    "city": "Hội An",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "920 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Ancient Hoi An Manor tọa lạc bên dòng sông Hoài êm đềm, tái hiện sống động không gian nhà rường cổ kính với mái ngói âm dương rêu phong.",
      "Sân trong giếng trời ngập tràn hoa giấy ngũ sắc, hồ nước thả hoa đăng và đèn lồng lụa tơ tằm thủ công thắp sáng lung linh mỗi tối."
    ],
    "highlights": [
      "Mặt tiền sông Hoài thoáng mát ngắm thuyền hoa đăng",
      "Kết cấu gỗ Lim cổ thụ bền vững hơn 100 năm",
      "Bể bơi đá sọc dưa tự nhiên giữa sân vườn nhiệt đới"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích đất",
        "value": "920 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Di sản",
        "value": "5 Phòng"
      },
      {
        "icon": "Compass",
        "label": "Hướng phong thủy",
        "value": "Đông Nam - Đón vượng khí"
      }
    ],
    "amenities": [
      {
        "name": "Khu thưởng trà đạo Hội An",
        "description": "Bộ bàn ghế chạm khảm ốc xà cừ cổ vật quý giá"
      },
      {
        "name": "Bến thả đèn hoa đăng",
        "description": "Cầu gỗ tư nhân bước thẳng ra dòng sông Hoài"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Sân trong giếng trời & Bếp xưa",
        "area": "380 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 - Phòng ngủ Master & Ban công ngắm phố",
        "area": "300 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 3,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Lê Bá Thiện",
      "role": "Chuyên gia Phục dựng Di sản Cổ đô",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Linh hồn của Hội An nằm trong từng thớ gỗ, từng viên ngói cong mang theo ký ức ngàn năm."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-cat-ba-biosphere-villa",
    "slug": "loistiq-cat-ba-biosphere-villa",
    "title": "The Cat Ba Biosphere Estate",
    "subtitle": "Dinh thự ẩn mình giữa khu dự trữ sinh quyển thế giới Cát Bà",
    "category": "Dinh Thự Sinh Thái",
    "price": "89 Tỷ VNĐ",
    "rawPrice": 89,
    "location": "Quần đảo Cát Bà, Hải Phòng",
    "address": "Vịnh Lan Hạ, Đảo Cát Bà, Huyện Cát Hải, TP. Hải Phòng",
    "city": "Hạ Long",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "3,500 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 2,
    "yearBuilt": 2026,
    "description": [
      "The Cat Ba Biosphere Estate nằm trọn trong thung lũng đá vôi nguyên sơ nhìn ra vịnh Lan Hạ nước xanh ngọc bích.",
      "Sử dụng 100% vật liệu tre ép carbon thấp và năng lượng tái tạo không phát thải, đem lại môi trường sống thuần khiết nhất."
    ],
    "highlights": [
      "Bãi biển tư nhân 80m nước trong vắt nhìn thấy đáy",
      "Hệ thống trữ nước mưa tự nhiên lọc khoáng thông minh",
      "Đường dạo bộ xuyên rừng nguyên sinh nội khu"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "3,500 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ sinh thái",
        "value": "5 Phòng"
      },
      {
        "icon": "Leaf",
        "label": "Chứng chỉ Net Zero",
        "value": "Chứng nhận Quốc Tế"
      }
    ],
    "amenities": [
      {
        "name": "Đài quan sát thiên văn",
        "description": "Trang bị kính thiên văn quang học cao cấp"
      },
      {
        "name": "Khu bảo tồn lan rừng",
        "description": "Nơi quy tụ hơn 50 loài lan rừng quý hiếm"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng tổng thể khu nghỉ dưỡng sinh thái",
        "area": "680 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 5,
        "bathrooms": 6
      }
    ],
    "architect": {
      "name": "KTS. Võ Trọng Nghĩa Associates",
      "role": "Kiến trúc sư Tiên phong Công trình Xanh",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "quote": "Trả lại cho thiên nhiên những gì đã mượn là trách nhiệm cao cả nhất của kiến trúc sư."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-nam-dao-pearl-mansion",
    "slug": "loistiq-nam-dao-pearl-mansion",
    "title": "The Pearl Cove Mansion",
    "subtitle": "Dinh thự hoàng gia bãi Khem với cát trắng như kem & hoàng hôn đảo ngọc",
    "category": "Dinh Thự Ven Biển",
    "price": "175 Tỷ VNĐ",
    "rawPrice": 175,
    "location": "Bãi Khem, Nam Phú Quốc",
    "address": "Khu đô thị Địa Trung Hải, Phường An Thới, TP. Phú Quốc",
    "city": "Phú Quốc",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "1,380 m²",
    "bedrooms": 6,
    "bathrooms": 8,
    "floors": 3,
    "yearBuilt": 2025,
    "description": [
      "The Pearl Cove Mansion nằm ngay vị trí đắt giá nhất bãi Khem Phú Quốc - top 50 bãi biển đẹp nhất hành tinh.",
      "Phong cách kiến trúc nhiệt đới sang trọng (Tropical Luxury) với mái vòm thoáng gió và rèm lụa trắng bay trong gió biển."
    ],
    "highlights": [
      "Bãi cát trắng mịn riêng tư dài 60m",
      "Hồ bơi vô cực 2 tầng tràn cát biển",
      "Nhà câu lạc bộ bãi biển Beach Club tư gia"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích",
        "value": "1,380 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ hướng biển",
        "value": "6 Suites"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Tây Nam - Hoàng hôn biển ngọc"
      }
    ],
    "amenities": [
      {
        "name": "Quầy Bar ngắm hoàng hôn Sunset Lounge",
        "description": "Nằm nhô ra mặt biển phục vụ cocktail cao cấp"
      },
      {
        "name": "Phòng trị liệu Spa đôi",
        "description": "Liệu trình thư giãn dầu dừa và ngọc trai Phú Quốc"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Beach Lounge & Sân hồ bơi",
        "area": "420 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 2,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 & 3 - Master Suites & Sky Terrace",
        "area": "460 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 4,
        "bathrooms": 6
      }
    ],
    "architect": {
      "name": "KTS. Bill Bensley Design",
      "role": "Huyền thoại Kiến trúc Nghỉ dưỡng Thế giới",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      "quote": "Mỗi chi tiết đều phải kể một câu chuyện thần thoại làm say lòng người."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-ciputra-grand-palais",
    "slug": "loistiq-ciputra-grand-palais",
    "title": "Le Grand Palais Ciputra",
    "subtitle": "Siêu Penthouse phong cách Hoàng gia Pháp tráng lệ tại khu đô thị quốc tế Ciputra",
    "category": "Penthouse Hoàng Gia",
    "price": "195 Tỷ VNĐ",
    "rawPrice": 195,
    "location": "Tây Hồ, Hà Nội",
    "address": "Khu đô thị Nam Thăng Long - Ciputra, Phường Phú Thượng, Quận Tây Hồ, Hà Nội",
    "city": "Hà Nội",
    "status": "Độc quyền",
    "heroImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "720 m²",
    "bedrooms": 5,
    "bathrooms": 6,
    "floors": 3,
    "yearBuilt": 2026,
    "description": [
      "Le Grand Palais Ciputra là biểu tượng uy quyền với kiến trúc Cổ điển Phục Hưng Pháp tráng lệ, các chi tiết đắp nổi thạch cao mạ vàng 24K thủ công.",
      "Sở hữu sân vườn thượng uyển rộng 180m² ngắm trọn sân golf quốc tế và sông Hồng lịch sử."
    ],
    "highlights": [
      "Trần nhà tranh bích họa vẽ tay phong cách Versailles",
      "Thang bộ xoắn ốc mạ vàng thủ công lộng lẫy",
      "Hầm Cigar & Rượu mạnh độc bản"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích sàn",
        "value": "720 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Hoàng gia",
        "value": "5 Suites"
      },
      {
        "icon": "Compass",
        "label": "Hướng nhìn",
        "value": "Đông Bắc - Sông Hồng & Sân Golf"
      }
    ],
    "amenities": [
      {
        "name": "Sân tập Golf Putting Green trên cao",
        "description": "Cỏ nhân tạo tiêu chuẩn PGA Tour"
      },
      {
        "name": "Phòng dạ tiệc Khiêu vũ",
        "description": "Sàn gỗ sồi Pháp cách âm hoàn hảo"
      }
    ],
    "floorPlans": [
      {
        "name": "Tầng 1 - Đại sảnh Versailles & Phòng dạ tiệc",
        "area": "300 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 1,
        "bathrooms": 2
      },
      {
        "name": "Tầng 2 & 3 - Phòng ngủ Hoàng gia & Sân vườn",
        "area": "420 m²",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 4,
        "bathrooms": 4
      }
    ],
    "architect": {
      "name": "KTS. Charles Perrault",
      "role": "Viện Hàn Lâm Kiến Trúc Pháp",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      "quote": "Vẻ đẹp vĩnh cửu là thứ vượt qua sự thử thách của mọi xu hướng thời đại."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  },
  {
    "id": "loistiq-nhat-le-dune-retreat",
    "slug": "loistiq-nhat-le-dune-retreat",
    "title": "The Horizon Dunes Sanctuary",
    "subtitle": "Dinh thự sa thảo ven đồi cát trắng và biển xanh nguyên sơ",
    "category": "Dinh Thự Sinh Thái",
    "price": "68 Tỷ VNĐ",
    "rawPrice": 68,
    "location": "Bãi Dài, Cam Ranh, Khánh Hòa",
    "address": "Đại lộ Nguyễn Tất Thành, Bãi Dài, Cam Ranh, Khánh Hòa",
    "city": "Nha Trang",
    "status": "Đang mở bán",
    "heroImage": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1600",
    "galleryImages": [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
    ],
    "area": "2,100 m²",
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 2,
    "yearBuilt": 2025,
    "description": [
      "The Horizon Dunes Sanctuary lấy cảm hứng từ những ốc đảo sa mạc thanh bình với các mảng tường đất nện mộc mạc và cây cỏ chịu hạn duyên dáng.",
      "Sự hòa quyện tuyệt vời giữa nắng vàng rực rỡ, gió biển rì rào và làn nước hồ bơi xanh ngắt xua tan mọi âu lo đời thường."
    ],
    "highlights": [
      "Khu vườn nhiệt đới xương rồng và cọ sa mạc độc đáo",
      "Bể bơi ốc đảo cát trắng tự nhiên không hóa chất",
      "Kiến trúc đất nện cách nhiệt tự nhiên mát mẻ quanh năm"
    ],
    "features": [
      {
        "icon": "Maximize",
        "label": "Diện tích đất",
        "value": "2,100 m²"
      },
      {
        "icon": "Bed",
        "label": "Phòng ngủ Oasis",
        "value": "4 Phòng"
      },
      {
        "icon": "Leaf",
        "label": "Vật liệu",
        "value": "Đất nện hữu cơ & Gỗ tự nhiên"
      }
    ],
    "amenities": [
      {
        "name": "Khu Yoga thiền định trên đồi cát",
        "description": "Nơi đón ánh bình minh đầu tiên của ngày mới"
      },
      {
        "name": "Rạp chiếu phim ngoài trời",
        "description": "Thưởng thức điện ảnh dưới bầu trời ngàn sao"
      }
    ],
    "floorPlans": [
      {
        "name": "Mặt bằng tầng 1 & 2 - Khu Oasis Living",
        "area": "480 m²",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
        "bedrooms": 4,
        "bathrooms": 5
      }
    ],
    "architect": {
      "name": "KTS. Sarah Jenkins",
      "role": "Chuyên gia Kiến trúc Cảnh quan Sa mạc",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "quote": "Sự tối giản và mộc mạc là chiếc chìa khóa mở ra cánh cửa dẫn đến bình an đích thực."
    },
    "featuredInCarousel": false,
    "bentoSize": "small"
  }
];

const SEED_LEADS = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Nguyễn Thành Long',
    phone: '0908 123 456',
    email: 'thanhlong.nguyen@investcorp.vn',
    categoryInterest: 'Dinh Thự Ven Biển',
    budget: 'Trên 150 Tỷ VNĐ',
    propertyTitle: 'The Grand Ocean Sanctuary',
    message: 'Quan tâm chính sách bàn giao và bến du thuyền riêng cho du thuyền 40ft.',
    status: 'Mới tiếp nhận',
  },
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Trần Thị Thu Hà',
    phone: '0912 888 999',
    email: 'ha.tran@heritage-holding.com',
    categoryInterest: 'Penthouse Hoàng Gia',
    budget: '70 - 100 Tỷ VNĐ',
    propertyTitle: 'The Zenith Sky Penthouse',
    message: 'Muốn đặt lịch xem nhà trực tiếp vào cuối tuần này qua xe Maybach đón.',
    status: 'Đã hẹn ngày xem',
  }
];

const SEED_ACTIVITIES = [
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    user: 'Admin Quản Trị',
    action: 'Đã tiếp nhận yêu cầu VIP mới từ',
    target: 'Nguyễn Thành Long',
    time: '35 phút trước',
    type: 'lead',
  },
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    user: 'Admin Quản Trị',
    action: 'Cập nhật trạng thái niêm yết độc quyền BĐS',
    target: 'The Grand Ocean Sanctuary',
    time: '2 giờ trước',
    type: 'property',
  }
];

async function main() {
  console.log('🌱 Bắt đầu nạp dữ liệu khởi tạo (Seed Data)...');

  // 1. Tạo tài khoản Quản trị mặc định
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@loistiq.com' },
    update: {},
    create: {
      email: 'admin@loistiq.com',
      password: hashedPassword,
      name: 'Giám Đốc Quản Trị LOISTIQ',
      role: 'Super Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  });
  console.log('✅ Đã tạo tài khoản quản trị: admin@loistiq.com (mật khẩu: admin123)');

  // 2. Nạp danh sách Bất Động Sản
  for (const p of SEED_PROPERTIES) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        price: p.price,
        rawPrice: p.rawPrice,
        location: p.location,
        address: p.address,
        city: p.city,
        status: p.status,
        heroImage: p.heroImage,
        galleryImages: p.galleryImages,
        sketchfabModelUrl: p.sketchfabModelUrl,
        virtualTour360Url: p.virtualTour360Url,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        floors: p.floors,
        yearBuilt: p.yearBuilt,
        description: p.description,
        highlights: p.highlights,
        features: p.features,
        amenities: p.amenities,
        floorPlans: p.floorPlans,
        architect: p.architect,
        featuredInCarousel: p.featuredInCarousel,
        bentoSize: p.bentoSize,
      },
      create: {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        price: p.price,
        rawPrice: p.rawPrice,
        location: p.location,
        address: p.address,
        city: p.city,
        status: p.status,
        heroImage: p.heroImage,
        galleryImages: p.galleryImages,
        sketchfabModelUrl: p.sketchfabModelUrl,
        virtualTour360Url: p.virtualTour360Url,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        floors: p.floors,
        yearBuilt: p.yearBuilt,
        description: p.description,
        highlights: p.highlights,
        features: p.features,
        amenities: p.amenities,
        floorPlans: p.floorPlans,
        architect: p.architect,
        featuredInCarousel: p.featuredInCarousel,
        bentoSize: p.bentoSize,
      },
    });
  }
  console.log(`✅ Đã nạp ${SEED_PROPERTIES.length} bất động sản cao cấp.`);

  // 3. Nạp danh sách Leads
  for (const lead of SEED_LEADS) {
    await prisma.vIPLead.upsert({
      where: { id: lead.id },
      update: {},
      create: lead,
    });
  }
  console.log(`✅ Đã nạp ${SEED_LEADS.length} khách hàng VIP Leads.`);

  // 4. Nạp danh sách Nhật ký hoạt động
  for (const act of SEED_ACTIVITIES) {
    await prisma.adminActivity.upsert({
      where: { id: act.id },
      update: {},
      create: act,
    });
  }
  console.log('✅ Đã nạp lịch sử hoạt động ban đầu.');

  console.log('🎉 Quá trình Seed Data hoàn tất thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi chạy Seed Data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
