import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Services — Hire an AI & Computer Vision Engineer",
    description:
        "Professional freelance engineering services by Sneha Patel: custom computer vision pipelines, deepfake detection systems, machine learning recommendation engines, IoT hardware prototyping with edge AI, and end-to-end data pipeline consulting. Open to freelance, contract, and internship opportunities.",
    path: "/services",
    keywords: [
        "hire AI engineer",
        "freelance computer vision developer",
        "machine learning consultant",
        "IoT prototyping services",
        "hire deepfake detection engineer",
        "custom ML model development",
        "edge AI deployment services",
        "data pipeline consultant",
        "hire Python ML developer",
        "freelance PyTorch developer",
    ],
});

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
