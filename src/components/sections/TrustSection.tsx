import { trustSection } from "@/lib/i18n";

export function TrustSection() {
  return (
    <section className="trust-strip" id="trust" aria-labelledby="trust-heading">
      <div className="container">
        <header className="trust-strip__head">
          <div className="section-label">
            <span className="he">{trustSection.label.he}</span>
            <span className="en">{trustSection.label.en}</span>
          </div>
          <h2 id="trust-heading" className="section-title trust-strip__title">
            <span className="he">
              {trustSection.titleLine1.he}
              <br />
              <em>{trustSection.titleEm.he}</em>
            </span>
            <span className="en">
              {trustSection.titleLine1.en}
              <br />
              <em>{trustSection.titleEm.en}</em>
            </span>
          </h2>
          <p className="trust-strip__reassure section-sub">
            <span className="he">{trustSection.reassurance.he}</span>
            <span className="en">{trustSection.reassurance.en}</span>
          </p>
        </header>

        <div className="trust-strip__stats">
          {trustSection.stats.map((s) => (
            <div key={s.label.he} className="trust-stat">
              <div className="trust-stat__value" aria-hidden>
                {s.value}
              </div>
              <div className="trust-stat__label">
                <span className="he">{s.label.he}</span>
                <span className="en">{s.label.en}</span>
              </div>
            </div>
          ))}
        </div>

        <ul className="trust-strip__creds">
          {trustSection.credentials.map((c) => (
            <li key={c.he} className="trust-cred">
              <span className="trust-cred__mark" aria-hidden />
              <span>
                <span className="he">{c.he}</span>
                <span className="en">{c.en}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
