import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { content } from "@/lib/content";
import { TownSilhouette } from "./town-silhouette";
import {
  AppleBadge,
  SpotifyBadge,
  YouTubeBadge,
} from "./platform-badges";

/**
 * Face-forward home hero.
 *
 * Replaces the 760vh scroll journey as the home page's primary entry.
 * Follows the dominant pattern from SmartLess / Huberman / Armchair:
 * host face + logo combo, short bio preview, Listen primary CTA,
 * minimal secondary actions, trust strip. Main Street dusk backdrop,
 * not cosmos.
 */
export function HomeHero() {
  const latest = content.latest_episode;

  return (
    <section className="relative isolate overflow-hidden sky-dawn pt-36 md:pt-40 pb-16 md:pb-24 border-b border-brass/15">
      {/* Grain texture over the sky */}
      <div aria-hidden="true" className="absolute inset-0 grain pointer-events-none" />

      {/* Scattered stars (a few — NOT a galaxy) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {[
          { x: 12, y: 18, s: 2 },
          { x: 28, y: 9, s: 1 },
          { x: 46, y: 14, s: 2 },
          { x: 61, y: 7, s: 1 },
          { x: 78, y: 16, s: 2 },
          { x: 90, y: 11, s: 1 },
          { x: 7, y: 32, s: 1 },
          { x: 94, y: 28, s: 1 },
        ].map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-parchment anim-flicker"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.s,
              height: star.s,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Town silhouette at bottom — the Main Street anchor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none opacity-95 z-[1]"
      >
        <TownSilhouette className="w-full h-auto" />
      </div>

      {/* Lamp-glow haze along horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[35vh] pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(244,184,96,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT — copy, CTAs, trust strip */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="ornament">The Insurance Town Podcast</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight brass-engraved">
              Step inside
              <br />
              Insurance Town.
            </h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-parchment/85 leading-relaxed">
              {content.bio_preview}
            </p>

            {/* Primary + secondary platform CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AppleBadge href={latest.apple} size="lg" />
              <SpotifyBadge href={latest.spotify} />
              <YouTubeBadge href={latest.youtube} />
            </div>

            {/* Tertiary — speaking + full archive */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-parchment/75">
              <Link
                href="/podcast"
                className="inline-flex items-center gap-1.5 hover:text-parchment transition-colors"
              >
                All 329+ episodes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span aria-hidden className="h-1 w-1 rounded-full bg-parchment/25" />
              <Link
                href="/speaking"
                className="inline-flex items-center gap-1.5 hover:text-parchment transition-colors"
              >
                Book Heath to speak <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Trust strip — stats appear ONCE on the home page, right here */}
            <div className="mt-10 pt-6 border-t border-brass/20 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/75">
              <span className="inline-flex items-center gap-2">
                <span className="font-display text-xl tracking-normal text-parchment">329+</span>
                episodes
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-parchment/30" />
              <span className="inline-flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-lamp text-lamp" aria-hidden />
                <span className="font-display text-xl tracking-normal text-parchment">4.8</span>
                on Apple
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-parchment/30" />
              <span className="inline-flex items-center gap-2">
                <span className="font-display text-xl tracking-normal text-parchment">20+</span>
                years in insurance
              </span>
            </div>
          </div>

          {/* RIGHT — Heath's real portrait, dominant */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className="relative rounded-3xl p-[3px] max-w-md mx-auto lg:ml-auto lg:mr-0"
              style={{
                background:
                  "linear-gradient(135deg, #f4d07a 0%, #d4a84b 45%, #8a6a1a 100%)",
              }}
            >
              <div className="photo-editorial relative rounded-[22px] overflow-hidden bg-ink aspect-[4/5]">
                <Image
                  src="/heath-headshot.jpg"
                  alt="Heath Shearon — host of the Insurance Town Podcast"
                  fill
                  sizes="(max-width: 1024px) 85vw, 420px"
                  className="object-cover"
                  style={{ objectPosition: "60% 25%" }}
                  priority
                />
                {/* Soft bottom fade for caption legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lamp">
                      Your host
                    </p>
                    <p className="font-display text-xl text-parchment mt-1">
                      Heath Shearon
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-parchment/60 mt-0.5">
                      the Mayor of Insurance Town
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
