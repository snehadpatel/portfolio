"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. Reusable Underline Doodle for Headers
export function UnderlineDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn(
                "absolute left-0 -bottom-2 md:-bottom-3 w-full h-[12px] text-indigo-500/60 pointer-events-none",
                className
            )}
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
        >
            <motion.path
                d="M 2 6 C 30 9, 70 3, 98 5"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
                d="M 12 8 C 45 10, 75 6, 88 7"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            />
        </svg>
    );
}

// 2. Circle Doodle (Circling text or numbers on hover/load)
export function CircleDoodle({ isActive = true, className }: { isActive?: boolean; className?: string }) {
    return (
        <svg
            className={cn(
                "absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] text-indigo-500/70 pointer-events-none",
                className
            )}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <motion.path
                d="M 50 4 C 75 4, 96 25, 96 50 C 96 75, 75 96, 50 96 C 25 96, 4 75, 4 50 C 4 25, 25 4, 52 5"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </svg>
    );
}

// 3. Star Doodle (bullet highlights/decoration)
export function StarDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-4 h-4 text-amber-500/80 shrink-0 select-none", className)}
            viewBox="0 0 100 100"
            fill="none"
        >
            <motion.path
                d="M 50 10 L 63 38 L 95 38 L 69 57 L 79 88 L 50 69 L 21 88 L 31 57 L 5 38 L 37 38 L 50 10"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
        </svg>
    );
}

// 4. Paper Plane Doodle (email/contact decoration)
export function PaperPlaneDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-24 h-24 text-indigo-400/50 pointer-events-none select-none", className)}
            viewBox="0 0 100 100"
            fill="none"
        >
            {/* Trail */}
            <motion.path
                d="M 10 90 Q 30 85, 25 65 T 32 52"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: "easeOut" }}
            />
            {/* Airplane body */}
            <motion.path
                d="M 90 10 L 30 50 L 50 60 L 90 10 L 60 85 L 50 60 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            />
        </svg>
    );
}

// 5. Circuit Trace Doodle (IoT/Hardware themed trace)
export function CircuitTraceDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-32 h-32 text-indigo-400/40 pointer-events-none select-none", className)}
            viewBox="0 0 100 100"
            fill="none"
        >
            <motion.path
                d="M 10 20 H 45 L 60 45 H 90"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: "easeOut" }}
            />
            <motion.path
                d="M 45 20 V 60 L 55 75 H 80"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
            {/* Node Dots */}
            <motion.circle
                cx="10"
                cy="20"
                r="3.5"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
            />
            <motion.circle
                cx="90"
                cy="45"
                r="3.5"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
            />
            <motion.circle
                cx="80"
                cy="75"
                r="3.5"
                fill="currentColor"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
            />
        </svg>
    );
}

// 6. Signature Doodle ("Sneha" handwriting signature)
export function SignatureDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-32 h-16 text-indigo-500/70 pointer-events-none select-none", className)}
            viewBox="0 0 160 80"
            fill="none"
        >
            {/* Letter S */}
            <motion.path
                d="M 25 55 C 20 40, 35 20, 50 25 C 65 30, 35 48, 55 52 C 65 53, 70 45, 68 40"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* letters neha */}
            <motion.path
                d="M 68 40 C 72 35, 75 48, 77 48 C 79 48, 83 38, 86 42 C 88 45, 87 48, 92 48 C 96 48, 98 32, 100 48 C 102 48, 104 42, 108 42 C 112 42, 114 48, 117 48 C 120 48, 122 40, 124 45"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.5, ease: "easeInOut" }}
            />
            {/* Swoop/Underline */}
            <motion.path
                d="M 15 62 Q 80 50, 145 58 Q 95 68, 55 72"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            />
        </svg>
    );
}

// 7. Curly Hand-drawn Arrow Doodle
export function CurlyArrowDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-20 h-16 text-indigo-400/80 pointer-events-none select-none", className)}
            viewBox="0 0 100 80"
            fill="none"
        >
            <motion.path
                d="M 15 15 C 35 12, 65 20, 50 50 C 40 70, 70 80, 95 70"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
                d="M 85 78 L 98 70 L 88 58"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
            />
        </svg>
    );
}

// 8. Sparkle Doodle (multi-star decoration)
export function SparkleDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-8 h-8 text-amber-400/90 pointer-events-none select-none", className)}
            viewBox="0 0 40 40"
            fill="none"
        >
            {/* Sparkle 1 */}
            <motion.path
                d="M 20 5 Q 20 20, 5 20 Q 20 20, 20 35 Q 20 20, 35 20 Q 20 20, 20 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, scale: 0.7, opacity: 0 }}
                whileInView={{ pathLength: 1, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Tiny Sparkle 2 */}
            <motion.path
                d="M 32 8 Q 32 12, 28 12 Q 32 12, 32 16 Q 32 12, 36 12 Q 32 12, 32 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
                whileInView={{ pathLength: 1, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            />
        </svg>
    );
}

// 9. Hand-drawn Lightbulb / Tech AI Idea Doodle
export function BulbDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-20 h-20 text-yellow-500/60 pointer-events-none select-none", className)}
            viewBox="0 0 100 100"
            fill="none"
        >
            {/* Outer Glass */}
            <motion.path
                d="M 35 65 C 22 55, 20 25, 50 25 C 80 25, 78 55, 65 65 L 63 76 H 37 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Brain Filaments */}
            <motion.path
                d="M 50 25 C 42 35, 32 32, 45 48 C 35 53, 40 60, 50 65"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
                d="M 50 25 C 58 35, 68 32, 55 48 C 65 53, 60 60, 50 65"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
            {/* Base Screw */}
            <motion.path
                d="M 39 76 Q 50 79, 61 76 M 41 81 Q 50 84, 59 81 M 44 86 H 56"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
            />
            {/* Glow rays */}
            {[
                "M 20 28 L 10 20",
                "M 80 28 L 90 20",
                "M 15 48 H 4",
                "M 85 48 H 96",
                "M 50 16 V 4"
            ].map((rayD, i) => (
                <motion.path
                    key={i}
                    d={rayD}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
                />
            ))}
        </svg>
    );
}

// 10. Scribble Loop Highlight
export function ScribbleHighlightDoodle({ className }: { className?: string }) {
    return (
        <svg
            className={cn("absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+8px)] text-indigo-400/40 pointer-events-none select-none", className)}
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            fill="none"
        >
            <motion.path
                d="M 4 12 C 30 6, 70 8, 96 10 C 65 18, 15 15, 52 24 C 80 26, 92 18, 75 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </svg>
    );
}

