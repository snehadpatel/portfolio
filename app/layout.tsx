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
            <body className={cn(inter.variable, poppins.variable, "min-h-screen flex flex-col")}>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
