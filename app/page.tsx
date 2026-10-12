import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ScrollingMarquee from "@/components/home/ScrollingMarquee";
import StatsCounter from "@/components/home/StatsCounter";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import ResearchCallout from "@/components/home/ResearchCallout";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
    return (
        <>
            {/* SEO-safe h1: always server-rendered for crawlers, visually hidden since Hero renders the display heading */}
            <h1 className="sr-only">
                Sneha Patel — Computer Science Student &amp; AI/ML Developer Portfolio | Machine Learning, Computer Vision, Agentic AI &amp; IoT
            </h1>

            <Hero />

            {/* Intro / Bio Section */}
            <section className="section-padding border-t border-slate-200/40">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
                        {/* Large bio text */}
                        <div className="md:col-span-3">
                            <p className="text-xl md:text-2xl lg:text-[1.75rem] text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                                I build practical AI systems at the intersection of{" "}
                                <strong className="font-semibold text-slate-900 dark:text-white">machine learning</strong>,{" "}
                                <strong className="font-semibold text-slate-900 dark:text-white">computer vision</strong>,{" "}
                                <strong className="font-semibold text-slate-900 dark:text-white">agentic AI</strong>, and{" "}
                                <strong className="font-semibold text-slate-900 dark:text-white">embedded hardware</strong>.
                                From leading the AI architecture for Arcanum AI (6th Rank / 160 teams at TetraTHON 2026) to
                                co-authoring edge smart waste segregation research for SustainX 2026,
                                I focus on engineering systems that solve grounded, real-world problems.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="md:col-span-2 flex flex-col gap-4 md:pt-2">
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm w-fit"
                            >
                                More About Me
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-200 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 w-fit"
                            >
                                Get In Touch
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof — Animated Stats (Verified Metrics) */}
            <StatsCounter />

            {/* Services / Expertise Section */}
            <section className="section-padding-lg">
                <div className="max-w-[1200px] mx-auto">
                    {/* Section Header */}
                    <div className="mb-14 md:mb-20">
                        <div className="space-y-1">
                            <span className="txt-cursive text-lg md:text-xl text-slate-400 block">where</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-[0.9]">
                                expertise
                            </h2>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-[0.9]">
                                meets
                            </h2>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tighter uppercase text-indigo-600/20 leading-[0.9] md:text-right">
                                purpose
                            </h2>
                        </div>
                    </div>

                    {/* Services List — ruled layout */}
                    <div>
                        {DATA.services.map((service) => (
                            <div key={service.id}>
                                <div className="py-8 md:py-10 grid md:grid-cols-3 gap-4 md:gap-12 items-start">
                                    <div className="md:col-span-1">
                                        <h3 className="text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-slate-100">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                            {service.description}
                                            {service.details.length > 0 && (
                                                <>
                                                    <br /><br />
                                                    {service.details.join(". ")}.
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="divider-line" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <FeaturedProjects />

            {/* Research & Publications Section */}
            <ResearchCallout />

            {/* Testimonials */}
            <Testimonials />

            {/* Skills / Tech Stack — Categorized */}
            <section className="section-padding border-t border-slate-200/40">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid lg:grid-cols-4 gap-10 md:gap-16">
                        <div className="lg:col-span-1">
                            <span className="txt-cursive text-base text-slate-400 block mb-1">organized</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 dark:text-slate-100 leading-tight">
                                Technical Skills
                            </h2>
                            <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                                Technologies I have actively built with across production prototypes, research, and hackathons.
                            </p>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline mt-4"
                            >
                                <span>Filter projects by skill</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {DATA.skills.categorized.map((group) => (
                                <div key={group.category} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 space-y-3">
                                    <h4 className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800/80 pb-2">
                                        {group.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Marquee */}
            <ScrollingMarquee />

            {/* Collaboration & Opportunities CTA */}
            <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    <span className="txt-cursive text-base md:text-lg text-indigo-300/70 block mb-3">ready to build?</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tighter uppercase leading-[0.95] mb-6">
                        Let&apos;s Build<br />
                        <span className="text-indigo-400/60">Practical AI Systems</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl mx-auto mb-10">
                        Whether you are looking for an AI/ML intern, a research collaborator, or an engineer to build production-grade agentic and vision systems — I bring research-grounded rigor and practical execution. Open to internships, research roles, and technical collaborations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-slate-900 text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-white/10"
                        >
                            View Projects
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                        >
                            Get In Touch
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Direct Contact Links */}
            <section className="section-padding-lg">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div>
                            <span className="txt-cursive text-base text-slate-400 block mb-2">reach out</span>
                            <h3 className="text-2xl md:text-3xl font-extrabold font-heading uppercase text-slate-900 dark:text-slate-100 tracking-tight mb-4">
                                Connect &amp; Collaborate
                            </h3>
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                Have an internship opening, research opportunity, or technical challenge? I&apos;m always glad to discuss AI architectures, model evaluations, and real-world system deployments.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`mailto:${DATA.profile.email}`}
                                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:border-slate-400 bg-white/70 dark:bg-slate-900/50 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Direct Email</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">{DATA.profile.email}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link
                                href={DATA.profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:border-slate-400 bg-white/70 dark:bg-slate-900/50 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">LinkedIn</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                                        linkedin.com/in/sneha-patel-a0ba14212
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link
                                href={DATA.profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:border-slate-400 bg-white/70 dark:bg-slate-900/50 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">GitHub</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                                        github.com/snehadpatel
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
