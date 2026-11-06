"use client";

import { useRef, useId } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ============================================================================
// 1. PIXEL GRID CONFIGURATION
// ============================================================================

const GRID_COLS = 20;
const GRID_ROWS = 8;
const TOTAL_SQUARES = GRID_COLS * GRID_ROWS;

const GRID_SQUARES = Array.from({ length: TOTAL_SQUARES });

// ============================================================================
// 2. ISOMETRIC 3D APP CUBE
// ============================================================================

type AppName = "openai" | "excel" | "meet" | "slack" | "notion" | "mail";

interface Iso3DAppCubeProps {
  cx: number;
  cy: number;
  app: AppName;
  stemHeight?: number;
  padOffsetY?: number;
}

function Iso3DAppCube({
  cx,
  cy,
  app,
  stemHeight = 0,
  padOffsetY = 50,
}: Iso3DAppCubeProps) {
  return (
    <g>
      {/* Isometric Shadow Pad */}
      <polygon
        points={`${cx},${cy + padOffsetY - 23} ${
          cx + 40
        },${cy + padOffsetY} ${cx},${cy + padOffsetY + 23} ${
          cx - 40
        },${cy + padOffsetY}`}
        fill="rgba(0,0,0,0.03)"
        stroke="#CCCCCC"
        strokeWidth="0.9"
        strokeDasharray="2 2"
      />

      {/* Vertical Support Stem */}
      {stemHeight > 0 && (
        <line
          x1={cx}
          y1={cy + 46}
          x2={cx}
          y2={cy + 46 + stemHeight}
          stroke="#6E6E6E"
          strokeWidth="1.2"
        />
      )}

      {/* 3D Cube */}
      <g transform={`translate(${cx}, ${cy})`}>
        {/* Top Face */}
        <polygon
          points="0,-46 40,-23 0,0 -40,-23"
          fill="#FFFFFF"
          stroke="#555555"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Left Face */}
        <polygon
          points="-40,-23 0,0 0,46 -40,23"
          fill="#FAFAFA"
          stroke="#555555"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right Face */}
        <polygon
          points="0,0 40,-23 40,23 0,46"
          fill="#FFFFFF"
          stroke="#555555"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Projected App Icon */}
        <g transform="translate(20, 11.5) skewY(-29.9)">
          {/* OpenAI */}
          {app === "openai" && (
            <g
              fill="none"
              stroke="#141414"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <path
                  key={deg}
                  d="M 0 -3.5 C 4 -8 10 -4 7 2 L 2 5"
                  transform={`rotate(${deg})`}
                />
              ))}

              <polygon
                points="0,-3.8 3.3,-1.9 3.3,1.9 0,3.8 -3.3,1.9 -3.3,-1.9"
                strokeWidth="1.2"
              />
            </g>
          )}

          {/* Excel */}
          {app === "excel" && (
            <g>
              <rect
                x="-3"
                y="-10"
                width="13"
                height="18"
                rx="1.2"
                fill="#FFFFFF"
                stroke="#141414"
                strokeWidth="1.4"
              />

              <line
                x1="3.5"
                y1="-10"
                x2="3.5"
                y2="8"
                stroke="#141414"
                strokeWidth="1.1"
              />

              <line
                x1="-3"
                y1="-5.5"
                x2="10"
                y2="-5.5"
                stroke="#141414"
                strokeWidth="1.1"
              />

              <line
                x1="-3"
                y1="-1"
                x2="10"
                y2="-1"
                stroke="#141414"
                strokeWidth="1.1"
              />

              <line
                x1="-3"
                y1="3.5"
                x2="10"
                y2="3.5"
                stroke="#141414"
                strokeWidth="1.1"
              />

              <rect
                x="-10"
                y="-6.5"
                width="11"
                height="12"
                rx="1.5"
                fill="#141414"
              />

              <path
                d="M -7 -3.5 L -2 2.5 M -2 -3.5 L -7 2.5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Google Meet */}
          {app === "meet" && (
            <g>
              <rect
                x="-10.5"
                y="-8"
                width="14"
                height="15"
                rx="2.5"
                fill="#141414"
              />

              <rect
                x="-7.5"
                y="-4"
                width="6.5"
                height="7"
                rx="1"
                fill="#FFFFFF"
              />

              <polygon
                points="4.5,-2.5 10.5,-7.5 10.5,6.5 4.5,1.5"
                fill="#141414"
              />
            </g>
          )}

          {/* Slack */}
          {app === "slack" && (
            <g fill="#141414">
              <rect x="-2.8" y="-11" width="3.4" height="8.5" rx="1.7" />
              <circle cx="-5.5" cy="-4.5" r="1.9" />

              <rect x="2.5" y="-2.8" width="8.5" height="3.4" rx="1.7" />
              <circle cx="4.5" cy="-5.5" r="1.9" />

              <rect x="-0.6" y="2.5" width="3.4" height="8.5" rx="1.7" />
              <circle cx="5.5" cy="4.5" r="1.9" />

              <rect x="-11" y="-0.6" width="8.5" height="3.4" rx="1.7" />
              <circle cx="-4.5" cy="5.5" r="1.9" />
            </g>
          )}

          {/* Notion */}
          {app === "notion" && (
            <g>
              <polygon
                points="-9,-7 -2,-10 9,-8 9,8 -4,10 -9,6"
                fill="#141414"
              />

              <polygon points="-4,-5.5 7.5,-7 7.5,6.5 -4,8" fill="#FFFFFF" />

              <path
                d="M -1.5 5 V -3 L 4.5 5 V -3"
                fill="none"
                stroke="#141414"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* Mail */}
          {app === "mail" && (
            <g
              fill="none"
              stroke="#141414"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="-10" y="-7.5" width="20" height="15" rx="2" />

              <polyline points="-9.5,-6.5 0,1.5 9.5,-6.5" />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}

// ============================================================================
// 3. INTEGRATIONS NETWORK SVG
// ============================================================================

export function IntegrationsNetworkSvg({
  isPlaying = true,
}: {
  isPlaying?: boolean;
}) {
  const uniqueId = useId().replace(/:/g, "");

  const patternId = `${uniqueId}-iso-bg`;
  const gradientId = `${uniqueId}-bg-fade`;
  const maskId = `${uniqueId}-bg-mask`;

  return (
    <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden sm:h-[430px] md:h-[490px]">
      <style>{`
        @keyframes aoutiveCenterFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes aoutiveNodeHalo {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.12;
          }
        }

        @keyframes aoutiveSignalDash {
          0% {
            stroke-dashoffset: 240;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .aoutive-center-float {
          animation: aoutiveCenterFloat 3.6s ease-in-out infinite;
        }

        .aoutive-node-halo {
          transform-box: fill-box;
          transform-origin: center;
          animation: aoutiveNodeHalo 2.2s ease-in-out infinite;
        }

        .aoutive-signal-line {
          stroke-dasharray: 26 220;
          animation: aoutiveSignalDash 2.5s linear infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 920 490"
        className="h-full w-full max-w-[920px] select-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Background Pattern */}
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="38"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 19 0 L 38 11 L 19 22 L 0 11 Z"
              fill="none"
              stroke="#ECECEC"
              strokeWidth="0.7"
              strokeDasharray="2 2"
            />

            <circle cx="19" cy="11" r="0.8" fill="#DCDCDC" />
          </pattern>

          {/* Background Fade */}
          <radialGradient id={gradientId} cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={maskId}>
            <rect width="920" height="490" fill={`url(#${gradientId})`} />
          </mask>
        </defs>

        {/* Background Grid */}
        <rect
          width="920"
          height="490"
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
        />

        {/* ============================================================
            LEFT CIRCUIT BUS
        ============================================================ */}

        <g
          stroke="#686868"
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="130,408 130,413 218,464" />
          <polyline points="190,373 190,378 278,429" />
          <polyline points="250,338 250,343 338,394" />

          <line x1="218" y1="464" x2="395" y2="361" />
        </g>

        {/* Left Animated Signal */}
        {isPlaying && (
          <path
            d="M 130 413 L 218 464 L 395 361"
            fill="none"
            stroke="#141414"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="aoutive-signal-line"
          />
        )}

        {/* Left Junction Dots */}
        <circle cx="218" cy="464" r="4.2" fill="#141414" />
        <circle cx="278" cy="429" r="4.2" fill="#141414" />
        <circle cx="338" cy="394" r="4.2" fill="#141414" />

        {/* Left App Cubes */}
        <Iso3DAppCube cx={130} cy={362} app="openai" padOffsetY={51} />

        <Iso3DAppCube cx={190} cy={327} app="excel" padOffsetY={51} />

        <Iso3DAppCube cx={250} cy={292} app="meet" padOffsetY={51} />

        {/* ============================================================
            RIGHT CIRCUIT BUS
        ============================================================ */}

        <g
          stroke="#686868"
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="510" y1="280" x2="660" y2="193" />

          <line x1="540" y1="263" x2="690" y2="350" />

          <line x1="600" y1="228" x2="750" y2="315" />

          <line x1="660" y1="193" x2="810" y2="280" />
        </g>

        {/* Right Chevron */}
        <polyline
          points="561,251 540,263 561,275"
          fill="none"
          stroke="#141414"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Animated Signal */}
        {isPlaying && (
          <path
            d="M 510 280 L 600 228 L 750 315"
            fill="none"
            stroke="#141414"
            strokeWidth="2"
            strokeLinecap="round"
            className="aoutive-signal-line"
            style={{ animationDelay: "0.9s" }}
          />
        )}

        {/* Right Junction Halo */}
        <circle
          cx="540"
          cy="263"
          r="9.5"
          fill="#BDBDBD"
          className={isPlaying ? "aoutive-node-halo" : ""}
        />

        {/* Right Junction Dots */}
        <circle cx="540" cy="263" r="4.2" fill="#141414" />
        <circle cx="600" cy="228" r="4.2" fill="#141414" />
        <circle cx="660" cy="193" r="4.2" fill="#141414" />

        {/* ============================================================
            CENTRAL AOUTIVE GLASS CUBE
        ============================================================ */}

        <g transform="translate(445, 250)">
          {/* Base Slab Top */}
          <polygon
            points="0,0 118,68 0,136 -118,68"
            fill="#FFFFFF"
            stroke="#141414"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Base Slab Left */}
          <polygon points="-118,68 0,136 0,156 -118,88" fill="#141414" />

          {/* Base Slab Right */}
          <polygon points="0,136 118,68 118,88 0,156" fill="#141414" />

          {/* Inner Pedestal Top */}
          <polygon
            points="0,28 70,68 0,108 -70,68"
            fill="#EAEAEA"
            stroke="#CCCCCC"
            strokeWidth="1"
          />

          {/* Inner Pedestal Left */}
          <polygon points="-70,68 0,108 0,113 -70,73" fill="#D4D4D4" />

          {/* Inner Pedestal Right */}
          <polygon points="0,108 70,68 70,73 0,113" fill="#C4C4C4" />

          {/* Glass Cube Top */}
          <polygon
            points="0,-47 70,-7 0,33 -70,-7"
            fill="rgba(242,242,242,0.55)"
          />

          {/* Glass Cube Left */}
          <polygon
            points="-70,-7 0,33 0,108 -70,68"
            fill="rgba(235,235,235,0.45)"
          />

          {/* Glass Cube Right */}
          <polygon
            points="0,33 70,-7 70,68 0,108"
            fill="rgba(225,225,225,0.45)"
          />

          {/* Floating Inner Aoutive Cube */}
          <g className={isPlaying ? "aoutive-center-float" : ""}>
            {/* Top Face */}
            <polygon
              points="0,-20 38,2 0,24 -38,2"
              fill="#FFFFFF"
              stroke="#E5E5E5"
              strokeWidth="0.8"
            />

            {/* Left Black Face */}
            <polygon points="-38,2 0,24 0,66 -38,44" fill="#141414" />

            {/* Right Black Face */}
            <polygon points="0,24 38,2 38,44 0,66" fill="#1C1C1C" />

            {/* Left Aoutive Logo */}
            <g transform="translate(-19, 34) skewY(30) scale(0.76)">
              <path
                d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
                fill="#FFFFFF"
              />

              <polygon points="-14,4 -7,0 -7,8" fill="#FFFFFF" />
            </g>

            {/* Right Aoutive Logo */}
            <g transform="translate(19, 34) skewY(-30) scale(0.76)">
              <path
                d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
                fill="#FFFFFF"
              />

              <polygon points="-14,4 -7,0 -7,8" fill="#FFFFFF" />
            </g>
          </g>

          {/* Outer Wireframe Top */}
          <polygon
            points="0,-126 118,-58 0,10 -118,-58"
            fill="rgba(255,255,255,0.06)"
            stroke="#686868"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Outer Wireframe Left Edge */}
          <line
            x1="-118"
            y1="-58"
            x2="-118"
            y2="68"
            stroke="#686868"
            strokeWidth="1.2"
          />

          {/* Outer Wireframe Right Edge */}
          <line
            x1="118"
            y1="-58"
            x2="118"
            y2="68"
            stroke="#686868"
            strokeWidth="1.2"
          />

          {/* Outer Wireframe Center Edge */}
          <line
            x1="0"
            y1="10"
            x2="0"
            y2="136"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            opacity="0.75"
          />

          <line
            x1="0"
            y1="10"
            x2="0"
            y2="136"
            stroke="#686868"
            strokeWidth="1.2"
          />
        </g>

        {/* ============================================================
            RIGHT 3 ELEVATED APP CUBES
        ============================================================ */}

        <Iso3DAppCube
          cx={690}
          cy={270}
          app="slack"
          stemHeight={34}
          padOffsetY={80}
        />

        <Iso3DAppCube
          cx={750}
          cy={235}
          app="notion"
          stemHeight={34}
          padOffsetY={80}
        />

        <Iso3DAppCube
          cx={810}
          cy={200}
          app="mail"
          stemHeight={34}
          padOffsetY={80}
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. MAIN INTEGRATIONS SECTION
// ============================================================================

interface IntegrationsSectionProps {
  isPlaying?: boolean;
}

export function IntegrationsSection({
  isPlaying = true,
}: IntegrationsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLHeadingElement>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  // ========================================================================
  // PIXEL REVEAL + ILLUSTRATION ENTRANCE
  // ========================================================================

  useGSAP(
    () => {
      const overlay = gridOverlayRef.current;
      const conveyor = sectionRef.current?.querySelector(".conveyor-wrapper");

      if (!overlay || !conveyor) return;

      const squares = gsap.utils.toArray<HTMLElement>(
        ".grid-square",
        sectionRef.current,
      );

      if (!squares.length) return;

      const tl = gsap.timeline({
        delay: 0.2,
        defaults: {
          ease: "power3.out",
        },
      });

      // Pixel Shutter Reveal
      tl.to(squares, {
        opacity: 0,
        duration: 0.12,
        ease: "steps(2)",
        stagger: {
          amount: 0.75,
          grid: [GRID_ROWS, GRID_COLS],
          from: "random",
        },
        onComplete: () => {
          gsap.set(overlay, {
            display: "none",
          });
        },
      });

      // Illustration Entrance
      tl.fromTo(
        conveyor,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );
    },
    {
      scope: sectionRef,
    },
  );

  // ========================================================================
  // SCROLL-DRIVEN HEADING COLOR REVEAL
  // ========================================================================

  useGSAP(
    () => {
      const heading = scrollTextRef.current;

      if (!heading) return;

      const chars = heading.querySelectorAll<HTMLElement>(".scroll-char");

      if (!chars.length) return;

      gsap.to(chars, {
        color: "#1A1A1A",
        duration: .002,
        stagger: {
          each: 0.03,
        },
        scrollTrigger: {
          trigger: heading,
          start: "top 40%",
          end: "40% 35%",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
    },
  );

  // ========================================================================
  // CHARACTER SPLITTER
  // ========================================================================

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

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <SectionWrapper
      id="stats"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="p-0"
    >
      {/* Important: sectionRef wraps ALL animated elements */}
      <div ref={sectionRef} className="w-full">
        {/* ============================================================
            SECTION HEADER
        ============================================================ */}

        <div className="mx-auto pt-16 text-center">
          <span className="inline-block font-medium tracking-[-0.01em] text-[#4D4D4D]">
            Integrations
          </span>

          <h2
            ref={scrollTextRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] sm:text-5xl md:text-[58px]"
          >
            Connect the tools your
            <br />
            <span>{renderSplitChars("team already uses")}</span>
          </h2>
        </div>

        {/* ============================================================
            PIXEL OVERLAY + NETWORK ILLUSTRATION
        ============================================================ */}

        <div className="relative z-0 -mt-3 w-full overflow-hidden lg:mt-0">
          {/* Pixel Grid Overlay */}
          <div
            ref={gridOverlayRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
            }}
          >
            {GRID_SQUARES.map((_, i) => (
              <div key={i} className="grid-square bg-[#FCFCFC]" />
            ))}
          </div>

          {/* Isometric Network */}
          <div className="conveyor-wrapper -mt-4 w-full">
            <IntegrationsNetworkSvg isPlaying={isPlaying} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default IntegrationsSection;
