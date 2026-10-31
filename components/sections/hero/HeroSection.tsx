// ============================================================================
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import HeroConveyorAnimation from "./HeroConveyorAnimation";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-animate", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: heroRef },
  );

  return (
    <SectionWrapper
      id="hero"
      noPadding
      
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="pt-12 pb-12 lg:h-[803px] lg:pt-[68px] lg:pb-[80px]"
    >
      <div
        ref={heroRef}
        className="flex h-full flex-col justify-between "
      >
        {/* النص الأول من الشاشة: الكونتنت بارتفاع 239px وخلفية صريحة تغطي طرف الأنيميشن */}
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center bg-[#FCFCFC] px-6 text-center sm:px-10 lg:h-[229px]">
          <h1 className="hero-animate font-heading text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#1A1A1A] sm:text-5xl md:text-[48px]">
            Build AI workflows that <br /> run{" "}
            <span className="text-[#999999]">your business</span>
          </h1>

          <p className="hero-animate mx-auto mt-4 max-w-[635px] text-base font-medium leading-[1.4] tracking-[-0.01em] text-[#737373]">
            Connect your tools, deploy autonomous AI agents, and automate
            complex workflows all from a single visual platform.
          </p>

          <div className="hero-animate mt-8 flex min-h-[48px] flex-wrap items-center justify-center gap-4">
            {/* Primary Button: Start Building */}
            <Link
              href="#features"
              className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-[4px] bg-[#1A1A1A] px-6 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors duration-500 ease-in-out hover:bg-[#404040]"
            >
              <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-y-[-150%]">
                Start Building
              </span>
              <span className="absolute inline-block translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                Start Building
              </span>
            </Link>

            {/* Secondary Button: Get started now */}
            <Link
              href="#how-it-works"
              className="group relative inline-flex h-11 items-center justify-center gap-2.5 overflow-hidden rounded-[4px] border border-[#E5E5E5] bg-[#F3F3F3] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-[#1A1A1A] transition-colors duration-300 hover:bg-[#EAEAEA]"
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

        {/* النص التاني من الشاشة: أنيميشن خط الإنتاج بارتفاع 399px وداخل سنة بسيطة تحت الكونتنت */}
        <div className="relative z-0 -mt-3 w-full lg:mt-0">
          <HeroConveyorAnimation />
        </div>
      </div>
    </SectionWrapper>
  );
}
