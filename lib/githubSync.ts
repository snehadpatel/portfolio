import { DATA, DataType, Project, Achievement } from "./data";

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    topics?: string[];
    language: string | null;
    updated_at: string;
    fork: boolean;
}

export interface RemoteDynamicData {
    achievements?: Achievement[];
    projects?: Partial<Project>[];
}

// Remote JSON URL (Can be set via ENV or fallback to GitHub raw user content)
const REMOTE_DATA_URL =
    process.env.NEXT_PUBLIC_REMOTE_DATA_URL ||
    "https://raw.githubusercontent.com/snehadpatel/portfolio/main/public/data/dynamic-events.json";

/**
 * Auto-discover public repositories from GitHub and map them into portfolio Projects
 */
export async function fetchGitHubRepos(username = "snehadpatel"): Promise<Project[]> {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) return [];

        const repos: GitHubRepo[] = await res.json();
        
        // Filter out forks and pick repositories tagged with 'featured', 'hackathon', 'ai', 'ml', or starred
        const featuredRepos = repos.filter(
            (r) => !r.fork && (r.topics?.some((t) => ["featured", "portfolio", "hackathon", "ai-ml"].includes(t)) || r.stargazers_count > 0)
        );

        return featuredRepos.map((r) => ({
            id: r.name.toLowerCase().replace(/[^a-z0-9-_]/g, "-"),
            title: r.name.replace(/[-_]/g, " ").toUpperCase(),
            description: r.description || "Open-source GitHub repository and software project.",
            techStack: [r.language || "TypeScript", ...(r.topics || [])].filter(Boolean),
            features: [
                `Open-source repository hosted on GitHub (${r.stargazers_count} stars)`,
                `Primary language: ${r.language || "Software Development"}`,
                `Last updated: ${new Date(r.updated_at).toLocaleDateString()}`
            ],
            link: r.homepage && r.homepage.startsWith("http") ? r.homepage : r.html_url,
            github: r.html_url,
            image: "/assets/projects/arcanum.webp", // Fallback project banner
            category: r.topics?.includes("ai-ml") ? "AI & Machine Learning" : "Open Source",
            roles: ["ml", "fullstack"],
            extended: {
                problemStatement: r.description || "Automated open-source project discovered directly from GitHub.",
                constraints: {
                    timeline: "Active Development",
                    team: "Open Source",
                    techStack: r.language || "TypeScript, Python",
                },
                solution: `Engineered ${r.name} to deliver automated software solutions. Source code is actively maintained on GitHub.`,
                tradeoffs: "Prioritized rapid open-source iteration and public availability.",
                impact: `Active open-source repository with ${r.stargazers_count} GitHub stars.`
            }
        }));
    } catch {
        return [];
    }
}

/**
 * Fetch remote JSON events & achievements (e.g. from GitHub Gist or Raw Content)
 */
export async function fetchRemoteEvents(): Promise<RemoteDynamicData | null> {
    try {
        const res = await fetch(REMOTE_DATA_URL, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

/**
 * Returns merged data combining static lib/data.ts with live GitHub repositories & remote events
 */
export async function getMergedData(): Promise<DataType> {
    const [githubProjects, remoteEvents] = await Promise.all([
        fetchGitHubRepos(),
        fetchRemoteEvents(),
    ]);

    const combinedProjects = [...DATA.projects];
    
    // Deduplicate and append GitHub projects
    for (const ghProj of githubProjects) {
        if (!combinedProjects.some((p) => p.id === ghProj.id || p.github === ghProj.github)) {
            combinedProjects.push(ghProj);
        }
    }

    const combinedAchievements = [...(remoteEvents?.achievements || []), ...DATA.achievements];
    // Deduplicate achievements by ID
    const uniqueAchievements = combinedAchievements.filter(
        (ach, idx, self) => idx === self.findIndex((t) => t.id === ach.id)
    );

    return {
        ...DATA,
        projects: combinedProjects,
        achievements: uniqueAchievements,
    };
}
