"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA, Certification, Achievement } from "@/lib/data";
import { useRecruiterMode } from "@/lib/hooks/useRecruiterMode";
import { Search, ExternalLink, Award, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: "all" | "cloud" | "graph" | "iot" | "analytics"; label: string }[] = [
    { id: "all", label: "All Credentials" },
    { id: "cloud", label: "Cloud & ML" },
    { id: "graph", label: "Graph Databases" },
    { id: "iot", label: "IoT & Systems" },
    { id: "analytics", label: "Data Analytics" }
];

export default function CertificationsDashboard() {
    const { role } = useRecruiterMode();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "cloud" | "graph" | "iot" | "analytics">("all");

    // Helper to determine if credential matches recruiter role
    const matchesRecruiterRole = (cred: Certification | Achievement) => {
        if (!role) return false;
        
        // ML Role matches
        if (role === "ml") {
            if ("issuer" in cred) { // Certification
                return ["aws-ml", "gcp-data", "neo4j-pro"].includes(cred.id);
            } else { // Achievement
                return ["greensort-publication", "wsro-nationals", "hackathon-commendation"].includes(cred.id);
            }
        }
        
        // Data Role matches
        if (role === "data") {
            if ("issuer" in cred) {
                return ["gcp-data", "neo4j-pro", "ibm-analytics"].includes(cred.id);
            } else {
                return ["greensort-publication", "hackathon-commendation", "diploma-topper"].includes(cred.id);
            }
        }

        // IoT Role matches
        if (role === "iot") {
            if ("issuer" in cred) {
                return ["cisco-iot", "aws-ml"].includes(cred.id);
            } else {
                return ["greensort-publication", "wsro-nationals"].includes(cred.id);
            }
        }

        // Full-Stack matches
        if (role === "fullstack") {
            if ("issuer" in cred) {
                return ["aws-ml", "gcp-data"].includes(cred.id);
            } else {
                return ["greensort-publication", "hackathon-commendation"].includes(cred.id);
            }
        }

        return false;
    };

    // Filter certifications
    const filteredCerts = DATA.certifications.filter((cert) => {
        const matchesCategory = activeTab === "all" || cert.category === activeTab || (activeTab === "cloud" && cert.category === "ml");
        const matchesSearch = 
            cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Filter achievements
    const filteredAchievements = DATA.achievements.filter((ach) => {
        const matchesCategory = activeTab === "all" || 
            (activeTab === "iot" && ach.category === "robotics") ||
            (activeTab === "analytics" && ach.category === "hackathon") ||
            (activeTab === "cloud" && ach.category === "hackathon");
        const matchesSearch = 
            ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ach.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-12">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
                {/* Search */}
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search certifications, skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-full focus:outline-none focus:border-slate-400 bg-white/50 text-slate-800 placeholder-slate-400 transition-colors"
                    />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300",
                                activeTab === cat.id
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Container */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Certifications Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-400">
                            Certifications ({filteredCerts.length})
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredCerts.map((cert) => {
                                const highlight = matchesRecruiterRole(cert);
                                return (
                                    <motion.div
                                        key={cert.id}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                                            highlight 
                                                ? "bg-indigo-50/50 border-indigo-200 shadow-[0_4px_20px_rgba(94,96,231,0.05)]" 
                                                : "bg-white border-slate-150 hover:border-slate-350"
                                        )}
                                    >
                                        {/* Match Badge */}
                                        {highlight && (
                                            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <Sparkles className="w-2 h-2 text-indigo-200" />
                                                Matching Skill
                                            </span>
                                        )}

                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                                                highlight ? "bg-indigo-100/50 border-indigo-200 text-indigo-600" : "bg-slate-50 border-slate-100 text-slate-500"
                                            )}>
                                                <Award className="w-5 h-5" />
                                            </div>

                                            <div className="space-y-2 flex-1 min-w-0 pr-8">
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                                                        {cert.title}
                                                    </h4>
                                                    <span className="text-xs text-slate-650 font-normal block mt-0.5">
                                                        Issued by {cert.issuer} · {cert.date}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-1">
                                                    {cert.skills.map((skill) => (
                                                        <span 
                                                            key={skill} 
                                                            className={cn(
                                                                "text-[10px] font-mono px-2 py-0.5 rounded",
                                                                highlight 
                                                                    ? "bg-indigo-100/30 text-indigo-700 border border-indigo-100/40" 
                                                                    : "bg-slate-50 text-slate-500 border border-slate-100"
                                                            )}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {cert.verificationUrl && (
                                            <a
                                                href={cert.verificationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute bottom-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-colors"
                                                title="Verify Credential"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        {filteredCerts.length === 0 && (
                            <p className="text-center py-8 text-xs text-slate-400 font-light">No certifications found matching your filters.</p>
                        )}
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="space-y-6">
                    <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-400">
                        Honor & Achievements ({filteredAchievements.length})
                    </h3>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredAchievements.map((ach) => {
                                const highlight = matchesRecruiterRole(ach);
                                return (
                                    <motion.div
                                        key={ach.id}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                                            highlight 
                                                ? "bg-indigo-50/50 border-indigo-200 shadow-[0_4px_20px_rgba(94,96,231,0.05)]" 
                                                : "bg-white border-slate-150 hover:border-slate-350"
                                        )}
                                    >
                                        {/* Match Badge */}
                                        {highlight && (
                                            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <Sparkles className="w-2 h-2 text-indigo-200" />
                                                Matching Highlight
                                            </span>
                                        )}

                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                                                highlight ? "bg-indigo-100/50 border-indigo-200 text-indigo-600" : "bg-slate-50 border-slate-100 text-slate-500"
                                            )}>
                                                <Star className="w-5 h-5" />
                                            </div>

                                            <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                                                <div className="pr-12">
                                                    <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                                                        {ach.title}
                                                    </h4>
                                                    {ach.date && (
                                                        <span className="text-xs text-slate-500 font-normal block mt-0.5">
                                                            {ach.date}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                                                    {ach.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        {filteredAchievements.length === 0 && (
                            <p className="text-center py-8 text-xs text-slate-400 font-light">No achievements found matching your filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
