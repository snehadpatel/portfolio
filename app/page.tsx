import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DATA } from "@/lib/data";

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProjects />

            {/* Core Competencies & Skills Section */}
            <section className="py-24 border-t border-slate-200/40 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-12 items-start">
                        {/* Left column: Summary & CTA */}
                        <div className="md:col-span-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tight text-slate-900 leading-tight">
                                Technical <br />
                                <span className="text-indigo-600">Capabilities</span>
                            </h2>
                            <p className="text-slate-600 font-light leading-relaxed text-sm">
                                {DATA.profile.summary}
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed text-xs">
                                Specializing in edge computing deployments, training custom vision pipelines, and building low-latency API wrappers to power real-time AI solutions.
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href="/about" 
                                    className="inline-block px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                                >
                                    Full Experience & Bio
                                </Link>
                            </div>
                        </div>

                        {/* Right column: Categorized Skills Showcase */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Core Focus Areas */}
                            <div>
                                <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Core Specialties</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {DATA.skills.core.map((focus, i) => (
                                        <div key={focus} className="p-4 bg-white/60 border border-slate-200/50 rounded-xl flex items-center gap-3.5 hover:border-indigo-200 hover:shadow-sm transition-all duration-300 group">
                                            <span className="font-mono text-[10px] text-indigo-500/70 font-medium">0{i + 1}</span>
                                            <span className="text-xs font-medium text-slate-800 leading-none tracking-tight">{focus}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack Breakdown */}
                            <div className="border-t border-slate-200/60 pt-8 grid sm:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-4">Languages</h4>
                                    <ul className="space-y-2">
                                        {DATA.skills.languages.map((lang) => (
                                            <li key={lang} className="text-xs text-slate-600 font-mono flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                {lang}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-4">Frameworks</h4>
                                    <ul className="space-y-2">
                                        {DATA.skills.frameworks.map((fw) => (
                                            <li key={fw} className="text-xs text-slate-600 font-mono flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                {fw}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-4">Tools & Hardware</h4>
                                    <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                                        {DATA.skills.tools.map((tool) => (
                                            <span key={tool} className="px-2 py-0.5 bg-white border border-slate-200/50 rounded text-[10px] font-mono text-slate-600 whitespace-nowrap shadow-sm">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 pb-24 relative z-10">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-800 text-white rounded-3xl p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
                                Ready to collaborate?
                            </h2>
                            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                I&apos;m currently open to internship opportunities, research collaborations, and new engineering projects. Let&apos;s build something amazing together.
                            </p>
                            <Button size="lg" className="rounded-full px-8 bg-white hover:bg-slate-100 text-indigo-700 font-bold hover:scale-[1.03] transition-all shadow-md" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
