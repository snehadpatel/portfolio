import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ScrollingMarquee from "@/components/home/ScrollingMarquee";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import ResearchCallout from "@/components/home/ResearchCallout";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
    return (
        <>
            <Hero />

            {/* Intro / Bio Section */}
            <section className="section-padding border-t border-slate-200/40">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
                        {/* Large bio text */}
                        <div className="md:col-span-3">
                            <p className="text-xl md:text-2xl lg:text-[1.75rem] text-slate-700 leading-relaxed font-light">
                                I&apos;ve spent the past few years going deep into{" "}
                                <strong className="font-semibold text-slate-900">computer vision</strong>,{" "}
                                <strong className="font-semibold text-slate-900">machine learning</strong>, and{" "}
                                <strong className="font-semibold text-slate-900">embedded hardware</strong>.
                                From building a deepfake detection engine that hits 97.5% accuracy, to wiring up
                                a Raspberry Pi waste sorter that classifies trash in real-time -
                                I like working where code meets the physical world.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="md:col-span-2 flex flex-col gap-4 md:pt-2">
                            <Link
                                href="/about"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 shadow-sm w-fit"
                            >
                                Know more
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 text-[11px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 w-fit"
                            >
                                Get in touch
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1.5 22.0833L22.0833 1.5M22.0833 1.5V21.26M22.0833 1.5H2.32333" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>



            {/* Services / Expertise Section */}
            <section className="section-padding-lg">
                <div className="max-w-[1200px] mx-auto">
                    {/* Section Header */}
                    <div className="mb-14 md:mb-20">
                        <div className="space-y-1">
                            <span className="txt-cursive text-lg md:text-xl text-slate-400 block">where</span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
                                expertise
                            </h2>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-[0.9]">
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
                                        <h3 className="text-lg md:text-xl font-bold font-heading text-slate-900">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-slate-500 leading-relaxed font-light">
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

            {/* Published Research Callout */}
            <ResearchCallout />

            {/* Testimonials */}
            <Testimonials />

            {/* Skills / Tech Stack — compact */}
            <section className="section-padding border-t border-slate-200/40">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-4 gap-10 md:gap-16">
                        <div className="md:col-span-1">
                            <span className="txt-cursive text-base text-slate-400 block mb-1">my</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tighter uppercase text-slate-900 leading-tight">
                                Tech Stack
                            </h2>
                        </div>

                        <div className="md:col-span-3 grid sm:grid-cols-3 gap-8 md:gap-12">
                            <div>
                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Languages</h4>
                                <ul className="space-y-2.5">
                                    {DATA.skills.languages.map((lang) => (
                                        <li key={lang} className="text-xs text-slate-600 font-mono flex items-center gap-2.5">
                                            <span className="w-1 h-1 rounded-full bg-indigo-400" />
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Frameworks</h4>
                                <ul className="space-y-2.5">
                                    {DATA.skills.frameworks.map((fw) => (
                                        <li key={fw} className="text-xs text-slate-600 font-mono flex items-center gap-2.5">
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            {fw}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Tools & Hardware</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {DATA.skills.tools.map((tool) => (
                                        <span key={tool} className="px-2 py-0.5 bg-white border border-slate-200/50 rounded text-[10px] font-mono text-slate-600 whitespace-nowrap">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Marquee */}
            <ScrollingMarquee />

            {/* Contact Block */}
            <section className="section-padding-lg">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                        <div>
                            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                                Have a project that needs vision, intelligence, or just solid engineering?
                                I&apos;m always up for a good conversation about hard problems.
                                Let&apos;s see if we can build something meaningful together.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Link
                                href={`mailto:${DATA.profile.email}`}
                                className="group flex items-center justify-between py-4 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Email</span>
                                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{DATA.profile.email}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link
                                href={DATA.profile.linkedin}
                                target="_blank"
                                className="group flex items-center justify-between py-4 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">LinkedIn</span>
                                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {DATA.profile.linkedin.replace("https://www.linkedin.com/in/", "")}
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                            </Link>

                            <Link
                                href={DATA.profile.github}
                                target="_blank"
                                className="group flex items-center justify-between py-4 border-b border-slate-200/60 hover:border-slate-400 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">GitHub</span>
                                    <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {DATA.profile.github.replace("https://github.com/", "")}
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
