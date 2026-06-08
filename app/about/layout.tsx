import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Sneha Patel",
    description: "Learn more about Sneha Patel, an AI & Systems Engineer student. Explore her background, experience, certifications, and technical capabilities in machine learning and hardware prototyping.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
