import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, Mic2, Sparkles, Heart } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Speaking & Training — Insurance Town",
  description:
    "National keynotes and workshops from Heath Shearon, built on humor, humility, and hard-earned wisdom. Book the Mayor for your stage.",
};

// Themes (not specific talk titles) pulled from Heath's bio + show voice.
const THEMES = [
  {
    icon: Heart,
    label: "Service-first selling",
    blurb:
      "The thread through every episode and every stage Heath walks: service always wins. A practical, story-driven talk on why how-you-show-up beats what-you-sell.",
  },
  {
    icon: Users,
    label: "Authentic relationships in a tech stack",
    blurb:
      "Agency growth through authentic relationships and smarter tech — how to adopt the tools that actually serve the client without losing the human side of the business.",
  },
  {
    icon: Sparkles,
    label: "From agent to storyteller",
    blurb:
      "A former agent turned storyteller, Heath walks producers through finding their voice, showing up on camera and in audio, and turning client wins into a body of work.",
  },
  {
    icon: Mic2,
    label: "Humor, humility, and hard-earned wisdom",
    blurb:
      "The signature register of the show — a keynote built the same way: laughter, honesty, and practical takeaways the room can use Monday morning.",
  },
];

export default function SpeakingPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="On Stage"
        title="Book the Mayor"
        accent="for your stage."
        description="National keynotes and workshops for insurance professionals — built on humor, humility, and hard-earned wisdom. Agency conferences, carrier events, and leadership summits."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="https://calendly.com/mayorheath/itp2024"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
          >
            Check availability
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:Heath@insurancetownpodcast.com?subject=Speaking%20inquiry"
            className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
          >
            Email a brief
          </a>
        </div>
      </PageHeader>

      {/* Stage shot — Heath actually on stage, big and dominant */}
      <section className="relative border-b border-brass/15 overflow-hidden">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="ornament">On the stage</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.02] brass-engraved">
              The mic fits him. So does the room.
            </h2>
            <p className="mt-5 text-parchment/75 leading-relaxed text-lg">
              Over 20 years in insurance and 329 episodes of conversations with
              the industry's sharpest operators — Heath brings the same energy
              from the mic to the keynote stage. Part coach, part storyteller,
              part agent who still remembers how hard this job is.
            </p>
            <p className="mt-5 text-parchment/70 leading-relaxed">
              If your room is full of agents, carriers, or insurtech operators
              who want to serve better and sell smarter, Heath is built for it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/mayorheath/itp2024"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
              >
                Check availability
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:Heath@insurancetownpodcast.com?subject=Speaking%20inquiry"
                className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
              >
                Email a brief
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-3xl p-[3px]"
              style={{
                background:
                  "linear-gradient(135deg, #f4d07a 0%, #d4a84b 45%, #8a6a1a 100%)",
              }}
            >
              <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-ink to-ink-2 aspect-[4/5]">
                <Image
                  src="/heath-stage.jpg"
                  alt="Heath Shearon on stage, delivering a keynote"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  style={{ objectPosition: "50% 25%" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 plaque rounded-md px-4 py-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80">
                    Live · on stage
                  </span>
                  <span className="font-display text-sm text-ink">Book Heath</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="relative py-20 md:py-28 border-b border-brass/15">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="ornament">Themes Heath speaks to</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.02]">
              The same voice as the show — on stage.
            </h2>
            <p className="mt-5 text-parchment/70">
              Each talk is shaped for the specific room. Below are the themes
              Heath keeps coming back to — tell him about your audience and
              he'll build around it.
            </p>
          </div>
          <ul role="list" className="grid md:grid-cols-2 gap-5">
            {THEMES.map((t) => (
              <li key={t.label} className="card-storefront rounded-2xl p-7 md:p-8">
                <span className="grid place-items-center h-11 w-11 rounded-full border border-brass/40 text-brass">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl md:text-[1.75rem] leading-tight">
                  {t.label}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-parchment/70">
                  {t.blurb}
                </p>
              </li>
            ))}
          </ul>

          {/* From the road — real event photos */}
          <div className="mt-20">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <span className="ornament">From the road</span>
                <h3 className="mt-4 font-display text-2xl md:text-3xl">
                  Real rooms. Real audiences.
                </h3>
              </div>
              <p className="max-w-md text-sm text-parchment/60">
                A few recent stops — agency conferences, PIA events, and
                industry stages where Heath shows up the same way he does
                on the mic.
              </p>
            </div>
            <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "/heath-stage-2.jpg", alt: "Heath speaking, audience filming", caption: "Keynote · industry event" },
                { src: "/heath-stage-3.jpg", alt: "Heath on stage in navy suit", caption: "Stage · conference room" },
                { src: "/heath-spotlight.webp", alt: "Heath at The Spotlight stage in orange blazer", caption: "The Spotlight · live" },
                { src: "/heath-friends.jpg", alt: "Heath with fellow agents at a PIA event", caption: "PIA · backstage" },
              ].map((p, i) => (
                <li key={i} className="group">
                  <div className="photo-editorial relative rounded-xl overflow-hidden bg-ink aspect-[3/4] ring-1 ring-brass/20 group-hover:ring-brass/45 transition">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-parchment/55">
                    {p.caption}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 card-storefront rounded-2xl p-8 md:p-10 flex flex-wrap gap-6 items-center justify-between">
            <div>
              <span className="ornament">Custom</span>
              <h3 className="mt-4 font-display text-2xl md:text-3xl">
                Have a theme? Heath will build around it.
              </h3>
              <p className="mt-3 max-w-xl text-parchment/70">
                Share the audience and the outcome. Expect a short call to shape
                the talk so it lands with your specific room.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/mayorheath/itp2024"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
              >
                Book a call
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/consulting"
                className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
              >
                Private consulting
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
