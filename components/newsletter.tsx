"use client";

import { useState } from "react";
import { Mail, Check, Stamp } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    if (!email.includes("@")) {
      setState("error");
      return;
    }
    setState("loading");
    // TODO: wire to newsletter provider (ConvertKit / Beehiiv / Substack).
    await new Promise((r) => setTimeout(r, 650));
    setState("done");
  };

  return (
    <section
      id="newsletter"
      className="relative py-28 md:py-36 border-t border-brass/15 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(217,131,58,0.3), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="ornament">Become a Citizen</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
            A quick email from Heath.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-parchment/75">
            Only when there's something good to say — new episodes, upcoming
            stages, and the occasional note from the road.
          </p>
        </div>

        {/* Modern subscribe card — navy glass with yellow accents */}
        <div className="relative mx-auto mt-14 max-w-2xl rounded-2xl p-7 md:p-10 bg-ink-2/70 border border-brass/25 backdrop-blur-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
          {/* Small yellow stamp in top-right, as a wink to the "Citizen" branding */}
          <div
            aria-hidden="true"
            className="absolute -top-3 right-6 rotate-[4deg] rounded-md border border-brass/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brass bg-ink shadow-md"
          >
            <Stamp className="inline h-3 w-3 mr-1" />
            Mayor's Post
          </div>

          {state === "done" ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="grid place-items-center h-14 w-14 rounded-full bg-brass text-ink">
                <Check className="h-7 w-7" />
              </div>
              <p className="font-display text-2xl">Welcome to town, citizen.</p>
              <p className="text-sm text-parchment/70">Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative">
              <p className="font-display text-2xl text-parchment">
                Welcome to the town.
              </p>
              <p className="mt-1 text-sm text-parchment/65">
                Drop your email and you'll hear from Heath when there's
                something good to share.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <label htmlFor="citizen-email" className="sr-only">
                  Email address
                </label>
                <div className="flex-1 flex items-center gap-2 rounded-full bg-ink border border-brass/30 px-5 focus-within:ring-2 focus-within:ring-brass/70">
                  <Mail className="h-4 w-4 text-brass" />
                  <input
                    id="citizen-email"
                    type="email"
                    required
                    placeholder="you@yourfirm.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    className="flex-1 bg-transparent py-3 text-base text-parchment placeholder:text-parchment/35 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  aria-hidden="true"
                  className="hidden"
                  name="company"
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium disabled:opacity-70"
                >
                  {state === "loading" ? "Signing you up…" : "Become a Citizen"}
                </button>
              </div>

              {state === "error" && (
                <p role="alert" className="mt-3 text-sm text-mayor-red">
                  That doesn't look like an email — try again?
                </p>
              )}

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-parchment/50">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
