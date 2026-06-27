"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UnderlineDoodle, SparkleDoodle, SignatureDoodle } from "@/components/ui/Doodles";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";

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
                className="absolute -top-3 md:-top-4 -left-1 px-1 bg-indigo-500/80 text-white font-mono text-[7px] md:text-[8px] uppercase tracking-wider rounded-sm leading-none py-0.5"
            >
                {label}
            </motion.span>
        </span>
    );
}

// 3. Arrow pointing to "View Work"
function ArrowDoodle() {
    return (
        <div className="absolute right-full mr-6 bottom-4 w-24 h-16 pointer-events-none hidden lg:block text-indigo-400/80">
            {/* Cursive Label */}
            <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.1, duration: 0.4 }}
                className="absolute -top-4 left-1 txt-cursive text-xs text-indigo-500/80 select-none whitespace-nowrap"
            >
                my work
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

    // Dynamic config based on role
    const getHeroConfig = () => {
        if (role === "ml") {
            return {
                word1: "that see,",
                word2: "train",
                word3: "& act.",
                boxLabel: "train [99%]",
                subtitle: "I am Sneha Patel, a CS student specializing in Machine Learning & Computer Vision. I build deep neural networks (like a 97.5% accuracy Deepfake ViT pipeline) and optimize edge architectures for visual forensics and crop classification."
            };
        }
        if (role === "data") {
            return {
                word1: "that ingest,",
                word2: "learn",
                word3: "& query.",
                boxLabel: "query [99%]",
                subtitle: "I am Sneha Patel, a CS student specializing in Data Engineering & Analytics. I design relational and Neo4j graph databases to map distress sentiment patterns and construct decision intelligence ranking algorithms."
            };
        }
        if (role === "iot") {
            return {
                word1: "that see,",
                word2: "wire",
                word3: "& act.",
                boxLabel: "wire [99%]",
                subtitle: "I am Sneha Patel, a CS student specializing in IoT & Embedded Hardware. I engineer offline edge intelligence linking Raspberry Pi YOLOv8 vision units to Arduino-controlled servo flap controllers."
            };
        }
        if (role === "fullstack") {
            return {
                word1: "that see,",
                word2: "code",
                word3: "& act.",
                boxLabel: "code [99%]",
                subtitle: "I am Sneha Patel, a CS student specializing in Full-Stack development. I build high-fidelity Next.js web applications, client-side localStorage caching mechanisms, and robust FastAPI microservices."
            };
        }
        return {
            word1: "that see,",
            word2: "learn",
            word3: "& act.",
            boxLabel: "learn [99%]",
            subtitle: "I am Sneha Patel, a CS student at Navrachana University. I build computer vision pipelines and edge ML systems because I believe AI should solve real, physical-world problems and amplify human capabilities."
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
            <div className="w-full px-6 md:px-10 pt-28 pb-20 md:pt-32 md:pb-24">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-[1200px] mx-auto"
                >
                    {/* Availability tag */}
                    <motion.div variants={fadeIn} className="mb-10 md:mb-14 print:hidden">
                        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Open to Internships & Collaborations
                        </span>
                    </motion.div>

                    {/* Main Headline — oversized, multi-line, editorial */}
                    <div className="space-y-1 md:space-y-0">
                        <div className="overflow-hidden">
                            <motion.div variants={slideUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
                                <span className="txt-cursive text-[clamp(1.8rem,3.5vw,3.5rem)] text-slate-500 leading-none">
                                    I build
                                </span>
                                <h1 className="relative inline-block text-[clamp(3rem,7.5vw,7rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-slate-900">
                                    Intelligent
                                    <UnderlineDoodle />
                                    <SparkleDoodle className="absolute -top-7 -right-7 w-7 h-7 text-amber-400/90 hidden sm:block" />
                                </h1>
                            </motion.div>
                        </div>

                        <div className="overflow-hidden">
                            <motion.h1
                                variants={slideUp}
                                className="text-[clamp(3rem,7.5vw,7rem)] font-extrabold font-heading tracking-tighter leading-[0.85] uppercase text-slate-900"
                            >
                                Systems
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden">
                            <motion.div variants={slideUp} className="flex items-baseline gap-3 md:gap-5 flex-wrap">
                                <span className="txt-cursive text-[clamp(1.4rem,3vw,3rem)] text-slate-400 leading-none">
                                    {config.word1}
                                </span>
                                <h1 className="relative inline-block text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30 px-2">
                                    {config.word2}
                                    <BoundingBoxDoodle label={config.boxLabel} />
                                </h1>
                                <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30">
                                    {config.word3}
                                </h1>
                            </motion.div>
                        </div>
                    </div>

                    {/* Subtitle + CTAs */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-slate-200/60 pt-8"
                    >
                        <div className="max-w-lg relative pb-6 md:pb-0">
                            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-light">
                                {config.subtitle}
                            </p>
                            <SignatureDoodle className="absolute -bottom-10 right-4 text-indigo-500/40 hidden md:block" />
                        </div>

                        <div className="flex items-center gap-4 relative print:hidden">
                            <ArrowDoodle />
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                            >
                                View Work
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300"
                            >
                                Say Hello
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
