import React, { useState, useEffect } from "react";
import { Check, Copy, Play, Pause, Eye, Code2 } from "lucide-react";

// ============================================================================
// HELPER: TRUE ISOMETRIC ROUNDED SQUARE PATH GENERATOR
// ============================================================================
function getIsoRoundedSquarePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  cornerFrac = 0.14,
) {
  const c = cornerFrac;
  // Top vertex (0, -ry), Right (rx, 0), Bottom (0, ry), Left (-rx, 0)
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

// ============================================================================
// HELPER: ISOMETRIC ROUNDED PLATFORM BASE (Matches Image 2 1:1)
// ============================================================================
function IsoPlatform({
  cx,
  cy,
  rx = 88,
  ry = 51,
  depth = 10,
}: {
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  depth?: number;
}) {
  const c = 0.12;
  const topFace = getIsoRoundedSquarePath(cx, cy, rx, ry, c);

  // Left-front rim (from left corner to bottom corner)
  const leftRim = `
    M ${cx - rx * (1 - c * 0.35)} ${cy + ry * c * 0.3}
    L ${cx - rx * (1 - c * 0.35)} ${cy + depth + ry * c * 0.3}
    Q ${cx - rx * (1 - c)} ${cy + depth + ry * c} ${cx - rx * c} ${cy + depth + ry * (1 - c)}
    Q ${cx - rx * c * 0.3} ${cy + depth + ry * 0.98} ${cx} ${cy + depth + ry * 0.98}
    L ${cx} ${cy + ry * 0.98}
    Q ${cx - rx * c * 0.3} ${cy + ry * 0.98} ${cx - rx * c} ${cy + ry * (1 - c)}
    Z
  `;

  // Right-front rim (from bottom corner to right corner)
  const rightRim = `
    M ${cx} ${cy + ry * 0.98}
    L ${cx} ${cy + depth + ry * 0.98}
    Q ${cx + rx * c * 0.3} ${cy + depth + ry * 0.98} ${cx + rx * c} ${cy + depth + ry * (1 - c)}
    L ${cx + rx * (1 - c)} ${cy + depth + ry * c}
    Q ${cx + rx * (1 - c * 0.35)} ${cy + depth + ry * c * 0.3} ${cx + rx * (1 - c * 0.35)} ${cy + depth}
    L ${cx + rx * (1 - c * 0.35)} ${cy}
    Q ${cx + rx * (1 - c)} ${cy + ry * c} ${cx + rx * c} ${cy + ry * (1 - c)}
    Z
  `;

  return (
    <g>
      {/* Subtle ambient shadow */}
      <path
        d={getIsoRoundedSquarePath(cx, cy + depth + 4, rx * 0.98, ry * 0.98, c)}
        fill="rgba(0,0,0,0.04)"
      />
      {/* Left Shaded Rim */}
      <path
        d={leftRim}
        fill="#F4F4F4"
        stroke="#686868"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Right Shaded Rim */}
      <path
        d={rightRim}
        fill="#E2E2E2"
        stroke="#686868"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Center Vertical Corner Seam */}
      <line
        x1={cx - rx * c * 0.7}
        y1={cy + ry * (1 - c * 0.7)}
        x2={cx - rx * c * 0.7}
        y2={cy + depth + ry * (1 - c * 0.7)}
        stroke="#686868"
        strokeWidth="1"
      />
      <line
        x1={cx + rx * c * 0.7}
        y1={cy + ry * (1 - c * 0.7)}
        x2={cx + rx * c * 0.7}
        y2={cy + depth + ry * (1 - c * 0.7)}
        stroke="#686868"
        strokeWidth="1"
      />
      {/* Top White Platform Surface */}
      <path
        d={topFace}
        fill="#FFFFFF"
        stroke="#686868"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </g>
  );
}

// ============================================================================
// HELPER: 1 TIER OF ISOMETRIC SERVER RACK WITH ROUNDED CORNERS (Matches Image 2)
// ============================================================================
function IsoServerTier({
  cx,
  cy,
  w = 56,
  h = 32,
  d = 20,
  showRightDots = true,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  d?: number;
  showRightDots?: boolean;
}) {
  const bw = 5.5 * (w / 56); // Center rounded corner half-width
  const bh = 3.2 * (h / 32);

  return (
    <g>
      {/* Left Front Wall */}
      <polygon
        points={`${cx - w},${cy} ${cx - bw},${cy + h - bh} ${cx - bw},${cy + h - bh + d} ${cx - w},${cy + d}`}
        fill="#F4F4F4"
        stroke="#686868"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Center Rounded Corner Bevel */}
      <path
        d={`
          M ${cx - bw} ${cy + h - bh}
          Q ${cx} ${cy + h + 1.5} ${cx + bw} ${cy + h - bh}
          L ${cx + bw} ${cy + h - bh + d}
          Q ${cx} ${cy + h + d + 1.5} ${cx - bw} ${cy + h - bh + d}
          Z
        `}
        fill="#D6D6D6"
        stroke="#686868"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Right Front Wall */}
      <polygon
        points={`${cx + bw},${cy + h - bh} ${cx + w},${cy} ${cx + w},${cy + d} ${cx + bw},${cy + h - bh + d}`}
        fill="#E2E2E2"
        stroke="#686868"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      {/* Top Isometric Surface */}
      <path
        d={getIsoRoundedSquarePath(cx, cy, w * 1.03, h * 1.03, 0.12)}
        fill="#FAFAFA"
        stroke="#686868"
        strokeWidth="1.15"
      />

      {/* Left Wall Rectangular Drive Slot + 2 Circular LEDs */}
      <polygon
        points={`
          ${cx - w + 7 * (w / 56)},${cy + 6.5 * (h / 32)}
          ${cx - 24 * (w / 56)},${cy + 20 * (h / 32)}
          ${cx - 24 * (w / 56)},${cy + 25.5 * (h / 32)}
          ${cx - w + 7 * (w / 56)},${cy + 12 * (h / 32)}
        `}
        fill="#FAFAFA"
        stroke="#686868"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <ellipse
        cx={cx - 17 * (w / 56)}
        cy={cy + 25.5 * (h / 32)}
        rx={1.8 * (w / 56)}
        ry={2.4 * (w / 56)}
        transform={`rotate(-18 ${cx - 17 * (w / 56)} ${cy + 25.5 * (h / 32)})`}
        fill="#FFFFFF"
        stroke="#686868"
        strokeWidth="1.05"
      />
      <ellipse
        cx={cx - 10.5 * (w / 56)}
        cy={cy + 29 * (h / 32)}
        rx={1.8 * (w / 56)}
        ry={2.4 * (w / 56)}
        transform={`rotate(-18 ${cx - 10.5 * (w / 56)} ${cy + 29 * (h / 32)})`}
        fill="#FFFFFF"
        stroke="#686868"
        strokeWidth="1.05"
      />

      {/* Right Wall 3 Circular LEDs */}
      {showRightDots && (
        <>
          <ellipse
            cx={cx + 22 * (w / 56)}
            cy={cy + 25 * (h / 32)}
            rx={1.8 * (w / 56)}
            ry={2.4 * (w / 56)}
            transform={`rotate(18 ${cx + 22 * (w / 56)} ${cy + 25 * (h / 32)})`}
            fill="#FFFFFF"
            stroke="#686868"
            strokeWidth="1.05"
          />
          <ellipse
            cx={cx + 30 * (w / 56)}
            cy={cy + 20.5 * (h / 32)}
            rx={1.8 * (w / 56)}
            ry={2.4 * (w / 56)}
            transform={`rotate(18 ${cx + 30 * (w / 56)} ${cy + 20.5 * (h / 32)})`}
            fill="#FFFFFF"
            stroke="#686868"
            strokeWidth="1.05"
          />
          <ellipse
            cx={cx + 38 * (w / 56)}
            cy={cy + 16 * (h / 32)}
            rx={1.8 * (w / 56)}
            ry={2.4 * (w / 56)}
            transform={`rotate(18 ${cx + 38 * (w / 56)} ${cy + 16 * (h / 32)})`}
            fill="#FFFFFF"
            stroke="#686868"
            strokeWidth="1.05"
          />
        </>
      )}
    </g>
  );
}

// ============================================================================
// HELPER: ISOMETRIC BLACK AOUTIVE LOGO TOP BADGE + SHIMMER BEAM
// ============================================================================
function IsoAoutiveTopBadge({
  cx,
  cy,
  scale = 1,
  showBeam = true,
}: {
  cx: number;
  cy: number;
  scale?: number;
  showBeam?: boolean;
}) {
  const w = 39 * scale;
  const h = 22.5 * scale;
  return (
    <g>
      {/* Upward Vertical Shimmer Beam */}
      {showBeam && (
        <polygon
          points={`${cx - w},${cy} ${cx - w},${cy - 52 * scale} ${cx + w},${cy - 52 * scale} ${cx + w},${cy}`}
          fill="url(#beam-grad)"
          pointerEvents="none"
        />
      )}
      {/* 3D Thin Base Shadow under Black Plate */}
      <path
        d={getIsoRoundedSquarePath(cx, cy + 2 * scale, w, h, 0.16)}
        fill="#555555"
      />
      {/* Black Isometric Rounded Diamond Plate */}
      <path
        d={getIsoRoundedSquarePath(cx, cy, w, h, 0.16)}
        fill="#141414"
        stroke="#141414"
        strokeWidth={1.2 * scale}
      />
      {/* 4 Tiny Corner Rivets */}
      <ellipse
        cx={cx}
        cy={cy - h + 3.8 * scale}
        rx={1.3 * scale}
        ry={0.8 * scale}
        fill="#888888"
      />
      <ellipse
        cx={cx + w - 5.5 * scale}
        cy={cy}
        rx={1.3 * scale}
        ry={0.8 * scale}
        fill="#888888"
      />
      <ellipse
        cx={cx}
        cy={cy + h - 3.8 * scale}
        rx={1.3 * scale}
        ry={0.8 * scale}
        fill="#888888"
      />
      <ellipse
        cx={cx - w + 5.5 * scale}
        cy={cy}
        rx={1.3 * scale}
        ry={0.8 * scale}
        fill="#888888"
      />

      {/* Crisp Isometric Projected White Aoutive Logo */}
      <g
        transform={`translate(${cx}, ${cy}) scale(1, 0.58) rotate(-45) scale(${scale * 0.78})`}
      >
        <path
          d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
          fill="#FFFFFF"
        />
        <polygon points="-14,4 -7,0 -7,8" fill="#FFFFFF" />
      </g>
    </g>
  );
}

// ============================================================================
// SVG 1: HIGHLY AVAILABLE (Cloud + Central 3-Tier Server + 4 Regional Nodes)
// Rebuilt for 1:1 fidelity with uploaded Image 2 (image_3dfe62.png)
// ============================================================================
export function HighlyAvailableSvg() {
  return (
    <svg
      viewBox="0 0 760 470"
      className="h-full w-full select-none overflow-visible"
    >
      <IsoGridBackground id="grid-ha" />

      <defs>
        <linearGradient id="beam-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cyl-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F5F5" />
          <stop offset="55%" stopColor="#EAEAEA" />
          <stop offset="100%" stopColor="#D6D6D6" />
        </linearGradient>
      </defs>

      {/* Connector Arrows from 4 Outer Platforms to Center Platform */}
      <g
        stroke="#686868"
        strokeWidth="1.35"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top-Left to Center */}
        <line x1="252" y1="216" x2="318" y2="254" />
        <polyline points="310,255 318,254 316,246" />

        {/* Top-Right to Center */}
        <line x1="504" y1="214" x2="438" y2="252" />
        <polyline points="440,244 438,252 446,253" />

        {/* Bottom-Left to Center */}
        <line x1="274" y1="340" x2="328" y2="306" />
        <polyline points="320,305 328,306 326,314" />

        {/* Bottom-Right to Center */}
        <line x1="482" y1="340" x2="428" y2="306" />
        <polyline points="430,314 428,306 436,305" />
      </g>

      {/* ==================== 1. TOP-LEFT PLATFORM: PROJECTOR & 3 FLOATING ICONS ==================== */}
      <IsoPlatform cx="206" cy="186" rx="70" ry="40.5" depth="8.5" />
      <g>
        {/* 1-Tier Isometric Projector Hub */}
        <IsoServerTier
          cx={206}
          cy={166}
          w={36}
          h={21}
          d={16}
          showRightDots={false}
        />
        {/* Recessed Inner Gray Square Well on Top */}
        <path
          d={getIsoRoundedSquarePath(206, 166, 23, 13.5, 0.14)}
          fill="#DCDCDC"
          stroke="#888888"
          strokeWidth="1"
        />
        {/* Upward Light Projection Beam */}
        <polygon
          points="178,166 168,118 244,118 234,166"
          fill="url(#beam-grad)"
        />

        {/* Floating Badge 1: Globe (Left) */}
        <g transform="translate(166, 114)">
          <rect width="23" height="23" rx="4.5" fill="#EFEFEF" />
          <circle
            cx="11.5"
            cy="11.5"
            r="6.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
          <ellipse
            cx="11.5"
            cy="11.5"
            rx="3"
            ry="6.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.1"
          />
          <line
            x1="5"
            y1="9.5"
            x2="18"
            y2="9.5"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <line
            x1="5"
            y1="13.5"
            x2="18"
            y2="13.5"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
        </g>

        {/* Floating Badge 2: Code </> (Top-Center) */}
        <g transform="translate(194.5, 96)">
          <rect width="23" height="23" rx="4.5" fill="#EFEFEF" />
          <path
            d="M8.5 8.5L5.5 11.5L8.5 14.5M14.5 8.5L17.5 11.5L14.5 14.5M12.5 7.5L10.5 15.5"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Floating Badge 3: Webhook / Nodes (Right) */}
        <g transform="translate(223, 114)">
          <rect width="23" height="23" rx="4.5" fill="#EFEFEF" />
          <circle
            cx="11.5"
            cy="7.5"
            r="2"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.3"
          />
          <circle
            cx="7.5"
            cy="15"
            r="2"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.3"
          />
          <circle
            cx="15.5"
            cy="15"
            r="2"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1.3"
          />
          <line
            x1="10.5"
            y1="9.2"
            x2="8.5"
            y2="13.2"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
          <line
            x1="12.5"
            y1="9.2"
            x2="14.5"
            y2="13.2"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
          <line
            x1="9.5"
            y1="15"
            x2="13.5"
            y2="15"
            stroke="#1A1A1A"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* ==================== 2. TOP-RIGHT PLATFORM: DUAL 2-TIER SERVER STACKS ==================== */}
      <IsoPlatform cx="548" cy="186" rx="74" ry="43" depth="8.5" />
      {/* Back-Left Mini 2-Tier Stack */}
      <g>
        <IsoServerTier
          cx={524}
          cy={166}
          w={30}
          h={17.5}
          d={12}
          showRightDots={false}
        />
        <IsoServerTier
          cx={524}
          cy={151}
          w={30}
          h={17.5}
          d={12}
          showRightDots={false}
        />
        <IsoAoutiveTopBadge cx={524} cy={151} scale={0.54} />
      </g>
      {/* Front-Right Mini 2-Tier Stack */}
      <g>
        <IsoServerTier
          cx={566}
          cy={186}
          w={30}
          h={17.5}
          d={12}
          showRightDots={false}
        />
        <IsoServerTier
          cx={566}
          cy={171}
          w={30}
          h={17.5}
          d={12}
          showRightDots={false}
        />
        <IsoAoutiveTopBadge cx={566} cy={171} scale={0.54} />
      </g>

      {/* ==================== 3. CENTER PLATFORM: 3-TIER AOUTIVE SERVER STACK + CLOUD ==================== */}
      <IsoPlatform cx="378" cy="282" rx="88" ry="51" depth="11" />
      {/* 3 Stacked Server Tiers (Bottom to Top) */}
      <IsoServerTier cx={378} cy={254} w={57} h={33} d={21} />
      <IsoServerTier cx={378} cy={229} w={57} h={33} d={21} />
      <IsoServerTier cx={378} cy={204} w={57} h={33} d={21} />
      {/* Top Black Aoutive Logo Plate + Beam */}
      <IsoAoutiveTopBadge cx={378} cy={204} scale={1.02} />

      {/* True Isometric 3D Cloud Floating Above Center Stack */}
      <g transform="translate(324, 42)">
        {/* 3D Extruded Back Cloud Layer (Offset dx=+13, dy=-7.5) */}
        <path
          d="M 28 74 C 12 64 8 44 18 32 C 24 25 35 26 42 32 C 50 14 74 14 88 30 C 100 42 102 60 98 72 C 110 78 114 94 106 105 C 100 112 88 110 76 103 L 28 74 Z"
          transform="translate(13, -7.5)"
          fill="#F5F5F5"
          stroke="#686868"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Connecting 3D Tangent Seam Lines */}
        <line
          x1="20"
          y1="30"
          x2="33"
          y2="22.5"
          stroke="#686868"
          strokeWidth="1.15"
        />
        <line
          x1="65"
          y1="19"
          x2="78"
          y2="11.5"
          stroke="#686868"
          strokeWidth="1.15"
        />
        <line
          x1="108"
          y1="88"
          x2="121"
          y2="80.5"
          stroke="#686868"
          strokeWidth="1.15"
        />
        {/* Front Isometric Cloud Face */}
        <path
          d="M 28 74 C 12 64 8 44 18 32 C 24 25 35 26 42 32 C 50 14 74 14 88 30 C 100 42 102 60 98 72 C 110 78 114 94 106 105 C 100 112 88 110 76 103 L 28 74 Z"
          fill="#FFFFFF"
          stroke="#686868"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </g>

      {/* ==================== 4. BOTTOM-LEFT PLATFORM: 4 CUBES WITH GEARS & REFRESH ==================== */}
      <IsoPlatform cx="218" cy="368" rx="76" ry="44" depth="9" />
      {[
        { cx: 218, cy: 326 }, // Top cube
        { cx: 183, cy: 347 }, // Left cube
        { cx: 253, cy: 347 }, // Right cube
        { cx: 218, cy: 368 }, // Bottom cube
      ].map((cube, i) => (
        <g key={i}>
          {/* Cube Left Face */}
          <polygon
            points={`${cube.cx - 22},${cube.cy} ${cube.cx},${cube.cy + 13} ${cube.cx},${cube.cy + 39} ${cube.cx - 22},${cube.cy + 26}`}
            fill="#F5F5F5"
            stroke="#686868"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          {/* Cube Right Face */}
          <polygon
            points={`${cube.cx},${cube.cy + 13} ${cube.cx + 22},${cube.cy} ${cube.cx + 22},${cube.cy + 26} ${cube.cx},${cube.cy + 39}`}
            fill="#E2E2E2"
            stroke="#686868"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          {/* Cube Top Face */}
          <polygon
            points={`${cube.cx},${cube.cy - 13} ${cube.cx + 22},${cube.cy} ${cube.cx},${cube.cy + 13} ${cube.cx - 22},${cube.cy}`}
            fill="#FFFFFF"
            stroke="#686868"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          {/* Crisp Refresh Arrow on Right Face */}
          <path
            d={`M ${cube.cx + 15} ${cube.cy + 14} A 5.5 7.5 25 1 0 ${cube.cx + 15} ${cube.cy + 24}`}
            fill="none"
            stroke="#555555"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <polyline
            points={`${cube.cx + 12},${cube.cy + 13.5} ${cube.cx + 15.5},${cube.cy + 13} ${cube.cx + 15},${cube.cy + 16.5}`}
            fill="none"
            stroke="#555555"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* True 8-Tooth Standing Isometric Gear on Top of Cube */}
          <g transform={`translate(${cube.cx}, ${cube.cy - 8})`}>
            {/* 3D Back Gear Rim */}
            <path
              d="M -2 -9.5 L 2 -9.5 L 2.8 -7.2 L 5.2 -6.2 L 7.2 -7.5 L 9.2 -5.5 L 7.8 -3.5 L 8.8 -1.2 L 11 -0.5 L 11 2.5 L 8.8 3.2 L 7.8 5.5 L 9.2 7.5 L 7.2 9.5 L 5.2 8.2 L 2.8 9.2 L 2 11.5 L -2 11.5 L -2.8 9.2 L -5.2 8.2 L -7.2 9.5 L -9.2 7.5 L -7.8 5.5 L -8.8 3.2 L -11 2.5 L -11 -0.5 L -8.8 -1.2 L -7.8 -3.5 L -9.2 -5.5 L -7.2 -7.5 L -5.2 -6.2 L -2.8 -7.2 Z"
              transform="translate(2, -1) scale(0.88, 0.95) skewY(18)"
              fill="#E6E6E6"
              stroke="#686868"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* Front Gear Face */}
            <path
              d="M -2 -9.5 L 2 -9.5 L 2.8 -7.2 L 5.2 -6.2 L 7.2 -7.5 L 9.2 -5.5 L 7.8 -3.5 L 8.8 -1.2 L 11 -0.5 L 11 2.5 L 8.8 3.2 L 7.8 5.5 L 9.2 7.5 L 7.2 9.5 L 5.2 8.2 L 2.8 9.2 L 2 11.5 L -2 11.5 L -2.8 9.2 L -5.2 8.2 L -7.2 9.5 L -9.2 7.5 L -7.8 5.5 L -8.8 3.2 L -11 2.5 L -11 -0.5 L -8.8 -1.2 L -7.8 -3.5 L -9.2 -5.5 L -7.2 -7.5 L -5.2 -6.2 L -2.8 -7.2 Z"
              transform="scale(0.88, 0.95) skewY(18)"
              fill="#FFFFFF"
              stroke="#686868"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
            <ellipse
              cx="0"
              cy="1"
              rx="3.4"
              ry="3.8"
              transform="skewY(18)"
              fill="#F4F4F4"
              stroke="#686868"
              strokeWidth="1.1"
            />
          </g>
        </g>
      ))}

      {/* ==================== 5. BOTTOM-RIGHT PLATFORM: DUAL 3-TIER DATABASE CYLINDERS ==================== */}
      <IsoPlatform cx="538" cy="368" rx="76" ry="44" depth="9" />
      {[
        { cx: 560, cy: 340 }, // Back-right cylinder stack
        { cx: 516, cy: 364 }, // Front-left cylinder stack
      ].map((db, idx) => (
        <g key={idx}>
          {[26, 13, 0].map((offsetY, layerIdx) => {
            const y = db.cy + offsetY;
            return (
              <g key={layerIdx}>
                {/* Cylinder Shaded Body */}
                <path
                  d={`M ${db.cx - 25} ${y} L ${db.cx - 25} ${y + 11.5} A 25 13.5 0 0 0 ${db.cx + 25} ${y + 11.5} L ${db.cx + 25} ${y} Z`}
                  fill="url(#cyl-grad)"
                  stroke="#686868"
                  strokeWidth="1.15"
                />
                {/* Cylinder Top Ellipse */}
                <ellipse
                  cx={db.cx}
                  cy={y}
                  rx="25"
                  ry="13.5"
                  fill="#FFFFFF"
                  stroke="#686868"
                  strokeWidth="1.15"
                />
                {/* 3 Tiny Status LEDs on Cylinder Front */}
                <circle
                  cx={db.cx - 7}
                  cy={y + 17.5}
                  r="1.2"
                  fill="#FFFFFF"
                  stroke="#686868"
                  strokeWidth="0.9"
                />
                <circle
                  cx={db.cx + 2}
                  cy={y + 18.5}
                  r="1.2"
                  fill="#FFFFFF"
                  stroke="#686868"
                  strokeWidth="0.9"
                />
                <circle
                  cx={db.cx + 11}
                  cy={y + 17}
                  r="1.2"
                  fill="#FFFFFF"
                  stroke="#686868"
                  strokeWidth="0.9"
                />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// SVG 2: LOW-LATENCY EXECUTION (5 Isometric Black-Rimmed Circular Pucks)
// Rebuilt for 1:1 fidelity with uploaded Image 1 (image_3dfe68.png)
// ============================================================================
function IsoCircularPuck({
  cx,
  cy,
  rx = 52,
  ry = 31,
  depth = 17,
  children,
}: {
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  depth?: number;
  children?: React.ReactNode;
}) {
  return (
    <g>
      {/* Solid #171717 3D Cylinder Extrusion */}
      <path
        d={`M ${cx - rx} ${cy} L ${cx - rx} ${cy + depth} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + depth} L ${cx + rx} ${cy} Z`}
        fill="#171717"
      />
      {/* White Top Surface */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FFFFFF" />
      {/* Dashed Rim Border */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx - 1}
        ry={ry - 0.6}
        fill="none"
        stroke="#171717"
        strokeWidth="1.3"
        strokeDasharray="4.5 3.5"
      />
      {children}
    </g>
  );
}

export function LowLatencySvg() {
  return (
    <svg
      viewBox="0 0 760 470"
      className="h-full w-full select-none overflow-visible"
    >
      <IsoGridBackground id="grid-ll" />

      <defs>
        <linearGradient id="puck-beam-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Connecting Isometric Lines between Center Puck and 4 Outer Pucks */}
      <g stroke="#7A7A7A" strokeWidth="1.4" fill="none">
        {/* Top-Left to Center */}
        <line x1="286" y1="172" x2="334" y2="210" />
        {/* Top-Right to Center */}
        <line x1="448" y1="184" x2="402" y2="212" />
        {/* Bottom-Left to Center */}
        <line x1="274" y1="284" x2="328" y2="250" />
        {/* Center to Bottom-Right (Large Aoutive Puck) */}
        <line x1="402" y1="254" x2="452" y2="294" />
      </g>

      {/* 1. TOP-LEFT PUCK: Isometric CPU / Microchip Icon */}
      <IsoCircularPuck cx={252} cy={142} rx={52} ry={31} depth={17}>
        {/* Projected flat onto the isometric top face */}
        <g transform="translate(252, 142) scale(1, 0.58) rotate(-45)">
          {/* Outer & Inner Chip Frame */}
          <rect
            x="-15"
            y="-15"
            width="30"
            height="30"
            rx="2.5"
            fill="none"
            stroke="#171717"
            strokeWidth="1.7"
          />
          <rect
            x="-11"
            y="-11"
            width="22"
            height="22"
            rx="1.5"
            fill="none"
            stroke="#171717"
            strokeWidth="1.3"
          />
          {/* Internal PCB Traces & Nodes */}
          <circle
            cx="-4"
            cy="-3"
            r="2.2"
            fill="none"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <line
            x1="-4"
            y1="-5.2"
            x2="-4"
            y2="-11"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <circle
            cx="4"
            cy="3"
            r="2.2"
            fill="none"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <line
            x1="4"
            y1="5.2"
            x2="4"
            y2="11"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <line
            x1="-2"
            y1="4"
            x2="-11"
            y2="4"
            stroke="#171717"
            strokeWidth="1.4"
          />
          {/* 3 Pins on Each of the 4 Sides */}
          {[-7, 0, 7].map((p) => (
            <React.Fragment key={p}>
              <line
                x1={p}
                y1="-15"
                x2={p}
                y2="-20"
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1={p}
                y1="15"
                x2={p}
                y2="20"
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="-15"
                y1={p}
                x2="-20"
                y2={p}
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="15"
                y1={p}
                x2="20"
                y2={p}
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </React.Fragment>
          ))}
        </g>
      </IsoCircularPuck>

      {/* 2. TOP-RIGHT PUCK: Isometric Network Globe with 6 Satellite Nodes */}
      <IsoCircularPuck cx={482} cy={150} rx={52} ry={31} depth={17}>
        <g transform="translate(482, 150) scale(1, 0.58) rotate(-45)">
          {/* Outer Ring & Inner Globe */}
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="none"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <circle
            cx="0"
            cy="0"
            r="11.5"
            fill="none"
            stroke="#171717"
            strokeWidth="1.4"
          />
          {/* Globe Grid Lines */}
          <ellipse
            cx="0"
            cy="0"
            rx="5.5"
            ry="11.5"
            fill="none"
            stroke="#171717"
            strokeWidth="1.2"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="11.5"
            ry="5.5"
            fill="none"
            stroke="#171717"
            strokeWidth="1.2"
          />
          <line
            x1="-11.5"
            y1="0"
            x2="11.5"
            y2="0"
            stroke="#171717"
            strokeWidth="1.2"
          />
          <line
            x1="0"
            y1="-11.5"
            x2="0"
            y2="11.5"
            stroke="#171717"
            strokeWidth="1.2"
          />
          {/* Satellite Nodes & Stems */}
          {[0, 45, 90, 180, 225, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line
                x1="16"
                y1="0"
                x2="22"
                y2="0"
                stroke="#171717"
                strokeWidth="1.4"
              />
              <circle
                cx="24"
                cy="0"
                r="2.2"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="1.4"
              />
            </g>
          ))}
        </g>
      </IsoCircularPuck>

      {/* 3. CENTER PUCK: 3-Way Split Routing Arrows */}
      <IsoCircularPuck cx={366} cy={228} rx={52} ry={31} depth={17}>
        <g
          transform="translate(366, 228) scale(1, 0.58) rotate(-45)"
          fill="none"
          stroke="#171717"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Trunk stems */}
          <path d="M 3 18 L 3 4 C 3 -4 -4 -8 -14 -12" />
          <path d="M -2 18 L -2 4 C -2 -2 5 -6 14 -12" />
          <path d="M -2 8 C -6 6 -10 8 -16 11" />
          {/* 3 Distinct Arrowheads */}
          <polygon
            points="-17,-14 -9,-15 -13,-8"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <polygon
            points="17,-14 13,-8 9,-15"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <polygon
            points="-19,13 -12,14 -15,7"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.4"
          />
        </g>
      </IsoCircularPuck>

      {/* 4. BOTTOM-LEFT PUCK: Isometric Stopwatch with "MS" */}
      <IsoCircularPuck cx={236} cy={302} rx={52} ry={31} depth={17}>
        <g transform="translate(236, 302) scale(1, 0.58) rotate(-45)">
          {/* Outer & Inner Stopwatch Rings */}
          <circle
            cx="0"
            cy="2"
            r="18"
            fill="none"
            stroke="#171717"
            strokeWidth="1.6"
          />
          <circle
            cx="0"
            cy="2"
            r="14"
            fill="none"
            stroke="#171717"
            strokeWidth="1.3"
          />
          {/* Top Crown Stem */}
          <line
            x1="0"
            y1="-16"
            x2="0"
            y2="-21"
            stroke="#171717"
            strokeWidth="1.8"
          />
          <rect
            x="-4"
            y="-23.5"
            width="8"
            height="2.8"
            rx="1"
            fill="none"
            stroke="#171717"
            strokeWidth="1.4"
          />
          {/* Left & Right Side Pushers */}
          <line
            x1="-12"
            y1="-11"
            x2="-16"
            y2="-15"
            stroke="#171717"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="-11"
            x2="16"
            y2="-15"
            stroke="#171717"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Center Pivot & Hand */}
          <circle
            cx="0"
            cy="2"
            r="2.2"
            fill="#FFFFFF"
            stroke="#171717"
            strokeWidth="1.4"
          />
          <line
            x1="-2"
            y1="1"
            x2="-9"
            y2="-3"
            stroke="#171717"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* "MS" Label */}
          <text
            x="2"
            y="10"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="800"
            fill="#171717"
            fontFamily="sans-serif"
          >
            MS
          </text>
        </g>
      </IsoCircularPuck>

      {/* 5. BOTTOM-RIGHT LARGE PUCK: Aoutive Core Engine + Shimmer Beam */}
      <IsoCircularPuck cx={502} cy={318} rx={76} ry={45} depth={20}>
        {/* Upward Light Shimmer Column from Inner Circle */}
        <polygon
          points="446,318 446,232 558,232 558,318"
          fill="url(#puck-beam-grad)"
          pointerEvents="none"
        />
        {/* Inner Shaded Dashed Circle */}
        <ellipse
          cx="502"
          cy="318"
          rx="55"
          ry="33"
          fill="#F3F3F3"
          stroke="#171717"
          strokeWidth="1.25"
          strokeDasharray="4 3.5"
        />
        {/* Crisp Isometric Projected Aoutive Mark in Center */}
        <g transform="translate(502, 318) scale(1, 0.58) rotate(-45) scale(1.45)">
          <path
            d="M -10 12 L -10 -7 C -10 -10.5 -6.5 -12 -3.5 -10 L 12 0 C 14.5 1.8 14.5 5.2 12 7 L 2 13.5 L -3.5 9.5 L 5.5 3.5 L -3 -2 L -3 12 Z"
            fill="#141414"
          />
          <polygon points="-14,4 -7,0 -7,8" fill="#141414" />
        </g>
      </IsoCircularPuck>
    </svg>
  );
}

// ============================================================================
// SVG 3: SCALABLE WORKFLOW ENGINE (4 Diagonal Isometric Vertical Slabs)
// Matches uploaded Image 3 (image_3e7d86.png) 1:1
// ============================================================================
function IsoVerticalSlab({
  x,
  y,
  isHighlighted = false,
  children,
}: {
  x: number;
  y: number;
  isHighlighted?: boolean;
  children?: React.ReactNode;
}) {
  // Slab geometry:
  // Thickness vector (down-right): dx = 18, dy = 11
  // Width vector (up-right): wx = 112, wy = -65
  // Height vector (down): h = 132
  const strokeColor = isHighlighted ? "#1A1A1A" : "#8E8E8E";
  const strokeW = isHighlighted ? "1.4" : "1.1";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Dotted Floor Footprint Pad */}
      <polygon
        points="-8,134 114,64 138,78 16,148"
        fill="#ECECEC"
        stroke={isHighlighted ? "#555555" : "#B0B0B0"}
        strokeWidth="1.1"
        strokeDasharray="3 3"
      />

      {/* Top Thickness Bevel Face */}
      <polygon
        points="0,0 112,-65 130,-54 18,11"
        fill="#FAFAFA"
        stroke={strokeColor}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />

      {/* Left Thickness Bevel Face */}
      <polygon
        points="0,0 18,11 18,143 0,132"
        fill="#F3F3F3"
        stroke={strokeColor}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />

      {/* Main Front-Right Isometric Face */}
      <polygon
        points="18,11 130,-54 130,78 18,143"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />

      {/* Content Projected onto Main Front-Right Face */}
      <g transform="translate(18, 11) skewY(-30.1)">{children}</g>
    </g>
  );
}

export function ScalableEngineSvg() {
  return (
    <svg
      viewBox="0 0 760 470"
      className="h-full w-full select-none overflow-visible"
    >
      <IsoGridBackground id="grid-se" />

      {/* Central Diagonal Spine Line Running Through All 4 Slabs */}
      <line
        x1="150"
        y1="125"
        x2="585"
        y2="378"
        stroke="#D0D0D0"
        strokeWidth="1.3"
      />

      {/* SLAB 1 (Back-Left): WORKFLOW / EVENTS / DATA SYNC */}
      <IsoVerticalSlab x={210} y={120}>
        {[
          { label: "WORKFLOW", y: 16 },
          { label: "EVENTS", y: 52 },
          { label: "DATA SYNC", y: 88 },
        ].map((slot, i) => (
          <g key={i} transform={`translate(14, ${slot.y})`}>
            <rect
              width="84"
              height="25"
              rx="3"
              fill="#F5F5F5"
              stroke="#CCCCCC"
              strokeWidth="1"
            />
            <text
              x="42"
              y="16"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="600"
              fill="#555555"
              letterSpacing="0.03em"
            >
              {slot.label}
            </text>
          </g>
        ))}
      </IsoVerticalSlab>

      {/* SLAB 2 (Center-Left, Highlighted): Aoutive Microchip & PCB Traces */}
      <IsoVerticalSlab x={292} y={168} isHighlighted>
        <g transform="translate(56, 66)">
          {/* Radiating PCB Circuit Traces + Terminal Rings */}
          <g stroke="#1A1A1A" strokeWidth="1.1" fill="none">
            <polyline points="-12,-18 -12,-34 -6,-40" />
            <circle cx="-6" cy="-41.5" r="1.6" fill="#FFFFFF" />

            <polyline points="0,-18 0,-38" />
            <circle cx="0" cy="-40" r="1.6" fill="#FFFFFF" />

            <polyline points="12,-18 18,-32 18,-44" />
            <circle cx="18" cy="-46" r="1.6" fill="#FFFFFF" />

            <polyline points="18,-8 32,-14 38,-14" />
            <circle cx="40" cy="-14" r="1.6" fill="#FFFFFF" />

            <polyline points="18,4 34,4 40,10" />
            <circle cx="41.5" cy="11.5" r="1.6" fill="#FFFFFF" />

            <polyline points="-18,-6 -32,-6 -38,-12" />
            <circle cx="-39.5" cy="-13.5" r="1.6" fill="#FFFFFF" />

            <polyline points="-18,8 -30,14 -30,24" />
            <circle cx="-30" cy="26" r="1.6" fill="#FFFFFF" />

            <polyline points="-8,18 -14,34 -20,40" />
            <circle cx="-21.5" cy="41.5" r="1.6" fill="#FFFFFF" />

            <polyline points="6,18 6,36 12,42" />
            <circle cx="13.5" cy="43.5" r="1.6" fill="#FFFFFF" />
          </g>

          {/* Central Black Square Chip */}
          <rect x="-19" y="-19" width="38" height="38" rx="4" fill="#1A1A1A" />
          {/* White Aoutive Icon inside Chip */}
          <path
            d="M -9 9 L -9 -5 C -9 -8 -6 -9 -3 -7 L 9 0 C 11 1.5 11 4.5 9 6 L 1 10"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="9" r="2.2" fill="#FFFFFF" />
        </g>
      </IsoVerticalSlab>

      {/* SLAB 3 (Center-Right): API REQUESTS / TRIGGERS / DATA */}
      <IsoVerticalSlab x={382} y={220}>
        {[
          { label: "API REQUESTS", y: 16 },
          { label: "TRIGGERS", y: 52 },
          { label: "DATA", y: 88 },
        ].map((slot, i) => (
          <g key={i} transform={`translate(14, ${slot.y})`}>
            <rect
              width="84"
              height="25"
              rx="3"
              fill="#F5F5F5"
              stroke="#CCCCCC"
              strokeWidth="1"
            />
            <text
              x="42"
              y="16"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="600"
              fill="#555555"
              letterSpacing="0.03em"
            >
              {slot.label}
            </text>
          </g>
        ))}
      </IsoVerticalSlab>

      {/* SLAB 4 (Front-Right): 2x2 Grid of 3D Modular Pin Blocks */}
      <IsoVerticalSlab x={456} y={264}>
        {[
          { bx: 20, by: 22 },
          { bx: 60, by: 22 },
          { bx: 20, by: 68 },
          { bx: 60, by: 68 },
        ].map((blk, i) => (
          <g key={i} transform={`translate(${blk.bx}, ${blk.by})`}>
            {/* 3D Extruded Block Backing */}
            <rect
              x="-5"
              y="-4"
              width="32"
              height="32"
              rx="3"
              fill="#F2F2F2"
              stroke="#7A7A7A"
              strokeWidth="1.1"
            />
            {/* Front Face of Modular Block */}
            <rect
              x="0"
              y="0"
              width="32"
              height="32"
              rx="3"
              fill="#FFFFFF"
              stroke="#7A7A7A"
              strokeWidth="1.1"
            />
            {/* 4 Circular Pins inside each Block */}
            <circle
              cx="10"
              cy="10"
              r="3"
              fill="#F0F0F0"
              stroke="#7A7A7A"
              strokeWidth="1"
            />
            <circle
              cx="22"
              cy="10"
              r="3"
              fill="#F0F0F0"
              stroke="#7A7A7A"
              strokeWidth="1"
            />
            <circle
              cx="10"
              cy="22"
              r="3"
              fill="#F0F0F0"
              stroke="#7A7A7A"
              strokeWidth="1"
            />
            <circle
              cx="22"
              cy="22"
              r="3"
              fill="#F0F0F0"
              stroke="#7A7A7A"
              strokeWidth="1"
            />
          </g>
        ))}
      </IsoVerticalSlab>
    </svg>
  );
}

// ============================================================================
// SVG 4: FAULT-TOLERANT SYSTEM (4 Isometric Nodes in Diamond Failover Ring)
// Matches uploaded Image 2 (image_3e7daa.png) 1:1
// ============================================================================
function IsoFaultNode({
  cx,
  cy,
  ports = [],
}: {
  cx: number;
  cy: number;
  ports?: ("left-bottom" | "right-bottom" | "left-top" | "right-top")[];
}) {
  const w = 62;
  const h = 36;
  const d = 28;

  return (
    <g>
      {/* Left Vertical Wall */}
      <polygon
        points={`${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + d} ${cx - w},${cy + d}`}
        fill="#FAFAFA"
        stroke="#6E6E6E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Vertical Wall */}
      <polygon
        points={`${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + d} ${cx},${cy + h + d}`}
        fill="#F0F0F0"
        stroke="#6E6E6E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Center Vertical Corner Bevel Strip */}
      <polygon
        points={`${cx - 6},${cy + h - 3.5} ${cx + 6},${cy + h - 3.5} ${cx + 6},${cy + h + d - 3.5} ${cx - 6},${cy + h + d - 3.5}`}
        fill="#E4E4E4"
        stroke="#6E6E6E"
        strokeWidth="1"
      />
      {/* Top Isometric Diamond Face */}
      <polygon
        points={`${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`}
        fill="#FFFFFF"
        stroke="#6E6E6E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 4 Corner Mounting Circles on Top Face */}
      <ellipse
        cx={cx}
        cy={cy - h + 10}
        rx="6"
        ry="3.6"
        fill="none"
        stroke="#AAAAAA"
        strokeWidth="1.1"
      />
      <ellipse
        cx={cx + w - 16}
        cy={cy}
        rx="6"
        ry="3.6"
        fill="none"
        stroke="#AAAAAA"
        strokeWidth="1.1"
      />
      <ellipse
        cx={cx}
        cy={cy + h - 10}
        rx="6"
        ry="3.6"
        fill="none"
        stroke="#AAAAAA"
        strokeWidth="1.1"
      />
      <ellipse
        cx={cx - w + 16}
        cy={cy}
        rx="6"
        ry="3.6"
        fill="none"
        stroke="#AAAAAA"
        strokeWidth="1.1"
      />

      {/* Circular Port Holes on Vertical Walls */}
      {ports.includes("left-bottom") && (
        <ellipse
          cx={cx - 26}
          cy={cy + h - 1}
          rx="4.2"
          ry="5.8"
          transform={`rotate(-25 ${cx - 26} ${cy + h - 1})`}
          fill="#EAEAEA"
          stroke="#555555"
          strokeWidth="1.2"
        />
      )}
      {ports.includes("right-bottom") && (
        <ellipse
          cx={cx + 26}
          cy={cy + h - 1}
          rx="4.2"
          ry="5.8"
          transform={`rotate(25 ${cx + 26} ${cy + h - 1})`}
          fill="#EAEAEA"
          stroke="#555555"
          strokeWidth="1.2"
        />
      )}
    </g>
  );
}

export function FaultTolerantSvg() {
  return (
    <svg
      viewBox="0 0 760 470"
      className="h-full w-full select-none overflow-visible"
    >
      <IsoGridBackground id="grid-ft" />

      {/* 1. TOP NODE */}
      <IsoFaultNode cx={366} cy={112} ports={["left-bottom", "right-bottom"]} />

      {/* 2. LEFT NODE */}
      <IsoFaultNode cx={198} cy={214} ports={["right-bottom"]} />

      {/* 3. RIGHT NODE */}
      <IsoFaultNode cx={538} cy={220} ports={["left-bottom"]} />

      {/* 4. BOTTOM NODE */}
      <IsoFaultNode cx={366} cy={318} ports={[]} />

      {/* Connecting Lines & Signal Rings */}
      {/* Solid Line 1: Left Node to Top Node */}
      <line
        x1="245"
        y1="196"
        x2="340"
        y2="147"
        stroke="#555555"
        strokeWidth="1.3"
      />
      <ellipse
        cx="292"
        cy="171.5"
        rx="3.2"
        ry="5.2"
        transform="rotate(-25 292 171.5)"
        fill="#FFFFFF"
        stroke="#555555"
        strokeWidth="1.3"
      />

      {/* Solid Line 2: Left Node to Bottom Node */}
      <line
        x1="224"
        y1="250"
        x2="320"
        y2="305"
        stroke="#555555"
        strokeWidth="1.3"
      />
      <ellipse
        cx="272"
        cy="277.5"
        rx="3.2"
        ry="5.2"
        transform="rotate(25 272 277.5)"
        fill="#FFFFFF"
        stroke="#555555"
        strokeWidth="1.3"
      />

      {/* Dashed Failover Line 3: Top Node to Right Node */}
      <line
        x1="392"
        y1="147"
        x2="492"
        y2="202"
        stroke="#555555"
        strokeWidth="1.3"
        strokeDasharray="5 4"
      />
      <ellipse
        cx="442"
        cy="174.5"
        rx="3.2"
        ry="5.2"
        transform="rotate(25 442 174.5)"
        fill="#FFFFFF"
        stroke="#555555"
        strokeWidth="1.3"
      />

      {/* Dashed Failover Line 4: Bottom Node to Right Node */}
      <line
        x1="414"
        y1="305"
        x2="512"
        y2="256"
        stroke="#555555"
        strokeWidth="1.3"
        strokeDasharray="5 4"
      />
      <ellipse
        cx="463"
        cy="280.5"
        rx="3.2"
        ry="5.2"
        transform="rotate(-25 463 280.5)"
        fill="#FFFFFF"
        stroke="#555555"
        strokeWidth="1.3"
      />
    </svg>
  );
}

// ============================================================================
// MAIN INFRASTRUCTURE SECTION COMPONENT (Accordion + setInterval + Pure SVGs)
// ============================================================================
export function InfrastructureSection({
  autoRotate = true,
  useFiveItems = false,
}: {
  autoRotate?: boolean;
  useFiveItems?: boolean;
}) {
  const items = useFiveItems ? INFRASTRUCTURE_ITEMS_5 : INFRASTRUCTURE_ITEMS_4;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Smooth bottom progress bar timer (0% -> 100%, then advances to next item)
  useEffect(() => {
    if (!autoRotate) return;

    const durationMs = 4500;
    const intervalMs = 30;
    const step = 100 / (durationMs / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          setActiveIndex((curr) => (curr + 1) % items.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoRotate, items.length, activeIndex]);

  const handleSelectItem = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const currentItem = items[activeIndex] || items[0];

  return (
    <section
      id="infrastructure"
      className="relative w-full border-b border-[#EFEFEF] bg-[#FCFCFC] px-3 sm:px-6 xl:px-0"
    >
      <div className="relative mx-auto w-full max-w-[1224px] border-x border-[#EFEFEF] px-5 py-16 sm:px-10 md:py-24">
        {/* Bottom Crosshairs (+) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[8.5px] -left-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#B5B5B5]"
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
          className="pointer-events-none absolute -bottom-[8.5px] -right-[8.5px] z-20 flex h-4 w-4 items-center justify-center text-[#B5B5B5]"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </span>

        {/* 1. Section Header (Left-Aligned Heading + Description) */}
        <div className="max-w-[660px] text-left">
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[44px]"
          >
            Automation infrastructure{" "}
            <span className="text-[#999999]">
              built for reliability and scale
            </span>
          </h2>

          <p className="mt-4 max-w-[590px] text-sm font-medium leading-[1.55] tracking-[-0.01em] text-[#737373] sm:text-base">
            Aoutive AI runs every automation through a centralized intelligence
            engine. It connects your tools, processes data, and executes actions
            automatically, so your workflows run faster and smarter.
          </p>
        </div>

        {/* 2. Two-Column Main Split (Left: Accordion with Bottom Progress Bar | Right: Pure SVG) */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 border border-[#EFEFEF] bg-[#FCFCFC] lg:mt-14 lg:grid-cols-12">
          {/* Left Column: Interactive Accordion Items */}
          <div className="flex flex-col divide-y divide-[#EFEFEF] border-b border-[#EFEFEF] lg:col-span-5 lg:border-r lg:border-b-0">
            {items.map((item, idx) => {
              const isOpen = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(idx)}
                  className={`group relative flex w-full flex-col items-start px-6 py-6 text-left transition-colors duration-300 sm:px-8 ${
                    isOpen ? "bg-white" : "bg-[#FCFCFC] hover:bg-white/60"
                  }`}
                >
                  {/* Heading (Always Visible) */}
                  <h3
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    className={`text-lg font-semibold tracking-[-0.02em] transition-colors duration-200 sm:text-[20px] ${
                      isOpen
                        ? "text-[#1A1A1A]"
                        : "text-[#737373] group-hover:text-[#1A1A1A]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description (Visible ONLY when item is Open) */}
                  <div
                    className={`grid w-full transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "mt-2.5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-normal leading-[1.55] text-[#737373]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Loading Progress Bar (Fills from left to right on active item) */}
                  {isOpen && (
                    <div className="absolute right-0 bottom-0 left-0 h-[2px] w-full overflow-hidden bg-[#EFEFEF]">
                      <div
                        className="h-full bg-[#1A1A1A] transition-[width] duration-75 ease-linear"
                        style={{ width: autoRotate ? `${progress}%` : "100%" }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Pure Isometric SVG Stage */}
          <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden bg-[#FCFCFC] p-4 sm:h-[420px] lg:col-span-7 lg:h-[460px]">
            <div
              key={currentItem.id}
              className="flex h-full w-full items-center justify-center transition-all duration-500"
            >
              {currentItem.svgType === "highly-available" && (
                <HighlyAvailableSvg />
              )}
              {currentItem.svgType === "low-latency" && <LowLatencySvg />}
              {currentItem.svgType === "scalable-engine" && (
                <ScalableEngineSvg />
              )}
              {currentItem.svgType === "fault-tolerant" && <FaultTolerantSvg />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FULL NEXT.JS + GSAP + PURE SVG CODE FOR COPY TAB
// ============================================================================
const NEXTJS_INFRASTRUCTURE_CODE = `"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface InfrastructureItem {
  id: string;
  title: string;
  description: string;
  svgType: "highly-available" | "low-latency" | "scalable-engine" | "fault-tolerant";
}

const INFRASTRUCTURE_ITEMS: InfrastructureItem[] = [
  {
    id: "highly-available",
    title: "Highly Available",
    description:
      "Automation services are deployed across multiple regions to ensure workflows run continuously with automatic failover.",
    svgType: "highly-available",
  },
  {
    id: "low-latency",
    title: "Low-Latency Execution",
    description:
      "Execute complex multi-step workflows in milliseconds with optimized routing and zero cold-start overhead.",
    svgType: "low-latency",
  },
  {
    id: "scalable-engine",
    title: "Scalable Workflow Engine",
    description:
      "Process thousands of concurrent events, API requests, and triggers effortlessly as your operations grow.",
    svgType: "scalable-engine",
  },
  {
    id: "fault-tolerant",
    title: "Fault-Tolerant System",
    description:
      "Built-in redundancy, automatic retries, and backup routing paths keep your mission-critical automations running nonstop.",
    svgType: "fault-tolerant",
  },
];

export default function InfrastructureSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgStageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // GSAP Progress Bar (0% -> 100% in 4.5s, then advances to next item) + SVG Reveal
  useGSAP(
    () => {
      if (svgStageRef.current) {
        gsap.fromTo(
          svgStageRef.current,
          { opacity: 0, y: 14, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clearProps: "filter",
            duration: 0.55,
            ease: "power3.out",
          }
        );
      }

      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 4.5,
            ease: "none",
            onComplete: () => {
              setActiveIndex((prev) => (prev + 1) % INFRASTRUCTURE_ITEMS.length);
            },
          }
        );
      }
    },
    { dependencies: [activeIndex], scope: sectionRef }
  );

  const currentItem = INFRASTRUCTURE_ITEMS[activeIndex];

  return (
    <SectionWrapper
      id="infrastructure"
      noPadding
      className="px-3 sm:px-6 xl:px-0"
      innerClassName="px-5 py-16 sm:px-10 md:py-24"
    >
      <div ref={sectionRef}>
        {/* 1. Left-Aligned Header & Description */}
        <div className="max-w-[660px] text-left">
          <h2 className="font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#1A1A1A] sm:text-4xl md:text-[44px]">
            Automation infrastructure{" "}
            <span className="text-[#999999]">
              built for reliability and scale
            </span>
          </h2>

          <p className="mt-4 max-w-[590px] text-sm font-medium leading-[1.55] tracking-[-0.01em] text-[#737373] sm:text-base">
            Aoutive AI runs every automation through a centralized intelligence
            engine. It connects your tools, processes data, and executes actions
            automatically, so your workflows run faster and smarter.
          </p>
        </div>

        {/* 2. Two-Column Grid: Left Accordion | Right Pure SVG */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 border border-[#EFEFEF] bg-[#FCFCFC] lg:mt-14 lg:grid-cols-12">
          {/* Left Column: Accordion with Bottom Loading Progress Bar */}
          <div className="flex flex-col divide-y divide-[#EFEFEF] border-b border-[#EFEFEF] lg:col-span-5 lg:border-r lg:border-b-0">
            {INFRASTRUCTURE_ITEMS.map((item, idx) => {
              const isOpen = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={\`group relative flex w-full flex-col items-start px-6 py-6 text-left transition-colors duration-300 sm:px-8 \${
                    isOpen ? "bg-white" : "bg-[#FCFCFC] hover:bg-white/60"
                  }\`}
                >
                  <h3
                    className={\`font-heading text-lg font-semibold tracking-[-0.02em] transition-colors duration-200 sm:text-[20px] \${
                      isOpen
                        ? "text-[#1A1A1A]"
                        : "text-[#737373] group-hover:text-[#1A1A1A]"
                    }\`}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={\`grid w-full transition-all duration-300 ease-in-out \${
                      isOpen
                        ? "mt-2.5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }\`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-normal leading-[1.55] text-[#737373]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Progress Bar */}
                  {isOpen && (
                    <div className="absolute right-0 bottom-0 left-0 h-[2px] w-full overflow-hidden bg-[#EFEFEF]">
                      <div
                        ref={progressBarRef}
                        className="h-full w-full origin-left scale-x-0 bg-[#1A1A1A]"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Pure SVG Illustration */}
          <div
            ref={svgStageRef}
            className="relative flex h-[340px] w-full items-center justify-center overflow-hidden bg-[#FCFCFC] p-4 sm:h-[420px] lg:col-span-7 lg:h-[460px]"
          >
            {currentItem.svgType === "highly-available" && <HighlyAvailableSvg />}
            {currentItem.svgType === "low-latency" && <LowLatencySvg />}
            {currentItem.svgType === "scalable-engine" && <ScalableEngineSvg />}
            {currentItem.svgType === "fault-tolerant" && <FaultTolerantSvg />}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
// Note: Copy the 4 SVG helper components (HighlyAvailableSvg, LowLatencySvg, ScalableEngineSvg, FaultTolerantSvg) from above into the same file or a separate InfrastructureSvgs.tsx file.
`;

// ============================================================================
// ROOT INTERACTIVE PREVIEW APP
// ============================================================================
export default function App() {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [useFiveItems, setUseFiveItems] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(NEXTJS_INFRASTRUCTURE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-[#1A1A1A]">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      />

      {/* Top Interactive Dev Bar */}
      <div className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1224px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-[#1A1A1A]">
              Section 05: "Automation infrastructure" (4 Pure Isometric SVGs +
              Accordion)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeView === "preview" && (
              <>
                <button
                  type="button"
                  onClick={() => setAutoRotate((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#E5E5E5] bg-[#FCFCFC] px-2.5 py-1 font-medium text-[#1A1A1A] transition hover:bg-[#F0F0F0]"
                >
                  {autoRotate ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  <span>
                    {autoRotate ? "Pause setInterval" : "Resume setInterval"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setUseFiveItems((prev) => !prev)}
                  className="rounded-[4px] border border-[#E5E5E5] bg-[#FCFCFC] px-2.5 py-1 font-medium text-[#1A1A1A] transition hover:bg-[#F0F0F0]"
                >
                  {useFiveItems ? "Mode: 5 Items" : "Mode: 4 Items (1:1 SVGs)"}
                </button>
              </>
            )}

            <div className="inline-flex rounded-[4px] border border-[#EFEFEF] bg-[#F5F5F5] p-0.5">
              <button
                type="button"
                onClick={() => setActiveView("preview")}
                className={`inline-flex items-center gap-1.5 rounded-[3px] px-3 py-1 font-medium transition ${
                  activeView === "preview"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#666666] hover:text-[#1A1A1A]"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Live Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("code")}
                className={`inline-flex items-center gap-1.5 rounded-[3px] px-3 py-1 font-medium transition ${
                  activeView === "code"
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#666666] hover:text-[#1A1A1A]"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Next.js + SVG Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeView === "preview" ? (
        <InfrastructureSection
          autoRotate={autoRotate}
          useFiveItems={useFiveItems}
        />
      ) : (
        <div className="mx-auto max-w-[1224px] px-4 py-8 sm:px-6">
          <div className="rounded-[4px] border border-[#EFEFEF] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EFEFEF] pb-4">
              <div>
                <h3 className="text-base font-semibold text-[#1A1A1A]">
                  components/sections/InfrastructureSection.tsx
                </h3>
                <p className="mt-0.5 text-xs text-[#737373]">
                  Includes all 4 pure Isometric SVGs + Click & setInterval
                  Accordion.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#1A1A1A] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#333333]"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
            <pre className="mt-4 max-h-[600px] overflow-auto rounded-[4px] bg-[#141414] p-4 text-xs leading-relaxed text-neutral-100">
              <code>{NEXTJS_INFRASTRUCTURE_CODE}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
