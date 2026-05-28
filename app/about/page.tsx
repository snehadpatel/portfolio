"use client";

import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
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
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-white uppercase">
                                <Briefcase className="w-5 h-5 text-white" /> Experience
                            </h2>
                            <div className="space-y-8">
                                {DATA.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-8 border-l border-white/5 pb-8 last:pb-0">
                                        <div className="absolute -left-[4.5px] top-2 w-2 h-2 rounded-full bg-white" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded-full">{exp.period}</span>
                                        </div>
                                        <div className="text-zinc-400 font-mono text-xs mb-3">{exp.company}</div>
                                        <p className="text-zinc-400 text-sm leading-relaxed font-light">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-white uppercase">
                                <GraduationCap className="w-5 h-5 text-white" /> Education
                            </h2>
                            <div className="space-y-4">
                                {DATA.education.map((edu, i) => (
                                    <div key={i} className="bg-white/[0.01] border border-white/5 p-6 rounded-xl">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                                                <div className="text-zinc-500 font-mono text-xs mt-0.5">{edu.institution}</div>
                                            </div>
                                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-xs leading-relaxed font-light">
                                            <span className="font-semibold text-white">Relevant Coursework:</span> {edu.coursework}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Achievements */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3 text-white uppercase">
                                <Award className="w-5 h-5 text-white" /> Achievements & Certifications
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.01] rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                                    <h4 className="font-bold text-sm text-white mb-1">Hackathon Winner</h4>
                                    <p className="text-xs text-zinc-500">Best AI Solution - TechFest 2024</p>
                                </div>
                                <div className="p-4 bg-white/[0.01] rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                                    <h4 className="font-bold text-sm text-white mb-1">IBM AI Certification</h4>
                                    <p className="text-xs text-zinc-500">Professional Certificate in AI Engineering</p>
                                </div>
                                <div className="p-4 bg-white/[0.01] rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                                    <h4 className="font-bold text-sm text-white mb-1">AWS Cloud Practitioner</h4>
                                    <p className="text-xs text-zinc-500">Fundamentals of Cloud Computing</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Skills */}
                        <section className="bg-white/[0.01] p-6 rounded-xl border border-white/5">
                            <h2 className="text-base font-bold font-heading mb-6 flex items-center gap-2 text-white uppercase">
                                <Code2 className="w-4 h-4 text-white" /> Technical Skills
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Languages</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.languages.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-white/[0.01] border border-white/5 rounded text-xs font-mono text-zinc-300">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Frameworks</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.frameworks.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-white/[0.01] border border-white/5 rounded text-xs font-mono text-zinc-300">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Tools</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {DATA.skills.tools.map(skill => (
                                            <span key={skill} className="px-2.5 py-1 bg-white/[0.01] border border-white/5 rounded text-xs font-mono text-zinc-300">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white/[0.02] border border-white/10 p-6 rounded-xl">
                            <h2 className="text-base font-bold font-heading mb-4 flex items-center gap-2 text-white uppercase">
                                <Heart className="w-4 h-4 text-zinc-400 animate-pulse" /> Philosophy
                            </h2>
                            <p className="text-zinc-400 text-xs leading-relaxed font-light">
                                I believe that AI should be accessible, ethical, and designed to augment human potential. My engineering approach focuses on writing clean, maintainable code that stands the test of time.
                            </p>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
