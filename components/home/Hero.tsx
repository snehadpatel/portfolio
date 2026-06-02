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
                <div className="absolute top-1/4 left-1/4 w-[1px] h-1/2 bg-white/[0.03]" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.03]" />
                
                {/* Subtle ambient light for the hero */}
                <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="lg:col-span-7"
                >
                    <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-8 border border-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)] spotlight-border-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 relative z-10" />
                        Available for Internships
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-8 leading-[0.9] uppercase">
                        <motion.div variants={item} className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/40 pb-2">SNEHA</motion.div>
                        <motion.div variants={item} className="text-zinc-500/80 mt-[-10px]">PATEL</motion.div>
                    </h1>

                    <div className="border-t border-white/10 pt-6 max-w-xl">
                        <motion.p variants={item} className="text-xs text-accent uppercase tracking-widest font-mono mb-3">
                            {"// B.TECH COMPUTER SCIENCE & ENGINEERING"}
                        </motion.p>
                        <motion.p variants={item} className="text-xl text-zinc-300 font-light leading-relaxed mb-8">
                            {DATA.profile.tagline}
                        </motion.p>
                    </div>

                    <motion.div variants={item} className="flex flex-wrap gap-4 mt-4">
                        <MagneticButton>
                            <Link
                                href="/projects"
                                className="px-7 py-3.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2 group"
                            >
                                View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <Link
                                href="/assets/resume.pdf"
                                target="_blank"
                                className="px-7 py-3.5 bg-zinc-900/50 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
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
                        className="relative w-full aspect-[4/5] max-w-sm mx-auto glass-card border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between cursor-crosshair group overflow-hidden"
                    >
                        {/* Shimmer gradient effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 pointer-events-none transition-opacity bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-z-[-10px]" />

                        <div className="absolute inset-x-0 top-0 h-10 border-b border-white/10 flex items-center px-4 justify-between bg-black/20" style={{ transform: "translateZ(10px)" }}>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-red-400 transition-colors" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-amber-400 transition-colors" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-green-400 transition-colors" />
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono">deepshield.py</span>
                        </div>

                        <div className="space-y-3 font-mono text-[10px] text-zinc-400 mt-10 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                            <div><span className="text-zinc-600">01</span> <span className="text-accent">import</span> torch</div>
                            <div><span className="text-zinc-600">02</span> <span className="text-accent">from</span> deepshield.models <span className="text-accent">import</span> ViT</div>
                            <div><span className="text-zinc-600">03</span> <span className="text-accent">from</span> deepshield.forensics <span className="text-accent">import</span> ELA</div>
                            <div><span className="text-zinc-600">04</span> </div>
                            <div><span className="text-zinc-600">05</span> <span className="text-zinc-500 italic"># Run deepfake forensics</span></div>
                            <div><span className="text-zinc-600">06</span> features = ELA(image_path)</div>
                            <div><span className="text-zinc-600">07</span> model = ViT.load_pretrained()</div>
                            <div><span className="text-zinc-600">08</span> score = model.predict(features)</div>
                        </div>

                        <div className="border-t border-white/10 pt-4 mt-6 bg-black/10 -mx-6 px-6 -mb-6 pb-6 rounded-b-2xl backdrop-blur-md" style={{ transform: "translateZ(30px)" }}>
                            <div className="flex justify-between items-center text-xs font-mono mb-2">
                                <span className="text-zinc-400">Forensics Metric:</span>
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-sm">Passed</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">ViT Accuracy</span>
                                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter font-heading">97.5%</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
