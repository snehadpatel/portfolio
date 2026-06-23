"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Clock, ExternalLink, BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CacheEntry<T> {
    data: T;
    expiry: number;
}

const getCache = <T,>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        const item = JSON.parse(itemStr) as CacheEntry<T>;
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.data;
    } catch {
        return null;
    }
};

const setCache = <T,>(key: string, data: T, ttlMinutes = 10): void => {
    if (typeof window === "undefined") return;
    try {
        const expiry = Date.now() + ttlMinutes * 60 * 1000;
        const entry: CacheEntry<T> = { data, expiry };
        localStorage.setItem(key, JSON.stringify(entry));
    } catch (e) {
        console.error("Error setting cache", e);
    }
};

const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-indigo-500",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    Java: "bg-amber-600",
    "C++": "bg-rose-500",
    "C#": "bg-emerald-600",
    Swift: "bg-orange-600",
    Rust: "bg-amber-700",
    Go: "bg-cyan-500",
    Shell: "bg-lime-500",
    "Jupyter Notebook": "bg-orange-500",
};

const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    
    const months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    return `${months} months ago`;
};

export default function GitHubDashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        const username = "snehadpatel";
        
        try {
            const cachedProfile = getCache<any>("github-profile");
            const cachedRepos = getCache<any[]>("github-repos");
            
            if (cachedProfile && cachedRepos) {
                setProfile(cachedProfile);
                setRepos(cachedRepos);
                setLoading(false);
                return;
            }
            
            const profileRes = await fetch(`https://api.github.com/users/${username}`);
            if (!profileRes.ok) {
                throw new Error(`Profile fetch failed: ${profileRes.status}`);
            }
            const profileData = await profileRes.json();
            
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`);
            if (!reposRes.ok) {
                throw new Error(`Repos fetch failed: ${reposRes.status}`);
            }
            const reposData = (await reposRes.json()) as any[];
            
            // Sort by pushed date just in case API sorting isn't perfect
            const sortedRepos = [...reposData].sort(
                (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
            );
            
            setCache("github-profile", profileData, 10);
            setCache("github-repos", sortedRepos, 10);
            
            setProfile(profileData);
            setRepos(sortedRepos);
        } catch (err: any) {
            console.error("GitHub API fetch error:", err);
            setError(err.message || "Failed to load GitHub workspace data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Dashboard stats row skeleton */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="h-44 bg-slate-200/60 rounded-2xl border border-slate-200/30" />
                    <div className="h-44 bg-slate-200/60 rounded-2xl border border-slate-200/30" />
                    <div className="h-44 bg-slate-200/60 rounded-2xl border border-slate-200/30" />
                </div>
                
                {/* Repo list skeleton */}
                <div className="grid md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-32 bg-slate-100/80 rounded-xl border border-slate-200/20" />
                    ))}
                </div>
            </div>
        );
    }

    if (error || !profile || repos.length === 0) {
        return (
            <div className="bg-rose-50/50 backdrop-blur-md border border-rose-200/50 p-8 rounded-2xl shadow-sm text-center max-w-xl mx-auto my-12">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-500">
                    <Github className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">GitHub Sync Paused</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed mb-6">
                    GitHub API rate limits might have been temporarily exceeded, or there is a network issue. You can visit my GitHub profile page directly.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={fetchData}
                        className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold shadow hover:bg-slate-800 transition-colors"
                    >
                        Try Syncing Again
                    </button>
                    <a
                        href="https://github.com/snehadpatel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-bold shadow hover:bg-slate-50 transition-colors"
                    >
                        Visit Profile
                    </a>
                </div>
            </div>
        );
    }

    // Stats calculations
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

    const langCounts: Record<string, number> = {};
    let totalWithLang = 0;
    repos.forEach((repo) => {
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalWithLang++;
        }
    });

    const langEntries = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const activeProject = repos[0];
    const otherRepos = repos.filter((r) => r.id !== activeProject.id).slice(0, 10);

    return (
        <div className="space-y-10">
            {/* Top Dashboard Analytics */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* 1. Profile card */}
                <div className="bg-white/60 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={profile.avatar_url} alt={profile.name} className="w-14 h-14 rounded-full border border-slate-200/80 shadow-sm" />
                            <div>
                                <h3 className="text-base font-bold text-slate-900 flex flex-col leading-tight">
                                    {profile.name}
                                    <span className="text-[11px] font-mono text-slate-400 font-normal">@{profile.login}</span>
                                </h3>
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs font-light leading-relaxed mb-4">
                            {profile.bio || "AI Systems Engineer specializing in Computer Vision, ML, and IoT."}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 text-xs font-mono border-t border-slate-100 pt-3">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> <strong>{profile.followers}</strong> followers</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> <strong>{profile.public_repos}</strong> repos</span>
                    </div>
                </div>

                {/* 2. Currently Working On */}
                <div className="bg-gradient-to-br from-indigo-50/40 to-indigo-100/20 backdrop-blur-md border border-indigo-150/40 p-6 rounded-2xl shadow-sm relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[9px] font-mono font-semibold uppercase tracking-wider animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Active Focus
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest block mb-1">Currently working on</span>
                        <h3 className="text-lg font-bold font-heading text-indigo-950 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                            <a href={activeProject.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                                {activeProject.name} <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                            </a>
                        </h3>
                        <p className="text-slate-650 text-xs mt-2 font-light line-clamp-2 leading-relaxed">
                            {activeProject.description || "Active development on this GitHub repository."}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-550 border-t border-indigo-200/20 pt-3 mt-4">
                        {activeProject.language && (
                            <span className="flex items-center gap-1">
                                <span className={cn("w-1.5 h-1.5 rounded-full", LANGUAGE_COLORS[activeProject.language] || "bg-slate-400")} />
                                {activeProject.language}
                            </span>
                        )}
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pushed {timeAgo(activeProject.pushed_at)}</span>
                    </div>
                </div>

                {/* 3. Stats card */}
                <div className="bg-white/60 backdrop-blur-md border border-slate-200/50 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">Workspace Analytics</h3>
                        
                        <div className="flex gap-3 mb-4">
                            <div className="text-center bg-slate-50/80 border border-slate-200/30 rounded-xl py-1.5 flex-1">
                                <span className="text-[9px] font-mono text-slate-400 block">Total Stars</span>
                                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5 mt-0.5"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {totalStars}</span>
                            </div>
                            <div className="text-center bg-slate-50/80 border border-slate-200/30 rounded-xl py-1.5 flex-1">
                                <span className="text-[9px] font-mono text-slate-400 block">Total Forks</span>
                                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5 mt-0.5"><GitFork className="w-3.5 h-3.5 text-slate-500" /> {totalForks}</span>
                            </div>
                        </div>

                        {/* Horizontal language stack bar */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex mb-3">
                            {langEntries.map(([lang, count]) => {
                                const pct = (count / totalWithLang) * 100;
                                return (
                                    <div
                                        key={lang}
                                        className={cn(LANGUAGE_COLORS[lang] || "bg-slate-400")}
                                        style={{ width: `${pct}%` }}
                                        title={`${lang}: ${pct.toFixed(0)}%`}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Language legend */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                        {langEntries.map(([lang, count]) => {
                            const pct = (count / totalWithLang) * 100;
                            return (
                                <span key={lang} className="flex items-center gap-1">
                                    <span className={cn("w-1.5 h-1.5 rounded-full", LANGUAGE_COLORS[lang] || "bg-slate-400")} />
                                    {lang} {pct.toFixed(0)}%
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Repositories Section */}
            <div>
                <h3 className="text-lg font-bold font-heading text-slate-800 mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Github className="w-5 h-5" /> Public Repositories
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {otherRepos.map((repo) => (
                        <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white/50 hover:bg-white/90 backdrop-blur-sm border border-slate-200/50 hover:border-indigo-200/50 hover:shadow-sm rounded-xl p-5 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <h4 className="text-sm font-bold font-heading text-slate-800 group-hover:text-indigo-650 transition-colors line-clamp-1">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5">
                                            {repo.name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </h4>
                                    <span className="text-[8px] font-mono text-slate-400 bg-slate-100 border border-slate-200/30 px-1.5 py-0.5 rounded uppercase">
                                        public
                                    </span>
                                </div>
                                
                                <p className="text-slate-500 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                                    {repo.description || "No description provided."}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3 mt-auto">
                                <div className="flex items-center gap-3">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span className={cn("w-1.5 h-1.5 rounded-full", LANGUAGE_COLORS[repo.language] || "bg-slate-400")} />
                                            {repo.language}
                                        </span>
                                    )}
                                    {repo.stargazers_count > 0 && (
                                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {repo.stargazers_count}</span>
                                    )}
                                    {repo.forks_count > 0 && (
                                        <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                                    )}
                                </div>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(repo.pushed_at)}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
