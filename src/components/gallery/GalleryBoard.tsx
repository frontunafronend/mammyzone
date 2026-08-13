"use client";

import { useMemo, useState } from "react";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { galleryPage } from "@/lib/i18n";
import { GALLERY_CATEGORIES } from "@/lib/media/gallery";
import type { StudioGalleryCategory, StudioGalleryItem } from "@/types";

type Filter = "all" | StudioGalleryCategory;

export function GalleryBoard({ items }: { items: readonly StudioGalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const grouped = useMemo(() => {
    return GALLERY_CATEGORIES.map((category) => ({
      category,
      items: items.filter((item) => item.categories.includes(category)),
    })).filter((group) => group.items.length > 0);
  }, [items]);

  const visibleItems = useMemo(() => {
    const seen = new Set<string>();
    const pool =
      filter === "all"
        ? items
        : items.filter((item) => item.categories.includes(filter));
    return pool.filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  }, [filter, items]);

  return (
    <div>
      <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
        <button
          type="button"
          role="tab"
          aria-selected={filter === "all"}
          className={`gallery-filters__chip${filter === "all" ? " is-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <span className="he">{galleryPage.all.he}</span>
          <span className="en">{galleryPage.all.en}</span>
        </button>
        {grouped.map(({ category }) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            className={`gallery-filters__chip${filter === category ? " is-active" : ""}`}
            onClick={() => setFilter(category)}
          >
            <span className="he">{galleryPage.categories[category].he}</span>
            <span className="en">{galleryPage.categories[category].en}</span>
          </button>
        ))}
      </div>

      <GalleryExperience items={visibleItems} layout="full" />
    </div>
  );
}
