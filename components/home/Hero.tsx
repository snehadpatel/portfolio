"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
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
                    <motion.div variants={fadeIn} className="mb-10 md:mb-14">
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
                                <h1 className="text-[clamp(3rem,7.5vw,7rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-slate-900">
                                    Intelligent
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
                                    that see,
                                </span>
                                <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30">
                                    learn
                                </h1>
                                <span className="txt-cursive text-[clamp(1.4rem,3vw,3rem)] text-slate-400 leading-none">
                                    &
                                </span>
                                <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold font-heading tracking-tighter leading-[0.9] uppercase text-indigo-600/30">
                                    act.
                                </h1>
                            </motion.div>
                        </div>
                    </div>

                    {/* Subtitle + CTAs */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-slate-200/60 pt-8"
                    >
                        <div className="max-w-lg">
                            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-light">
                                I am Sneha Patel, a CS student at Navrachana University.
                                I build computer vision pipelines and edge ML systems because
                                I believe AI should solve real, physical-world problems and amplify human capabilities.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
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
