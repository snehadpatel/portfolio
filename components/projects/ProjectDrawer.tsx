"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock, Users, Wrench } from "lucide-react";
import { Project } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import PipelineVisualizer from "./PipelineVisualizer";

interface ProjectDrawerProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const PROJECT_IMAGES: Record<string, string> = {
    deepshield: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    "vegetable-classifier": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=1000&q=80",
    greensort: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    "supplier-ranking": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    "suicide-prediction": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80"
};

const PROJECT_PIPELINES: Record<string, string> = {
    deepshield: 
`  [ Next.js Frontend ] ─────────( Image Upload )────────> [ FastAPI Gateway ]
                                                                 │
                                                       ( Forensic Extraction )
                                                                 ▼
  [ Grad-CAM Visualizer ] <────( Ensemble ViT Model )──── [ ELA & DCT Analysis ]`,

    "vegetable-classifier": 
`  [ Crop Camera Feed ] ───────( Capture Frame )───────> [ Background Subtractor ]
                                                                 │
                                                       ( HSV class filtering )
                                                                 ▼
  [ Predicted Variety ] <──────( PyTorch ResNet18 )────── [ 224x224 Normalized ]`,

    greensort: 
`  [ Ultrasonic Trigger ] ────────( Pi Camera )────────> [ YOLOv8 Edge Detector ]
                                                                 │
                                                       ( Cat: Recycled/Bio/Haz )
                                                                 ▼
  [ Physical Flaps Servo ] <─────( Serial Port )─────── [ Arduino Controller ]`,

    "suicide-prediction": 
`  [ Crisis Text Input ] ─────────( Clean Text )─────────> [ NLP TF-IDF Vector ]
                                                                 │
                                                        ( Sentiment Polarity )
                                                                 ▼
  [ Relationship Graph ] <──────( Neo4j Query )───────── [ Scikit-Learn Model ]`,

    "supplier-ranking": 
`  [ Supplier Telemetry ] ───────( Logistics CSV )───────> [ pandas Dataframes ]
                                                                 │
                                                         ( Delay & Defect Calc )
                                                                 ▼
  [ Ranked Scorecard ] <──────( Regression Engine )────── [ Performance Index ]`
};

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-center gap-3 mb-6 relative">
        <span className="font-mono text-[9px] text-indigo-500 uppercase tracking-widest">{num} .</span>
        <h2 className="text-xl font-heading font-normal italic text-slate-800 tracking-wide">{title}</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-2" />
    </div>
);

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
    // Escape key handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;
    const imageUrl = PROJECT_IMAGES[project.id] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar Drawer Container */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="drawer-title"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 220 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl md:max-w-2xl bg-white border-l border-slate-200/80 z-50 overflow-y-auto shadow-2xl flex flex-col"
                    >
                        {/* Cinematic Header Banner */}
                        <div className="relative h-60 md:h-72 w-full overflow-hidden shrink-0 border-b border-slate-200/50">
                            <motion.img
                                src={imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                animate={{
                                    scale: [1.02, 1.12, 1.02],
                                    x: [0, -10, 0],
                                    y: [0, -5, 0],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent" />
                            
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/90 backdrop-blur-md rounded-full border border-slate-200/60 text-slate-400 hover:text-slate-700 shadow-sm transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-2.5 py-1 text-[9px] font-semibold bg-white/90 backdrop-blur-md text-slate-600 border border-slate-200 shadow-sm rounded-full font-mono uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <h1 
                                    id="drawer-title" 
                                    className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 mt-3 uppercase tracking-tight"
                                >
                                    {project.title}
                                </h1>
                            </div>
                        </div>

                        {/* Scrollable Body Content */}
                        <div className="p-6 md:p-8 space-y-12 flex-1 overflow-y-auto relative bg-[#F8F9FC]">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.01] overflow-hidden">
                                <div className="absolute inset-y-0 left-12 w-[1px] bg-slate-900" />
                                <div className="absolute inset-y-0 right-12 w-[1px] bg-slate-900" />
                            </div>

                            {/* Links */}
                            <div className="grid grid-cols-2 gap-3 pb-2 relative">
                                {project.link && project.link !== "#" && (
                                    <Button variant="default" className="w-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm" asChild>
                                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" /> Live Demo
                                        </Link>
                                    </Button>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Button variant="outline" className="w-full text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm" asChild>
                                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-3.5 h-3.5 mr-2" /> Source Code
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* 1. The Problem */}
                            {project.extended?.problemStatement && (
                                <section className="relative">
                                    <SectionHeader num="01" title="The Problem" />
                                    <p className="text-slate-700 text-sm leading-relaxed font-light bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                        {project.extended.problemStatement}
                                    </p>
                                </section>
                            )}

                            {/* 2. Reality of the Work (Constraints) */}
                            {project.extended?.constraints && (
                                <section className="relative">
                                    <SectionHeader num="02" title="The Constraints" />
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-indigo-500 mb-1">
                                                <Clock size={14} />
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Timeline</span>
                                            </div>
                                            <span className="text-xs text-slate-600 font-medium">{project.extended.constraints.timeline}</span>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-indigo-500 mb-1">
                                                <Users size={14} />
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Team</span>
                                            </div>
                                            <span className="text-xs text-slate-600 font-medium">{project.extended.constraints.team}</span>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-indigo-500 mb-1">
                                                <Wrench size={14} />
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Core Tech</span>
                                            </div>
                                            <span className="text-xs text-slate-600 font-medium">{project.extended.constraints.techStack}</span>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 3. The Solution */}
                            {project.extended?.solution && (
                                <section className="relative">
                                    <SectionHeader num="03" title="The Solution" />
                                    <p className="text-slate-700 text-sm leading-relaxed font-light mb-6">
                                        {project.extended.solution}
                                    </p>
                                    
                                    {/* System Pipeline Schema */}
                                    {PROJECT_PIPELINES[project.id] && (
                                        <div className="mt-6">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 block">System Architecture</span>
                                            <PipelineVisualizer projectId={project.id} />
                                        </div>
                                    )}

                                    {/* Features */}
                                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                                        {project.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200/50 bg-white shadow-sm">
                                                <span className="font-mono text-[9px] text-indigo-500/80 mt-0.5">[{i + 1}]</span>
                                                <span className="text-[11px] text-slate-600 leading-relaxed font-light">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* 4. Trade-offs */}
                            {project.extended?.tradeoffs && (
                                <section className="relative">
                                    <SectionHeader num="04" title="Engineering Trade-offs" />
                                    <div className="bg-white p-5 rounded-xl border border-amber-200/60 bg-amber-50/30 shadow-sm">
                                        <p className="text-slate-700 text-sm leading-relaxed font-light">
                                            <span className="font-bold text-amber-700/80 mr-2">Why?</span>
                                            {project.extended.tradeoffs}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* 5. Proven Impact */}
                            {project.extended?.impact && (
                                <section className="relative">
                                    <SectionHeader num="05" title="Proven Impact" />
                                    <div className="bg-indigo-600 p-6 rounded-xl shadow-md text-white relative overflow-hidden">
                                        {/* Background decoration */}
                                        <div className="absolute -right-10 -top-10 text-indigo-500/30 font-serif text-[120px] font-bold italic leading-none pointer-events-none">
                                            %
                                        </div>
                                        
                                        <p className="text-indigo-50 text-sm md:text-base leading-relaxed font-medium relative z-10">
                                            {project.extended.impact}
                                        </p>
                                    </div>
                                </section>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
