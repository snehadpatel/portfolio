import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-secondary/50 border-t border-border py-12 mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Sneha Patel. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <Link href="https://github.com/sneha-patel" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://linkedin.com/in/sneha-patel" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        LinkedIn
                    </Link>
                    <Link href="mailto:sneha.patel@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}
