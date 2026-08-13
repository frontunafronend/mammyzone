"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { SafeImage } from "@/components/ui/SafeImage";
import { galleryUi, useLanguage } from "@/lib/i18n";
import type { StudioGalleryItem } from "@/types";

type GalleryExperienceProps = {
  items: readonly StudioGalleryItem[];
  layout: "preview" | "full";
};

export function GalleryExperience({ items, layout }: GalleryExperienceProps) {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const open = openIndex != null ? items[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current == null || items.length === 0) return current;
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(language === "he" ? -1 : 1);
      if (e.key === "ArrowLeft") step(language === "he" ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);

    const body = document.body;
    const html = document.documentElement;
    const y = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      htmlOverflow: html.style.overflow,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";
    body.classList.add("lightbox-open");

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      html.style.overflow = prev.htmlOverflow;
      body.classList.remove("lightbox-open");
      window.scrollTo(0, y);
    };
  }, [close, language, openIndex, step]);

  const lightbox =
    open && openIndex != null ? (
      <div
        className="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={close}
      >
        <div className="gallery-lightbox__bar">
          <p id={titleId} className="gallery-lightbox__title">
            <span className="he">{open.alt.he}</span>
            <span className="en">{open.alt.en}</span>
          </p>
          <p className="gallery-lightbox__count">
            {openIndex + 1} / {items.length}
          </p>
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <span className="he">{galleryUi.close.he}</span>
            <span className="en">{galleryUi.close.en}</span>
          </button>
        </div>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
        >
          <span className="he">{galleryUi.prev.he}</span>
          <span className="en">{galleryUi.prev.en}</span>
        </button>
        <div className="gallery-lightbox__stage" onClick={(e) => e.stopPropagation()}>
          <div className="gallery-lightbox__photo">
            <SafeImage
              sources={[open.src]}
              alt={`${open.alt.he} / ${open.alt.en}`}
              fill
              objectFit="contain"
              className="gallery-lightbox__media"
              sizes="90vw"
              priority
            />
          </div>
        </div>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
        >
          <span className="he">{galleryUi.next.he}</span>
          <span className="en">{galleryUi.next.en}</span>
        </button>
      </div>
    ) : null;

  return (
    <>
      <ul className={`studio-gallery studio-gallery--${layout}`}>
        {items.map((item, i) => {
          const shape = item.shape ?? "landscape";
          const label = item.alt[language];
          return (
            <li
              key={item.id}
              className={`studio-gallery__cell studio-gallery__cell--${shape}${i === 0 && layout === "preview" ? " studio-gallery__cell--lead" : ""}`}
            >
              <button
                type="button"
                className="studio-gallery__tile"
                onClick={() => setOpenIndex(i)}
                aria-label={label}
              >
                <SafeImage
                  sources={[item.src]}
                  alt={label}
                  fill
                  className="studio-gallery__media"
                  sizes={
                    layout === "full"
                      ? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 16vw"
                  }
                  loading="lazy"
                />
              </button>
            </li>
          );
        })}
      </ul>
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
