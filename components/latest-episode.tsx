"use client";

import Image from "next/image";
import { Apple, Music, Youtube, Radio } from "lucide-react";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/utils";

// Pre-compute bar heights at module load — deterministic on both server and client
const WAVE_BARS = Array.from({ length: 56 }).map((_, i) => {
  const seed1 = Math.sin(i * 1.7) * 0.5 + 0.5;
  const seed2 = Math.sin(i * 0.4 + 3) * 0.5 + 0.5;
  const h = 16 + seed1 * 0.6 * 70 + seed2 * 0.4 * 40;
  const opacity = 0.45 + seed1 * 0.55;
  const hue = i % 3 === 0 ? "#e3c27a" : i % 3 === 1 ? "#c9a24a" : "#d85448";
  return {
    height: Math.round(h * 100) / 100,
    opacity: Math.round(opacity * 100) / 100,
    hue,
    delay: Math.round(seed2 * 180) / 100,
  };
});

export function LatestEpisode() {
  const e = content.latest_episode;

  return (
    <section
      className="relative py-28 md:py-36 border-t border-brass/15 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(200,55,45,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="ornament">Now Playing</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              Fresh off{" "}
              <span className="font-script italic text-brass-light font-normal">
                the mayor's desk.
              </span>
            </h2>
          </div>
          <a
            href="#episodes"
            className="text-sm text-parchment/70 hover:text-brass-light underline-offset-4 hover:underline"
          >
            Browse all episodes →
          </a>
        </div>

        {/* Ticket-stub card */}
        <article className="relative overflow-visible anim-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Drop shadow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-y-4 blur-2xl opacity-50 rounded-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(200,55,45,0.25), rgba(201,162,74,0.25))",
            }}
          />

          <div className="relative grid md:grid-cols-[360px_1fr] rounded-3xl border border-brass/30 bg-[linear-gradient(180deg,#15182a_0%,#0c0f1c_100%)] shadow-deep overflow-hidden">
            {/* Perforation / ticket divider */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-[360px] top-0 bottom-0 w-px"
              style={{
                background:
                  "repeating-linear-gradient(180deg, rgba(201,162,74,0.65) 0 10px, transparent 10px 20px)",
              }}
            />
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-[360px] -translate-x-1/2 top-[-14px] h-7 w-7 rounded-full bg-ink border border-brass/30"
            />
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-[360px] -translate-x-1/2 bottom-[-14px] h-7 w-7 rounded-full bg-ink border border-brass/30"
            />

            {/* Cover art w/ frame */}
            <div className="relative p-4">
              <div
                className="rounded-2xl p-[3px]"
                style={{
                  background:
                    "linear-gradient(135deg, #f3dd9e 0%, #c9a24a 50%, #5a4416 100%)",
                }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src={content.assets.cover_art}
                    alt={`Cover art for episode ${e.number}`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 plaque rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                    Ep {e.number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Stub content */}
            <div className="relative p-6 md:p-10 flex flex-col">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                <Radio className="h-3.5 w-3.5" />
                <span>On the air · {formatDate(e.date)}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.15]">
                {e.title}
              </h3>

              <div className="mt-7" aria-hidden="true">
                <SoundWave />
              </div>

              <div className="mt-auto pt-8 flex flex-wrap gap-2.5">
                <a
                  href={e.apple}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"
                >
                  <Apple className="h-4 w-4" />
                  Apple Podcasts
                </a>
                <a
                  href={e.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] text-black px-4 py-2.5 text-sm font-medium hover:brightness-110 shadow-[0_10px_24px_-10px_rgba(29,185,84,0.6)]"
                >
                  <Music className="h-4 w-4" />
                  Spotify
                </a>
                <a
                  href={e.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white px-4 py-2.5 text-sm font-medium hover:brightness-110 shadow-[0_10px_24px_-10px_rgba(255,0,0,0.5)]"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function SoundWave() {
  return (
    <div className="flex items-end gap-[3px] h-20">
      {WAVE_BARS.map((b, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full origin-bottom anim-wave"
          style={{
            background: `linear-gradient(180deg, ${b.hue}, ${b.hue}aa)`,
            height: `${b.height}%`,
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
