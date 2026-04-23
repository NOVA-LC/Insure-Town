"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/content";

export function MeetTheMayor() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const hasHeadshot =
    !!content.assets.headshot &&
    !content.assets.headshot.startsWith("TODO_PASTE");

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 border-t border-brass/15 overflow-hidden"
    >
      {/* Warm spotlight */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,131,58,0.3), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-20 h-[36rem] w-[36rem] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(200,55,45,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* ── Portrait ────────────────────────────────────────── */}
        <motion.div
          style={{ rotate, y }}
          className="lg:col-span-5 relative mx-auto max-w-sm"
        >
          {/* Back glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(201,162,74,0.35), transparent)",
            }}
          />
          {/* Outer brass frame */}
          <div
            className="relative rounded-3xl p-[3px]"
            style={{
              background:
                "linear-gradient(135deg, #f3dd9e 0%, #c9a24a 45%, #5a4416 100%)",
            }}
          >
            {/* Inner frame */}
            <div
              className="rounded-[20px] p-3"
              style={{
                background:
                  "linear-gradient(180deg, #1a1410 0%, #0b1220 100%)",
              }}
            >
              {/* Corner nail-heads */}
              {[
                "top-2 left-2",
                "top-2 right-2",
                "bottom-2 left-2",
                "bottom-2 right-2",
              ].map((pos, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`absolute ${pos} h-2 w-2 rounded-full bg-brass shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]`}
                />
              ))}
              {/* Portrait */}
              <div className="rounded-xl overflow-hidden bg-ink aspect-[4/5]">
                {hasHeadshot ? (
                  <Image
                    src={content.assets.headshot}
                    alt="Heath Shearon, host of the Insurance Town Podcast"
                    width={640}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-[radial-gradient(closest-side,rgba(217,131,58,0.25),rgba(11,18,32,0.8))] text-center p-6">
                    <div>
                      <div className="font-display text-[9rem] leading-none brass-engraved">
                        H
                      </div>
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-parchment/50">
                        {/* TODO: set content.assets.headshot */}
                        Portrait coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Brass nameplate */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 plaque rounded-md px-5 py-1.5 text-sm font-display whitespace-nowrap">
              Heath Shearon · The Mayor
            </div>
          </div>
        </motion.div>

        {/* ── Bio + stats ─────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <span className="ornament">Meet the Mayor</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02]">
            Bringing{" "}
            <span className="font-script italic text-brass-light font-normal">
              heart
            </span>{" "}
            <span className="brass-engraved">back to insurance.</span>
          </h2>

          <p className="drop-cap mt-8 text-base md:text-lg text-parchment/78 leading-[1.75] max-w-2xl">
            {content.bio}
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="relative rounded-xl p-5 text-center plaque"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-3xl md:text-4xl text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://calendly.com/mayorheath/itp2024"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center rounded-full px-5 py-3 text-sm font-medium"
            >
              Book a conversation
            </a>
            <a
              href="mailto:Heath@insurancetownpodcast.com"
              className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
            >
              Email Heath
            </a>
          </div>
        </div>
      </div>

      {/* Ticker tape */}
      <div className="relative mt-20 border-y border-brass/20 bg-ink/50">
        <div className="marquee-mask overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap py-5 font-mono text-[11px] uppercase tracking-[0.3em] text-parchment/60 animate-[mayorMarquee_45s_linear_infinite]">
            {[
              "Serving since 2020",
              "329+ episodes",
              "Service always wins",
              "Mayor of Insurance Town",
              "Weekly conversations",
              "Keynotes & training",
            ]
              .concat([
                "Serving since 2020",
                "329+ episodes",
                "Service always wins",
                "Mayor of Insurance Town",
                "Weekly conversations",
                "Keynotes & training",
              ])
              .map((t, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span>{t}</span>
                  <span aria-hidden className="text-brass">◆</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes mayorMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
