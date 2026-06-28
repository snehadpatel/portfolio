"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { SparkleDoodle } from "@/components/ui/Doodles";

export default function ResearchCallout() {
    return (
        <section className="py-16 md:py-20 px-6 md:px-10">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-8 md:p-12 shadow-xl"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-xl" />
                    <SparkleDoodle className="absolute top-6 right-8 w-6 h-6 text-amber-300/80 hidden md:block" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-7 h-7 text-white/90" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <span className="text-[10px] font-mono text-indigo-200/80 uppercase tracking-widest">
                                Published Research
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-white leading-tight">
                                GreenSort: Integrated IoT &amp; Deep Learning for Real-Time Municipal Solid Waste Segregation
                            </h3>
                            <p className="text-sm text-indigo-100/70 font-light leading-relaxed max-w-2xl">
                                Accepted at <span className="font-semibold text-white/90">SustainX 2026</span> — a multi-sensor IoT pipeline
                                with edge-deployed ResNet achieving 90% mAP, ultrasonic telemetry, and dynamic route optimization
                                for the Vadodara Municipal Corporation.
                            </p>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/projects/greensort"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 border border-white/10 shrink-0"
                        >
                            Read More
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
