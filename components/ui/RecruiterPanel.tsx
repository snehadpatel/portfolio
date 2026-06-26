"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, X, Check, Printer, Sparkles, Sliders } from "lucide-react";
import { useRecruiterMode, RecruiterRole } from "@/lib/hooks/useRecruiterMode";
import { cn } from "@/lib/utils";

interface ATSRequirement {
    name: string;
    matched: boolean;
}

interface RoleBrief {
    title: string;
    focus: string;
    score: number;
    highlights: string[];
    atsChecklist: ATSRequirement[];
}

const ROLE_BRIEFS: Record<Exclude<RecruiterRole, null>, RoleBrief> = {
    ml: {
        title: "Machine Learning / AI Engineer",
        focus: "Computer Vision, Deep Learning Pipelines, and Edge AI Optimization.",
        score: 98,
        highlights: [
            "ViT-Base-16 model reaching 97.5% accuracy for Deepfake Forensics.",
            "Edge deployment: quantized YOLOv8 running at 12fps on Raspberry Pi 4.",
            "Compare 6 CNN designs under varying wholesale market lighting conditions."
        ],
        atsChecklist: [
            { name: "PyTorch & TensorFlow", matched: true },
            { name: "Computer Vision & YOLO", matched: true },
            { name: "Model Quantization & Edge AI", matched: true },
            { name: "Explainable AI (Grad-CAM)", matched: true },
            { name: "NLP Sentiment Classification", matched: true }
        ]
    },
    data: {
        title: "Data Specialist / Engineer",
        focus: "Relational & Graph Databases, Pipeline Ingestion, and Predictive Analytics.",
        score: 95,
        highlights: [
            "Neo4j graph databases integration mapping distress sentiment patterns.",
            "Multivariable regression modeling cargo provider performance metrics.",
            "Cypher queries mapping temporal context pathways in raw datasets."
        ],
        atsChecklist: [
            { name: "SQL & Cypher (Neo4j)", matched: true },
            { name: "Pandas & Scikit-Learn Data Cleaning", matched: true },
            { name: "NLP Sentiment Pipelines", matched: true },
            { name: "Decision Intelligence & Supplier Ranking", matched: true },
            { name: "Web Scraping & API Ingestion", matched: true }
        ]
    },
    iot: {
        title: "IoT & Embedded Systems Engineer",
        focus: "Hardware Prototyping, Serial Communication, and Offline Local Intelligence.",
        score: 97,
        highlights: [
            "Serial over USB linking Raspberry Pi 4 vision unit and Arduino Uno.",
            "Mechanical sorting gates calibrated with high-torque MG996R servo.",
            "WSRO Nationals Robot Race Competitor with autonomous tracking."
        ],
        atsChecklist: [
            { name: "Raspberry Pi & Arduino Firmware", matched: true },
            { name: "Serial Over USB / UART / I2C", matched: true },
            { name: "Actuators & Servos Calibration", matched: true },
            { name: "Sensor Integrations (Ultrasonic, Gas)", matched: true },
            { name: "Offline Inference (YOLO / Edge AI)", matched: true }
        ]
    },
    fullstack: {
        title: "Full-Stack Developer",
        focus: "TypeScript Web Architectures, Responsive Frameworks, and API Integration.",
        score: 92,
        highlights: [
            "Modern Next.js responsive portfolios utilizing glassmorphism and Framer Motion.",
            "FastAPI / Flask microservices routing AI inference tasks.",
            "Streamlit visualization dashboard mapping logistics performance logs."
        ],
        atsChecklist: [
            { name: "Next.js / React / TypeScript", matched: true },
            { name: "API Integrations (FastAPI / Flask)", matched: true },
            { name: "Tailwind CSS Responsive Design", matched: true },
            { name: "State Caching (localStorage)", matched: true },
            { name: "Interactive Canvas & Visual Interfaces", matched: true }
        ]
    }
};

export default function RecruiterPanel() {
    const { role, setRole, isMounted } = useRecruiterMode();
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        if (isMounted) {
            // Show a tooltip bubble after a short delay
            const timer = setTimeout(() => {
                setShowBubble(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isMounted]);

    if (!isMounted) return null;

    const handlePrint = () => {
        window.print();
    };

    const currentBrief = role ? ROLE_BRIEFS[role] : null;

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
                <AnimatePresence>
                    {showBubble && !isOpen && !role && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-slate-900 text-white text-[11px] font-medium py-2 px-3.5 rounded-xl shadow-lg border border-slate-800 flex items-center gap-1.5 whitespace-nowrap"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                            <span>Hiring? Try <strong>Recruiter Mode</strong></span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowBubble(false);
                                }}
                                className="hover:text-slate-300 ml-1 p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowBubble(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-xl border transition-all duration-300",
                        role 
                            ? "bg-indigo-600 border-indigo-500 text-white" 
                            : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                    )}
                >
                    <Briefcase className={cn("w-4 h-4", role && "animate-pulse")} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                        {role ? `${ROLE_BRIEFS[role].title} Active` : "Recruiter Mode"}
                    </span>
                    {role && (
                        <span className="flex w-2 h-2 rounded-full bg-green-400 animate-ping absolute top-0 right-0 mt-1 mr-1" />
                    )}
                </motion.button>
            </div>

            {/* Recruiter Dashboard Side Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-slate-950 pointer-events-auto cursor-pointer"
                        />

                        {/* Slide-out Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="absolute top-0 bottom-0 left-0 w-full max-w-[420px] bg-white border-r border-slate-200 shadow-2xl flex flex-col z-10 pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sliders className="w-4 h-4 text-indigo-600" />
                                    <h3 className="font-heading font-extrabold text-lg text-slate-900 uppercase tracking-tight">Placement Hub</h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                                <div>
                                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Configure View</h4>
                                    <p className="text-xs text-slate-500 font-light mb-4">
                                        Tailor Sneha&apos;s portfolio to show relevant skills, projects, and certifications for your open position.
                                    </p>

                                    {/* Role Buttons */}
                                    <div className="grid grid-cols-1 gap-2">
                                        {(Object.keys(ROLE_BRIEFS) as Array<Exclude<RecruiterRole, null>>).map((key) => {
                                            const active = role === key;
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => setRole(active ? null : key)}
                                                    className={cn(
                                                        "w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group",
                                                        active
                                                            ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm"
                                                            : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                                                    )}
                                                >
                                                    <div>
                                                        <div className="text-xs font-bold font-heading uppercase tracking-wide group-hover:text-indigo-600 transition-colors">
                                                            {ROLE_BRIEFS[key].title}
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-light leading-relaxed">
                                                            {key === "ml" ? "AI, ViT, CV, PyTorch" :
                                                             key === "data" ? "SQL, Neo4j, Pandas" :
                                                             key === "iot" ? "Raspberry Pi, Arduino, Edge" :
                                                             "React, Next.js, FastAPI"}
                                                        </span>
                                                    </div>
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300",
                                                        active 
                                                            ? "bg-indigo-600 border-indigo-600 text-white" 
                                                            : "border-slate-200 bg-slate-50"
                                                    )}>
                                                        {active && <Check className="w-3 h-3" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Dynamic Recruiter Dashboard details */}
                                <AnimatePresence mode="wait">
                                    {currentBrief ? (
                                        <motion.div
                                            key={role}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 pt-2 border-t border-slate-100"
                                        >
                                            {/* Fit Score */}
                                            <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
                                                <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                                                    <Sparkles className="w-32 h-32" />
                                                </div>
                                                <div className="relative z-10 flex items-center justify-between">
                                                    <div>
                                                        <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-200 block mb-1">ATS Qualification Match</span>
                                                        <h5 className="font-heading font-extrabold text-sm uppercase">Candidate Profile Fit</h5>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-3xl font-black font-heading leading-none">{currentBrief.score}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Overview Focus */}
                                            <div>
                                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Job Focus</h4>
                                                <p className="text-xs text-slate-700 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    {currentBrief.focus}
                                                </p>
                                            </div>

                                            {/* Highlights */}
                                            <div>
                                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">Target Metrics & Achievements</h4>
                                                <ul className="space-y-3">
                                                    {currentBrief.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex gap-2.5 items-start">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                                            <span className="text-xs text-slate-600 font-light leading-relaxed">{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* ATS Checklist */}
                                            <div>
                                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">ATS Matching Checklist</h4>
                                                <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    {currentBrief.atsChecklist.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-3">
                                                            <div className="w-4 h-4 rounded bg-green-500 text-white flex items-center justify-center shrink-0">
                                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                                            </div>
                                                            <span className="text-xs font-mono text-slate-700">{item.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                                            <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                            <p className="text-xs text-slate-400 font-light leading-relaxed">
                                                Select a recruiting profile above to check ATS compatibility, match highlights, and custom metrics.
                                            </p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Printing */}
                            <div className="p-6 border-t border-slate-200/80 bg-slate-50/50 space-y-3">
                                <button
                                    onClick={handlePrint}
                                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-colors shadow-sm"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    Print Recruiter Brief (PDF)
                                </button>
                                <p className="text-[9px] font-mono text-center text-slate-400">
                                    Generates a print-friendly, 1-page resume visualizer tailored to the selected role.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
