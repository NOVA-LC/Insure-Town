export const brand = {
  name: "Insurance Town",
  host: "Heath Shearon",
  persona: "Mayor of Insurance Town",
  tagline: "Where service meets success",
  voice: ["warm", "civic", "witty", "service-first", "no-bs", "Southern-charm"],
  logo_icon: "key",
  colors: {
    ink: "#0B1220",
    parchment: "#F6EFDD",
    mayor_red: "#C8372D",
    brass: "#C9A24A",
    sky: "#5AA7D0",
    shadow: "#1A1410",
  },
} as const;

type Cta = { label: string; href: string; primary?: boolean };
type Service = { title: string; blurb: string; cta: string; href: string };
type Social = { name: string; href: string };
type Stat = { label: string; value: string };

export const content: {
  bio: string;
  bio_preview: string;
  stats: Stat[];
  services: Service[];
  latest_episode: {
    number: number;
    title: string;
    date: string;
    apple: string;
    spotify: string;
    youtube: string;
  };
  episodes_feed: { rss: string };
  ctas: Cta[];
  socials: Social[];
  assets: {
    headshot: string;
    speaking: string;
    banner: string;
    cover_art: string;
    sponsor_logos: string[];
  };
  seo: {
    title: string;
    description: string;
    og_image: string;
    site_url: string;
  };
} = {
  bio:
    "Heath Shearon — aka \u201CThe Mayor of Insurance Town\u201D — is a second-generation insurance professional with nearly two decades of experience spanning agency sales, carrier marketing, and consulting. He is the creator and host of the popular Insurance Town podcast, which launched in 2020 and has released over 329 weekly episodes featuring candid, insightful conversations designed to help insurance professionals grow, learn, and connect.\n\nKnown for his high-energy style, humor, and storytelling, Heath is a nationally recognized speaker and thought leader. He\u2019s been featured in Rough Notes, collaborates with leading industry sponsors like Smart Choice, Canopy Connect, and Cover Desk, and also serves as a performance coach with Agency Performance Partners.\n\nWhether behind the mic or in front of an audience, Heath is on a mission to make the insurance industry feel more like a community — one podcast, one handshake, and one conversation at a time.",
  bio_preview:
    "Second-generation insurance pro, creator of the Insurance Town podcast, and a nationally recognized speaker on a mission to make the insurance industry feel more like a community — one conversation at a time.",
  stats: [
    { label: "Episodes", value: "329+" },
    { label: "Years in Insurance", value: "20+" },
    { label: "Apple Rating", value: "4.8 / 5" },
  ],
  services: [
    {
      title: "Podcast",
      blurb: "Weekly conversations that make insurance human.",
      cta: "Listen",
      href: "#episodes",
    },
    {
      title: "Speaking & Training",
      blurb: "National keynotes built on humor, humility, and hard-earned wisdom.",
      cta: "Book Heath",
      href: "https://calendly.com/mayorheath/itp2024",
    },
    {
      title: "Consulting",
      blurb: "Agency growth through authentic relationships and smarter tech.",
      cta: "Get advice",
      href: "https://calendly.com/mayorheath/itp2024",
    },
    {
      title: "Sponsorship",
      blurb: "Put your brand inside the town square — in front of serious insurance pros.",
      cta: "Sponsor",
      href: "mailto:Heath@insurancetownpodcast.com",
    },
    {
      title: "Guest Booking",
      blurb: "Got a story worth telling? Pull up a stool in Insurance Town.",
      cta: "Pitch me",
      href: "mailto:Heath@insurancetownpodcast.com",
    },
    {
      title: "Become a Citizen",
      blurb: "Newsletter with field notes from the mayor's desk.",
      cta: "Subscribe",
      href: "#newsletter",
    },
  ],
  latest_episode: {
    number: 329,
    title: "How can you capitalize on this shift to personalized Health Insurance?",
    date: "2026-04-23",
    apple: "https://podcasts.apple.com/us/podcast/insurance-town/id1507463491",
    spotify: "https://open.spotify.com/show/4knPEcRU4pSvaVLz9Ly4g8",
    youtube: "https://www.youtube.com/@insurancetownpodcast",
  },
  episodes_feed: {
    rss: "https://feeds.transistor.fm/insurance-town",
  },
  ctas: [
    {
      label: "Listen on Apple Podcasts",
      href: "https://podcasts.apple.com/us/podcast/insurance-town/id1507463491",
      primary: true,
    },
    {
      label: "Book Heath to Speak",
      href: "https://calendly.com/mayorheath/itp2024",
    },
    {
      label: "Listen on Apple",
      href: "https://podcasts.apple.com/us/podcast/insurance-town/id1507463491",
    },
    {
      label: "Listen on Spotify",
      href: "https://open.spotify.com/show/4knPEcRU4pSvaVLz9Ly4g8",
    },
    { label: "Subscribe (Citizen)", href: "#newsletter" },
  ],
  socials: [
    {
      name: "Apple Podcasts",
      href: "https://podcasts.apple.com/us/podcast/insurance-town/id1507463491",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/show/4knPEcRU4pSvaVLz9Ly4g8",
    },
    { name: "YouTube", href: "https://www.youtube.com/@insurancetownpodcast" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/heath-shearon-66b37424/",
    },
    { name: "Linktree", href: "https://linktr.ee/heathshearon" },
    { name: "Email", href: "mailto:Heath@insurancetownpodcast.com" },
  ],
  assets: {
    headshot: "/heath-headshot.jpg",
    speaking: "/heath-speaking.png",
    banner: "/heath-banner.png",
    cover_art: "/cover.jpg",
    sponsor_logos: [] as string[],
  },
  seo: {
    title: "Insurance Town — Where service meets success | Heath Shearon",
    description:
      "The Insurance Town Podcast with Heath Shearon, the Mayor of Insurance Town. Weekly conversations, keynotes, and consulting for insurance pros who want to serve better, sell smarter, and lead with heart.",
    og_image: "/cover.jpg",
    site_url: "https://insurancetownpodcast.com",
  },
};

export type Episode = {
  title: string;
  pubDate: string;
  url: string;
  duration: string;
  number: string | null;
  description: string;
};
