"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORKFLOW_ITEMS = [
  {
    title: "Workflow Automation",
    description: "Automate tasks and run workflows across your tools.",
  },
  {
    title: "Integrations",
    description: "Connect CRMs, APIs, and internal tools seamlessly.",
  },
  {
    title: "Data Processing",
    description: "Collect and organize data across your systems.",
  },
  {
    title: "AI Decision Engine",
    description:
      "Analyze conditions and trigger the next action automatically.",
  },
];

export default function WorkflowEngineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollTextRef = useRef<HTMLHeadingElement>(null);

  // حالة لتغيير الـ activeIndex تلقائياً كل ثانيتين
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % WORKFLOW_ITEMS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // 1. GSAP Entrance Animation + Scroll-driven Character Color Reveal (Localized on 1-2 chars)
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".engine-word",
        { opacity: 0, y: 18, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.055,
        },
      )
        .fromTo(
          ".engine-desc",
          { opacity: 0, y: 14, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=0.45",
        )
        .fromTo(
          ".engine-grid-item",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.5",
        )
        .fromTo(
          ".engine-image-wrap",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5",
        );

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
          duration: 0.002, // مدة قصيرة جداً لكل حرف عشان ميحصلش تداخل كبير
          stagger: {
            each: 0.03, // تتابع سريع يخلي الحرفين اللي عليه الدور هما بس اللي بيغمقوا
          },
        });
        
      }
    },
    { scope: sectionRef },
  );

  // GSAP Isometric Window Layer Lift Animation عند تغيير الـ activeIndex تلقائياً
  useGSAP(
    () => {
      const basePositions = [
        { x: 70, y: 120 },
        { x: 118, y: 88 },
        { x: 166, y: 56 },
        { x: 214, y: 24 },
      ];

      basePositions.forEach((pos, idx) => {
        const isActive = idx === activeIndex;
        gsap.to(`.iso-win-${idx}`, {
          x: pos.x,
          y: isActive ? pos.y - 18 : pos.y,
          opacity: isActive ? 1 : idx === 0 ? 0.96 : 0.55,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
    { dependencies: [activeIndex], scope: svgRef },
  );

  const renderOrder = [3, 2, 1, 0];

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

  return (
    <SectionWrapper
      id="about"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="px-5 py-16 sm:px-7 md:py-20"
    >
      <div ref={sectionRef} className="flex flex-col gap-12">
        {/* النصف الأول: الكونتنت */}
        <div className="flex w-full flex-col items-start text-left">
          <div className="max-w-[610px]">
            <h2
              ref={scrollTextRef}
              className="font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[40px]"
            >
              <span className="engine-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
                One
              </span>{" "}
              <span className="engine-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
                AI
              </span>{" "}
              <span className="engine-word inline-block translate-y-[18px] opacity-0 blur-[10px]">
                engine
              </span>
              <br />
              <span className="inline-block">
                {renderSplitChars("infinite workflows")}
              </span>
            </h2>

            <p className="engine-desc mt-4 translate-y-[14px] text-base font-medium leading-[1.5] tracking-[-0.01em] text-[#737373] opacity-0 blur-[8px]">
              Aoutive AI runs every automation through a centralized
              intelligence engine. It connects your tools, processes data, and
              executes actions automatically so your workflows run faster and
              smarter.
            </p>
          </div>

          {/* Grid 2 Columns × 2 Rows */}
          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {WORKFLOW_ITEMS.map((item, idx) => {
              // const isActive = idx === activeIndex;
              const isActive = idx === 0
              return (
                <div
                  key={item.title}
                  className={`engine-grid-item flex flex-col justify-center rounded-[4px] p-6 opacity-0 transition-colors duration-300 ${
                    isActive || idx === 0
                      ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      : "bg-transparent"
                  }`}
                >
                  <h3
                    className={`font-heading text-xl font-semibold tracking-[-0.01em] ${
                      isActive ? "text-[#1A1A1A]" : "text-[#737373]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1.5 w-62.5 font-medium leading-relaxed text-[#737373]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* النصف الثاني: الـ SVG المتحركة تلقائياً */}
        <div className="engine-image-wrap relative flex items-center justify-center px-4 py-6 opacity-0 lg:col-span-7">
          <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden sm:h-[400px] lg:h-[430px]">
            <svg
              ref={svgRef}
              viewBox="0 0 560 400"
              className="h-full w-full max-w-[560px] select-none overflow-visible"
            >
              <defs>
                <pattern
                  id="iso-dots-next"
                  x="0"
                  y="0"
                  width="22"
                  height="13"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#E2E2E2" />
                  <circle cx="13" cy="8.5" r="1" fill="#E2E2E2" />
                </pattern>
              </defs>

              <polygon
                points="20,240 290,80 545,225 275,385"
                fill="url(#iso-dots-next)"
                opacity="0.85"
              />

              {renderOrder.map((winIdx) => {
                const isActive = activeIndex === winIdx;
                return (
                  <g key={winIdx} className={`iso-win-${winIdx}`}>
                    <polygon
                      points="0,0 9,-5 239,127 230,132"
                      fill={isActive ? "#F5F5F5" : "#FAFAFA"}
                      stroke={isActive ? "#1A1A1A" : "#DCDCDC"}
                      strokeWidth={isActive ? "1.2" : "1"}
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="230,132 239,127 239,302 230,307"
                      fill={isActive ? "#1A1A1A" : "#EAEAEA"}
                      stroke={isActive ? "#1A1A1A" : "#DCDCDC"}
                      strokeWidth={isActive ? "1.2" : "1"}
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="0,0 230,132 230,307 0,175"
                      fill="#FFFFFF"
                      stroke={isActive ? "#1A1A1A" : "#E0E0E0"}
                      strokeWidth={isActive ? "1.3" : "1"}
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="0,0 230,132 230,157 0,25"
                      fill={isActive ? "#E4E4E4" : "#F6F6F6"}
                      stroke={isActive ? "#1A1A1A" : "#E0E0E0"}
                      strokeWidth={isActive ? "1.2" : "1"}
                      strokeLinejoin="round"
                    />
                    <ellipse
                      cx="14"
                      cy="18"
                      rx="3.2"
                      ry="4.2"
                      transform="skewY(29.8)"
                      fill="none"
                      stroke={isActive ? "#1A1A1A" : "#B8B8B8"}
                      strokeWidth="1.2"
                    />
                    <ellipse
                      cx="26"
                      cy="18"
                      rx="3.2"
                      ry="4.2"
                      transform="skewY(29.8)"
                      fill="none"
                      stroke={isActive ? "#1A1A1A" : "#B8B8B8"}
                      strokeWidth="1.2"
                    />
                    <ellipse
                      cx="38"
                      cy="18"
                      rx="3.2"
                      ry="4.2"
                      transform="skewY(29.8)"
                      fill="none"
                      stroke={isActive ? "#1A1A1A" : "#B8B8B8"}
                      strokeWidth="1.2"
                    />

                    {winIdx > 0 && (
                      <g transform="skewY(29.8)">
                        <rect
                          x="24"
                          y="46"
                          width="110"
                          height="9"
                          rx="2"
                          fill={isActive ? "#D4D4D4" : "#EFEFEF"}
                        />
                        <rect
                          x="24"
                          y="66"
                          width="175"
                          height="8"
                          rx="2"
                          fill="#F2F2F2"
                        />
                        <rect
                          x="24"
                          y="84"
                          width="155"
                          height="8"
                          rx="2"
                          fill="#F2F2F2"
                        />
                        <rect
                          x="24"
                          y="108"
                          width="180"
                          height="8"
                          rx="2"
                          fill={isActive ? "#E5E5E5" : "#F5F5F5"}
                        />
                        <rect
                          x="24"
                          y="126"
                          width="135"
                          height="8"
                          rx="2"
                          fill="#F2F2F2"
                        />
                        <rect
                          x="24"
                          y="144"
                          width="165"
                          height="8"
                          rx="2"
                          fill="#F2F2F2"
                        />
                      </g>
                    )}

                    {winIdx === 0 && (
                      <g transform="skewY(29.8)">
                        <g fill="none" stroke="#CCCCCC" strokeWidth="1.2">
                          <path d="M 52 58 L 72 58 L 72 95 L 92 95" />
                          <path d="M 52 98 L 92 98" />
                          <path d="M 52 138 L 72 138 L 72 102 L 92 102" />
                          <path d="M 138 95 L 158 95 L 158 58 L 178 58" />
                          <path d="M 138 98 L 178 98" />
                          <path d="M 138 102 L 158 102 L 158 138 L 178 138" />
                        </g>
                        <g fill="#FFFFFF" stroke="#999999" strokeWidth="1.2">
                          <circle cx="67" cy="58" r="2.2" />
                          <circle cx="72" cy="98" r="2.2" />
                          <circle cx="67" cy="138" r="2.2" />
                          <circle cx="163" cy="58" r="2.2" />
                          <circle cx="158" cy="98" r="2.2" />
                          <circle cx="163" cy="138" r="2.2" />
                        </g>
                        <g transform="translate(20, 42)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="7"
                            y="10"
                            width="12"
                            height="12"
                            rx="2"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                          />
                          <polygon
                            points="19,13 25,9 25,23 19,19"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.4"
                          />
                        </g>
                        <g transform="translate(20, 82)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="7"
                            y="10"
                            width="18"
                            height="13"
                            rx="2"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                          />
                          <polyline
                            points="7,11 16,17 25,11"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                          />
                        </g>
                        <g transform="translate(20, 122)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <g fill="#1A1A1A">
                            <rect x="13" y="7" width="3" height="7" rx="1.5" />
                            <circle cx="11" cy="12.5" r="1.5" />
                            <rect x="17" y="13" width="7" height="3" rx="1.5" />
                            <circle cx="18.5" cy="10.5" r="1.5" />
                            <rect x="16" y="18" width="3" height="7" rx="1.5" />
                            <circle cx="21" cy="19.5" r="1.5" />
                            <rect x="8" y="16" width="7" height="3" rx="1.5" />
                            <circle cx="13.5" cy="21.5" r="1.5" />
                          </g>
                        </g>
                        <g transform="translate(92, 76)">
                          <rect
                            width="46"
                            height="46"
                            rx="8"
                            fill="#FFFFFF"
                            stroke={isActive ? "#1A1A1A" : "#B5B5B5"}
                            strokeWidth={isActive ? "1.6" : "1.2"}
                          />
                          <path
                            d="M14 30V16C14 14.5 15.5 13.5 17 14.2L30 21C31.5 21.8 31.5 24 30 24.8L22 29"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="4.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="29" cy="30" r="2.6" fill="#1A1A1A" />
                        </g>
                        <g transform="translate(178, 42)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="7"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeDasharray="5 2"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="2.5"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.3"
                          />
                        </g>
                        <g transform="translate(178, 82)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="9"
                            y="9"
                            width="15"
                            height="14"
                            rx="1.5"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.4"
                          />
                          <rect
                            x="7"
                            y="11"
                            width="9"
                            height="10"
                            rx="1"
                            fill="#1A1A1A"
                          />
                          <path
                            d="M9.5 13.5L13.5 18.5M13.5 13.5L9.5 18.5"
                            stroke="#FFFFFF"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                          />
                        </g>
                        <g transform="translate(178, 122)">
                          <rect
                            width="32"
                            height="32"
                            rx="6"
                            fill="#FFFFFF"
                            stroke="#CCCCCC"
                            strokeWidth="1.2"
                          />
                          <rect
                            x="8"
                            y="8"
                            width="16"
                            height="16"
                            rx="2"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 20V12L20 20V12"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
