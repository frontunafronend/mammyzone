import Link from "next/link";
import { marketplaceSection } from "@/lib/i18n";

export function Marketplace() {
  return (
    <section className="marketplace" id="marketplace">
      <div className="container">
        <div className="marketplace-inner">
          <div className="marketplace-text reveal">
            <div className="section-label">
              <span className="he">{marketplaceSection.label.he}</span>
              <span className="en">{marketplaceSection.label.en}</span>
            </div>
            <h2 className="section-title">
              <span className="he">
                {marketplaceSection.titleLine1.he}
                <br />
                <em>{marketplaceSection.titleEm.he}</em>
              </span>
              <span className="en">
                {marketplaceSection.titleLine1.en}
                <br />
                <em>{marketplaceSection.titleEm.en}</em>
              </span>
            </h2>
            <p className="section-sub">
              <span className="he">{marketplaceSection.sub.he}</span>
              <span className="en">{marketplaceSection.sub.en}</span>
            </p>
            <Link
              href="#"
              className="btn-primary"
              style={{ display: "inline-flex", marginTop: "2rem", width: "fit-content" }}
            >
              <span className="he">{marketplaceSection.cta.he}</span>
              <span className="en">{marketplaceSection.cta.en}</span>
            </Link>
          </div>

          <div className="marketplace-visual reveal reveal-delay-1">
            {marketplaceSection.cards.map((card) => (
              <div key={card.title.he} className="mp-card">
                <div className="mp-card-icon" aria-hidden>
                  {card.icon}
                </div>
                <div className="mp-card-title">
                  <span className="he">{card.title.he}</span>
                  <span className="en">{card.title.en}</span>
                </div>
                <div className="mp-card-sub">
                  <span className="he">{card.sub.he}</span>
                  <span className="en">{card.sub.en}</span>
                </div>
                <span className="mp-discount">
                  <span className="he">{card.discount.he}</span>
                  <span className="en">{card.discount.en}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
