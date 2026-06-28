"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { CircleDoodle } from "@/components/ui/Doodles";
import { useState } from "react";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    context: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Sneha's supplier ranking model was immediately applicable to our logistics chain. The regression coefficients highlighted anomalous suppliers we'd missed for months.",
        name: "CEO, Mesh Works",
        role: "Hackathon Judge",
        context: "AI Supplier Ranking Agent — Hackathon Commendation",
    },
    {
        quote: "Her graph database integration mapped sentiment patterns our standard NLP pipeline couldn't detect. The Neo4j context pathways added a new dimension to our risk assessment.",
        name: "CSRBOX Mentorship Team",
        role: "Internship Supervisor",
        context: "NLP Crisis Context Mapper — Data Specialist Internship",
    },
    {
        quote: "Represented the institution in national-level championship, demonstrating exceptional autonomous robot design with real-time obstacle detection and path optimization.",
        name: "WSRO Nationals Panel",
        role: "Competition Review",
        context: "WSRO Nationals Robot Race — Autonomous Tracking Robot",
    },
];

export default function Testimonials() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="section-padding relative">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <span className="txt-cursive text-lg md:text-xl text-slate-400 block mb-2">what they said</span>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="space-y-0">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="py-8 md:py-10 grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                                {/* Number */}
                                <div className="md:col-span-1">
                                    <span className="relative inline-block text-sm font-mono text-slate-400 px-1">
                                        ({String(index + 1).padStart(2, "0")})
                                        <CircleDoodle isActive={hoveredIndex === index} className="text-indigo-400/80" />
                                    </span>
                                </div>

                                {/* Quote */}
                                <div className="md:col-span-7">
                                    <div className="relative">
                                        <Quote className="w-5 h-5 text-indigo-300/60 mb-3" />
                                        <p className="text-base md:text-lg text-slate-700 leading-relaxed font-light italic">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Attribution */}
                                <div className="md:col-span-4 flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-slate-800">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                        {item.role}
                                    </span>
                                    <span className="text-[10px] text-indigo-500/80 font-light mt-1">
                                        {item.context}
                                    </span>
                                </div>
                            </div>
                            <div className="divider-line" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
