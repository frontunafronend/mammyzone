import { Footer } from "@/components/layout/Footer";
import { AboutOrtal } from "@/components/sections/AboutOrtal";
import { CalendarCTA } from "@/components/sections/CalendarCTA";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { Marketplace } from "@/components/sections/Marketplace";
import { Retreat } from "@/components/sections/Retreat";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <Services />
      <AboutOrtal />
      <Retreat />
      <Testimonials />
      <CalendarCTA />
      <Marketplace />
      <Footer />
    </main>
  );
}
