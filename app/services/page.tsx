"use client";

import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Eye, Brain, Cpu, Database, Check, ArrowRight } from "lucide-react";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Eye":
            return <Eye className="w-5 h-5 text-white" />;
        case "Brain":
            return <Brain className="w-5 h-5 text-white" />;
        case "Cpu":
            return <Cpu className="w-5 h-5 text-white" />;
        case "Database":
            return <Database className="w-5 h-5 text-white" />;
        default:
            return <Brain className="w-5 h-5 text-white" />;
    }
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Structural Background Accents */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-white/[0.01]" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="max-w-2xl mx-auto mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-white uppercase"
                    >
                        Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-base text-zinc-400 font-light leading-relaxed"
                    >
                        I collaborate with startups, labs, and teams to design, architect, and deploy intelligent edge hardware and software solutions.
                    </motion.p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {DATA.services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative flex flex-col justify-between p-8 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            <div>
                                {/* Icon Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.02]">
                                        {getIcon(service.icon)}
                                    </div>
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full">
                                        Contractual
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-heading mb-3 text-white">
                                    {service.title}
                                </h3>
                                
                                <p className="text-zinc-400 text-xs mb-8 leading-relaxed font-light">
                                    {service.description}
                                </p>

                                {/* Offerings Bullet List */}
                                <ul className="space-y-3.5 mb-8">
                                    {service.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded border border-white/10 bg-white/[0.01] flex items-center justify-center text-zinc-500 shrink-0 mt-0.5 font-mono text-[9px]">
                                                {i + 1}
                                            </div>
                                            <span className="text-xs text-zinc-300 font-light leading-snug">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Action */}
                            <Link 
                                href={`/contact?service=${service.id}`}
                                className="w-full mt-auto py-2.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                            >
                                Inquire Service <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 border border-white/5 bg-white/[0.01] rounded-2xl text-center relative overflow-hidden"
                >
                    <h3 className="text-2xl font-bold font-heading mb-4 text-white uppercase">Custom Requirements?</h3>
                    <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-light">
                        If your project spans multiple domains or requires specialized architectural design, let's schedule an engineering consultation call.
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-block px-6 py-3 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
                    >
                        Book Consultation
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
