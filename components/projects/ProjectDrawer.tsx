"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock, Users, Wrench, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import PipelineVisualizer from "./PipelineVisualizer";
import { cn } from "@/lib/utils";

interface ProjectDrawerProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const PROJECT_IMAGES: Record<string, string> = {
    "arcanum-ai": "/assets/projects/arcanum.webp",
    greensort: "/assets/projects/waste.webp",
    deepshield: "/assets/projects/deepshield.webp",
    dermajourney: "/assets/projects/dermajourney.webp",
    "suicide-prediction": "/assets/projects/suicide.webp",
    "vegetable-classifier": "/assets/projects/veg.webp",
    "supplier-ranking": "/assets/projects/supplier.webp",
};

const PROJECT_PIPELINES: Record<string, string> = {
    "arcanum-ai":
`  [ Active Code Buffer / Tabs ] ─────( Monaco AST Ingest )─────> [ FastAPI Context Engine ]
                                                                       │
                                                             ( Token Budget & Syntax Parse )
                                                                       ▼
  [ Monaco Workspace UI ] <────( Sub-120ms Token Stream )──── [ Copilot Completion Stream ]`,

    greensort:
`  [ Camera / Conveyor Frame ] ────( 640x480 RGB Ingest )─────> [ Raspberry Pi 4 (YOLOv8) ]
                                                                        │
                                                              ( 4-Class 90 mAP Inference )
                                                                        ▼
  [ MG996R Servo Gate Flap ] <───( UART Serial over USB )────── [ Arduino Uno Actuation PWM ]`,

    deepshield:
`  [ Image Input ] ──────────────( ELA & DCT Frequency )───────> [ Dual-Feature Extractor ]
                                                                        │
                                                              ( ViT-Base-16 Patches )
                                                                        ▼
  [ Explainable Grad-CAM ] <─────( Spatial Discrepancies )────── [ Classification Head ]`,

    dermajourney:
`  [ Dermoscopic Check-ins ] ────( Multi-Modal Ingestion )─────> [ Clinical NLP & Vision ]
                                                                        │
                                                              ( Lesion Delta Tracking )
                                                                        ▼
  [ Clinician Decision View ] <───( Longitudinal Analytics )──── [ Progression Scorer ]`,

    "vegetable-classifier":
`  [ Crop Camera Feed ] ─────────( Capture Frame )──────────────> [ Background Subtractor ]
                                                                        │
                                                              ( HSV Class Filtering )
                                                                        ▼
  [ Predicted Variety ] <────────( PyTorch ResNet18 )─────────── [ 224x224 Normalized ]`,

    "suicide-prediction":
`  [ Crisis Text Records ] ──────( Clean & Tokenize )───────────> [ TF-IDF & Sentiment Vectors ]
                                                                        │
                                                              ( Relationship Traversal )
                                                                        ▼
  [ Risk Classification ] <──────( Cypher Context Query )─────── [ Neo4j Graph Database ]`,

    "supplier-ranking":
`  [ Logistics Records CSV ] ────( Ingestion & Cleansing )──────> [ Pandas Normalization ]
                                                                        │
                                                              ( Delay & Defect Weighting )
                                                                        ▼
  [ Supplier Scorecard ] <───────( Multivariable Regression )─── [ Streamlit Risk UI ]`,
};

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-center gap-3 mb-4 relative">
        <span className="font-mono text-xs text-indigo-500 uppercase tracking-wider">{num} .</span>
        <h2 className="text-lg md:text-xl font-heading font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">{title}</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent ml-2" />
    </div>
);

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
    const drawerRef = useRef<HTMLDivElement | null>(null);

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

    // Trap focus inside drawer
    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            const drawer = drawerRef.current;
            if (!drawer) return;

            const focusableElements = drawer.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const originalFocusedElement = document.activeElement as HTMLElement | null;

            firstElement.focus();

            const handleTabKey = (e: KeyboardEvent) => {
                if (e.key !== "Tab") return;

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            };

            window.addEventListener("keydown", handleTabKey);

            return () => {
                window.removeEventListener("keydown", handleTabKey);
                if (originalFocusedElement) {
                    originalFocusedElement.focus();
                }
            };
        }, 50);

        return () => clearTimeout(timer);
    }, [isOpen]);

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
    const imageUrl = project.image || PROJECT_IMAGES[project.id] || "/assets/projects/arcanum.webp";

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
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar Drawer Container */}
                    <motion.div
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="drawer-title"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 220 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-xl md:max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 z-50 overflow-y-auto shadow-2xl flex flex-col"
                    >
                        {/* Header Banner */}
                        <div className="relative h-60 md:h-72 w-full overflow-hidden shrink-0 border-b border-slate-200/50 dark:border-slate-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-200/60 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-sm transition-colors"
                                    aria-label="Close project drawer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="absolute bottom-5 left-6 right-6 text-white">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-mono uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                    {project.status && (
                                        <span className="px-2.5 py-0.5 text-[10px] font-mono text-indigo-200 bg-indigo-950/60 border border-indigo-400/40 rounded-full">
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                                <h1
                                    id="drawer-title"
                                    className="text-2xl md:text-3xl font-extrabold font-heading text-white uppercase tracking-tight leading-tight"
                                >
                                    {project.title}
                                </h1>
                            </div>
                        </div>

                        {/* Scrollable Body Content */}
                        <div className="p-6 md:p-8 space-y-10 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/60">
                            {/* Action Links */}
                            {(() => {
                                const hasLiveDemo = project.link && project.link !== "#";
                                const hasSourceCode = project.github && project.github !== "#";
                                const hasPublication = !!project.publication;
                                const buttonCount = [hasLiveDemo, hasSourceCode, hasPublication].filter(Boolean).length;

                                if (buttonCount === 0) return null;

                                return (
                                    <div
                                        className={cn(
                                            "grid gap-3 pb-2",
                                            buttonCount === 3
                                                ? "grid-cols-1 sm:grid-cols-3"
                                                : buttonCount === 2
                                                ? "grid-cols-1 sm:grid-cols-2"
                                                : "grid-cols-1"
                                        )}
                                    >
                                        {hasLiveDemo && (
                                            <Button
                                                variant="default"
                                                className="w-full text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-sm"
                                                asChild
                                            >
                                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-3.5 h-3.5 mr-2" /> Live Demo
                                                </Link>
                                            </Button>
                                        )}
                                        {hasSourceCode && (
                                            <Button
                                                variant="outline"
                                                className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-sm"
                                                asChild
                                            >
                                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-3.5 h-3.5 mr-2" /> View Code
                                                </Link>
                                            </Button>
                                        )}
                                        {project.publication && project.publication.paperUrl && (
                                            <Button
                                                variant="outline"
                                                className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-sm"
                                                asChild
                                            >
                                                <a href={project.publication.paperUrl} download>
                                                    <FileText className="w-3.5 h-3.5 mr-2" /> Paper (.docx)
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* 1. Problem Statement */}
                            <section>
                                <SectionHeader num="01" title="The Problem" />
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-light bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                                    {project.problemStatement || project.extended?.problemStatement || project.description}
                                </p>
                            </section>

                            {/* 2. My Contribution */}
                            {project.contribution && (
                                <section>
                                    <SectionHeader num="02" title="My Contribution" />
                                    <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
                                        <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-normal">
                                            {project.contribution}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* 3. The Solution & Architecture */}
                            <section>
                                <SectionHeader num="03" title="Solution & Architecture" />
                                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-light mb-4">
                                    {project.extended?.solution || project.description}
                                </p>

                                {/* System Architecture Pipeline */}
                                {PROJECT_PIPELINES[project.id] && (
                                    <div className="my-5 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800">
                                        <span className="text-[10px] uppercase text-indigo-400 font-semibold block mb-2 tracking-wider">
                                            ASCII Pipeline Architecture
                                        </span>
                                        <pre className="whitespace-pre">{PROJECT_PIPELINES[project.id]}</pre>
                                    </div>
                                )}

                                {/* Interactive Pipeline Diagram */}
                                <div className="mt-4">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                                        Interactive Dataflow
                                    </span>
                                    <PipelineVisualizer projectId={project.id} />
                                </div>
                            </section>

                            {/* 4. Implemented vs Planned Features (for Flagship Projects) */}
                            {project.implementedFeatures && project.implementedFeatures.length > 0 && (
                                <section>
                                    <SectionHeader num="04" title="Development Status" />
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Implemented Capabilities
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.implementedFeatures.map((f, i) => (
                                                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {project.plannedFeatures && project.plannedFeatures.length > 0 && (
                                            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                                                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-3 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" /> Planned Roadmap
                                                </h4>
                                                <ul className="space-y-2">
                                                    {project.plannedFeatures.map((f, i) => (
                                                        <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                                                            <span>{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* 5. Constraints & Tech Stack */}
                            <section>
                                <SectionHeader num="05" title="Stack & Constraints" />
                                <div className="space-y-4">
                                    {project.extended?.constraints && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                                                <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
                                                    <Clock size={13} />
                                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Timeline</span>
                                                </div>
                                                <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{project.extended.constraints.timeline}</span>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                                                <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
                                                    <Users size={13} />
                                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Team</span>
                                                </div>
                                                <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{project.extended.constraints.team}</span>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                                                <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
                                                    <Wrench size={13} />
                                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Tech Focus</span>
                                                </div>
                                                <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{project.extended.constraints.techStack}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* 6. Results, Evaluation & Trade-offs */}
                            {(project.extended?.impact || project.extended?.tradeoffs) && (
                                <section>
                                    <SectionHeader num="06" title="Results & Evaluation" />
                                    <div className="space-y-3">
                                        {project.extended.impact && (
                                            <div className="bg-slate-900 dark:bg-indigo-950 text-white p-5 rounded-xl shadow-sm">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-bold block mb-1">
                                                    Verified Results &amp; Impact
                                                </span>
                                                <p className="text-xs md:text-sm text-slate-100 leading-relaxed font-light">
                                                    {project.extended.impact}
                                                </p>
                                            </div>
                                        )}

                                        {project.extended.tradeoffs && (
                                            <div className="bg-amber-50/50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/50 shadow-sm">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300 font-bold block mb-1">
                                                    Engineering Trade-offs &amp; Limitations
                                                </span>
                                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                                                    {project.extended.tradeoffs}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* 7. Academic Publication Details */}
                            {project.publication && (
                                <section>
                                    <SectionHeader num="07" title="Academic Publication" />
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">Venue</span>
                                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.publication.venue || project.publication.conference}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">Title</span>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{project.publication.title}</h4>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">Authors</span>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{project.publication.authors.join(", ")}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">Abstract</span>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                                {project.publication.abstract}
                                            </p>
                                        </div>
                                        {project.publication.paperUrl && (
                                            <div className="pt-1">
                                                <Button variant="outline" className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm" asChild>
                                                    <a href={project.publication.paperUrl} download>
                                                        <FileText className="w-3.5 h-3.5 mr-2" /> Download Manuscript (.docx)
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
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
