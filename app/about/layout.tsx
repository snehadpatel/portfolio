import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Sneha Patel — AI/ML Developer & CS Student",
    description:
        "Learn about Sneha Patel's journey in computer science and AI — from diploma topper (9.42 CGPA) to co-founding Arcanum AI (TetraTHON Top 6) and authoring research on edge waste sorting (SustainX 2026). Explore her experience at CSRBOX, certifications from AWS, Google Cloud, and Neo4j, and her technical focus.",
    path: "/about",
    ogType: "profile",
    keywords: [
        "Sneha Patel background",
        "AI/ML developer experience",
        "computer vision developer India",
        "CSRBOX data engineering",
        "AWS certified ML",
        "Neo4j certified professional",
        "Navrachana University CS student",
    ],
});

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
