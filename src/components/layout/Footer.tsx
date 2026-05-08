import Link from "next/link";
import { footer } from "@/lib/i18n";

export function Footer() {
  return (
    <footer className="site-footer">
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
