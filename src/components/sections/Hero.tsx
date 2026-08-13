import Link from "next/link";
import { CourtyardLattice } from "@/components/backgrounds/CourtyardLattice";
import { heroMarks } from "@/components/icons/Marks";
import { SafeImage } from "@/components/ui/SafeImage";
import { hero } from "@/lib/i18n";
import { heroImageSources } from "@/lib/media/sources";
import { Pill } from "@/components/ui/Pill";

export function Hero() {
  return (
    <section className="hero hero-cinematic" id="home">
      <CourtyardLattice tone="shade" />
      <div className="hero-cinematic__grain" aria-hidden />
      <div className="hero-cinematic__wash" aria-hidden />

      <div className="hero-text relative z-[2]">
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
          {hero.pills.map((p, i) => {
            const Mark = heroMarks[i] ?? heroMarks[0];
            return (
              <Pill key={p.he} sage={"sage" in p && p.sage}>
                <Mark />
                <span className="he">{p.he}</span>
                <span className="en">{p.en}</span>
              </Pill>
            );
          })}
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
        <CourtyardLattice tone="sun" />
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
