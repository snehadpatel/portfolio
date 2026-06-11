"use client";

import { DATA } from "@/lib/data";
import { Briefcase, GraduationCap, Code2, Award, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Me</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        I am a passionate developer and AI enthusiast, driven by the potential of technology to solve complex human problems.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">

                    {/* Main Content Column */}
                    <div className="md:col-span-2 space-y-16">
                        {/* Experience */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-slate-800 uppercase">
                                <Briefcase className="w-5 h-5 text-indigo-600" /> Experience
                            </h2>
                            <div className="space-y-8">
                                {DATA.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-8 border-l border-slate-200 pb-8 last:pb-0">
                                        <div className="absolute -left-[4.5px] top-2 w-2 h-2 rounded-full bg-indigo-600" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                            <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">{exp.period}</span>
                                        </div>
                                        <div className="text-indigo-600 font-mono text-xs mb-3">{exp.company}</div>
                                        <p className="text-slate-600 text-sm leading-relaxed font-light">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-slate-800 uppercase">
                                <GraduationCap className="w-5 h-5 text-indigo-600" /> Education
                            </h2>
                            <div className="space-y-4">
                                {DATA.education.map((edu, i) => (
                                    <div key={i} className="bg-white/60 border border-slate-200/50 p-6 rounded-2xl shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">{edu.degree}</h3>
                                                <div className="text-indigo-600/90 font-mono text-xs mt-0.5">{edu.institution}</div>
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-xs leading-relaxed font-light">
                                            <span className="font-semibold text-slate-800">Relevant Coursework:</span> {edu.coursework}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Achievements */}
                        <section>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <h2 className="text-2xl font-bold font-heading flex items-center gap-3 text-slate-800 uppercase">
                                    <Award className="w-5 h-5 text-indigo-600" /> Achievements & Certifications
                                </h2>
                                {DATA.profile.certificationsUrl && (
                                    <a
                                        href={DATA.profile.certificationsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm rounded-lg text-xs font-semibold transition-all uppercase tracking-wider font-mono self-start sm:self-auto"
                                    >
                                        Verify Certificates →
                                    </a>
                                )}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">WSRO Nationals</h4>
                                    <p className="text-xs text-slate-500">Robot Race Competitor (Hardware & Programming)</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">Hackathon Commendation</h4>
                                    <p className="text-xs text-slate-500">AI Supplier Ranking Agent (Appreciated by CEO of Mesh Works)</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">AWS Academy</h4>
                                    <p className="text-xs text-slate-500">Machine Learning Foundations Certificate</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">GCP Data Engineer Pro</h4>
                                    <p className="text-xs text-slate-500">Becoming a Google Cloud Data Engineer Certificate</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">Neo4j Certified Professional</h4>
                                    <p className="text-xs text-slate-500">Certified Professional in Graph Database Systems</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">IBM Professional Analytics</h4>
                                    <p className="text-xs text-slate-500">Data Analysis Using Python & IBM Analytics Program (2024-2025)</p>
                                </div>
                                <div className="p-4 bg-white/60 rounded-2xl border border-slate-200/50 hover:border-indigo-200 shadow-sm transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 mb-1">Cisco Certification</h4>
                                    <p className="text-xs text-slate-500">Introduction to IoT & Cybersecurity Professional Certificates</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Skills */}
                        <section className="bg-white/60 p-6 rounded-2xl border border-slate-200/50 shadow-sm">
                            <h2 className="text-base font-bold font-heading mb-6 flex items-center gap-2 text-slate-800 uppercase">
                                <Code2 className="w-4 h-4 text-indigo-600" /> Technical Skills
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Languages</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.languages.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-200/40 rounded text-xs font-mono text-slate-600">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Frameworks</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.frameworks.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-200/40 rounded text-xs font-mono text-slate-600">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Tools</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.tools.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-200/40 rounded text-xs font-mono text-slate-600">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-indigo-50/50 border border-indigo-100/50 p-6 rounded-2xl shadow-sm">
                            <h2 className="text-base font-bold font-heading mb-4 flex items-center gap-2 text-indigo-950 uppercase">
                                <Heart className="w-4 h-4 text-indigo-500 animate-pulse" /> Philosophy
                            </h2>
                            <p className="text-indigo-950/80 text-xs leading-relaxed font-light">
                                I believe that AI should be accessible, ethical, and designed to augment human potential. My engineering approach focuses on writing clean, maintainable code that stands the test of time.
                            </p>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
