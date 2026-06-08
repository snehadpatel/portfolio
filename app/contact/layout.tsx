import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Sneha Patel",
    description: "Get in touch with Sneha Patel for collaboration, questions, or internship opportunities in AI, Computer Vision, and IoT.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
