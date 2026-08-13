"use client";

import { useEffect } from "react";

/**
 * iOS Safari often keeps a previous HTML/CSS snapshot even when the server
 * has already shipped a new palette. Compare the page stamp to a no-store
 * endpoint and reload once if they differ.
 */
export function DeployFreshness({ deployId }: { deployId: string }) {
  useEffect(() => {
    if (!deployId || deployId === "dev") return;

    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { id?: string };
        const live = data.id?.trim();
        if (!live || live === "dev" || live === deployId) return;
        const key = `mz-deploy-reload:${live}`;
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, "1");
        window.location.reload();
      } catch {
        /* offline / blocked — leave the current page */
      }
    };

    void run();
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) void run();
    };
    window.addEventListener("pageshow", onShow);
    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", onShow);
    };
  }, [deployId]);

  return null;
}
