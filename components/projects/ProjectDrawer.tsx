"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/data";
import InteractiveDemo from "./InteractiveDemo";
import { Button } from "@/components/ui/Button";

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

const PROJECT_NARRATIVES: Record<string, string> = {
    deepshield: "I built DeepShield AI to address the critical gap in existing deepfake detectors—namely, their vulnerability to post-processed compression and resizing. By combining digital signal forensics with Vision Transformers, DeepShield extracts high-frequency Discrete Cosine Transform (DCT) variations and performs Error Level Analysis (ELA) to identify compression discrepancies. In addition, I integrated an FGSM adversarial noise injection pipeline, letting users pre-emptively immunize their own photos against unauthorized facial cloning.",
    "vegetable-classifier": "Agricultural deep learning models often struggle under unpredictable, real-world farm conditions. In this research project, I compared six different convolutional network designs—evaluating lightweight depthwise-separable designs against heavier ResNet configurations. To ensure the model remains robust in highly chaotic market environments, I built an OpenCV-based background segmenter and class-balancing filter to isolate organic structures in real-time.",
    greensort: "Greensort is a self-coordinating hardware and AI prototype designed to classify and sort garbage at the point of disposal. Running on a Raspberry Pi camera module, the system processes frames through a highly quantized YOLOv8 model in less than 80ms. The Pi then communicates sorting decisions to an Arduino Uno over a USB Serial link, driving physical servo flaps to segregate recyclables, organic matter, and hazardous items dynamically.",
    "supplier-ranking": "Constructed during a live hackathon, this decision intelligence agent automates risk profiling for logistics networks. By ingesting supplier performance data (such as late deliveries, defect ratios, cost indexes, and compliance histories), the system fits a customized multi-variable regression model to score each provider. The resulting coefficients prioritize logistics safety, highlighting anomalous suppliers for direct administrative review.",
    "suicide-prediction": "Developed during my data specialist internship at CSRBOX, this NLP engine predicts crisis risk levels from user statements. Unlike traditional text classification models that evaluate sentences in a vacuum, this system utilizes a Neo4j Graph Database to map connections between emotional states, anxiety triggers, and temporal behavioral changes. This enables clinical evaluators to track context paths rather than isolated keywords."
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
        <span className="font-mono text-[9px] text-amber-400/80 uppercase tracking-widest">{num} .</span>
        <h2 className="text-xl font-heading font-normal italic text-white tracking-wide">{title}</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-2" />
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
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
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
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl md:max-w-2xl bg-zinc-950 border-l border-white/10 z-50 overflow-y-auto shadow-2xl flex flex-col"
                    >
                        {/* 1. Cinematic Header Banner */}
                        <div className="relative h-60 md:h-72 w-full overflow-hidden shrink-0 border-b border-white/10">
                            {/* Ken Burns Animated Image */}
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
                            {/* Soft dark gradient vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                            
                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Header Info Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-2.5 py-1 text-[9px] font-semibold bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-full font-mono uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <h1 
                                    id="drawer-title" 
                                    className="text-2xl md:text-3xl font-extrabold font-heading text-white mt-3 uppercase tracking-tight"
                                >
                                    {project.title}
                                </h1>
                            </div>
                        </div>

                        {/* 2. Scrollable Body Content */}
                        <div className="p-6 md:p-8 space-y-10 flex-1 overflow-y-auto relative bg-[#0A0A0C]">
                            {/* Decorative technical vertical grid lines */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
                                <div className="absolute inset-y-0 left-12 w-[1px] bg-white" />
                                <div className="absolute inset-y-0 right-12 w-[1px] bg-white" />
                            </div>

                            {/* Overview */}
                            <section className="relative">
                                <SectionHeader num="01" title="Project Retrospective" />
                                <p className="text-zinc-300 text-[13px] leading-relaxed font-light">
                                    {PROJECT_NARRATIVES[project.id] || project.extended?.overview || project.description}
                                </p>
                            </section>

                            {/* Quick Links */}
                            <div className="grid grid-cols-2 gap-3 pb-2 relative">
                                {project.link && project.link !== "#" && (
                                    <Button variant="default" className="w-full text-xs font-bold" asChild>
                                        <Link href={project.link} target="_blank">
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" /> Live Demo
                                        </Link>
                                    </Button>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Button variant="outline" className="w-full text-xs font-bold" asChild>
                                        <Link href={project.github} target="_blank">
                                            <Github className="w-3.5 h-3.5 mr-2" /> Source Code
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* Key Features */}
                            <section className="relative">
                                <SectionHeader num="02" title="Key Architectural Highlights" />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-amber-400/20 transition-all duration-300">
                                            <span className="font-mono text-[9px] text-amber-400/60 mt-0.5">[{i + 1}]</span>
                                            <span className="text-[11.5px] text-zinc-300 leading-relaxed font-light">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Technology Stack */}
                            <section className="relative">
                                <SectionHeader num="03" title="Technology Integration" />
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded text-[10px] font-mono text-zinc-400 uppercase">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* System Pipeline Schema */}
                            {PROJECT_PIPELINES[project.id] && (
                                <section className="relative space-y-4">
                                    <SectionHeader num="04" title="System Pipeline Architecture" />
                                    <div className="relative border border-white/5 rounded-xl bg-black/60 p-5 overflow-x-auto shadow-inner">
                                        <div className="absolute top-2 right-3 text-[8px] font-mono text-zinc-600 uppercase tracking-wider">
                                            Telemetry Path
                                        </div>
                                        <pre className="font-mono text-[9.5px] md:text-[10px] text-amber-400/90 leading-relaxed font-semibold">
                                            {PROJECT_PIPELINES[project.id]}
                                        </pre>
                                    </div>
                                </section>
                            )}

                            {/* Live Working Simulator (Interactive Sandbox) */}
                            <section className="relative">
                                <SectionHeader num="05" title="Interactive Sandbox Simulation" />
                                <InteractiveDemo projectId={project.id} />
                            </section>

                            {/* Extended Tech details */}
                            {project.extended && (
                                <section className="relative space-y-6 border-t border-white/5 pt-8">
                                    <SectionHeader num="06" title="Engineering Insights & Retro" />
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white/[0.01] p-5 rounded-xl border border-white/5 space-y-3 hover:border-amber-400/10 transition-all">
                                            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider text-amber-400/80">// Core Engineering Obstacles</h4>
                                            <ul className="space-y-2 text-xs text-zinc-400 font-light">
                                                {project.extended.challenges.map((c, i) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="text-amber-400/60 font-mono">›</span>
                                                        <span>{c}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-white/[0.01] p-5 rounded-xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-amber-400/10 transition-all">
                                            <div className="space-y-2">
                                                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider text-amber-400/80">// Developer Retrospective</h4>
                                                <p className="text-xs text-zinc-400 italic leading-relaxed font-light">
                                                    "{project.extended.learnings}"
                                                </p>
                                            </div>
                                            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-[9px] font-mono text-zinc-500 uppercase">Impact Metric</span>
                                                <span className="text-xs text-emerald-400 font-mono font-semibold">{project.extended.results}</span>
                                            </div>
                                        </div>
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
