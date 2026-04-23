import type { Metadata } from "next";
import Image from "next/image";
import { Apple, Music, Youtube, Rss } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { fetchEpisodes } from "@/lib/rss";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Podcast — Insurance Town",
  description:
    "The Insurance Town Podcast: 329+ episodes of weekly conversations that make insurance human. Listen on Apple Podcasts, Spotify, or YouTube.",
};

export default async function PodcastPage() {
  const episodes = await fetchEpisodes(24);
  const latest = content.latest_episode;

  return (
    <main className="relative">
      <Nav />
      <PageHeader
        eyebrow="The Show"
        title="The Insurance Town"
        accent="Podcast."
        description="Weekly conversations that make insurance human. Independent agents, carriers, tech founders, and industry veterans telling the stories the trade press won't."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={latest.apple}
            target="_blank"
            rel="noreferrer"
            className="btn-brass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
          >
            <Apple className="h-4 w-4" />
            Apple Podcasts
          </a>
          <a
            href={latest.spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] text-black px-5 py-3 text-sm font-medium hover:brightness-110"
          >
            <Music className="h-4 w-4" />
            Spotify
          </a>
          <a
            href={latest.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white px-5 py-3 text-sm font-medium hover:brightness-110"
          >
            <Youtube className="h-4 w-4" />
            YouTube
          </a>
          <a
            href={content.episodes_feed.rss}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brass/40 px-5 py-3 text-sm text-parchment/80 hover:bg-white/5"
          >
            <Rss className="h-4 w-4 text-brass" />
            RSS
          </a>
        </div>
      </PageHeader>

      {/* Meet-the-host banner — real photos of Heath from the show */}
      <section className="relative border-b border-brass/15 overflow-hidden">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="ornament">Hosted by</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight brass-engraved">
                Heath Shearon — the Mayor.
              </h2>
              <p className="mt-4 text-parchment/75 leading-relaxed">
                20+ years in insurance. 329 episodes and counting. One voice
                the industry actually listens to.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div
                className="relative rounded-2xl overflow-hidden p-[2px]"
                style={{
                  background:
                    "linear-gradient(135deg, #f6d97a 0%, #e8c14a 45%, #9e7b1c 100%)",
                }}
              >
                <div className="relative rounded-[14px] overflow-hidden bg-ink">
                  <Image
                    src="/heath-banner.png"
                    alt="Heath Shearon in the many moods of the Insurance Town podcast"
                    width={2500}
                    height={500}
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-28">
        <div className="mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="ornament">All Episodes</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">
                The archive — newest first.
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/60">
              Showing {episodes.length || 0} of 329+
            </p>
          </div>

          {episodes.length === 0 ? (
            <div className="card-storefront rounded-2xl p-10 text-center text-parchment/70">
              Episode feed couldn't be reached. Try again in a minute — the list
              refreshes hourly.
            </div>
          ) : (
            <ul role="list" className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {episodes.map((ep, i) => (
                <li key={`${ep.title}-${i}`}>
                  <a
                    href={ep.url || latest.apple}
                    target="_blank"
                    rel="noreferrer"
                    className="group block h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 card-storefront"
                  >
                    <div className="relative aspect-square overflow-hidden bg-ink">
                      <Image
                        src={content.assets.cover_art}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {ep.number && (
                        <div className="absolute top-3 left-3 plaque rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                          Ep {ep.number}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/55">
                        {formatDate(ep.pubDate)}
                        {ep.duration ? ` · ${ep.duration}` : ""}
                      </p>
                      <h3 className="mt-2 font-display text-lg leading-snug line-clamp-3 text-parchment group-hover:text-brass-light transition-colors">
                        {ep.title}
                      </h3>
                      {ep.description ? (
                        <p className="mt-3 text-[13px] text-parchment/60 line-clamp-2">
                          {ep.description}
                        </p>
                      ) : null}
                    </div>
                  </a>
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
