import Link from "next/link";
import { DATA } from "@/lib/data";

const siteLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
];

const socialLinks = [
    { href: DATA.profile.linkedin, label: "LinkedIn" },
    { href: DATA.profile.github, label: "GitHub" },
    { href: `mailto:${DATA.profile.email}`, label: "Email" },
];

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            <div className="w-full px-6 md:px-10 py-16 md:py-20">
                <div className="max-w-[1200px] mx-auto">
                    {/* Main Grid */}
                    <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
                        {/* Column 1: Name & Role */}
                        <div className="space-y-4">
                            <Link href="/" className="text-lg font-bold font-heading tracking-tight uppercase block">
                                Sneha Patel
                            </Link>
                            <p className="text-[11px] text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
                                AI & Systems Engineer<br />
                                Computer Vision · ML · IoT
                            </p>
                        </div>

                        {/* Column 2: Site Links */}
                        <div>
                            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Navigation</h4>
                            <ul className="space-y-3">
                                {siteLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[11px] text-slate-400 hover:text-white uppercase tracking-[0.12em] transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Social & Contact */}
                        <div>
                            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Connect</h4>
                            <ul className="space-y-3">
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                            className="text-[11px] text-slate-400 hover:text-white uppercase tracking-[0.12em] transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] text-slate-500 tracking-wider">
                            © {new Date().getFullYear()} Sneha Patel. All rights reserved.
                        </p>
                        <p className="text-[10px] text-slate-600 tracking-wider">
                            Crafted with curiosity & caffeine.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
