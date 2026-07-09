"use client";

import { DATA } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UnderlineDoodle, CircleDoodle } from "@/components/ui/Doodles";
import { FAQJsonLd, SERVICE_FAQS } from "@/components/seo/FAQSchema";
import { ServicesJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function ServicesPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-20">
            {/* Structured Data for Services & FAQ */}
            <ServicesJsonLd />
            <BreadcrumbJsonLd items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
            ]} />
            <FAQJsonLd faqs={SERVICE_FAQS} />
            <div className="w-full px-6 md:px-10">
                <div className="max-w-[1200px] mx-auto">

                    {/* Page Header */}
                    <motion.div {...fadeIn} className="mb-16 md:mb-24">
                        <div className="flex items-baseline gap-3 md:gap-5 flex-wrap mb-2">
                            <span className="txt-cursive text-lg md:text-xl text-slate-400">list of</span>
                        </div>
                        <h1 className="relative inline-block text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                            Services
                            <UnderlineDoodle />
                        </h1>
                        <div className="overflow-hidden mt-1">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading tracking-tighter uppercase text-indigo-600/15 leading-[0.9]">
                                I offer
                            </h1>
                        </div>
                    </motion.div>

                    <motion.p
                        {...fadeIn}
                        className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-2xl mb-16 md:mb-20"
                    >
                        I collaborate with startups, labs, and teams to design, architect, and
                        deploy intelligent solutions, from trained ML models to edge hardware prototypes
                        that actually work in the field.
                    </motion.p>

                    {/* Services — Numbered Ruled List */}
                    <div className="mb-20 md:mb-28">
                        {DATA.services.map((service, index) => (
                            <motion.div 
                                key={service.id} 
                                {...fadeIn}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="py-8 md:py-12 grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                                    {/* Number */}
                                    <div className="md:col-span-1">
                                        <span className="relative inline-block text-sm font-mono text-slate-400 px-1">
                                            ({String(index + 1).padStart(2, "0")})
                                            <CircleDoodle isActive={hoveredIndex === index} className="text-indigo-400/80" />
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <div className="md:col-span-4">
                                        <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description + Details */}
                                    <div className="md:col-span-5">
                                        <p className="text-sm text-slate-500 leading-relaxed font-light mb-4">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {service.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-2.5">
                                                    <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                                    <span className="text-xs text-slate-500 font-light leading-relaxed">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <div className="md:col-span-2 flex md:justify-end">
                                        <Link
                                            href={`/contact?service=${service.id}`}
                                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-650 hover:text-slate-900 transition-colors"
                                        >
                                            Inquire
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="divider-line" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Custom Requirements CTA */}
                    <motion.div {...fadeIn} className="max-w-2xl">
                        <span className="txt-cursive text-base text-slate-400 block mb-2">something else?</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 mb-4">
                            Custom Requirements
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">
                            If your project spans multiple domains or needs a specialized architecture,
                            like edge ML, custom training pipelines, or full-stack dashboards, let&apos;s figure it out together.
                        </p>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm"
                        >
                            Book Consultation
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* FAQ Section — Targets Google Featured Snippets */}
                    <motion.div {...fadeIn} className="mt-20 md:mt-28">
                        <span className="txt-cursive text-base text-slate-400 block mb-2">common questions</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 mb-8 md:mb-12">
                            Frequently Asked
                        </h2>
                        <div className="space-y-0">
                            {SERVICE_FAQS.map((faq, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                        className="w-full py-5 md:py-6 flex items-start justify-between gap-4 text-left group"
                                        aria-expanded={openFAQ === index}
                                    >
                                        <h3 className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors pr-4 leading-relaxed">
                                            {faq.question}
                                        </h3>
                                        <ChevronDown
                                            className={`w-4 h-4 text-slate-400 shrink-0 mt-1 transition-transform duration-300 ${
                                                openFAQ === index ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            openFAQ === index ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <p className="text-sm text-slate-500 font-light leading-relaxed pr-10">
                                            {faq.answer}
                                        </p>
                                    </div>
                                    <div className="divider-line" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
