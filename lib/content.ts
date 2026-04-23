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
    "Heath Shearon — podcaster, speaker, and servant-hearted leader bringing heart back to insurance. With over 20 years in the industry, Heath built his career on the value-add. Always looking to lead and grow 'out of service' because at the end of the day... service always wins. A former agent turned storyteller, he's helped countless insurance professionals grow through authentic relationships, smarter tech, and a service-first mindset. As host of the Insurance Town Podcast and a national keynote speaker, Heath brings humor, humility, and hard-earned wisdom to every conversation, challenging the industry to serve better, sell smarter, and lead with heart. Step inside Insurance Town, where service meets success.",
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
      label: "Book the Mayor",
      href: "https://calendly.com/mayorheath/itp2024",
      primary: true,
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
