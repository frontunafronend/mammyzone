import Link from "next/link";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { SafeImage } from "@/components/ui/SafeImage";
import { hero } from "@/lib/i18n";
import { heroImageSources } from "@/lib/media/sources";
import { Pill } from "@/components/ui/Pill";

export function Hero() {
  return (
    <section className="hero hero-cinematic" id="home">
      <SoftWellnessBackground variant="quiet" showBotanical={false} />
      <div className="hero-cinematic__grain" aria-hidden />
      <div className="hero-cinematic__wash" aria-hidden />
      <div className="hero-cinematic__vignette" aria-hidden />
      <div className="hero-dot-grid" aria-hidden />
      <div className="hero-circle hero-cinematic__orb" aria-hidden />

      <div className="hero-text relative z-[2]">
        <div className="hero-eyebrow">
          <span className="he">{hero.eyebrow.he}</span>
          <span className="en">{hero.eyebrow.en}</span>
        </div>

        <h1 className="hero-title">
          <span className="he">
            {hero.titleBeforeEm.he}
            <em>{hero.titleEm.he}</em>
            <span className="line-accent">{hero.titleAccent.he}</span>
          </span>
          <span className="en">
            {hero.titleBeforeEm.en}
            <em>{hero.titleEm.en}</em>
            <span className="line-accent">{hero.titleAccent.en}</span>
          </span>
        </h1>

        <p className="hero-sub">
          <span className="he">{hero.sub.he}</span>
          <span className="en">{hero.sub.en}</span>
        </p>

        <div className="hero-actions">
          <Link href="/book" className="btn-primary hero-cta-primary">
            <span className="he">{hero.primaryCta.he}</span>
            <span className="en">{hero.primaryCta.en}</span>
          </Link>
          <Link href="#about" className="btn-ghost">
            <span className="he">{hero.ghostCta.he}</span>
            <span className="en">{hero.ghostCta.en}</span>
          </Link>
        </div>

        <div className="hero-pills">
          {hero.pills.map((p) => (
            <Pill key={p.he} sage={"sage" in p && p.sage}>
              <span aria-hidden>{p.icon}</span>
              <span className="he">{p.he}</span>
              <span className="en">{p.en}</span>
            </Pill>
          ))}
        </div>
      </div>

      <div className="hero-image-wrap hero-cinematic__visual">
        <div className="hero-image-parallax" aria-hidden>
          <SafeImage
            className="hero-photo hero-photo--layer"
            sources={heroImageSources}
            alt={`${hero.imageAlt.he} / ${hero.imageAlt.en}`}
            width={900}
            height={1200}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="hero-cinematic__frame" aria-hidden />
        <div className="hero-credential">
          <div className="hero-credential-name">
            <span className="he">{hero.credentialName.he}</span>
            <span className="en">{hero.credentialName.en}</span>
          </div>
          <div className="hero-credential-tags">
            <span className="he">{hero.credentialTags.he}</span>
            <span className="en">{hero.credentialTags.en}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
