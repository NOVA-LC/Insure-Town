import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Megaphone } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsor — Insurance Town",
  description:
    "Sponsor the Insurance Town Podcast. Reach serious insurance pros who listen every week.",
};

export default function SponsorPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="Sponsorship"
        title="Get your brand in front"
        accent="of our people."
        description="Every week, agency owners, producers, and carrier folks show up for this show — and they trust what Heath puts in front of them. If your product helps them do the job better, let's talk."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:Heath@insurancetownpodcast.com?subject=Sponsor%20inquiry"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
          >
            Email Heath
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://calendly.com/mayorheath/itp2024"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
          >
            Book a sponsor call
          </a>
        </div>
      </PageHeader>

      {/* Proof strip — all three numbers come straight from the source doc. */}
      <section className="relative py-14 border-b border-brass/15">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {content.stats.map((s) => (
            <div key={s.label} className="plaque rounded-xl p-5 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                {s.label}
              </div>
              <div className="mt-2 font-display text-3xl text-ink">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet-the-host banner */}
      <section className="relative border-b border-brass/15 overflow-hidden">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div
            className="relative rounded-2xl overflow-hidden p-[2px]"
            style={{
              background:
                "linear-gradient(135deg, #f4d07a 0%, #d4a84b 45%, #8a6a1a 100%)",
            }}
          >
            <div className="relative rounded-[14px] overflow-hidden bg-ink">
              <Image
                src="/heath-banner.png"
                alt="Heath Shearon — host of the Insurance Town Podcast"
                width={2500}
                height={500}
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro copy + single CTA. No invented package tiers. */}
      <section className="relative py-20 md:py-28 border-b border-brass/15">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="ornament">Who's listening</span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl">
            Agency owners, producers, and carrier folks — the people actually making the calls.
          </h2>
          <p className="mt-6 text-parchment/75 leading-relaxed">
            Insurance Town runs on real conversations with real operators, and
            Heath's audience shows up every week because he's one of them.
            If your product helps them serve better or sell smarter, Heath
            will build you a host-read that sounds like the rest of the show —
            not a bolt-on ad.
          </p>
          <p className="mt-5 text-parchment/75 leading-relaxed">
            Spot counts, cadence, and pricing get worked out on a quick call.
            Easiest move: send a short email about what you're selling and
            who you're trying to reach.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:Heath@insurancetownpodcast.com?subject=Sponsor%20inquiry"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
            >
              <Megaphone className="h-4 w-4" />
              Email Heath
            </a>
            <a
              href="https://calendly.com/mayorheath/itp2024"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
            >
              Or book a call
            </a>
          </div>
        </div>
      </section>

      {/* Current sponsors — reads from content.assets.sponsor_logos */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="ornament">Proudly supported by</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">
                The current sponsor bench.
              </h2>
            </div>
            <a
              href="mailto:Heath@insurancetownpodcast.com"
              className="text-sm text-parchment/70 hover:text-brass-light underline-offset-4 hover:underline"
            >
              Become a sponsor →
            </a>
          </div>
          {content.assets.sponsor_logos.length === 0 ? (
            <div className="card-storefront rounded-2xl p-8 text-center">
              <p className="text-parchment/70">
                Sponsor logos live in{" "}
                <code className="font-mono text-brass">
                  content.assets.sponsor_logos
                </code>
                . Drop in URLs and this grid fills itself.
              </p>
            </div>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            >
              {content.assets.sponsor_logos.map((src, i) => (
                <li
                  key={i}
                  className="card-storefront rounded-xl aspect-[3/2] grid place-items-center p-4"
                >
                  <Image
                    src={src}
                    alt={`Sponsor ${i + 1}`}
                    width={200}
                    height={100}
                    unoptimized
                    className="max-h-full w-auto object-contain"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
