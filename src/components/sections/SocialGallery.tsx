import Link from "next/link";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { SafeImage } from "@/components/ui/SafeImage";
import { socialGalleryImages, socialGallerySection } from "@/lib/i18n";

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
            <span className="he">
              {socialGallerySection.titleLine1.he}{" "}
              <em>{socialGallerySection.titleEm.he}</em>
            </span>
            <span className="en">
              {socialGallerySection.titleLine1.en}{" "}
              <em>{socialGallerySection.titleEm.en}</em>
            </span>
          </h2>
          <p className="section-sub social-gallery__sub">
            <span className="he">{socialGallerySection.sub.he}</span>
            <span className="en">{socialGallerySection.sub.en}</span>
          </p>
        </header>

        <div className="social-gallery__grid">
          {socialGalleryImages.map((img, i) => (
            <figure
              key={img.sources[0] ?? `tile-${i}`}
              className={`social-tile social-tile--${(i % 6) + 1}`}
            >
              <SafeImage
                sources={img.sources}
                alt={`${img.alt.he} / ${img.alt.en}`}
                width={480}
                height={480}
                className="social-tile__img"
                sizes="(max-width: 600px) 50vw, 16vw"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <div className="social-gallery__cta">
          <Link
            href={socialGallerySection.followHref}
            className="btn-primary social-gallery__follow"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="he">{socialGallerySection.followCta.he}</span>
            <span className="en">{socialGallerySection.followCta.en}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
