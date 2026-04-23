"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { KeyRound, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Podcast", href: "/podcast" },
  { label: "Speaking", href: "/speaking" },
  { label: "Consulting", href: "/consulting" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "About", href: "/about" },
  { label: "Become a Citizen", href: "/citizen" },
];

const primaryCta = {
  label: "Book the Mayor",
  href: "https://calendly.com/mayorheath/itp2024",
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8",
          "flex items-center justify-between gap-4",
          "rounded-2xl glass",
          scrolled ? "mt-2" : "mt-4",
        )}
      >
        <Link
          href="/"
          aria-label="Insurance Town — home"
          className="flex items-center gap-2 py-3 min-h-11"
        >
          <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-b from-brass-light to-brass-deep text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <KeyRound className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg leading-none tracking-tight">
            Insurance <span className="brass-text">Town</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 text-sm"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-parchment/80 hover:text-parchment transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex btn-primary items-center rounded-full px-5 py-2.5 text-sm font-medium"
          >
            {primaryCta.label}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden grid place-items-center h-11 w-11 rounded-full text-parchment/90 hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-auto max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Mobile"
            className="mt-2 rounded-2xl glass p-4 flex flex-col gap-2 text-sm"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="py-2 text-parchment/85 hover:text-parchment"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 btn-primary inline-flex items-center justify-center rounded-full px-5 py-3 font-medium"
              onClick={() => setOpen(false)}
            >
              {primaryCta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
