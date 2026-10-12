"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DATA, Project } from "@/lib/data";
import ProjectDrawer from "@/components/projects/ProjectDrawer";
import ProjectCard from "@/components/ui/ProjectCard";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { UnderlineDoodle, BulbDoodle, SparkleDoodle } from "@/components/ui/Doodles";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import InteractiveSkillsMatrix from "@/components/projects/InteractiveSkillsMatrix";
import GitHubDashboard from "@/components/projects/GitHubDashboard";

const categories = ["All", ...Array.from(new Set(DATA.projects.map((p) => p.category)))];

export default function ProjectsPage() {
    const { role } = useRecruiterMode();
    const [viewMode, setViewMode] = useState<"curated" | "github">("curated");
    const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // 1. Filter by category
    let filtered = activeCategory === "All"
        ? DATA.projects
        : DATA.projects.filter((p) => p.category === activeCategory);

    // 2. Filter by selected skill
    if (selectedSkill) {
        filtered = filtered.filter((p) =>
            p.techStack.some((tech) => tech.toLowerCase() === selectedSkill.toLowerCase())
        );
    }

    // 3. Sort by Recruiter Role if active
    const filteredProjects = [...filtered].sort((a, b) => {
        if (!role) return 0;
        const aMatches = a.roles.includes(role);
        const bMatches = b.roles.includes(role);
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
    });

    const handleOpenDrawer = (project: Project) => {
        setSelectedProject(project);
        setIsDrawerOpen(true);
    };

    const handleOpenDrawerById = (id: string) => {
        const found = DATA.projects.find((p) => p.id === id);
        if (found) {
            handleOpenDrawer(found);
        }
    };

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20">
            <div className="w-full px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">

                    {/* Page Header */}
                    <div className="mb-10 md:mb-14 print:hidden">
                        <span className="txt-cursive text-lg text-slate-400 block mb-2">portfolio &amp; systems</span>
                        <h1 className="relative inline-block text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-[0.9]">
                            Projects
                            <UnderlineDoodle />
                        </h1>
                    </div>

                    <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-1">{DATA.profile.name} — Technical Projects</h1>
                        <p className="text-xs font-mono text-slate-600">Curated AI, Deep Learning, IoT &amp; Full-Stack Case Studies</p>
                    </div>

                    <div className="relative max-w-xl mb-10 print:hidden">
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-light leading-relaxed pr-16">
                            From agentic educational platforms to edge-AI waste segregation and digital forensics — each project addresses a grounded, real-world engineering challenge.
                        </p>
                        <BulbDoodle className="absolute -top-6 -right-12 text-yellow-500/20 hidden md:block w-16 h-16" />
                    </div>

                    {/* Top Toolbar: View Mode & Layout Switcher */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 print:hidden">
                        <div className="bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 inline-flex shadow-sm">
                            <button
                                onClick={() => setViewMode("curated")}
                                className={cn(
                                    "px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                                    viewMode === "curated"
                                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                )}
                            >
                                Curated Projects
                            </button>
                            <button
                                onClick={() => setViewMode("github")}
                                className={cn(
                                    "px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                                    viewMode === "github"
                                        ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                )}
                            >
                                Live GitHub Repos
                            </button>
                        </div>

                        {viewMode === "curated" && (
                            <div className="inline-flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                                <button
                                    onClick={() => setLayoutMode("grid")}
                                    className={cn(
                                        "p-1.5 rounded transition-colors",
                                        layoutMode === "grid"
                                            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                    )}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setLayoutMode("list")}
                                    className={cn(
                                        "p-1.5 rounded transition-colors",
                                        layoutMode === "list"
                                            ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                                            : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                    )}
                                    aria-label="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {viewMode === "curated" ? (
                        <>
                            {/* Skills Mapping Component */}
                            <div className="mb-10 print:hidden">
                                <InteractiveSkillsMatrix
                                    selectedSkill={selectedSkill}
                                    onSelectSkill={(skill) => {
                                        setSelectedSkill(skill);
                                        if (skill) {
                                            setActiveCategory("All");
                                        }
                                    }}
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2 mb-10 md:mb-12 print:hidden">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setSelectedSkill(null);
                                        }}
                                        className={cn(
                                            "px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full border transition-all duration-300",
                                            activeCategory === category
                                                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm"
                                                : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Grid View */}
                            {layoutMode === "grid" && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                                    {filteredProjects.map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            id={project.id}
                                            title={project.title}
                                            description={project.description}
                                            problemStatement={project.problemStatement}
                                            contribution={project.contribution}
                                            status={project.status}
                                            techStack={project.techStack}
                                            image={project.image}
                                            category={project.category}
                                            github={project.github}
                                            link={project.link}
                                            onOpenDrawer={handleOpenDrawerById}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* List View */}
                            {layoutMode === "list" && (
                                <div className="space-y-2 mb-16">
                                    {filteredProjects.map((project, index) => {
                                        const isRoleMatch = role && project.roles.includes(role);
                                        return (
                                            <div
                                                key={project.id}
                                                className="page-break-avoid"
                                            >
                                                <div
                                                    className="group cursor-pointer border-b border-slate-200/60 dark:border-slate-800 pb-4 print:pb-6"
                                                    onMouseEnter={() => setHoveredId(project.id)}
                                                    onMouseLeave={() => setHoveredId(null)}
                                                    onClick={() => handleOpenDrawer(project)}
                                                >
                                                    {/* Title Row */}
                                                    <div className="py-6 md:py-8 flex items-center justify-between gap-4">
                                                        <div className="flex items-baseline gap-3 md:gap-5 min-w-0">
                                                            <span className="text-[10px] font-mono text-slate-400 tracking-wider shrink-0 print:hidden">
                                                                ({String(index + 1).padStart(2, "0")})
                                                            </span>
                                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 truncate leading-tight uppercase flex items-center gap-2">
                                                                {project.title}
                                                                {isRoleMatch && (
                                                                    <span className="inline-flex items-center gap-1 text-[9px] bg-indigo-100/80 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase scale-90 origin-left print:hidden border border-indigo-200/50">
                                                                        <SparkleDoodle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                                                        Top Match
                                                                    </span>
                                                                )}
                                                            </h3>
                                                        </div>

                                                        <div className="flex items-center gap-3 shrink-0 print:hidden">
                                                            <span className="hidden md:block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                                                {project.category}
                                                            </span>
                                                            <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 dark:group-hover:bg-white dark:group-hover:border-white transition-all duration-300">
                                                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all duration-300" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Print-Only Description */}
                                                    <div className="hidden print:block pl-2 space-y-2">
                                                        <p className="text-xs text-slate-700 leading-relaxed font-light">
                                                            {project.description}
                                                        </p>
                                                        <div className="text-[9px] text-slate-500 font-mono">
                                                            Stack: {project.techStack.join(", ")}
                                                        </div>
                                                    </div>

                                                    {/* Image Reveal on Hover (Web Only) */}
                                                    <AnimatePresence>
                                                        {hoveredId === project.id && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                                className="overflow-hidden print:hidden"
                                                            >
                                                                <div className="pb-6 md:pb-8">
                                                                    <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-slate-900">
                                                                        <Image
                                                                            src={project.image}
                                                                            alt={project.title}
                                                                            fill
                                                                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                                                            sizes="(max-width: 768px) 100vw, 1200px"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                                                                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                                                            <p className="text-white/90 text-xs md:text-sm max-w-2xl leading-relaxed font-light">
                                                                                {project.problemStatement || project.description}
                                                                            </p>
                                                                            <div className="flex gap-1.5 shrink-0 ml-4">
                                                                                {project.techStack.slice(0, 3).map((tech) => (
                                                                                    <span key={tech} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[9px] text-white font-mono">
                                                                                        {tech}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {filteredProjects.length === 0 && (
                                <div className="text-center py-20 text-slate-400 text-sm">
                                    No projects found matching these filters.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="print:hidden">
                            <GitHubDashboard />
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar drawer details */}
            <ProjectDrawer
                project={selectedProject}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
}
