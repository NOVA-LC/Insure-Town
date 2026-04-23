"use client";

import { useEffect, useRef } from "react";

/**
 * A cinematic hand-drawn brass skeleton key rendered entirely as SVG.
 * Slowly rotates + tilts with pointer. No 3D dependencies.
 */
export function HeroKey() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center pointer-events-none select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Back glow */}
      <div
        className="absolute h-[46vmin] w-[46vmin] rounded-full anim-pulse-glow"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,131,58,0.45) 0%, rgba(200,55,45,0.2) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* The Key — rotates slowly, tilts with pointer */}
      <div
        className="relative anim-key-spin"
        style={{
          transform:
            "rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg))",
          transition: "transform 0.25s cubic-bezier(0.2,0.9,0.3,1)",
          transformStyle: "preserve-3d",
          width: "min(44vmin, 480px)",
          height: "min(44vmin, 480px)",
        }}
      >
        <svg
          viewBox="-100 -260 200 520"
          className="w-full h-full drop-shadow-[0_40px_60px_rgba(200,55,45,0.35)]"
        >
          <defs>
            {/* Polished brass gradient */}
            <linearGradient id="k-brass" x1="0" x2="0" y1="-260" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0"    stopColor="#fbecbf" />
              <stop offset="0.15" stopColor="#f3dd9e" />
              <stop offset="0.35" stopColor="#e3c27a" />
              <stop offset="0.55" stopColor="#c9a24a" />
              <stop offset="0.8"  stopColor="#8a6a26" />
              <stop offset="1"    stopColor="#5a4416" />
            </linearGradient>
            <linearGradient id="k-brass-edge" x1="-30" x2="30" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0"   stopColor="#5a4416" />
              <stop offset="0.3" stopColor="#8a6a26" />
              <stop offset="0.5" stopColor="#efd89a" />
              <stop offset="0.7" stopColor="#8a6a26" />
              <stop offset="1"   stopColor="#5a4416" />
            </linearGradient>
            <radialGradient id="k-enamel" cx="0" cy="0" r="1">
              <stop offset="0"    stopColor="#e85a4e" />
              <stop offset="0.6"  stopColor="#c8372d" />
              <stop offset="1"    stopColor="#6a1a14" />
            </radialGradient>
            <radialGradient id="k-gem" cx="0.35" cy="0.35" r="0.8">
              <stop offset="0"   stopColor="#ffd48a" />
              <stop offset="0.5" stopColor="#c8372d" />
              <stop offset="1"   stopColor="#3a0806" />
            </radialGradient>
            <filter id="k-bevel" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
              <feSpecularLighting surfaceScale="4" specularConstant="1" specularExponent="20" lightingColor="#fff">
                <feDistantLight azimuth="135" elevation="55" />
              </feSpecularLighting>
              <feComposite in2="SourceAlpha" operator="in" />
              <feComposite in="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>
          </defs>

          {/* ── BOW (top ornate ring) ─────────────────────────── */}
          {/* Outer ring */}
          <circle cx="0" cy="-170" r="78" fill="url(#k-brass)" stroke="url(#k-brass-edge)" strokeWidth="4" />
          {/* Inner ring cutout */}
          <circle cx="0" cy="-170" r="40" fill="#0b1220" />
          <circle cx="0" cy="-170" r="40" fill="none" stroke="url(#k-brass-edge)" strokeWidth="3" />
          {/* Four filigree spokes (crosshatch) */}
          <g fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1.2">
            <path d="M-40 -170 h-38 a4 4 0 0 1 0 -8 h38 a4 4 0 0 1 0 8 z" />
            <path d="M 40 -170 h 38 a4 4 0 0 0 0 -8 h-38 a4 4 0 0 0 0 8 z" />
            <path d="M 0 -210 v-38 a4 4 0 0 0 -8 0 v38 a4 4 0 0 0 8 0 z" />
            <path d="M 0 -130 v 38 a4 4 0 0 0 -8 0 v-38 a4 4 0 0 0 8 0 z" />
          </g>
          {/* Center medallion (mayor-red enamel) */}
          <circle cx="0" cy="-170" r="18" fill="url(#k-enamel)" stroke="url(#k-brass-edge)" strokeWidth="2.5" />
          {/* Tiny key-star engraving */}
          <path
            d="M0,-182 L3,-174 L11,-172 L5,-167 L6,-159 L0,-164 L-6,-159 L-5,-167 L-11,-172 L-3,-174 Z"
            fill="#fbecbf"
            opacity="0.85"
          />
          {/* Top stud / loop for hanging */}
          <rect x="-6" y="-260" width="12" height="26" rx="3" fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1.2" />
          <circle cx="0" cy="-256" r="10" fill="none" stroke="url(#k-brass)" strokeWidth="5" />

          {/* Four decorative studs around the outer ring */}
          {[
            [0, -248],
            [55, -225],
            [-55, -225],
            [0, -92],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill="url(#k-brass)"
              stroke="#5a4416"
              strokeWidth="0.8"
            />
          ))}

          {/* ── UPPER COLLAR (bow → shaft) ────────────────────── */}
          <path
            d="M-30 -100 L30 -100 L22 -80 L-22 -80 Z"
            fill="url(#k-brass)"
            stroke="#5a4416"
            strokeWidth="1.5"
          />
          <rect x="-26" y="-78" width="52" height="8" fill="url(#k-brass-edge)" />

          {/* ── SHAFT ─────────────────────────────────────────── */}
          <path
            d="M-14 -70 L14 -70 L12 140 L-12 140 Z"
            fill="url(#k-brass)"
            stroke="#5a4416"
            strokeWidth="1.2"
          />
          {/* Engraved center line */}
          <line x1="0" y1="-60" x2="0" y2="130" stroke="#5a4416" strokeWidth="1.2" opacity="0.55" />
          {/* Two band collars on the shaft */}
          <rect x="-16" y="0" width="32" height="10" rx="2" fill="url(#k-brass-edge)" stroke="#5a4416" strokeWidth="1" />
          <rect x="-16" y="60" width="32" height="10" rx="2" fill="url(#k-brass-edge)" stroke="#5a4416" strokeWidth="1" />

          {/* Tiny bead at mid-shaft */}
          <circle cx="0" cy="35" r="5" fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1" />

          {/* ── LOWER COLLAR (shaft → bit) ────────────────────── */}
          <path d="M-18 140 L18 140 L22 156 L-22 156 Z" fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1.5" />

          {/* ── BIT (business end) ────────────────────────────── */}
          <rect x="-5" y="156" width="56" height="60" fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1.5" />
          {/* Decorative arch carved into the bit */}
          <path
            d="M 5 168 a 14 14 0 0 1 28 0"
            fill="none"
            stroke="#5a4416"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx="19" cy="186" r="4" fill="url(#k-enamel)" stroke="#5a4416" strokeWidth="1" />

          {/* Teeth pattern */}
          <g fill="url(#k-brass)" stroke="#5a4416" strokeWidth="1.2">
            <rect x="-5"  y="216" width="12" height="18" />
            <rect x="7"   y="216" width="10" height="28" />
            <rect x="17"  y="216" width="9"  height="14" />
            <rect x="26"  y="216" width="11" height="24" />
            <rect x="37"  y="216" width="9"  height="18" />
            <rect x="46"  y="216" width="5"  height="12" />
          </g>

          {/* Shine highlight on the bow */}
          <path
            d="M -60 -210 a 70 70 0 0 1 50 -30"
            fill="none"
            stroke="#fbecbf"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Shine highlight on the shaft */}
          <rect x="-10" y="-50" width="3" height="170" fill="#fbecbf" opacity="0.35" rx="1.5" />
        </svg>
      </div>

      {/* Sparkles orbiting the key */}
      <div className="absolute inset-0">
        {[
          [42, 22, 2, 0],   [72, 38, 1.5, 0.6], [18, 58, 2.2, 1.1],
          [85, 70, 1.8, 1.7], [12, 18, 1.3, 2.2], [55, 85, 2.1, 0.4],
          [32, 10, 1.4, 1.4], [92, 50, 1.6, 2.4], [8, 82, 1.8, 3.0],
          [65, 55, 1.2, 0.9],
        ].map(([x, y, r, delay], i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full bg-[#fbecbf] anim-flicker"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${r * 2}px`,
              height: `${r * 2}px`,
              boxShadow: "0 0 8px rgba(251,236,191,0.8), 0 0 16px rgba(217,131,58,0.5)",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
