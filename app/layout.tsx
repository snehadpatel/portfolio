import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
    title: "Sneha Patel | AI & Systems Engineer",
    description: "Portfolio of Sneha Patel, an AI-driven systems engineer specializing in Computer Vision, Machine Learning, and IoT Systems.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, plusJakarta.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#F8F9FC]")}>
                {/* Custom Interactive Elements */}
                <InteractiveBackground />

                {/* Soft Pastel Ambient Glows */}
                <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden bg-[#F8F9FC]">
                    {/* Soft periwinkle in top-right */}
                    <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/25 blur-[130px] opacity-70 animate-float" />
                    {/* Soft mint in middle-left */}
                    <div className="absolute top-[30%] left-[-20%] w-[55vw] h-[55vw] rounded-full bg-emerald-100/20 blur-[140px] opacity-60 animate-float-delayed" />
                    {/* Soft peach/rose in bottom-right */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-rose-100/25 blur-[130px] opacity-70 animate-float" />
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
