import { transformationSection } from "@/lib/i18n";

export function TransformationSection() {
  return (
    <section
      className="transform-section"
      id="transformation"
      aria-labelledby="transform-heading"
    >
      <div className="container">
        <header className="transform-section__head">
          <div className="section-label">
            <span className="he">{transformationSection.label.he}</span>
            <span className="en">{transformationSection.label.en}</span>
          </div>
          <h2 id="transform-heading" className="section-title">
            <span className="he">
              {transformationSection.titleLine1.he}
              <br />
              <em>{transformationSection.titleEm.he}</em>
            </span>
            <span className="en">
              {transformationSection.titleLine1.en}
              <br />
              <em>{transformationSection.titleEm.en}</em>
            </span>
          </h2>
          <p className="section-sub transform-section__sub">
            <span className="he">{transformationSection.sub.he}</span>
            <span className="en">{transformationSection.sub.en}</span>
          </p>
        </header>

        <div className="transform-columns">
          <div className="transform-panel transform-panel--before">
            <h3 className="transform-panel__title">
              <span className="he">{transformationSection.beforeTitle.he}</span>
              <span className="en">{transformationSection.beforeTitle.en}</span>
            </h3>
            <ul className="transform-list">
              {transformationSection.beforeItems.map((item) => (
                <li key={item.he}>
                  <span className="he">{item.he}</span>
                  <span className="en">{item.en}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="transform-bridge" aria-hidden>
            <span className="transform-bridge__line" />
            <span className="transform-bridge__glyph">→</span>
            <span className="transform-bridge__line" />
          </div>
          <div className="transform-panel transform-panel--after">
            <h3 className="transform-panel__title">
              <span className="he">{transformationSection.afterTitle.he}</span>
              <span className="en">{transformationSection.afterTitle.en}</span>
            </h3>
            <ul className="transform-list transform-list--after">
              {transformationSection.afterItems.map((item) => (
                <li key={item.he}>
                  <span className="he">{item.he}</span>
                  <span className="en">{item.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
