"use client";

import { Button } from "@/components/ui/Button";
import { DATA } from "@/lib/data";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Let's Connect</h1>
                        <p className="text-xl text-muted-foreground mb-12">
                            I'm currently looking for internship opportunities and open to discussing new projects.
                        </p>

                        <div className="space-y-8">
                            <Link href="mailto:sneha.patel@example.com" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-secondary transition-colors">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Email Me</div>
                                    <div className="font-semibold text-lg">sneha.patel@example.com</div>
                                </div>
                            </Link>

                            <Link href={DATA.profile.linkedin} target="_blank" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-secondary transition-colors">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Linkedin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Connect on LinkedIn</div>
                                    <div className="font-semibold text-lg">/in/sneha-patel</div>
                                </div>
                            </Link>

                            <Link href={DATA.profile.github} target="_blank" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-secondary transition-colors">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform">
                                    <Github className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Check my Code</div>
                                    <div className="font-semibold text-lg">/sneha-patel</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground mb-6">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                                <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                        placeholder="Hi Sneha, I'd like to discuss..."
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
