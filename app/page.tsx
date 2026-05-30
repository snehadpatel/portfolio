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
            <section className="py-24 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-12 items-start">
                        {/* Left column: Summary & CTA */}
                        <div className="md:col-span-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-tight text-white leading-tight">
                                Technical <br />
                                <span className="text-amber-400/80">Capabilities</span>
                            </h2>
                            <p className="text-zinc-400 font-light leading-relaxed text-sm">
                                {DATA.profile.summary}
                            </p>
                            <p className="text-zinc-500 font-light leading-relaxed text-xs">
                                Specializing in edge computing deployments, training custom vision pipelines, and building low-latency API wrappers to power real-time AI solutions.
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href="/about" 
                                    className="inline-block px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                                >
                                    Full Experience & Bio
                                </Link>
                            </div>
                        </div>

                        {/* Right column: Categorized Skills Showcase */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Core Focus Areas */}
                            <div>
                                <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Core Specialties</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {DATA.skills.core.map((focus, i) => (
                                        <div key={focus} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center gap-3.5 hover:border-amber-400/20 transition-all duration-300 group">
                                            <span className="font-mono text-[10px] text-amber-400/60 font-medium">0{i + 1}</span>
                                            <span className="text-xs font-medium text-white leading-none tracking-tight">{focus}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack Breakdown */}
                            <div className="border-t border-white/5 pt-8 grid sm:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Languages</h4>
                                    <ul className="space-y-2">
                                        {DATA.skills.languages.map((lang) => (
                                            <li key={lang} className="text-xs text-zinc-300 font-mono flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                                                {lang}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Frameworks</h4>
                                    <ul className="space-y-2">
                                        {DATA.skills.frameworks.map((fw) => (
                                            <li key={fw} className="text-xs text-zinc-300 font-mono flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                                {fw}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Tools & Hardware</h4>
                                    <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                                        {DATA.skills.tools.map((tool) => (
                                            <span key={tool} className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded text-[10px] font-mono text-zinc-400 whitespace-nowrap">
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
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                        Ready to collaborate?
                    </h2>
                    <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
                        Im currently open to new opportunities and collaborations. Lets build something amazing together.
                    </p>
                    <Button size="lg" variant="secondary" className="rounded-full px-8 text-primary font-bold" asChild>
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
