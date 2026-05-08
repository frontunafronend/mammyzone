"use client";

import Link from "next/link";
import { DateTime } from "luxon";
import { useCallback, useMemo, useRef, useState } from "react";
import { submitBookingRequest } from "@/app/actions/leads";
import { HoneypotField } from "@/components/forms/HoneypotField";
import {
  formatLongDate,
  getSlotsForDate,
  isDateBookable,
  maxBookableDateIso,
  minBookableDateIso,
} from "@/lib/booking/availability";
import { BOOKING_OFFERINGS, getOfferingById } from "@/lib/booking/catalog";
import { bookingCopy } from "@/lib/booking/copy";
import { createBookingReference } from "@/lib/booking/reference";
import type { BookingKind, BookingStep, SelectedSlot } from "@/lib/booking/types";
import { buildBookingWhatsappUrl } from "@/lib/booking/whatsapp-prefill";
import { BOOKING_ZONE } from "@/lib/booking/timezone";
import { useLanguage } from "@/lib/i18n";

const KIND_ORDER: BookingKind[] = [
  "workshop",
  "private_session",
  "yoga_class",
  "retreat",
  "package",
];

function sundayFirstOffset(firstOfMonth: DateTime): number {
  return firstOfMonth.weekday === 7 ? 0 : firstOfMonth.weekday;
}

export function BookingWizard() {
  const { language } = useLanguage();
  const [step, setStep] = useState<BookingStep>("service");
  const [kindFilter, setKindFilter] = useState<BookingKind | "all">("all");
  const [offeringId, setOfferingId] = useState<string | null>(null);
  const [localDateIso, setLocalDateIso] = useState<string | null>(null);
  const [slot, setSlot] = useState<SelectedSlot | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState<{
    reference: string;
    waUrl: string;
  } | null>(null);

  const [viewMonth, setViewMonth] = useState(() =>
    DateTime.now().setZone(BOOKING_ZONE).startOf("month"),
  );

  const offering = offeringId ? getOfferingById(offeringId) : undefined;

  const filteredOfferings = useMemo(() => {
    if (kindFilter === "all") return BOOKING_OFFERINGS;
    return BOOKING_OFFERINGS.filter((o) => o.kind === kindFilter);
  }, [kindFilter]);

  const slots = useMemo(() => {
    if (!offering || !localDateIso) return [];
    return getSlotsForDate(localDateIso, offering);
  }, [offering, localDateIso]);

  const monthGrid = useMemo(() => {
    const first = viewMonth.startOf("month");
    const daysInMonth = first.daysInMonth ?? 30;
    const pad = sundayFirstOffset(first);
    const cells: ({ day: number; iso: string } | null)[] = [];
    for (let i = 0; i < pad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = first.set({ day: d }).toISODate();
      cells.push(iso ? { day: d, iso } : null);
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const monthTitle =
    language === "he"
      ? viewMonth.setLocale("he").toFormat("MMMM yyyy")
      : viewMonth.setLocale("en").toFormat("MMMM yyyy");

  const minIso = minBookableDateIso();
  const maxIso = maxBookableDateIso();
  const minMonth = DateTime.fromISO(minIso, { zone: BOOKING_ZONE }).startOf("month");
  const maxMonth = DateTime.fromISO(maxIso, { zone: BOOKING_ZONE }).startOf("month");
  const canPrevMonth = viewMonth > minMonth;
  const canNextMonth = viewMonth < maxMonth;

  const goService = useCallback(() => {
    setStep("service");
    setLocalDateIso(null);
    setSlot(null);
  }, []);

  const selectOffering = (id: string) => {
    setOfferingId(id);
    setLocalDateIso(null);
    setSlot(null);
    setStep("date");
  };

  const selectDate = (iso: string) => {
    if (!isDateBookable(iso)) return;
    setLocalDateIso(iso);
    setSlot(null);
    setStep("time");
  };

  const selectSlot = (s: SelectedSlot) => {
    setSlot(s);
    setStep("confirm");
  };

  const submit = async () => {
    if (!offering || !localDateIso || !slot || !name.trim() || !phone.trim()) return;
    setSubmitting(true);
    setServerError(null);
    const reference = createBookingReference();
    const submittedAtUtcIso = new Date().toISOString();
    const persist = await submitBookingRequest({
      offeringId: offering.id,
      localDateIso,
      slot,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
      reference,
      submittedAtUtcIso,
      honeypot: honeypotRef.current?.value ?? "",
      language,
    });
    if (!persist.ok) {
      setSubmitting(false);
      setServerError(persist.error);
      return;
    }
    const payload = {
      offering,
      localDateIso,
      slot,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
      reference,
      submittedAtUtcIso,
    };
    const waUrl = buildBookingWhatsappUrl(payload);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(
          `booking:${reference}`,
          JSON.stringify(payload),
        );
      } catch {
        /* ignore quota */
      }
    }
    setSubmitting(false);
    setDone({ reference, waUrl });
  };

  const bodyFont = language === "he" ? "font-bodyHe" : "font-bodyEn";

  const steps: { id: BookingStep; label: string }[] = [
    { id: "service", label: bookingCopy.stepService[language] },
    { id: "date", label: bookingCopy.stepDate[language] },
    { id: "time", label: bookingCopy.stepTime[language] },
    { id: "confirm", label: bookingCopy.stepConfirm[language] },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  if (done) {
    return (
      <div className={`book-success ${bodyFont}`}>
        <div className="book-success__icon" aria-hidden>
          ✓
        </div>
        <h2 className="book-success__title">{bookingCopy.successTitle[language]}</h2>
        <p className="book-success__text">{bookingCopy.successBody[language]}</p>
        <p className="book-success__ref">
          <span className="book-success__ref-label">{bookingCopy.successRef[language]}</span>
          <code>{done.reference}</code>
        </p>
        <div className="book-success__actions">
          <a href={done.waUrl} className="btn-primary book-success__wa" target="_blank" rel="noopener noreferrer">
            {bookingCopy.openWhatsapp[language]}
          </a>
          <Link href="/" className="btn-ghost book-success__home">
            {language === "he" ? "חזרה לבית" : "Back home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`book-wizard ${bodyFont}`}>
      <div className="book-steps" aria-label={language === "he" ? "שלבי הזמנה" : "Booking steps"}>
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`book-step-pill ${i <= stepIndex ? "book-step-pill--done" : ""} ${i === stepIndex ? "book-step-pill--current" : ""}`}
          >
            <span className="book-step-pill__n">{i + 1}</span>
            <span className="book-step-pill__t">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="book-tz-note">{bookingCopy.timezoneNote[language]}</p>

      {step === "service" && (
        <div className="book-panel">
          <div className="book-kind-row" role="tablist" aria-label={bookingCopy.kindFilterAll[language]}>
            <button
              type="button"
              role="tab"
              aria-selected={kindFilter === "all"}
              className={`book-kind-chip ${kindFilter === "all" ? "book-kind-chip--on" : ""}`}
              onClick={() => setKindFilter("all")}
            >
              {bookingCopy.kindFilterAll[language]}
            </button>
            {KIND_ORDER.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={kindFilter === k}
                className={`book-kind-chip ${kindFilter === k ? "book-kind-chip--on" : ""}`}
                onClick={() => setKindFilter(k)}
              >
                {bookingCopy.kindLabels[k][language]}
              </button>
            ))}
          </div>
          <ul className="book-offer-grid">
            {filteredOfferings.map((o) => (
              <li key={o.id}>
                <button type="button" className="book-offer-card" onClick={() => selectOffering(o.id)}>
                  <span className="book-offer-card__kind">{bookingCopy.kindLabels[o.kind][language]}</span>
                  <span className="book-offer-card__title">{o.title[language]}</span>
                  <span className="book-offer-card__desc">{o.description[language]}</span>
                  <span className="book-offer-card__meta">
                    {o.durationMin} {bookingCopy.minutes[language]} · {o.priceHint[language]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === "date" && offering && (
        <div className="book-panel">
          <div className="book-panel__head">
            <button type="button" className="book-link-back" onClick={goService}>
              ← {bookingCopy.back[language]}
            </button>
            <h2 className="book-panel__title">{bookingCopy.selectDateTitle[language]}</h2>
            <p className="book-panel__sub">{offering.title[language]}</p>
          </div>

          <div className="book-cal">
            <div className="book-cal__nav">
              <button
                type="button"
                className="book-cal__arrow"
                aria-label={bookingCopy.calendarPrev[language]}
                disabled={!canPrevMonth}
                onClick={() => setViewMonth((m) => m.minus({ months: 1 }))}
              >
                ‹
              </button>
              <span className="book-cal__title">{monthTitle}</span>
              <button
                type="button"
                className="book-cal__arrow"
                aria-label={bookingCopy.calendarNext[language]}
                disabled={!canNextMonth}
                onClick={() => setViewMonth((m) => m.plus({ months: 1 }))}
              >
                ›
              </button>
            </div>
            <div className="book-cal__weekdays">
              {(language === "he"
                ? ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"]
                : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              ).map((d) => (
                <span key={d} className="book-cal__wd">
                  {d}
                </span>
              ))}
            </div>
            <div className="book-cal__grid">
              {monthGrid.map((cell, idx) =>
                cell ? (
                  <button
                    key={cell.iso + idx}
                    type="button"
                    className={`book-cal__day ${localDateIso === cell.iso ? "book-cal__day--selected" : ""} ${!isDateBookable(cell.iso) ? "book-cal__day--muted" : ""}`}
                    disabled={!isDateBookable(cell.iso)}
                    onClick={() => selectDate(cell.iso)}
                  >
                    {cell.day}
                  </button>
                ) : (
                  <span key={`e-${idx}`} className="book-cal__day book-cal__day--empty" aria-hidden />
                ),
              )}
            </div>
          </div>

          <button type="button" className="book-link-back book-link-back--solo" onClick={goService}>
            {bookingCopy.changeService[language]}
          </button>
        </div>
      )}

      {step === "time" && offering && localDateIso && (
        <div className="book-panel">
          <div className="book-panel__head">
            <button type="button" className="book-link-back" onClick={() => setStep("date")}>
              ← {bookingCopy.back[language]}
            </button>
            <h2 className="book-panel__title">{bookingCopy.selectTimeTitle[language]}</h2>
            <p className="book-panel__sub">
              {offering.title[language]} · {formatLongDate(localDateIso, language)}
            </p>
          </div>
          {slots.length === 0 ? (
            <p className="book-empty">{bookingCopy.noSlots[language]}</p>
          ) : (
            <ul className="book-slot-grid">
              {slots.map((s) => (
                <li key={s.startUtcIso}>
                  <button
                    type="button"
                    className="book-slot-btn"
                    onClick={() =>
                      selectSlot({
                        startUtcIso: s.startUtcIso,
                        localTimeLabel: s.localTimeLabel,
                      })
                    }
                  >
                    {s.localTimeLabel[language]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {step === "confirm" && offering && localDateIso && slot && (
        <div className="book-panel">
          <div className="book-panel__head">
            <button type="button" className="book-link-back" onClick={() => setStep("time")}>
              ← {bookingCopy.back[language]}
            </button>
            <h2 className="book-panel__title">{bookingCopy.confirmTitle[language]}</h2>
            <p className="book-panel__sub">{bookingCopy.confirmIntro[language]}</p>
          </div>

          <div className="book-summary">
            <div>
              <span className="book-summary__k">{language === "he" ? "שירות" : "Service"}</span>
              <span className="book-summary__v">{offering.title[language]}</span>
            </div>
            <div>
              <span className="book-summary__k">{language === "he" ? "תאריך" : "Date"}</span>
              <span className="book-summary__v">{formatLongDate(localDateIso, language)}</span>
            </div>
            <div>
              <span className="book-summary__k">{language === "he" ? "שעה" : "Time"}</span>
              <span className="book-summary__v">{slot.localTimeLabel[language]}</span>
            </div>
          </div>

          <div className="book-form">
            <HoneypotField ref={honeypotRef} />
            {serverError ? (
              <p className="book-form-error" role="alert">
                {serverError}
              </p>
            ) : null}
            <label className="book-field">
              <span>{bookingCopy.fieldName[language]}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </label>
            <label className="book-field">
              <span>{bookingCopy.fieldPhone[language]}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required />
            </label>
            <label className="book-field">
              <span>{bookingCopy.fieldEmail[language]}</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" type="email" />
            </label>
            <label className="book-field book-field--full">
              <span>{bookingCopy.fieldNotes[language]}</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </label>
          </div>

          <div className="book-reminders">
            <h3>{bookingCopy.remindersTitle[language]}</h3>
            <p>{bookingCopy.remindersBody[language]}</p>
          </div>

          <p className="book-future-pay">{bookingCopy.futureStripe[language]}</p>

          <button
            type="button"
            className="btn-primary book-submit"
            disabled={submitting || !name.trim() || !phone.trim()}
            onClick={() => void submit()}
          >
            {submitting ? bookingCopy.submitting[language] : bookingCopy.submit[language]}
          </button>
        </div>
      )}
    </div>
  );
}
