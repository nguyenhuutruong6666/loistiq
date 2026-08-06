'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/data/navigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F7F3]/90 backdrop-blur-md shadow-sm border-b border-black/5 py-3.5'
          : 'bg-[#F8F7F3]/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo thương hiệu */}
        <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 overflow-hidden rounded-full border border-[#b8864a]/30 shadow-xs">
            <Image
              src="/logo.png"
              alt="LOISTIQ Logo"
              fill
              sizes="36px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] transition-colors duration-300 group-hover:text-[#8c5a1e]">
            LOISTIQ
          </span>
        </Link>

        {/* Danh sách liên kết điều hướng trên Desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 hover:text-[#121212] ${
                  isActive ? 'text-[#121212] font-semibold' : 'text-[#5c5c5c]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#121212] transform origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Nút gọi Hotline và Đặt lịch tư vấn bên phải */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:18006666"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7a7a7a] hover:text-[#b8864a] transition-colors py-2 px-3 rounded-full hover:bg-black/5"
          >
            <Phone className="w-3.5 h-3.5 text-[#b8864a]" />
            <span>1800 6666</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#121212] text-white text-xs sm:text-sm font-medium py-2.5 px-5 rounded-full hover:bg-[#333333] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Đặt Lịch Tư Vấn</span>
            <ArrowUpRight className="w-4 h-4 text-[#b8864a]" />
          </Link>
        </div>

        {/* Nút bật/tắt Menu trên thiết bị di động */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#121212] rounded-lg hover:bg-black/5 focus:outline-none"
          aria-label="Bật tắt menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu thả xuống trên thiết bị di động */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F8F7F3] border-b border-black/10 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-black/5 ${
                  pathname === link.href ? 'text-[#b8864a] font-bold' : 'text-[#121212]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:18006666"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#121212] py-2.5 rounded-full bg-black/5"
            >
              <Phone className="w-4 h-4 text-[#b8864a]" />
              <span>Hotline: 1800 6666</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#121212] text-white text-sm font-medium py-3 rounded-full shadow"
            >
              <span>Đặt Lịch Tư Vấn 1-1</span>
              <ArrowUpRight className="w-4 h-4 text-[#b8864a]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
