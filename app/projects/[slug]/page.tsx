import { DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle2, AlertTriangle, Trophy, Clock, Users, Wrench, FileText } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import PipelineVisualizer from "@/components/projects/PipelineVisualizer";

const PROJECT_PIPELINES: Record<string, boolean> = {
    deepshield: true,
    "vegetable-classifier": true,
    greensort: true,
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
        <article className="min-h-screen pt-28 pb-20 bg-[#F8F9FC]">
            {/* Header / Back Link */}
            <div className="container mx-auto px-6 mb-8">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>
            </div>

            {/* Hero Image */}
            <div className="container mx-auto px-6">
                <div className="w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl overflow-hidden relative shadow-lg">
                    <Image
                        src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
            </div>

            {/* Project Quick Facts Header */}
            <div className="container mx-auto px-6 pt-12 mb-12">
                <div className="grid lg:grid-cols-3 gap-12 items-end">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 text-[10px] font-semibold bg-white border border-slate-200/60 text-slate-600 rounded-full font-mono uppercase tracking-wider shadow-sm">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight uppercase leading-[0.9]">
                            {project.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                            {project.extended?.problemStatement || project.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end pt-4 lg:pt-0">
                        {project.link && project.link !== "#" && (
                            <Button size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm" asChild>
                                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                </Link>
                            </Button>
                        )}
                        {project.github && project.github !== "#" && (
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-sm" asChild>
                                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" /> View Code
                                </Link>
                            </Button>
                        )}
                        {project.publication && (
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider text-xs rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-sm" asChild>
                                <Link href={project.publication.paperUrl} download>
                                    <FileText className="w-4 h-4 mr-2" /> Research Paper
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Extended Details (Solution, Tradeoffs, Impact) */}
                    {project.extended && (
                        <>
                            {project.extended.solution && (
                                <section>
                                    <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                                        <Layers className="w-6 h-6 text-indigo-500" /> The Solution
                                    </h2>
                                    <p className="text-slate-700 leading-relaxed font-light mb-6">
                                        {project.extended.solution}
                                    </p>
                                    
                                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 p-4 border border-slate-200/50 rounded-xl bg-white/70 shadow-sm text-slate-700">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                                <span className="text-sm font-light leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {PROJECT_PIPELINES[project.id] && (
                                        <div className="mt-8">
                                            <h3 className="font-bold mb-4 text-slate-800 font-heading">System Pipeline</h3>
                                            <PipelineVisualizer projectId={project.id} />
                                        </div>
                                    )}
                                </section>
                            )}

                            {project.extended.tradeoffs && (
                                <section>
                                    <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                                        <AlertTriangle className="w-6 h-6 text-amber-500" /> Engineering Trade-offs
                                    </h2>
                                    <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-200/60 shadow-sm">
                                        <p className="text-slate-700 font-light leading-relaxed">
                                            <span className="font-bold text-amber-700/80 mr-2">Why?</span>
                                            {project.extended.tradeoffs}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {project.extended.impact && (
                                <section>
                                    <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                                        <Trophy className="w-6 h-6 text-indigo-500" /> Proven Impact
                                    </h2>
                                    <div className="bg-indigo-600 p-6 md:p-8 rounded-xl shadow-lg text-white relative overflow-hidden">
                                        <div className="absolute -right-10 -top-10 text-indigo-500/30 font-serif text-[150px] font-bold italic leading-none pointer-events-none">
                                            %
                                        </div>
                                        <p className="text-indigo-50 text-lg leading-relaxed font-medium relative z-10">
                                            {project.extended.impact}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {project.publication && (
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 text-slate-900 uppercase">
                                        <FileText className="w-6 h-6 text-indigo-500" /> Academic Publication
                                    </h2>
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Conference</span>
                                                <span className="text-sm font-semibold text-slate-800">{project.publication.conference}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Authors</span>
                                                <span className="text-sm font-semibold text-slate-800">{project.publication.authors.join(", ")}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Paper Title</span>
                                            <h3 className="text-base font-bold text-slate-900 leading-snug">{project.publication.title}</h3>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 block mb-1">Abstract</span>
                                            <p className="text-sm text-slate-500 leading-relaxed font-light bg-slate-50/50 p-4 rounded-lg border border-slate-100 italic">
                                                &ldquo;{project.publication.abstract}&rdquo;
                                            </p>
                                        </div>
                                        <div className="pt-2">
                                            <Button variant="outline" className="w-full text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm" asChild>
                                                <Link href={project.publication.paperUrl} download>
                                                    <FileText className="w-4 h-4 mr-2" /> Download Research Paper (.docx)
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                </div>

                {/* Sidebar (Constraints) */}
                <div className="space-y-8">
                    {project.extended?.constraints ? (
                        <div className="p-6 border border-slate-200/60 rounded-2xl bg-white shadow-sm sticky top-24">
                            <h3 className="font-bold mb-6 text-slate-800 font-heading text-lg uppercase">The Constraints</h3>
                            <div className="space-y-5 text-sm">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Clock size={16} />
                                        <span className="font-mono text-[11px] uppercase tracking-wider font-bold">Timeline</span>
                                    </div>
                                    <div className="font-medium text-slate-700">{project.extended.constraints.timeline}</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Users size={16} />
                                        <span className="font-mono text-[11px] uppercase tracking-wider font-bold">Team</span>
                                    </div>
                                    <div className="font-medium text-slate-700">{project.extended.constraints.team}</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 text-indigo-500">
                                        <Wrench size={16} />
                                        <span className="font-mono text-[11px] uppercase tracking-wider font-bold">Core Tech</span>
                                    </div>
                                    <div className="font-medium text-slate-700">{project.extended.constraints.techStack}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 border border-slate-200/60 rounded-2xl bg-white/70 shadow-sm sticky top-24">
                            <h3 className="font-bold mb-4 text-slate-800 font-heading text-lg">Project Info</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="text-slate-400 mb-1 font-mono text-xs">Role</div>
                                    <div className="font-medium text-slate-800">Developer</div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Tech Stack Full Display */}
                    <div className="p-6 border border-slate-200/60 rounded-2xl bg-white/70 shadow-sm">
                        <h3 className="font-bold mb-4 text-slate-800 font-heading text-lg uppercase">Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 bg-slate-100 border border-slate-200/50 rounded-md text-xs font-medium text-slate-600 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
