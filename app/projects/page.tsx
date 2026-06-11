"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectDrawer from "@/components/projects/ProjectDrawer";
import { DATA, Project } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(DATA.projects.map((p) => p.category)))];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = (id: string) => {
        const proj = DATA.projects.find((p) => p.id === id);
        if (proj) {
            setSelectedProject(proj);
            setIsDrawerOpen(true);
        }
    };

    const filteredProjects =
        activeCategory === "All"
            ? DATA.projects
            : DATA.projects.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">
                        Featured Projects
                    </h1>
                    <p className="text-slate-500 text-lg font-light">
                        A deep dive into my technical journey. From full-stack applications to AI models, each project represents a unique problem solved.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "rounded-full text-xs uppercase tracking-wider font-semibold px-5 py-2 h-9",
                                activeCategory === category 
                                    ? "bg-slate-900 text-white hover:bg-slate-800 border-none" 
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard {...project} onOpenDrawer={handleOpenDrawer} />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found in this category.
                    </div>
                )}
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
