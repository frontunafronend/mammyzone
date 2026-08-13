import { INSTAGRAM_EMBED_URL, INSTAGRAM_POST_URL } from "@/lib/contact";
import { socialGallerySection } from "@/lib/i18n";

export function InstagramPost() {
  return (
    <div className="ig-embed">
      <p className="ig-embed__title">
        <span className="he">{socialGallerySection.embedTitle.he}</span>
        <span className="en">{socialGallerySection.embedTitle.en}</span>
      </p>
      <iframe
        className="ig-embed__frame"
        title="MammyZone on Instagram"
        src={INSTAGRAM_EMBED_URL}
        loading="lazy"
        allow="encrypted-media; clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href={INSTAGRAM_POST_URL}
        className="ig-embed__open"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="he">{socialGallerySection.embedOpen.he}</span>
        <span className="en">{socialGallerySection.embedOpen.en}</span>
      </a>
    </div>
  );
}
