"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for Internships & Projects
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 leading-[1.1]">
                        Transforming <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Ideas into Intelligence
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                        {DATA.profile.tagline}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="rounded-full" asChild>
                            <Link href="/projects">
                                View My Work <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full" asChild>
                            <Link href={DATA.profile.resumeUrl || "#"} target="_blank">
                                <Download className="mr-2 w-4 h-4" /> Download Resume
                            </Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="rounded-full" asChild>
                            <Link href={DATA.profile.github} target="_blank">
                                GitHub Profile
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Visual/Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        {/* Decorative Code/Abstract UI Block */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white border border-white/50 shadow-2xl rounded-3xl p-8 flex flex-col gap-4 backdrop-blur-sm rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="space-y-3 font-mono text-sm text-slate-400">
                                <div className="h-4 bg-slate-100 rounded w-3/4" />
                                <div className="h-4 bg-slate-100 rounded w-1/2" />
                                <div className="h-4 bg-slate-100 rounded w-full" />
                                <div className="h-4 bg-slate-100 rounded w-5/6" />
                            </div>
                            <div className="mt-auto p-4 bg-slate-900 rounded-xl text-white">
                                <div className="text-xs text-slate-400 mb-1">AI Confidence Score</div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-accent">98.5%</span>
                                    <span className="text-sm text-green-400 mb-1">↑ 2.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
