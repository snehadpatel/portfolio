"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Camera, Terminal, ShieldCheck, Heart, Database, AlertCircle } from "lucide-react";

interface ProjectArchitectureProps {
    projectId: "deepshield" | "greensort" | "suicide-prediction" | "supplier-ranking" | "vegetable-classifier";
}

export default function ProjectArchitecture({ projectId }: ProjectArchitectureProps) {
    // 1. Render Greensort Sorter flow diagram
    if (projectId === "greensort") {
        return (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-wider">
                    <Cpu className="w-4.5 h-4.5" />
                    <span>System Architecture: Greensort IoT Sorter</span>
                </div>
                <div className="relative w-full aspect-[16/6] bg-slate-900/60 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                    <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                        {/* Define glowing effects */}
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Signals flowing lines */}
                        {/* Camera to RPi */}
                        <path d="M 120 120 L 260 120" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        {/* RPi to Arduino */}
                        <path d="M 380 120 L 520 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        {/* Arduino to Servo Flap */}
                        <path d="M 640 120 L 710 120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                        {/* Node 1: Camera Feed */}
                        <g transform="translate(40, 70)">
                            <rect width="80" height="100" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                            <foreignObject x="0" y="15" width="80" height="35">
                                <div className="flex justify-center text-indigo-400"><Camera className="w-6 h-6" /></div>
                            </foreignObject>
                            <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Camera Feed</text>
                            <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold">640x480 Raw</text>
                        </g>

                        {/* Node 2: Raspberry Pi 4 (YOLOv8 Edge CPU) */}
                        <g transform="translate(260, 50)">
                            <rect width="120" height="140" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" filter="url(#glow)" />
                            <foreignObject x="0" y="20" width="120" height="35">
                                <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                            </foreignObject>
                            <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold">Raspberry Pi 4</text>
                            <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8">YOLOv8 quantized</text>
                            <rect x="20" y="105" width="80" height="20" rx="4" fill="#312e81" stroke="#4f46e5" />
                            <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold">INT8 (12 fps)</text>
                        </g>

                        {/* Node 3: Arduino Uno */}
                        <g transform="translate(520, 65)">
                            <rect width="120" height="110" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                            <foreignObject x="0" y="15" width="120" height="35">
                                <div className="flex justify-center text-emerald-400"><Terminal className="w-7 h-7" /></div>
                            </foreignObject>
                            <text x="60" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold">Arduino Uno</text>
                            <text x="60" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8">USB Serial (UART)</text>
                            <text x="60" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="8">Pulse Width Mod</text>
                        </g>

                        {/* Node 4: MG996R Servo Flap */}
                        <g transform="translate(710, 85)">
                            <circle cx="35" cy="35" r="35" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                            <text x="35" y="32" textAnchor="middle" fill="#fcd34d" fontWeight="bold">Flap</text>
                            <text x="35" y="47" textAnchor="middle" fill="#fef3c7" fontSize="8">Servo</text>
                        </g>
                    </svg>
                    <style jsx>{`
                        @keyframes dash {
                            to {
                                stroke-dashoffset: -20;
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // 2. Render DeepShield Flow Diagram
    if (projectId === "deepshield") {
        return (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-wider">
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>System Architecture: DeepShield AI Forensics</span>
                </div>
                <div className="relative w-full aspect-[16/6] bg-slate-900/60 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                    <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                        {/* Signals flowing lines */}
                        <path d="M 120 120 L 220 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        {/* ELA to Transformer */}
                        <path d="M 340 85 L 430 100" stroke="#f472b6" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        {/* DCT to Transformer */}
                        <path d="M 340 155 L 430 140" stroke="#fb7185" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        {/* Transformer to GradCAM / Classify */}
                        <path d="M 550 120 L 650 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                        {/* Node 1: Input image */}
                        <g transform="translate(40, 70)">
                            <rect width="80" height="100" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                            <foreignObject x="0" y="15" width="80" height="35">
                                <div className="flex justify-center text-slate-400"><Camera className="w-6 h-6" /></div>
                            </foreignObject>
                            <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Input Image</text>
                            <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold">JPEG / GAN</text>
                        </g>

                        {/* Node 2A: Error Level Analysis (ELA) */}
                        <g transform="translate(220, 35)">
                            <rect width="120" height="70" rx="12" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                            <text x="60" y="25" textAnchor="middle" fill="#fda4af" fontWeight="bold">ELA Pipeline</text>
                            <text x="60" y="42" textAnchor="middle" fill="#fecdd3" fontSize="8">Resave Diff (95%)</text>
                            <text x="60" y="55" textAnchor="middle" fill="#fecdd3" fontSize="8">Isolate GAN edits</text>
                        </g>

                        {/* Node 2B: Discrete Cosine Transform (DCT) */}
                        <g transform="translate(220, 135)">
                            <rect width="120" height="70" rx="12" fill="#701a75" stroke="#f472b6" strokeWidth="1.5" />
                            <text x="60" y="25" textAnchor="middle" fill="#f5d0fe" fontWeight="bold">DCT Frequencies</text>
                            <text x="60" y="42" textAnchor="middle" fill="#fae8ff" fontSize="8">Extract grid artifacts</text>
                            <text x="60" y="55" textAnchor="middle" fill="#fae8ff" fontSize="8">High-freq noise</text>
                        </g>

                        {/* Node 3: Vision Transformer (ViT-Base-16) */}
                        <g transform="translate(430, 50)">
                            <rect width="120" height="140" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                            <foreignObject x="0" y="20" width="120" height="35">
                                <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                            </foreignObject>
                            <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold">ViT-Base-16</text>
                            <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8">16x16 Patches</text>
                            <rect x="25" y="105" width="70" height="20" rx="4" fill="#312e81" stroke="#4f46e5" />
                            <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold">Self-Attention</text>
                        </g>

                        {/* Node 4: Grad-CAM anomaly heatmaps */}
                        <g transform="translate(650, 70)">
                            <rect width="110" height="100" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                            <foreignObject x="0" y="15" width="110" height="35">
                                <div className="flex justify-center text-emerald-400"><ShieldCheck className="w-7 h-7" /></div>
                            </foreignObject>
                            <text x="55" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold">97.5% Acc</text>
                            <text x="55" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8">Grad-CAM Heatmap</text>
                        </g>
                    </svg>
                    <style jsx>{`
                        @keyframes dash {
                            to {
                                stroke-dashoffset: -20;
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // 3. Render Suicide Prediction Flow Diagram
    if (projectId === "suicide-prediction") {
        return (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-wider">
                    <Database className="w-4.5 h-4.5" />
                    <span>System Architecture: NLP Crisis Context Mapper</span>
                </div>
                <div className="relative w-full aspect-[16/6] bg-slate-900/60 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                    <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                        {/* Signals flowing lines */}
                        <path d="M 120 120 L 220 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        <path d="M 340 120 L 440 120" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                        <path d="M 560 120 L 660 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                        {/* Node 1: Input text */}
                        <g transform="translate(40, 70)">
                            <rect width="80" height="100" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                            <foreignObject x="0" y="15" width="80" height="35">
                                <div className="flex justify-center text-slate-400"><Terminal className="w-6 h-6" /></div>
                            </foreignObject>
                            <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8">Behavioral Text</text>
                            <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold">NLP Ingestion</text>
                        </g>

                        {/* Node 2: Scikit-Learn Ensemble classifier */}
                        <g transform="translate(220, 65)">
                            <rect width="120" height="110" rx="16" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                            <foreignObject x="0" y="15" width="120" height="35">
                                <div className="flex justify-center text-purple-400"><Heart className="w-7 h-7 animate-pulse" /></div>
                            </foreignObject>
                            <text x="60" y="65" textAnchor="middle" fill="#d8b4fe" fontWeight="bold">SKLearn Engine</text>
                            <text x="60" y="80" textAnchor="middle" fill="#e9d5ff" fontSize="8">TF-IDF Vectorizer</text>
                            <text x="60" y="95" textAnchor="middle" fill="#e9d5ff" fontSize="8">Ensemble Classifier</text>
                        </g>

                        {/* Node 3: Neo4j Graph DB mapping distress tokens */}
                        <g transform="translate(440, 50)">
                            <rect width="120" height="140" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                            <foreignObject x="0" y="20" width="120" height="35">
                                <div className="flex justify-center text-indigo-400"><Database className="w-8 h-8" /></div>
                            </foreignObject>
                            <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold">Neo4j Database</text>
                            <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8">Cypher queries</text>
                            <rect x="25" y="105" width="70" height="20" rx="4" fill="#312e81" stroke="#4f46e5" />
                            <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold">Temporal Paths</text>
                        </g>

                        {/* Node 4: Clinician dashboard alerts */}
                        <g transform="translate(660, 70)">
                            <rect width="100" height="100" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                            <foreignObject x="0" y="15" width="100" height="35">
                                <div className="flex justify-center text-emerald-400"><AlertCircle className="w-7 h-7" /></div>
                            </foreignObject>
                            <text x="50" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold">Decision Alert</text>
                            <text x="50" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8">Clinician View</text>
                        </g>
                    </svg>
                    <style jsx>{`
                        @keyframes dash {
                            to {
                                stroke-dashoffset: -20;
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // Default return empty or simple placeholder
    return null;
}
