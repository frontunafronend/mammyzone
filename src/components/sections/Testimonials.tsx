import { CourtyardLattice } from "@/components/backgrounds/CourtyardLattice";
import { testimonials, testimonialsSection } from "@/lib/i18n";

export function Testimonials() {
  return (
    <section className="testimonials testimonials--lux" id="testimonials">
      <CourtyardLattice tone="sun" />
      <div className="container relative z-[1]">
        <header className="testimonials__head">
          <h2 className="section-title testimonials__title">
            <span className="he">
              {testimonialsSection.titleBeforeEm.he}
              <em>{testimonialsSection.titleEm.he}</em>
            </span>
            <span className="en">
              {testimonialsSection.titleBeforeEm.en}
              <em>{testimonialsSection.titleEm.en}</em>
            </span>
          </h2>
        </header>
        <div className="testimonials-grid testimonials-grid--lux">
          {testimonials.map((t, i) => (
            <article
              key={t.author.he}
              className={`testimonial-card testimonial-card--lux${i === 0 ? " testimonial-card--lux-accent" : ""}`}
            >
              <div className="testimonial-card__inner">
                <p className="testimonial-text">
                  <span className="he">{t.text.he}</span>
                  <span className="en">{t.text.en}</span>
                </p>
                <footer className="testimonial-footer">
                  <div className="testimonial-author">
                    <span className="he">{t.author.he}</span>
                    <span className="en">{t.author.en}</span>
                  </div>
                  <div className="testimonial-role">
                    <span className="he">{t.role.he}</span>
                    <span className="en">{t.role.en}</span>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
