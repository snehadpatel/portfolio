import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Services & Technical Collaboration — AI/ML, Computer Vision & Edge Systems",
    description:
        "Engineering and research collaboration with Sneha Patel: custom computer vision pipelines (YOLOv8, ViT, medical imaging), context-aware AI copilots (AST parsing, streaming, RAG), edge AI IoT hardware prototyping (Raspberry Pi, Arduino), and graph-augmented NLP data engineering. Open to internship and engineering roles.",
    path: "/services",
    keywords: [
        "hire AI engineer",
        "AI/ML engineering intern",
        "freelance computer vision developer",
        "machine learning consultant",
        "IoT prototyping services",
        "edge AI deployment services",
        "custom ML model development",
        "FastAPI Next.js developer",
        "hire Python ML developer",
        "PyTorch developer",
    ],
});

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
