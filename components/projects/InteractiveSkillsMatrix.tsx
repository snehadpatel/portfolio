"use client";

import React from "react";
import { DATA } from "@/lib/data";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface InteractiveSkillsMatrixProps {
    selectedSkill: string | null;
    onSelectSkill: (skill: string | null) => void;
}

// Map roles to skill arrays
const ROLE_SKILLS: Record<string, string[]> = {
    ml: [
        "Python", "PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "YOLO", 
        "FastAPI", "Flask", "Computer Vision & NLP", "Machine Learning Systems",
        "IoT & Embedded Hardware", "Data Analysis & Visualization"
    ],
    data: [
        "Python", "SQL", "Neo4j", "MongoDB", "MySQL", "Pandas",
        "FastAPI", "Flask", "Database Design & Graphs", "Data Analysis & Visualization",
        "Machine Learning Systems"
    ],
    iot: [
        "C", "C++", "Python", "Arduino", "Raspberry Pi", "YOLO",
        "IoT & Embedded Hardware", "Machine Learning Systems"
    ],
    fullstack: [
        "JavaScript", "TypeScript", "Next.js", "FastAPI", "Flask", "React", "Node.js", 
        "Express", "Tailwind CSS", "HTML/CSS", "Software & Web Architecture"
    ]
};

export default function InteractiveSkillsMatrix({
    selectedSkill,
    onSelectSkill
}: InteractiveSkillsMatrixProps) {
    const { role } = useRecruiterMode();

    const isSkillHighlighted = (skillName: string) => {
        if (!role) return true; // Standard view: no dimming
        const targeted = ROLE_SKILLS[role] || [];
        return targeted.some((s) => s.toLowerCase() === skillName.toLowerCase());
    };

    // Calculate how many projects use each skill
    const getSkillProjectCount = (skillName: string) => {
        return DATA.projects.filter((p) => 
            p.techStack.some((tech) => tech.toLowerCase() === skillName.toLowerCase())
        ).length;
    };

    const renderSkillButton = (skill: string) => {
        const count = getSkillProjectCount(skill);
        const isActive = selectedSkill === skill;
        const highlighted = isSkillHighlighted(skill);
        
        return (
            <button
                key={skill}
                onClick={() => onSelectSkill(isActive ? null : skill)}
                className={cn(
                    "px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 flex items-center gap-1.5 relative group",
                    isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md z-10"
                        : highlighted
                            ? "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
                            : "bg-slate-50/50 border-slate-100 text-slate-400 opacity-40 hover:opacity-70"
                )}
            >
                <span>{skill}</span>
                {count > 0 && (
                    <span className={cn(
                        "text-[9px] px-1 rounded font-sans shrink-0",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    )}>
                        {count}
                    </span>
                )}
                {role && highlighted && !isActive && (
                    <Sparkles className="w-2.5 h-2.5 text-indigo-500 absolute -top-1 -right-1 bg-white rounded-full shadow-sm" />
                )}
            </button>
        );
    };

    return (
        <div className="bg-slate-50/60 p-6 md:p-8 rounded-3xl border border-slate-200/50 space-y-6">
            <div>
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-slate-800">
                        Interactive Skills Mapping
                    </h3>
                    {selectedSkill && (
                        <button 
                            onClick={() => onSelectSkill(null)}
                            className="text-[10px] font-mono text-indigo-600 hover:underline"
                        >
                            Reset Filter [x]
                        </button>
                    )}
                </div>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    {role 
                        ? `Recruiter Mode is active: matching skills for ${role.toUpperCase()} are highlighted. Click any highlighted skill to filter the associated projects.`
                        : "Click any skill to instantly filter and showcase projects that use it."
                    }
                </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Languages */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200/50 pb-1">
                        Languages
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {DATA.skills.languages.map(renderSkillButton)}
                    </div>
                </div>

                {/* Frameworks */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200/50 pb-1">
                        Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {DATA.skills.frameworks.map(renderSkillButton)}
                    </div>
                </div>

                {/* Tools & Hardwares */}
                <div className="space-y-3 sm:col-span-2 md:col-span-1">
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200/50 pb-1">
                        Tools & Hardware
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {DATA.skills.tools.map(renderSkillButton)}
                    </div>
                </div>
            </div>
        </div>
    );
}
