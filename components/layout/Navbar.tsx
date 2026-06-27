"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/projects", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                hasScrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                    : "bg-transparent"
            )}
        >
            <div className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <span className="text-sm font-bold font-heading tracking-tight text-slate-900 uppercase">
                        Sneha Patel
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 py-1",
                                    isActive
                                        ? "text-slate-900"
                                        : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-slate-900"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                    aria-label="Toggle navigation"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                        className="block w-5 h-[1.5px] bg-slate-900 origin-center"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-5 h-[1.5px] bg-slate-900"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                        className="block w-5 h-[1.5px] bg-slate-900 origin-center"
                    />
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
                    >
                        <nav className="flex flex-col px-6 py-6 gap-1">
                            <Link
                                href="/"
                                className={cn(
                                    "px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all",
                                    pathname === "/" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                Home
                            </Link>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all",
                                            isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
