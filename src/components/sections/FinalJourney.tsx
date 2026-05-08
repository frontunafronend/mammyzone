import Link from "next/link";
import { calendarSection, finalJourneySection, siteContact } from "@/lib/i18n";

export function FinalJourney() {
  return (
    <section className="final-journey" id="journey" aria-labelledby="journey-hero">
      <div className="final-journey__emotion">
        <div className="container">
          <p id="journey-hero" className="final-journey__hero">
            <span className="he">{finalJourneySection.heroLine.he}</span>
            <span className="en">{finalJourneySection.heroLine.en}</span>
          </p>
          <p className="final-journey__support">
            <span className="he">{finalJourneySection.supporting.he}</span>
            <span className="en">{finalJourneySection.supporting.en}</span>
          </p>
          <p className="final-journey__promise">
            <span className="he">{finalJourneySection.promise.he}</span>
            <span className="en">{finalJourneySection.promise.en}</span>
          </p>
        </div>
      </div>

      <div className="final-journey__planner">
        <div className="container">
          <div className="final-journey__grid">
            <div>
              <div className="section-label final-journey__label">
                <span className="he">{calendarSection.label.he}</span>
                <span className="en">{calendarSection.label.en}</span>
              </div>
              <h2 className="section-title final-journey__schedule-title">
                <span className="he">
                  {calendarSection.titleLine1.he}
                  <br />
                  <em>{calendarSection.titleEm.he}</em>
                </span>
                <span className="en">
                  {calendarSection.titleLine1.en}
                  <br />
                  <em>{calendarSection.titleEm.en}</em>
                </span>
              </h2>
              <div className="final-journey__events">
                {calendarSection.events.map((ev) => (
                  <div key={ev.day + ev.title.he} className="calendar-event">
                    <div className="calendar-date">
                      <div className="calendar-date-day">{ev.day}</div>
                      <div className="calendar-date-mon">
                        <span className="he">{ev.month.he}</span>
                        <span className="en">{ev.month.en}</span>
                      </div>
                    </div>
                    <div>
                      <div className="calendar-event-title">
                        <span className="he">{ev.title.he}</span>
                        <span className="en">{ev.title.en}</span>
                      </div>
                      <div className="calendar-event-meta">
                        <span className="he">{ev.meta.he}</span>
                        <span className="en">{ev.meta.en}</span>
                      </div>
                    </div>
                    <div className="calendar-event-price">{ev.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cta-box final-journey__cta-box">
              <div className="cta-box-title">
                <span className="he">{calendarSection.ctaTitle.he}</span>
                <span className="en">{calendarSection.ctaTitle.en}</span>
              </div>
              <p className="cta-box-sub">
                <span className="he">{calendarSection.ctaSub.he}</span>
                <span className="en">{calendarSection.ctaSub.en}</span>
              </p>
              <p className="final-journey__eyebrow">
                <span className="he">{calendarSection.ctaPhoneEyebrow.he}</span>
                <span className="en">{calendarSection.ctaPhoneEyebrow.en}</span>
              </p>
              <p className="final-journey__phone">
                <a
                  href={siteContact.phoneTel}
                  className="final-journey__phone-link"
                >
                  {siteContact.phoneDisplay}
                </a>
              </p>
              <p className="final-journey__eyebrow">
                <span className="he">{calendarSection.ctaEmailEyebrow.he}</span>
                <span className="en">{calendarSection.ctaEmailEyebrow.en}</span>
              </p>
              <p className="final-journey__email">
                <a href={siteContact.mailto}>{siteContact.email}</a>
              </p>
              <Link
                href="/book"
                className="final-journey__book-online"
              >
                <span className="he">{calendarSection.bookOnline.he}</span>
                <span className="en">{calendarSection.bookOnline.en}</span>
              </Link>
              <Link
                href={siteContact.whatsappUrl}
                className="btn-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="he">{calendarSection.whatsapp.he}</span>
                <span className="en">{calendarSection.whatsapp.en}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
