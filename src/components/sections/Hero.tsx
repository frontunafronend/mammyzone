import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/i18n";
import { Pill } from "@/components/ui/Pill";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-dot-grid" aria-hidden />
      <div className="hero-circle" aria-hidden />

      <div className="hero-text">
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
          <Link href="#calendar" className="btn-primary">
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

      <div className="hero-image-wrap">
        <Image
          className="hero-photo"
          src={HERO_IMAGE}
          alt={`${hero.imageAlt.he} / ${hero.imageAlt.en}`}
          width={900}
          height={1200}
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
        />
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
