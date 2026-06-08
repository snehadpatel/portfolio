import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Sneha Patel",
    description: "Explore a catalog of engineering projects developed by Sneha Patel, including deep learning forensics, crop classifiers, edge IoT waste sorting, and decision analysis engines.",
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
