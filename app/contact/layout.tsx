import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Contact — Get in Touch for AI & ML Projects",
    description:
        "Reach out to Sneha Patel for collaboration on AI, Computer Vision, Machine Learning, and IoT projects. Available for freelance work, internship opportunities, and engineering consultations.",
    path: "/contact",
    keywords: [
        "contact AI engineer",
        "hire ML developer India",
        "freelance AI consultation",
        "computer vision project inquiry",
    ],
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
