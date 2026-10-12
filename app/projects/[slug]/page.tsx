import { DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle2, AlertTriangle, Trophy, Clock, Users, Wrench, FileText, UserCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import PipelineVisualizer from "@/components/projects/PipelineVisualizer";

const PROJECT_PIPELINES: Record<string, boolean> = {
    "arcanum-ai": true,
    greensort: true,
    deepshield: true,
    dermajourney: true,
    "vegetable-classifier": true,
    "suicide-prediction": true,
    "supplier-ranking": true,
};

export function generateStaticParams() {
    return DATA.projects.map((p) => ({
        slug: p.id,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = DATA.projects.find((p) => p.id === slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-28 pb-20 bg-[#F8F9FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Header / Back Link */}
            <div className="container max-w-[1200px] mx-auto px-6 mb-8">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>
            </div>

            {/* Hero Image */}
            <div className="container max-w-[1200px] mx-auto px-6">
                <div className="w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden relative shadow-lg bg-slate-900">
                    <Image
                        src={project.image || "/assets/projects/arcanum.webp"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                </div>
            </div>

            {/* Project Quick Facts Header */}
            <div className="container max-w-[1200px] mx-auto px-6 pt-12 mb-12">
                <div className="grid lg:grid-cols-3 gap-12 items-end">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 text-[10px] font-semibold bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-mono uppercase tracking-wider shadow-sm">
                                {project.category}
                            </span>
                            {project.status && (
                                <span className="px-3 py-1 text-[10px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 rounded-full">
                                    {project.status}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-900 dark:text-slate-100 tracking-tight uppercase leading-[0.95]">
                            {project.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            {project.problemStatement || project.extended?.problemStatement || project.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end pt-4 lg:pt-0">
                        {project.link && project.link !== "#" && (
                            <Button size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-sm" asChild>
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                </Link>
                            </Button>
                        )}
                        {project.github && project.github !== "#" && (
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm" asChild>
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" /> View Repository
                                </Link>
                            </Button>
                        )}
                        {project.publication && project.publication.paperUrl && (
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm" asChild>
                                <a href={project.publication.paperUrl} download>
                                    <FileText className="w-4 h-4 mr-2" /> Research Paper (.docx)
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-14">

                    {/* My Contribution */}
                    {project.contribution && (
                        <section className="bg-indigo-50/60 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
                            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
                                <UserCheck className="w-4 h-4" /> My Role &amp; Contribution
                            </h2>
                            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-normal">
                                {project.contribution}
                            </p>
                        </section>
                    )}

                    {/* Extended Details (Solution, Tradeoffs, Impact) */}
                    {project.extended && (
                        <>
                            {project.extended.solution && (
                                <section>
                                    <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100 uppercase">
                                        <Layers className="w-5 h-5 text-indigo-500" /> Proposed Solution
                                    </h2>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light mb-6 text-sm md:text-base">
                                        {project.extended.solution}
                                    </p>

                                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2.5 p-3.5 border border-slate-200/60 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-slate-700 dark:text-slate-300">
                                                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                                <span className="text-xs font-light leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {PROJECT_PIPELINES[project.id] && (
                                        <div className="mt-8">
                                            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                                                Architecture &amp; Dataflow
                                            </h3>
                                            <PipelineVisualizer projectId={project.id} />
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Implemented vs Planned Roadmap */}
                            {project.implementedFeatures && project.implementedFeatures.length > 0 && (
                                <section className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold font-heading mb-2 text-slate-900 dark:text-slate-100 uppercase">
                                        Implementation Status &amp; Roadmap
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Implemented
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.implementedFeatures.map((f, i) => (
                                                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {project.plannedFeatures && project.plannedFeatures.length > 0 && (
                                            <div className="p-5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
                                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" /> Planned Roadmap
                                                </h4>
                                                <ul className="space-y-2">
                                                    {project.plannedFeatures.map((f, i) => (
                                                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                                                            <span>{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Trade-offs & Limitations */}
                            {project.extended.tradeoffs && (
                                <section>
                                    <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100 uppercase">
                                        <AlertTriangle className="w-5 h-5 text-amber-500" /> Engineering Trade-offs &amp; Limitations
                                    </h2>
                                    <div className="bg-amber-50/40 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-200/60 dark:border-amber-900/50 shadow-sm">
                                        <p className="text-slate-700 dark:text-slate-300 font-light text-sm leading-relaxed">
                                            <span className="font-bold text-amber-800 dark:text-amber-400 mr-2">Rationale:</span>
                                            {project.extended.tradeoffs}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* Verified Impact & Evaluation */}
                            {project.extended.impact && (
                                <section>
                                    <h2 className="text-xl md:text-2xl font-bold font-heading mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100 uppercase">
                                        <Trophy className="w-5 h-5 text-indigo-500" /> Results &amp; Evaluation
                                    </h2>
                                    <div className="bg-slate-900 dark:bg-indigo-950 p-6 rounded-xl shadow-lg text-white">
                                        <p className="text-indigo-50 text-base leading-relaxed font-light">
                                            {project.extended.impact}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* Academic Publication Section */}
                            {project.publication && (
                                <section className="space-y-4">
                                    <h2 className="text-xl md:text-2xl font-bold font-heading mb-2 flex items-center gap-2 text-slate-900 dark:text-slate-100 uppercase">
                                        <FileText className="w-5 h-5 text-indigo-500" /> Academic Publication
                                    </h2>
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Venue</span>
                                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.publication.venue || project.publication.conference}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Authors</span>
                                                <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">{project.publication.authors.join(", ")}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Paper Title</span>
                                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{project.publication.title}</h3>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Abstract</span>
                                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                                {project.publication.abstract}
                                            </p>
                                        </div>
                                        {project.publication.paperUrl && (
                                            <div className="pt-2">
                                                <Button variant="outline" className="w-full text-xs font-bold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-sm" asChild>
                                                    <a href={project.publication.paperUrl} download>
                                                        <FileText className="w-4 h-4 mr-2" /> Download Manuscript (.docx)
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                </div>

                {/* Sidebar (Constraints & Stack) */}
                <div className="space-y-6">
                    {project.extended?.constraints && (
                        <div className="p-6 border border-slate-200/60 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm sticky top-24">
                            <h3 className="font-bold mb-4 text-slate-800 dark:text-slate-200 font-heading text-base uppercase">Project Parameters</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Clock size={14} />
                                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Timeline</span>
                                    </div>
                                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{project.extended.constraints.timeline}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Users size={14} />
                                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Team Scope</span>
                                    </div>
                                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{project.extended.constraints.team}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Wrench size={14} />
                                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Primary Tech</span>
                                    </div>
                                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{project.extended.constraints.techStack}</div>
                                </div>
                            </div>

                            {/* Tech Stack Full Display */}
                            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-3 font-bold">Technology Tags</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-400 font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
