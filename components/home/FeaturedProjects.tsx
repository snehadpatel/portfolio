"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
    const featured = DATA.projects.slice(0, 3);

    return (
        <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                            Featured Work
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A selection of projects that showcase my passion for building scalable, AI-driven solutions.
                        </p>
                    </div>
                    <Button variant="ghost" asChild className="group">
                        <Link href="/projects">
                            View All Projects
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
