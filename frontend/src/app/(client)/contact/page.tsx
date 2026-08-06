'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
  CircleCheck,
  HelpCircle,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    categoryInterest: 'Dinh Thự Ven Biển',
    budget: 'Trên 100 Tỷ VNĐ',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Tiếp nhận yêu cầu thành công!',
      description: `Cảm ơn Quý khách ${formData.name}. Chuyên viên LOISTIQ sẽ liên hệ lại trong thời gian sớm nhất.`,
    });
  };

  const showrooms = [
    {
      city: 'TP. Hồ Chí Minh (Trụ sở chính)',
      address: 'Tầng 38, Bitexco Financial Tower, Quận 1',
      hotline: '1800 6666 (Nhánh 1)',
      email: 'hcm@loistiq.com',
    },
    {
      city: 'Hà Nội Showroom',
      address: 'Biệt thự 12A, Bán đảo Quảng An, Tây Hồ',
      hotline: '1800 6666 (Nhánh 2)',
      email: 'hanoi@loistiq.com',
    },
    {
      city: 'Đà Nẵng & Miền Trung',
      address: 'Tòa nhà Grand Marina, Võ Nguyên Giáp, Sơn Trà',
      hotline: '1800 6666 (Nhánh 3)',
      email: 'danang@loistiq.com',
    },
    {
      city: 'Phú Quốc Hub',
      address: 'Bến Du Thuyền Sunset Town, An Thới',
      hotline: '1800 6666 (Nhánh 4)',
      email: 'phuquoc@loistiq.com',
    },
  ];

  const faqs = [
    {
      q: 'Quy trình bảo mật danh tính của khách hàng VIP diễn ra như thế nào?',
      a: 'LOISTIQ áp dụng thỏa thuận bảo mật NDA 3 lớp chuẩn ngân hàng Thụy Sĩ. Danh tính và lịch trình xem nhà của Quý khách hoàn toàn được mã hóa và chỉ duy nhất Giám đốc quản gia phục vụ được tiếp cận.',
    },
    {
      q: 'LOISTIQ có hỗ trợ phương tiện đón rước đặc biệt khi xem nhà không?',
      a: 'Có. Chúng tôi cung cấp dịch vụ đưa đón bằng du thuyền hạng sang với các dinh thự ven biển tại Phú Quốc/Đà Nẵng, hoặc xe chuyên dụng Maybach/Rolls-Royce riêng tư.',
    },
    {
      q: 'Tình trạng pháp lý của các bất động sản trong bộ sưu tập?',
      a: '100% bất động sản do LOISTIQ phát triển và phân phối độc quyền đều đã có sổ đỏ sở hữu lâu dài và được thẩm định pháp lý minh bạch bởi các công ty luật hàng đầu.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Tiêu đề trang & Lời giới thiệu */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b8864a]/10 border border-[#8c5a1e]/30 text-[#8c5a1e] text-[10px] sm:text-xs font-semibold uppercase tracking-[2px]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dịch Vụ Concierge Thượng Lưu</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight">
          Liên Hệ & Đặt Lịch Tư Vấn Private
        </h1>
        <p className="text-xs sm:text-base text-[#5c5c5c] leading-relaxed">
          Đội ngũ chuyên gia kiến trúc và quản gia cao cấp của LOISTIQ sẵn sàng đồng hành cùng Quý khách trong hành trình kiến tạo không gian sống mơ ước.
        </p>
      </div>

      {/* Lưới bố cục: Form gửi thông tin và Hệ thống Showroom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cột trái: Form tiếp nhận thông tin yêu cầu tư vấn VIP */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-3xl sm:rounded-4xl border border-black/5 shadow-xl space-y-5 sm:space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
            Gửi Yêu Cầu Tư Vấn Đặc Quyền
          </h2>

          {submitted ? (
            <div className="space-y-5 animate-in fade-in">
              <Alert variant="success" className="p-6">
                <CircleCheck className="w-6 h-6" />
                <div className="space-y-1">
                  <AlertTitle className="text-lg">Yêu Cầu Đã Được Tiếp Nhận Thành Công</AlertTitle>
                  <AlertDescription>
                    Cảm ơn Quý khách <strong>{formData.name}</strong>. Giám đốc bộ phận Quản gia VIP LOISTIQ sẽ liên hệ trực tiếp trong thời gian sớm nhất.
                  </AlertDescription>
                </div>
              </Alert>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#121212] text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[#333333] transition-all cursor-pointer"
                >
                  Gửi thêm yêu cầu tư vấn khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                    Số Điện Thoại VIP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0908 xxx xxx"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@vip.com"
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                    Phân Khúc Quan Tâm
                  </label>
                  <select
                    value={formData.categoryInterest}
                    onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                    className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                  >
                    <option value="Dinh Thự Ven Biển">Dinh Thự Ven Biển</option>
                    <option value="Penthouse Hoàng Gia">Penthouse Hoàng Gia</option>
                    <option value="Sky Villa Đẳng Cấp">Sky Villa Đẳng Cấp</option>
                    <option value="Biệt Thự Đồi Thông">Biệt Thự Đồi Thông</option>
                    <option value="Dinh Thự Sinh Thái">Dinh Thự Sinh Thái</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                  Ngân Sách Dự Kiến Đầu Tư
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                >
                  <option value="50 - 80 Tỷ VNĐ">50 - 80 Tỷ VNĐ</option>
                  <option value="80 - 150 Tỷ VNĐ">80 - 150 Tỷ VNĐ</option>
                  <option value="Trên 150 Tỷ VNĐ">Trên 150 Tỷ VNĐ</option>
                  <option value="Khác">Tùy biến dự án</option>
                </select>
              </div>

              <div>
                <label className="block text-[#333333] font-semibold mb-1 sm:mb-2">
                  Nội Dung Yêu Cầu Chi Tiết
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Quý khách có nhu cầu đặt tour trải nghiệm thực tế, tư vấn phong thủy hay thiết kế may đo riêng biệt..."
                  className="w-full bg-[#F8F7F3] border border-black/10 rounded-xl sm:rounded-2xl py-3 px-3.5 sm:px-4 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm hover:bg-[#8c5a1e] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4 text-[#d4a366]" />
                <span>Gửi Yêu Cầu Bảo Mật</span>
              </button>

              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#7a7a7a] justify-center pt-1 sm:pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8c5a1e] shrink-0" />
                <span>Cam kết bảo mật thông tin tuyệt đối theo tiêu chuẩn VIP</span>
              </div>
            </form>
          )}
        </div>

        {/* Cột phải: Hệ thống các trung tâm trải nghiệm / Showroom trực tiếp */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#EFECE5] p-5 sm:p-8 rounded-3xl sm:rounded-4xl border border-black/5 space-y-5 sm:space-y-6">
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#121212]">
              Hệ Thống Showroom LOISTIQ
            </h3>

            <div className="space-y-3.5 sm:space-y-4">
              {showrooms.map((hub, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-black/5 shadow-sm space-y-2"
                >
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#121212]">
                    {hub.city}
                  </h4>
                  <div className="space-y-1 text-xs text-[#5c5c5c]">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#b8864a] shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                      <span>{hub.hotline}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#b8864a] shrink-0" />
                      <span>{hub.email}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs text-[#5c5c5c]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8c5a1e]" /> Mở cửa 8:00 - 20:00 (Hàng ngày)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phân đoạn Câu hỏi thường gặp (FAQ) */}
      <div className="bg-white p-5 sm:p-12 rounded-3xl sm:rounded-4xl border border-black/5 shadow-md space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8c5a1e]">
            Giải Đáp Thắc Mắc
          </span>
          <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#121212]">
            Câu Hỏi Thường Gặp
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl border border-black/5 space-y-2.5 sm:space-y-3">
              <div className="flex items-start gap-2 text-xs sm:text-sm font-serif font-bold text-[#121212]">
                <HelpCircle className="w-4 h-4 text-[#b8864a] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </div>
              <p className="text-xs text-[#5c5c5c] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
