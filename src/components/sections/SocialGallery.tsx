import Link from "next/link";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { InstagramPost } from "@/components/sections/InstagramPost";
import { homepageGalleryItems } from "@/lib/media/gallery";
import { socialGallerySection } from "@/lib/i18n";

export function SocialGallery() {
  return (
    <section className="social-gallery" id="social" aria-labelledby="social-heading">
      <SoftWellnessBackground showBotanical={false} />
      <div className="container relative z-[1]">
        <header className="social-gallery__head">
          <div className="section-label">
            <span className="he">{socialGallerySection.label.he}</span>
            <span className="en">{socialGallerySection.label.en}</span>
          </div>
          <h2 id="social-heading" className="section-title">
            <span className="he">{socialGallerySection.titleLine1.he}</span>
            <span className="en">{socialGallerySection.titleLine1.en}</span>
          </h2>
          <p className="section-sub social-gallery__sub">
            <span className="he">{socialGallerySection.sub.he}</span>
            <span className="en">{socialGallerySection.sub.en}</span>
          </p>
        </header>

        <InstagramPost />

        <GalleryExperience items={homepageGalleryItems} layout="preview" />

        <div className="social-gallery__cta">
          <Link href="/gallery" className="btn-primary social-gallery__follow">
            <span className="he">{socialGallerySection.openGallery.he}</span>
            <span className="en">{socialGallerySection.openGallery.en}</span>
          </Link>
          <a
            href={socialGallerySection.followHref}
            className="btn-ghost social-gallery__follow"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="he">{socialGallerySection.followCta.he}</span>
            <span className="en">{socialGallerySection.followCta.en}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
