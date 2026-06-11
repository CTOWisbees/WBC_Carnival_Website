// Fetches the editable site content from the Django content admin.
// Every field mirrors the JSON returned by GET /api/content/.
// If the backend is unreachable this returns null, and components fall back
// to their built-in defaults — so the site never breaks.

export interface SiteInfo {
  logo: string;
  heroBackground: string;
  heroVideo: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface PartnerLogoItem {
  name: string;
  image: string;
  link: string;
}

export interface GalleryItem {
  caption: string;
  image: string;
  showOnHome: boolean;
}

export interface TestimonialEntry {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface VideoEntry {
  title: string;
  youtubeId: string;
  subtitle: string;
}

export interface SponsorshipTierEntry {
  name: string;
  tagline: string;
  badge: string;
  accent: string;
  features: string[];
}

export interface SiteContent {
  site: SiteInfo;
  partners: PartnerLogoItem[];
  gallery: GalleryItem[];
  sponsorshipTiers: SponsorshipTierEntry[];
  testimonials: {
    homeColumn: TestimonialEntry[];
    parent: TestimonialEntry[];
    school: TestimonialEntry[];
  };
  videos: {
    homeWhy: VideoEntry[];
    gallery: VideoEntry[];
    founder: VideoEntry[];
    student: VideoEntry[];
  };
}

const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_URL ?? "http://127.0.0.1:8000";

// Build-time fetch (runs during `next build`). Bakes the latest content into
// the static HTML for a fast first paint and good SEO. If the backend is
// unreachable at build time this returns null and the live client fetch below
// fills the content in once the page loads.
export async function getSiteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${DJANGO_URL}/api/content/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    return null;
  }
}

// Runtime fetch (runs in the visitor's browser). Always fetches fresh so an
// admin's edit appears on the next page load — no rebuild or redeploy needed.
export async function fetchSiteContentLive(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${DJANGO_URL}/api/content/`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    return null;
  }
}
