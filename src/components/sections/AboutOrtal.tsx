import Link from "next/link";
import { OrganicTextureBackground } from "@/components/backgrounds/OrganicTextureBackground";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { SafeImage } from "@/components/ui/SafeImage";
import { aboutOrtal } from "@/lib/i18n";
import { aboutPortraitSources } from "@/lib/media/sources";

export function AboutOrtal() {
  return (
    <section className="ortal-section ortal-section--editorial" id="about">
      <SoftWellnessBackground />
      <OrganicTextureBackground />
      <div className="container relative z-[1]">
        <div className="ortal-inner ortal-inner--story">
          <div className="ortal-image-wrap">
            <div className="ortal-image-frame">
              <SafeImage
                sources={aboutPortraitSources}
                alt={`${aboutOrtal.titleBeforeEm.he}${aboutOrtal.titleEm.he} / ${aboutOrtal.titleBeforeEm.en}${aboutOrtal.titleEm.en}`}
                width={720}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="ortal-quote-badge">
              <p>
                <span className="he">{aboutOrtal.quote.he}</span>
                <span className="en">{aboutOrtal.quote.en}</span>
              </p>
            </div>
          </div>

          <div className="ortal-text ortal-text--editorial">
            <div className="section-label">
              <span className="he">{aboutOrtal.label.he}</span>
              <span className="en">{aboutOrtal.label.en}</span>
            </div>
            <p className="ortal-story-kicker">
              <span className="he">{aboutOrtal.storyLabel.he}</span>
              <span className="en">{aboutOrtal.storyLabel.en}</span>
            </p>
            <h2 className="section-title">
              <span className="he">
                {aboutOrtal.titleBeforeEm.he}
                <em>{aboutOrtal.titleEm.he}</em>
              </span>
              <span className="en">
                {aboutOrtal.titleBeforeEm.en}
                <em>{aboutOrtal.titleEm.en}</em>
              </span>
            </h2>
            <p className="ortal-bio ortal-bio--lead">
              <span className="he">{aboutOrtal.bio.he}</span>
              <span className="en">{aboutOrtal.bio.en}</span>
            </p>
            <p className="ortal-bio">
              <span className="he">{aboutOrtal.story2.he}</span>
              <span className="en">{aboutOrtal.story2.en}</span>
            </p>
            <p className="ortal-bio">
              <span className="he">{aboutOrtal.story3.he}</span>
              <span className="en">{aboutOrtal.story3.en}</span>
            </p>
            <div className="ortal-creds">
              {aboutOrtal.creds.map((c) => (
                <div key={c.he} className="ortal-cred">
                  <div className="ortal-cred-dot" aria-hidden />
                  <span>
                    <span className="he">{c.he}</span>
                    <span className="en">{c.en}</span>
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/book"
              className="btn-primary"
              style={{ display: "inline-flex", width: "fit-content" }}
            >
              <span className="he">{aboutOrtal.cta.he}</span>
              <span className="en">{aboutOrtal.cta.en}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
