"use client";

import { DATA } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900">Let&apos;s Connect</h1>
                <p className="text-xl text-slate-500 mb-12 font-light leading-relaxed">
                    I&apos;m currently looking for internship opportunities and open to discussing new projects.
                </p>

                <div className="space-y-6">
                    <Link href={`mailto:${DATA.profile.email}`} className="flex items-center gap-4 group p-4 rounded-2xl border border-slate-200/50 bg-white/60 hover:border-indigo-200/60 shadow-sm transition-all duration-300">
                        <div className="w-10 h-10 border border-slate-200/50 bg-slate-50/50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email Me</div>
                            <div className="font-semibold text-base text-slate-800 mt-0.5">{DATA.profile.email}</div>
                        </div>
                    </Link>

                    <Link href={DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-2xl border border-slate-200/50 bg-white/60 hover:border-indigo-200/60 shadow-sm transition-all duration-300">
                        <div className="w-10 h-10 border border-slate-200/50 bg-slate-50/50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                            <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Connect on LinkedIn</div>
                            <div className="font-semibold text-sm text-slate-800 mt-0.5">
                                {DATA.profile.linkedin.replace("https://www.linkedin.com/in/", "")}
                            </div>
                        </div>
                    </Link>

                    <Link href={DATA.profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-2xl border border-slate-200/50 bg-white/60 hover:border-indigo-200/60 shadow-sm transition-all duration-300">
                        <div className="w-10 h-10 border border-slate-200/50 bg-slate-50/50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                            <Github className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Check my Code</div>
                            <div className="font-semibold text-sm text-slate-800 mt-0.5">
                                {DATA.profile.github.replace("https://github.com/", "")}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Form */}
            <div className="border border-slate-200/50 bg-white/60 p-8 rounded-2xl shadow-sm">
                {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-12 h-12 border border-slate-200/50 bg-slate-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-slate-800">Message Sent</h3>
                        <p className="text-slate-500 text-xs mb-6 max-w-xs font-light">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                        <button 
                            onClick={() => setSubmitted(false)} 
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                        >
                            Send Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="w-full px-0 pb-2 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 focus:ring-0 transition-all outline-none rounded-none text-sm placeholder:text-slate-300"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-0 pb-2 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 focus:ring-0 transition-all outline-none rounded-none text-sm placeholder:text-slate-300"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                defaultValue={getInitialMessage()}
                                className="w-full px-0 pb-2 border-b border-slate-200 bg-transparent text-slate-800 focus:border-indigo-500 focus:ring-0 transition-all outline-none rounded-none text-sm resize-none placeholder:text-slate-300 leading-relaxed"
                                placeholder="Hi Sneha, I&apos;d like to discuss..."
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#F8F9FC]">
            <div className="container mx-auto px-6 max-w-5xl">
                <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </div>
    );
}
