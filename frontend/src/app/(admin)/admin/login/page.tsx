'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/context/ToastContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAdminAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast({
        type: 'success',
        title: 'Đăng nhập thành công!',
        description: 'Chào mừng Giám Đốc Quản Trị quay trở lại hệ thống LOISTIQ.',
      });
      router.push('/admin');
    } else {
      showToast({
        type: 'error',
        title: 'Đăng nhập không thành công',
        description: result.message || 'Email hoặc mật khẩu quản trị viên không chính xác. Vui lòng kiểm tra lại!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#121212] flex flex-col lg:flex-row selection:bg-[#b8864a] selection:text-white font-sans">
      {/* 1. Left Editorial Showcase Panel (Desktop) */}
      <div className="relative hidden lg:flex lg:w-5/12 xl:w-1/2 bg-[#121212] text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Luxury Architectural Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600"
            alt="LOISTIQ Luxury Architecture"
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#121212]/60" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold tracking-tight text-white">
              LOISTIQ
            </span>
            <span className="text-[9px] uppercase tracking-[3px] text-[#e0a868] font-semibold border-l border-white/20 pl-3">
              Management
            </span>
          </div>
        </div>

        {/* Architectural Quote & Client Link CTA */}
        <div className="relative z-10 space-y-6 max-w-md">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[3px] text-[#e0a868] font-semibold">
              Tuyệt Tác Nghệ Thuật Sống
            </p>
            <h2 className="font-serif text-2xl xl:text-3xl font-normal leading-snug text-white/95">
              Hệ thống điều hành danh mục bất động sản nghỉ dưỡng & dinh thự độc bản.
            </h2>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#121212] border border-white/25 backdrop-blur-md text-xs font-semibold tracking-wide transition-all group cursor-pointer shadow-lg shadow-black/20"
            >
              <span>Truy Cập Trang Khách Hàng</span>
              <ArrowRight className="w-4 h-4 text-[#e0a868] group-hover:text-[#121212] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-white/50">
          © {new Date().getFullYear()} LOISTIQ Luxury Real Estate. All rights reserved.
        </div>
      </div>

      {/* 2. Right / Main Login Section */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#b8864a]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar for Navigation */}
        <div className="flex items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#121212]">
              LOISTIQ
            </span>
            <span className="text-[9px] uppercase tracking-[2px] text-[#8c5a1e] font-semibold border-l border-black/15 pl-2">
              Admin
            </span>
          </Link>
        </div>

        {/* Centered Login Card */}
        <div className="flex-1 flex items-center justify-center py-10 relative z-10">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-black/8 rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/3 space-y-7">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-[10px] uppercase tracking-[3px] text-[#8c5a1e] font-bold">
                Cổng Quản Trị
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
                Đăng Nhập
              </h1>
              <p className="text-xs text-[#777777]">
                Nhập thông tin quản trị viên để điều hành hệ thống
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#444444] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@loistiq.com"
                  className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl px-4 py-3.5 text-xs text-[#121212] placeholder-[#aaaaaa] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#444444] uppercase tracking-wider mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu quản trị"
                    className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl pl-4 pr-11 py-3.5 text-xs text-[#121212] placeholder-[#aaaaaa] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer p-1 rounded-md"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#121212] hover:bg-[#b8864a] text-white font-semibold py-3.5 rounded-xl text-xs tracking-wide transition-all shadow-md shadow-black/10 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
              </button>
            </form>
          </div>
        </div>

        {/* Mobile / Small screen Footer */}
        <div className="text-center text-[11px] text-[#888888] lg:hidden">
          © {new Date().getFullYear()} LOISTIQ Luxury Real Estate. All rights reserved.
        </div>
      </div>
    </div>
  );
}
