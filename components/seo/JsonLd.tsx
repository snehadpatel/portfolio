/** ===================================================================
 *  components/seo/JsonLd.tsx — JSON-LD Structured Data Components
 *  ===================================================================
 *  These inject schema.org structured data into <head> so Google can
 *  show rich results (knowledge panels, service cards, breadcrumbs).
 *  ----------------------------------------------------------------- */

import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_TITLE, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { DATA } from "@/lib/data";

// ─── Person Schema ─────────────────────────────────────────────────
// Tells Google WHO you are — powers knowledge panels & "People also search for".
export function PersonJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR_NAME,
        jobTitle: AUTHOR_TITLE,
        description: DATA.profile.summary,
        url: SITE_URL,
        image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        email: `mailto:${DATA.profile.email}`,
        sameAs: [
            DATA.profile.linkedin,
            DATA.profile.github,
        ],
        alumniOf: DATA.education.map((edu) => ({
            "@type": "EducationalOrganization",
            name: edu.institution,
        })),
        knowsAbout: [
            "Computer Vision",
            "Machine Learning",
            "Deep Learning",
            "IoT Systems",
            "Natural Language Processing",
            "Edge AI",
            "Python",
            "PyTorch",
            "TensorFlow",
            "YOLO",
            "Next.js",
            "FastAPI",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── WebSite Schema ────────────────────────────────────────────────
// Tells Google this is a website with a name and URL.
export function WebSiteJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: DATA.profile.summary,
        author: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Breadcrumb Schema ─────────────────────────────────────────────
// Shows breadcrumb trail in Google search results.
interface BreadcrumbItem {
    name: string;
    path: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Service Schema ────────────────────────────────────────────────
// Powers "Services offered" rich results in Google.
export function ServicesJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${AUTHOR_NAME} — ${AUTHOR_TITLE}`,
        url: `${SITE_URL}/services`,
        description: "Professional freelance engineering services specializing in Computer Vision, Machine Learning, IoT Prototyping, and Data Specialist pipelines.",
        provider: {
            "@type": "Person",
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Engineering Services",
            itemListElement: DATA.services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.title,
                    description: service.description,
                },
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Project / CreativeWork Schema ─────────────────────────────────
// For individual project detail pages.
interface ProjectJsonLdProps {
    title: string;
    description: string;
    url: string;
    image: string;
    techStack: string[];
    github?: string;
    publication?: {
        title: string;
        authors: string[];
        conference: string;
        abstract: string;
    };
}

export function ProjectJsonLd({
    title,
    description,
    url,
    image,
    techStack,
    github,
    publication,
}: ProjectJsonLdProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: title,
        description,
        url: `${SITE_URL}${url}`,
        image: `${SITE_URL}${image}`,
        applicationCategory: "Engineering",
        operatingSystem: "Cross-platform",
        author: {
            "@type": "Person",
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
        keywords: techStack.join(", "),
    };

    if (github) {
        schema.codeRepository = github;
    }

    const schemas = [schema];

    // If there's a publication, add a ScholarlyArticle schema
    if (publication) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: publication.title,
            author: publication.authors.map((author) => ({
                "@type": "Person",
                name: author,
            })),
            description: publication.abstract,
            publisher: publication.conference,
            url: `${SITE_URL}${url}`,
        });
    }

    return (
        <>
            {schemas.map((s, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
        </>
    );
}
