"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/landing-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const containerRef = useRef<HTMLElement>(null);

  // أنيميشن ظهور الـ Navbar عند التحميل فقط
  useGSAP(
    () => {
      // بنستعمل gsap.to عشان يحركه من حالته المخفية (اللي معمول لها تحديد في الـ className) لمكانه الطبيعي
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power4.out(1)",
      });
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      // الحل هنا: أضفنا -translate-y-[100px] و opacity-0 في الـ className عشان يبدأ مخفي تماماً قبل حتى ما الجافا سكريبت تشتغل
      className="relative z-40 w-full border-b border-[#EFEFEF] bg-[#FCFCFC] px-3 sm:px-6 xl:px-0 -translate-y-[100px] opacity-0"
    >
      <div className="mx-auto  relative flex h-20 w-full max-w-306 items-center justify-between border-x border-[#EFEFEF] px-3 sm:px-3">
        {/* 1. Brand Logo (Geometric Cube SVG + Aoutive AI) */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-[#1A1A1A]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#1A1A1A] text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>
          <span className="font-heading text-[19px] font-semibold tracking-[-0.03em]">
            Aoutive AI
          </span>
        </Link>

        {/* 2. Desktop Navigation Links (Center) with GSAP Underline */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((item) => (
            <NavLinkItem key={item.label} item={item} />
          ))}
        </nav>

        {/* 3. Desktop CTA Button (Right) with Pure CSS Hover Roll Effect */}
        <div className="hidden md:block">
          <GetStartedButton href="#get-started" />
        </div>

        {/* 4. Mobile 2-Bar Hamburger Button (< 768px) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="relative flex h-10 w-10 items-center justify-center rounded-[4px] text-[#1A1A1A] md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative flex h-3.5 w-5 flex-col justify-between">
            {/* Top Bar */}
            <span
              className={`block h-[2px] w-full bg-[#1A1A1A] transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`block h-[2px] w-full bg-[#1A1A1A] transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        {/* علامات التقاطع السفلية للـ Navbar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[8.5px] -left-[8.5px] z-50 flex h-4 w-4 items-center justify-center text-[#1A1A1A] select-none"
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
          className="pointer-events-none absolute -bottom-[8.5px] -right-[8.5px] z-50 flex h-4 w-4 items-center justify-center text-[#1A1A1A] select-none"
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

      {/* 5. Mobile Dropdown Overlay Menu (Same Link & Button Animations + Visible border-x) */}
      <div
        className={`overflow-hidden border-t border-[#EFEFEF] bg-[#FCFCFC] transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-306 flex-col items-center gap-5 border-x border-[#EFEFEF] px-5 py-6 sm:px-7">
          {NAV_LINKS.map((item) => (
            <NavLinkItem
              key={item.label}
              item={item}
              onClick={closeMobileMenu}
              className="text-base"
            />
          ))}
          <GetStartedButton
            href="#get-started"
            onClick={closeMobileMenu}
            className="mt-2 w-full"
          />
        </div>
      </div>
    </header>
  );
}

// مكون فرعي لإدارة أنيميشن الـ Underline لكل لينك بـ GSAP بشكل مستقل
function NavLinkItem({
  item,
  onClick,
  className = "text-sm",
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
      className={`relative py-1 font-medium text-[#666] transition-colors hover:text-[#1A1A1A] ${className}`}
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

// مكون فرعي لزرار Get Started
function GetStartedButton({
  href,
  onClick,
  className = "",
}: {
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-[4px] bg-[#1A1A1A] px-[23px] py-2 text-sm font-medium whitespace-nowrap text-white transition-colors duration-500 ease-in-out hover:bg-[#404040] ${className}`}
    >
      <span className="inline-block transition-all duration-500 ease-in-out group-hover:translate-y-[-150%]">
        Get Started
      </span>

      <span className="absolute inline-block translate-y-full opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        Get Started
      </span>
    </Link>
  );
}
