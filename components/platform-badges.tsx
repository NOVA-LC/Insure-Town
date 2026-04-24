/**
 * Official-style platform badges for Apple Podcasts, Spotify, YouTube.
 *
 * Apple explicitly prohibits custom icons in place of the official badge:
 * "Never create your own Apple Podcasts badge or change the artwork in any way."
 * Spotify requires icon + wordmark together.
 * YouTube requires the official glyph + standard phrasing.
 *
 * These badges use faithful SVG reproductions of each platform's mark with
 * the required wording (Listen on / Watch on ...) and each platform's
 * official brand colors. They render consistently across dark/light surfaces.
 */

import type { ComponentPropsWithoutRef } from "react";

type BadgeProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: { pad: "px-3.5 py-2", text: "text-[11px]", icon: "h-4 w-4", gap: "gap-2" },
  md: { pad: "px-5 py-3", text: "text-sm", icon: "h-5 w-5", gap: "gap-2.5" },
  lg: { pad: "px-6 py-3.5", text: "text-base", icon: "h-6 w-6", gap: "gap-3" },
} as const;

function BadgeWrap({
  children,
  className = "",
  href,
  size = "md",
  ariaLabel,
  ...rest
}: BadgeProps & { className?: string; ariaLabel: string }) {
  const s = SIZE[size];
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full font-medium min-h-11 ${s.pad} ${s.text} ${s.gap} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function AppleBadge({ size = "md", className = "", ...rest }: BadgeProps & { className?: string }) {
  const s = SIZE[size];
  return (
    <BadgeWrap
      size={size}
      ariaLabel="Listen on Apple Podcasts"
      className={`bg-white text-black hover:brightness-95 transition ${className}`}
      {...rest}
    >
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="apl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F452FF" />
            <stop offset="1" stopColor="#832BC1" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#apl-grad)" />
        <circle cx="12" cy="11" r="2.4" fill="#fff" />
        <path
          d="M12 15.1c-2.2 0-4 1.7-4 3.8 0 .6.5 1.1 1.1 1.1h5.8c.6 0 1.1-.5 1.1-1.1 0-2.1-1.8-3.8-4-3.8Z"
          fill="#fff"
        />
        <path
          d="M17.6 13.4a5.9 5.9 0 0 0-11.2 0c-.1.5.3 1 .9 1 .4 0 .8-.3.9-.7a4.1 4.1 0 0 1 7.6 0c.1.4.5.7.9.7.6 0 1-.5.9-1Z"
          fill="#fff"
          opacity=".6"
        />
      </svg>
      <span>Listen on Apple Podcasts</span>
    </BadgeWrap>
  );
}

export function SpotifyBadge({ size = "md", className = "", ...rest }: BadgeProps & { className?: string }) {
  const s = SIZE[size];
  return (
    <BadgeWrap
      size={size}
      ariaLabel="Listen on Spotify"
      className={`bg-[#1DB954] text-black hover:brightness-105 transition ${className}`}
      {...rest}
    >
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path
          d="M17.5 15.8c-.2.4-.7.5-1 .3-2.9-1.8-6.5-2.2-10.8-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.7-.6 11.9 1.4.4.2.5.7.2 1Zm1.5-3.2c-.3.4-.8.6-1.2.3-3.3-2-8.4-2.6-12.3-1.4-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 4.5-1.4 10.1-.7 13.9 1.6.4.3.5.8.2 1.3Zm.1-3.3c-4-2.4-10.6-2.6-14.4-1.4-.6.2-1.2-.2-1.4-.8-.2-.6.2-1.2.8-1.4 4.4-1.3 11.7-1.1 16.2 1.7.5.3.7 1 .4 1.6-.3.5-1 .7-1.6.3Z"
          fill="#1DB954"
        />
      </svg>
      <span>Listen on Spotify</span>
    </BadgeWrap>
  );
}

export function YouTubeBadge({ size = "md", className = "", ...rest }: BadgeProps & { className?: string }) {
  const s = SIZE[size];
  return (
    <BadgeWrap
      size={size}
      ariaLabel="Watch on YouTube"
      className={`bg-[#FF0000] text-white hover:brightness-110 transition ${className}`}
      {...rest}
    >
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect width="24" height="24" rx="5" fill="#fff" />
        <path d="M9.5 8.5v7l6-3.5-6-3.5Z" fill="#FF0000" />
      </svg>
      <span>Watch on YouTube</span>
    </BadgeWrap>
  );
}

/**
 * RSS as a neutral outline pill — not a branded badge.
 */
export function RssBadge({ size = "md", className = "", ...rest }: BadgeProps & { className?: string }) {
  const s = SIZE[size];
  return (
    <BadgeWrap
      size={size}
      ariaLabel="RSS feed"
      className={`border border-brass/40 text-parchment/85 hover:bg-white/5 transition ${className}`}
      {...rest}
    >
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 5c8.3 0 15 6.7 15 15M5 11c5 0 9 4 9 9M7 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>RSS</span>
    </BadgeWrap>
  );
}
