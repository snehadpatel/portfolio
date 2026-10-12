"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { DATA } from "@/lib/data";

export default function ResearchCallout() {
    return (
        <section className="section-padding border-t border-slate-200/50" id="research">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="txt-cursive text-lg text-slate-400 block mb-2">
                            academic work
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-tight">
                            Research &amp; Publications
                        </h2>
                        <p className="text-sm md:text-base text-slate-500 font-light mt-2 max-w-2xl">
                            Investigating applied machine learning at the edge and longitudinal decision support architectures.
                        </p>
                    </motion.div>
                </div>

                {/* Research Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {DATA.research.map((item, index) => {
                        const isAccepted = item.status.includes("Presented") || item.status.includes("Accepted");
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    {/* Top Status & Area */}
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/60">
                                            {item.area}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                                isAccepted
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50"
                                                    : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50"
                                            }`}
                                        >
                                            {isAccepted ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 leading-snug">
                                        {item.title}
                                    </h3>

                                    {/* Authors & Venue */}
                                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-mono">
                                        <p>
                                            <span className="text-slate-400 dark:text-slate-500">Authors:</span>{" "}
                                            {item.authors.join(", ")}
                                        </p>
                                        <p>
                                            <span className="text-slate-400 dark:text-slate-500">Venue:</span>{" "}
                                            <strong className="text-slate-700 dark:text-slate-300 font-semibold">{item.venue}</strong>
                                        </p>
                                        {item.guide && (
                                            <p className="text-[11px] text-slate-400">
                                                <span>Advisory:</span> {item.guide}
                                            </p>
                                        )}
                                    </div>

                                    {/* Abstract */}
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed bg-slate-50/60 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                                        {item.abstract}
                                    </p>

                                    {/* Highlights */}
                                    {item.highlights && item.highlights.length > 0 && (
                                        <ul className="space-y-1.5 pt-1">
                                            {item.highlights.map((h, i) => (
                                                <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 font-mono flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
                                    {item.paperUrl ? (
                                        <a
                                            href={item.paperUrl}
                                            download
                                            className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Download Manuscript
                                        </a>
                                    ) : (
                                        <span className="text-[11px] font-mono text-slate-400 italic">
                                            Manuscript in preparation
                                        </span>
                                    )}

                                    {item.projectId && (
                                        <Link
                                            href={`/projects/${item.projectId}`}
                                            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            <span>View Project Architecture</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
