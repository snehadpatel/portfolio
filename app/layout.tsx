import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import RecruiterPanel from "@/components/ui/RecruiterPanel";
import CustomCursor from "@/components/ui/CustomCursor";

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
    openGraph: {
        title: "Sneha Patel | AI & Systems Engineer",
        description: "Portfolio of Sneha Patel, building intelligent systems at the intersection of Computer Vision, Machine Learning, and IoT hardware.",
        url: "https://snehapatel.vercel.app",
        siteName: "Sneha Patel Portfolio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Sneha Patel — AI & Systems Engineer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sneha Patel | AI & Systems Engineer",
        description: "Portfolio of Sneha Patel, building intelligent systems at the intersection of Computer Vision, Machine Learning, and IoT hardware.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, plusJakarta.variable, notoSerif.variable, "min-h-screen flex flex-col relative overflow-x-hidden bg-[#F8F9FC]")}>
                <InteractiveBackground />
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
                <RecruiterPanel />
                <CustomCursor />
            </body>
        </html>
    );
}
