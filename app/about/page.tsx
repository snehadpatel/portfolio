"use client";

import { DATA } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UnderlineDoodle, CircuitTraceDoodle, CurlyArrowDoodle, ScribbleHighlightDoodle, SparkleDoodle, BulbDoodle } from "@/components/ui/Doodles";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import CertificationsDashboard from "@/components/about/CertificationsDashboard";

export default function AboutPage() {
    const { role } = useRecruiterMode();

    const highlightGrades = (text: string) => {
        const target = "Graduated with 9.42 CGPA and SPI 10 in the final semester.";
        if (text.includes(target)) {
            const parts = text.split(target);
            return (
                <>
                    {parts[0]}
                    <span className="relative inline-flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50/50 rounded px-2 py-0.5 border border-indigo-100/50">
                        Graduated with 9.42 CGPA and SPI 10
                        <SparkleDoodle className="w-3.5 h-3.5 text-amber-500 shrink-0 inline" />
                        <ScribbleHighlightDoodle className="text-indigo-500/20" />
                    </span>
                    {text.substring(text.indexOf(target) + "Graduated with 9.42 CGPA and SPI 10".length)}
                </>
            );
        }
        return text;
    };

    const getBioText = () => {
        if (role === "ml") {
            return "I'm Sneha - a computer science student specializing in Machine Learning and Computer Vision, building high-accuracy neural network models (like a 97.5% accuracy Deepfake ViT pipeline) and local edge inference architectures.";
        }
        if (role === "data") {
            return "I'm Sneha - a computer science student specializing in Data Engineering and Graph Databases, building analytics classifiers, optimizing supplier-ranking systems, and query parsing with Neo4j graph databases.";
        }
        if (role === "iot") {
            return "I'm Sneha - a computer science student specializing in IoT and Embedded Systems, linking edge vision cores (Raspberry Pi 4 running YOLOv8) with mechanical microcontrollers and autonomous tracking systems.";
        }
        if (role === "fullstack") {
            return "I'm Sneha - a computer science student specializing in Full-Stack development, building responsive Next.js/React frontend dashboards, local caching systems, and robust FastAPI backend microservices.";
        }
        return "I'm Sneha - a computer science student who gets genuinely excited about making machines understand the world. Whether it's training a Vision Transformer to catch deepfakes or wiring up an Arduino to sort waste automatically, I'm happiest when code does something real.";
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
                    <div className="mb-16 md:mb-24 print:hidden">
                        <span className="txt-cursive text-lg text-slate-400 block mb-2">a little bit</span>
                        <h1 className="relative inline-block text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                            About Me
                            <UnderlineDoodle />
                        </h1>
                    </div>

                    {/* Bio Section */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
                        <div>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6">
                                {getBioText()}
                            </p>
                            <p className="text-sm text-slate-500 leading-relaxed font-light">
                                {DATA.profile.summary}
                            </p>
                        </div>
                        <div className="space-y-6 relative">
                            {/* IoT Circuit watermark doodle */}
                            <CircuitTraceDoodle className="absolute -right-8 -bottom-12 opacity-30 pointer-events-none hidden lg:block text-indigo-500 print:hidden" />
                            
                            <div className="py-4 border-b border-slate-200/60 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Location</span>
                                <span className="text-sm font-semibold text-slate-800">Vadodara, Gujarat, India</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Currently</span>
                                <span className="text-sm font-semibold text-slate-800">B.Tech CSE @ Navrachana University</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60 relative z-10">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Focus Areas</span>
                                <span className="text-sm font-semibold text-slate-800 relative inline-block px-2 py-0.5">
                                    Computer Vision · ML · IoT · Edge AI
                                    <ScribbleHighlightDoodle className="text-indigo-500/25" />
                                </span>
                            </div>
                            <div className="pt-4 relative z-10 print:hidden flex items-center">
                                <Link
                                    href={DATA.profile.resumeUrl || "#"}
                                    target="_blank"
                                    className="group relative inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm z-10"
                                >
                                    Download Resume
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <CurlyArrowDoodle className="absolute left-[190px] -top-6 w-16 h-12 text-indigo-400/80 -rotate-[140deg] hidden sm:block pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1 print:hidden">professional</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                Experience
                            </h2>
                        </div>

                        <div>
                            {DATA.experience.map((exp, i) => (
                                <div key={i} className="page-break-avoid">
                                    <div className="py-8 md:py-10 grid md:grid-cols-3 gap-4 md:gap-12 items-start">
                                        <div className="md:col-span-1">
                                            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">{exp.role}</h3>
                                            <span className="text-xs font-mono text-indigo-600">{exp.company}</span>
                                        </div>
                                        <div className="md:col-span-1">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{exp.period}</span>
                                        </div>
                                        <div className="md:col-span-1">
                                            <p className="text-sm text-slate-500 leading-relaxed font-light">{exp.description}</p>
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
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                Education
                            </h2>
                        </div>

                        <div>
                            {DATA.education.map((edu, i) => (
                                <div key={i} className="page-break-avoid">
                                    <div className="py-8 md:py-10 grid md:grid-cols-3 gap-4 md:gap-12 items-start">
                                        <div className="md:col-span-1">
                                            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">{edu.degree}</h3>
                                            <span className="text-xs font-mono text-indigo-600">{edu.institution}</span>
                                        </div>
                                        <div className="md:col-span-1">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{edu.period}</span>
                                        </div>
                                        <div className="md:col-span-1">
                                            <p className="text-sm text-slate-500 leading-relaxed font-light">
                                                <span className="font-medium text-slate-700">Relevant Coursework:</span> {highlightGrades(edu.coursework)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="divider-line print:hidden" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications & Achievements */}
                    <section className="mb-20 md:mb-28">
                        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
                            <div className="relative">
                                <span className="txt-cursive text-base text-slate-400 block mb-1">recognition</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                    Achievements & Certifications
                                </h2>
                                <BulbDoodle className="absolute -top-10 -right-8 text-yellow-500/20 w-12 h-12 hidden md:block" />
                            </div>
                            {DATA.profile.certificationsUrl && (
                                <Link
                                    href={DATA.profile.certificationsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    Verify Certificates
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>

                        <div className="hidden print:block">
                            <h2 className="text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 mb-6">
                                Credentials & Achievements
                            </h2>
                        </div>

                        <CertificationsDashboard />
                    </section>

                    {/* Philosophy */}
                    <section className="max-w-2xl print:hidden">
                        <span className="txt-cursive text-base text-slate-400 block mb-1">my philosophy</span>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                            I believe AI should be accessible, ethical, and built to amplify what people can do - not replace them.
                            My approach is simple: write clean code, understand the problem deeply, and never stop learning.
                            The best engineering happens when curiosity meets discipline.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
