"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
    label: string;
    value: number;
    suffix: string;
    prefix?: string;
}

const stats: StatItem[] = [
    { label: "Projects Built", value: 5, suffix: "+", prefix: "" },
    { label: "ML Accuracy (Best)", value: 97.5, suffix: "%", prefix: "" },
    { label: "Certifications", value: 5, suffix: "", prefix: "" },
    { label: "Edge Inference", value: 12, suffix: " FPS", prefix: "" },
];

function AnimatedCounter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        const duration = 1500; // ms
        const steps = 40;
        const stepDuration = duration / steps;
        const isDecimal = value % 1 !== 0;
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            const progress = Math.min(current / steps, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = eased * value;
            setDisplayValue(isDecimal ? parseFloat(val.toFixed(1)) : Math.round(val));

            if (current >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}

export default function StatsCounter() {
    return (
        <section className="py-16 md:py-20 px-6 md:px-10 border-y border-slate-200/40">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading tracking-tighter text-slate-900 leading-none mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <span className="text-xs font-mono text-slate-550 uppercase tracking-wider">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
