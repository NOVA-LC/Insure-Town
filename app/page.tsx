import { Nav } from "@/components/nav";
import { HomeJourney } from "@/components/home-journey";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <HomeJourney />
    </main>
  );
}
