import Image from "next/image";
import { fetchEpisodes } from "@/lib/rss";
import { content } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function RecentEpisodes() {
  const episodes = await fetchEpisodes(8);

  return (
    <section
      id="episodes"
      className="relative py-24 md:py-32 border-t border-brass/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brass">
              Recent Episodes
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl">
              The last{" "}
              <span className="brass-text italic">{episodes.length || 8}</span>{" "}
              from the show.
            </h2>
          </div>
          <a
            href={content.ctas[1].href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-parchment/70 hover:text-parchment underline-offset-4 hover:underline"
          >
            Open in Apple Podcasts →
          </a>
        </div>

        {episodes.length === 0 ? (
          <div className="card-storefront rounded-2xl p-10 text-center text-parchment/70">
            <p>
              Episode feed couldn't be reached at build time. Refresh the site
              in an hour — ISR will retry automatically.
            </p>
            <a
              href={content.ctas[1].href}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-brass underline-offset-4 hover:underline"
            >
              Listen on Apple Podcasts in the meantime
            </a>
          </div>
        ) : (
          <ul
            role="list"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {episodes.map((ep, i) => (
              <li key={`${ep.title}-${i}`}>
                <a
                  href={ep.url || content.ctas[1].href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block h-full card-storefront rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:[transform:perspective(800px)_rotateX(2deg)_rotateY(-2deg)_translateY(-4px)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={content.assets.cover_art}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {ep.number && (
                      <div className="absolute top-3 left-3 rounded-full bg-ink/80 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                        Ep {ep.number}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-parchment/55">
                      {formatDate(ep.pubDate)} · {ep.duration}
                    </p>
                    <h3
                      title={ep.title}
                      aria-label={ep.title}
                      className="mt-2 font-display text-lg leading-snug title-clamp-3"
                    >
                      {ep.title}
                    </h3>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
