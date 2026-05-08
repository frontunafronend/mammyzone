import Link from "next/link";
import { calendarSection } from "@/lib/i18n";

const WHATSAPP = "https://wa.me/972000000000";

export function CalendarCTA() {
  return (
    <section className="calendar-cta" id="calendar">
      <div className="container">
        <div className="calendar-inner">
          <div>
            <div className="section-label reveal">
              <span className="he">{calendarSection.label.he}</span>
              <span className="en">{calendarSection.label.en}</span>
            </div>
            <h2 className="section-title reveal">
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
            <div className="calendar-upcoming reveal reveal-delay-1">
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

          <div className="cta-box reveal reveal-delay-2">
            <div className="cta-box-title">
              <span className="he">{calendarSection.ctaTitle.he}</span>
              <span className="en">{calendarSection.ctaTitle.en}</span>
            </div>
            <p className="cta-box-sub">
              <span className="he">{calendarSection.ctaSub.he}</span>
              <span className="en">{calendarSection.ctaSub.en}</span>
            </p>
            <Link href={WHATSAPP} className="btn-white" target="_blank" rel="noopener noreferrer">
              <span className="he">{calendarSection.whatsapp.he}</span>
              <span className="en">{calendarSection.whatsapp.en}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
