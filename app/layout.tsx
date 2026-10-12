import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import RecruiterPanel from "@/components/ui/RecruiterPanel";
import PageTransition from "@/components/ui/PageTransition";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import {
    SITE_URL,
    SITE_NAME,
    AUTHOR_NAME,
    AUTHOR_TITLE,
    DEFAULT_OG_IMAGE,
    DEFAULT_KEYWORDS,
    THEME_COLOR,
} from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-plus-jakarta"
});
const notoSerif = Noto_Serif_Display({
    weight: ["400", "500"],
    subsets: ["latin"],
    style: ["italic"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${AUTHOR_NAME} | ${AUTHOR_TITLE} — Computer Vision, ML & IoT Portfolio`,
        template: `%s | ${AUTHOR_NAME}`,
    },
    description:
        "Sneha Patel is a Computer Science Student & AI/ML Developer building intelligent systems across Computer Vision, Edge AI, Context-Aware Copilots, and Full-Stack Architectures. Explore projects including Arcanum AI (TetraTHON Top 6), NeuraBin / GreenSort (SustainX 2026), DeepShield AI, and DermaJourney.",
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    alternates: {
        canonical: SITE_URL,
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
        title: `${AUTHOR_NAME} | ${AUTHOR_TITLE}`,
        description:
            "Computer Science Student & AI/ML Developer building computer vision pipelines, edge ML systems, context copilots, and full-stack software. Open to internships and research collaborations.",
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: `${AUTHOR_NAME} — ${AUTHOR_TITLE} Portfolio`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${AUTHOR_NAME} | ${AUTHOR_TITLE}`,
        description:
            "Computer Science Student & AI/ML Developer building computer vision pipelines, edge ML systems, context copilots, and full-stack software.",
        images: [DEFAULT_OG_IMAGE],
    },
    other: {
        "theme-color": THEME_COLOR,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, plusJakarta.variable, notoSerif.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#F8F9FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300")}>
                {/* Global JSON-LD Structured Data */}
                <PersonJsonLd />
                <WebSiteJsonLd />

                <ThemeProvider>
                    <InteractiveBackground />
                    <Navbar />
                    <main className="flex-1 flex flex-col">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                    <Footer />
                    <RecruiterPanel />
                </ThemeProvider>
            </body>
        </html>
    );
}
