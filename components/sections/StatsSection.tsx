"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface StatMetricItem {
  id: string;
  column: "left" | "right";
//   prefix: string;
  startValue: number;
  endValue: number;
  suffix: string;
  label: string;
}

const STATS_DATA: StatMetricItem[] = [
  // العمود الأول (رقمين فوق بعض بدون بوردر بينهم)
  {
    id: "workflows-automated",
    column: "left",
   
    startValue: 1000,
    endValue: 3100,
    suffix: "+",
    label: "workflows automated",
  },
  {
    id: "active-teams",
    column: "left",
   
    startValue: 1000,
    endValue: 3100,
    suffix: "+",
    label: "active teams",
  },
  // العمود الثاني (رقمين فوق بعض بدون بوردر بينهم)
  {
    id: "uptime",
    column: "right",
   
    startValue: 1000,
    endValue: 3100,
    suffix: "+",
    label: "uptime",
  },
  {
    id: "integrations",
    column: "right",
   
    startValue: 1000,
    endValue: 3100,
    suffix: "+",
    label: "integrations",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  useGSAP(
    () => {
      // 1. أنيميشن ظهور العنوان والأرقام
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        ".stats-heading",
        { opacity: 0, y: 18},
        {
          opacity: 1,
          y: 0,
       
         
          duration: 0.75,
          ease: "power3.out",
        },
      ).fromTo(
        ".stat-block",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.01,
          ease: "power3.out",
        },
        "-=0.45",
      );

      // 2. أنيميشن عد الأرقام من 1,000 لحد 3,100 قدام عين المستخدم بـ GSAP
      STATS_DATA.forEach((stat) => {
        const el = numberRefs.current[stat.id];
        if (!el) return;

        const counterObj = { val: stat.startValue };

        gsap.to(counterObj, {
          val: stat.endValue,
          duration: 2.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(counterObj.val).toLocaleString("en-US");
          },
        });
      });
    },
    { scope: sectionRef },
  );

  const leftStats = STATS_DATA.filter((item) => item.column === "left");
  const rightStats = STATS_DATA.filter((item) => item.column === "right");


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
      id="stats"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="p-0"
    >
      <div ref={sectionRef}>
        {/* 1. الهيدر واخد Full Width وتحته Border-b وعلى طرفيه علامتين (+) */}
        <div className="relative w-full  border-b border-[#EFEFEF] px-6 py-14 text-center sm:px-10 md:py-16">
          <h2 
          ref={scrollTextRef}
          className="stats-heading font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[44px]">
            Automation <span className="text-[#999999]">
           
              {renderSplitChars('trusted by teams')}
              </span>
          </h2>

          {/* علامتين الـ (+) على أطراف البوردر الفاصل تحت الهيدر */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[8.5px] -left-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#1A1A1A] select-none"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 0V11M0 5.5H11"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[8.5px] -right-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#1A1A1A] select-none"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 0V11M0 5.5H11"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        </div>

        {/* 2. الديسبلاي فليكس الرئيسية:
             مقسومة نصين بـ Border في النص بس، وكل ديف فيها رقمين فوق بعض بدون بوردر بينهم */}
        <div className="flex flex-col md:flex-row">
          {/* الديف الشمال (رقمين فوق بعض) */}
          <div className="flex w-full flex-col gap-12 border-b border-[#EFEFEF] px-6 py-10 sm:px-10 md:w-1/2 md:gap-20 md:border-r md:border-b-0 md:py-14 ">
            {leftStats.map((item) => (
              <div
                key={item.id}
                className="stat-block flex flex-col items-center"
              >
                <div className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] tabular-nums  sm:text-4xl md:text-[54px]">
                  {/* <span >{item.prefix}</span> */}
                  <span
                    ref={(el) => {
                      numberRefs.current[item.id] = el;
                    }}
                  >
                    {item.startValue.toLocaleString("en-US")}
                  </span>
                  <span>{item.suffix}</span>
                </div>

                <p className="mt-2 text-base font-medium tracking-[-0.01em] text-[#666666] sm:text-[20px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* الديف اليمين (رقمين فوق بعض) */}
          <div className="flex w-full flex-col gap-12 px-6 py-10 sm:px-10 md:w-1/2 md:gap-14 md:py-14">
            {rightStats.map((item) => (
              <div
                key={item.id}
                className="stat-block flex flex-col items-center"
              >
                <div className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] tabular-nums sm:text-4xl md:text-[54px]">
                  {/* <span>{item.prefix}</span> */}
                  <span
                    ref={(el) => {
                      numberRefs.current[item.id] = el;
                    }}
                  >
                    {item.startValue.toLocaleString("en-US")}
                  </span>
                  <span>{item.suffix}</span>
                </div>

                <p className="mt-2 text-base font-medium tracking-[-0.01em] text-[#666666] sm:text-[20px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
