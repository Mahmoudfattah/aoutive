"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".cta-word",
        { opacity: 0, y: 16, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clearProps: "filter",
          duration: 0.7,
          stagger: 0.06,
        },
      )
        .fromTo(
          ".cta-btn",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "expo.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".cta-geo-svg",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" },
          "-=0.6",
        );
    },
    { scope: ctaRef },
  );


   const renderSplitChars = (text: string) => {
     return text.split("").map((char, i) => (
       <span
         key={i}
         className="scroll-char inline-block"
         style={{
           color: "#999999",
           whiteSpace: char === " " ? "pre" : "normal",
         }}
       >
         {char === " " ? "\u00A0" : char}
       </span>
     ));
   };

  
  useGSAP(
    () => {
      // Scroll-driven Character Color Reveal (تأثير ضيق يركز على حرف أو حرفين)
      const chars = scrollTextRef.current?.querySelectorAll(".scroll-char");

      if (chars && chars.length > 0) {
        // نستخدم timeline مع scrub وتعديل الـ duration و stagger عشان يكون التأثير حاد ومحصور
        const colorTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollTextRef.current,
            start: "top 75%",
            end: "top 35%", // نطاق سكرول أقصر عشان الحركة تبقى مركزة وسريعة على الحروف
            scrub: true,
          },
        });

        colorTl.to(chars, {
          color: "#1A1A1A",
          duration: 0.02, // مدة قصيرة جداً لكل حرف عشان ميحصلش تداخل كبير
          stagger: {
            each: 0.03, // تتابع سريع يخلي الحرفين اللي عليه الدور هما بس اللي بيغمقوا
          },
        });
      }
    },
    { scope: ctaRef },
  );

  return (
    <SectionWrapper
      id="cta"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="relative overflow-hidden p-0"
    >
      <div
        ref={ctaRef}
        className="relative flex w-full flex-col items-start justify-between gap-10 px-6 pt-16 pb-14 sm:px-10 md:flex-row md:items-center md:pt-20 md:pb-16"
      >
        {/* الشبكة الخفيفة في الـ Top-Left واخدة نص المساحة بالظبط فوق الهيدر */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-30 w-full md:w-1/2"
          style={{
            backgroundImage:
              "linear-gradient(to right, #F1F1F1 1px, transparent 1px), linear-gradient(to bottom, #F1F1F1 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* العنصر الأول (الشمال): الكونتنت + الـ 2 Buttons */}
        <div className="relative z-10 flex w-full flex-col items-start md:w-1/2">
          <h2
            ref={scrollTextRef}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="max-w-[440px] text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[38px]"
          >
            <span className="cta-word inline-block">Ready</span>{" "}
            <span className="cta-word inline-block">to</span>{" "}
            <span className="cta-word inline-block">automate</span>{" "}
            <span className="cta-word inline-block">
              {renderSplitChars("your")}
            </span>
            <br />
            <span className="cta-word inline-block">
              {renderSplitChars(" workflows?")}
            </span>
          </h2>

          {/* الأزرار */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="#features"
              className="cta-btn group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-[4px] bg-[#1A1A1A] px-6 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors duration-500 ease-in-out hover:bg-[#404040]"
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
              className="cta-btn group relative inline-flex h-11 items-center justify-center gap-2.5 overflow-hidden rounded-[4px] border border-[#E5E5E5] bg-[#F8F8F8] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-[#737373] transition-colors duration-300 hover:bg-[#EFEFEF] hover:text-[#1A1A1A]"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="currentColor"
                className="shrink-0 text-[#888888] transition-colors group-hover:text-[#1A1A1A]"
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

        {/* العنصر الثاني (اليمين): رسمة الـ Geometric Bauhaus SVG المطابقة للصورة 1:1 */}
        <div className="cta-geo-svg relative z-10 flex w-full items-center justify-center md:w-1/2 md:justify-end">
          <div className="w-full max-w-[330px] sm:max-w-[360px] md:mr-8">
            <CtaGeometricSvg />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================================
// PURE GEOMETRIC BAUHAUS SVG (1:1 Match with Original CTA Illustration)
// ============================================================================
function CtaGeometricSvg() {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full select-none overflow-visible"
    >
      {/* 1. Top-Left Quarter Circle Sector */}
      <path
        d="M 180 0 L 180 180 L 0 180 A 180 180 0 0 1 180 0 Z"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 2. Top-Right Upper Triangle */}
      <polygon
        points="270,0 180,90 360,90"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 3. Top-Right Lower Triangle */}
      <polygon
        points="270,90 180,180 360,180"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 4. Bottom-Left Outer Circle + Inner Concentric Circle */}
      <circle
        cx="90"
        cy="270"
        r="90"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
      />
      <circle
        cx="90"
        cy="270"
        r="60"
        fill="#FCFCFC"
        stroke="#DFDFDF"
        strokeWidth="1.2"
      />

      {/* 5. Bottom-Right Left Half: Solid Right-Facing Semicircle */}
      <path
        d="M 180 180 A 90 90 0 0 1 180 360 Z"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 6. Bottom-Right Right Half: Crescent / Nested Left-Facing Semicircle */}
      <path
        d="M 360 180 A 90 90 0 0 0 360 360 Z"
        fill="#F7F7F7"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 360 206 A 64 64 0 0 0 360 334 Z"
        fill="#FCFCFC"
        stroke="#DFDFDF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
