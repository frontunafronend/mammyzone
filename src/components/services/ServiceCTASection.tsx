import Link from "next/link";

const copy = {
  bookTitle: { he: "מוכנה לקבוע זמן?", en: "Ready to book time?" },
  bookSub: {
    he: "בוחרות שירות ותאריך בקצב שלך — בלי לחץ.",
    en: "Choose service and date at your pace — no pressure.",
  },
  bookCta: { he: "לקביעת שיעור", en: "Book a session" },
  contactTitle: { he: "עדיין רוצה לשאול לפני?", en: "Still want to ask first?" },
  contactSub: {
    he: "דף קשר רך — טופס קצר או וואטסאפ.",
    en: "A gentle contact page — short form or WhatsApp.",
  },
  contactCta: { he: "לדף קשר", en: "Go to contact" },
} as const;

export function ServiceCTASection() {
  return (
    <div className="service-lp-cta-grid">
      <div className="service-lp-cta-card service-lp-cta-card--book">
        <h2 className="service-lp-cta-card__title font-display">
          <span className="he">{copy.bookTitle.he}</span>
          <span className="en">{copy.bookTitle.en}</span>
        </h2>
        <p className="service-lp-cta-card__sub">
          <span className="he">{copy.bookSub.he}</span>
          <span className="en">{copy.bookSub.en}</span>
        </p>
        <Link href="/book" className="btn-primary service-lp-cta-card__btn">
          <span className="he">{copy.bookCta.he}</span>
          <span className="en">{copy.bookCta.en}</span>
        </Link>
      </div>
      <div className="service-lp-cta-card service-lp-cta-card--contact">
        <h2 className="service-lp-cta-card__title font-display">
          <span className="he">{copy.contactTitle.he}</span>
          <span className="en">{copy.contactTitle.en}</span>
        </h2>
        <p className="service-lp-cta-card__sub">
          <span className="he">{copy.contactSub.he}</span>
          <span className="en">{copy.contactSub.en}</span>
        </p>
        <Link href="/contact" className="btn-ghost service-lp-cta-card__btn service-lp-cta-card__btn--ghost">
          <span className="he">{copy.contactCta.he}</span>
          <span className="en">{copy.contactCta.en}</span>
        </Link>
      </div>
    </div>
  );
}
