import { content, type Episode } from "./content";

const pick = (xml: string, tag: string): string | null => {
  const re = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`,
    "i",
  );
  const m = xml.match(re);
  if (!m) return null;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
};

const pickAttr = (xml: string, tag: string, attr: string): string | null => {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"[^>]*/?>`, "i");
  const m = xml.match(re);
  return m ? m[1] : null;
};

export async function fetchEpisodes(limit = 8): Promise<Episode[]> {
  try {
    const res = await fetch(content.episodes_feed.rss, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
    return items.slice(0, limit).map((raw): Episode => {
      const title = pick(raw, "title") ?? "Untitled";
      const pubDate = pick(raw, "pubDate") ?? "";
      const enclosure = pickAttr(raw, "enclosure", "url") ?? "";
      const duration = pick(raw, "itunes:duration") ?? "";
      const number = pick(raw, "itunes:episode");
      const descRaw = pick(raw, "description") ?? "";
      const description = descRaw
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 220);
      return { title, pubDate, url: enclosure, duration, number, description };
    });
  } catch {
    return [];
  }
}
