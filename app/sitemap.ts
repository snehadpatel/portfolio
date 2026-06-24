import { MetadataRoute } from 'next'
import { DATA } from '@/lib/data'

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const projects = DATA.projects.map((project) => ({
        url: `https://snehadpatel-portfolio.vercel.app/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const routes = ['', '/about', '/projects', '/services', '/contact'].map((route) => ({
        url: `https://snehadpatel-portfolio.vercel.app${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }))

    return [...routes, ...projects]
}
