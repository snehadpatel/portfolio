"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
            {/* Structural Background Accents */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[1px] h-1/2 bg-white/[0.02]" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.02]" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-8 border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Available for Internships
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-8 leading-[0.9] text-white uppercase">
                        SNEHA <br />
                        <span className="text-zinc-600">PATEL</span>
                    </h1>

                    <div className="border-t border-white/10 pt-6 max-w-xl">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">
                            // B.TECH COMPUTER SCIENCE & ENGINEERING
                        </p>
                        <p className="text-xl text-zinc-300 font-light leading-relaxed mb-8">
                            {DATA.profile.tagline}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/projects"
                            className="px-6 py-3 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg flex items-center gap-2"
                        >
                            View Work <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            href={DATA.profile.resumeUrl || "#"}
                            target="_blank"
                            className="px-6 py-3 bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 transition-all duration-300 flex items-center gap-2"
                        >
                            <Download className="w-3.5 h-3.5" /> Resume
                        </Link>
                    </div>
                </motion.div>

                {/* Wireframe Console Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="relative hidden lg:block lg:col-span-5 animate-float"
                >
                    {/* Decorative Console Block */}
                    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between">
                        <div className="absolute inset-x-0 top-0 h-10 border-b border-white/5 flex items-center px-4 justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono">deepshield.py</span>
                        </div>

                        <div className="space-y-3 font-mono text-[10px] text-zinc-400 mt-8 leading-relaxed">
                            <div><span className="text-zinc-600">01</span> <span className="text-white">import</span> torch</div>
                            <div><span className="text-zinc-600">02</span> <span className="text-white">from</span> deepshield.models <span className="text-white">import</span> ViT</div>
                            <div><span className="text-zinc-600">03</span> <span className="text-white">from</span> deepshield.forensics <span className="text-white">import</span> ELA</div>
                            <div><span className="text-zinc-600">04</span> </div>
                            <div><span className="text-zinc-600">05</span> <span className="text-zinc-500"># Run deepfake forensics</span></div>
                            <div><span className="text-zinc-600">06</span> features = ELA(image_path)</div>
                            <div><span className="text-zinc-600">07</span> model = ViT.load_pretrained()</div>
                            <div><span className="text-zinc-600">08</span> score = model.predict(features)</div>
                        </div>

                        <div className="border-t border-white/5 pt-4 mt-6">
                            <div className="flex justify-between items-center text-xs font-mono mb-2">
                                <span className="text-zinc-500">Forensics Metric:</span>
                                <span className="text-emerald-400 font-bold">Passed</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">ViT Accuracy</span>
                                <span className="text-3xl font-extrabold text-white tracking-tighter font-heading">97.5%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
