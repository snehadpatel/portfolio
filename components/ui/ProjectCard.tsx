import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-indigo-50/50">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-indigo-500/12 blur-[18px] animate-[pulse_4s_infinite]" />
                    <div className="relative w-20 h-20 rounded-full border border-indigo-200/50 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-indigo-150/30" />
                        <div className="absolute inset-0 rounded-full border-t border-indigo-500/35 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>
                </div>
            );
        case "vegetable-classifier":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-emerald-50/50">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 blur-[18px] animate-[pulse_5s_infinite]" />
                    <div className="relative w-16 h-16 border border-dashed border-emerald-300/40 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-600/30 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.314 5.314a9 9 0 0113.372 13.372" />
                        </svg>
                    </div>
                </div>
            );
        case "greensort":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-amber-50/50">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-amber-500/10 blur-[18px] animate-[pulse_4.5s_infinite]" />
                    <div className="relative w-20 h-20 rounded-full border border-amber-300/30 flex items-center justify-center">
                        <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-pulse" />
                        <div className="w-3 h-3 rounded-full bg-amber-600/15" />
                    </div>
                </div>
            );
        case "supplier-ranking":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-rose-50/50">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-28 h-28 rounded-full bg-rose-500/8 blur-[20px] animate-[pulse_6s_infinite]" />
                    <div className="w-32 space-y-2.5">
                        <div className="h-[2px] bg-gradient-to-r from-rose-500/30 to-transparent w-full rounded animate-[pulse_2s_infinite]" />
                        <div className="h-[2px] bg-gradient-to-r from-rose-500/20 to-transparent w-4/5 rounded animate-[pulse_2.2s_infinite]" />
                        <div className="h-[2px] bg-gradient-to-r from-rose-500/10 to-transparent w-3/5 rounded animate-[pulse_2.4s_infinite]" />
                    </div>
                </div>
            );
        case "suicide-prediction":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-purple-50/50">
                    {/* Glowing ambient sphere */}
                    <div className="absolute w-24 h-24 rounded-full bg-purple-500/12 blur-[18px] animate-[pulse_4s_infinite]" />
                    <svg className="w-32 h-16 opacity-30 text-purple-600" viewBox="0 0 160 80">
                        <line x1="30" y1="40" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="30" y1="40" x2="80" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="20" x2="130" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="80" y1="60" x2="130" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        
                        <circle cx="30" cy="40" r="2.5" fill="currentColor" />
                        <circle cx="80" cy="20" r="4" fill="currentColor" className="animate-pulse" />
                        <circle cx="80" cy="60" r="4" fill="currentColor" className="animate-pulse" />
                        <circle cx="130" cy="40" r="2.5" fill="currentColor" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-50/80">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">/ {id}</span>
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
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tiltStyle, setTiltStyle] = useState("");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 4; // Max 4 deg tilt for subtlety
        const rotateY = ((x - centerX) / centerX) * 4;

        setTiltStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty("--mouse-x", `-999px`);
        card.style.setProperty("--mouse-y", `-999px`);
        setTiltStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 spotlight-border-container transition-all duration-300"
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="spotlight-border-content"
                style={{
                    transform: tiltStyle,
                    transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s ease",
                    transformStyle: "preserve-3d",
                }}
            >
                <Link
                    href={`/projects/${id}`}
                    onClick={(e) => {
                        if (onOpenDrawer) {
                            e.preventDefault();
                            onOpenDrawer(id);
                        }
                    }}
                    className="group block rounded-2xl overflow-hidden bg-white/70 hover:bg-white/95 border border-slate-200/50 hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-500"
                >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center transition-colors">
                        <ProjectVisual id={id} />
                        
                        {/* Labels overlay */}
                        <div className="absolute top-3 left-4">
                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider bg-white/90 border border-slate-200/60 shadow-sm px-2.5 py-0.5 rounded-full">
                                {category}
                            </span>
                        </div>
                        
                        <div className="absolute top-3 right-4">
                            <span className="text-[8px] font-mono text-slate-400 group-hover:text-indigo-600 transition-colors">
                                {id}.bin
                            </span>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <h3 className="text-base font-bold font-heading text-slate-800 group-hover:text-slate-950 transition-colors line-clamp-1">
                                {title}
                            </h3>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>

                        <p className="text-slate-500 mb-6 line-clamp-2 text-xs leading-relaxed font-light">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                            {techStack.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 text-[9px] text-slate-500 border border-slate-200/50 bg-slate-50/40 rounded font-mono"
                                >
                                    {tech}
                                </span>
                            ))}
                            {techStack.length > 3 && (
                                <span className="px-2 py-0.5 text-[9px] text-slate-500 border border-slate-200/50 bg-slate-50/40 rounded font-mono">
                                    +{techStack.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
