import { testimonials, testimonialsSection } from "@/lib/i18n";

export function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-label reveal">
          <span className="he">{testimonialsSection.label.he}</span>
          <span className="en">{testimonialsSection.label.en}</span>
        </div>
        <h2 className="section-title reveal">
          <span className="he">
            {testimonialsSection.titleBeforeEm.he}
            <em>{testimonialsSection.titleEm.he}</em>
          </span>
          <span className="en">
            {testimonialsSection.titleBeforeEm.en}
            <em>{testimonialsSection.titleEm.en}</em>
          </span>
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <article
              key={t.author.he}
              className={`testimonial-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`}
            >
              <div className="testimonial-stars" aria-hidden>
                ★★★★★
              </div>
              <p className="testimonial-text">
                <span className="he">{t.text.he}</span>
                <span className="en">{t.text.en}</span>
              </p>
              <div className="testimonial-author">
                <span className="he">{t.author.he}</span>
                <span className="en">{t.author.en}</span>
              </div>
              <div className="testimonial-role">
                <span className="he">{t.role.he}</span>
                <span className="en">{t.role.en}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
