import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Handshake, MessagesSquare, Rocket } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Consulting — Insurance Town",
  description:
    "Private consulting with Heath Shearon. Agency growth through authentic relationships and smarter tech.",
};

// These cards describe the *flavor* of a private engagement with Heath —
// framed in his own words from the show's positioning, not invented process names.
const APPROACH = [
  {
    icon: MessagesSquare,
    title: "Authentic relationships first.",
    body:
      "Heath's career was built on the value-add. Every engagement starts with an honest conversation about where your agency or team actually is — not a canned discovery script.",
  },
  {
    icon: Handshake,
    title: "Smarter tech, not more tech.",
    body:
      "The right tools are the ones that serve your client's experience. Heath helps separate what's working, what's noise, and what to wire in next.",
  },
  {
    icon: Rocket,
    title: "Service-first, not service-only.",
    body:
      "'Service always wins' is the thread, but the engagement is still about hitting real business outcomes — growth, retention, and team clarity.",
  },
];

export default function ConsultingPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="Private Engagement"
        title="Consulting with"
        accent="the Mayor."
        description="Agency growth through authentic relationships and smarter tech. Private, opinionated, and priced like a real advisor."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="https://calendly.com/mayorheath/itp2024"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium"
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:Heath@insurancetownpodcast.com?subject=Consulting%20inquiry"
            className="inline-flex items-center rounded-full border border-brass/40 px-5 py-3 text-sm font-medium hover:bg-white/5"
          >
            Email details
          </a>
        </div>
      </PageHeader>

      {/* Heath-forward hero block */}
      <section className="relative border-b border-brass/15">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div
              className="relative rounded-3xl p-[3px]"
              style={{
                background:
                  "linear-gradient(135deg, #f4d07a 0%, #d4a84b 45%, #8a6a1a 100%)",
              }}
            >
              <div className="photo-editorial relative rounded-[22px] overflow-hidden bg-ink aspect-[4/5]">
                <Image
                  src="/heath-consulting.jpg"
                  alt="Heath Shearon advising a client team in a boardroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 plaque rounded-md px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80">
                    Your advisor
                  </span>
                  <div className="font-display text-lg text-ink">Heath Shearon</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="ornament">Why Heath</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.02] brass-engraved">
              20 years in the business — in your corner.
            </h2>
            <p className="mt-5 text-parchment/75 leading-relaxed text-lg">
              Heath's been an agent. He's sat in the room when the deal didn't
              close and the one when it did. He's built books, coached teams,
              and spent the last four years of the podcast quietly learning
              from every sharp operator he could get on the mic.
            </p>
            <p className="mt-4 text-parchment/70 leading-relaxed">
              When you hire Heath, you're buying the pattern recognition from
              329 episodes of hard-earned conversations, filtered through
              someone who's actually done the job.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 border-b border-brass/15">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="ornament">How Heath works</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.02]">
              The same voice as the show — in a private room.
            </h2>
            <p className="mt-5 text-parchment/70">
              Consulting looks different for every engagement. What stays the
              same is the approach Heath brings to every conversation.
            </p>
          </div>

          <ul role="list" className="grid md:grid-cols-3 gap-5">
            {APPROACH.map((a) => (
              <li key={a.title} className="card-storefront rounded-2xl p-7">
                <span className="grid place-items-center h-11 w-11 rounded-full border border-brass/40 text-brass">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-parchment/70">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 card-storefront rounded-2xl p-8 md:p-10 flex flex-wrap gap-6 items-center justify-between">
            <div>
              <span className="ornament">Next step</span>
              <h3 className="mt-4 font-display text-2xl md:text-3xl">
                Start with a conversation.
              </h3>
              <p className="mt-3 max-w-xl text-parchment/70">
                Scope, cadence, and pricing depend on the shape of the problem.
                Easiest first move: book a short call.
              </p>
            </div>
            <a
              href="https://calendly.com/mayorheath/itp2024"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              Book a discovery call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
