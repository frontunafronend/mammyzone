"use client";

import { useCallback, useState } from "react";
import { blogArticleUi } from "@/lib/blog/ui-strings";
import { buildWhatsAppMeUrl } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n";

type ArticleShareProps = {
  url: string;
  titleHe: string;
  titleEn: string;
};

export function ArticleShare({ url, titleHe, titleEn }: ArticleShareProps) {
  const { language } = useLanguage();
  const title = language === "he" ? titleHe : titleEn;
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const whatsappShareHref = buildWhatsAppMeUrl(`${title} ${url}`);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [url]);

  const onNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      /* cancelled */
    }
  }, [title, url]);

  return (
    <div className="blog-share">
      <p className="blog-share__title">{blogArticleUi.shareTitle[language]}</p>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button type="button" className="blog-share__btn" onClick={onNativeShare}>
          {blogArticleUi.shareNative[language]}
        </button>
      )}
      <button type="button" className="blog-share__btn" onClick={onCopy}>
        {copied ? blogArticleUi.copied[language] : blogArticleUi.copyLink[language]}
      </button>
      <a
        className="blog-share__btn"
        href={whatsappShareHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blogArticleUi.shareWhatsapp[language]}
      </a>
      <a
        className="blog-share__btn"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blogArticleUi.shareFacebook[language]}
      </a>
      <a
        className="blog-share__btn"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blogArticleUi.shareTwitter[language]}
      </a>
    </div>
  );
}
