"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { DATA } from "@/lib/data";
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
            <div className="relative rounded-full border border-slate-200/50 bg-white/85 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:border-slate-300/60 transition-all duration-300">
                {/* Periwinkle scroll progress bar */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-slate-100 overflow-hidden rounded-full">
                    <motion.div 
                        className="h-full bg-indigo-500/80"
                        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
                    />
                </div>
                <Link href="/" className="group text-base font-bold font-heading tracking-tighter pl-3 flex items-center gap-0.5">
                    <span className="text-slate-800 hover:text-indigo-600 transition-colors">Sneha Patel</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300",
                                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/30"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-slate-900 rounded-full -z-10"
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
                        href={DATA.profile.resumeUrl || "#"}
                        target="_blank"
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 hover:scale-[1.04] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_4px_12px_rgba(15,23,42,0.12)]"
                    >
                        Resume
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-full bg-slate-50/50 border border-slate-100 transition-colors"
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
                        className="absolute top-16 left-0 right-0 p-4 rounded-3xl border border-slate-200/50 bg-white/95 backdrop-blur-2xl shadow-xl md:hidden overflow-hidden"
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
                                            isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href={DATA.profile.resumeUrl || "#"}
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 w-full px-4 py-3 bg-slate-900 text-white text-center text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors"
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
