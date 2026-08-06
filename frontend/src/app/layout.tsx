import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

// Cấu hình phông chữ Lora hỗ trợ tiếng Việt mượt mà cho tiêu đề và phong cách sang trọng
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Cấu hình phông chữ Plus Jakarta Sans hiện đại cho phần thân trang
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Cấu hình SEO và thông tin OpenGraph của website
export const metadata: Metadata = {
  title: "LOISTIQ | Tuyệt Tác Bất Động Sản & Dinh Thự Nghỉ Dưỡng Hạng Sang",
  description: "Khám phá bộ sưu tập dinh thự ven biển, Sky Villa, Penthouse hoàng gia độc bản từ LOISTIQ Luxury Real Estate. Nâng tầm chuẩn mực sống thượng lưu.",
  keywords: "bất động sản cao cấp, dinh thự biển, penthouse hồ chí minh, sky villa đà nẵng, biệt thự đà lạt, loistiq luxury",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "LOISTIQ | Tuyệt Tác Bất Động Sản & Dinh Thự Nghỉ Dưỡng Hạng Sang",
    description: "Bộ sưu tập dinh thự ven biển, Penthouse hoàng gia độc bản từ LOISTIQ.",
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${lora.variable} ${jakarta.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-[#F8F7F3] text-[#121212] flex flex-col min-h-screen">
        <AdminAuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
