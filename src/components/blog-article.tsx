"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function BlogArticle({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    setLightboxAlt("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxSrc) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxSrc, closeLightbox]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;

      const img = target as HTMLImageElement;
      e.preventDefault();
      e.stopPropagation();

      if (img.closest("a")) {
        e.preventDefault();
      }

      setLightboxSrc(img.src);
      setLightboxAlt(img.alt || "");
    };

    article.addEventListener("click", handleClick);

    const images = article.querySelectorAll("img");
    images.forEach((img) => {
      (img as HTMLElement).style.cursor = "zoom-in";
    });

    return () => {
      article.removeEventListener("click", handleClick);
    };
  }, [html]);

  return (
    <>
      <article
        ref={articleRef}
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxAlt || "Image preview"}
        >
          <div className="relative flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <img
              src={lightboxSrc}
              alt={lightboxAlt}
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
