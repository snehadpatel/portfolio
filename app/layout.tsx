import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-plus-jakarta"
});
const notoSerif = Noto_Serif_Display({
    weight: ["400", "500"],
    subsets: ["latin"],
    style: ["italic"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "Sneha Patel | AI & Systems Engineer",
    description: "Portfolio of Sneha Patel, building intelligent systems at the intersection of Computer Vision, Machine Learning, and IoT hardware.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, plusJakarta.variable, notoSerif.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#F8F9FC]")}>
                {/* Soft Pastel Ambient Glows */}
                <div className="fixed inset-0 pointer-events-none -z-30 overflow-hidden bg-[#F8F9FC]">
                    <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/20 blur-[130px] opacity-60 animate-float" />
                    <div className="absolute top-[40%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-emerald-100/15 blur-[140px] opacity-50 animate-float-delayed" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-100/20 blur-[130px] opacity-60 animate-float" />
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
