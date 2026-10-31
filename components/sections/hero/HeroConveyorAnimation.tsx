// ============================================================================
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroConveyorAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  // Refs for the 4 black input tiles on the conveyor belt
  const tile0Ref = useRef<SVGGElement>(null);
  const tile1Ref = useRef<SVGGElement>(null);
  const tile2Ref = useRef<SVGGElement>(null);
  const tile3Ref = useRef<SVGGElement>(null);

  // Refs for the output card queue (White Skeleton -> Completed)
  const farBRef = useRef<SVGGElement>(null);
  const farBOpacityRef = useRef<SVGGElement>(null);
  const farARef = useRef<SVGGElement>(null);
  const farAOpacityRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const midOpacityRef = useRef<SVGGElement>(null);
  const doneMidRef = useRef<SVGGElement>(null);
  const cardDoneRef = useRef<SVGGElement>(null);

  // Refs for hub radar ping & wire signal dot
  const pingRef = useRef<SVGEllipseElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const T_OUT = 2.2703; // Single output cycle duration (seconds)
      const T_BELT = 9.0812; // Full 4-slot belt cycle (4 * 2.2703s)

      // ----------------------------------------------------------------------
      // 1. CONVEYOR BELT TIMELINE (4 Black App Cards sliding into machine door)
      // ----------------------------------------------------------------------
      // Tile 0 (starts at Slot 0: x=169, y=35)
      const tlTile0 = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tlTile0
        .set(tile0Ref.current, { x: 31.95, y: 18, opacity: 1 })
        .to(tile0Ref.current, { x: 71, y: 40, duration: T_BELT * 0.3922 })
        .to(tile0Ref.current, { x: 148, y: 83, duration: T_BELT * 0.2498 })
        .to(tile0Ref.current, { x: 221, y: 126, duration: T_BELT * 0.2498 })
        .set(tile0Ref.current, { x: 0, y: 0, opacity: 0 })
        .to(tile0Ref.current, {
          x: 31.95,
          y: 18,
          opacity: 1,
          duration: T_BELT * 0.1082,
        });

      // Tile 1 (starts at Slot 1: x=240, y=75)
      const tlTile1 = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tlTile1
        .set(tile1Ref.current, { x: 32.02, y: 17.88, opacity: 1 })
        .to(tile1Ref.current, { x: 77, y: 43, duration: T_BELT * 0.1519 })
        .to(tile1Ref.current, { x: 150, y: 86, duration: T_BELT * 0.2498 })
        .to(tile1Ref.current, { x: 223, y: 129, duration: T_BELT * 0.2498 })
        .set(tile1Ref.current, { x: -71, y: -40, opacity: 0 })
        .to(tile1Ref.current, {
          x: -39.05,
          y: -22,
          opacity: 1,
          duration: T_BELT * 0.108,
        })
        .to(tile1Ref.current, { x: 0, y: 0, duration: T_BELT * 0.1322 })
        .to(tile1Ref.current, {
          x: 32.02,
          y: 17.88,
          duration: T_BELT * 0.1083,
        });

      // Tile 2 (starts at Slot 2: x=317, y=118)
      const tlTile2 = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tlTile2
        .set(tile2Ref.current, { x: 31.6, y: 18.61, opacity: 1 })
        .to(tile2Ref.current, { x: 73, y: 43, duration: T_BELT * 0.1417 })
        .to(tile2Ref.current, { x: 146, y: 86, duration: T_BELT * 0.2498 })
        .set(tile2Ref.current, { x: -148, y: -83, opacity: 0 })
        .to(tile2Ref.current, {
          x: -116.05,
          y: -65,
          opacity: 1,
          duration: T_BELT * 0.108,
        })
        .to(tile2Ref.current, { x: -77, y: -43, duration: T_BELT * 0.1322 })
        .to(tile2Ref.current, { x: 0, y: 0, duration: T_BELT * 0.26 })
        .to(tile2Ref.current, { x: 31.6, y: 18.61, duration: T_BELT * 0.1083 });

      // Tile 3 (starts at Slot 3: x=390, y=161)
      const tlTile3 = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tlTile3
        .set(tile3Ref.current, { x: 31.6, y: 18.61, opacity: 1 })
        .to(tile3Ref.current, { x: 73, y: 43, duration: T_BELT * 0.1417 })
        .set(tile3Ref.current, { x: -221, y: -126, opacity: 0 })
        .to(tile3Ref.current, {
          x: -189.05,
          y: -108,
          opacity: 1,
          duration: T_BELT * 0.108,
        })
        .to(tile3Ref.current, { x: -150, y: -86, duration: T_BELT * 0.1322 })
        .to(tile3Ref.current, { x: -73, y: -43, duration: T_BELT * 0.26 })
        .to(tile3Ref.current, { x: 0, y: 0, duration: T_BELT * 0.2498 })
        .to(tile3Ref.current, { x: 31.6, y: 18.61, duration: T_BELT * 0.1083 });

      // ----------------------------------------------------------------------
      // 2. OUTPUT QUEUE & SIGNAL PULSE TIMELINE (Repeats every 2.2703s)
      // ----------------------------------------------------------------------
      const tlOut = gsap.timeline({ repeat: -1 });

      // Initial states at t = 0
      tlOut.set(farBRef.current, { x: 153, y: -92 }, 0);
      tlOut.set(farBOpacityRef.current, { opacity: 0 }, 0);
      tlOut.set(farARef.current, { x: 0, y: 0 }, 0);
      tlOut.set(farAOpacityRef.current, { opacity: 1 }, 0);
      tlOut.set(midRef.current, { x: 0, y: 0 }, 0);
      tlOut.set(midOpacityRef.current, { opacity: 1 }, 0);
      tlOut.set(doneMidRef.current, { x: 157, y: -95.5, opacity: 0 }, 0);
      tlOut.set(cardDoneRef.current, { x: 0, y: 0, opacity: 1 }, 0);
      tlOut.set(
        pingRef.current,
        { scale: 0.55, opacity: 0, transformOrigin: "50% 50%" },
        0,
      );
      tlOut.set(dotRef.current, { x: 646, y: 373, opacity: 0 }, 0);

      // Step A: Machine Top Radar Ping (25% -> 44% of cycle)
      tlOut.to(
        pingRef.current,
        { opacity: 0.5, duration: T_OUT * 0.0238, ease: "power1.out" },
        T_OUT * 0.25,
      );
      tlOut.to(
        pingRef.current,
        {
          scale: 1.45,
          opacity: 0,
          duration: T_OUT * 0.1667,
          ease: "power2.out",
        },
        T_OUT * 0.2738,
      );

      // Step B: Signal Dot travels along wire from Machine (646,373) to Middle Card (733,423)
      tlOut.to(
        dotRef.current,
        { x: 651, y: 376, opacity: 1, duration: T_OUT * 0.0238, ease: "none" },
        T_OUT * 0.2857,
      );
      tlOut.to(
        dotRef.current,
        { x: 728, y: 420, opacity: 1, duration: T_OUT * 0.0833, ease: "none" },
        T_OUT * 0.3095,
      );
      tlOut.to(
        dotRef.current,
        { x: 733, y: 423, opacity: 0, duration: T_OUT * 0.0238, ease: "none" },
        T_OUT * 0.3928,
      );

      // Step C: Middle White Skeleton Card transforms into "Completed" Card! (41.9% -> 53%)
      tlOut.to(
        midRef.current,
        { x: -11, y: 9, duration: T_OUT * 0.0762, ease: "power2.in" },
        T_OUT * 0.419,
      );
      tlOut.to(
        midOpacityRef.current,
        { opacity: 0, duration: T_OUT * 0.0762, ease: "power2.in" },
        T_OUT * 0.419,
      );
      tlOut.set(
        doneMidRef.current,
        { x: 168, y: -104.5, opacity: 0 },
        T_OUT * 0.419,
      );
      tlOut.to(
        doneMidRef.current,
        {
          x: 157,
          y: -95.5,
          opacity: 1,
          duration: T_OUT * 0.1114,
          ease: "back.out(1.7)",
        },
        T_OUT * 0.419,
      );

      // Step D: All Output Cards Shift Down-Left by 1 Slot (68.47% -> 94.89%)
      const shiftStart = T_OUT * 0.6847;
      const shiftDur = T_OUT * 0.2642;

      tlOut.set(midRef.current, { x: 153, y: -92 }, shiftStart);
      tlOut.to(
        farBRef.current,
        { x: 0, y: 0, duration: shiftDur, ease: "power3.inOut" },
        shiftStart,
      );
      tlOut.to(
        farBOpacityRef.current,
        { opacity: 1, duration: shiftDur, ease: "power3.inOut" },
        shiftStart,
      );
      tlOut.to(
        farARef.current,
        { x: -153, y: 92, duration: shiftDur, ease: "power3.inOut" },
        shiftStart,
      );
      tlOut.to(
        farAOpacityRef.current,
        { opacity: 0, duration: T_OUT * 0.1453, ease: "power1.inOut" },
        T_OUT * 0.764,
      );
      tlOut.to(
        midRef.current,
        { x: 0, y: 0, duration: shiftDur, ease: "power3.inOut" },
        shiftStart,
      );
      tlOut.to(
        midOpacityRef.current,
        { opacity: 1, duration: T_OUT * 0.1453, ease: "power1.inOut" },
        T_OUT * 0.7243,
      );
      tlOut.to(
        doneMidRef.current,
        { x: 0, y: 0, duration: shiftDur, ease: "power3.inOut" },
        shiftStart,
      );
      tlOut.to(
        cardDoneRef.current,
        {
          x: -157,
          y: 94.5,
          opacity: 0,
          duration: shiftDur,
          ease: "power3.inOut",
        },
        shiftStart,
      );

      // Step E: Seamless Reset at 95.07% for next loop
      const resetTime = T_OUT * 0.9507;
      tlOut.set(farBRef.current, { x: 153, y: -92 }, resetTime);
      tlOut.set(farBOpacityRef.current, { opacity: 0 }, resetTime);
      tlOut.set(farARef.current, { x: 0, y: 0 }, resetTime);
      tlOut.set(farAOpacityRef.current, { opacity: 1 }, resetTime);
      tlOut.set(
        doneMidRef.current,
        { x: 157, y: -95.5, opacity: 0 },
        resetTime,
      );
      tlOut.set(cardDoneRef.current, { x: 0, y: 0, opacity: 1 }, resetTime);
      tlOut.to({}, { duration: T_OUT * 0.0493 }, resetTime);
    },
    { scope: svgRef },
  );

  return (
    <div className="relative h-[250px] w-full overflow-hidden sm:h-[310px] lg:h-[399px]">
      <svg
        ref={svgRef}
        viewBox="0 0 1219 648"
        preserveAspectRatio="xMidYMid slice"
        className="block h-full w-full select-none"
      >
        <defs>
          <clipPath id="aoutive-door-clip">
            <path
              clipRule="evenodd"
              d="M0 0H1219V648H0ZM462,164L473,157L492,146L570,101L581,95L643,83L652,87L704,117L716,125L716,327L713,331L698,340L645,371L589,403L557,421L553,422L546,418L520,403L491,386L462,368Z"
            />
          </clipPath>
        </defs>

        {/* 1. Base Isometric Machine & Conveyor Track */}
        <image
          href="/images/hero/conveyor-base.png"
          x="0"
          y="0"
          width="1219"
          height="648"
          preserveAspectRatio="none"
        />

        {/* 2. Clipped Input Stream (Black App Cards) */}
        <g clipPath="url(#aoutive-door-clip)">
          <g ref={tile0Ref}>
            <polygon
              points="144,121 169,107 177,112 152,126"
              fill="rgba(0,0,0,0.09)"
            />
            <image
              href="/images/hero/card-video.png"
              x="169"
              y="35"
              width="70"
              height="105"
              preserveAspectRatio="none"
            />
          </g>
          <g ref={tile1Ref}>
            <polygon
              points="215,161 240,147 248,152 223,166"
              fill="rgba(0,0,0,0.09)"
            />
            <image
              href="/images/hero/card-mail.png"
              x="240"
              y="75"
              width="70"
              height="105"
              preserveAspectRatio="none"
            />
          </g>
          <g ref={tile2Ref}>
            <polygon
              points="292,204 317,190 325,195 300,209"
              fill="rgba(0,0,0,0.09)"
            />
            <image
              href="/images/hero/card-slack.png"
              x="317"
              y="118"
              width="70"
              height="105"
              preserveAspectRatio="none"
            />
          </g>
          <g ref={tile3Ref}>
            <polygon
              points="365,247 390,233 398,238 373,252"
              fill="rgba(0,0,0,0.09)"
            />
            <image
              href="/images/hero/card-video.png"
              x="390"
              y="161"
              width="70"
              height="105"
              preserveAspectRatio="none"
            />
          </g>
        </g>

        {/* 3. Output Queue (White Skeleton -> Completed Workflow Executed) */}
        <g ref={farBRef}>
          <g ref={farBOpacityRef} style={{ opacity: 0 }}>
            <image
              href="/images/hero/card-skeleton.png"
              x="828"
              y="292"
              width="262"
              height="175"
              preserveAspectRatio="none"
            />
          </g>
        </g>
        <g ref={farARef}>
          <g ref={farAOpacityRef}>
            <image
              href="/images/hero/card-skeleton.png"
              x="828"
              y="292"
              width="262"
              height="175"
              preserveAspectRatio="none"
            />
          </g>
        </g>
        <g ref={midRef}>
          <g ref={midOpacityRef}>
            <image
              href="/images/hero/card-skeleton.png"
              x="677"
              y="388"
              width="244"
              height="167"
              preserveAspectRatio="none"
            />
          </g>
        </g>
        <g ref={doneMidRef} style={{ opacity: 0 }}>
          <image
            href="/images/hero/card-completed.png"
            x="520"
            y="483"
            width="244"
            height="165"
            preserveAspectRatio="none"
          />
        </g>
        <g ref={cardDoneRef}>
          <image
            href="/images/hero/card-completed.png"
            x="520"
            y="483"
            width="244"
            height="165"
            preserveAspectRatio="none"
          />
        </g>

        {/* 4. Radar Ping & Wire Dot */}
        <ellipse
          ref={pingRef}
          cx="591"
          cy="137"
          rx="64"
          ry="37"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1.2"
          style={{
            opacity: 0,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
        <circle
          ref={dotRef}
          cx="0"
          cy="0"
          r="3.4"
          fill="#1A1A1A"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
