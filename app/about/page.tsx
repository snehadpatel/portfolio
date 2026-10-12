"use client";

import { DATA } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Download, FileText, CheckCircle, Clock } from "lucide-react";
import { UnderlineDoodle, CircuitTraceDoodle, CurlyArrowDoodle, ScribbleHighlightDoodle, SparkleDoodle, BulbDoodle } from "@/components/ui/Doodles";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import CertificationsDashboard from "@/components/about/CertificationsDashboard";

export default function AboutPage() {
    const { role } = useRecruiterMode();

    const highlightGrades = (text: string) => {
        const target = "Graduated with academic distinction (9.42 CGPA and perfect SPI 10 in final semester).";
        if (text.includes(target)) {
            const parts = text.split(target);
            return (
                <>
                    {parts[0]}
                    <span className="relative inline-flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50/50 rounded px-2 py-0.5 border border-indigo-100/50">
                        Graduated with 9.42 CGPA and SPI 10.0
                        <SparkleDoodle className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                        <ScribbleHighlightDoodle className="text-indigo-500/20" />
                    </span>
                    {parts[1]}
                </>
            );
        }
        return text;
    };

    const getBioText = () => {
        if (role === "ml") {
            return "I'm Sneha — a Computer Science student specializing in Machine Learning, Deep Learning, and Computer Vision. I build neural architectures, digital media forensics pipelines, and edge vision models for real-world applications.";
        }
        if (role === "data") {
            return "I'm Sneha — a Computer Science student specializing in Data Science, Model Evaluation, and Graph Databases. I analyze large-scale datasets, construct relational and Neo4j graph models, and build decision intelligence ranking systems.";
        }
        if (role === "iot") {
            return "I'm Sneha — a Computer Science student specializing in IoT & Embedded Hardware. I engineer physical computing prototypes linking Raspberry Pi edge deep learning units to Arduino microcontroller sensor arrays.";
        }
        if (role === "fullstack") {
            return "I'm Sneha — a Computer Science student specializing in AI Application Integration. I build responsive Next.js frontend interfaces, client telemetry mechanisms, and robust FastAPI backend microservices.";
        }
        return "I'm Sneha — a Computer Science student at Navrachana University and an AI/ML developer focused on building practical AI systems and products. Whether it's architecting real-time educational AI for Arcanum AI or integrating edge deep learning on hardware for SustainX 2026, I focus on solving real-world challenges with rigorous engineering.";
    };

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20">
            <div className="w-full px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">

                    {/* Resume Header (Print Only) */}
                    <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-1">{DATA.profile.name}</h1>
                        <p className="text-sm font-mono text-indigo-600 mb-2">{role ? `${role.toUpperCase()} Engineer Profile` : DATA.profile.tagline}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600 font-mono">
                            <span>Email: {DATA.profile.email}</span>
                            <span>GitHub: github.com/snehadpatel</span>
                            <span>LinkedIn: linkedin.com/in/sneha-patel-a0ba14212</span>
                            <span>Location: Vadodara, Gujarat, India</span>
                        </div>
                    </div>

                    {/* Page Header (Web Only) */}
                    <div className="mb-14 md:mb-20 print:hidden">
                        <span className="txt-cursive text-lg text-slate-400 block mb-2">curriculum &amp; background</span>
                        <h1 className="relative inline-block text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-[0.9]">
                            About Me
                            <UnderlineDoodle />
                        </h1>
                    </div>

                    {/* Bio Section */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
                        <div>
                            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light mb-6">
                                {getBioText()}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                {DATA.profile.summary}
                            </p>
                        </div>
                        <div className="space-y-6 relative">
                            {/* IoT Circuit watermark doodle */}
                            <CircuitTraceDoodle className="absolute -right-8 -bottom-12 opacity-30 pointer-events-none hidden lg:block text-indigo-500 print:hidden" />

                            <div className="py-4 border-b border-slate-200/60 dark:border-slate-800 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Location</span>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Vadodara, Gujarat, India</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60 dark:border-slate-800 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Education</span>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">B.Tech Computer Science &amp; Engineering @ Navrachana University (2027)</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60 dark:border-slate-800 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Core Focus</span>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 relative inline-block px-2 py-0.5">
                                    AI &amp; ML · Deep Learning · Agentic AI · Edge Vision &amp; IoT
                                    <ScribbleHighlightDoodle className="text-indigo-500/25" />
                                </span>
                            </div>
                            <div className="pt-4 relative z-10 print:hidden flex items-center">
                                <a
                                    href={DATA.profile.resumeUrl || "/assets/resume.pdf"}
                                    download="Sneha_Patel_Resume.pdf"
                                    className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm z-10 cursor-pointer"
                                >
                                    Download Resume
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <CurlyArrowDoodle className="absolute left-[190px] -top-6 w-16 h-12 text-indigo-400/80 -rotate-[140deg] hidden sm:block pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Professional Experience Timeline */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1 print:hidden">chronological</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100">
                                Experience
                            </h2>
                        </div>

                        <div className="space-y-0">
                            {DATA.experience.map((exp, i) => (
                                <div key={i} className="page-break-avoid">
                                    <div className="py-8 md:py-10 grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                                        <div className="md:col-span-4 space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                                            </div>
                                            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 block">{exp.company}</span>
                                            {exp.type && (
                                                <span className="inline-block text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700">
                                                    {exp.type}
                                                </span>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">{exp.period}</span>
                                        </div>

                                        <div className="md:col-span-6 space-y-3">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">{exp.description}</p>

                                            {exp.deliverables && exp.deliverables.length > 0 && (
                                                <ul className="space-y-1.5 pt-1">
                                                    {exp.deliverables.map((del, dIdx) => (
                                                        <li key={dIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                                                            <span>{del}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {exp.technologies && (
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {exp.technologies.map((tech) => (
                                                        <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="divider-line print:hidden" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1 print:hidden">academic</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100">
                                Education
                            </h2>
                        </div>

                        <div>
                            {DATA.education.map((edu, i) => (
                                <div key={i} className="page-break-avoid">
                                    <div className="py-8 md:py-10 grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                                        <div className="md:col-span-4 space-y-1">
                                            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h3>
                                            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 block">{edu.institution}</span>
                                            {edu.score && (
                                                <span className="inline-block text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                                                    {edu.score}
                                                </span>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">{edu.period}</span>
                                        </div>

                                        <div className="md:col-span-6">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                                <strong className="font-semibold text-slate-800 dark:text-slate-200">Relevant Coursework:</strong>{" "}
                                                {highlightGrades(edu.coursework)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="divider-line print:hidden" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Research & Publications Section */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1 print:hidden">scientific contribution</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100">
                                Research &amp; Papers
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {DATA.research.map((item) => (
                                <div key={item.id} className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded border border-indigo-100 dark:border-indigo-900">
                                            {item.area}
                                        </span>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                                            {item.status}
                                        </span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-slate-100">
                                        {item.title}
                                    </h3>

                                    <div className="text-xs font-mono text-slate-500 space-y-0.5">
                                        <p><span className="text-slate-400">Authors:</span> {item.authors.join(", ")}</p>
                                        <p><span className="text-slate-400">Venue:</span> <strong className="text-slate-700 dark:text-slate-300 font-semibold">{item.venue}</strong></p>
                                        {item.guide && <p><span className="text-slate-400">Guide:</span> {item.guide}</p>}
                                    </div>

                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                        {item.abstract}
                                    </p>

                                    {item.paperUrl && (
                                        <div className="pt-2">
                                            <a
                                                href={item.paperUrl}
                                                download
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                Download Manuscript (.docx)
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications & Achievements */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
                            <div className="relative">
                                <span className="txt-cursive text-base text-slate-400 block mb-1">recognition</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100">
                                    Achievements &amp; Certifications
                                </h2>
                                <BulbDoodle className="absolute -top-10 -right-8 text-yellow-500/20 w-12 h-12 hidden md:block" />
                            </div>
                            {DATA.profile.certificationsUrl && (
                                <Link
                                    href={DATA.profile.certificationsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    Verify Certificates Drive
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>

                        <div className="hidden print:block">
                            <h2 className="text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 mb-6">
                                Credentials &amp; Achievements
                            </h2>
                        </div>

                        <CertificationsDashboard />
                    </section>

                    {/* Philosophy */}
                    <section className="max-w-2xl print:hidden">
                        <span className="txt-cursive text-base text-slate-400 block mb-1">engineering mindset</span>
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            I believe AI should solve grounded, real-world problems and amplify what people can achieve.
                            My approach is simple: understand the core problem deeply, build robust architectures, validate claims with empirical data, and never stop learning.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
