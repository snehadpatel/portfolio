"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { ArrowRight, Download } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
    // 3D Tilt Effect setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Staggered text variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
            {/* Structural Background Accents */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[1px] h-1/2 bg-slate-900/[0.015]" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-900/[0.015]" />
                
                {/* Subtle ambient light for the hero */}
                <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="lg:col-span-7"
                >
                    <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/60 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8 border border-indigo-100/50 backdrop-blur-md shadow-[0_4px_20px_rgba(94,96,231,0.06)] spotlight-border-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative z-10" />
                        Available for Internships
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-8 leading-[0.9] uppercase">
                        <motion.div variants={item} className="bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 pb-2">SNEHA</motion.div>
                        <motion.div variants={item} className="text-indigo-600/35 mt-[-10px]">PATEL</motion.div>
                    </h1>

                    <div className="border-t border-slate-200/80 pt-6 max-w-xl">
                        <motion.p variants={item} className="text-xs text-indigo-600 font-semibold uppercase tracking-widest font-mono mb-3">
                            {"// B.TECH COMPUTER SCIENCE & ENGINEERING"}
                        </motion.p>
                        <motion.p variants={item} className="text-xl text-slate-600 font-normal leading-relaxed mb-8">
                            {DATA.profile.tagline}
                        </motion.p>
                    </div>

                    <motion.div variants={item} className="flex flex-wrap gap-4 mt-4">
                        <MagneticButton>
                            <Link
                                href="/projects"
                                className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(15,23,42,0.12)] flex items-center gap-2 group"
                            >
                                View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <Link
                                href="/assets/resume.pdf"
                                target="_blank"
                                className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-200 transition-all duration-300 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Resume
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Wireframe Console Mockup with 3D Tilt */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="relative hidden lg:block lg:col-span-5 perspective-1000"
                >
                    {/* Decorative Console Block */}
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full aspect-[4/5] max-w-sm mx-auto glass-card border border-slate-200/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between cursor-default group overflow-hidden"
                    >
                        {/* Shimmer gradient effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 pointer-events-none transition-opacity bg-gradient-to-tr from-indigo-500/0 via-indigo-500/3 to-indigo-500/0 translate-z-[-10px]" />

                        <div className="absolute inset-x-0 top-0 h-10 border-b border-slate-200/40 flex items-center px-4 justify-between bg-slate-50/80" style={{ transform: "translateZ(10px)" }}>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-red-400 transition-colors" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-amber-400 transition-colors" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-green-400 transition-colors" />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">deepshield.py</span>
                        </div>

                        <div className="space-y-3 font-mono text-[10px] text-slate-600 mt-10 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                            <div><span className="text-slate-300">01</span> <span className="text-indigo-600 font-semibold">import</span> torch</div>
                            <div><span className="text-slate-300">02</span> <span className="text-indigo-600 font-semibold">from</span> deepshield.models <span className="text-indigo-600 font-semibold">import</span> ViT</div>
                            <div><span className="text-slate-300">03</span> <span className="text-indigo-600 font-semibold">from</span> deepshield.forensics <span className="text-indigo-600 font-semibold">import</span> ELA</div>
                            <div><span className="text-slate-300">04</span> </div>
                            <div><span className="text-slate-300">05</span> <span className="text-slate-400 italic"># Run deepfake forensics</span></div>
                            <div><span className="text-slate-300">06</span> features = ELA(image_path)</div>
                            <div><span className="text-slate-300">07</span> model = ViT.load_pretrained()</div>
                            <div><span className="text-slate-300">08</span> score = model.predict(features)</div>
                        </div>

                        <div className="border-t border-slate-200/40 pt-4 mt-6 bg-slate-50/50 -mx-6 px-6 -mb-6 pb-6 rounded-b-2xl backdrop-blur-md" style={{ transform: "translateZ(30px)" }}>
                            <div className="flex justify-between items-center text-xs font-mono mb-2">
                                <span className="text-slate-500">Forensics Metric:</span>
                                <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-md text-[10px]">Passed</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">ViT Accuracy</span>
                                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-700 tracking-tighter font-heading">97.5%</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
