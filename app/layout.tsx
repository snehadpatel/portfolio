import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Using Poppins as heading font
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins"
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
            <body className={cn(inter.variable, poppins.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#09090f]")}>
                {/* Ambient lights */}
                <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden">
                    {/* Purple/indigo glow in top-left */}
                    <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-indigo-900/12 via-purple-950/5 to-transparent blur-[140px] opacity-75" />
                    {/* Cyan glow in middle-right */}
                    <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-pl from-cyan-900/8 via-teal-950/5 to-transparent blur-[150px] opacity-65" />
                    {/* Deep blue/purple glow in bottom-left */}
                    <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-blue-950/12 via-indigo-950/8 to-transparent blur-[120px] opacity-80" />
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
