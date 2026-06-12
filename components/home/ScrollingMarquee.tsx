"use client";

import Link from "next/link";

export default function ScrollingMarquee() {
    const text = "Let\u2019s connect";

    return (
        <section className="py-6 md:py-10 overflow-hidden border-y border-slate-200/40">
            <Link href="/contact" className="block group">
                <div className="relative whitespace-nowrap">
                    <div
                        className="inline-flex gap-8 md:gap-12"
                        style={{
                            animation: "marquee-scroll 20s linear infinite",
                        }}
                    >
                        {/* Duplicate the content for seamless loop */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <span
                                key={i}
                                className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-200 group-hover:text-indigo-200 transition-colors duration-500 select-none"
                            >
                                {text}
                                <span className="txt-cursive text-3xl md:text-5xl lg:text-6xl text-slate-300 group-hover:text-indigo-300 transition-colors duration-500 mx-3 md:mx-5">
                                    ·
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </section>
    );
}
