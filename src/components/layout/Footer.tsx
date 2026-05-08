"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { subscribeNewsletter } from "@/app/actions/leads";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { footer, layoutShell, siteContact, useLanguage } from "@/lib/i18n";
import { setNewsletterSubscribed } from "@/lib/newsletter-modal-storage";

export function Footer() {
  const { language } = useLanguage();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const onNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const res = await subscribeNewsletter({
      email,
      source: "footer",
      honeypot: honeypotRef.current?.value ?? "",
      language,
    });
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    setNewsletterSubscribed();
    setSent(true);
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              mammy<span>zone</span>
            </div>
            <p className="footer-tagline">
              <span className="he">{footer.tagline.he}</span>
              <span className="en">{footer.tagline.en}</span>
            </p>
            <p className="footer-contact-block">
              <span className="he">{layoutShell.footerContactLabel.he}</span>
              <span className="en">{layoutShell.footerContactLabel.en}</span>
              <br />
              <a href={siteContact.phoneTel}>{siteContact.phoneDisplay}</a>
              {" · "}
              <a href={siteContact.mailto}>{siteContact.email}</a>
            </p>
            <div className="footer-social">
              {footer.social.map((s) => (
                <Link key={s.label} href={s.href} aria-label={s.label}>
                  {s.abbr}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">
              <span className="he">{footer.colServices.he}</span>
              <span className="en">{footer.colServices.en}</span>
            </div>
            <ul className="footer-links">
              {footer.links.services.map((item) => (
                <li key={item.href + item.he}>
                  <Link href={item.href}>
                    <span className="he">{item.he}</span>
                    <span className="en">{item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">
              <span className="he">{footer.colCommunity.he}</span>
              <span className="en">{footer.colCommunity.en}</span>
            </div>
            <ul className="footer-links">
              {footer.links.community.map((item) => (
                <li key={item.href + item.he}>
                  <Link href={item.href}>
                    <span className="he">{item.he}</span>
                    <span className="en">{item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">
              <span className="he">{footer.colContact.he}</span>
              <span className="en">{footer.colContact.en}</span>
            </div>
            <ul className="footer-links">
              {footer.links.contact.map((item) => (
                <li key={item.href + item.he}>
                  <Link href={item.href}>
                    <span className="he">{item.he}</span>
                    <span className="en">{item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter" id="newsletter">
            <div className="footer-newsletter__inner">
              <h2 className="footer-newsletter__title">
                <span className="he">{layoutShell.newsletterTitle.he}</span>
                <span className="en">{layoutShell.newsletterTitle.en}</span>
              </h2>
              <p className="footer-newsletter__sub">
                <span className="he">{layoutShell.newsletterSub.he}</span>
                <span className="en">{layoutShell.newsletterSub.en}</span>
              </p>
              {sent ? (
                <p className="footer-newsletter__sub" role="status">
                  <span className="he">{layoutShell.newsletterSuccess.he}</span>
                  <span className="en">{layoutShell.newsletterSuccess.en}</span>
                </p>
              ) : (
                <form
                  className="footer-newsletter__form"
                  onSubmit={(ev) => void onNewsletter(ev)}
                  noValidate
                >
                  <HoneypotField ref={honeypotRef} />
                  {formError ? (
                    <p className="footer-newsletter__error" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="footer-newsletter__input"
                    aria-label={layoutShell.newsletterPlaceholder[language]}
                    placeholder={
                      language === "he"
                        ? layoutShell.newsletterPlaceholder.he
                        : layoutShell.newsletterPlaceholder.en
                    }
                  />
                  <button type="submit" className="footer-newsletter__submit">
                    <span className="he">{layoutShell.newsletterSubmit.he}</span>
                    <span className="en">{layoutShell.newsletterSubmit.en}</span>
                  </button>
                </form>
              )}
              <p className="footer-newsletter__fine">
                <span className="he">{layoutShell.newsletterPrivacy.he}</span>
                <span className="en">{layoutShell.newsletterPrivacy.en}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-closing">
          <p>
            <span className="he">{layoutShell.footerClosing.he}</span>
            <span className="en">{layoutShell.footerClosing.en}</span>
          </p>
        </div>

        <div className="footer-bottom">
          <span>
            <span className="he">{footer.bottomLeft.he}</span>
            <span className="en">{footer.bottomLeft.en}</span>
          </span>
          <span>
            <span className="he">{footer.bottomRight.he}</span>
            <span className="en">{footer.bottomRight.en}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
