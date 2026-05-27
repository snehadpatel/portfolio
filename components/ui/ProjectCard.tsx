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
            className="group block rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="relative h-64 w-full overflow-hidden bg-muted">
                {/* Placeholder if image fails or is generic */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                    {/* Logic to show real image would be here, for now simpler fallback if Next Image fails logic is complex without real assets */}
                    <span className="text-2xl font-bold opacity-10">{title}</span>
                </div>
                {/* Actual Image - assuming assets exist or will fall back visually */}
                {/* 
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
       */}
                {/* Using a gradient overlay for now as I don't have real images generated yet */}
                <div className={cn("absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10",
                    id === "bakemyday" && "from-pink-500/20 to-orange-400/20",
                    id === "smart-waste" && "from-green-500/20 to-emerald-400/20",
                    id === "lead-shift" && "from-blue-600/20 to-indigo-400/20",
                )} />

                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-background/90 text-foreground backdrop-blur-md rounded-full border border-border/50">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs text-muted-foreground bg-secondary rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground bg-secondary rounded-md">
                            +{techStack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
