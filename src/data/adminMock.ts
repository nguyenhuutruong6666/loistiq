export interface VIPLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  categoryInterest: string;
  budget: string;
  propertyTitle?: string;
  message?: string;
  status: 'Mới tiếp nhận' | 'Đã liên hệ' | 'Đã hẹn ngày xem' | 'Thành công' | 'Đã hủy';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Hoạt động' | 'Tạm dừng';
}

export interface AdminActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'property' | 'lead' | 'system' | 'newsletter';
}

export const INITIAL_LEADS: VIPLead[] = [
  {
    id: 'lead-01',
    name: 'Nguyễn Thành Long',
    phone: '0908 123 456',
    email: 'long.nguyen@invest-group.vn',
    categoryInterest: 'Dinh Thự Ven Biển',
    budget: 'Trên 100 Tỷ VNĐ',
    propertyTitle: 'The Grand Ocean Mansion',
    message: 'Quan tâm chính sách bàn giao và bến du thuyền riêng cho du thuyền 40ft.',
    status: 'Mới tiếp nhận',
    createdAt: '2026-08-04 09:30',
  },
  {
    id: 'lead-02',
    name: 'Trần Thị Thu Hà',
    phone: '0912 888 999',
    email: 'ha.tran@heritage-holding.com',
    categoryInterest: 'Penthouse Hoàng Gia',
    budget: '70 - 100 Tỷ VNĐ',
    propertyTitle: 'Imperial Sky Penthouse',
    message: 'Muốn đặt lịch xem nhà trực tiếp vào cuối tuần này qua xe Maybach đón.',
    status: 'Đã hẹn ngày xem',
    createdAt: '2026-08-03 16:45',
  },
  {
    id: 'lead-03',
    name: 'Phạm Quốc Bảo',
    phone: '0983 777 666',
    email: 'bao.pham@viettech-capital.com',
    categoryInterest: 'Sky Villa Đẳng Cấp',
    budget: 'Trên 100 Tỷ VNĐ',
    propertyTitle: 'Aurora Bay Sky Villa',
    message: 'Yêu cầu thẩm định hồ sơ pháp lý và hợp đồng NDA 3 lớp trước khi trao đổi.',
    status: 'Đã liên hệ',
    createdAt: '2026-08-03 11:15',
  },
  {
    id: 'lead-04',
    name: 'Vũ Minh Trí',
    phone: '0933 222 111',
    email: 'tri.vu@green-eco.vn',
    categoryInterest: 'Biệt Thự Đồi Thông',
    budget: '50 - 70 Tỷ VNĐ',
    propertyTitle: 'Pine Forest Zen Residence',
    message: 'Đã hoàn tất thanh toán cọc và ký hợp đồng bảo mật.',
    status: 'Thành công',
    createdAt: '2026-08-02 14:20',
  },
  {
    id: 'lead-05',
    name: 'Đặng Mai Linh',
    phone: '0977 444 333',
    email: 'linh.dang@luxury-life.com',
    categoryInterest: 'Dinh Thự Sinh Thái',
    budget: '70 - 100 Tỷ VNĐ',
    propertyTitle: 'The Oasis Eco Palace',
    message: 'Khách hàng hẹn lại sang tháng sau do đang công tác nước ngoài.',
    status: 'Đã hủy',
    createdAt: '2026-08-01 10:00',
  },
];

export const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-01',
    email: 'vip.investor01@gmail.com',
    subscribedAt: '2026-08-04 08:20',
    status: 'Hoạt động',
  },
  {
    id: 'sub-02',
    email: 'ceo.partner@savills-vn.com',
    subscribedAt: '2026-08-03 19:40',
    status: 'Hoạt động',
  },
  {
    id: 'sub-03',
    email: 'architect.alex@studio-milano.it',
    subscribedAt: '2026-08-03 14:10',
    status: 'Hoạt động',
  },
  {
    id: 'sub-04',
    email: 'wealth.management@vietinbank.vn',
    subscribedAt: '2026-08-02 18:05',
    status: 'Hoạt động',
  },
  {
    id: 'sub-05',
    email: 'collector.art@art-luxury.fr',
    subscribedAt: '2026-08-01 22:30',
    status: 'Hoạt động',
  },
];

export const INITIAL_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-01',
    user: 'Admin Quản Trị',
    action: 'Đã tiếp nhận yêu cầu VIP mới từ',
    target: 'Nguyễn Thành Long',
    time: '35 phút trước',
    type: 'lead',
  },
  {
    id: 'act-02',
    user: 'Admin Quản Trị',
    action: 'Cập nhật trạng thái niêm yết độc quyền BĐS',
    target: 'The Grand Ocean Mansion',
    time: '2 giờ trước',
    type: 'property',
  },
  {
    id: 'act-03',
    user: 'Hệ thống',
    action: 'Ghi nhận thêm 1 Email đăng ký Bản tin VIP',
    target: 'vip.investor01@gmail.com',
    time: '4 giờ trước',
    type: 'newsletter',
  },
  {
    id: 'act-04',
    user: 'Admin Quản Trị',
    action: 'Xác nhận lịch hẹn xem nhà cho khách hàng',
    target: 'Trần Thị Thu Hà',
    time: '1 ngày trước',
    type: 'lead',
  },
];
