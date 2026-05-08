import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { serviceCardImageSources } from "@/lib/media/sources";
import { services, servicesSection } from "@/lib/i18n";

export function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
          <div className="section-label">
            <span className="he">{servicesSection.label.he}</span>
            <span className="en">{servicesSection.label.en}</span>
          </div>
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
          {services.map((card) => (
            <Link
              key={card.num}
              href="/book"
              className={`service-card service-card--link${card.featured ? " featured" : ""}`}
            >
              {(card.num === "01" || card.num === "02") && (
                <div className="service-card__visual">
                  <SafeImage
                    sources={serviceCardImageSources[card.num]}
                    alt={`${card.title.he} / ${card.title.en}`}
                    fill
                    className="service-card__img object-cover"
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="service-num">{card.num}</div>
              <div className="service-icon" aria-hidden>
                {card.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
}
