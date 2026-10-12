"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { UnderlineDoodle, SparkleDoodle, SignatureDoodle } from "@/components/ui/Doodles";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { DATA } from "@/lib/data";

// 2. Bounding Box for dynamic label
interface BoundingBoxProps {
    label: string;
}

function BoundingBoxDoodle({ label }: BoundingBoxProps) {
    return (
        <span className="absolute -inset-1.5 md:-inset-2 pointer-events-none block">
            <svg
                className="w-full h-full text-indigo-400/80"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Hand-drawn box with organic bezier lines */}
                <motion.path
                    d="M -1 2 Q 50 0, 102 3"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 1.4, ease: "easeOut" }}
                />
                <motion.path
                    d="M 98 -1 Q 100 50, 97 102"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 1.7, ease: "easeOut" }}
                />
                <motion.path
                    d="M 101 98 Q 50 100, -2 97"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 2.0, ease: "easeOut" }}
                />
                <motion.path
                    d="M 2 101 Q 0 50, 3 -2"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 2.3, ease: "easeOut" }}
                />
            </svg>
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6, duration: 0.3 }}
                className="absolute -top-3 md:-top-4 -left-1 px-1.5 bg-indigo-600 text-white font-mono text-[7px] md:text-[8px] uppercase tracking-wider rounded-sm leading-none py-0.5 shadow-sm"
            >
                {label}
            </motion.span>
        </span>
    );
}

// 3. Arrow pointing to "View Projects"
function ArrowDoodle() {
    return (
        <div className="absolute right-full mr-6 bottom-4 w-24 h-16 pointer-events-none hidden xl:block text-indigo-400/80">
            {/* Cursive Label */}
            <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.1, duration: 0.4 }}
                className="absolute -top-4 left-1 txt-cursive text-xs text-indigo-500/80 select-none whitespace-nowrap"
            >
                featured work
            </motion.span>

            <svg
                className="w-full h-full"
                viewBox="0 0 100 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Curved Arrow Path */}
                <motion.path
                    d="M 10 10 Q 40 12, 80 42"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 2.6, ease: "easeOut" }}
                />
                {/* Arrow Head */}
                <motion.path
                    d="M 68 40 L 81 43 L 78 30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 3.1, ease: "easeOut" }}
                />
            </svg>
        </div>
    );
}

export default function Hero() {
    const { role } = useRecruiterMode();

    // Dynamic config based on recruiter role
    const getHeroConfig = () => {
        if (role === "ml") {
            return {
                word1: "that see,",
                word2: "train",
                word3: "& act.",
                boxLabel: "neural_net",
                subtitle:
                    "I am Sneha Patel, a Computer Science student specializing in Machine Learning, Deep Learning, and Computer Vision. I build neural architectures, digital media forensics pipelines, and edge vision models for real-world applications.",
            };
        }
        if (role === "data") {
            return {
                word1: "that ingest,",
                word2: "model",
                word3: "& query.",
                boxLabel: "graph_schema",
                subtitle:
                    "I am Sneha Patel, a Computer Science student specializing in Data Science and Analytics. I design relational and Neo4j graph database schemas to map complex behavioral patterns and develop interpretable decision intelligence models.",
            };
        }
        if (role === "iot") {
            return {
                word1: "that sense,",
                word2: "wire",
                word3: "& act.",
                boxLabel: "edge_core",
                subtitle:
                    "I am Sneha Patel, a Computer Science student specializing in IoT & Embedded Intelligence. I engineer physical computing prototypes linking Raspberry Pi edge vision units to Arduino microcontroller sensor arrays.",
            };
        }
        if (role === "fullstack") {
            return {
                word1: "that architect,",
                word2: "code",
                word3: "& deploy.",
                boxLabel: "async_api",
                subtitle:
                    "I am Sneha Patel, a Computer Science student specializing in AI Application Integration. I build responsive Next.js web applications, async FastAPI microservices, and interactive telemetry interfaces.",
            };
        }
        return {
            word1: "that see,",
            word2: "learn",
            word3: "& act.",
            boxLabel: "agent_node",
            subtitle:
                "I am Sneha Patel, a Computer Science student at Navrachana University and an AI/ML developer. I build practical AI systems, agentic architectures, and edge solutions bridging computer vision, machine learning, and physical hardware.",
        };
    };

    const config = getHeroConfig();

    // Staggered reveal animation
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
        },
    };

    const slideUp = {
        hidden: { y: "120%", opacity: 0 },
        show: {
            y: "0%",
            opacity: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="w-full px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-[1200px] mx-auto"
                >
                    {/* Availability tag */}
                    <motion.div variants={fadeIn} className="mb-8 md:mb-10 print:hidden flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 px-3 py-1 rounded-full shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Computer Science Student &amp; AI/ML Developer
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                            · B.Tech CSE @ Navrachana University (2027)
                        </span>
                    </motion.div>

                    {/* Main Headline — oversized, multi-line, editorial */}
                    <div className="space-y-1 md:space-y-0">
                        <div className="overflow-hidden">
                            <motion.div variants={slideUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
                                <span className="txt-cursive text-[clamp(1.8rem,3.5vw,3.5rem)] text-slate-500 leading-none">
                                    I build
                                </span>
                                <span className="relative inline-block text-[clamp(3rem,7.5vw,7rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-slate-900 dark:text-slate-100">
                                    Intelligent
                                    <UnderlineDoodle />
                                    <SparkleDoodle className="absolute -top-7 -right-7 w-7 h-7 text-amber-400/90 hidden sm:block" />
                                </span>
                            </motion.div>
                        </div>

                        <div className="overflow-hidden">
                            <motion.span
                                variants={slideUp}
                                className="block text-[clamp(3rem,7.5vw,7rem)] font-extrabold font-heading tracking-tighter leading-[0.85] uppercase text-slate-900 dark:text-slate-100"
                            >
                                Systems
                            </motion.span>
                        </div>

                        <div className="overflow-hidden">
                            <motion.div variants={slideUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
                                <span className="txt-cursive text-[clamp(1.4rem,3vw,3rem)] text-slate-400 leading-none">
                                    {config.word1}
                                </span>
                                <span className="relative inline-block text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30 dark:text-indigo-400/40 px-2">
                                    {config.word2}
                                    <BoundingBoxDoodle label={config.boxLabel} />
                                </span>
                                <span className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30 dark:text-indigo-400/40">
                                    {config.word3}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Subtitle + CTAs */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-10 md:mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-t border-slate-200/60 dark:border-slate-800/60 pt-8"
                    >
                        <div className="max-w-xl relative pb-4 lg:pb-0">
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                {config.subtitle}
                            </p>
                            <SignatureDoodle className="absolute -bottom-8 right-4 text-indigo-500/40 hidden md:block" />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 relative print:hidden">
                            <ArrowDoodle />
                            
                            {/* Primary: View Projects */}
                            <Link
                                href="/projects"
                                id="hero-view-projects-btn"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                            >
                                View Projects
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Download Resume (verified file exists) */}
                            {DATA.profile.resumeUrl && (
                                <a
                                    href={DATA.profile.resumeUrl}
                                    download="Sneha_Patel_Resume.pdf"
                                    id="hero-download-resume-btn"
                                    className="group inline-flex items-center gap-2 px-5 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-400 text-slate-700 dark:text-slate-200 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 bg-white/60 dark:bg-slate-900/40"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Resume
                                </a>
                            )}

                            {/* GitHub & LinkedIn Links */}
                            <div className="flex items-center gap-2 pl-2">
                                <a
                                    href={DATA.profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="hero-github-link"
                                    aria-label="GitHub Profile"
                                    className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 transition-colors bg-white/60 dark:bg-slate-900/40"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                                <a
                                    href={DATA.profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="hero-linkedin-link"
                                    aria-label="LinkedIn Profile"
                                    className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-colors bg-white/60 dark:bg-slate-900/40"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Focus Areas Pill Strip */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/40 flex flex-wrap items-center gap-2 print:hidden"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mr-2">
                            Focus:
                        </span>
                        {DATA.profile.focusAreas.map((area) => (
                            <span
                                key={area}
                                className="px-2.5 py-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-full"
                            >
                                {area}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
