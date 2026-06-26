"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, X, Check, Sparkles, Sliders, Send, HelpCircle, FileText } from "lucide-react";
import { useRecruiterMode, RecruiterRole } from "@/lib/hooks/useRecruiterMode";
import { cn } from "@/lib/utils";
import { answerQuestion, scanJobDescription, ATSAnalysis } from "@/lib/agent/recruiterAgent";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";

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
            "Compared 6 CNN designs under varying wholesale market lighting conditions."
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

interface ChatMessage {
    sender: "agent" | "recruiter";
    text: string;
    projectId?: "deepshield" | "greensort" | "suicide-prediction" | "supplier-ranking" | "vegetable-classifier";
    timestamp: Date;
}

export default function RecruiterPanel() {
    const { role, setRole, isMounted } = useRecruiterMode();
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [activeTab, setActiveTab] = useState<"tailor" | "ats" | "qa">("tailor");

    // ATS State
    const [jobDescription, setJobDescription] = useState("");
    const [atsResult, setAtsResult] = useState<ATSAnalysis | null>(null);

    // Q&A State
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            sender: "agent",
            text: "Hi! I'm SnehaBot, a local recruitment assistant running entirely offline on this browser. Ask me anything about Sneha's project tradeoffs, accuracy, hardware wiring, or certificates!",
            timestamp: new Date()
        }
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMounted) {
            // Show tooltip bubble
            const timer = setTimeout(() => {
                setShowBubble(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isMounted]);

    useEffect(() => {
        // Auto scroll to chat end
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    if (!isMounted) return null;

    const handlePrint = () => {
        window.print();
    };

    // Scan Job Description handler
    const handleScanJD = (e: React.FormEvent) => {
        e.preventDefault();
        if (!jobDescription.trim()) return;
        const analysis = scanJobDescription(jobDescription);
        setAtsResult(analysis);
    };

    // Chat handler
    const handleSendMessage = (textToSend?: string) => {
        const text = textToSend || chatInput;
        if (!text.trim()) return;

        // Add user message
        const userMsg: ChatMessage = {
            sender: "recruiter",
            text,
            timestamp: new Date()
        };
        setChatHistory((prev) => [...prev, userMsg]);
        if (!textToSend) setChatInput("");

        // Process locally
        setTimeout(() => {
            const reply = answerQuestion(text);
            const agentMsg: ChatMessage = {
                sender: "agent",
                text: reply.answer,
                projectId: reply.matchedProjectId,
                timestamp: new Date()
            };
            setChatHistory((prev) => [...prev, agentMsg]);
        }, 300);
    };

    const currentBrief = role ? ROLE_BRIEFS[role] : null;

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 print:hidden">
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
                        "flex items-center gap-2.5 px-5 py-3.5 rounded-full shadow-xl border transition-all duration-300 relative",
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
                        <span className="flex w-2.5 h-2.5 rounded-full bg-green-400 animate-ping absolute -top-1 -right-1" />
                    )}
                </motion.button>
            </div>

            {/* Recruiter Drawer Side Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none print:hidden">
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
                            className="absolute top-0 bottom-0 left-0 w-full max-w-[460px] bg-white border-r border-slate-200 shadow-2xl flex flex-col z-10 pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
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

                            {/* Tabs Navigation */}
                            <div className="px-6 py-2 border-b border-slate-100 flex gap-2 bg-slate-50/50">
                                <button
                                    onClick={() => setActiveTab("tailor")}
                                    className={cn(
                                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                                        activeTab === "tailor" 
                                            ? "bg-slate-900 text-white shadow-sm" 
                                            : "text-slate-500 hover:bg-slate-150 hover:text-slate-800"
                                    )}
                                >
                                    Tailor View
                                </button>
                                <button
                                    onClick={() => setActiveTab("ats")}
                                    className={cn(
                                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                                        activeTab === "ats" 
                                            ? "bg-slate-900 text-white shadow-sm" 
                                            : "text-slate-500 hover:bg-slate-150 hover:text-slate-800"
                                    )}
                                >
                                    ATS Scanner
                                </button>
                                <button
                                    onClick={() => setActiveTab("qa")}
                                    className={cn(
                                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                                        activeTab === "qa" 
                                            ? "bg-slate-900 text-white shadow-sm" 
                                            : "text-slate-500 hover:bg-slate-150 hover:text-slate-800"
                                    )}
                                >
                                    Chat Q&A Agent
                                </button>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                                <AnimatePresence mode="wait">
                                    {/* Tab 1: Tailor View */}
                                    {activeTab === "tailor" && (
                                        <motion.div
                                            key="tailor"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h4 className="text-[10px] font-mono text-slate-450 uppercase tracking-wider mb-1.5">Configure Target Role</h4>
                                                <p className="text-xs text-slate-500 font-light mb-4">
                                                    Dynamically tailor taglines, skills, projects, and certifications across the portfolio to align with your open role.
                                                </p>

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
                                                                    <span className="text-[10px] text-slate-405 font-light leading-relaxed">
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

                                            {currentBrief ? (
                                                <div className="space-y-5 pt-2 border-t border-slate-100">
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

                                                    {/* Focus */}
                                                    <div>
                                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Job Focus</h4>
                                                        <p className="text-xs text-slate-700 leading-relaxed font-light bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                            {currentBrief.focus}
                                                        </p>
                                                    </div>

                                                    {/* Metrics */}
                                                    <div>
                                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">Target Metrics & Highlights</h4>
                                                        <ul className="space-y-3">
                                                            {currentBrief.highlights.map((highlight, idx) => (
                                                                <li key={idx} className="flex gap-2.5 items-start">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                                                    <span className="text-xs text-slate-600 font-light leading-relaxed">{highlight}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                                                    <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                                                        Select a recruiting profile above to check ATS compatibility and customize the portfolio views.
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Tab 2: ATS Scanner */}
                                    {activeTab === "ats" && (
                                        <motion.div
                                            key="ats"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">Offline ATS Scanner</h4>
                                                <p className="text-xs text-slate-500 font-light mb-4">
                                                    Paste your job description below. The local agent will scan for required technologies and calculate Sneha&apos;s alignment score.
                                                </p>

                                                <form onSubmit={handleScanJD} className="space-y-3">
                                                    <textarea
                                                        rows={4}
                                                        placeholder="Paste Job Description / Requirements here..."
                                                        value={jobDescription}
                                                        onChange={(e) => setJobDescription(e.target.value)}
                                                        className="w-full border border-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-slate-400 resize-none font-sans"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" />
                                                        Scan Job Description
                                                    </button>
                                                </form>
                                            </div>

                                            {/* ATS Scanning Outcome */}
                                            {atsResult && (
                                                <div className="space-y-5 pt-4 border-t border-slate-100">
                                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                                        <div>
                                                            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">Calculated Score</span>
                                                            <h5 className="font-heading font-extrabold text-sm uppercase text-slate-850">ATS Match Rating</h5>
                                                        </div>
                                                        <div className={cn(
                                                            "text-2xl font-black font-heading",
                                                            atsResult.score >= 90 ? "text-emerald-600" :
                                                            atsResult.score >= 75 ? "text-indigo-600" :
                                                            "text-amber-600"
                                                        )}>
                                                            {atsResult.score}%
                                                        </div>
                                                    </div>

                                                    {/* Matched Skills */}
                                                    <div>
                                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Matched Competencies</h4>
                                                        <div className="flex flex-wrap gap-1">
                                                            {atsResult.matchedSkills.map((s) => (
                                                                <span key={s} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                                                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                                                    {s}
                                                                </span>
                                                            ))}
                                                            {atsResult.matchedSkills.length === 0 && (
                                                                <span className="text-slate-400 text-[10px] font-light">No direct tool matches detected.</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Missing Skills */}
                                                    {atsResult.missingSkills.length > 0 && (
                                                        <div>
                                                            <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Requested Skills (Not Highlighted)</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {atsResult.missingSkills.map((s) => (
                                                                    <span key={s} className="bg-slate-50 text-slate-400 border border-slate-200 text-[9px] font-mono px-2 py-0.5 rounded">
                                                                        {s}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Strengths */}
                                                    <div>
                                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Candidate Strengths</h4>
                                                        <ul className="space-y-2">
                                                            {atsResult.strengths.map((str, i) => (
                                                                <li key={i} className="flex gap-2 items-start text-xs font-light text-slate-600 leading-relaxed">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                                                    <span>{str}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Recommendations */}
                                                    <div>
                                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Actionable Hiring Strategy</h4>
                                                        <ul className="space-y-2">
                                                            {atsResult.recommendations.map((rec, i) => (
                                                                <li key={i} className="flex gap-2 items-start text-xs font-light text-slate-500 leading-relaxed">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                                                    <span>{rec}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Tab 3: Q&A Chat Agent */}
                                    {activeTab === "qa" && (
                                        <motion.div
                                            key="qa"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex flex-col h-full min-h-[400px] space-y-4"
                                        >
                                            {/* Chat Messages Panel */}
                                            <div className="flex-1 space-y-4 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                                                {chatHistory.map((msg, index) => {
                                                    const isAgent = msg.sender === "agent";
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cn(
                                                                "flex flex-col gap-1.5 max-w-[85%]",
                                                                isAgent ? "self-start" : "self-end ml-auto items-end"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "p-3.5 rounded-2xl text-xs leading-relaxed font-light",
                                                                isAgent
                                                                    ? "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50"
                                                                    : "bg-indigo-600 text-white rounded-tr-none shadow-md"
                                                            )}>
                                                                {msg.text}
                                                            </div>
                                                            {/* Inline Architecture SVG Renderer */}
                                                            {isAgent && msg.projectId && (
                                                                <div className="mt-2 w-full max-w-[340px]">
                                                                    <ProjectArchitecture projectId={msg.projectId} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                                <div ref={chatEndRef} />
                                            </div>

                                            {/* Presets */}
                                            <div className="space-y-1.5 border-t border-slate-100 pt-3">
                                                <h4 className="text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                    <HelpCircle className="w-3 h-3 text-slate-400" />
                                                    Suggested Inquiries
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {[
                                                        { label: "YOLO edge sorter specs?", q: "How is Greensort optimized for the Raspberry Pi?" },
                                                        { label: "Deepfake classifier details?", q: "Tell me about DeepShield ViT model accuracy and tradeoffs" },
                                                        { label: "Suicide NLP context mapper?", q: "What is the CSRBOX Neo4j context mapping model?" },
                                                        { label: "Certificates?", q: "What AWS or GCP certifications does she hold?" }
                                                    ].map((item, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleSendMessage(item.q)}
                                                            className="text-[9px] px-2 py-1.5 bg-slate-50 border border-slate-150 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 rounded-lg text-slate-600 font-sans transition-colors whitespace-nowrap text-left"
                                                        >
                                                            {item.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Form Input */}
                                            <form 
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }}
                                                className="flex gap-2 border-t border-slate-100 pt-3"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Ask about project code, hardware, DBs..."
                                                    value={chatInput}
                                                    onChange={(e) => setChatInput(e.target.value)}
                                                    className="flex-1 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-slate-400 font-sans bg-white"
                                                />
                                                <button
                                                    type="submit"
                                                    className="px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
                                                >
                                                    <Send className="w-3.5 h-3.5" />
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Print / Footer */}
                            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
                                <button
                                    onClick={handlePrint}
                                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-colors shadow-sm"
                                >
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
