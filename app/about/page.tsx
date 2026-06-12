"use client";

import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20">
            <div className="w-full px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">

                    {/* Page Header */}
                    <motion.div {...fadeIn} className="mb-16 md:mb-24">
                        <span className="txt-cursive text-lg text-slate-400 block mb-2">a little bit</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                            About Me
                        </h1>
                    </motion.div>

                    {/* Bio Section */}
                    <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
                        <div>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6">
                                I&apos;m Sneha - a computer science student who gets genuinely excited about
                                making machines understand the world. Whether it&apos;s training a Vision Transformer
                                to catch deepfakes or wiring up an Arduino to sort waste automatically,
                                I&apos;m happiest when code does something real.
                            </p>
                            <p className="text-sm text-slate-500 leading-relaxed font-light">
                                {DATA.profile.summary}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="py-4 border-b border-slate-200/60">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Location</span>
                                <span className="text-sm font-semibold text-slate-800">Vadodara, Gujarat, India</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Currently</span>
                                <span className="text-sm font-semibold text-slate-800">B.Tech CSE @ Navrachana University</span>
                            </div>
                            <div className="py-4 border-b border-slate-200/60">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Focus Areas</span>
                                <span className="text-sm font-semibold text-slate-800">Computer Vision · ML · IoT · Edge AI</span>
                            </div>
                            <div className="pt-4">
                                <Link
                                    href={DATA.profile.resumeUrl || "#"}
                                    target="_blank"
                                    className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                                >
                                    Download Resume
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Experience Section */}
                    <section className="mb-20 md:mb-28">
                        <motion.div {...fadeIn} className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1">professional</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                Experience
                            </h2>
                        </motion.div>

                        <div>
                            {DATA.experience.map((exp, i) => (
                                <motion.div key={i} {...fadeIn}>
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
                                    <div className="divider-line" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="mb-20 md:mb-28">
                        <motion.div {...fadeIn} className="mb-12">
                            <span className="txt-cursive text-base text-slate-400 block mb-1">academic</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                Education
                            </h2>
                        </motion.div>

                        <div>
                            {DATA.education.map((edu, i) => (
                                <motion.div key={i} {...fadeIn}>
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
                                                <span className="font-medium text-slate-700">Relevant Coursework:</span> {edu.coursework}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="divider-line" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications & Achievements */}
                    <section className="mb-20 md:mb-28">
                        <motion.div {...fadeIn} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <span className="txt-cursive text-base text-slate-400 block mb-1">recognition</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tighter uppercase text-slate-900">
                                    Achievements
                                </h2>
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
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-0">
                            {[
                                { title: "WSRO Nationals", desc: "Robot Race Competitor (Hardware & Programming)" },
                                { title: "Hackathon Commendation", desc: "AI Supplier Ranking Agent - Appreciated by CEO of Mesh Works" },
                                { title: "AWS Academy", desc: "Machine Learning Foundations Certificate" },
                                { title: "GCP Data Engineer Pro", desc: "Becoming a Google Cloud Data Engineer Certificate" },
                                { title: "Neo4j Certified Professional", desc: "Certified Professional in Graph Database Systems" },
                                { title: "IBM Professional Analytics", desc: "Data Analysis Using Python & IBM Analytics Program" },
                                { title: "Cisco Certification", desc: "Introduction to IoT & Cybersecurity Professional Certificates" },
                            ].map((item, i) => (
                                <motion.div key={i} {...fadeIn} className="py-6 border-b border-slate-200/60">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[10px] font-mono text-slate-400 mt-0.5">({String(i + 1).padStart(2, "0")})</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 mb-0.5">{item.title}</h4>
                                            <p className="text-xs text-slate-500 font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Philosophy */}
                    <motion.section {...fadeIn} className="max-w-2xl">
                        <span className="txt-cursive text-base text-slate-400 block mb-1">my philosophy</span>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
                            I believe AI should be accessible, ethical, and built to amplify what people can do - not replace them.
                            My approach is simple: write clean code, understand the problem deeply, and never stop learning.
                            The best engineering happens when curiosity meets discipline.
                        </p>
                    </motion.section>

                </div>
            </div>
        </div>
    );
}
