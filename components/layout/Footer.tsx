"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Articles", href: "#articles" },
  { label: "Articles Details", href: "#articles-details" },
];

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Careers", href: "#careers" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

// مكون فرعي لإدارة أنيميشن الـ Underline لكل لينك بـ GSAP بشكل مستقل
function NavLinkItem({
  item,
  onClick,
  className = "text-xs",
}: {
  item: { label: string; href: string };
  onClick?: () => void;
  className?: string;
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`relative inline-block py-0.5 font-medium text-[#666] transition-colors hover:text-[#1A1A1A] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.label}

      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#1A1A1A]"
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <SectionWrapper
      id="footer"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="px-6 pt-14 pb-12 sm:px-10 md:pt-16 md:pb-14"
    >
      <footer className="flex w-full flex-col justify-between">
        {/* 1. الجزء العلوي: اللوجو + الوصف + أيقونات السوشيال الأربعة */}
        <div className="max-w-[300px]">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {/* Aoutive AI Logo Mark */}
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#1A1A1A] text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 19V8.5C5 6.5 7 5.5 8.8 6.6L18.5 12.6C20 13.5 20 15.6 18.5 16.5L12.5 20.2L9.2 18L14.5 14.6L9.2 11.3V19H5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-xl font-bold tracking-[-0.03em] text-[#1A1A1A]"
            >
              Aoutive AI
            </span>
          </Link>

          <p className="mt-4 text-xs font-medium leading-[1.6] text-[#737373] sm:text-[13px]">
            AI-powered workflow automation that connects your tools and runs
            your business processes automatically.
          </p>

          {/* أيقونات السوشيال (فيسبوك، لينكدإن، انستجرام، تليجرام) بتتحوط بدائرة سوداء عند الـ Hover */}
          <div className="mt-5 flex items-center gap-2">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#666666] transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#666666] transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#666666] transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#666666] transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.944 4.667c.246-1.08-.652-1.928-1.666-1.514L2.637 10.36c-1.077.44-1.012 1.986.088 2.334l4.52 1.428 1.745 5.424c.318.988 1.564 1.24 2.238.452l2.583-3.02 4.79 3.524c.884.65 2.14.165 2.364-.912l2.979-14.923ZM8.39 13.68l8.89-5.595c.21-.132.43.153.246.322l-7.35 6.768-.282 3.166-1.504-4.66Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. الجزء الأوسط: Company + Product + Newsletter */}
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-24">
          {/* أعمدة اللينكات */}
          <div className="flex items-start gap-14 sm:gap-20">
            {/* Company Column */}
            <div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-base font-semibold tracking-[-0.02em] text-[#1A1A1A]"
              >
                Company
              </h3>
              <ul className="mt-4 flex flex-col items-start gap-2">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <NavLinkItem
                      item={link}
                      className="text-xs sm:text-[13px]"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Column */}
            <div>
              <h3
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-base font-semibold tracking-[-0.02em] text-[#1A1A1A]"
              >
                Product
              </h3>
              <ul className="mt-4 flex flex-col items-start gap-2">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <NavLinkItem
                      item={link}
                      className="text-xs sm:text-[13px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="w-full max-w-[340px]">
            <h3
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-base font-semibold tracking-[-0.02em] text-[#1A1A1A]"
            >
              Newsletter
            </h3>
            <p className="mt-3 text-xs font-medium leading-[1.6] text-[#737373] sm:text-[13px]">
              Get tips, product updates, and insights on
              <br />
              working smarter with AI.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex h-12 w-full items-center justify-between rounded-full border border-[#EAEAEA] bg-[#F9F9F9] p-1.5 pl-4 transition-colors focus-within:border-[#1A1A1A] focus-within:bg-white"
            >
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-transparent text-xs font-medium text-[#1A1A1A] placeholder-[#888888] outline-none"
              />
              <button
                type="submit"
                className="group relative inline-flex h-9 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-[#1A1A1A] px-4 text-xs font-medium whitespace-nowrap text-white transition-colors duration-500 ease-in-out hover:bg-[#404040]"
              >
                <span className=" relative inline-flex overflow-hidden">
                  <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-y-[-150%]">
                    Subscribe
                  </span>
                  <span className="absolute left-0 inline-block translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    Subscribe
                  </span>
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* 3. الجزء السفلي: Copyright + Privacy Policy & Terms of Service */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 pt-4 text-xs font-medium text-[#737373] sm:flex-row sm:items-center">
          <p className="font-medium">© 2026 Aoutive. All rights reserved.</p>

          <div className="flex items-center gap-8">
            {LEGAL_LINKS.map((link) => (
              <NavLinkItem
                key={link.label}
                item={link}
                className="text-xs sm:text-[13px]"
              />
            ))}
          </div>
        </div>
      </footer>
    </SectionWrapper>
  );
}
