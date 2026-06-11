"use client";

import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Brain, Cpu, Database, ArrowRight } from "lucide-react";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Eye":
            return <Eye className="w-5 h-5 text-indigo-600" />;
        case "Brain":
            return <Brain className="w-5 h-5 text-indigo-600" />;
        case "Cpu":
            return <Cpu className="w-5 h-5 text-indigo-600" />;
        case "Database":
            return <Database className="w-5 h-5 text-indigo-600" />;
        default:
            return <Brain className="w-5 h-5 text-indigo-600" />;
    }
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#F8F9FC]">
            {/* Structural Background Accents */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-slate-900/[0.01]" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="max-w-2xl mx-auto mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-slate-900 uppercase"
                    >
                        Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-base text-slate-500 font-light leading-relaxed"
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
                            className="group relative flex flex-col justify-between p-8 bg-white/70 border border-slate-200/50 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all duration-500 overflow-hidden"
                        >
                            <div>
                                {/* Icon Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 bg-slate-50/50">
                                        {getIcon(service.icon)}
                                    </div>
                                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-full">
                                        Contractual
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-heading mb-3 text-slate-800">
                                    {service.title}
                                </h3>
                                
                                <p className="text-slate-550 text-xs mb-8 leading-relaxed font-light">
                                    {service.description}
                                </p>

                                {/* Offerings Bullet List */}
                                <ul className="space-y-3.5 mb-8">
                                    {service.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded border border-slate-200/80 bg-slate-50/50 flex items-center justify-center text-slate-500 shrink-0 mt-0.5 font-mono text-[9px]">
                                                {i + 1}
                                            </div>
                                            <span className="text-xs text-slate-600 font-light leading-snug">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Action */}
                            <Link 
                                href={`/contact?service=${service.id}`}
                                className="w-full mt-auto py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
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
                    className="mt-20 p-8 md:p-12 border border-slate-200/60 bg-white/70 shadow-sm rounded-2xl text-center relative overflow-hidden"
                >
                    <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900 uppercase">Custom Requirements?</h3>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-light">
                        If your project spans multiple domains or requires specialized architectural design, let&apos;s schedule an engineering consultation call.
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-block px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
                    >
                        Book Consultation
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
