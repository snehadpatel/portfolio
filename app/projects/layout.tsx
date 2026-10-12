import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Projects — AI/ML, Computer Vision, Edge Systems & NLP Work",
    description:
        "Browse Sneha Patel's technical portfolio: Arcanum AI context copilot (TetraTHON Top 6), NeuraBin / GreenSort edge waste sorting (SustainX 2026), DeepShield AI forensics, DermaJourney clinical triaging, and NLP crisis risk mapping with Neo4j. Includes live demos, code repositories, architecture diagrams, and research papers.",
    path: "/projects",
    keywords: [
        "AI projects portfolio",
        "Arcanum AI copilot",
        "NeuraBin GreenSort waste sorting",
        "deepfake detection project",
        "computer vision portfolio",
        "DermaJourney clinical AI",
        "edge AI deployment",
        "YOLOv8 Raspberry Pi",
        "Vision Transformer deepfake",
    ],
});

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
