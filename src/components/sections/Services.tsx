import Link from "next/link";
import { CourtyardLattice } from "@/components/backgrounds/CourtyardLattice";
import { serviceMarks } from "@/components/icons/Marks";
import { SafeImage } from "@/components/ui/SafeImage";
import { serviceCardImageSources } from "@/lib/media/sources";
import { services, servicesSection } from "@/lib/i18n";

const SERVICE_HREFS: Record<string, string> = {
  "01": "/yoga-after-birth",
  "02": "/pregnancy-yoga",
  "03": "/nlp-for-mothers",
  "04": "/baby-massage",
  "05": "/workshops",
  "06": "/book",
};

export function Services() {
  return (
    <section className="services" id="services">
      <CourtyardLattice tone="sun" />
      <div className="container relative z-[1]">
        <div className="services-header">
          <h2 className="section-title">
            <span className="he">
              {servicesSection.titleLine1.he}
              <br />
              <em>{servicesSection.titleEm.he}</em>
            </span>
            <span className="en">
              {servicesSection.titleLine1.en}
              <br />
              <em>{servicesSection.titleEm.en}</em>
            </span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((card, i) => {
            const Mark = serviceMarks[i] ?? serviceMarks[0];
            const href = SERVICE_HREFS[card.num] ?? "/book";
            return (
              <Link
                key={card.num}
                href={href}
                className={`service-card service-card--link${card.featured ? " featured" : ""}`}
              >
                {(card.num in serviceCardImageSources) && (
                  <div className="service-card__visual">
                    <SafeImage
                      sources={serviceCardImageSources[card.num as keyof typeof serviceCardImageSources]}
                      alt={`${card.title.he} / ${card.title.en}`}
                      fill
                      className="service-card__img object-cover"
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="service-icon" aria-hidden>
                  <Mark />
                </div>
                <h3 className="service-title">
                  <span className="he">{card.title.he}</span>
                  <span className="en">{card.title.en}</span>
                </h3>
                <p className="service-desc">
                  <span className="he">{card.description.he}</span>
                  <span className="en">{card.description.en}</span>
                </p>
                <span
                  className={`service-tag${card.tagVariant === "sage" ? " service-tag-sage" : ""}`}
                >
                  <span className="he">{card.tag.he}</span>
                  <span className="en">{card.tag.en}</span>
                </span>
                <span className="service-arrow" aria-hidden>
                  ←
                </span>
              </Link>
            );
          })}
        </div>
        <p className="services-unsure">
          <span className="he">{servicesSection.unsureHint.he}</span>
          <span className="en">{servicesSection.unsureHint.en}</span>{" "}
          <Link href="/contact" className="services-unsure__link">
            <span className="he">{servicesSection.unsureCta.he}</span>
            <span className="en">{servicesSection.unsureCta.en}</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
