import type { ServiceFaqItem } from "@/lib/services/service-pages";

type Props = {
  faqs: readonly ServiceFaqItem[];
};

export function ServiceFAQSection({ faqs }: Props) {
  return (
    <div className="service-lp-faq" id="service-faq">
      <h2 className="service-lp-faq__title font-display">
        <span className="he">שאלות נפוצות</span>
        <span className="en">Frequently asked</span>
      </h2>
      <ul className="service-lp-faq__list">
        {faqs.map((item, i) => (
          <li key={i} className="service-lp-faq__item">
            <h3 className="service-lp-faq__q">
              <span className="he">{item.q.he}</span>
              <span className="en">{item.q.en}</span>
            </h3>
            <p className="service-lp-faq__a">
              <span className="he">{item.a.he}</span>
              <span className="en">{item.a.en}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
