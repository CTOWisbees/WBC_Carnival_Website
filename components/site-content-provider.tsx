"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent | null;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Read the editable site content. Returns null when the backend is unavailable. */
export function useSiteContent(): SiteContent | null {
  return useContext(SiteContentContext);
}
