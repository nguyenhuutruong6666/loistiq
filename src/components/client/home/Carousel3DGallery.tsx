'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CAROUSEL_GALLERY_ITEMS } from '@/data/properties';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL = CAROUSEL_GALLERY_ITEMS.length;
const ANGLE_STEP = 360 / TOTAL; // Góc quay tương ứng mỗi thẻ trong vòng xoay (36 độ)

const Carousel3DGallery: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Bán kính xoay 3D động theo kích thước màn hình
  const [radius, setRadius] = useState<number>(420);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setRadius(260);
      } else if (width < 768) {
        setRadius(330);
      } else if (width < 1024) {
        setRadius(380);
      } else {
        setRadius(420);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useGSAP(
    () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      // Tối ưu hóa GPU render mượt mà
      gsap.set(carousel, { willChange: 'transform' });

      // Hiệu ứng quay 360 độ liên tục
      tweenRef.current = gsap.to(carousel, {
        rotateY: '+=360',
        duration: 42,
        ease: 'none',
        repeat: -1,
        paused: true,
      });

      // ScrollTrigger: Tự động chạy khi lọt vào màn hình và tạm dừng khi cuộn ra ngoài để tiết kiệm tài nguyên
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => tweenRef.current?.play(),
        onLeave: () => tweenRef.current?.pause(),
        onEnterBack: () => tweenRef.current?.play(),
        onLeaveBack: () => tweenRef.current?.pause(),
      });

      // Hiệu ứng bung nở các thẻ khi lần đầu cuộn đến phân đoạn
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.p3d2-card', {
            opacity: 0,
            scale: 0.3,
            duration: 1.4,
            stagger: 0.06,
            ease: 'back.out(1.2)',
          });
        },
      });

      // Giảm tốc độ quay khi người dùng rê chuột hoặc chạm tay lên vòng xoay để dễ quan sát
      const slow = () =>
        gsap.to(tweenRef.current, { timeScale: 0.08, duration: 0.6, ease: 'power2.out' });
      const fast = () =>
        gsap.to(tweenRef.current, { timeScale: 1, duration: 1, ease: 'power2.inOut' });

      carousel.addEventListener('mouseenter', slow);
      carousel.addEventListener('mouseleave', fast);
      carousel.addEventListener('touchstart', slow, { passive: true });
      carousel.addEventListener('touchend', fast, { passive: true });

      return () => {
        carousel.removeEventListener('mouseenter', slow);
        carousel.removeEventListener('mouseleave', fast);
        carousel.removeEventListener('touchstart', slow);
        carousel.removeEventListener('touchend', fast);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      id="experience-3d"
      ref={rootRef}
      className="relative w-full min-h-[80vh] sm:min-h-[88vh] lg:min-h-[95vh] overflow-hidden flex flex-col items-center justify-between py-10 sm:py-14 lg:py-16 bg-[#F5F1EB]"
    >
      {/* Các lớp phông nền 3D và đổ bóng vignette */}
      <div className="p3d2-bg-layer" />
      <div className="p3d2-vignette" />

      {/* Khối tiêu đề phân đoạn */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto pointer-events-auto space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 border border-[#8c5a1e]/40 text-[#8c5a1e] text-[10px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] py-1 sm:py-1.5 px-3.5 sm:px-5 rounded-full bg-[#b8864a]/10 backdrop-blur-md">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b8864a]" />
          <span>Trải Nghiệm 360° Không Gian Sống</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a1208] leading-tight">
          Bộ Sưu Tập Tuyệt Tác <br />
          <span className="font-normal italic text-[#8c5a1e]">Độc Bản 3D</span>
        </h2>
      </div>

      {/* Vòng xoay không gian hình trụ 3D */}
      <div className="p3d2-scene">
        <div className="p3d2-carousel" ref={carouselRef}>
          {CAROUSEL_GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id + i}
              className="p3d2-card group"
              style={{
                transform: `rotateY(${ANGLE_STEP * i}deg) translateZ(${radius}px)`,
              }}
            >
              <Link href={`/properties/${item.id}`} className="block w-full h-full">
                <div className="p3d2-card-inner">
                  {/* Số thứ tự thẻ */}
                  <span className="p3d2-card-num">{String(i + 1).padStart(2, '0')}</span>

                  <div className="p3d2-img-wrap">
                    <img
                      src={item.src}
                      alt={item.label}
                      className="p3d2-img"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Lớp phủ chuyển màu và thông tin dự án */}
                    <div className="p3d2-card-overlay">
                      <span className="p3d2-cat">{item.category}</span>
                      <h3 className="p3d2-label">{item.label}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="p3d2-price text-[#d4a366] font-semibold">{item.price}</span>
                        <span className="text-[9px] sm:text-[10px] bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-2.5 h-2.5" /> Chi tiết
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Lời nhắc tương tác phía chân phân đoạn */}
      <div className="relative z-10 pt-4 px-4 flex flex-col items-center gap-2 text-center pointer-events-auto">
        <p className="text-[11px] sm:text-xs text-[#7a7a7a]">
          Chạm hoặc rê chuột lên các thẻ để quay chậm lại • Nhấn để khám phá chi tiết
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#121212] hover:text-[#b8864a] border-b border-[#121212]/30 pb-0.5 transition-colors"
        >
          <span>Xem tất cả danh mục bất động sản</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default Carousel3DGallery;
