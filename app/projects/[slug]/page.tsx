"use client";

import { use } from 'react';
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Lightbulb, Trophy } from "lucide-react";
import PipelineVisualizer from "@/components/projects/PipelineVisualizer";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = DATA.projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Header */}
            <div className="bg-secondary/30 border-b border-border pb-12 mb-12">
                <div className="container mx-auto px-6">
                    <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                                    {project.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{project.title}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.extended?.overview || project.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                                {project.link && project.link !== "#" && (
                                    <Button size="lg" className="w-full" asChild>
                                        <Link href={project.link} target="_blank">
                                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                        </Link>
                                    </Button>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Button variant="outline" size="lg" className="w-full" asChild>
                                        <Link href={project.github} target="_blank">
                                            <Github className="w-4 h-4 mr-2" /> View Code
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                            <Layers className="w-6 h-6 text-accent" /> Key Features
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/50">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Tech Stack Display */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading mb-6">Built With</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>


                    {/* Extended Details (Architecture, Challenges, etc) */}
                    {project.extended && (
                        <>
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                                    <Layers className="w-6 h-6 text-primary" /> System Architecture
                                </h2>
                                <PipelineVisualizer projectId={project.id} />
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                                    <Lightbulb className="w-6 h-6 text-yellow-500" /> Challenges & Learnings
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-secondary/20 p-6 rounded-xl border border-secondary">
                                        <h3 className="font-bold mb-3">Challenges Surmounted</h3>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                            {project.extended.challenges && project.extended.challenges.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2">Key Takeways</h3>
                                        <p className="text-muted-foreground italic">
                                            &quot;{project.extended.learnings}&quot;
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-orange-500" /> Impact & Results
                                </h2>
                                <p className="text-lg text-foreground border-l-4 border-accent pl-4 py-2 bg-accent/5">
                                    {project.extended.results}
                                </p>
                            </section>
                        </>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="p-6 border border-border rounded-2xl bg-secondary/30 sticky top-24">
                        <h3 className="font-bold mb-4">Project Info</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <div className="text-muted-foreground mb-1">Role</div>
                                <div className="font-medium">Full Stack Developer</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground mb-1">Timeline</div>
                                <div className="font-medium">3 Months</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground mb-1">Status</div>
                                <div className="font-medium text-green-600 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                    Completed
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
