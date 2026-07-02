"use client";

import React from "react";
import { UnderlineDoodle, SparkleDoodle, CurlyArrowDoodle } from "@/components/ui/Doodles";
import { Download, ExternalLink, FileText } from "lucide-react";

export default function ResumePage() {
    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20 bg-slate-50/30">
            <div className="w-full px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">
                    {/* Page Header */}
                    <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
                        <div className="relative">
                            <span className="txt-cursive text-lg text-slate-400 block mb-2">curriculum vitae</span>
                            <h1 className="relative inline-block text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                                Resume
                                <UnderlineDoodle />
                                <SparkleDoodle className="absolute -top-7 -right-7 w-7 h-7 text-amber-500/90 hidden sm:block" />
                            </h1>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 relative z-10">
                            <a
                                href="/assets/resume.pdf"
                                download="Sneha_Patel_Resume.pdf"
                                className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Download PDF
                            </a>
                            <a
                                href="/assets/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 bg-white"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Open Fullscreen
                            </a>
                        </div>
                    </div>

                    {/* Desktop/Tablet PDF Viewer */}
                    <div className="hidden md:block relative bg-white border border-slate-200 shadow-md rounded-2xl p-4 mb-8">
                        <div className="absolute -left-12 top-10 pointer-events-none text-indigo-400/80 -rotate-12">
                            <CurlyArrowDoodle className="w-20 h-16" />
                            <span className="txt-cursive text-xs absolute top-12 left-10 text-indigo-500 whitespace-nowrap">scroll inside to read</span>
                        </div>

                        <div className="w-full h-[950px] rounded-xl overflow-hidden bg-slate-100 relative">
                            <iframe
                                src="/assets/resume.pdf#view=FitH"
                                className="w-full h-full border-0"
                                title="Sneha Patel Resume"
                            />
                        </div>
                    </div>

                    {/* Mobile Preview Card & CTAs */}
                    <div className="md:hidden space-y-6">
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-extrabold text-slate-800 text-base uppercase leading-tight">
                                        Sneha Patel
                                    </h3>
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                                        AI & Systems Engineer
                                    </p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed font-light">
                                PDF viewing is optimized for larger screens. You can download the PDF or open it fullscreen below to view the entire document.
                            </p>

                            <div className="space-y-2 pt-2">
                                <a
                                    href="/assets/resume.pdf"
                                    download="Sneha_Patel_Resume.pdf"
                                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Download PDF Resume
                                </a>
                                <a
                                    href="/assets/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-50"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Open Fullscreen PDF
                                </a>
                            </div>
                        </div>

                        {/* Resume Highlights Summary for Mobile */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                            <h4 className="text-xs font-mono text-slate-550 uppercase tracking-wider border-b border-slate-100 pb-2">
                                Summary Highlights
                            </h4>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-xs font-semibold text-slate-800">Education</h5>
                                    <p className="text-xs text-slate-650 font-normal mt-1 leading-relaxed">
                                        B.Tech Computer Science Engineering @ Navrachana University<br />
                                        Diploma Computer Engineering (9.42 CGPA, SPI 10)
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-xs font-semibold text-slate-800">Certifications</h5>
                                    <p className="text-xs text-slate-650 font-normal mt-1 leading-relaxed">
                                        AWS Academy Cloud Foundations · Google Cloud Ingestion & Analytics · Neo4j Certified Professional
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-xs font-semibold text-slate-800">Key Projects</h5>
                                    <p className="text-xs text-slate-650 font-normal mt-1 leading-relaxed">
                                        • DeepShield AI (97.5% Acc Deepfake classification)<br />
                                        • Greensort (IoT Edge Waste Sorting System)<br />
                                        • NLP Suicide Sentiment Graph Context Mapper
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
