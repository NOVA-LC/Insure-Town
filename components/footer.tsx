import { KeyRound } from "lucide-react";
import { content, brand } from "@/lib/content";
import { TownSilhouette } from "./town-silhouette";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-brass/20 bg-gradient-to-b from-ink via-[#0a0710] to-black overflow-hidden">
      {/* Night-town horizon */}
      <div aria-hidden="true" className="relative h-40 opacity-70">
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(217,131,58,0.25), transparent 70%)",
          }}
        />
        <TownSilhouette className="absolute inset-x-0 bottom-0 w-full h-auto opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8 pt-6 pb-14">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <a
              href="#top"
              className="inline-flex items-center gap-2"
              aria-label="Insurance Town — home"
            >
              <span className="grid place-items-center h-11 w-11 rounded-full plaque">
                <KeyRound className="h-5 w-5" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl">
                Insurance <span className="brass-engraved">Town</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-parchment/65 leading-relaxed">
              {brand.tagline}. Hosted by {brand.host}, the {brand.persona}.
            </p>
            <p className="mt-6 font-display text-xl text-brass-light">
              Service always wins.
            </p>
          </div>

          <div>
            <p className="ornament">Listen</p>
            <ul className="mt-4 text-sm">
              {content.socials
                .filter(
                  (s) =>
                    s.name === "Apple Podcasts" ||
                    s.name === "Spotify" ||
                    s.name === "YouTube",
                )
                .map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block py-2.5 min-h-11 text-parchment/70 hover:text-brass-light transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="ornament">Connect</p>
            <ul className="mt-4 text-sm">
              {content.socials
                .filter(
                  (s) =>
                    s.name === "LinkedIn" ||
                    s.name === "Linktree" ||
                    s.name === "Email",
                )
                .map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="block py-2.5 min-h-11 text-parchment/70 hover:text-brass-light transition-colors"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href="https://calendly.com/mayorheath/itp2024"
                  target="_blank"
                  rel="noreferrer"
                  className="block py-2.5 min-h-11 text-parchment/70 hover:text-brass-light transition-colors"
                >
                  Book the Mayor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-brass/20 font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/45">
          <span>
            © {year} {brand.name}
          </span>
          <span>Serve better · Sell smarter · Lead with heart</span>
          <span>
            Designed by{" "}
            <a
              href="https://gonenova.com"
              target="_blank"
              rel="noreferrer"
              className="text-brass/80 hover:text-brass-light transition-colors"
            >
              GoneNova
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
