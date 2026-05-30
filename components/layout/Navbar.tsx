"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollProgress(window.scrollY / totalScroll);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header 
            initial={{ y: -60, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 w-[calc(100%-2rem)] max-w-2xl z-50"
        >
            {/* Pill Container */}
            <div className="relative rounded-full border border-white/10 bg-slate-950/65 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/15 transition-all duration-300">
                {/* Gold scroll progress bar */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-white/[0.03] overflow-hidden rounded-full">
                    <motion.div 
                        className="h-full bg-amber-400/80"
                        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
                    />
                </div>
                <Link href="/" className="group text-base font-bold font-heading tracking-tighter pl-3 flex items-center gap-0.5">
                    <span className="text-white hover:text-accent transition-colors">Sneha Patel</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] p-1 rounded-full border border-white/[0.04]">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300",
                                    isActive ? "text-slate-950" : "text-muted-foreground hover:text-white hover:bg-white/[0.02]"
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
                        className="px-4 py-1.5 bg-white hover:bg-slate-200 hover:scale-[1.04] active:scale-[0.98] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.45)]"
                    >
                        Resume
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-muted-foreground hover:text-white rounded-full bg-white/[0.03] border border-white/[0.05] transition-colors"
                >
                    <motion.div 
                        animate={{ rotate: isOpen ? 90 : 0 }} 
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4 flex items-center justify-center"
                    >
                        {isOpen ? <X size={16} /> : <Menu size={16} />}
                    </motion.div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-16 left-0 right-0 p-4 rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col gap-1.5">
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
        </motion.header>
    );
}
