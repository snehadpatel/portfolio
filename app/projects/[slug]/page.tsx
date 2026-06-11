"use client";

import { use } from 'react';
import Link from "next/link";
import { notFound } from "next/navigation";
import { DATA } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Lightbulb, Trophy } from "lucide-react";
import PipelineVisualizer from "@/components/projects/PipelineVisualizer";

const PROJECT_IMAGES: Record<string, string> = {
    deepshield: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    "vegetable-classifier": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=1000&q=80",
    greensort: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    "supplier-ranking": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    "suicide-prediction": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80"
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = DATA.projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    const imageUrl = PROJECT_IMAGES[project.id] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80";

    return (
        <article className="min-h-screen pb-20 bg-[#F8F9FC]">
            {/* Cinematic Hero Banner */}
            <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden border-b border-slate-200/50 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FC] via-[#F8F9FC]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FC]/20 via-transparent to-[#F8F9FC]/10" />
                
                {/* Back Link Overlay */}
                <div className="absolute top-28 left-6 md:left-12 z-20">
                    <Link href="/projects" className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-slate-700 hover:text-slate-900 px-4 py-2 rounded-full bg-white/90 border border-slate-200/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.03]">
                        <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Projects
                    </Link>
                </div>
            </div>

            {/* Project Quick Facts Header */}
            <div className="container mx-auto px-6 pt-12 mb-12">
                <div className="grid lg:grid-cols-3 gap-12 items-end">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 text-[10px] font-semibold bg-white border border-slate-200/60 text-slate-600 rounded-full font-mono uppercase tracking-wider shadow-sm">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight uppercase leading-[0.9]">
                            {project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                            {project.extended?.overview || project.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end pt-4 lg:pt-0">
                        {project.link && project.link !== "#" && (
                            <Button size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm" asChild>
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                </Link>
                            </Button>
                        )}
                        {project.github && project.github !== "#" && (
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-sm" asChild>
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" /> View Code
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Features */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                            <Layers className="w-6 h-6 text-indigo-500" /> Key Features
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 p-4 border border-slate-200/50 rounded-xl bg-white/70 shadow-sm text-slate-700">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                    <span className="text-sm font-light leading-relaxed">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Tech Stack Display */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading mb-6 text-slate-900 uppercase">Built With</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-slate-100 border border-slate-200/50 rounded-lg text-sm font-medium text-slate-600 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>


                    {/* Extended Details (Architecture, Challenges, etc) */}
                    {project.extended && (
                        <>
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900 uppercase">
                                    <Layers className="w-6 h-6 text-indigo-500" /> System Architecture
                                </h2>
                                <PipelineVisualizer projectId={project.id} />
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                                    <Lightbulb className="w-6 h-6 text-amber-500" /> Challenges & Learnings
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/60">
                                        <h3 className="font-bold mb-3 text-slate-800">Challenges Surmounted</h3>
                                        <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm font-light leading-relaxed">
                                            {project.extended.challenges && project.extended.challenges.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-2 text-slate-800">Key Takeaways</h3>
                                        <p className="text-slate-600 italic font-light leading-relaxed pl-4 border-l-2 border-slate-200">
                                            &quot;{project.extended.learnings}&quot;
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-slate-900 uppercase">
                                    <Trophy className="w-6 h-6 text-indigo-500" /> Impact & Results
                                </h2>
                                <p className="text-lg text-slate-800 border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50/40 rounded-r-md font-light leading-relaxed">
                                    {project.extended.results}
                                </p>
                            </section>
                        </>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="p-6 border border-slate-200/60 rounded-2xl bg-white/70 shadow-sm sticky top-24">
                        <h3 className="font-bold mb-4 text-slate-800 font-heading text-lg">Project Info</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <div className="text-slate-400 mb-1 font-mono text-xs">Role</div>
                                <div className="font-medium text-slate-800">Full Stack Developer</div>
                            </div>
                            <div>
                                <div className="text-slate-400 mb-1 font-mono text-xs">Timeline</div>
                                <div className="font-medium text-slate-800">3 Months</div>
                            </div>
                            <div>
                                <div className="text-slate-400 mb-1 font-mono text-xs">Status</div>
                                <div className="font-medium text-indigo-600 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
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
