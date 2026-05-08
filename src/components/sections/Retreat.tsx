import Link from "next/link";
import { retreat } from "@/lib/i18n";

export function Retreat() {
  return (
    <section className="retreat" id="retreat">
      <div className="container">
        <div className="retreat-inner">
          <div>
            <div className="section-label retreat-label">
              <span className="he">{retreat.label.he}</span>
              <span className="en">{retreat.label.en}</span>
            </div>
            <h2 className="retreat-title reveal">
              <span className="he">
                {retreat.titleLine1.he}
                <br />
                <em>{retreat.titleEm.he}</em>
              </span>
              <span className="en">
                {retreat.titleLine1.en}
                <br />
                <em>{retreat.titleEm.en}</em>
              </span>
            </h2>
            <p className="retreat-sub reveal reveal-delay-1">
              <span className="he">{retreat.sub.he}</span>
              <span className="en">{retreat.sub.en}</span>
            </p>

            <div className="retreat-items reveal reveal-delay-2">
              {retreat.items.map((item) => (
                <div key={item.title.he} className="retreat-item">
                  <div className="retreat-item-icon" aria-hidden>
                    {item.icon}
                  </div>
                  <div>
                    <div className="retreat-item-title">
                      <span className="he">{item.title.he}</span>
                      <span className="en">{item.title.en}</span>
                    </div>
                    <div className="retreat-item-sub">
                      <span className="he">{item.sub.he}</span>
                      <span className="en">{item.sub.en}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="retreat-visual reveal reveal-delay-1">
            <div className="retreat-card-stack">
              <div className="retreat-card large">
                <div className="retreat-card-icon" aria-hidden>
                  ✨
                </div>
                <div>
                  <div className="retreat-card-title">
                    <span className="he">{retreat.cardLarge.title.he}</span>
                    <span className="en">{retreat.cardLarge.title.en}</span>
                  </div>
                  <div className="retreat-card-sub">
                    <span className="he">{retreat.cardLarge.sub.he}</span>
                    <span className="en">{retreat.cardLarge.sub.en}</span>
                  </div>
                  <div className="retreat-price">{retreat.cardLarge.price}</div>
                </div>
              </div>
              <div className="retreat-card">
                <div className="retreat-card-icon" aria-hidden>
                  {retreat.cardTime.icon}
                </div>
                <div className="retreat-card-title">
                  <span className="he">{retreat.cardTime.title.he}</span>
                  <span className="en">{retreat.cardTime.title.en}</span>
                </div>
                <div className="retreat-card-sub">
                  <span className="he">{retreat.cardTime.sub.he}</span>
                  <span className="en">{retreat.cardTime.sub.en}</span>
                </div>
              </div>
              <div className="retreat-card">
                <div className="retreat-card-icon" aria-hidden>
                  {retreat.cardVenue.icon}
                </div>
                <div className="retreat-card-title">
                  <span className="he">{retreat.cardVenue.title.he}</span>
                  <span className="en">{retreat.cardVenue.title.en}</span>
                </div>
                <div className="retreat-card-sub">
                  <span className="he">{retreat.cardVenue.sub.he}</span>
                  <span className="en">{retreat.cardVenue.sub.en}</span>
                </div>
              </div>
            </div>
            <Link
              href="#calendar"
              className="btn-primary"
              style={{
                display: "inline-flex",
                marginTop: "1.2rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <span className="he">{retreat.cta.he}</span>
              <span className="en">{retreat.cta.en}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
