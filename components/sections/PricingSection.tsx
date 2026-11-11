"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: string; // السعر الثابت لـ Starter أو السعر حسب التوجل لـ Pro
  priceTwo?: string; // السعر الثاني الخاص بالـ Pro عند التوجل
  period: string;
  billingNote?: string;
  promoBadge?: string;
  highlighted?: boolean;
  billingToggle?: boolean;
  features: string[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "Perfect for individuals and small teams starting with workflow automation.",
    price: "$29", // سعر ثابت لا يتأثر بالتوجل
    period: "/ month",
    billingNote: "no credit card required",
    highlighted: false,
    billingToggle: false,
    features: [
      "Up to 5 workflows",
      "Core integrations",
      "Visual workflow builder",
      "Basic automation rules",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Most Popular",
    description:
      "Advanced automation features for growing teams and complex workflows.",
    price: "$22", // السعر عند التفعيل (سنوي)
    priceTwo: "$59", // السعر عند الإلغاء (شهري)
    period: "/ monthly",
    billingNote: "Billed yearly",
    promoBadge: "2 months free",
    highlighted: true,
    billingToggle: true,
    features: [
      "Unlimited workflows",
      "All integrations",
      "AI decision engine",
      "Advanced automation rules",
      "Workflow monitoring",
      "Priority support",
      "Version history",
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(true);
    const scrollTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pricing-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

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
            duration: 0.2, // مدة قصيرة جداً لكل حرف عشان ميحصلش تداخل كبير
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
      id="pricing"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="p-0"
    >
      <div ref={sectionRef} className="w-full">
        {/* ================= HEADER ================= */}
        <div className="relative flex min-h-[164px] w-full flex-col justify-center gap-5 border-b border-[#EFEFEF] px-7 py-8 md:flex-row md:items-center md:justify-between">
          <h2
            ref={scrollTextRef}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-[32px] font-medium leading-[1.08] tracking-[-0.045em] text-[#1A1A1A] sm:text-[34px] md:text-[36px]"
          >
            Simple
            <span className="text-[#999999]">
              {renderSplitChars("transparent pricing")}{" "}
            </span>
          </h2>

          <p className="max-w-90.5 text-base font-medium leading-[1.4] tracking-[-0.015em] text-[#737373]">
            Choose the plan that fits your automation needs from small teams to
            enterprise operations.
          </p>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[8.5px] -left-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#1A1A1A]"
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
            className="pointer-events-none absolute -bottom-[8.5px] -right-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#1A1A1A]"
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

        {/* ================= PRICING CARDS ================= */}
        {/* استخدام items-stretch لجعل البطاقات بنفس الارتفاع */}

        <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-2 lg:grid-rows-[auto_auto_auto]">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card -mt-px grid w-full min-w-0 grid-cols-1 grid-rows-[auto_auto_auto] border border-[#EFEFEF] bg-[#FCFCFC] first:mt-0 lg:row-start-1 lg:row-span-3 lg:[grid-template-rows:subgrid] lg:mt-0 ${
                index === 0 ? "lg:col-start-1 lg:border-r-0" : "lg:col-start-2"
              }`}
            >
              {/* ================= PLAN HEADER ================= */}

              <div className="w-full border-b border-[#EFEFEF] px-7 py-7">
                <div className="flex w-full items-center gap-3">
                  <h3
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-[#1A1A1A]"
                  >
                    {plan.name}
                  </h3>

                  {plan.badge && (
                    <span className="ml-auto inline-flex shrink-0 items-center justify-center rounded-[2px] border border-[#E9E9E9] bg-[#F1F1F1] px-2.5 py-[5px] text-[10px] font-medium uppercase leading-none tracking-[0.01em] text-[#555555]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-base font-normal leading-[1.45] text-[#737373]">
                  {plan.description}
                </p>
              </div>

              {/* ================= PRICE & BILLING ================= */}

              <div className="w-full border-b border-[#EFEFEF] px-7 pb-7 pt-1.5">
                {/* Price */}

                <div className="flex items-baseline gap-2">
                  <span
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className="text-[40px] font-medium leading-[1.12] tracking-[-0.045em] text-[#1A1A1A]"
                  >
                    {plan.billingToggle
                      ? isYearly
                        ? plan.priceTwo
                        : plan.price
                      : plan.price}
                  </span>

                  <span className="text-sm font-normal leading-none text-[#737373]">
                    {plan.period}
                  </span>
                </div>

                {/* Billing information */}

                <div className="mt-4 flex min-h-5 flex-wrap items-center gap-2.5">
                  {plan.billingToggle ? (
                    <>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isYearly}
                        aria-label="Toggle yearly billing"
                        onClick={() => setIsYearly((prev) => !prev)}
                        className={`relative inline-flex h-5 w-[46px] shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 ${
                          isYearly ? "bg-[#1A1A1A]" : "bg-[#D4D4D4]"
                        }`}
                      >
                        <span
                          className={`absolute left-[3px] top-[3px] h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                            isYearly ? "translate-x-[26px]" : "translate-x-0"
                          }`}
                        />
                      </button>

                      <span className="text-base font-medium leading-none text-[#525252]">
                        Billed yearly
                      </span>

                      {plan.promoBadge && (
                        <span className="inline-flex items-center border border-[#E9E9E9] bg-[#F1F1F1] px-2.5 py-1.5 text-[12px] font-medium uppercase leading-none text-[#1A1A1A]">
                          {plan.promoBadge}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-base font-normal leading-none text-[#525252]">
                      {plan.billingNote}
                    </span>
                  )}
                </div>

                {/* ================= CTA BUTTON ================= */}

                <Link
                  href="#contact"
                  className={`group relative mt-6 inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden px-5 text-sm font-medium transition-[background-color,color,border-color,border-radius] duration-500 ease-in-out ${
                    plan.highlighted
                      ? "border border-[#1A1A1A] bg-[#1A1A1A] text-white"
                      : "border border-[#E5E5E5] bg-transparent text-[#1A1A1A]"
                  }`}
                >
                  {/* Text animation */}

                  <span className="relative block h-[1.2em] overflow-hidden leading-[1.2]">
                    <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      Get Started
                    </span>

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0"
                    >
                      Get Started
                    </span>
                  </span>

                  {/* Arrow animation */}

                  <span className="relative flex h-4 w-4 overflow-hidden">
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.8}
                      className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:translate-x-full"
                    />

                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.8}
                      className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"
                    />
                  </span>
                </Link>
              </div>

              {/* ================= WHAT'S INCLUDED ================= */}

              <div className="flex w-full flex-col items-start px-7 pb-7 pt-7">
                <p className="text-base font-medium leading-tight tracking-[-0.015em] text-[#1A1A1A]">
                  What&apos;s Included:
                </p>

                <ul className="mt-3 flex w-full flex-col border-t border-dashed border-[#E5E5E5]">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex min-h-12 w-full items-center gap-3 border-b border-dashed border-[#E5E5E5] py-3 text-base font-normal leading-[1.4] text-[#737373]"
                    >
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.5}
                        className="shrink-0 text-[#888888]"
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
