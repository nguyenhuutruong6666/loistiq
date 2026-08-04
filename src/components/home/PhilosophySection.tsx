'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Hiệu ứng Parallax 3D cho các khối hình học kính trôi nổi trong nền
      gsap.to('.shape-1', {
        y: -130,
        rotationZ: 45,
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.shape-2', {
        y: -180,
        rotationX: 45,
        rotationY: -45,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.shape-3', {
        y: -90,
        rotationZ: 90,
        rotationX: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Hiệu ứng GSAP SplitType tách từng từ và làm sáng dần chữ theo nhịp cuộn
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: 'words,chars' });
        gsap.set(split.words, { opacity: 0.15, y: 10 });

        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: true,
          },
        });
      }

      // Xuất hiện thông tin tác giả kiến trúc sư
      gsap.from('.philosophy-author', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.philosophy-author',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 bg-[#EFECE5] overflow-hidden flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]"
    >
      {/* Các khối hình học kính 3D trôi nổi trong nền */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Khối tròn trôi nổi phía trên bên trái */}
        <div className="shape shape-1 absolute top-[10%] left-[-5%] w-56 sm:w-96 h-56 sm:h-96 rounded-full bg-linear-to-br from-white/70 to-white/10 backdrop-blur-md border border-white/60 shadow-xl" />

        {/* Khối hộp bo góc lớn phía dưới bên phải */}
        <div className="shape shape-2 absolute bottom-[-10%] right-[-8%] w-64 sm:w-120 h-64 sm:h-120 rounded-[36px] sm:rounded-[48px] bg-linear-to-br from-white/60 to-white/10 backdrop-blur-md border border-white/50 shadow-2xl" />

        {/* Khối kim cương trôi nổi ở giữa bên phải */}
        <div className="shape shape-3 absolute top-[35%] right-[5%] sm:right-[10%] w-36 sm:w-64 h-36 sm:h-64 rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/70 to-white/20 backdrop-blur-md border border-white/60 shadow-xl" />
      </div>

      {/* Nội dung triết lý kiến trúc */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-10">
        <span className="text-[11px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-[#7a7a7a] inline-block border-b border-[#b8864a]/40 pb-1">
          Triết Lý Kiến Trúc LOISTIQ
        </span>

        <p
          ref={textRef}
          className="font-serif text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#121212] leading-[1.45] sm:leading-[1.45] tracking-tight"
        >
          &ldquo;Chúng tôi tin rằng, một dinh thự đích thực không chỉ đo bằng thước đất, mà được định hình bởi những khoảng không gian mang linh hồn. Sự tĩnh lặng của đường nét và sự thuần khiết của chất liệu chính là định nghĩa mới của sự xa xỉ.&rdquo;
        </p>

        {/* Khối thông tin kiến trúc sư tác giả */}
        <div className="philosophy-author pt-2 sm:pt-4 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left bg-white/70 backdrop-blur-md p-3 sm:pr-8 rounded-3xl sm:rounded-full border border-white/80 shadow-md hover:shadow-lg transition-shadow max-w-sm sm:max-w-none">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
            alt="KTS. Nguyễn Văn Lợi"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#b8864a]/50 shadow-sm shrink-0"
          />
          <div>
            <h4 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#121212] leading-tight">
              KTS. Nguyễn Văn Lợi
            </h4>
            <span className="text-[11px] sm:text-xs text-[#7a7a7a] font-medium block mt-0.5">
              Giám đốc Sáng tạo & Kiến trúc sư Trưởng LOISTIQ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
