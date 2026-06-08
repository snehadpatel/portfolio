import { Metadata } from "next";
import { DATA } from "@/lib/data";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = DATA.projects.find((p) => p.id === slug);
    if (!project) {
        return {
            title: "Project Not Found | Sneha Patel",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: `${project.title} | Sneha Patel`,
        description: project.description,
    };
}

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
