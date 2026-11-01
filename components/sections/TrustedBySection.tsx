"use client";

import React, { useRef } from "react";
import SectionWrapper from "../ui/SectionWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface BrandLogo {
  name: string;
  icon: React.ReactNode;
}

const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "Braina",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#1A1A1A"
        />
      </svg>
    ),
  },
  {
    name: "Fluxenta",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#1A1A1A" />
        <rect x="13" y="3" width="8" height="8" rx="4" fill="#1A1A1A" />
        <rect x="3" y="13" width="8" height="8" rx="4" fill="#1A1A1A" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#1A1A1A" />
      </svg>
    ),
  },
  {
    name: "Synthora",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
          stroke="#1A1A1A"
          strokeWidth="2.5"
        />
        <circle cx="12" cy="12" r="3" fill="#1A1A1A" />
      </svg>
    ),
  },
  {
    name: "Infera",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 17L10 11L14 15L20 7"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="7" r="2.5" fill="#1A1A1A" />
      </svg>
    ),
  },
  {
    name: "Nexora",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 19V5L18 19V5"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Nexivo",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="12" r="5" stroke="#1A1A1A" strokeWidth="2.2" />
        <circle cx="15" cy="12" r="5" stroke="#1A1A1A" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    name: "Xora",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 5L19 19M19 5L5 19"
          stroke="#1A1A1A"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function TrustedBySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // إظهار العنوان وشريط اللوجوهات بنعومة باستخدام gsap.to للتأكد من كسر الـ opacity-0 الخاصة بالـ Tailwind
      gsap.to([textRef.current, containerRef.current], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // تطبيق حركة الـ Infinite Marquee
      tweenRef.current = gsap.to(".ticker-track", {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  return (
    <SectionWrapper
      id="trusted-by"
      noPadding
      showTopCrosshairs
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="px-5 py-12 sm:px-7 md:h-[185px] flex flex-col justify-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5.5">
        {/* العنوان الفرعي (بدون opacity-0 في كلاس الـ Tailwind لضمان ظهوره السليم) */}
        <p ref={textRef} className="text-center textdesc text-[18px] font-semibold tracking-[-0.01em] opacity-0 text-[#4d4d4d] -mt-3!">
          Trusted by Leading Team
        </p>

        {/* شريط اللوجوهات المتحرك */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
          className="relative w-full opacity-0 overflow-hidden"
        >
          <div className="ticker-track flex w-max items-center gap-12 pr-12 will-change-transform sm:gap-16 sm:pr-16">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-8 shrink-0 select-none items-center gap-2.5 text-[#1A1A1A] opacity-85 transition-opacity hover:opacity-100"
              >
                {brand.icon}
                <span className="font-sans text-xl font-semibold tracking-[-0.03em] text-[#1A1A1A]">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
