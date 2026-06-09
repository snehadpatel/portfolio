import Link from "next/link";
import { DATA } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="bg-secondary/50 border-t border-border py-12 mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {DATA.profile.name}. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <Link href={DATA.profile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        GitHub
                    </Link>
                    <Link href={DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        LinkedIn
                    </Link>
                    <Link href={`mailto:${DATA.profile.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}
