import Link from "next/link";
import { ArrowUpRight, Shield, Activity, BarChart3, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    image: string;
    category: string;
}

function ProjectVisual({ id }: { id: string }) {
    switch (id) {
        case "deepshield":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/25">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-indigo-500/10 blur-[18px] animate-[pulse_4s_infinite]" />
                    <div className="relative w-20 h-20 rounded-full border border-white/[0.05] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-white/[0.03]" />
                        <div className="absolute inset-0 rounded-full border-t border-amber-400/25 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>
                </div>
            );
        case "vegetable-classifier":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/25">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-emerald-500/8 blur-[18px] animate-[pulse_5s_infinite]" />
                    <div className="relative w-16 h-16 border border-dashed border-white/[0.05] rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/20 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.314 5.314a9 9 0 0113.372 13.372" />
                        </svg>
                    </div>
                </div>
            );
        case "greensort":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/25">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-amber-500/8 blur-[18px] animate-[pulse_4.5s_infinite]" />
                    <div className="relative w-20 h-20 rounded-full border border-white/[0.05] flex items-center justify-center">
                        <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-pulse" />
                        <div className="w-3 h-3 rounded-full bg-white/10" />
                    </div>
                </div>
            );
        case "supplier-ranking":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/25">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-28 h-28 rounded-full bg-amber-600/5 blur-[20px] animate-[pulse_6s_infinite]" />
                    <div className="w-32 space-y-2.5">
                        <div className="h-[2px] bg-gradient-to-r from-amber-400/25 to-transparent w-full rounded animate-[pulse_2s_infinite]" />
                        <div className="h-[2px] bg-gradient-to-r from-amber-400/15 to-transparent w-4/5 rounded animate-[pulse_2.2s_infinite]" />
                        <div className="h-[2px] bg-gradient-to-r from-amber-400/8 to-transparent w-3/5 rounded animate-[pulse_2.4s_infinite]" />
                    </div>
                </div>
            );
        case "suicide-prediction":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/25">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-purple-500/10 blur-[18px] animate-[pulse_4s_infinite]" />
                    <svg className="w-32 h-16 opacity-20" viewBox="0 0 160 80">
                        <line x1="30" y1="40" x2="80" y2="20" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="40" x2="80" y2="60" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="20" x2="130" y2="40" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="60" x2="130" y2="40" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
                        
                        <circle cx="30" cy="40" r="2.5" fill="white" />
                        <circle cx="80" cy="20" r="4" fill="white" className="animate-pulse" />
                        <circle cx="80" cy="60" r="4" fill="white" className="animate-pulse" />
                        <circle cx="130" cy="40" r="2.5" fill="white" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">/ {id}</span>
                </div>
            );
    }
}

export default function ProjectCard({
    id,
    title,
    description,
    techStack,
    category,
    onOpenDrawer,
}: ProjectCardProps & { onOpenDrawer?: (id: string) => void }) {
    return (
        <Link
            href={`/projects/${id}`}
            onClick={(e) => {
                if (onOpenDrawer) {
                    e.preventDefault();
                    onOpenDrawer(id);
                }
            }}
            className="group block rounded-xl overflow-hidden border border-white/5 bg-zinc-950/35 hover:bg-zinc-900/40 hover:border-white/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-500"
        >
            <div className="relative h-44 w-full overflow-hidden bg-black/40 border-b border-white/5 flex items-center justify-center transition-colors group-hover:bg-black/50">
                <ProjectVisual id={id} />
                
                {/* Labels overlay */}
                <div className="absolute top-3 left-4">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider bg-black/40 border border-white/5 px-2 py-0.5 rounded-full">
                        {category}
                    </span>
                </div>
                
                <div className="absolute top-3 right-4">
                    <span className="text-[8px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        {id}.bin
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-base font-bold font-heading text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <p className="text-zinc-400 mb-6 line-clamp-2 text-xs leading-relaxed font-light">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 text-[9px] text-zinc-500 border border-white/5 bg-white/[0.01] rounded font-mono"
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 3 && (
                        <span className="px-2 py-0.5 text-[9px] text-zinc-500 border border-white/5 bg-white/[0.01] rounded font-mono">
                            +{techStack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
