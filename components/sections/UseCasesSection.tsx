"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface UseCaseCardItem {
  id: string;
  row: 1 | 2;
  title: string;
  description: string;
  svgType:
    | "lead-qualification"
    | "support-ticket-routing"
    | "campaign-automation"
    | "data-synchronization"
    | "invoice-processing";
}

const USE_CASES_DATA: UseCaseCardItem[] = [
  // الصف الأول: عمودين (2 Columns)
  {
    id: "lead-qualification",
    row: 1,
    title: "Lead Qualification",
    description:
      "Automatically analyze incoming leads, score them using AI, and send qualified prospects directly to your CRM pipeline.",
    svgType: "lead-qualification",
  },
  {
    id: "support-ticket-routing",
    row: 1,
    title: "Support Ticket Routing",
    description:
      "Categorize support tickets, assign them to the right team, and trigger automated responses for common issues.",
    svgType: "support-ticket-routing",
  },
  // الصف الثاني: 3 أعمدة (3 Columns)
  {
    id: "campaign-automation",
    row: 2,
    title: "Campaign Automation",
    description:
      "Trigger marketing workflows based on customer behavior and engagement.",
    svgType: "campaign-automation",
  },
  {
    id: "data-synchronization",
    row: 2,
    title: "Data Synchronization",
    description:
      "Collect and sync data across tools, APIs, and internal systems.",
    svgType: "data-synchronization",
  },
  {
    id: "invoice-processing",
    row: 2,
    title: "Invoice Processing",
    description: "Extract invoice data and route approvals automatically.",
    svgType: "invoice-processing",
  },
];

export default function UseCasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1GridRef = useRef<HTMLDivElement>(null);
  const row2GridRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Keep the heading entrance independent from the card movements.
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      headerTl.fromTo(
        ".uc-header-item",
        { opacity: 0, y: 18, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.1,
        },
      );

      const mm = gsap.matchMedia();

      // Desktop card fade-in. Opacity is animated separately so it never
      // competes with the scroll-linked x/y transforms.
      mm.add("(min-width: 1024px)", () => {
        const row1Grid = row1GridRef.current;
        const row2Grid = row2GridRef.current;

        if (row1Grid) {
          gsap.fromTo(
            ".uc-row1-card",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row1Grid,
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        if (row2Grid) {
          gsap.fromTo(
            ".uc-row2-card",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row2Grid,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      });

      // On tablets, only the three-column row needs the separate fade-in.
      // The first row uses its own upward, scroll-linked reveal below.
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const row2Grid = row2GridRef.current;
        if (!row2Grid) return;

        gsap.fromTo(
          ".uc-row2-card",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Grid,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Desktop: both rows start stacked in the center and spread back into
      // their original grid positions as the user scrolls.
      mm.add("(min-width: 1024px)", () => {
        const row1Grid = row1GridRef.current;
        const row2Grid = row2GridRef.current;

        if (row1Grid) {
          const row1Cards = gsap.utils.toArray<HTMLElement>(
            ".uc-row1-card",
            row1Grid,
          );

          if (row1Cards.length === 2) {
            const row1Tl = gsap.timeline({
              scrollTrigger: {
                trigger: row1Grid,
                start: "top 88%",
                end: "top 30%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            row1Tl.fromTo(
              row1Cards,
              {
                // Equal-width columns + the 20px gap bring both cards together.
                xPercent: (index) => (index === 0 ? 50 : -50),
                x: (index) => (index === 0 ? 10 : -10),
                y: (index) => (index === 0 ? 10 : -10),
                rotation: (index) => (index === 0 ? -1.25 : 1.25),
              },
              {
                xPercent: 0,
                x: 0,
                y: 0,
                rotation: 0,
                duration: 1,
                ease: "none",
              },
            );
          }
        }

        if (row2Grid) {
          const row2Cards = gsap.utils.toArray<HTMLElement>(
            ".uc-row2-card",
            row2Grid,
          );

          if (row2Cards.length === 3) {
            const row2Tl = gsap.timeline({
              scrollTrigger: {
                trigger: row2Grid,
                start: "top 88%",
                end: "top 30%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            row2Tl.fromTo(
              row2Cards,
              {
                // Left and right cards move to the middle card's center.
                // The right card is layered above the other two by its z-index.
                xPercent: (index) =>
                  index === 0 ? 100 : index === 2 ? -100 : 0,
                x: (index) => (index === 0 ? 20 : index === 2 ? -20 : 0),
                y: (index) => (index === 1 ? -12 : 12),
                rotation: (index) =>
                  index === 0 ? -1.2 : index === 2 ? 1.2 : 0,
                scale: 0.985,
              },
              {
                xPercent: 0,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 1,
                ease: "none",
              },
            );
          }
        }
      });

      // Tablet: the first row is still a vertical list, while the second row
      // already has three columns. Reveal the first-row cards upward and give
      // the three-card row the same stack-to-grid movement as desktop.
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const row1Cards = gsap.utils.toArray<HTMLElement>(
          ".uc-row1-card",
          sectionRef.current ?? undefined,
        );

        row1Cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 64, opacity: 0, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                end: "top 68%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        const row2Grid = row2GridRef.current;
        if (!row2Grid) return;

        const row2Cards = gsap.utils.toArray<HTMLElement>(
          ".uc-row2-card",
          row2Grid,
        );

        if (row2Cards.length === 3) {
          const row2Tl = gsap.timeline({
            scrollTrigger: {
              trigger: row2Grid,
              start: "top 88%",
              end: "top 30%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          row2Tl.fromTo(
            row2Cards,
            {
              xPercent: (index) => (index === 0 ? 100 : index === 2 ? -100 : 0),
              x: (index) => (index === 0 ? 20 : index === 2 ? -20 : 0),
              y: (index) => (index === 1 ? -12 : 12),
              rotation: (index) => (index === 0 ? -1.2 : index === 2 ? 1.2 : 0),
              scale: 0.985,
            },
            {
              xPercent: 0,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1,
              ease: "none",
            },
          );
        }
      });

      // Phone: all five cards remain in their natural one-column layout.
      // Each card rises into its original position as it enters the viewport;
      // separate ScrollTriggers make the reveal happen one card after another.
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".uc-bento-card",
          sectionRef.current ?? undefined,
        );

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 72,
              opacity: 0,
              scale: 0.985,
              filter: "blur(4px)",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                end: "top 66%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const row1Items = USE_CASES_DATA.filter((item) => item.row === 1);
  const row2Items = USE_CASES_DATA.filter((item) => item.row === 2);


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
            duration: 0.002, // مدة قصيرة جداً لكل حرف عشان ميحصلش تداخل كبير
            stagger: {
              each: 0.03, // تتابع سريع يخلي الحرفين اللي عليه الدور هما بس اللي بيغمقوا
            },
          });
        }
      },
      { scope: sectionRef },
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

  return (
    <SectionWrapper
      id="use-cases"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="px-4 py-12 sm:px-7 md:py-16"
    >
      <div ref={sectionRef}>
        {/* 1. الكونتنت العلوي في المنتصف (text-center) */}
        <div className="mx-auto text-center">
          <span className="uc-header-item inline-block text- font-medium tracking-[-0.01em] text-[#4D4D4D]">
            Use Cases
          </span>

          <h2
            className="uc-header-item mx-auto mt-2 max-w-3xl font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[44px]"
            ref={scrollTextRef}
          >
            Automate workflows{" "}
            <span className="text-[#999999]">
              {renderSplitChars("acrossyour entire business")}{" "}
            </span>
          </h2>

          <p className="uc-header-item mx-auto mt-3.5 max-w-[690px] text-sm font-medium leading-[1.55] tracking-[-0.01em] text-[#737373] sm:text-base">
            Aoutive AI helps teams automate repetitive tasks, connect tools, and
            execute workflows automatically across sales, marketing, support,
            and operations.
          </p>
        </div>

        {/* 2. الـ Bento Grid (صف 1: عمودين | صف 2: 3 أعمدة بدون bg-white وبدون padding زائد) */}
        <div className="mt-10 flex flex-col gap-5">
          {/* الصف الأول: عمودين (grid-cols-1 lg:grid-cols-2) */}
          <div
            ref={row1GridRef}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            {row1Items.map((card, index) => (
              <div
                key={card.id}
                className={`uc-bento-card uc-row1-card relative flex flex-col justify-between overflow-hidden rounded-[4px] border border-[#EFEFEF] bg-[#FCFCFC] ${index === 0 ? "z-10" : "z-20"}`}
              >
                <div className="relative flex h-[230px] w-full items-center justify-center px-4 pt-4 sm:h-[260px]">
                  <UseCaseIllustration svgType={card.svgType} />
                </div>

                <div className="px-5 pt-2 pb-5 sm:px-6 sm:pb-6">
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-[#1A1A1A] sm:text-[20px]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-normal leading-[1.55] text-[#737373]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* الصف الثاني: 3 أعمدة على md وما فوق */}
          <div
            ref={row2GridRef}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {row2Items.map((card, index) => (
              <div
                key={card.id}
                className={`uc-bento-card uc-row2-card relative flex flex-col justify-between overflow-hidden rounded-[4px] border border-[#EFEFEF] bg-[#FCFCFC] ${index === 0 ? "z-10" : index === 1 ? "z-20" : "z-30"}`}
              >
                <div className="relative flex h-[210px] w-full items-center justify-center px-3 pt-4 sm:h-[230px]">
                  <UseCaseIllustration svgType={card.svgType} />
                </div>

                <div className="px-5 pt-2 pb-5 sm:px-6 sm:pb-6">
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-[#1A1A1A] sm:text-[19px]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-normal leading-[1.55] text-[#737373]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ============================================================================
// ALL 5 PURE ISOMETRIC SVGS INCLUDED IN THE SAME FILE BELOW
// ============================================================================
function getIsoRoundedTilePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  cornerFrac = 0.16,
) {
  const c = cornerFrac;
  const pT1 = { x: cx - rx * c, y: cy - ry * (1 - c) };
  const pT2 = { x: cx + rx * c, y: cy - ry * (1 - c) };
  const pR1 = { x: cx + rx * (1 - c), y: cy - ry * c };
  const pR2 = { x: cx + rx * (1 - c), y: cy + ry * c };
  const pB1 = { x: cx + rx * c, y: cy + ry * (1 - c) };
  const pB2 = { x: cx - rx * c, y: cy + ry * (1 - c) };
  const pL1 = { x: cx - rx * (1 - c), y: cy + ry * c };
  const pL2 = { x: cx - rx * (1 - c), y: cy - ry * c };

  return `
    M ${pT1.x} ${pT1.y}
    Q ${cx} ${cy - ry} ${pT2.x} ${pT2.y}
    L ${pR1.x} ${pR1.y}
    Q ${cx + rx} ${cy} ${pR2.x} ${pR2.y}
    L ${pB1.x} ${pB1.y}
    Q ${cx} ${cy + ry} ${pB2.x} ${pB2.y}
    L ${pL1.x} ${pL1.y}
    Q ${cx - rx} ${cy} ${pL2.x} ${pL2.y}
    Z
  `;
}

function IsoWhiteRoundedTile({
  cx,
  cy,
  rx = 56,
  ry = 33,
  depth = 13,
  children,
}: {
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  depth?: number;
  children?: React.ReactNode;
}) {
  const c = 0.16;
  const topPath = getIsoRoundedTilePath(cx, cy, rx, ry, c);
  return (
    <g>
      <path
        d={`M ${cx - rx * (1 - c * 0.3)} ${cy + ry * c * 0.2} L ${cx - rx * (1 - c * 0.3)} ${cy + depth + ry * c * 0.2} Q ${cx - rx * (1 - c)} ${cy + depth + ry * c} ${cx - rx * c} ${cy + depth + ry * (1 - c)} Q ${cx} ${cy + depth + ry} ${cx} ${cy + depth + ry * 0.98} L ${cx} ${cy + ry * 0.98} Z`}
        fill="#F4F4F4"
        stroke="#6E6E6E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx} ${cy + ry * 0.98} L ${cx} ${cy + depth + ry * 0.98} Q ${cx} ${cy + depth + ry} ${cx + rx * c} ${cy + depth + ry * (1 - c)} L ${cx + rx * (1 - c)} ${cy + depth + ry * c} Q ${cx + rx * (1 - c * 0.3)} ${cy + depth + ry * c * 0.2} ${cx + rx * (1 - c * 0.3)} ${cy + depth} L ${cx + rx * (1 - c * 0.3)} ${cy} Z`}
        fill="#E8E8E8"
        stroke="#6E6E6E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line
        x1={cx - rx * c * 0.75}
        y1={cy + ry * (1 - c * 0.75)}
        x2={cx - rx * c * 0.75}
        y2={cy + depth + ry * (1 - c * 0.75)}
        stroke="#6E6E6E"
        strokeWidth="1.1"
      />
      <line
        x1={cx + rx * c * 0.75}
        y1={cy + ry * (1 - c * 0.75)}
        x2={cx + rx * c * 0.75}
        y2={cy + depth + ry * (1 - c * 0.75)}
        stroke="#6E6E6E"
        strokeWidth="1.1"
      />
      <line
        x1={cx - rx * (1 - c * 0.85)}
        y1={cy + ry * c * 0.85}
        x2={cx - rx * (1 - c * 0.85)}
        y2={cy + depth + ry * c * 0.85}
        stroke="#6E6E6E"
        strokeWidth="1.1"
      />
      <line
        x1={cx + rx * (1 - c * 0.85)}
        y1={cy + ry * c * 0.85}
        x2={cx + rx * (1 - c * 0.85)}
        y2={cy + depth + ry * c * 0.85}
        stroke="#6E6E6E"
        strokeWidth="1.1"
      />
      <path
        d={topPath}
        fill="#FFFFFF"
        stroke="#6E6E6E"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {children}
    </g>
  );
}

function IsoBlackOctagonHub({
  cx,
  cy,
  scale = 1,
}: {
  cx: number;
  cy: number;
  scale?: number;
}) {
  const h = 40;
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <polygon
        points={`-56,13 -21,34 -21,${34 + h} -56,${13 + h}`}
        fill="#141414"
        stroke="#D4D4D4"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon
        points={`-21,34 21,34 21,${34 + h} -21,${34 + h}`}
        fill="#1A1A1A"
        stroke="#D4D4D4"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon
        points={`21,34 56,13 56,${13 + h} 21,${34 + h}`}
        fill="#111111"
        stroke="#D4D4D4"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polygon
        points="-21,-34 21,-34 56,-13 56,13 21,34 -21,34 -56,13 -56,-13"
        fill="#141414"
        stroke="#737373"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <ellipse cx="0" cy="0" rx="41" ry="24.5" fill="#DCDCDC" />
      <ellipse cx="0" cy="0" rx="38" ry="22.5" fill="#FFFFFF" />
      <g transform="scale(1, 0.58) rotate(-45) scale(1.08)">
        <path
          d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
          fill="#141414"
        />
        <polygon points="-14,4 -7,0 -7,8" fill="#141414" />
      </g>
    </g>
  );
}

function IsoMicrochipHub({
  cx,
  cy,
  scale = 1,
}: {
  cx: number;
  cy: number;
  scale?: number;
}) {
  const rx = 74;
  const ry = 44;
  const depth = 28;
  const c = 0.16;
  const topPath = getIsoRoundedTilePath(0, 0, rx, ry, c);
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <path
        d={`M ${-rx * (1 - c * 0.3)} ${ry * c * 0.2} L ${-rx * (1 - c * 0.3)} ${depth + ry * c * 0.2} Q ${-rx * (1 - c)} ${depth + ry * c} ${-rx * c} ${depth + ry * (1 - c)} Q 0 ${depth + ry} ${rx * c} ${depth + ry * (1 - c)} L ${rx * (1 - c)} ${depth + ry * c} Q ${rx * (1 - c * 0.3)} ${depth + ry * c * 0.2} ${rx * (1 - c * 0.3)} ${depth} L ${rx * (1 - c * 0.3)} 0 Z`}
        fill="#FFFFFF"
        stroke="#1A1A1A"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <line
        x1={-rx * c * 0.75}
        y1={ry * (1 - c * 0.75)}
        x2={-rx * c * 0.75}
        y2={depth + ry * (1 - c * 0.75)}
        stroke="#1A1A1A"
        strokeWidth="1.3"
      />
      <line
        x1={rx * c * 0.75}
        y1={ry * (1 - c * 0.75)}
        x2={rx * c * 0.75}
        y2={depth + ry * (1 - c * 0.75)}
        stroke="#1A1A1A"
        strokeWidth="1.3"
      />
      <path d={topPath} fill="#121212" stroke="#121212" strokeWidth="1.2" />
      <g transform="scale(1, 0.58) rotate(-45)">
        <g stroke="#FFFFFF" strokeWidth="1.15" fill="none" opacity="0.9">
          {[-12, -4, 4, 12].map((pos, i) => (
            <g key={i}>
              <polyline
                points={`${pos},-18 ${pos},-28 ${pos + (i % 2 === 0 ? -5 : 5)},-35`}
              />
              <circle
                cx={pos + (i % 2 === 0 ? -5 : 5)}
                cy="-36.5"
                r="1.5"
                fill="#121212"
                stroke="#FFFFFF"
              />
              <polyline
                points={`${pos},18 ${pos},28 ${pos + (i % 2 === 0 ? 5 : -5)},35`}
              />
              <circle
                cx={pos + (i % 2 === 0 ? 5 : -5)}
                cy="36.5"
                r="1.5"
                fill="#121212"
                stroke="#FFFFFF"
              />
              <polyline
                points={`-18,${pos} -28,${pos} -35,${pos + (i % 2 === 0 ? -5 : 5)}`}
              />
              <circle
                cx="-36.5"
                cy={pos + (i % 2 === 0 ? -5 : 5)}
                r="1.5"
                fill="#121212"
                stroke="#FFFFFF"
              />
              <polyline
                points={`18,${pos} 28,${pos} 35,${pos + (i % 2 === 0 ? 5 : -5)}`}
              />
              <circle
                cx="36.5"
                cy={pos + (i % 2 === 0 ? 5 : -5)}
                r="1.5"
                fill="#121212"
                stroke="#FFFFFF"
              />
            </g>
          ))}
        </g>
        <rect x="-18" y="-18" width="36" height="36" rx="3" fill="#FFFFFF" />
        <g transform="scale(0.85)">
          <path
            d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
            fill="#121212"
          />
          <polygon points="-14,4 -7,0 -7,8" fill="#121212" />
        </g>
      </g>
    </g>
  );
}

function IsoStandingCard({
  x,
  y,
  w = 78,
  h = 88,
  dir = "up-right",
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  dir?: "up-right" | "down-right";
  children?: React.ReactNode;
}) {
  if (dir === "up-right") {
    const wy = -w * 0.58;
    const tx = -9;
    const ty = -5.5;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          points={`0,0 ${w},${wy} ${w + tx},${wy + ty} ${tx},${ty}`}
          fill="#FAFAFA"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points={`0,0 ${tx},${ty} ${tx},${ty + h} 0,${h}`}
          fill="#EFEFEF"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points={`0,0 ${w},${wy} ${w},${wy + h} 0,${h}`}
          fill="#FFFFFF"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <g transform="skewY(-30.1)">{children}</g>
      </g>
    );
  } else {
    const wy = w * 0.58;
    const tx = 9;
    const ty = -5.5;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          points={`0,0 ${w},${wy} ${w + tx},${wy + ty} ${tx},${ty}`}
          fill="#FAFAFA"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points={`${w},${wy} ${w + tx},${wy + ty} ${w + tx},${wy + ty + h} ${w},${wy + h}`}
          fill="#EFEFEF"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points={`0,0 ${w},${wy} ${w},${wy + h} 0,${h}`}
          fill="#FFFFFF"
          stroke="#6E6E6E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <g transform="skewY(30.1)">{children}</g>
      </g>
    );
  }
}

export function LeadQualificationSvg() {
  return (
    <svg
      viewBox="0 0 540 300"
      className="h-full w-full select-none overflow-visible"
    >
      <g fill="none" stroke="#A3A3A3" strokeWidth="1.25" strokeLinejoin="round">
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            transform={`translate(${182 + i * 11.5}, ${134 - i * 6.8})`}
          >
            <polygon points="0,5 8,0 13,3 5,8 13,13 8,16" />
          </g>
        ))}
      </g>
      <g fill="none" stroke="#A3A3A3" strokeWidth="1.25" strokeLinejoin="round">
        {[0, 1, 2, 3, 4].map((i) => (
          <g
            key={i}
            transform={`translate(${304 + i * 11.5}, ${118 + i * 6.8})`}
          >
            <polygon points="0,-3 9,2 4,5 12,10 7,13 -1,8" />
          </g>
        ))}
      </g>
      <IsoWhiteRoundedTile cx={80} cy={208} rx={48} ry={28} depth={13}>
        <g transform="translate(80, 208) scale(1, 0.58) rotate(-45)">
          <rect
            x="-12"
            y="-12"
            width="24"
            height="24"
            rx="2.5"
            fill="none"
            stroke="#6E6E6E"
            strokeWidth="1.6"
          />
          <circle
            cx="-4"
            cy="-3"
            r="2.3"
            fill="none"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <circle
            cx="4"
            cy="3"
            r="2.3"
            fill="none"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <line
            x1="-2"
            y1="-1.5"
            x2="2"
            y2="1.5"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="-12"
            x2="0"
            y2="-17"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="-18.5" r="1.5" fill="#6E6E6E" />
          <line
            x1="0"
            y1="12"
            x2="0"
            y2="17"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="18.5" r="1.5" fill="#6E6E6E" />
          <line
            x1="-12"
            y1="0"
            x2="-17"
            y2="0"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <circle cx="-18.5" cy="0" r="1.5" fill="#6E6E6E" />
          <line
            x1="12"
            y1="0"
            x2="17"
            y2="0"
            stroke="#6E6E6E"
            strokeWidth="1.5"
          />
          <circle cx="18.5" cy="0" r="1.5" fill="#6E6E6E" />
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={154} cy={162} rx={52} ry={30.5} depth={13}>
        <g transform="translate(154, 162) scale(1, 0.58) rotate(-45)">
          <rect x="-21" y="-16" width="19" height="3.2" rx="1" fill="#787878" />
          <rect x="2" y="-16" width="19" height="3.2" rx="1" fill="#787878" />
          <rect x="-21" y="-10" width="19" height="3.2" rx="1" fill="#787878" />
          <rect x="2" y="-10" width="19" height="3.2" rx="1" fill="#787878" />
          <rect x="-21" y="-4" width="19" height="3.2" rx="1" fill="#787878" />
          <rect x="2" y="-4" width="19" height="3.2" rx="1" fill="#787878" />
          <rect
            x="-21"
            y="3"
            width="19"
            height="12.5"
            rx="1.5"
            fill="#787878"
          />
          <rect x="2" y="3" width="19" height="12.5" rx="1.5" fill="#787878" />
        </g>
      </IsoWhiteRoundedTile>
      <IsoBlackOctagonHub cx={262} cy={62} scale={0.95} />
      <path
        d="M 276 238 Q 266 232 276 226 L 424 140 Q 434 134 444 140 L 498 172 Q 508 178 498 184 L 350 270 Q 340 276 330 270 Z"
        fill="none"
        stroke="#B5B5B5"
        strokeWidth="1.25"
      />
      <IsoStandingCard x={364} y={116} w={70} h={84} dir="up-right" />
      <IsoStandingCard x={382} y={127} w={70} h={84} dir="up-right" />
      <IsoStandingCard x={400} y={138} w={70} h={84} dir="up-right">
        <g transform="translate(35, 27)">
          <circle
            cx="0"
            cy="0"
            r="9.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.6"
            strokeDasharray="2.2 2.8"
            strokeLinecap="round"
          />
        </g>
        <rect x="14" y="46" width="42" height="6" rx="3" fill="#EFEFEF" />
        <rect x="20" y="56" width="30" height="6" rx="3" fill="#EFEFEF" />
      </IsoStandingCard>
      <IsoStandingCard x={312} y={190} w={72} h={86} dir="up-right">
        <g transform="translate(36, 26)">
          <circle cx="0" cy="0" r="9" fill="#00A819" />
          <polyline
            points="-4,0.5 -1,3.5 4.5,-3"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="36"
          y="48"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
          fill="#1A1A1A"
        >
          Completed
        </text>
        <text
          x="36"
          y="60"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="500"
          fill="#333333"
        >
          Workflow Executed
        </text>
      </IsoStandingCard>
    </svg>
  );
}

export function SupportTicketRoutingSvg() {
  return (
    <svg
      viewBox="0 0 540 300"
      className="h-full w-full select-none overflow-visible"
    >
      <g stroke="#7A7A7A" strokeWidth="1.4" strokeDasharray="4.5 4" fill="none">
        <line x1="126" y1="168" x2="205" y2="122" />
        <line x1="292" y1="120" x2="368" y2="165" />
        <line x1="342" y1="224" x2="452" y2="158" />
      </g>
      <IsoWhiteRoundedTile cx={88} cy={195} rx={56} ry={33} depth={13}>
        <g transform="translate(88, 195) scale(1, 0.58) rotate(-45)">
          <circle
            cx="-14"
            cy="-9"
            r="7.5"
            fill="#F5F5F5"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
          <circle
            cx="-14"
            cy="-11"
            r="2.2"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.1"
          />
          <path
            d="M -18 -5.5 C -18 -8 -10 -8 -10 -5.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.1"
          />
          <rect
            x="-2"
            y="-13"
            width="22"
            height="3.5"
            rx="1.5"
            fill="#EAEAEA"
          />
          <rect
            x="-2"
            y="-7.5"
            width="15"
            height="3.5"
            rx="1.5"
            fill="#EAEAEA"
          />
          <circle
            cx="-14"
            cy="9"
            r="7.5"
            fill="#F5F5F5"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
          <text
            x="-14"
            y="12"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fill="#1A1A1A"
          >
            ?
          </text>
          <rect x="-2" y="5" width="22" height="3.5" rx="1.5" fill="#EAEAEA" />
          <rect
            x="-2"
            y="10.5"
            width="15"
            height="3.5"
            rx="1.5"
            fill="#EAEAEA"
          />
        </g>
      </IsoWhiteRoundedTile>
      <IsoMicrochipHub cx={245} cy={88} scale={0.95} />
      <IsoWhiteRoundedTile cx={468} cy={135} rx={55} ry={32.5} depth={13}>
        <g transform="translate(468, 135) scale(1, 0.58) rotate(-45)">
          <ellipse
            cx="-2"
            cy="-7"
            rx="11"
            ry="8.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.8"
          />
          <line
            x1="-6"
            y1="-9"
            x2="2"
            y2="-9"
            stroke="#1A1A1A"
            strokeWidth="1.6"
          />
          <line
            x1="-6"
            y1="-5"
            x2="0"
            y2="-5"
            stroke="#1A1A1A"
            strokeWidth="1.6"
          />
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontSize="6.8"
            fontWeight="600"
            fill="#1A1A1A"
          >
            Customer Support
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={392} cy={182} rx={55} ry={32.5} depth={13}>
        <g transform="translate(392, 182) scale(1, 0.58) rotate(-45)">
          <circle
            cx="0"
            cy="-7"
            r="8.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />
          <path
            d="M -2 -9 L 2 -5 M 2 -9 L -2 -5"
            stroke="#1A1A1A"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontSize="6.8"
            fontWeight="600"
            fill="#1A1A1A"
          >
            Technical Team
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={316} cy={229} rx={55} ry={32.5} depth={13}>
        <g transform="translate(316, 229) scale(1, 0.58) rotate(-45)">
          <circle
            cx="0"
            cy="-7"
            r="9.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.8"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="#1A1A1A"
          >
            $
          </text>
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontSize="6.5"
            fontWeight="600"
            fill="#1A1A1A"
          >
            Billing &amp; Accounts
          </text>
        </g>
      </IsoWhiteRoundedTile>
    </svg>
  );
}

export function CampaignAutomationSvg() {
  return (
    <svg
      viewBox="0 0 380 270"
      className="h-full w-full select-none overflow-visible"
    >
      <g
        stroke="#7A7A7A"
        strokeWidth="1.35"
        strokeDasharray="4 3.5"
        fill="none"
      >
        <line x1="168" y1="214" x2="108" y2="178" />
        <line x1="112" y1="154" x2="225" y2="88" />
        <line x1="175" y1="62" x2="310" y2="142" />
      </g>
      <IsoStandingCard x={112} y={8} w={68} h={72} dir="down-right">
        <g transform="translate(34, 21)">
          <rect
            x="-9"
            y="-6"
            width="18"
            height="12"
            rx="2"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.5"
          />
          <polyline
            points="-8,-5 0,1 8,-5"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.4"
          />
        </g>
        <text x="10" y="44" fontSize="7.2" fontWeight="700" fill="#1A1A1A">
          Step 1:
        </text>
        <text x="10" y="54" fontSize="5.8" fontWeight="500" fill="#333333">
          Send welcome email
        </text>
      </IsoStandingCard>
      <IsoStandingCard x={198} y={58} w={68} h={72} dir="down-right">
        <g transform="translate(34, 21)">
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.6"
          />
          <circle cx="-3" cy="-2.5" r="1.2" fill="#141B34" />
          <circle cx="3" cy="-2.5" r="1.2" fill="#141B34" />
          <path
            d="M -3.5 2.5 Q 0 5.2 3.5 2.5"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
        <text x="10" y="44" fontSize="7.2" fontWeight="700" fill="#1A1A1A">
          Step 2:
        </text>
        <text x="10" y="54" fontSize="5.8" fontWeight="500" fill="#333333">
          Tag customer
        </text>
      </IsoStandingCard>
      <IsoStandingCard x={284} y={108} w={68} h={72} dir="down-right">
        <g transform="translate(34, 21)">
          <path
            d="M -6 4 L 6 4 L 4.5 -3 C 4.5 -6.5 2.5 -8.5 0 -8.5 C -2.5 -8.5 -4.5 -6.5 -4.5 -3 Z"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M -2 4.5 A 2 2 0 0 0 2 4.5"
            fill="none"
            stroke="#141B34"
            strokeWidth="1.4"
          />
        </g>
        <text x="10" y="42" fontSize="7.2" fontWeight="700" fill="#1A1A1A">
          Step 3:
        </text>
        <text x="10" y="51" fontSize="5.5" fontWeight="500" fill="#333333">
          Send follow-up
        </text>
        <text x="10" y="58" fontSize="5.5" fontWeight="500" fill="#333333">
          notification
        </text>
      </IsoStandingCard>
      <IsoBlackOctagonHub cx={68} cy={148} scale={0.78} />
      <IsoWhiteRoundedTile cx={198} cy={224} rx={48} ry={28} depth={11}>
        <g transform="translate(198, 224) scale(1, 0.58) rotate(-45)">
          <circle
            cx="-4"
            cy="-10"
            r="5.5"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.6"
          />
          <path
            d="M -12 0 C -12 -5 4 -5 4 0"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect x="-14" y="5" width="28" height="3.2" rx="1.5" fill="#7A7A7A" />
          <rect
            x="-10"
            y="11"
            width="20"
            height="3.2"
            rx="1.5"
            fill="#7A7A7A"
          />
        </g>
      </IsoWhiteRoundedTile>
    </svg>
  );
}

export function DataSynchronizationSvg() {
  return (
    <svg
      viewBox="0 0 380 270"
      className="h-full w-full select-none overflow-visible"
    >
      <g
        stroke="#7A7A7A"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="118" y1="158" x2="275" y2="66" />
        <line x1="88" y1="140" x2="118" y2="158" />
        <line x1="164" y1="95" x2="196" y2="113" />
        <line x1="242" y1="48" x2="275" y2="66" />
        <line x1="118" y1="158" x2="162" y2="184" />
        <line x1="224" y1="184" x2="286" y2="148" />
      </g>
      <IsoWhiteRoundedTile cx={208} cy={38} rx={46} ry={27} depth={10}>
        <g transform="translate(208, 38) scale(1, 0.58) rotate(-45)">
          <ellipse
            cx="-8"
            cy="-12"
            rx="7"
            ry="3.5"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.3"
          />
          <path
            d="M -15 -12 L -15 -4 A 7 3.5 0 0 0 -1 -4 L -1 -12"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.3"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontSize="6.8"
            fontWeight="700"
            fill="#1A1A1A"
          >
            Databases
          </text>
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontSize="5.8"
            fontWeight="500"
            fill="#333333"
          >
            API 01, API 02
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={132} cy={82} rx={46} ry={27} depth={10}>
        <g transform="translate(132, 82) scale(1, 0.58) rotate(-45)">
          <circle
            cx="-8"
            cy="-9"
            r="6"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.4"
            strokeDasharray="3 1.5"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="6.2"
            fontWeight="700"
            fill="#1A1A1A"
          >
            Internal System
          </text>
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontSize="5.8"
            fontWeight="500"
            fill="#333333"
          >
            CRM, ERP
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={56} cy={126} rx={46} ry={27} depth={10}>
        <g transform="translate(56, 126) scale(1, 0.58) rotate(-45)">
          <rect
            x="-13"
            y="-14"
            width="11"
            height="13"
            rx="1.5"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.3"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="6.5"
            fontWeight="700"
            fill="#1A1A1A"
          >
            File Storage
          </text>
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontSize="5.8"
            fontWeight="500"
            fill="#333333"
          >
            CSV, XML
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoWhiteRoundedTile cx={318} cy={132} rx={46} ry={27} depth={10}>
        <g transform="translate(318, 132) scale(1, 0.58) rotate(-45)">
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fontSize="6.8"
            fontWeight="700"
            fill="#1A1A1A"
          >
            Unified Data
          </text>
          <rect x="-14" y="2" width="28" height="3" rx="1.2" fill="#7A7A7A" />
          <rect x="-14" y="7" width="28" height="3" rx="1.2" fill="#7A7A7A" />
          <rect x="-10" y="12" width="20" height="3" rx="1.2" fill="#7A7A7A" />
        </g>
      </IsoWhiteRoundedTile>
      <IsoMicrochipHub cx={190} cy={205} scale={0.82} />
    </svg>
  );
}

export function InvoiceProcessingSvg() {
  return (
    <svg
      viewBox="0 0 380 270"
      className="h-full w-full select-none overflow-visible"
    >
      <g fill="none" stroke="#BDBDBD" strokeWidth="1.15" strokeLinejoin="round">
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            transform={`translate(${106 + i * 9.5}, ${106 - i * 5.5})`}
          >
            <polygon points="0,3 7,0 11,2.5 4,5.5 11,9 7,11.5" />
          </g>
        ))}
      </g>
      <g fill="none" stroke="#BDBDBD" strokeWidth="1.15" strokeLinejoin="round">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${212 + i * 9.5}, ${84 + i * 5.5})`}>
            <polygon points="0,-2 7,1 3,3.5 10,7 6,9.5 -1,6" />
          </g>
        ))}
      </g>
      <IsoWhiteRoundedTile cx={74} cy={132} rx={60} ry={35} depth={12}>
        <g transform="translate(74, 132) scale(1, 0.58) rotate(-45)">
          <rect
            x="-8"
            y="-22"
            width="16"
            height="14"
            rx="2"
            fill="none"
            stroke="#7A7A7A"
            strokeWidth="1.3"
          />
          <line
            x1="-4"
            y1="-16"
            x2="4"
            y2="-16"
            stroke="#7A7A7A"
            strokeWidth="1.2"
          />
          <line
            x1="-4"
            y1="-12"
            x2="2"
            y2="-12"
            stroke="#7A7A7A"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="-1"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="#1A1A1A"
          >
            INVOICE
          </text>
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fontSize="5.2"
            fontWeight="500"
            fill="#333333"
          >
            Invoice #2001
          </text>
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontSize="5.2"
            fontWeight="500"
            fill="#333333"
          >
            Vendor: Acme corp
          </text>
          <text
            x="0"
            y="19"
            textAnchor="middle"
            fontSize="5.2"
            fontWeight="600"
            fill="#1A1A1A"
          >
            Amount: $1,250
          </text>
        </g>
      </IsoWhiteRoundedTile>
      <IsoBlackOctagonHub cx={176} cy={46} scale={0.76} />
      <path
        d="M 178 214 Q 170 209 178 204 L 292 138 Q 300 133 308 138 L 352 164 Q 360 169 352 174 L 238 240 Q 230 245 222 240 Z"
        fill="none"
        stroke="#CCCCCC"
        strokeWidth="1.15"
      />
      <IsoStandingCard x={252} y={114} w={58} h={74} dir="up-right" />
      <IsoStandingCard x={268} y={124} w={58} h={74} dir="up-right" />
      <IsoStandingCard x={284} y={134} w={58} h={74} dir="up-right">
        <text
          x="29"
          y="18"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="600"
          fill="#1A1A1A"
        >
          Stage 1:
        </text>
        <text
          x="29"
          y="27"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="600"
          fill="#1A1A1A"
        >
          Processing
        </text>
        <g
          transform="translate(29, 46)"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-5"
              x2="0"
              y2="-9"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </IsoStandingCard>
      <IsoStandingCard x={208} y={176} w={60} h={76} dir="up-right">
        <text
          x="30"
          y="18"
          textAnchor="middle"
          fontSize="6.2"
          fontWeight="600"
          fill="#1A1A1A"
        >
          Stage 2:
        </text>
        <text
          x="30"
          y="26"
          textAnchor="middle"
          fontSize="5.8"
          fontWeight="600"
          fill="#1A1A1A"
        >
          Invoice Approved
        </text>
        <g transform="translate(30, 47)">
          <path
            d="M 0 -10.5 Q 2.2 -10.5 3.5 -8.5 Q 5.8 -9.2 7.4 -7.4 Q 9.2 -5.8 8.5 -3.5 Q 10.5 -2.2 10.5 0 Q 10.5 2.2 8.5 3.5 Q 9.2 5.8 7.4 7.4 Q 5.8 9.2 3.5 8.5 Q 2.2 10.5 0 10.5 Q -2.2 10.5 -3.5 8.5 Q -5.8 9.2 -7.4 7.4 Q -9.2 5.8 -8.5 3.5 Q -10.5 2.2 -10.5 0 Q -10.5 -2.2 -8.5 -3.5 Q -9.2 -5.8 -7.4 -7.4 Q -5.8 -9.2 -3.5 -8.5 Q -2.2 -10.5 0 -10.5 Z"
            fill="none"
            stroke="#00A819"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polyline
            points="-3.5,0.5 -1,3 4,-3"
            fill="none"
            stroke="#00A819"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </IsoStandingCard>
    </svg>
  );
}

function UseCaseIllustration({
  svgType,
}: {
  svgType: UseCaseCardItem["svgType"];
}) {
  switch (svgType) {
    case "lead-qualification":
      return <LeadQualificationSvg />;
    case "support-ticket-routing":
      return <SupportTicketRoutingSvg />;
    case "campaign-automation":
      return <CampaignAutomationSvg />;
    case "data-synchronization":
      return <DataSynchronizationSvg />;
    case "invoice-processing":
      return <InvoiceProcessingSvg />;
  }
}
