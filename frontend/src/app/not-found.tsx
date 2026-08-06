import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#F8F7F3]">
      <div className="text-center max-w-lg space-y-6 bg-white p-10 rounded-4xl border border-black/5 shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8864a]/10 text-[#8c5a1e] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>404 - Không Tìm Thấy Trang</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#121212]">
          Không Gian Không Tồn Tại
        </h1>

        <p className="text-sm text-[#5c5c5c] leading-relaxed">
          Địa chỉ bất động sản Quý khách đang tìm kiếm có thể đã được chuyển đổi hoặc chưa công bố chính thức.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#121212] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#333333] transition-colors"
          >
            <Home className="w-4 h-4 text-[#b8864a]" /> Về Trang Chủ
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 text-xs font-semibold text-[#121212] hover:bg-black/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Xem Bộ Sưu Tập
          </Link>
        </div>
      </div>
    </div>
  );
}
