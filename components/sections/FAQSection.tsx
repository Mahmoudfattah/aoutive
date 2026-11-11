"use client";

import React, { useRef, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We offer end-to-end digital solutions, including website design, UI/UX design, Framer development, branding, and SEO optimization.",
  },
  {
    question: "Is Aoutive AI just another automation tool?",
    answer:
      "Aoutive AI goes beyond basic automation. It connects your tools, processes data, and executes complex workflows through a centralized AI engine.",
  },
  {
    question: "How does Aoutive AI automate workflows?",
    answer:
      "Aoutive AI uses intelligent automation to analyze conditions, process information, and automatically trigger the next action across your connected tools.",
  },
  {
    question: "Can Aoutive AI work with our existing tools?",
    answer:
      "Yes. Aoutive AI connects with CRMs, APIs, and internal tools, allowing you to build workflows around the systems your team already uses.",
  },
  {
    question: "Is Aoutive AI secure for business use?",
    answer:
      "Aoutive AI is designed with reliability and scalability in mind. Enterprise plans include advanced security and SSO capabilities. Contact our team for specific security requirements.",
  },
  {
    question: "Do I need technical knowledge to use Aoutive AI?",
    answer:
      "Aoutive AI provides a visual workflow builder that makes creating and managing automations easier. More complex integrations may require familiarity with your existing tools and APIs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLHeadingElement>(null);

  // تعريف مصفوفة الـ refs الخاصة بأسئلة الـ FAQ بشكل صحيح
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      // إعادة تصفية المصفوفة داخل الـ hook لمنع تكرار العناصر عند إعادة التسيير
      itemsRef.current = itemsRef.current.slice(0, FAQ_ITEMS.length);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".heading",
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
        },
      )
        .fromTo(
          ".paragrah",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          itemsRef.current, // استخدام مصفوفة العناصر هنا لتعمل الـ Stagger بالترتيب لكل آيتم
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12, // تتابع سلس وجميل بين كل سؤال والذي يليه
            ease: "power3.out",
          },
          "-=0.6",
        );
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const chars = scrollTextRef.current?.querySelectorAll(".scroll-char");

      if (chars && chars.length > 0) {
        const colorTl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollTextRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        });

        colorTl.to(chars, {
          color: "#1A1A1A",
          duration: 0.02,
          stagger: {
            each: 0.03,
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
      id="faq"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="p-0"
    >
      <section
        ref={sectionRef}
        className="relative w-full bg-[#FCFCFC] px-7 py-16 md:px-8 md:py-20"
      >
        {/* ================= MAIN LAYOUT ================= */}
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-[50px]">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start">
            <h2
              ref={scrollTextRef}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="max-w-[360px] heading text-[34px] font-medium leading-[1.25] tracking-[-0.045em] text-[#1A1A1A] sm:text-[38px]"
            >
              Your questions
              <br />
              {renderSplitChars("answer")}
            </h2>

            <p className="mt-3 max-w-[370px] paragrah font-medium leading-[1.45] tracking-[-0.01em] text-[#737373]">
              Quick answers about building and automating workflows with Aoutive
              AI.
            </p>
          </div>

          {/* ================= FAQ ACCORDION ================= */}
          <div className="flex w-full flex-col gap-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="w-full border border-[#EFEFEF] bg-white"
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenIndex((prev) => (prev === index ? null : index))
                    }
                    className="group flex min-h-[58px] w-full items-center justify-between gap-5 px-4 py-4 text-left transition-colors duration-300"
                  >
                    <span
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      className="text-[15px] font-medium uppercase leading-[1.3] tracking-[-0.015em] text-[#1A1A1A] sm:text-base"
                    >
                      {item.question}
                    </span>

                    {/* ================= SINGLE MORPHING ICON ================= */}
                    <span
                      aria-hidden="true"
                      className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center"
                    >
                      <span className="absolute h-[2px] w-[19px] rounded-full bg-[#1A1A1A]" />
                      <span
                        className={`absolute h-[18px] w-[2px] rounded-full bg-[#1A1A1A] transition-transform duration-300 ease-in-out ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  {/* ================= ANSWER ================= */}
                  <div
                    id={`faq-answer-${index}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-base font-medium leading-[1.45] tracking-[-0.01em] text-[#737373]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
