"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-50">
            {/* Pill Container */}
            <div className="rounded-full border border-white/10 bg-slate-950/45 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                <Link href="/" className="text-base font-bold font-heading tracking-tighter pl-3 flex items-center gap-1 hover:opacity-80 transition-opacity">
                    Sneha<span className="text-accent">.ai</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300",
                                    isActive ? "text-slate-950" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex pr-1">
                    <Link
                        href="/assets/resume.pdf"
                        target="_blank"
                        className="px-4 py-1.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
                    >
                        Resume
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-muted-foreground hover:text-white rounded-full bg-white/[0.03] border border-white/[0.05] transition-colors"
                >
                    {isOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 p-4 rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-2xl shadow-2xl md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all",
                                            isActive ? "bg-white text-slate-950" : "text-muted-foreground hover:bg-white/[0.05] hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/assets/resume.pdf"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 w-full px-4 py-3 bg-white text-slate-950 text-center text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                View Resume
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
