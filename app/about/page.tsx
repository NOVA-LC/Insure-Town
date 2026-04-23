import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Insurance Town",
  description:
    "Heath Shearon — over 20 years in insurance, now host of the Insurance Town Podcast.",
};

export default function AboutPage() {
  const hasHeadshot =
    !!content.assets.headshot &&
    !content.assets.headshot.startsWith("TODO_PASTE");

  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="The Host"
        title="Meet"
        accent="Heath Shearon."
      />

      <section className="relative py-20 md:py-28 border-b border-brass/15">
        <div className="mx-auto max-w-6xl 2xl:max-w-[80rem] px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div
              className="relative rounded-3xl p-[3px]"
              style={{
                background:
                  "linear-gradient(135deg, #f6d97a 0%, #e8c14a 45%, #9e7b1c 100%)",
              }}
            >
              <div className="relative rounded-[22px] p-3 bg-ink">
                <div className="rounded-xl overflow-hidden aspect-[4/5] bg-ink">
                  {hasHeadshot ? (
                    <Image
                      src={content.assets.headshot}
                      alt="Heath Shearon"
                      width={640}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 480px"
                      priority
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center bg-[radial-gradient(closest-side,rgba(217,131,58,0.22),rgba(11,18,32,0.85))] p-6 text-center">
                      <div>
                        <div className="font-display text-[8rem] leading-none brass-engraved">
                          H
                        </div>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-parchment/50">
                          Portrait coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 plaque rounded-md px-5 py-1.5 text-sm font-display whitespace-nowrap">
                Heath Shearon · The Mayor
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-3">
              {content.stats.map((s) => (
                <div key={s.label} className="plaque rounded-xl p-4 text-center">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/70">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl md:text-2xl text-ink">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            {/* Bio is verbatim from the source doc. No embellishments. */}
            <p className="drop-cap text-lg md:text-xl text-parchment/85 leading-[1.8] font-body">
              {content.bio}
            </p>

            <blockquote className="pull-quote">
              <p className="pull-quote-text">Service always wins.</p>
              <footer className="pull-quote-attrib">
                Heath&apos;s rule, every episode
              </footer>
            </blockquote>

            <div className="mt-14 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/mayorheath/itp2024"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
              >
                Book a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/podcast"
                className="btn-brass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
              >
                Listen to the show
              </Link>
              <a
                href="mailto:Heath@insurancetownpodcast.com"
                className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
              >
                Email Heath
              </a>
            </div>

            <div className="mt-14 grid sm:grid-cols-3 gap-3">
              {content.socials
                .filter((s) => ["LinkedIn", "Linktree", "Email"].includes(s.name))
                .map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="card-storefront rounded-xl p-4 flex items-center justify-between hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                      {s.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-brass/70" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
