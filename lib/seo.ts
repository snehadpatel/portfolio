/** ===================================================================
 *  lib/seo.ts — Single source of truth for all SEO constants
 *  ===================================================================
 *  Every file that generates meta tags, OG cards, sitemaps, robots, or
 *  JSON-LD structured data MUST import values from here.
 *  ----------------------------------------------------------------- */

import type { Metadata } from "next";

// ─── Canonical site URL ────────────────────────────────────────────
// Change this ONCE when you buy a custom domain.
export const SITE_URL = "https://snehapatel.vercel.app";

// ─── Brand constants ───────────────────────────────────────────────
export const SITE_NAME = "Sneha Patel Portfolio";
export const AUTHOR_NAME = "Sneha Patel";
export const AUTHOR_TITLE = "AI & Systems Engineer";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const THEME_COLOR = "#4f46e5"; // indigo-600

// ─── Default keywords ──────────────────────────────────────────────
// These are the long-tail terms clients actually search for.
export const DEFAULT_KEYWORDS = [
    "Sneha Patel",
    "AI engineer portfolio",
    "computer vision developer",
    "machine learning engineer",
    "freelance AI developer",
    "IoT engineer",
    "deepfake detection",
    "edge AI developer",
    "Python machine learning",
    "hire AI engineer India",
    "computer vision freelancer",
    "PyTorch developer",
    "embedded ML systems",
    "YOLOv8 edge deployment",
    "full stack AI developer",
];

// ─── Per-page metadata helper ──────────────────────────────────────
// Generates fully-populated Metadata for any route.
interface PageSEOOptions {
    title: string;
    description: string;
    path: string; // e.g. "/about", "/projects/deepshield"
    keywords?: string[];
    ogImage?: string;
    ogType?: "website" | "article" | "profile";
}

export function generatePageMetadata({
    title,
    description,
    path,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
}: PageSEOOptions): Metadata {
    const url = `${SITE_URL}${path}`;
    const allKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];

    return {
        title,
        description,
        keywords: allKeywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: "en_US",
            type: ogType,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${title} — ${AUTHOR_NAME}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}
