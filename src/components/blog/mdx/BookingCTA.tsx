import Link from "next/link";
import { blogArticleUi } from "@/lib/blog/ui-strings";

/** Inline MDX CTA — links to homepage journey / booking */
export function BookingCTA() {
  return (
    <aside
      className="blog-inline-cta"
      aria-label={`${blogArticleUi.bookingCtaAria.he} / ${blogArticleUi.bookingCtaAria.en}`}
    >
      <p className="blog-inline-cta__text">
        <span className="he">{blogArticleUi.bookingCtaLine.he}</span>
        <span className="en">{blogArticleUi.bookingCtaLine.en}</span>
      </p>
      <Link href="/book" className="btn-primary blog-inline-cta__btn">
        <span className="he">{blogArticleUi.bookingCtaBtn.he}</span>
        <span className="en">{blogArticleUi.bookingCtaBtn.en}</span>
      </Link>
    </aside>
  );
}
