import Link from "next/link";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { PageShell } from "@/components/layout/PageShell";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ServicePageVisual } from "@/lib/services/service-pages";
import { getPostMetasForCategories } from "@/lib/blog/load-posts";
import { siteUrl } from "@/lib/site-url";
import { buildServiceFaqJsonLd, buildServiceJsonLd } from "@/lib/services/service-seo";
import type { ServicePageSlug } from "@/lib/services/service-pages";
import { getServiceDefinition } from "@/lib/services/service-pages";
import { ServiceCTASection } from "./ServiceCTASection";
import { ServiceFAQSection } from "./ServiceFAQSection";
import { ServiceInternalLinks } from "./ServiceInternalLinks";
import { ServiceRelatedArticles } from "./ServiceRelatedArticles";
import { ServiceTrustStrip } from "./ServiceTrustStrip";

type Props = {
  slug: ServicePageSlug;
};

function combinedVisualAlt(v: ServicePageVisual) {
  return `${v.alt.he} — ${v.alt.en}`;
}

export function ServiceLandingView({ slug }: Props) {
  const d = getServiceDefinition(slug);
  const posts = getPostMetasForCategories(d.relatedBlogCategories, 3);
  const base = siteUrl.replace(/\/$/, "");
  const pageUrl = `${base}/${slug}`;
  const serviceLd = buildServiceJsonLd(d);
  const faqLd = buildServiceFaqJsonLd(d.faqs, pageUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <main className="page-root page-root--service-lp">
        <header className="service-lp-hero relative overflow-hidden">
          <SoftWellnessBackground showBotanical />
          <PageShell withNavOffset className="service-lp-hero__inner relative z-[1]">
            <div className="service-lp-hero__grid">
              <div className="service-lp-hero__copy">
                <nav className="service-lp-breadcrumb" aria-label="Breadcrumb">
                  <Link href="/">MammyZone</Link>
                  <span aria-hidden> / </span>
                  <span className="he">{d.metaTitle.he.split("—")[0]?.trim()}</span>
                  <span className="en">{d.metaTitle.en.split("—")[0]?.trim()}</span>
                </nav>
                <p className="service-lp-hero__eyebrow">
                  <span className="he">{d.heroEyebrow.he}</span>
                  <span className="en">{d.heroEyebrow.en}</span>
                </p>
                <h1 className="service-lp-hero__title font-display">
                  <span className="he">{d.heroTitle.he}</span>
                  <span className="en">{d.heroTitle.en}</span>
                </h1>
                <p className="service-lp-hero__sub">
                  <span className="he">{d.heroSub.he}</span>
                  <span className="en">{d.heroSub.en}</span>
                </p>
              </div>
              <figure className="service-lp-hero__figure">
                <SafeImage
                  sources={d.heroVisual.sources}
                  alt={combinedVisualAlt(d.heroVisual)}
                  fill
                  sizes="(max-width: 899px) 100vw, 38vw"
                  className="service-lp-hero__img"
                  priority
                />
              </figure>
            </div>
          </PageShell>
        </header>

        <PageShell withNavOffset className="service-lp-body">
          <SectionReveal stagger={0}>
            <section className="service-lp-section" aria-labelledby="service-problem">
              <h2 id="service-problem" className="service-lp-section__title font-display">
                <span className="he">{d.problemTitle.he}</span>
                <span className="en">{d.problemTitle.en}</span>
              </h2>
              <p className="service-lp-section__prose">
                <span className="he">{d.problemBody.he}</span>
                <span className="en">{d.problemBody.en}</span>
              </p>
            </section>
          </SectionReveal>

          <SectionReveal stagger={1}>
            <figure className="service-lp-mid-visual">
              <SafeImage
                sources={d.midVisual.sources}
                alt={combinedVisualAlt(d.midVisual)}
                fill
                sizes="(max-width: 720px) 100vw, min(42rem, 90vw)"
                className="service-lp-mid-visual__img"
              />
            </figure>
          </SectionReveal>

          <SectionReveal stagger={2}>
            <section className="service-lp-section" aria-labelledby="service-benefits">
              <h2 id="service-benefits" className="service-lp-section__title font-display">
                <span className="he">{d.benefitsTitle.he}</span>
                <span className="en">{d.benefitsTitle.en}</span>
              </h2>
              <ul className="service-lp-benefits">
                {d.benefits.map((x) => (
                  <li key={x.he} className="service-lp-benefits__item">
                    <span className="he">{x.he}</span>
                    <span className="en">{x.en}</span>
                  </li>
                ))}
              </ul>
            </section>
          </SectionReveal>

          <SectionReveal stagger={3}>
            <section className="service-lp-section" aria-labelledby="service-who">
              <h2 id="service-who" className="service-lp-section__title font-display">
                <span className="he">{d.whoTitle.he}</span>
                <span className="en">{d.whoTitle.en}</span>
              </h2>
              <ul className="service-lp-who">
                {d.whoItems.map((x) => (
                  <li key={x.he} className="service-lp-who__item">
                    <span className="he">{x.he}</span>
                    <span className="en">{x.en}</span>
                  </li>
                ))}
              </ul>
            </section>
          </SectionReveal>

          <SectionReveal stagger={4}>
            <section className="service-lp-section" aria-labelledby="service-process">
              <h2 id="service-process" className="service-lp-section__title font-display">
                <span className="he">{d.processTitle.he}</span>
                <span className="en">{d.processTitle.en}</span>
              </h2>
              <ol className="service-lp-process">
                {d.processSteps.map((step, i) => (
                  <li key={step.title.he} className="service-lp-process__step">
                    <span className="service-lp-process__n" aria-hidden>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="service-lp-process__step-title">
                        <span className="he">{step.title.he}</span>
                        <span className="en">{step.title.en}</span>
                      </h3>
                      <p className="service-lp-process__step-body">
                        <span className="he">{step.body.he}</span>
                        <span className="en">{step.body.en}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </SectionReveal>

          <SectionReveal stagger={0}>
            <ServiceTrustStrip title={d.trustTitle} bullets={d.trustBullets} />
          </SectionReveal>

          <SectionReveal stagger={0}>
            <ServiceFAQSection faqs={d.faqs} />
          </SectionReveal>

          <SectionReveal stagger={1}>
            <ServiceRelatedArticles posts={posts} />
          </SectionReveal>

          <SectionReveal stagger={2}>
            <ServiceInternalLinks current={slug} />
          </SectionReveal>

          <SectionReveal stagger={3}>
            <ServiceCTASection />
          </SectionReveal>
        </PageShell>
      </main>
    </>
  );
}
