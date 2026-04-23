"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  Apple,
  Music,
  Youtube,
  Mail,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { content } from "@/lib/content";
import { Footer } from "./footer";
import { Newsletter } from "./newsletter";

/**
 * The Insurance Town scroll journey.
 *
 * One object — a brass skeleton key — is the entire experience. Scroll drives
 * a 6-act continuous transformation:
 *
 *   ACT 1  0.00–0.18   Float       — Key centered, rotating, sky + stars + embers
 *   ACT 2  0.18–0.34   Locket      — Bow medallion splits, Heath's portrait inside
 *   ACT 3  0.34–0.54   Teeth Fire  — Bit teeth launch forward as episode tiles
 *   ACT 4  0.54–0.72   Main Street — Key tilts horizontal, becomes a neon street
 *   ACT 5  0.72–0.88   Envelope    — Everything folds into a posted letter
 *   ACT 6  0.88–1.00   Orbit       — Letter becomes a satellite around a planet
 */

const PHASE: Record<string, [number, number]> = {
  floatIn:   [0.00, 0.08],
  floatOut:  [0.14, 0.20],
  locketIn:  [0.18, 0.24],
  locketOut: [0.30, 0.36],
  teethIn:   [0.34, 0.42],
  teethOut:  [0.50, 0.56],
  streetIn:  [0.54, 0.62],
  streetOut: [0.68, 0.74],
  envelopeIn:  [0.72, 0.80],
  envelopeOut: [0.86, 0.90],
  orbitIn:  [0.88, 0.94],
};

export function HomeJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Subtle smoothing — not over-damped. Research says fast, tight easing.
  const p = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 260,
    mass: 0.35,
  });

  return (
    <>
      <section
        ref={ref}
        className="relative journey-track"
        aria-label="Insurance Town scroll journey"
      >
        {/* ── Sticky stage — everything visual happens here ───────── */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
          <SkyBackdrop progress={p} />
          <Starfield progress={p} />
          <Embers progress={p} />
          <BlurStage progress={p}>
            <KeyStage progress={p} />
            <TeethBurst progress={p} />
            <EpisodeConstellation progress={p} />
            <TownSkyline progress={p} />
            <OrbitPlanet progress={p} />
          </BlurStage>
          <HudFrame />
        </div>

        {/* ── Progress rail (left side) ──────────────────────── */}
        <ProgressRail progress={p} />

        {/* ── Scroll-linked text overlays, ONE per act ──────── */}
        <ActOneOverlay progress={p} />
        <ActTwoOverlay progress={p} />
        <ActThreeOverlay progress={p} />
        <ActFourOverlay progress={p} />
        <ActFiveOverlay progress={p} />
        <ActSixOverlay progress={p} />

        {/* ── Scroll cue (hero only, hidden on small screens where it overlaps CTAs) ───── */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.06], [1, 0]),
          }}
          className="pointer-events-none fixed bottom-6 inset-x-0 hidden md:flex justify-center z-30"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/60 anim-float">
            ↓ Step inside
          </div>
        </motion.div>
      </section>

      {/* ── Landing section after the scroll journey ─────────── */}
      <FinaleLanding />
    </>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  PROGRESS RAIL — left-side anchor showing where you are        ║
   ╚═════════════════════════════════════════════════════════════════╝ */
const ACTS = [
  { key: "hero",     label: "Welcome",      range: [0, 0.18] },
  { key: "mayor",    label: "The Mayor",    range: [0.18, 0.34] },
  { key: "episodes", label: "Episodes",     range: [0.34, 0.54] },
  { key: "town",     label: "Main Street",  range: [0.54, 0.72] },
  { key: "letter",   label: "The Letter",   range: [0.72, 0.88] },
  { key: "orbit",    label: "Broadcast",    range: [0.88, 1] },
];

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <nav
      aria-label="Journey progress"
      className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-4"
    >
      {ACTS.map((act, i) => (
        <RailDot key={act.key} index={i} act={act} progress={progress} />
      ))}
    </nav>
  );
}

function RailDot({
  index,
  act,
  progress,
}: {
  index: number;
  act: (typeof ACTS)[number];
  progress: MotionValue<number>;
}) {
  const [lo, hi] = act.range;
  const opacity = useTransform(progress, [lo - 0.04, lo, hi, hi + 0.04], [0.4, 1, 1, 0.4]);
  const scale   = useTransform(progress, [lo - 0.04, lo, hi, hi + 0.04], [1, 1.3, 1.3, 1]);
  const width   = useTransform(progress, [lo, hi], [6, 36]);
  return (
    <div className="flex items-center gap-3 group">
      <motion.span
        style={{ opacity, scale }}
        className="relative block h-[6px] rounded-full bg-brass"
      >
        <motion.span
          style={{ width }}
          className="block h-full rounded-full bg-brass"
        />
      </motion.span>
      <motion.span
        style={{ opacity }}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass"
      >
        <span className="text-parchment/50 mr-2">{String(index + 1).padStart(2, "0")}</span>
        {act.label}
      </motion.span>
    </div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  BLUR STAGE                                                      ║
   ║  Whip-pan motion blur spikes at each act boundary.               ║
   ║  Peaks of 14px blur at transitions — a "camera cut" stinger.     ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function BlurStage({
  progress: _progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  // The stage renders its children directly — no CSS blur filter. A global
  // blur on a transforming element produces a smeary streak on the falling
  // key instead of anything that reads as motion, so we let each element
  // handle its own transition punctuation (scale, opacity, color).
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {children}
    </div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  SKY BACKDROP                                                   ║
   ║  A full-bleed gradient that shifts hue per act.                 ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function SkyBackdrop({ progress }: { progress: MotionValue<number> }) {
  const bg = useTransform(
    progress,
    [0, 0.18, 0.36, 0.56, 0.74, 0.90, 1],
    [
      "radial-gradient(120% 80% at 50% 115%, rgba(217,131,58,.45) 0%, rgba(200,55,45,.18) 28%, rgba(43,28,58,0) 55%), linear-gradient(180deg, #0b1220 0%, #1a1530 35%, #3a1f2b 70%, #5a2a23 95%, #3a1a18 100%)",
      "radial-gradient(120% 90% at 50% 100%, rgba(217,131,58,.30), rgba(11,18,32,0) 55%), linear-gradient(180deg, #0b1220 0%, #23182c 45%, #331825 80%, #0b1220 100%)",
      "radial-gradient(120% 90% at 50% 90%, rgba(90,167,208,.18), transparent 55%), linear-gradient(180deg, #05071a 0%, #0f1430 55%, #0a0a24 100%)",
      "radial-gradient(120% 80% at 50% 115%, rgba(217,131,58,.48), rgba(200,55,45,.22) 30%, transparent 60%), linear-gradient(180deg, #0b0712 0%, #311a24 60%, #6a2a1f 100%)",
      "radial-gradient(80% 70% at 50% 45%, rgba(246,239,221,.2), transparent 65%), linear-gradient(180deg, #1a0e16 0%, #2a1418 60%, #0a0710 100%)",
      "radial-gradient(80% 80% at 50% 50%, rgba(90,167,208,.22), transparent 65%), linear-gradient(180deg, #000209 0%, #04081a 65%, #000209 100%)",
      "linear-gradient(180deg, #000 0%, #030612 60%, #000 100%)",
    ],
  );
  return (
    <motion.div
      style={{ background: bg }}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  STARFIELD                                                      ║
   ║  Parallax dots, intensifies as scene darkens.                   ║
   ╚═════════════════════════════════════════════════════════════════╝ */
const STARS = Array.from({ length: 110 }).map((_, i) => {
  const sx = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const sy = (Math.sin(i * 78.233)  * 12345.678)  % 1;
  return {
    x: Math.round(Math.abs(sx) * 10000) / 100,
    y: Math.round(Math.abs(sy) * 10000) / 100,
    r: Math.round((0.8 + Math.abs(Math.cos(i * 1.3)) * 1.8) * 100) / 100,
    d: Math.round(Math.abs(Math.sin(i * 2.1)) * 500) / 100,
  };
});

function Starfield({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.35, 0.9, 1], [0.6, 1, 1, 0.4]);
  const y = useTransform(progress, [0, 1], ["0%", "-30%"]);
  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity, y }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none starfield-svg"
    >
      <defs>
        <radialGradient id="j-star" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fbecbf" />
          <stop offset="100%" stopColor="#fbecbf" stopOpacity="0" />
        </radialGradient>
      </defs>
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r * 0.12}
          fill="url(#j-star)"
          className="anim-flicker star-dot"
          data-idx={i % 3}
          style={{ animationDelay: `${s.d % 5}s` }}
        />
      ))}
    </motion.svg>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  EMBERS                                                         ║
   ║  Warm particles drifting up, strongest in acts 1, 4.            ║
   ╚═════════════════════════════════════════════════════════════════╝ */
const EMBERS = Array.from({ length: 36 }).map((_, i) => {
  const seed = (Math.sin(i * 7.1) * 4321.1) % 1;
  return {
    left: Math.round(Math.abs(seed) * 100 * 100) / 100,
    size: Math.round((2 + Math.abs(Math.sin(i * 1.7)) * 4) * 100) / 100,
    dur: Math.round((9 + Math.abs(Math.cos(i * 0.8)) * 11) * 100) / 100,
    delay: Math.round(-Math.abs(Math.sin(i * 2.3)) * 18 * 100) / 100,
    hue:
      i % 4 === 0 ? "#ffd48a" : i % 4 === 1 ? "#ff9a4d" : i % 4 === 2 ? "#e85a4e" : "#f3dd9e",
  };
});

function Embers({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0, 0.1, 0.5, 0.6, 0.75, 1],
    [0.9, 1, 0.4, 0.7, 0.25, 0],
  );
  return (
    <motion.div
      style={{ opacity }}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {EMBERS.map((e, i) => (
        <span
          key={i}
          data-idx={i % 3}
          className="absolute bottom-[-10px] rounded-full anim-ember ember-dot"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: e.hue,
            boxShadow: `0 0 ${e.size * 4}px ${e.hue}`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  KEY STAGE — the hero object                                    ║
   ║  One giant SVG key, every part animated independently.          ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function KeyStage({ progress }: { progress: MotionValue<number> }) {
  /* --- Global key container transforms ----------------------------------- */
  const keyRotate = useTransform(
    progress,
    [0, 0.18, 0.34, 0.54, 0.72, 0.88, 1],
    [0,  0,     0,    -90,   -90,   0,    0],
  );
  const keyScale = useTransform(
    progress,
    [0, 0.18, 0.34, 0.54, 0.72, 0.88, 1],
    [1,  0.95,  0.82,  0.78,  0.65,  0.28,  0.18],
  );
  const keyY = useTransform(
    progress,
    [0, 0.18, 0.34, 0.54, 0.72, 0.88, 1],
    ["0%", "0%", "-4%", "0%", "2%", "-10%", "-14%"],
  );
  const keyX = useTransform(
    progress,
    [0, 0.34, 0.54, 0.72, 1],
    ["0%", "0%", "0%", "0%", "0%"],
  );
  /* Act 1 — idle Y spin accumulated over time. Framer can't do "spin forever"
     on a MotionValue cleanly; we add a CSS keyframe class for the base and
     overlay scroll-driven offsets.                                          */

  /* --- Medallion locket -------------------------------------------------- */
  // Red disc halves swing open horizontally during Act 2.
  const locketTop    = useTransform(progress, PHASE.locketIn, [0, -55]);
  const locketBottom = useTransform(progress, PHASE.locketIn, [0,  55]);
  const portraitOpacity = useTransform(
    progress,
    [PHASE.locketIn[1], 0.30],
    [0, 1],
  );
  const portraitScale = useTransform(progress, [PHASE.locketIn[0], 0.30], [0.6, 1]);

  /* --- Teeth — each launches forward + fades out on Act 3 -------------- */
  const toothX = (i: number) =>
    useTransform(
      progress,
      [PHASE.teethIn[0], PHASE.teethIn[0] + 0.04 + i * 0.015, PHASE.teethOut[0]],
      [0, 0, 180 + i * 30],
    );
  const toothY = (i: number) =>
    useTransform(
      progress,
      [PHASE.teethIn[0], PHASE.teethIn[0] + 0.05 + i * 0.02, PHASE.teethOut[0]],
      [0, 0, -40 - i * 10],
    );
  const toothOpacity = useTransform(
    progress,
    [PHASE.teethIn[0] - 0.02, PHASE.teethOut[0]],
    [1, 0],
  );
  /* Bit plate deforms into a street in Act 4. Width + height lerp. */
  const bitWidth  = useTransform(progress, [PHASE.streetIn[0], PHASE.streetIn[1]], [100, 280]);
  const bitHeight = useTransform(progress, [PHASE.streetIn[0], PHASE.streetIn[1]], [60, 12]);

  /* --- Envelope fold ----------------------------------------------------- */
  const envelopeOpacity = useTransform(
    progress,
    [PHASE.envelopeIn[0], PHASE.envelopeIn[1], PHASE.envelopeOut[0], PHASE.envelopeOut[1]],
    [0, 1, 1, 0],
  );
  const envelopeScale = useTransform(progress, [PHASE.envelopeIn[0], 0.82], [0.3, 1]);

  /* --- Global key opacity: low-opacity backdrop during hero,
     full opacity when it's the focus (Acts 2–4), fades out on Acts 5/6. --- */
  const keyOpacity = useTransform(
    progress,
    [0, 0.14, 0.18, 0.72, 0.80, 0.88, 1],
    [0.35, 0.45, 1, 1, 0.2, 0, 0],
  );

  // --- Idle spin driven by time (independent of scroll) ---
  // We use a CSS animation on an inner group so scroll transforms still compose.

  return (
    <motion.div
      style={{ opacity: keyOpacity, x: keyX, y: keyY, scale: keyScale, rotate: keyRotate }}
      className="absolute inset-0 grid place-items-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Back glow */}
      <motion.div
        style={{
          opacity: useTransform(progress, [0, 0.2, 0.5, 0.9], [0.9, 0.7, 0.4, 0]),
          background:
            "radial-gradient(closest-side, rgba(217,131,58,.55) 0%, rgba(200,55,45,.22) 40%, transparent 70%)",
          filter: "blur(14px)",
        }}
        className="absolute w-[58vmin] h-[58vmin] rounded-full anim-pulse-glow"
      />

      <div className="relative anim-key-spin" style={{ width: "52vmin", height: "52vmin" }}>
        <svg viewBox="-100 -260 200 520" className="w-full h-full drop-shadow-[0_40px_60px_rgba(200,55,45,0.4)]">
          <defs>
            <linearGradient id="hj-brass" x1="0" x2="0" y1="-260" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0"    stopColor="#fff3b8" />
              <stop offset="0.18" stopColor="#f6d97a" />
              <stop offset="0.42" stopColor="#ecc756" />
              <stop offset="0.6"  stopColor="#e8c14a" />
              <stop offset="0.82" stopColor="#b98f22" />
              <stop offset="1"    stopColor="#6d5414" />
            </linearGradient>
            <linearGradient id="hj-brass-edge" x1="-30" x2="30" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0"   stopColor="#6d5414" />
              <stop offset="0.3" stopColor="#b98f22" />
              <stop offset="0.5" stopColor="#f6d97a" />
              <stop offset="0.7" stopColor="#b98f22" />
              <stop offset="1"   stopColor="#6d5414" />
            </linearGradient>
            <radialGradient id="hj-enamel" cx="0" cy="0" r="1">
              <stop offset="0"   stopColor="#e85a4e" />
              <stop offset="0.6" stopColor="#c8372d" />
              <stop offset="1"   stopColor="#6a1a14" />
            </radialGradient>
            <clipPath id="hj-medallion-clip">
              <circle cx="0" cy="-170" r="18" />
            </clipPath>
            <clipPath id="hj-portrait-clip">
              <circle cx="0" cy="-170" r="30" />
            </clipPath>
          </defs>

          {/* ────────────── BOW ────────────── */}
          {/* Outer ring */}
          <circle cx="0" cy="-170" r="78" fill="url(#hj-brass)" stroke="url(#hj-brass-edge)" strokeWidth="4" />
          {/* Inner cutout ring */}
          <circle cx="0" cy="-170" r="40" fill="#0b1220" />
          <circle cx="0" cy="-170" r="40" fill="none" stroke="url(#hj-brass-edge)" strokeWidth="3" />
          {/* Cross spokes */}
          <g fill="url(#hj-brass)" stroke="#6d5414" strokeWidth="1.2">
            <path d="M-40 -170 h-38 a4 4 0 0 1 0 -8 h38 a4 4 0 0 1 0 8 z" />
            <path d="M 40 -170 h 38 a4 4 0 0 0 0 -8 h-38 a4 4 0 0 0 0 8 z" />
            <path d="M 0 -210 v-38 a4 4 0 0 0 -8 0 v38 a4 4 0 0 0 8 0 z" />
            <path d="M 0 -130 v 38 a4 4 0 0 0 -8 0 v-38 a4 4 0 0 0 8 0 z" />
          </g>
          {/* Top stud + hook */}
          <rect x="-6" y="-260" width="12" height="26" rx="3" fill="url(#hj-brass)" stroke="#6d5414" strokeWidth="1" />
          <circle cx="0" cy="-256" r="10" fill="none" stroke="url(#hj-brass)" strokeWidth="5" />

          {/* ── Real photo of Heath inside the medallion (revealed on Act 2) ── */}
          <motion.g
            style={{ opacity: portraitOpacity, scale: portraitScale, transformOrigin: "0 -170" }}
            clipPath="url(#hj-portrait-clip)"
          >
            {/* Deep enamel field behind photo */}
            <circle cx="0" cy="-170" r="30" fill="#1a1220" />
            {/* Heath photo — positioned so his face centers in the medallion */}
            <image
              href="/heath-headshot.jpg"
              x="-38"
              y="-210"
              width="76"
              height="76"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Soft inner vignette to blend photo into brass frame */}
            <circle
              cx="0"
              cy="-170"
              r="30"
              fill="none"
              stroke="rgba(26,18,32,0.85)"
              strokeWidth="4"
              opacity="0.35"
            />
            {/* Outer brass bezel */}
            <circle cx="0" cy="-170" r="30" fill="none" stroke="url(#hj-brass)" strokeWidth="3.5" />
            {/* "THE MAYOR" plate beneath */}
            <rect x="-22" y="-140" width="44" height="8" rx="1.5" fill="#1a1220" stroke="url(#hj-brass)" strokeWidth="0.5" />
            <text
              x="0"
              y="-134"
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="3.4"
              fill="url(#hj-brass)"
              style={{ letterSpacing: "0.32em" }}
            >
              THE MAYOR
            </text>
          </motion.g>

          {/* ── Medallion locket halves (close over portrait) ── */}
          <motion.g style={{ y: locketTop }}>
            <path
              d="M -22 -170 A 22 22 0 0 1 22 -170 L 22 -170 L -22 -170 Z"
              fill="url(#hj-enamel)"
              stroke="url(#hj-brass)"
              strokeWidth="2.5"
            />
          </motion.g>
          <motion.g style={{ y: locketBottom }}>
            <path
              d="M -22 -170 A 22 22 0 0 0 22 -170 L 22 -170 L -22 -170 Z"
              fill="url(#hj-enamel)"
              stroke="url(#hj-brass)"
              strokeWidth="2.5"
            />
          </motion.g>

          {/* ────────────── COLLAR ────────────── */}
          <path d="M-30 -100 L30 -100 L22 -80 L-22 -80 Z" fill="url(#hj-brass)" stroke="#6d5414" strokeWidth="1.5" />
          <rect x="-26" y="-78" width="52" height="8" fill="url(#hj-brass-edge)" />

          {/* ────────────── SHAFT ────────────── */}
          <path d="M-14 -70 L14 -70 L12 140 L-12 140 Z" fill="url(#hj-brass)" stroke="#6d5414" strokeWidth="1.2" />
          <line x1="0" y1="-60" x2="0" y2="130" stroke="#6d5414" strokeWidth="1.2" opacity="0.55" />
          <rect x="-16" y="0"  width="32" height="10" rx="2" fill="url(#hj-brass-edge)" stroke="#6d5414" strokeWidth="1" />
          <rect x="-16" y="60" width="32" height="10" rx="2" fill="url(#hj-brass-edge)" stroke="#6d5414" strokeWidth="1" />

          <path d="M-18 140 L18 140 L22 156 L-22 156 Z" fill="url(#hj-brass)" stroke="#6d5414" strokeWidth="1.5" />

          {/* ────────────── BIT PLATE (morphs in Act 4) ────────────── */}
          <motion.rect
            x="-5"
            y="156"
            style={{ width: bitWidth, height: bitHeight }}
            fill="url(#hj-brass)"
            stroke="#6d5414"
            strokeWidth="1.5"
          />

          {/* Arch carving on the bit */}
          <path
            d="M 5 168 a 14 14 0 0 1 28 0"
            fill="none"
            stroke="#6d5414"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx="19" cy="186" r="4" fill="url(#hj-enamel)" stroke="#6d5414" strokeWidth="1" />

          {/* ────────────── TEETH (launch in Act 3) ────────────── */}
          {[
            { x: -5,  y: 216, w: 12, h: 18 },
            { x: 7,   y: 216, w: 10, h: 28 },
            { x: 17,  y: 216, w: 9,  h: 14 },
            { x: 26,  y: 216, w: 11, h: 24 },
            { x: 37,  y: 216, w: 9,  h: 18 },
            { x: 46,  y: 216, w: 5,  h: 12 },
          ].map((t, i) => (
            <motion.rect
              key={i}
              x={t.x}
              y={t.y}
              width={t.w}
              height={t.h}
              fill="url(#hj-brass)"
              stroke="#6d5414"
              strokeWidth="1.2"
              style={{ x: toothX(i), y: toothY(i), opacity: toothOpacity }}
            />
          ))}

          {/* Shines */}
          <path d="M -60 -210 a 70 70 0 0 1 50 -30" fill="none" stroke="#fff3ca" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          <rect x="-10" y="-50" width="3" height="170" fill="#fff3ca" opacity="0.3" rx="1.5" />
        </svg>

        {/* ─────── ENVELOPE overlay (Act 5) ─────── */}
        <motion.div
          style={{ opacity: envelopeOpacity, scale: envelopeScale }}
          className="absolute inset-0 grid place-items-center"
        >
          <EnvelopeSVG />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  TEETH BURST — particle explosion during Act 3 teeth-fire      ║
   ╚═════════════════════════════════════════════════════════════════╝ */
const TEETH_SHRAPNEL = Array.from({ length: 38 }).map((_, i) => {
  const angle = (i / 38) * Math.PI * 2;
  const r = 120 + (Math.abs(Math.sin(i * 2.3)) * 240);
  return {
    angle: Math.round(angle * 1000) / 1000,
    r: Math.round(r * 100) / 100,
    size: Math.round((3 + Math.abs(Math.cos(i * 1.7)) * 5) * 100) / 100,
    delay: Math.round(((i % 6) * 0.015) * 1000) / 1000,
    hue: i % 3 === 0 ? "#f3dd9e" : i % 3 === 1 ? "#c9a24a" : "#d85448",
  };
});

function TeethBurst({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [PHASE.teethIn[0] - 0.02, PHASE.teethIn[1], PHASE.teethOut[0], PHASE.teethOut[1]],
    [0, 1, 0.6, 0],
  );
  const burstScale = useTransform(progress, [PHASE.teethIn[0], PHASE.teethOut[0]], [0.4, 1.6]);
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, scale: burstScale }}
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <svg viewBox="-400 -400 800 800" className="w-[90vmin] h-[90vmin]">
        {TEETH_SHRAPNEL.map((p, i) => {
          const cx = Math.cos(p.angle) * p.r;
          const cy = Math.sin(p.angle) * p.r;
          return (
            <circle
              key={i}
              cx={Math.round(cx * 100) / 100}
              cy={Math.round(cy * 100) / 100}
              r={p.size}
              fill={p.hue}
              opacity="0.9"
              style={{ filter: `drop-shadow(0 0 ${p.size * 2}px ${p.hue})` }}
            />
          );
        })}
        {/* Shockwave rings */}
        <circle cx="0" cy="0" r="200" fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.35" />
        <circle cx="0" cy="0" r="280" fill="none" stroke="#d85448" strokeWidth="1" opacity="0.28" />
        <circle cx="0" cy="0" r="360" fill="none" stroke="#f3dd9e" strokeWidth="1" opacity="0.18" />
      </svg>
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  EPISODE CONSTELLATION — 12 tiles materialize after teeth fire ║
   ╚═════════════════════════════════════════════════════════════════╝ */
// Episode NUMBERS only — titles are not hardcoded since we can't verify each.
// The numbers themselves are verifiable: Ep 329 is the latest per the handoff,
// and 318–329 are the twelve most recent by counting back.
const EP_TILES = [329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318].map((n) => ({ n }));
// Positions in a 4x3 grid, centered, with some jitter
const EP_POSITIONS = EP_TILES.map((_, i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const x = (col - 1.5) * 26;
  const y = (row - 1) * 18;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
});

function EpisodeConstellation({ progress }: { progress: MotionValue<number> }) {
  // Breakpoints MUST be strictly increasing for useTransform to interpolate correctly.
  const opacity = useTransform(
    progress,
    [0.44, 0.50, 0.54, 0.58],
    [0, 1, 1, 0],
  );
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <div className="relative w-full h-full">
        {EP_TILES.map((ep, i) => (
          <EpisodeTile
            key={ep.n}
            ep={ep}
            pos={EP_POSITIONS[i]}
            index={i}
            progress={progress}
          />
        ))}
      </div>
    </motion.div>
  );
}

function EpisodeTile({
  ep,
  pos,
  index,
  progress,
}: {
  ep: (typeof EP_TILES)[number];
  pos: { x: number; y: number };
  index: number;
  progress: MotionValue<number>;
}) {
  // Breakpoints must be strictly increasing.
  const base = 0.43 + 0.005 * index;
  const a = base;
  const b = base + 0.015;
  const c = base + 0.04;
  const scale   = useTransform(progress, [a, b, c], [0.4, 0.8, 1]);
  const opacity = useTransform(progress, [a, b, c], [0, 0.6, 1]);
  const rot     = useTransform(progress, [a, c], [index % 2 === 0 ? -12 : 12, 0]);
  return (
    <motion.div
      style={{
        left: `calc(50% + ${pos.x}vmin)`,
        top: `calc(50% + ${pos.y}vmin)`,
        x: "-50%",
        y: "-50%",
        opacity,
        scale,
        rotate: rot,
      }}
      className="absolute w-[22vmin] max-w-[180px] rounded-lg border border-brass/35 bg-ink/80 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] p-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-brass">
          Episode
        </span>
        <span className="grid place-items-center h-5 w-5 rounded-full bg-brass/20 text-brass">
          <Play className="h-[9px] w-[9px] fill-brass" strokeWidth={0} />
        </span>
      </div>
      <p className="mt-1 font-display text-3xl leading-none text-parchment">
        {String(ep.n).padStart(3, "0")}
      </p>
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  TOWN SKYLINE — appears on Act 4 Main Street                    ║
   ╚═════════════════════════════════════════════════════════════════╝ */
// Pre-computed at module load — deterministic on both server and client.
const SKYLINE_BUILDINGS = Array.from({ length: 22 }).map((_, i) => {
  const seed = Math.sin(i * 1.7) * 0.5 + 0.5;
  const h = Math.round((120 + seed * 140) * 100) / 100;
  const w = Math.round((60 + (1 - seed) * 20) * 100) / 100;
  return { x: i * 80, y: Math.round((360 - h) * 100) / 100, h, w };
});
const SKYLINE_WINDOWS = Array.from({ length: 60 }).map((_, i) => {
  const seed = Math.sin(i * 2.3) * 0.5 + 0.5;
  const x = (20 + i * 24) % 1580;
  const y = Math.round((200 + (1 - seed) * 140) * 100) / 100;
  return { x, y };
});

function TownSkyline({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [PHASE.streetIn[0], PHASE.streetIn[1], PHASE.streetOut[0], PHASE.streetOut[1]],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [PHASE.streetIn[0], PHASE.streetOut[1]], ["24%", "-6%"]);
  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 pointer-events-none"
    >
      <svg viewBox="0 0 1600 360" preserveAspectRatio="xMidYEnd meet" className="w-full h-auto">
        <defs>
          <linearGradient id="tr-bld" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1a0f20" />
            <stop offset="1" stopColor="#080410" />
          </linearGradient>
          <radialGradient id="tr-win" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd48a" />
            <stop offset="1" stopColor="#d9833a" />
          </radialGradient>
        </defs>
        <g fill="url(#tr-bld)">
          {SKYLINE_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" />
          ))}
        </g>
        <g fill="url(#tr-win)" opacity="0.85">
          {SKYLINE_WINDOWS.map((w, i) => (
            <rect key={i} x={w.x} y={w.y} width="4" height="6" rx="1" />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  ORBIT PLANET — Act 6 finale                                    ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function OrbitPlanet({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [0.84, 0.92, 1],
    [0, 1, 1],
  );
  const scale = useTransform(progress, [0.84, 1], [0.7, 1]);
  return (
    <motion.div
      style={{ opacity, scale }}
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center pointer-events-none"
    >
      <div className="relative" style={{ width: "46vmin", height: "46vmin" }}>
        {/* Planet */}
        <div
          className="absolute inset-[14%] rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #3a3050 0%, #110820 55%, #000 100%)",
            boxShadow:
              "inset -20px -30px 60px rgba(0,0,0,.8), 0 0 60px rgba(90,167,208,.35), 0 0 120px rgba(200,55,45,.15)",
          }}
        >
          {/* Continents (policy-form shaped blobs) */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <g fill="#c9a24a" opacity="0.55">
              <ellipse cx="60" cy="80" rx="22" ry="14" />
              <ellipse cx="130" cy="60" rx="18" ry="10" />
              <ellipse cx="110" cy="130" rx="26" ry="12" />
              <ellipse cx="45" cy="140" rx="14" ry="8" />
              <ellipse cx="160" cy="120" rx="12" ry="9" />
            </g>
            <g stroke="#5aa7d0" strokeWidth="0.4" fill="none" opacity="0.4">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="0" x2="200" y1={i * 25} y2={i * 25} />
              ))}
            </g>
          </svg>
        </div>

        {/* Orbit ring tilted — the envelope + the subscribe CTA share this path */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(201,162,74,0.85)",
            transform: "rotateX(72deg)",
            boxShadow: "0 0 24px rgba(201,162,74,0.65)",
          }}
        />

        {/* Inner dashed orbit (for the CTA to sit on) */}
        <div
          className="absolute inset-[8%] rounded-full"
          style={{
            border: "1px dashed rgba(243,221,158,0.55)",
            transform: "rotateX(72deg)",
          }}
        />

        {/* Satellite envelope spinning around */}
        <div
          className="absolute inset-0 anim-sat-orbit pointer-events-none"
          style={{ transformOrigin: "center" }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{ width: "36px", height: "26px" }}
          >
            <EnvelopeSVG small />
          </div>
        </div>

        {/* Orbit CTA dock — a button on the orbit path (6 o'clock). */}
        <a
          href="https://calendly.com/mayorheath/itp2024"
          target="_blank"
          rel="noreferrer"
          aria-label="Book the Mayor"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[-6%] group"
        >
          <span className="flex items-center gap-2 min-h-11 plaque rounded-full px-5 font-mono text-[10px] uppercase tracking-[0.25em] shadow-[0_12px_36px_-10px_rgba(201,162,74,0.7)] group-hover:scale-[1.04] transition-transform">
            <Play className="h-3 w-3 fill-ink" strokeWidth={0} />
            Book the Mayor
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full anim-pulse-glow"
            style={{
              boxShadow:
                "0 0 24px rgba(243,221,158,0.7), 0 0 48px rgba(243,221,158,0.35)",
            }}
          />
        </a>

        {/* Secondary CTA on orbit (12 o'clock direction, above planet) */}
        <Link
          href="/citizen"
          aria-label="Subscribe to the newsletter"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 -top-4 group"
        >
          <span className="flex items-center gap-2 min-h-11 rounded-full border border-brass/55 bg-ink/80 backdrop-blur px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass group-hover:bg-brass group-hover:text-ink transition-colors">
            <Mail className="h-3 w-3" />
            Subscribe
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  HUD FRAME — thin gold frame around the stage                   ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function HudFrame() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-4 border border-brass/30 pointer-events-none rounded-lg"
    >
      <span className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-brass-light" />
      <span className="absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-brass-light" />
      <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-brass-light" />
      <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-brass-light" />
      <span className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brass/80">
        INSURANCE&nbsp;TOWN · EST.&nbsp;2020
      </span>
      <span className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-brass/80">
        SCROLL&nbsp;TO&nbsp;ENTER
      </span>
    </div>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  ENVELOPE                                                       ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function EnvelopeSVG({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 200 140" className={small ? "w-full h-full" : "w-[48vmin] h-auto"}>
      <defs>
        <linearGradient id="env-paper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#faf2d8" />
          <stop offset="1" stopColor="#e7d9ad" />
        </linearGradient>
      </defs>
      <rect x="4" y="16" width="192" height="114" rx="10" fill="url(#env-paper)" stroke="#a6801f" strokeWidth="2" />
      <path d="M4 20 L100 88 L196 20" fill="none" stroke="#a6801f" strokeWidth="2" />
      <circle cx="100" cy="82" r="22" fill="#c8372d" stroke="#8f241c" strokeWidth="3" />
      <text
        x="100"
        y="87"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontSize="8"
        fill="#faf2d8"
        fontWeight="700"
        letterSpacing="1"
      >
        MAYOR'S POST
      </text>
    </svg>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  OVERLAY — Act 1: Hero                                          ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function ActOverlay({
  progress,
  range,
  children,
  align = "center",
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
  align?: "center" | "top" | "bottom";
}) {
  const opacity = useTransform(progress, [range[0], range[1], range[2], range[3]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[3]], [24, -24]);

  const alignClass =
    align === "top"
      ? "items-start pt-28 md:pt-32"
      : align === "bottom"
        ? "items-end pb-24 md:pb-28"
        : "items-center";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none fixed inset-0 z-20 flex ${alignClass} justify-center px-6`}
    >
      <div className="pointer-events-auto w-full max-w-5xl 2xl:max-w-[72rem] text-center">{children}</div>
    </motion.div>
  );
}

function ActOneOverlay({ progress }: { progress: MotionValue<number> }) {
  return (
    <ActOverlay progress={progress} range={[-0.02, 0.01, 0.14, 0.20]} align="center">
      {/* Dark scrim behind text for readability over the key */}
      <div className="relative mx-auto max-w-4xl">
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-6 rounded-[48px] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(10,6,18,0.75) 0%, rgba(10,6,18,0.25) 60%, transparent 100%)",
          }}
        />

        <div className="relative">
          <div className="ornament inline-flex">
            <span>The Insurance Town Podcast · Est. 2020</span>
          </div>
          <p className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl text-parchment/85 tracking-tight">
            Welcome to
          </p>
          <h1 className="mt-1 font-display brass-engraved text-[clamp(2rem,10vw,8rem)] leading-[0.88] tracking-tight">
            Insurance&nbsp;Town.
          </h1>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-brass">
            <span className="h-px w-12 bg-brass/50" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Where service meets success
            </span>
            <span className="h-px w-12 bg-brass/50" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-parchment/85 leading-relaxed">
            A weekly podcast where agents, carriers, founders, and customers
            actually talk about insurance like people — hosted by{" "}
            <span className="text-parchment font-medium">Heath Shearon</span>,
            the Mayor of Insurance Town.
          </p>

          {/* Proof strip */}
          <dl className="mt-7 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs font-mono uppercase tracking-[0.2em] text-parchment/75">
            <div className="flex items-center gap-2">
              <span className="brass-text text-lg font-display normal-case tracking-normal">329+</span>
              <span>episodes</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-brass/45" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="brass-text text-lg font-display normal-case tracking-normal">4.8 ★</span>
              <span>Apple rating</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-brass/45" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="brass-text text-lg font-display normal-case tracking-normal">20+</span>
              <span>years in insurance</span>
            </div>
          </dl>

          {/* Latest episode teaser */}
          <a
            href={content.latest_episode.apple}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-ink/35 px-4 py-2 backdrop-blur-md ring-1 ring-white/5 hover:ring-brass/40 hover:bg-ink/55 transition-all"
          >
            <span className="grid place-items-center h-7 w-7 rounded-full bg-brass text-ink">
              <Play className="h-3 w-3 fill-ink" strokeWidth={0} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              Latest · Ep {content.latest_episode.number}
            </span>
            <span className="text-sm text-parchment/85 group-hover:text-parchment line-clamp-1 max-w-[40ch]">
              {content.latest_episode.title}
            </span>
          </a>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://calendly.com/mayorheath/itp2024"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
            >
              <Play className="h-4 w-4" />
              Book the Mayor
            </a>
            <Link
              href="/podcast"
              className="btn-brass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              <Apple className="h-4 w-4" />
              All 329+ episodes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Trust strip — real platforms, real rating. No fabricated signals. */}
          <div className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/50">
              Heard weekly on
            </p>
            <ul
              role="list"
              className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-parchment/70"
            >
              <li>
                <a
                  href={content.latest_episode.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm hover:text-brass-light transition-colors"
                >
                  <Apple className="h-4 w-4" aria-hidden />
                  <span>Apple Podcasts</span>
                </a>
              </li>
              <li aria-hidden className="hidden sm:block h-1 w-1 rounded-full bg-parchment/25" />
              <li>
                <a
                  href={content.latest_episode.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm hover:text-brass-light transition-colors"
                >
                  <Music className="h-4 w-4" aria-hidden />
                  <span>Spotify</span>
                </a>
              </li>
              <li aria-hidden className="hidden sm:block h-1 w-1 rounded-full bg-parchment/25" />
              <li>
                <a
                  href={content.latest_episode.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm hover:text-brass-light transition-colors"
                >
                  <Youtube className="h-4 w-4" aria-hidden />
                  <span>YouTube</span>
                </a>
              </li>
              <li aria-hidden className="hidden sm:block h-1 w-1 rounded-full bg-parchment/25" />
              <li>
                <a
                  href={content.latest_episode.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm hover:text-brass-light transition-colors"
                >
                  <Star className="h-3.5 w-3.5 fill-brass text-brass" aria-hidden />
                  <span className="font-medium text-parchment/90">4.8</span>
                  <span className="text-parchment/55">on Apple</span>
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/45">
            ↓ Keep scrolling — the town opens up
          </p>
        </div>
      </div>
    </ActOverlay>
  );
}

function ActTwoOverlay({ progress }: { progress: MotionValue<number> }) {
  return (
    <ActOverlay progress={progress} range={[0.18, 0.22, 0.30, 0.34]} align="bottom">
      <div className="mx-auto max-w-3xl">
        <span className="ornament">The Mayor</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
          <span className="brass-engraved">Bringing heart back to insurance.</span>
        </h2>
        <p className="mt-4 text-parchment/80 text-base md:text-lg max-w-2xl mx-auto">
          20+ years in the industry. 329 episodes and counting. One stubborn
          belief Heath keeps coming back to: service always wins.
        </p>
        <dl className="mt-6 flex flex-wrap justify-center gap-3">
          {content.stats.map((s) => (
            <div key={s.label} className="plaque rounded-md px-4 py-2">
              <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/70">
                {s.label}
              </dt>
              <dd className="font-display text-xl text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ActOverlay>
  );
}

function ActThreeOverlay({ progress }: { progress: MotionValue<number> }) {
  return (
    <ActOverlay progress={progress} range={[0.34, 0.38, 0.48, 0.54]} align="top">
      <span className="ornament">On the air</span>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
        <span className="brass-engraved">329 episodes. One town.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-parchment/75">
        Every episode is a real conversation with someone actually doing the
        work — agents, carriers, founders, and the folks they serve.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={content.latest_episode.apple}
          target="_blank"
          rel="noreferrer"
          className="btn-brass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
        >
          <Apple className="h-4 w-4" /> Apple
        </a>
        <a
          href={content.latest_episode.spotify}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] text-black px-5 py-3 text-sm font-medium"
        >
          <Music className="h-4 w-4" /> Spotify
        </a>
        <a
          href={content.latest_episode.youtube}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white px-5 py-3 text-sm font-medium"
        >
          <Youtube className="h-4 w-4" /> YouTube
        </a>
        <Link
          href="/podcast"
          className="inline-flex items-center gap-2 rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
        >
          The archive <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </ActOverlay>
  );
}

function ActFourOverlay({ progress }: { progress: MotionValue<number> }) {
  const services = content.services.slice(0, 6);
  return (
    <ActOverlay progress={progress} range={[0.54, 0.58, 0.66, 0.72]} align="top">
      <span className="ornament">Main Street · Insurance Town</span>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl">
        Six doors. One Mayor.
      </h2>
      <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
        {services.map((s) => {
          const external =
            s.href.startsWith("http") || s.href.startsWith("mailto:");
          const card = (
            <div className="group card-storefront rounded-xl p-4 h-full flex items-start justify-between gap-3 transition-all hover:-translate-y-0.5">
              <div>
                <p className="font-display text-lg leading-tight">{s.title}</p>
                <p className="mt-1 text-[12px] text-parchment/65 leading-snug">
                  {s.blurb}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-brass/70 group-hover:text-brass shrink-0" />
            </div>
          );
          return (
            <li key={s.title}>
              {external ? (
                <a href={s.href} target="_blank" rel="noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                <Link href={s.href} className="block h-full">
                  {card}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </ActOverlay>
  );
}

function ActFiveOverlay({ progress }: { progress: MotionValue<number> }) {
  return (
    <ActOverlay progress={progress} range={[0.72, 0.76, 0.84, 0.88]} align="top">
      <span className="ornament">Become a Citizen</span>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl">
        A quick email from Heath.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-parchment/78">
        Only when there's something good to share. No spam, no fluff.
      </p>
      <Link
        href="/citizen"
        className="mt-8 btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
      >
        <Mail className="h-4 w-4" />
        Sign me up
        <ArrowRight className="h-4 w-4" />
      </Link>
    </ActOverlay>
  );
}

function ActSixOverlay({ progress }: { progress: MotionValue<number> }) {
  return (
    <ActOverlay progress={progress} range={[0.88, 0.92, 0.98, 1]} align="top">
      <span className="ornament">Broadcast anywhere · Citizens in 50 states</span>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl">
        <span className="brass-engraved">Insurance Town goes with you.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-parchment/75">
        From agency kitchens in Kansas to boardrooms in New York — wherever
        there's an insurance pro who wants to serve better.
      </p>
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-brass/80 anim-float">
        ↓ Land the shuttle
      </p>
    </ActOverlay>
  );
}

/* ╔═════════════════════════════════════════════════════════════════╗
   ║  FINALE LANDING — the payoff after the scroll journey.         ║
   ║  Real CTAs, real form, real links. No more empty space.        ║
   ╚═════════════════════════════════════════════════════════════════╝ */
function FinaleLanding() {
  return (
    <>
      <section
        className="relative py-28 md:py-36 border-t border-brass/20 overflow-hidden"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(217,131,58,0.18), transparent 70%), linear-gradient(180deg, #0b0712 0%, #120028 60%, #0b0712 100%)",
        }}
      >
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative mx-auto max-w-6xl 2xl:max-w-[80rem] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="ornament">Now what?</span>
            <h2 className="mt-5 font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.98]">
              <span className="brass-engraved">Pick a door.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-parchment/78 text-base md:text-lg">
              You've seen the whole town. Here are the four ways citizens
              actually walk through it.
            </p>
          </div>

          {/* Four huge CTAs */}
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            <FinaleCard
              eyebrow="Book the Mayor"
              title="A private call with Heath."
              blurb="Consulting, stage bookings, or a straight-up 'help me figure this out' session. Heath runs these personally — no sales team."
              href="https://calendly.com/mayorheath/itp2024"
              cta="Check his calendar"
              external
              accent="red"
            />
            <FinaleCard
              eyebrow="Listen to the show"
              title="329+ episodes. Weekly."
              blurb="Independent agents, carriers, and founders telling the stories the trade press won't. Pick any platform."
              href="/podcast"
              cta="Open the archive"
              accent="brass"
            />
            <FinaleCard
              eyebrow="Sponsor"
              title="Be in the mix."
              blurb="Get your brand in front of the folks who actually run agencies — and who trust what Heath puts on the show."
              href="/sponsor"
              cta="Start a conversation"
              accent="brass"
            />
            <FinaleCard
              eyebrow="Become a Citizen"
              title="A quick email, no spam."
              blurb="Heath sends these himself — new episodes, upcoming stages, and the odd note from the road. Only when there's something good to say."
              href="/citizen"
              cta="Subscribe"
              accent="red"
            />
          </div>

          {/* Inline newsletter below the cards */}
          <div className="mt-14">
            <Newsletter />
          </div>

          {/* Quick social proof strip */}
          <div className="mt-20 grid md:grid-cols-3 gap-4">
            {content.stats.map((s) => (
              <div key={s.label} className="plaque rounded-xl p-5 text-center">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-3xl text-ink">{s.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function FinaleCard({
  eyebrow,
  title,
  blurb,
  href,
  cta,
  external,
  accent,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  href: string;
  cta: string;
  external?: boolean;
  accent: "red" | "brass";
}) {
  const inner = (
    <article className="relative overflow-hidden rounded-2xl border border-brass/25 bg-gradient-to-b from-[rgba(246,239,221,0.04)] to-[rgba(246,239,221,0.01)] p-7 md:p-8 h-full min-h-[260px] flex flex-col transition-all group-hover:-translate-y-1 group-hover:border-brass/55">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            accent === "red"
              ? "radial-gradient(closest-side, rgba(200,55,45,0.55), transparent 70%)"
              : "radial-gradient(closest-side, rgba(217,131,58,0.5), transparent 70%)",
        }}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brass">
        {eyebrow}
      </p>
      <h3 className="mt-4 font-display text-3xl md:text-[2rem] leading-tight text-parchment">
        {title}
      </h3>
      <p className="mt-3 text-[15px] text-parchment/72 leading-relaxed flex-1">
        {blurb}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-brass/15 pt-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
          {cta}
        </span>
        <span className="grid place-items-center h-9 w-9 rounded-full border border-brass/30 text-brass/80 group-hover:text-ink group-hover:bg-brass group-hover:border-brass transition-all">
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className="group block">
      {inner}
    </a>
  ) : (
    <Link href={href} className="group block">
      {inner}
    </Link>
  );
}
