"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DATA } from "@/lib/data";

interface StatItem {
    label: string;
    value: number;
    suffix: string;
    prefix?: string;
    detail: string;
}

const stats: StatItem[] = [
    {
        label: "Projects Built",
        value: DATA.projects.length,
        suffix: "+",
        prefix: "",
        detail: "AI, CV, IoT & Full-Stack",
    },
    {
        label: "Edge AI mAP",
        value: 90,
        suffix: "%",
        prefix: "",
        detail: "SustainX 2026 (GreenSort)",
    },
    {
        label: "Hackathon Rank",
        value: 6,
        suffix: " / 160",
        prefix: "Top ",
        detail: "TetraTHON 2026 Sprint",
    },
    {
        label: "Records Analyzed",
        value: 101,
        suffix: "K+",
        prefix: "",
        detail: "NLP Crisis Context Study",
    },
];

function AnimatedCounter({
    value,
    suffix,
    prefix = "",
}: {
    value: number;
    suffix: string;
    prefix?: string;
}) {
    // Start with the actual value for instant SSR/crawler clarity and fallback
    const [displayValue, setDisplayValue] = useState(value);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (!isInView || hasAnimated) return;

        setHasAnimated(true);
        const duration = 1200; // ms
        const steps = 30;
        const stepDuration = duration / steps;
        const isDecimal = value % 1 !== 0;
        let current = 0;

        // Reset to 0 just before starting the visible animation roll
        setDisplayValue(0);

        const timer = setInterval(() => {
            current += 1;
            const progress = Math.min(current / steps, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = eased * value;
            setDisplayValue(isDecimal ? parseFloat(val.toFixed(1)) : Math.round(val));

            if (current >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, hasAnimated, value]);

    return (
        <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}

export default function StatsCounter() {
    return (
        <section className="py-14 md:py-18 px-6 md:px-10 border-y border-slate-200/50 bg-white/40 dark:bg-slate-900/30">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            className="text-left group"
                        >
                            <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading tracking-tighter text-slate-900 dark:text-slate-100 leading-none mb-2">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    prefix={stat.prefix}
                                />
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                                    {stat.label}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 block">
                                    {stat.detail}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
