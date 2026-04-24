import { Nav } from "@/components/nav";
import { HomeHero } from "@/components/home-hero";
import { MeetTheMayor } from "@/components/meet-the-mayor";
import { HomeJourney } from "@/components/home-journey";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />

      {/* 1. Face-forward hero — Heath + logo + listen CTA primary */}
      <HomeHero />

      {/* 2. Meet the Mayor — real 3-paragraph bio + portrait */}
      <MeetTheMayor />

      {/* 3. Opt-in scroll narrative — demoted from "entire home" to one
             section labeled "The Story of Insurance Town." The journey
             itself (280vh) + FinaleLanding + Newsletter + Footer render
             inside <HomeJourney />. */}
      <section
        aria-label="Introduction to the scroll story"
        className="relative border-t border-brass/15 bg-ink/60 py-16 md:py-20 text-center"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="ornament">The story of Insurance Town</span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] brass-engraved">
            Scroll through the whole town.
          </h2>
          <p className="mt-5 text-parchment/75 leading-relaxed">
            A short narrative — six acts, one brass key — for the curious.
            Feel free to skip ahead if you just came to listen.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/50">
            ↓ scroll
          </p>
        </div>
      </section>

      <HomeJourney />
    </main>
  );
}
