import { Metadata } from "next";
import { DATA } from "@/lib/data";
import { SITE_URL, SITE_NAME, AUTHOR_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { ProjectJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = DATA.projects.find((p) => p.id === slug);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    const url = `${SITE_URL}/projects/${project.id}`;
    const projectKeywords = [
        ...project.techStack,
        project.category,
        `${project.title} project`,
        `${AUTHOR_NAME} ${project.category}`,
    ];

    return {
        title: project.title,
        description: project.extended
            ? `${project.description} ${project.extended.impact}`
            : project.description,
        keywords: projectKeywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${project.title} — ${AUTHOR_NAME}`,
            description: project.description,
            url,
            siteName: SITE_NAME,
            locale: "en_US",
            type: "article",
            images: [
                {
                    url: project.image || DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} — ${project.category} by ${AUTHOR_NAME}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} — ${AUTHOR_NAME}`,
            description: project.description,
            images: [project.image || DEFAULT_OG_IMAGE],
        },
    };
}

export default async function ProjectLayout({
    params,
    children,
}: Props) {
    const { slug } = await params;
    const project = DATA.projects.find((p) => p.id === slug);

    return (
        <>
            {/* Project-specific JSON-LD structured data */}
            {project && (
                <>
                    <ProjectJsonLd
                        title={project.title}
                        description={project.description}
                        url={`/projects/${project.id}`}
                        image={project.image}
                        techStack={project.techStack}
                        github={project.github || undefined}
                        publication={project.publication}
                    />
                    <BreadcrumbJsonLd
                        items={[
                            { name: "Home", path: "/" },
                            { name: "Projects", path: "/projects" },
                            { name: project.title, path: `/projects/${project.id}` },
                        ]}
                    />
                </>
            )}
            {children}
        </>
    );
}
