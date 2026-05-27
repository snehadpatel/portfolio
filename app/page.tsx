import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DATA } from "@/lib/data";

export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedProjects />

            {/* Brief About / Skills Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                            Engineering with <span className="text-primary">Global Impact</span>
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                {DATA.profile.summary}
                            </p>
                            <p>
                                My work bridges the gap between complex AI algorithms and intuitive user experiences. I believe in software that not only functions perfectly but also delights the user.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Button size="lg" asChild>
                                <Link href="/about">More About Me</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Tech Stack Tiles */}
                        <div className="space-y-4 pt-8">
                            {DATA.skills.languages.slice(0, 3).map((skill) => (
                                <div key={skill} className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <span className="font-semibold">{skill}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4">
                            {DATA.skills.core.slice(0, 3).map((skill) => (
                                <div key={skill} className="p-6 bg-secondary border border-transparent rounded-2xl">
                                    <span className="font-semibold text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                        Ready to collaborate?
                    </h2>
                    <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
                        Im currently open to new opportunities and collaborations. Lets build something amazing together.
                    </p>
                    <Button size="lg" variant="secondary" className="rounded-full px-8 text-primary font-bold" asChild>
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
