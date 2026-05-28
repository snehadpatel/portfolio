import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Sneha Patel",
    description: "Professional freelance and contract engineering services specializing in Computer Vision, Machine Learning systems, IoT Prototyping, and Data Specialist pipelines.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
