"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import HeroConveyorAnimation from "./HeroConveyorAnimation";

gsap.registerPlugin(useGSAP);

// أبعاد شبكة البكسلات فوق المكنة (20 عمود × 8 صفوف = 160 مربع مصمت بدون حواف)
const GRID_COLS = 20;
const GRID_ROWS = 8;
const TOTAL_SQUARES = GRID_COLS * GRID_ROWS;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // 1. أنيميشن كلمات العنوان بالـ Blur (ثابت زي ما هو)
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 18, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.055,
        },
      )
        // 2. ظهور الوصف (ثابت زي ما هو)
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 14, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.45",
        )
        // 3. ظهور الأزرار (ثابت زي ما هو)
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 16, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.5",
        )
        // 4. الطبقة اللي فوق المكنة: بكسلات مصمتة بتختفي فجأة كنبضات ديجيتال
        .to(
          ".grid-square",
          {
            opacity: 0,
            duration: 0.12, // اختفاء خاطف لكل مربع بدل الـ Fade البطئ
            ease: "steps(2)", // تكنيك الـ Digital Shutter في Framer
            stagger: {
              amount: 0.75,
              grid: [GRID_ROWS, GRID_COLS],
              from: "random",
            },
            onComplete: () => {
              if (gridOverlayRef.current) {
                gsap.set(gridOverlayRef.current, { display: "none" });
              }
            },
          },
          "-=0.65",
        )
        // 5. ظهور المكنة تحت المربعات بحجمها الطبيعي 100% من أول لحظة (بدون Scale)
        .fromTo(
          ".conveyor-wrapper",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<",
        );
    },
    { scope: heroRef },
  );

  const squares = Array.from({ length: TOTAL_SQUARES });

  return (
    <SectionWrapper
      id="hero"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="pt-12 pb-12 lg:h-[803px] lg:pt-[68px] lg:pb-[80px]"
    >
      <div ref={heroRef} className="flex h-full flex-col justify-between">
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center bg-[#FCFCFC] px-6 text-center sm:px-10 lg:h-[239px]">
          {/* العنوان */}
          <h1 className="font-heading text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#1A1A1A] sm:text-5xl md:text-[48px]">
            <span className="hero-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
              Build
            </span>{" "}
            <span className="hero-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
              AI
            </span>{" "}
            <span className="hero-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
              workflows
            </span>{" "}
            <span className="hero-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
              that
            </span>
            <br />
            <span className="hero-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
              run
            </span>{" "}
            <span className="hero-word inline-block translate-y-[18px] text-[#999999] opacity-0 blur-[10px]">
              your
            </span>{" "}
            <span className="hero-word inline-block translate-y-[18px] text-[#999999] opacity-0 blur-[10px]">
              business
            </span>
          </h1>

          {/* الوصف */}
          <p className="hero-desc mx-auto mt-4 max-w-[635px] translate-y-[14px] text-base font-medium leading-[1.4] tracking-[-0.01em] text-[#737373] opacity-0 blur-[8px]">
            Connect your tools, deploy autonomous AI agents, and automate
            complex workflows all from a single visual platform.
          </p>

          {/* الأزرار */}
          <div className="mt-8 flex min-h-[48px] flex-wrap items-center justify-center gap-4">
            <Link
              href="#features"
              className="hero-btn group relative inline-flex h-11 translate-y-[16px] items-center justify-center overflow-hidden rounded-[4px] bg-[#1A1A1A] px-6 py-2.5 text-sm font-medium whitespace-nowrap text-white opacity-0 blur-[4px] transition-colors duration-500 ease-in-out hover:bg-[#404040]"
            >
              <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-y-[-150%]">
                Start Building
              </span>
              <span className="absolute inline-block translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                Start Building
              </span>
            </Link>

            <Link
              href="#how-it-works"
              className="hero-btn group relative inline-flex h-11 translate-y-[16px] items-center justify-center gap-2.5 overflow-hidden rounded-[4px] border border-[#E5E5E5] bg-[#F3F3F3] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-[#1A1A1A] opacity-0 blur-[4px] transition-colors duration-300 hover:bg-[#EAEAEA]"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M2.5 1.5L10.5 6L2.5 10.5V1.5Z" />
              </svg>
              <span className="relative inline-flex overflow-hidden">
                <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-y-[-150%]">
                  Get started now
                </span>
                <span className="absolute left-0 inline-block translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  Get started now
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* النصف التحتاني: المكنة وفوقها طبقة البكسلات المصمتة */}
        <div className="relative z-0 -mt-3 w-full overflow-hidden lg:mt-0">
          {/* طبقة البكسلات بدون أي Borders عشان تندمج مع خلفية الصفحة تماماً قبل الكشف */}
          <div
            ref={gridOverlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 grid grid-cols-10 grid-rows-8 sm:grid-cols-16 lg:grid-cols-20"
          >
            {squares.map((_, i) => (
              <div key={i} className="grid-square -m-[0.5px] bg-[#FCFCFC]" />
            ))}
          </div>

          {/* المكنة وخط الإنتاج */}
          <div className="conveyor-wrapper opacity-0">
            <HeroConveyorAnimation />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
