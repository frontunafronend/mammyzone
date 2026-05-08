import type { Bilingual } from "@/types";

type Props = {
  title: Bilingual;
  bullets: readonly Bilingual[];
};

export function ServiceTrustStrip({ title, bullets }: Props) {
  return (
    <div className="service-lp-trust" id="service-trust">
      <h2 className="service-lp-trust__title font-display">
        <span className="he">{title.he}</span>
        <span className="en">{title.en}</span>
      </h2>
      <ul className="service-lp-trust__list">
        {bullets.map((line) => (
          <li key={line.he} className="service-lp-trust__item">
            <span className="service-lp-trust__mark" aria-hidden />
            <span>
              <span className="he">{line.he}</span>
              <span className="en">{line.en}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
