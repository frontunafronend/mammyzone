"use client";

import { useRef, useState } from "react";
import { subscribeNewsletter } from "@/app/actions/leads";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { blogArticleUi } from "@/lib/blog/ui-strings";
import { useLanguage } from "@/lib/i18n";
import { setNewsletterSubscribed } from "@/lib/newsletter-modal-storage";

export function ArticleNewsletter() {
  const { language } = useLanguage();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="blog-newsletter" aria-labelledby="blog-newsletter-title">
      <h2 id="blog-newsletter-title" className="blog-newsletter__title">
        {blogArticleUi.newsletterTitle[language]}
      </h2>
      <p className="blog-newsletter__sub">{blogArticleUi.newsletterSub[language]}</p>
      {sent ? (
        <p className="blog-newsletter__thanks" role="status">
          {blogArticleUi.newsletterThanks[language]}
        </p>
      ) : (
        <form
          className="blog-newsletter__form"
          onSubmit={async (e) => {
            e.preventDefault();
            setFormError(null);
            const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
            const res = await subscribeNewsletter({
              email,
              source: "blog",
              honeypot: honeypotRef.current?.value ?? "",
              language,
            });
            if (!res.ok) {
              setFormError(res.error);
              return;
            }
            setNewsletterSubscribed();
            setSent(true);
          }}
        >
          <HoneypotField ref={honeypotRef} />
          {formError ? (
            <p className="blog-newsletter__error" role="alert">
              {formError}
            </p>
          ) : null}
          <input
            type="email"
            required
            name="email"
            autoComplete="email"
            className="blog-newsletter__input"
            placeholder={blogArticleUi.newsletterPlaceholder[language]}
            aria-label={blogArticleUi.newsletterPlaceholder[language]}
          />
          <button type="submit" className="blog-newsletter__submit">
            {blogArticleUi.newsletterSubmit[language]}
          </button>
        </form>
      )}
    </aside>
  );
}
