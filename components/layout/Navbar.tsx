"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ui/ThemeProvider";
import { Sun, Moon } from "lucide-react";

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
    const { theme, toggleTheme } = useTheme();

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
                    ? "bg-white/90 dark:bg-[#090B11]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                    : "bg-transparent"
            )}
        >
            <div className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <span className="text-sm font-bold font-heading tracking-tight text-slate-900 dark:text-slate-100 uppercase">
                        Sneha Patel
                    </span>
                </Link>

                {/* Right Area (Desktop Nav) */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 py-1",
                                        isActive
                                            ? "text-slate-900 dark:text-slate-100"
                                            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="navUnderline"
                                            className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-slate-900 dark:bg-white"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-150 dark:hover:bg-slate-800/60 transition-all duration-300"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
                    </button>
                </div>

                {/* Mobile Header Controls */}
                <div className="flex md:hidden items-center gap-3">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-150 dark:hover:bg-slate-800/60 transition-all duration-300"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle navigation"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-[1.5px] bg-slate-900 origin-center dark:bg-white"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-5 h-[1.5px] bg-slate-900 dark:bg-white"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-[1.5px] bg-slate-900 origin-center dark:bg-white"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#090B11]/95 backdrop-blur-xl"
                    >
                        <nav className="flex flex-col px-6 py-6 gap-1">
                            <Link
                                href="/"
                                className={cn(
                                    "px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl transition-all",
                                    pathname === "/" ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30"
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
                                            isActive ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30"
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
