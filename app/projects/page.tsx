"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { DATA } from "@/lib/data";
import { Button } from "@/components/ui/Button";

const categories = ["All", ...Array.from(new Set(DATA.projects.map((p) => p.category)))];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? DATA.projects
            : DATA.projects.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                        Featured Projects
                    </h1>
                    <p className="text-muted-foreground text-lg">
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
                            className="rounded-full"
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
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
