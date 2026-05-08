"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { subscribeNewsletter } from "@/app/actions/leads";
import { HoneypotField } from "@/components/forms/HoneypotField";
import {
  layoutShell,
  socialGallerySection,
  useLanguage,
} from "@/lib/i18n";
import {
  isNewsletterSubscribed,
  NEWSLETTER_MODAL_FIRST_DELAY_MS,
  NEWSLETTER_MODAL_INTERVAL_MS,
  readSnoozeUntil,
  setNewsletterSubscribed,
  writeSnoozeUntil,
} from "@/lib/newsletter-modal-storage";

export function NewsletterSignupModal() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const bodyFont = language === "he" ? "font-bodyHe" : "font-bodyEn";

  const snooze = useCallback(() => {
    writeSnoozeUntil(Date.now() + NEWSLETTER_MODAL_INTERVAL_MS);
    setOpen(false);
  }, []);

  const tryOpen = useCallback(() => {
    if (typeof window === "undefined") return;
    if (isNewsletterSubscribed()) return;
    if (Date.now() < readSnoozeUntil()) return;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isNewsletterSubscribed()) return;
    const t = window.setTimeout(tryOpen, NEWSLETTER_MODAL_FIRST_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [tryOpen]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") snooze();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(id);
    };
  }, [open, snooze]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const res = await subscribeNewsletter({
      email,
      source: "modal",
      honeypot: honeypotRef.current?.value ?? "",
      language,
    });
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    setNewsletterSubscribed();
    setSent(true);
    window.setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 2200);
  };

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])',
    );
    const list = [...nodes];
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div className="nl-modal-root" role="presentation">
      <button
        type="button"
        className="nl-modal__backdrop"
        aria-label={layoutShell.newsletterModalLater[language]}
        onClick={snooze}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`nl-modal__panel ${bodyFont}`}
        onKeyDown={onPanelKeyDown}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="nl-modal__close"
          aria-label={layoutShell.newsletterModalClose[language]}
          onClick={snooze}
        >
          ×
        </button>

        <h2 id={titleId} className="nl-modal__title font-display">
          <span className="he">{layoutShell.newsletterTitle.he}</span>
          <span className="en">{layoutShell.newsletterTitle.en}</span>
        </h2>
        <p className="nl-modal__sub">
          <span className="he">{layoutShell.newsletterSub.he}</span>
          <span className="en">{layoutShell.newsletterSub.en}</span>
        </p>

        {sent ? (
          <p className="nl-modal__success" role="status">
            <span className="he">{layoutShell.newsletterSuccess.he}</span>
            <span className="en">{layoutShell.newsletterSuccess.en}</span>
          </p>
        ) : (
          <form className="nl-modal__form" onSubmit={(ev) => void onSubmit(ev)} noValidate>
            <HoneypotField ref={honeypotRef} />
            {formError ? (
              <p className="nl-modal__error" role="alert">
                {formError}
              </p>
            ) : null}
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="nl-modal__input"
              placeholder={
                language === "he"
                  ? layoutShell.newsletterPlaceholder.he
                  : layoutShell.newsletterPlaceholder.en
              }
              aria-label={
                language === "he"
                  ? layoutShell.newsletterPlaceholder.he
                  : layoutShell.newsletterPlaceholder.en
              }
            />
            <button type="submit" className="btn-primary nl-modal__submit">
              <span className="he">{layoutShell.newsletterSubmit.he}</span>
              <span className="en">{layoutShell.newsletterSubmit.en}</span>
            </button>
          </form>
        )}

        <p className="nl-modal__fine">
          <span className="he">{layoutShell.newsletterPrivacy.he}</span>
          <span className="en">{layoutShell.newsletterPrivacy.en}</span>
        </p>

        <div className="nl-modal__ig">
          <p className="nl-modal__ig-hint">
            <span className="he">{layoutShell.newsletterModalInstagramHint.he}</span>
            <span className="en">{layoutShell.newsletterModalInstagramHint.en}</span>
          </p>
          <Link
            href={socialGallerySection.followHref}
            className="btn-ghost nl-modal__ig-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="he">{socialGallerySection.followCta.he}</span>
            <span className="en">{socialGallerySection.followCta.en}</span>
          </Link>
        </div>

        <button type="button" className="nl-modal__later" onClick={snooze}>
          {layoutShell.newsletterModalLater[language]}
        </button>
      </div>
    </div>
  );
}
