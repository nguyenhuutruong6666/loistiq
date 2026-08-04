'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/context/ToastContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/reui/alert';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, CircleAlert, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@loistiq.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAdminAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
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
      setErrorMessage(result.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
      showToast({
        type: 'error',
        title: 'Xác thực thất bại',
        description: result.message || 'Thông tin đăng nhập không hợp lệ.',
      });
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@gmail.com');
    setPassword('123456');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#121212] flex flex-col justify-between relative overflow-hidden selection:bg-[#b8864a] selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#b8864a]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-[#b8864a]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="p-6 sm:p-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#b8864a]/40 shadow-xs">
            <Image src="/logo.png" alt="LOISTIQ Logo" fill sizes="36px" className="object-cover" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#121212] group-hover:text-[#b8864a] transition-colors">
            LOISTIQ
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#5c5c5c] hover:text-[#121212] transition-colors flex items-center gap-1.5"
        >
          <span>Về Website Khách Hàng</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#b8864a]" />
        </Link>
      </header>

      {/* Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-white border border-black/10 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-xl shadow-black/5 space-y-6">
          {/* Card Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b8864a]/10 border border-[#b8864a]/30 text-[#8c5a1e] text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bảo Mật Nội Bộ 256-Bit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
              Cổng Quản Trị LOISTIQ
            </h1>
            <p className="text-xs text-[#7a7a7a]">
              Đăng nhập để điều hành danh mục bất động sản & thông tin khách hàng VIP
            </p>
          </div>

          {/* Error Alert nếu có */}
          {errorMessage && (
            <Alert variant="destructive" className="animate-in fade-in">
              <CircleAlert className="w-4 h-4" />
              <div>
                <AlertTitle className="text-xs font-bold">Lỗi Xác Thực</AlertTitle>
                <AlertDescription className="text-[11px]">{errorMessage}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#333333] mb-1.5">
                Email Quản Trị Viên
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@loistiq.com"
                  className="w-full bg-[#FAF7F2] border border-black/10 rounded-xl py-3 pl-10 pr-4 text-xs text-[#121212] placeholder-[#999999] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
                />
                <Mail className="w-4 h-4 text-[#8c5a1e] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#333333]">Mật Khẩu</label>
                <span className="text-[11px] text-[#8c5a1e] hover:underline cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF7F2] border border-black/10 rounded-xl py-3 pl-10 pr-10 text-xs text-[#121212] placeholder-[#999999] focus:outline-none focus:border-[#b8864a] focus:bg-white transition-colors"
                />
                <Lock className="w-4 h-4 text-[#8c5a1e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#121212] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#121212] hover:bg-[#b8864a] text-white font-semibold py-3.5 rounded-xl text-xs shadow-md shadow-black/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#e0a868]" />
                  <span>Đăng Nhập Quản Trị</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Box */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-black/5 text-center space-y-2">
            <p className="text-[11px] text-[#7a7a7a]">
              Tài khoản Demo thử nghiệm:
            </p>
            <div className="text-xs font-mono text-[#8c5a1e] font-semibold bg-white py-1.5 px-3 rounded-lg border border-black/10 shadow-2xs">
              admin@loistiq.com / admin123
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-[#121212] hover:text-[#b8864a] underline cursor-pointer pt-1"
            >
              Tự động điền tài khoản Demo
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-[#7a7a7a] relative z-10">
        © {new Date().getFullYear()} LOISTIQ Luxury Real Estate • Hệ thống Quản trị Bảo mật
      </footer>
    </div>
  );
}
