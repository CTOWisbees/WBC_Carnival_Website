"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";
import { fetchSiteContentLive } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  initial,
  children,
}: {
  initial: SiteContent | null;
  children: React.ReactNode;
}) {
  // Start from the content baked in at build time, then refresh from the live
  // backend in the browser so admin edits appear without a redeploy.
  const [content, setContent] = useState<SiteContent | null>(initial);

  useEffect(() => {
    let cancelled = false;
    fetchSiteContentLive().then((fresh) => {
      if (!cancelled && fresh) setContent(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Read the editable site content. Returns null when the backend is unavailable. */
export function useSiteContent(): SiteContent | null {
  return useContext(SiteContentContext);
}
