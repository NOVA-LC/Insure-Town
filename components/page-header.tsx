import { TownSilhouette } from "./town-silhouette";

export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden sky-dawn pt-36 md:pt-44 pb-28 md:pb-36 border-b border-brass/20">
      {/* Grain */}
      <div className="absolute inset-0 grain pointer-events-none" />
      {/* Town glow */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] town-glow pointer-events-none z-[2]" />
      {/* Town silhouette */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[3] opacity-90">
        <TownSilhouette className="w-full h-auto" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl 2xl:max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <span className="ornament">{eyebrow}</span>
        <h1 className="mt-5 font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] tracking-tight max-w-4xl brass-engraved">
          {title}
          {accent ? <> {accent}</> : null}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base md:text-lg text-parchment/75 leading-relaxed">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
