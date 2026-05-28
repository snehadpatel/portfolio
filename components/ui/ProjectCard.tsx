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
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-pixel-grid opacity-25" />
                    
                    {/* Glowing radar grid */}
                    <div className="relative w-28 h-28 rounded-full border border-cyan-500/10 flex items-center justify-center">
                        <div className="absolute w-20 h-20 rounded-full border border-cyan-500/10" />
                        <div className="absolute w-12 h-12 rounded-full border border-cyan-500/15" />
                        
                        {/* Rotating Radar Line */}
                        <div className="absolute inset-0 rounded-full border-t border-cyan-500/30 animate-spin" style={{ animationDuration: "6s" }} />
                        
                        {/* Laser Scanner Line */}
                        <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                        
                        {/* Mock targets */}
                        <div className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <div className="absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" style={{ animationDuration: "2s" }} />
                    </div>

                    {/* Scanner horizontal line */}
                    <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10 top-1/4" />
                    <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10 top-3/4" />
                    <div className="absolute inset-y-0 w-[1px] bg-cyan-500/10 left-1/4" />
                    <div className="absolute inset-y-0 w-[1px] bg-cyan-500/10 right-1/4" />

                    {/* Live stats overlay */}
                    <div className="absolute bottom-3 left-4 font-mono text-[8px] text-cyan-400/80 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" /> FORENSIC_SCANNER: ON</span>
                        <span>ViT_ACC: 97.5%</span>
                    </div>
                </div>
            );
        case "vegetable-classifier":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-pixel-grid opacity-25" />
                    
                    {/* Bounding box visual */}
                    <div className="relative w-40 h-24 border border-dashed border-emerald-500/20 rounded flex flex-col justify-between p-2.5">
                        {/* Corner crosshairs */}
                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-emerald-400/80" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-emerald-400/80" />
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-emerald-400/80" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-emerald-400/80" />
                        
                        <div className="flex justify-between items-start">
                            <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 text-[7px] font-mono rounded tracking-tight">
                                Karela: 98.2%
                            </span>
                            <span className="text-[7px] font-mono text-zinc-500">RESNET18_CROP</span>
                        </div>
                        
                        <div className="flex justify-center items-center h-10">
                            <svg className="w-8 h-8 text-emerald-400/40 animate-[pulse_2s_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.314 5.314a9 9 0 0113.372 13.372M18.686 5.314a9 9 0 00-13.372 13.372" />
                            </svg>
                        </div>

                        <div className="w-full bg-zinc-950 h-1 rounded overflow-hidden">
                            <div className="bg-emerald-500/80 h-full w-[98%] rounded animate-[pulse_1.5s_infinite]" />
                        </div>
                    </div>
                </div>
            );
        case "greensort":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-pixel-grid opacity-25" />
                    
                    {/* IoT Schematic wireframe */}
                    <div className="relative w-40 h-24 border border-white/5 rounded-xl bg-white/[0.01] p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                            <span className="text-[7px] font-mono text-zinc-400 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> RPi_CORE: OK
                            </span>
                            <span className="text-[7px] font-mono text-cyan-400">USB_ACM0</span>
                        </div>
                        
                        <div className="flex justify-around items-center py-1">
                            {/* Bin Capacity */}
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-8 bg-zinc-900 border border-white/10 rounded flex items-end overflow-hidden">
                                    <div className="bg-gradient-to-t from-emerald-600/80 to-emerald-400/80 w-full h-2/3" />
                                </div>
                                <span className="text-[5.5px] font-mono text-zinc-500 mt-1">CAP: 67%</span>
                            </div>
                            
                            {/* Servo dial */}
                            <div className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/20">
                                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400/60 animate-spin" style={{ animationDuration: "5s" }} />
                                <span className="text-[7px] font-mono text-zinc-400 font-bold">90°</span>
                            </div>

                            {/* Camera module wireframe */}
                            <div className="w-10 h-8 border border-white/10 rounded bg-black/40 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-pixel-grid opacity-15" />
                                <span className="text-[5.5px] font-mono text-zinc-500">CAM_LIVE</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-[5.5px] font-mono text-zinc-500">
                            <span>BIN_RECYCLE: OPEN</span>
                            <span>SERVO_ROT: 90DEG</span>
                        </div>
                    </div>
                </div>
            );
        case "supplier-ranking":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-pixel-grid opacity-25" />
                    
                    {/* Ranking UI mockup */}
                    <div className="w-40 space-y-2">
                        <div className="flex justify-between text-[7px] font-mono text-zinc-400 border-b border-white/5 pb-1">
                            <span className="flex items-center gap-1"><BarChart3 className="w-2.5 h-2.5 text-cyan-400" /> REGRESSION SCORER</span>
                            <span className="text-zinc-500">N=1,248</span>
                        </div>
                        
                        <div className="space-y-1">
                            {[
                                { name: "Supplier Alpha", score: 98.4, w: "w-[98%]", color: "bg-emerald-500/80" },
                                { name: "Freight Express", score: 89.1, w: "w-[89%]", color: "bg-cyan-500/80" },
                                { name: "Gujarat Cargo", score: 76.5, w: "w-[76%]", color: "bg-indigo-500/80" }
                            ].map((sup, idx) => (
                                <div key={idx} className="space-y-0.5">
                                    <div className="flex justify-between text-[6px] font-mono text-zinc-500">
                                        <span>#{idx + 1} {sup.name}</span>
                                        <span className="text-zinc-300 font-bold">{sup.score}</span>
                                    </div>
                                    <div className="w-full bg-zinc-950 h-1 rounded overflow-hidden">
                                        <div className={`h-full ${sup.color} ${sup.w} rounded`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case "suicide-prediction":
            return (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-pixel-grid opacity-25" />
                    
                    {/* Node graph wireframe */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-36 h-20" viewBox="0 0 160 80">
                            {/* Lines */}
                            <line x1="30" y1="40" x2="80" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <line x1="30" y1="40" x2="80" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <line x1="80" y1="20" x2="130" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <line x1="80" y1="60" x2="130" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                            <line x1="80" y1="20" x2="80" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                            {/* Node points */}
                            <circle cx="30" cy="40" r="4.5" className="fill-zinc-900 stroke-zinc-700 stroke-1" />
                            <circle cx="80" cy="20" r="5.5" className="fill-purple-950/60 stroke-purple-400/80 stroke-1 animate-[pulse_2s_infinite]" />
                            <circle cx="80" cy="60" r="5.5" className="fill-rose-950/60 stroke-rose-400/80 stroke-1 animate-[pulse_1.5s_infinite]" />
                            <circle cx="130" cy="40" r="4.5" className="fill-zinc-900 stroke-zinc-700 stroke-1" />
                            
                            {/* Text labels */}
                            <text x="30" y="32" fontSize="6.5" fontFamily="monospace" fill="#71717a" textAnchor="middle">USER</text>
                            <text x="80" y="11" fontSize="6.5" fontFamily="monospace" fill="#c084fc" textAnchor="middle">ANXIOUS</text>
                            <text x="80" y="73" fontSize="6.5" fontFamily="monospace" fill="#f43f5e" textAnchor="middle">CRISIS</text>
                            <text x="130" y="32" fontSize="6.5" fontFamily="monospace" fill="#71717a" textAnchor="middle">NEO4J</text>
                        </svg>
                        
                        <div className="absolute bottom-2.5 right-4 font-mono text-[7px] text-rose-400/90 flex items-center gap-1 bg-rose-950/20 border border-rose-900/30 px-1.5 py-0.5 rounded">
                            <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping" /> NLP_ALERT
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-pixel-grid opacity-20" />
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
}: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${id}`}
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
