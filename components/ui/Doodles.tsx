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
