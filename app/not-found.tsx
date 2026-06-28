"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { UnderlineDoodle, SparkleDoodle } from "@/components/ui/Doodles";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Big 404 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-8"
            >
                <h1 className="text-[8rem] md:text-[12rem] font-extrabold font-heading tracking-tighter text-slate-200/60 leading-none select-none">
                    404
                </h1>
                <SparkleDoodle className="absolute -top-4 -right-4 w-8 h-8 text-amber-400/80" />
            </motion.div>

            {/* Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center max-w-md"
            >
                <h2 className="relative inline-block text-2xl md:text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 mb-4">
                    Page Not Found
                    <UnderlineDoodle />
                </h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">
                    Looks like this page got lost somewhere between the neural network layers.
                    Let&apos;s get you back to familiar territory.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                    >
                        Back to Home
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300"
                    >
                        View Work
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                        </svg>
                    </Link>
                </div>
            </motion.div>

            {/* Decorative Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
                <span className="text-[20rem] md:text-[30rem] font-extrabold font-heading tracking-tighter text-slate-100/30 select-none leading-none">
                    ?
                </span>
            </div>
        </div>
    );
}
