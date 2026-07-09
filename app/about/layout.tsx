import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Sneha Patel — AI & Systems Engineer Background",
    description:
        "Learn about Sneha Patel's journey in AI engineering — from diploma topper (9.42 CGPA) to building 97.5% accuracy deepfake detectors. Explore her experience at CSRBOX and Brainy Beam, certifications from AWS, GCP, and Neo4j, and her expertise in computer vision, machine learning, and IoT hardware.",
    path: "/about",
    ogType: "profile",
    keywords: [
        "Sneha Patel background",
        "AI engineer experience",
        "computer vision engineer India",
        "CSRBOX data specialist",
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
