import Link from "next/link";
import { calendarSection, siteContact } from "@/lib/i18n";

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
            <p className="mb-1 text-center text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[rgba(255,252,248,0.75)]">
              <span className="he">{calendarSection.ctaPhoneEyebrow.he}</span>
              <span className="en">{calendarSection.ctaPhoneEyebrow.en}</span>
            </p>
            <p className="mb-1 text-center font-display text-[1.45rem] font-medium leading-tight tracking-[0.02em] text-paper">
              <a href={siteContact.phoneTel} className="underline decoration-[rgba(255,252,248,0.45)] underline-offset-[5px] transition-opacity hover:opacity-90">
                {siteContact.phoneDisplay}
              </a>
            </p>
            <p className="mb-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[rgba(255,252,248,0.65)]">
              <span className="he">{calendarSection.ctaEmailEyebrow.he}</span>
              <span className="en">{calendarSection.ctaEmailEyebrow.en}</span>
            </p>
            <p className="mb-5 text-center text-[0.88rem] font-normal text-[rgba(255,252,248,0.92)]">
              <a
                href={siteContact.mailto}
                className="underline decoration-[rgba(255,252,248,0.4)] underline-offset-4 transition-opacity hover:opacity-90"
              >
                {siteContact.email}
              </a>
            </p>
            <Link
              href="/book"
              className="mb-4 inline-flex w-full min-h-[48px] items-center justify-center rounded-pill border border-[rgba(255,252,248,0.55)] bg-transparent px-5 py-2.5 text-center text-[0.78rem] font-medium tracking-[0.08em] text-paper transition-[background-color,border-color] duration-300 hover:bg-[rgba(255,252,248,0.08)]"
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
    </section>
  );
}
