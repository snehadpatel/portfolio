"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    problemStatement?: string;
    contribution?: string;
    status?: string;
    techStack: string[];
    image: string;
    category: string;
    github?: string;
    link?: string;
}

export default function ProjectCard({
    id,
    title,
    description,
    problemStatement,
    contribution,
    status,
    techStack,
    image,
    category,
    github,
    link,
    onOpenDrawer,
}: ProjectCardProps & { onOpenDrawer?: (id: string) => void }) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tiltStyle, setTiltStyle] = useState("");
    const [imageError, setImageError] = useState(false);

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
        const rotateX = ((centerY - y) / centerY) * 3;
        const rotateY = ((x - centerX) / centerX) * 3;

        setTiltStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
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
            className="perspective-1000 spotlight-border-container transition-all duration-300 h-full flex flex-col"
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="spotlight-border-content flex-1 flex flex-col"
                style={{
                    transform: tiltStyle,
                    transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s ease",
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="group rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:shadow-lg transition-all duration-300 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Image Header */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                            {image && !imageError ? (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 font-mono text-xs">
                                    /{id}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                            {/* Category & Status Overlay */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                <span className="text-[9px] font-mono font-semibold text-slate-800 bg-white/90 dark:bg-slate-900/90 dark:text-slate-200 backdrop-blur-md border border-white/40 dark:border-slate-700 shadow-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    {category}
                                </span>
                                {status && (
                                    <span className="text-[9px] font-mono text-indigo-100 bg-indigo-950/80 backdrop-blur-md border border-indigo-400/40 px-2 py-0.5 rounded-full truncate max-w-[170px]">
                                        {status}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-base md:text-lg font-bold font-heading text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                    {title}
                                </h3>
                                <button
                                    onClick={() => onOpenDrawer?.(id)}
                                    className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
                                    aria-label={`Open details for ${title}`}
                                >
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>

                            {/* One-sentence Problem Statement */}
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light line-clamp-2">
                                <strong className="font-semibold text-slate-800 dark:text-slate-200">Problem:</strong>{" "}
                                {problemStatement || description}
                            </p>

                            {/* Contribution */}
                            {contribution && (
                                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed line-clamp-2 font-mono bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800/80">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Role:</span>{" "}
                                    {contribution}
                                </p>
                            )}

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {techStack.slice(0, 4).map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 text-[9px] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 rounded font-mono"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {techStack.length > 4 && (
                                    <span className="px-1.5 py-0.5 text-[9px] text-slate-400 font-mono">
                                        +{techStack.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                        <button
                            onClick={() => onOpenDrawer?.(id)}
                            className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-2">
                            {github && github !== "#" && (
                                <Link
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    aria-label="GitHub Repository"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                </Link>
                            )}
                            {link && link !== "#" && (
                                <Link
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    aria-label="Live Demo"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
