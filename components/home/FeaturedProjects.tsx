"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { DATA } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
    const featured = DATA.projects;
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="section-padding relative">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="txt-cursive text-lg md:text-xl text-slate-400 block mb-2">selected work</span>
                    </motion.div>
                </div>

                {/* Stacked Project List */}
                <div className="space-y-0">
                    {featured.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <Link
                                href={project.github}
                                target="_blank"
                                className="group block"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Project Title Row */}
                                <div className="py-6 md:py-8 flex items-center justify-between gap-4">
                                    <div className="flex items-baseline gap-3 md:gap-5 min-w-0">
                                        <span className="text-[10px] font-mono text-slate-400 tracking-wider shrink-0">
                                            ({String(index + 1).padStart(2, "0")})
                                        </span>
                                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 truncate leading-tight uppercase">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="hidden md:block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
                                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Reveal on Hover */}
                                <AnimatePresence>
                                    {hoveredId === project.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 md:pb-8">
                                                <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-slate-100">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                                        sizes="(max-width: 768px) 100vw, 1200px"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />

                                                    {/* Overlay info */}
                                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                                        <p className="text-white/90 text-xs md:text-sm max-w-2xl leading-relaxed font-light">
                                                            {project.description}
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
                            </Link>

                            {/* Divider */}
                            <div className="divider-line" />
                        </motion.div>
                    ))}
                </div>

                {/* More Work CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-14"
                >
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-700 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300"
                    >
                        All Projects
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
