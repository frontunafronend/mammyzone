import type { Metadata } from "next";
import Link from "next/link";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { PageShell } from "@/components/layout/PageShell";
import { SectionReveal } from "@/components/layout/SectionReveal";
import {
  buildContactIntroWhatsAppText,
  buildMailtoHref,
  buildWhatsAppMeUrl,
  PHONE_E164,
  siteContact,
} from "@/lib/contact";
import {
  contactCards,
  contactCardsIntro,
  contactFaq,
  contactFinalCta,
  contactFormCopy,
  contactGuidance,
  contactHero,
  contactPageMeta,
} from "@/lib/contact/page-copy";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { ContactInquiryForm } from "./ContactInquiryForm";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const url = absoluteUrl("/contact");
  return {
    title: contactPageMeta.title.he,
    description: contactPageMeta.description.he,
    alternates: { canonical: "/contact" },
    openGraph: {
      url,
      title: contactPageMeta.title.he,
      description: contactPageMeta.description.he,
      locale: "he_IL",
      siteName: "MammyZone",
    },
    twitter: {
      card: "summary_large_image",
      title: contactPageMeta.title.en,
      description: contactPageMeta.description.en,
    },
  };
}

function JsonLd() {
  const base = siteUrl.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${base}/#business`,
    name: "MammyZone",
    description: contactPageMeta.description.en,
    url: base,
    telephone: PHONE_E164,
    email: siteContact.email,
    areaServed: "IL",
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ContactPage() {
  const waPrefillHe = buildContactIntroWhatsAppText("he");
  const whatsappHref = buildWhatsAppMeUrl(waPrefillHe);
  const mailIntro = buildMailtoHref({
    subject: "MammyZone — פנייה מהאתר / Contact from website",
  });

  return (
    <>
      <JsonLd />
      <main className="page-root page-root--contact">
        <header className="contact-hero relative overflow-hidden">
          <SoftWellnessBackground showBotanical />
          <PageShell withNavOffset className="contact-hero__inner relative z-[1]">
            <p className="contact-hero__eyebrow">
              <span className="he">{contactHero.eyebrow.he}</span>
              <span className="en">{contactHero.eyebrow.en}</span>
            </p>
            <h1 className="contact-hero__title font-display">
              <span className="he">{contactHero.title.he}</span>
              <span className="en">{contactHero.title.en}</span>
            </h1>
            <p className="contact-hero__sub">
              <span className="he">{contactHero.sub.he}</span>
              <span className="en">{contactHero.sub.en}</span>
            </p>
          </PageShell>
        </header>

        <PageShell withNavOffset className="contact-main">
          <SectionReveal stagger={0}>
            <p className="contact-section-label">
              <span className="he">{contactCardsIntro.he}</span>
              <span className="en">{contactCardsIntro.en}</span>
            </p>
            <ul className="contact-card-grid">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card contact-card--wa"
                >
                  <span className="contact-card__kicker">WhatsApp</span>
                  <span className="he contact-card__title">{contactCards.whatsapp.title.he}</span>
                  <span className="en contact-card__title">{contactCards.whatsapp.title.en}</span>
                  <span className="he contact-card__body">{contactCards.whatsapp.body.he}</span>
                  <span className="en contact-card__body">{contactCards.whatsapp.body.en}</span>
                  <span className="contact-card__cta">
                    <span className="he">{contactCards.whatsapp.cta.he}</span>
                    <span className="en">{contactCards.whatsapp.cta.en}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={siteContact.phoneTel} className="contact-card contact-card--phone">
                  <span className="contact-card__kicker">Phone</span>
                  <span className="he contact-card__title">{contactCards.phone.title.he}</span>
                  <span className="en contact-card__title">{contactCards.phone.title.en}</span>
                  <span className="he contact-card__body">{contactCards.phone.body.he}</span>
                  <span className="en contact-card__body">{contactCards.phone.body.en}</span>
                  <span className="contact-card__cta">
                    <span className="he">{contactCards.phone.cta.he}</span>
                    <span className="en">{contactCards.phone.cta.en}</span>
                    <span className="contact-card__num">{siteContact.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={mailIntro} className="contact-card contact-card--mail">
                  <span className="contact-card__kicker">Email</span>
                  <span className="he contact-card__title">{contactCards.email.title.he}</span>
                  <span className="en contact-card__title">{contactCards.email.title.en}</span>
                  <span className="he contact-card__body">{contactCards.email.body.he}</span>
                  <span className="en contact-card__body">{contactCards.email.body.en}</span>
                  <span className="contact-card__cta">
                    <span className="he">{contactCards.email.cta.he}</span>
                    <span className="en">{contactCards.email.cta.en}</span>
                    <span className="contact-card__num">{siteContact.email}</span>
                  </span>
                </a>
              </li>
            </ul>
          </SectionReveal>

          <SectionReveal stagger={1}>
            <div className="contact-form-panel">
              <h2 className="contact-form-panel__title font-display">
                <span className="he">{contactFormCopy.title.he}</span>
                <span className="en">{contactFormCopy.title.en}</span>
              </h2>
              <p className="contact-form-panel__intro">
                <span className="he">{contactFormCopy.intro.he}</span>
                <span className="en">{contactFormCopy.intro.en}</span>
              </p>
              <ContactInquiryForm />
            </div>
          </SectionReveal>

          <SectionReveal stagger={2}>
            <div className="contact-guidance">
              <h2 className="contact-guidance__title font-display">
                <span className="he">{contactGuidance.title.he}</span>
                <span className="en">{contactGuidance.title.en}</span>
              </h2>
              <p className="contact-guidance__body">
                <span className="he">{contactGuidance.body.he}</span>
                <span className="en">{contactGuidance.body.en}</span>
              </p>
            </div>
          </SectionReveal>

          <SectionReveal stagger={3}>
            <div className="contact-faq">
              <h2 className="contact-faq__title font-display">
                <span className="he">{contactFaq.title.he}</span>
                <span className="en">{contactFaq.title.en}</span>
              </h2>
              <ul className="contact-faq__list">
                {contactFaq.items.map((item, i) => (
                  <li key={i} className="contact-faq__item">
                    <h3 className="contact-faq__q">
                      <span className="he">{item.q.he}</span>
                      <span className="en">{item.q.en}</span>
                    </h3>
                    <p className="contact-faq__a">
                      <span className="he">{item.a.he}</span>
                      <span className="en">{item.a.en}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal stagger={4}>
            <div className="contact-final-cta">
              <h2 className="contact-final-cta__title font-display">
                <span className="he">{contactFinalCta.title.he}</span>
                <span className="en">{contactFinalCta.title.en}</span>
              </h2>
              <p className="contact-final-cta__body">
                <span className="he">{contactFinalCta.body.he}</span>
                <span className="en">{contactFinalCta.body.en}</span>
              </p>
              <Link href="/book" className="btn-primary contact-final-cta__btn">
                <span className="he">{contactFinalCta.cta.he}</span>
                <span className="en">{contactFinalCta.cta.en}</span>
              </Link>
            </div>
          </SectionReveal>
        </PageShell>
      </main>
    </>
  );
}
