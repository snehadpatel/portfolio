import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    image: string;
    category: string;
}

export default function ProjectCard({
    id,
    title,
    description,
    techStack,
    image,
    category,
}: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${id}`}
            className="group block rounded-xl overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500"
        >
            <div className="relative h-40 w-full overflow-hidden bg-black/25 border-b border-white/5 flex items-center justify-center">
                {/* Architectural blueprint/pixel grid pattern */}
                <div className="absolute inset-0 bg-pixel-grid opacity-20" />
                
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.02]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.02]" />
                
                {/* Visual title indicator */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">/ {category}</span>
                    <span className="text-[11px] font-mono text-zinc-500 font-bold tracking-tight opacity-40 group-hover:opacity-100 transition-opacity">
                        {id}.bin
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold font-heading text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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
