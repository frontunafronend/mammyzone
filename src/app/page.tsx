import { SectionReveal } from "@/components/layout/SectionReveal";
import { AboutOrtal } from "@/components/sections/AboutOrtal";
import { FeaturedArticles } from "@/components/sections/FeaturedArticles";
import { FinalJourney } from "@/components/sections/FinalJourney";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SocialGallery } from "@/components/sections/SocialGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function HomePage() {
  return (
    <main className="page-root page-root--cinema">
      <Hero />
      <SectionReveal stagger={0}>
        <TrustSection />
      </SectionReveal>
      <SectionReveal stagger={1}>
        <Services />
      </SectionReveal>
      <SectionReveal stagger={2}>
        <AboutOrtal />
      </SectionReveal>
      <SectionReveal stagger={3}>
        <TransformationSection />
      </SectionReveal>
      <SectionReveal stagger={0}>
        <Testimonials />
      </SectionReveal>
      <SectionReveal stagger={1}>
        <FeaturedArticles />
      </SectionReveal>
      <SectionReveal stagger={2}>
        <SocialGallery />
      </SectionReveal>
      <SectionReveal stagger={3}>
        <FinalJourney />
      </SectionReveal>
    </main>
  );
}
