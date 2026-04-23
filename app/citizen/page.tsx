import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Newsletter } from "@/components/newsletter";

export const metadata: Metadata = {
  title: "Become a Citizen — Insurance Town",
  description:
    "A quick email from Heath when there's something worth sharing — new episodes, stage dates, and the occasional note from the show. No spam, no fluff.",
};

export default function CitizenPage() {
  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="The Citizen Letter"
        title="A quick email"
        accent="from Heath."
        description="Only when there's something worth sharing — new episodes, upcoming stages, and the occasional note from the show. No spam, no fluff."
      />

      <Newsletter />

      <section className="relative py-20 md:py-24 border-t border-brass/15">
        <div className="mx-auto max-w-6xl 2xl:max-w-[80rem] px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10 md:gap-14 items-center">
          <div className="md:col-span-2">
            <div
              className="relative rounded-3xl p-[3px] max-w-xs mx-auto md:mx-0"
              style={{
                background:
                  "linear-gradient(135deg, #f6d97a 0%, #e8c14a 45%, #9e7b1c 100%)",
              }}
            >
              <div className="photo-editorial relative rounded-[22px] overflow-hidden bg-ink aspect-square">
                <Image
                  src="/heath-kitchen.jpg"
                  alt="Heath Shearon talking with a family at the kitchen table"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 plaque rounded-md px-4 py-1.5 text-sm font-display whitespace-nowrap">
                Signed, the Mayor
              </div>
            </div>
          </div>
          <div className="md:col-span-3 text-center md:text-left">
            <span className="ornament">What you get</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Short, occasional, and only when there's something good to say.
            </h2>
            <p className="mt-5 text-parchment/75 leading-relaxed">
              Heath sends these himself — new episodes, upcoming stages,
              behind-the-scenes notes, or the odd story from the road. One
              click and you're out if it's not for you.
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/50">
              Subscribe above · no hard sell, no drip sequence.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
