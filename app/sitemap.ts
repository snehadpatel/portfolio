import { MetadataRoute } from 'next'
import { DATA } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const projects = DATA.projects.map((project) => ({
        url: `https://sneha-patel-portfolio.vercel.app/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const routes = ['', '/about', '/projects', '/contact'].map((route) => ({
        url: `https://sneha-patel-portfolio.vercel.app${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1,
    }))

    return [...routes, ...projects]
}
