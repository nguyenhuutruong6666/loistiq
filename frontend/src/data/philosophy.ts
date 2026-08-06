import { LucideIcon, Trees, Gem, Feather, Cpu } from 'lucide-react';

export interface PhilosophyPillar {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
}

export interface Architect {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  experience: string;
}

export interface Material {
  name: string;
  origin: string;
  image: string;
  description: string;
}

// 4 Trụ Cột Triết Lý Thiết Kế LOISTIQ
export const PILLARS: PhilosophyPillar[] = [
  {
    icon: Trees,
    tag: 'Trụ Cột 01',
    title: 'Kiến Trúc Sinh Thái (Biophilic Design)',
    description:
      'Xóa nhòa ranh giới giữa nội thất và ngoại cảnh. Mọi dinh thự đều được tính toán theo hướng gió biển, đường đi của mặt trời và bao bọc bởi mảng xanh nguyên sinh nhiệt đới.',
  },
  {
    icon: Gem,
    tag: 'Trụ Cột 02',
    title: 'Nghệ Thuật Chế Tác Thủ Công (Bespoke Craftsmanship)',
    description:
      'Từng chi tiết được hoàn thiện thủ công bởi các nghệ nhân châu Âu với đá cẩm thạch Calacatta Ý, gỗ Teak nguyên khối và kim loại mạ đồng champagne tinh tế.',
  },
  {
    icon: Feather,
    tag: 'Trụ Cột 03',
    title: 'Chủ Nghĩa Tối Giản Vượt Thời Gian (Timeless Minimalism)',
    description:
      'Loại bỏ những chi tiết rườm rà để tôn vinh sự khoáng đạt của không gian. Mỗi đường nét, vách kính hay mái hiên đều là một điểm chạm thị giác tinh tế và chuẩn mực.',
  },
  {
    icon: Cpu,
    tag: 'Trụ Cột 04',
    title: 'Công Nghệ Thông Minh & Bền Vững (Sustainable Innovation)',
    description:
      'Hệ thống Smarthome điều khiển vi khí hậu thông minh, kính hộp Low-E 3 lớp cách nhiệt cùng giải pháp lọc nước điện phân muối khoáng thân thiện với sức khỏe.',
  },
];

// Danh Sách Kiến Trúc Sư Trưởng
export const ARCHITECTS: Architect[] = [
  {
    name: 'KTS. Jean-Luc Moreau',
    role: 'Giám Đốc Sáng Tạo Kiến Trúc (Paris, Pháp)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    quote: 'Kiến trúc không chỉ là những bức tường vững chãi, mà là sự hòa quyện tuyệt đối giữa đại dương hùng vĩ và tâm hồn con người.',
    experience: 'Hơn 25 năm kinh nghiệm thiết kế dinh thự ven biển tại French Riviera và Monaco.',
  },
  {
    name: 'KTS. Elena Rossi',
    role: 'Chuyên Gia Thiết Kế Nội Thất & Nghệ Thuật (Milan, Ý)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    quote: 'Mỗi mét vuông không gian là một tác phẩm nghệ thuật vị nhân sinh, mang lại sự thư thái và tái tạo năng lượng đỉnh cao.',
    experience: 'Từng chủ trì các dự án Penthouse siêu sang tại Milan, Dubai và New York.',
  },
  {
    name: 'KTS. Kenzo Takahashi',
    role: 'Bậc Thầy Cảnh Quan & Không Gian Thiền Định (Tokyo, Nhật Bản)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    quote: 'Thiên nhiên là người thầy vĩ đại nhất. Chúng tôi chỉ khiêm nhường mượn khung cảnh đất trời để tạo nên chốn an trú cho tâm hồn.',
    experience: 'Thành viên Hiệp hội Kiến trúc Cảnh quan Quốc tế (IFLA), tác giả nhiều resort 6 sao tại Châu Á.',
  },
];

// Danh Sách Vật Liệu Tuyển Chọn Thượng Hạng
export const MATERIALS: Material[] = [
  {
    name: 'Đá Cẩm Thạch Calacatta Borghini',
    origin: 'Tuscany, Ý',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
    description: 'Vân đá vàng hổ phách tự nhiên trên nền đá trắng tinh khiết, được khai thác từ những mỏ đá lâu đời nhất thế giới.',
  },
  {
    name: 'Kính Low-E Solar Control Tràn Viền',
    origin: 'Saint-Gobain, Pháp',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    description: 'Hệ kính hộp 3 lớp cản 99% tia cực tím, cách âm tuyệt đối và tối ưu hóa năng lượng điều hòa không khí.',
  },
  {
    name: 'Gỗ Teak Tự Nhiên Chống Muối Biển',
    origin: 'Myanmar',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    description: 'Khả năng chịu ẩm và kháng gió biển vượt trội, mang lại sự ấm cúng và hương thơm gỗ tự nhiên bền vững theo năm tháng.',
  },
];
