import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Projects — AI, Computer Vision & IoT Engineering Work",
    description:
        "Browse Sneha Patel's engineering portfolio: DeepShield AI deepfake detection (97.5% accuracy), GreenSort edge-AI waste sorting, CNN crop classifiers, NLP crisis context mapping with Neo4j, and logistics supplier ranking models. Each project includes problem statements, architecture decisions, and measured impact.",
    path: "/projects",
    keywords: [
        "AI projects portfolio",
        "deepfake detection project",
        "computer vision portfolio",
        "IoT waste sorting project",
        "machine learning project examples",
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
