import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { notFoundPage } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main>
      <PageShell withNavOffset className="not-found">
        <p className="not-found__code">{notFoundPage.code}</p>
        <h1 className="section-title not-found__title">
          <span className="he">{notFoundPage.title.he}</span>
          <span className="en">{notFoundPage.title.en}</span>
        </h1>
        <p className="section-sub not-found__sub">
          <span className="he">{notFoundPage.sub.he}</span>
          <span className="en">{notFoundPage.sub.en}</span>
        </p>
        <div className="not-found__actions">
          <Link href="/" className="btn-primary">
            <span className="he">{notFoundPage.home.he}</span>
            <span className="en">{notFoundPage.home.en}</span>
          </Link>
          <Link href="/gallery" className="btn-ghost">
            <span className="he">{notFoundPage.gallery.he}</span>
            <span className="en">{notFoundPage.gallery.en}</span>
          </Link>
          <Link href="/contact" className="btn-ghost">
            <span className="he">{notFoundPage.contact.he}</span>
            <span className="en">{notFoundPage.contact.en}</span>
          </Link>
          <Link href="/book" className="btn-ghost">
            <span className="he">{notFoundPage.book.he}</span>
            <span className="en">{notFoundPage.book.en}</span>
          </Link>
        </div>
      </PageShell>
    </main>
  );
}
