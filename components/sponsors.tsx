"use client";

import Image from "next/image";
import { content } from "@/lib/content";

export function Sponsors() {
  const logos = content.assets.sponsor_logos;

  return (
    <section
      id="sponsors"
      className="relative py-20 md:py-24 border-t border-brass/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brass">
              Insurance Town Sponsors
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Proudly supported by.
            </h2>
          </div>
          <a
            href="mailto:Heath@insurancetownpodcast.com"
            className="text-sm text-parchment/70 hover:text-parchment underline-offset-4 hover:underline"
          >
            Become a sponsor →
          </a>
        </div>

        {logos.length === 0 ? (
          <div className="card-storefront rounded-2xl p-8 text-center">
            {/* TODO: Populate lib/content.ts assets.sponsor_logos with an array of image URLs. */}
            <p className="text-parchment/70">
              Heath — drop sponsor logo URLs into{" "}
              <code className="font-mono text-brass">
                content.assets.sponsor_logos
              </code>{" "}
              and this grid fills itself.
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {logos.map((src, i) => (
              <li
                key={i}
                className="card-storefront rounded-xl aspect-[3/2] grid place-items-center p-4 group"
              >
                <Image
                  src={src}
                  alt={`Sponsor ${i + 1}`}
                  width={200}
                  height={100}
                  className="max-h-full w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
