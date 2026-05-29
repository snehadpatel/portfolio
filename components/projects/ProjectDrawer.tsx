"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Layers, CheckCircle2, ShieldAlert } from "lucide-react";
import { Project } from "@/lib/data";
import InteractiveDemo from "./InteractiveDemo";
import { Button } from "@/components/ui/Button";

interface ProjectDrawerProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const PROJECT_IMAGES: Record<string, string> = {
    deepshield: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    "vegetable-classifier": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=1000&q=80",
    greensort: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    "supplier-ranking": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    "suicide-prediction": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80"
};

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
    // Escape key handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;
    const imageUrl = PROJECT_IMAGES[project.id] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar Drawer Container */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="drawer-title"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 220 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl md:max-w-2xl bg-zinc-950 border-l border-white/10 z-50 overflow-y-auto shadow-2xl flex flex-col"
                    >
                        {/* 1. Cinematic Header Banner */}
                        <div className="relative h-60 md:h-72 w-full overflow-hidden shrink-0 border-b border-white/10">
                            {/* Ken Burns Animated Image */}
                            <motion.img
                                src={imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                animate={{
                                    scale: [1.02, 1.12, 1.02],
                                    x: [0, -10, 0],
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            {/* Soft dark gradient vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                            
                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Header Info Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-2.5 py-1 text-[9px] font-semibold bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-full font-mono uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <h1 
                                    id="drawer-title" 
                                    className="text-2xl md:text-3xl font-extrabold font-heading text-white mt-3 uppercase tracking-tight"
                                >
                                    {project.title}
                                </h1>
                            </div>
                        </div>

                        {/* 2. Scrollable Body Content */}
                        <div className="p-6 md:p-8 space-y-10 flex-1 overflow-y-auto">
                            {/* Overview */}
                            <section className="space-y-3">
                                <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">// Project Overview</h2>
                                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                                    {project.extended?.overview || project.description}
                                </p>
                            </section>

                            {/* Quick Links */}
                            <div className="grid grid-cols-2 gap-3 pb-2">
                                {project.link && project.link !== "#" && (
                                    <Button variant="default" className="w-full text-xs font-bold" asChild>
                                        <Link href={project.link} target="_blank">
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" /> Live Demo
                                        </Link>
                                    </Button>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Button variant="outline" className="w-full text-xs font-bold" asChild>
                                        <Link href={project.github} target="_blank">
                                            <Github className="w-3.5 h-3.5 mr-2" /> Source Code
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* Key Features */}
                            <section className="space-y-4">
                                <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5" /> Key Architecture Features
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-[11px] text-zinc-300 leading-normal">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Technology Stack */}
                            <section className="space-y-3">
                                <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">// Technology Integration</h2>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded text-[10px] font-mono text-zinc-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Live Working Simulator (Interactive Sandbox) */}
                            <section className="space-y-3">
                                <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">// Sandbox Environment</h2>
                                <InteractiveDemo projectId={project.id} />
                            </section>

                            {/* Extended Tech details */}
                            {project.extended && (
                                <section className="space-y-4 border-t border-white/5 pt-6">
                                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                                        <ShieldAlert className="w-3.5 h-3.5" /> System Pipeline
                                    </h2>
                                    <div className="p-4 bg-black border border-white/5 rounded-xl font-mono text-[10px] text-zinc-400 leading-relaxed overflow-x-auto select-all">
                                        {project.extended.architecture}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                                        <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5">
                                            <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Key Challenges</h4>
                                            <ul className="list-disc list-inside space-y-1.5 text-[10px] text-zinc-400">
                                                {project.extended.challenges.map((c, i) => (
                                                    <li key={i}>{c}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Takeaway</h4>
                                                <p className="text-[10px] text-zinc-400 italic">
                                                    "{project.extended.learnings}"
                                                </p>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                                                RESULT: {project.extended.results}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </ AnimatePresence>
    );
}
