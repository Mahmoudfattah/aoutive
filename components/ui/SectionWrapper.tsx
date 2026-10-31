import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  showTopCrosshairs?: boolean;
  showBottomCrosshairs?: boolean;
  noPadding?: boolean;
}

function CrosshairIcon({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 flex h-4 w-4 items-center justify-center text-[#1A1A1A] select-none ${className}`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  innerClassName = "",
  showTopCrosshairs = false,
  showBottomCrosshairs = true,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full border-b border-[#EFEFEF] bg-[#FCFCFC] ${className}`}
    >
      <div
        className={`relative mx-auto w-full max-w-[1224px] border-x border-[#EFEFEF] ${
          noPadding ? "" : "px-6 py-16 md:px-12 md:py-24"
        } ${innerClassName}`}
      >
        {/* Top Crosshairs (تُفعّل فقط في أول سكشن لمنع التكرار) */}
        {showTopCrosshairs && (
          <>
            <CrosshairIcon className="-top-[8.5px] -left-[8.5px]" />
            <CrosshairIcon className="-top-[8.5px] -right-[8.5px]" />
          </>
        )}

        {/* Bottom Crosshairs */}
        {showBottomCrosshairs && (
          <>
            <CrosshairIcon className="-bottom-[8.5px] -left-[8.5px]" />
            <CrosshairIcon className="-bottom-[8.5px] -right-[8.5px]" />
          </>
        )}

        {children}
      </div>
    </section>
  );
}

