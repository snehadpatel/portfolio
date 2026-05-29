import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-cormorant"
});

export const metadata: Metadata = {
    title: "Sneha Patel | AI & Full-Stack Engineer",
    description: "Portfolio of Sneha Patel, an AI-driven systems engineer specializing in Java, Python, and scalable web solutions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, cormorant.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#0A0A0C]")}>
                {/* Quiet Luxury Ambient Lights */}
                <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden">
                    {/* Warm Champagne Gold glow in top-left */}
                    <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-amber-950/10 via-amber-900/3 to-transparent blur-[140px] opacity-75" />
                    {/* Amethyst Purple glow in middle-right */}
                    <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-pl from-purple-950/8 via-purple-900/3 to-transparent blur-[150px] opacity-65" />
                    {/* Soft Charcoal bronze glow in bottom-left */}
                    <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-stone-900/10 via-amber-950/3 to-transparent blur-[120px] opacity-80" />
                </div>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
