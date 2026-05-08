import Image from "next/image";
import Link from "next/link";
import { aboutOrtal } from "@/lib/i18n";

const PORTRAIT =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80";

export function AboutOrtal() {
  return (
    <section className="ortal-section" id="about">
      <div className="container">
        <div className="ortal-inner">
          <div className="ortal-image-wrap reveal">
            <div className="ortal-image-frame">
              <Image
                src={PORTRAIT}
                alt={`${aboutOrtal.titleBeforeEm.he}${aboutOrtal.titleEm.he}`}
                width={720}
                height={900}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="ortal-quote-badge">
              <p>
                <span className="he">{aboutOrtal.quote.he}</span>
                <span className="en">{aboutOrtal.quote.en}</span>
              </p>
            </div>
          </div>

          <div className="ortal-text reveal reveal-delay-2">
            <div className="section-label">
              <span className="he">{aboutOrtal.label.he}</span>
              <span className="en">{aboutOrtal.label.en}</span>
            </div>
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
            <p className="ortal-bio">
              <span className="he">{aboutOrtal.bio.he}</span>
              <span className="en">{aboutOrtal.bio.en}</span>
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
              href="#calendar"
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
