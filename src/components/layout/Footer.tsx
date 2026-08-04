'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FOOTER_COLLECTION_LINKS } from '@/data/navigation';
import { useToast } from '@/context/ToastContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'error',
        title: 'Email không hợp lệ',
        description: 'Vui lòng nhập chính xác địa chỉ email của bạn.',
      });
      return;
    }

    showToast({
      type: 'success',
      title: 'Đăng ký nhận tin thành công!',
      description: 'Bản tin VIP và tạp chí LOISTIQ sẽ sớm được gửi tới email của Quý khách.',
    });
    setEmail('');
  };
  return (
    <footer className="bg-[#EBE7DF] text-[#121212] border-t border-black/5 pt-12 sm:pt-14 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-black/10">
          {/* Thông tin thương hiệu: Chiếm toàn bộ chiều rộng trên mobile, 2 cột trên tablet, 2 cột trên desktop */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 overflow-hidden rounded-full border border-[#b8864a]/30 shadow-xs">
                <Image
                  src="/logo.png"
                  alt="LOISTIQ Logo"
                  fill
                  sizes="36px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-[#121212]">
                LOISTIQ
              </span>
            </Link>
            <p className="text-[#5c5c5c] text-sm leading-relaxed max-w-sm">
              Định hình chuẩn mực mới của phong cách sống thượng lưu. Chúng tôi tuyển chọn và phát triển những dinh thự ven biển, Penthouse và Sky Villa độc bản dành riêng cho những chủ nhân danh giá.
            </p>

            <div className="space-y-2 text-sm text-[#333333] pt-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#b8864a] shrink-0" />
                <span>Hotline VIP: <strong>1800 6666</strong> (24/7)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#b8864a] shrink-0" />
                <span>concierge@loistiq.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#b8864a] shrink-0 mt-0.5" />
                <span>Tầng 38, Bitexco Financial Tower, Quận 1, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* Cột 1: Danh mục bộ sưu tập */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-base text-[#121212] tracking-wider uppercase">
              Bộ Sưu Tập
            </h4>
            <ul className="space-y-2.5 text-sm text-[#5c5c5c]">
              {FOOTER_COLLECTION_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#121212] hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: Dịch vụ thượng lưu */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-base text-[#121212] tracking-wider uppercase">
              Dịch Vụ Đặc Quyền
            </h4>
            <ul className="space-y-2.5 text-sm text-[#5c5c5c]">
              <li>
                <Link href="/experience-3d" className="hover:text-[#121212] hover:translate-x-1 inline-block transition-all">
                  Phòng Chiếu 3D & VR Tour
                </Link>
              </li>
              <li>
                <Link href="/philosophy" className="hover:text-[#121212] hover:translate-x-1 inline-block transition-all">
                  Triết Lý Kiến Trúc
                </Link>
              </li>
              <li className="hover:text-[#121212] transition-colors cursor-pointer">
                Tư Vấn Đầu Tư Private
              </li>
              <li className="hover:text-[#121212] transition-colors cursor-pointer">
                Tour Xem Nhà Trực Thăng & Du Thuyền
              </li>
              <li className="hover:text-[#121212] transition-colors cursor-pointer">
                Thiết Kế Nội Thất May Đo 1-1
              </li>
            </ul>
          </div>

          {/* Cột 3: Đăng ký nhận bản tin */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-base text-[#121212] tracking-wider uppercase">
              Tạp Chí LOISTIQ
            </h4>
            <p className="text-xs text-[#5c5c5c] leading-relaxed">
              Đăng ký để nhận bản tin độc quyền về các dự án giới hạn và xu hướng kiến trúc thượng lưu.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn..."
                  className="w-full bg-white/70 border border-black/10 rounded-full py-2.5 pl-4 pr-10 text-xs text-[#121212] placeholder-[#7a7a7a] focus:outline-none focus:border-[#b8864a] focus:bg-white"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký nhận tin"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#121212] text-white flex items-center justify-center hover:bg-[#b8864a] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-[#7a7a7a] block">
                * Cam kết bảo mật thông tin 100%
              </span>
            </form>
          </div>
        </div>

        {/* Bản quyền và mạng xã hội */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a7a7a]">
          <p>© {new Date().getFullYear()} LOISTIQ Luxury Real Estate. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#121212] transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
