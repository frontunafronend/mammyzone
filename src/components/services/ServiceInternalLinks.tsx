import Link from "next/link";
import {
  SERVICE_PAGE_SLUGS,
  getServiceDefinition,
  type ServicePageSlug,
} from "@/lib/services/service-pages";

type Props = {
  current: ServicePageSlug;
};

const heading = { he: "עוד ב-MammyZone", en: "More at MammyZone" } as const;

export function ServiceInternalLinks({ current }: Props) {
  const slugs = SERVICE_PAGE_SLUGS.filter((s) => s !== current);
  return (
    <nav className="service-lp-internal" aria-label="Service pages">
      <h2 className="service-lp-internal__title font-display">
        <span className="he">{heading.he}</span>
        <span className="en">{heading.en}</span>
      </h2>
      <ul className="service-lp-internal__list">
        {slugs.map((slug) => {
          const d = getServiceDefinition(slug);
          return (
            <li key={slug}>
              <Link href={`/${slug}`} className="service-lp-internal__link">
                <span className="he">{d.schemaName.he}</span>
                <span className="en">{d.schemaName.en}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
