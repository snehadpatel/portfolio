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
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-primary" /> Experience
                            </h2>
                            <div className="space-y-8">
                                {DATA.experience.map((exp, i) => (
                                    <div key={i} className="relative pl-8 border-l-2 border-border pb-8 last:pb-0">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-background" />
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                            <h3 className="text-xl font-bold">{exp.role}</h3>
                                            <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">{exp.period}</span>
                                        </div>
                                        <div className="text-primary font-medium mb-3">{exp.company}</div>
                                        <p className="text-muted-foreground">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-primary" /> Education
                            </h2>
                            <div className="space-y-6">
                                {DATA.education.map((edu, i) => (
                                    <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold">{edu.degree}</h3>
                                                <div className="text-muted-foreground font-medium">{edu.institution}</div>
                                            </div>
                                            <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            <span className="font-semibold text-foreground">Relevant Coursework:</span> {edu.coursework}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Achievements */}
                        <section>
                            <h2 className="text-2xl font-bold font-heading mb-8 flex items-center gap-3">
                                <Award className="w-6 h-6 text-primary" /> Achievements & Certifications
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-secondary/30 rounded-xl border border-secondary hover:border-accent transition-colors">
                                    <h4 className="font-bold mb-1">Hackathon Winner</h4>
                                    <p className="text-sm text-muted-foreground">Best AI Solution - TechFest 2024</p>
                                </div>
                                <div className="p-4 bg-secondary/30 rounded-xl border border-secondary hover:border-accent transition-colors">
                                    <h4 className="font-bold mb-1">IBM AI Certification</h4>
                                    <p className="text-sm text-muted-foreground">Professional Certificate in AI Engineering</p>
                                </div>
                                <div className="p-4 bg-secondary/30 rounded-xl border border-secondary hover:border-accent transition-colors">
                                    <h4 className="font-bold mb-1">AWS Cloud Practitioner</h4>
                                    <p className="text-sm text-muted-foreground">Fundamentals of Cloud Computing</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Skills */}
                        <section className="bg-secondary/20 p-6 rounded-2xl border border-border">
                            <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                                <Code2 className="w-5 h-5" /> Technical Skills
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Languages</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {DATA.skills.languages.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-background border border-border rounded-md text-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Frameworks</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {DATA.skills.frameworks.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-background border border-border rounded-md text-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {DATA.skills.tools.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-background border border-border rounded-md text-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-primary text-primary-foreground p-6 rounded-2xl">
                            <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-400" /> Philosophy
                            </h2>
                            <p className="text-primary-foreground/90 text-sm leading-relaxed">
                                I believe that AI should be accessible, ethical, and designed to augment human potential. My engineering approach focuses on writing clean, maintainable code that stands the test of time.
                            </p>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
