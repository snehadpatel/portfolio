"use client";

import { DATA } from "@/lib/data";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get("service");

    const getInitialMessage = () => {
        if (!serviceParam) return "";
        const service = DATA.services.find((s) => s.id === serviceParam);
        return service
            ? `Hi Sneha, I would like to inquire about your "${service.title}" service. Let's discuss the scope of our collaboration!`
            : "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <motion.div {...fadeIn} className="mb-16 md:mb-24">
                <span className="txt-cursive text-lg text-slate-400 block mb-2">say</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                    Hello
                </h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                {/* Left — Info */}
                <motion.div {...fadeIn}>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-10">
                        I&apos;m currently looking for internship opportunities and always open to
                        discussing projects that push what&apos;s possible with AI, vision, and hardware.
                        Drop me a message — I&apos;d love to hear what you&apos;re building.
                    </p>

                    <div className="space-y-0">
                        <Link
                            href={`mailto:${DATA.profile.email}`}
                            className="group flex items-center justify-between py-5 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                        >
                            <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Email</span>
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{DATA.profile.email}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                        </Link>

                        <Link
                            href={DATA.profile.linkedin}
                            target="_blank"
                            className="group flex items-center justify-between py-5 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                        >
                            <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">LinkedIn</span>
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                    {DATA.profile.linkedin.replace("https://www.linkedin.com/in/", "")}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                        </Link>

                        <Link
                            href={DATA.profile.github}
                            target="_blank"
                            className="group flex items-center justify-between py-5 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                        >
                            <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">GitHub</span>
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                    {DATA.profile.github.replace("https://github.com/", "")}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </motion.div>

                {/* Right — Form */}
                <motion.div {...fadeIn}>
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-16">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Message Sent</h3>
                            <p className="text-sm text-slate-500 font-light mb-8 max-w-xs">
                                Thanks for reaching out! I&apos;ll get back to you as soon as I can.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-colors"
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div>
                                <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Your Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="w-full px-0 pb-3 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 transition-colors outline-none text-sm placeholder:text-slate-300 font-light"
                                    placeholder="What should I call you?"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Your Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full px-0 pb-3 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 transition-colors outline-none text-sm placeholder:text-slate-300 font-light"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    defaultValue={getInitialMessage()}
                                    className="w-full px-0 pb-3 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 transition-colors outline-none text-sm resize-none placeholder:text-slate-300 font-light leading-relaxed"
                                    placeholder="Tell me about your project or idea..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                            >
                                {isSubmitting ? "Sending..." : "Let\u2019s Talk"}
                                {!isSubmitting && (
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20">
            <div className="w-full px-6 md:px-10">
                <Suspense fallback={<div className="text-center py-20 text-slate-400 text-sm">Loading...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </div>
    );
}
