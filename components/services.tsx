import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mic,
  Users,
  Briefcase,
  Megaphone,
  UserPlus,
  Mail,
} from "lucide-react";

type Icon = React.ComponentType<{ className?: string }>;

const LANES: {
  title: string;
  blurb: string;
  cta: string;
  href: string;
  icon: Icon;
  external?: boolean;
  tag: string;
}[] = [
  {
    tag: "01 · The show",
    title: "Podcast",
    blurb:
      "Weekly conversations that make insurance human. 329 episodes of independent agents, carriers, and industry leaders telling the stories trade press won't.",
    cta: "Open the archive",
    href: "/podcast",
    icon: Mic,
  },
  {
    tag: "02 · On stage",
    title: "Speaking & Training",
    blurb:
      "National keynotes and workshops built on humor, humility, and hard-earned wisdom. For agency conferences, carrier events, and leadership summits.",
    cta: "Book Heath",
    href: "/speaking",
    icon: Users,
  },
  {
    tag: "03 · 1:1",
    title: "Consulting",
    blurb:
      "Agency growth through authentic relationships and smarter tech. Private engagements for principals rebuilding how their agency serves and sells.",
    cta: "Start the conversation",
    href: "/consulting",
    icon: Briefcase,
  },
  {
    tag: "04 · The room",
    title: "Sponsorship",
    blurb:
      "Put your brand inside the town square — in front of serious insurance pros who listen every week and trust the host's recommendation.",
    cta: "Explore packages",
    href: "/sponsor",
    icon: Megaphone,
  },
  {
    tag: "05 · On the show",
    title: "Guest Booking",
    blurb:
      "Got a story worth telling? Pull up a stool in Insurance Town. Pitches welcome from agents, carriers, tech founders, and industry veterans.",
    cta: "Pitch the Mayor",
    href: "mailto:Heath@insurancetownpodcast.com",
    icon: UserPlus,
    external: true,
  },
  {
    tag: "06 · The letter",
    title: "Become a Citizen",
    blurb:
      "Field notes from the mayor's desk delivered to your inbox. New episodes, upcoming stage dates, and the occasional small-town story worth keeping.",
    cta: "Subscribe",
    href: "/citizen",
    icon: Mail,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36 border-t border-brass/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-14">
          <div className="md:col-span-8">
            <span className="ornament">Where the Mayor spends his week</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] tracking-tight">
              Six rooms inside{" "}
              <span className="font-script italic text-brass-light font-normal">
                Insurance Town.
              </span>
            </h2>
          </div>
          <p className="md:col-span-4 text-parchment/70 text-base md:text-lg">
            Pick the door that fits what you need — the podcast, the stage, or a
            private conversation.
          </p>
        </div>

        <ul role="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LANES.map((l, i) => (
            <Lane key={l.title} lane={l} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Lane({
  lane,
  index,
}: {
  lane: (typeof LANES)[number];
  index: number;
}) {
  const { icon: Icon } = lane;
  const content = (
    <article
      className="group relative isolate overflow-hidden rounded-2xl h-full min-h-[340px] flex flex-col p-7 md:p-8 transition-all duration-500 anim-fade-up"
      style={{
        animationDelay: `${index * 0.06}s`,
        background:
          "linear-gradient(180deg, rgba(246,239,221,0.04) 0%, rgba(246,239,221,0.01) 100%)",
        border: "1px solid rgba(201,162,74,0.22)",
      }}
    >
      {/* Gold hairline corners that appear on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t border-l border-brass opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-t border-r border-brass opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b border-l border-brass opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-brass opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Gradient glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,131,58,0.4), transparent 70%)",
        }}
      />

      {/* Tag + icon row */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-brass/80">
          {lane.tag}
        </span>
        <span
          aria-hidden="true"
          className="grid place-items-center h-10 w-10 rounded-full border border-brass/40 text-brass/80 group-hover:text-brass group-hover:border-brass transition-colors"
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-10 font-display text-3xl md:text-[2rem] leading-[1.05] tracking-tight text-parchment">
        {lane.title}
      </h3>

      {/* Blurb */}
      <p className="mt-4 text-[15px] leading-relaxed text-parchment/68 max-w-md flex-1">
        {lane.blurb}
      </p>

      {/* CTA */}
      <div className="mt-8 flex items-center justify-between border-t border-brass/15 pt-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
          {lane.cta}
        </span>
        <span
          aria-hidden="true"
          className="grid place-items-center h-9 w-9 rounded-full border border-brass/30 text-brass/80 group-hover:text-ink group-hover:bg-brass group-hover:border-brass transition-all duration-300"
        >
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );

  return (
    <li>
      {lane.external ? (
        <a href={lane.href} target="_blank" rel="noreferrer" className="block h-full">
          {content}
        </a>
      ) : (
        <Link href={lane.href} className="block h-full">
          {content}
        </Link>
      )}
    </li>
  );
}
