"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Headphones, Mic, ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { TownSilhouette } from "./town-silhouette";
import { HeroKey } from "./hero-key";

/**
 * Deterministic ember seeds so server & client match.
 */
const EMBERS = Array.from({ length: 28 }).map((_, i) => {
  const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const left = Math.abs(seed) * 100;
  const size = 2 + (Math.abs(Math.sin(i * 1.3)) * 3);
  const duration = 10 + Math.abs(Math.cos(i * 0.7)) * 10;
  const delay = -Math.abs(Math.sin(i * 2.1)) * 14;
  const hue = i % 4 === 0 ? "#ffd48a" : i % 4 === 1 ? "#ff9a4d" : i % 4 === 2 ? "#e85a4e" : "#f3dd9e";
  return {
    left: Math.round(left * 100) / 100,
    size: Math.round(size * 100) / 100,
    duration: Math.round(duration * 100) / 100,
    delay: Math.round(delay * 100) / 100,
    hue,
  };
});

export function Hero() {
  const { scrollYProgress } = useScroll();
  const townY = useTransform(scrollYProgress, [0, 0.22], [0, 80]);
  const keyY = useTransform(scrollYProgress, [0, 0.22], [0, -140]);
  const keyScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.15]);
  const keyRot = useTransform(scrollYProgress, [0, 0.5], [0, 18]);
  const skyY = useTransform(scrollYProgress, [0, 0.22], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden sky-dawn min-h-[900px] md:min-h-[100vh]"
    >
      {/* Gold frame border with corner ornaments */}
      <div className="hero-frame">
        <span aria-hidden="true" />
      </div>

      {/* Parallax starfield */}
      <motion.div
        style={{ y: skyY }}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[65vh] pointer-events-none"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1600 700"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="heroStar" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f6efdd" />
              <stop offset="100%" stopColor="#f6efdd" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[
            [80, 70, 1.4], [220, 120, 1.8], [340, 60, 1.2], [520, 90, 1.5],
            [680, 40, 2], [820, 110, 1.3], [960, 70, 1.6], [1090, 130, 1.4],
            [1250, 60, 1.3], [1420, 100, 1.7], [1540, 50, 1.2],
            [160, 210, 1.3], [450, 240, 1.7], [720, 260, 1.4], [900, 220, 1.5],
            [1100, 280, 1.4], [1300, 210, 1.3], [1480, 260, 1.5],
            [60, 340, 1.2], [380, 370, 1.1], [620, 350, 1.3], [1050, 390, 1.3],
            [1350, 360, 1.4], [1550, 400, 1.2],
          ].map(([x, y, r], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="url(#heroStar)"
              className="anim-flicker"
              style={{ animationDelay: `${(i * 0.2) % 5}s` }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* The Brass Key — scroll-driven upward motion + slight rotation */}
      <motion.div
        style={{
          y: keyY,
          scale: keyScale,
          rotate: keyRot,
        }}
        className="absolute inset-x-0 top-[4vh] md:top-[2vh] h-[78vh] md:h-[86vh] opacity-[0.98]"
      >
        <HeroKey />
      </motion.div>

      {/* Amber town-glow */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] town-glow pointer-events-none z-[2]" />

      {/* Embers rising from the town */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[70vh] pointer-events-none z-[3] overflow-hidden"
      >
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-[-10px] rounded-full anim-ember"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              background: e.hue,
              boxShadow: `0 0 ${e.size * 4}px ${e.hue}`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Town silhouette — parallax */}
      <motion.div
        style={{ y: townY }}
        className="absolute inset-x-0 bottom-0 pointer-events-none z-[4]"
      >
        <TownSilhouette className="w-full h-auto" />
      </motion.div>

      {/* Content — fades out as you scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 md:pt-44 pb-52 md:pb-56 text-center"
      >
        <div
          className="ornament inline-flex anim-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <Mic className="h-3.5 w-3.5" />
          <span>Est. 2020 · {content.stats[0].value} episodes</span>
        </div>

        <p
          className="mt-6 font-script text-3xl sm:text-4xl md:text-5xl text-parchment/90 italic anim-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Welcome to
        </p>

        <h1
          className="mt-1 font-display brass-engraved text-[clamp(2.75rem,9.5vw,8.5rem)] leading-[0.88] tracking-tight anim-text-reveal"
          style={{ animationDelay: "0.25s" }}
        >
          Insurance Town.
        </h1>

        <div
          className="mx-auto mt-7 flex items-center justify-center gap-3 text-brass anim-fade-up"
          style={{ animationDelay: "0.55s" }}
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-brass/60" />
          <span className="text-base">◆</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
            Where service meets success
          </span>
          <span className="text-base">◆</span>
          <span className="h-px w-12 bg-brass/60" />
        </div>

        <p
          className="mx-auto mt-6 max-w-xl text-base md:text-lg text-parchment/80 leading-relaxed anim-fade-up"
          style={{ animationDelay: "0.65s" }}
        >
          Weekly conversations, keynotes, and consulting from{" "}
          <span className="text-parchment">Heath Shearon</span>, the Mayor.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 anim-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="https://calendly.com/mayorheath/itp2024"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
          >
            <Play className="h-4 w-4" />
            Listen to the show
          </a>
          <Link
            href="/podcast"
            className="btn-brass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
          >
            <Headphones className="h-4 w-4" />
            All episodes
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/60 anim-float">
          ↓ Step inside
        </div>
      </div>
    </section>
  );
}
