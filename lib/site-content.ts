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

export async function getSiteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${DJANGO_URL}/api/content/`, {
      // Re-fetch at most once a minute so admin edits show up without a redeploy.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    // Backend down / not yet set up — let components use their defaults.
    return null;
  }
}
