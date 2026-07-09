import { MetadataRoute } from 'next'
import { DATA } from '@/lib/data'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const projects = DATA.projects.map((project) => ({
        url: `${SITE_URL}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const routes = [
        { path: '', priority: 1.0, freq: 'weekly' as const },
        { path: '/services', priority: 0.9, freq: 'monthly' as const },
        { path: '/projects', priority: 0.9, freq: 'monthly' as const },
        { path: '/about', priority: 0.8, freq: 'monthly' as const },
        { path: '/resume', priority: 0.7, freq: 'monthly' as const },
        { path: '/contact', priority: 0.6, freq: 'yearly' as const },
    ].map((route) => ({
        url: `${SITE_URL}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.freq,
        priority: route.priority,
    }))

    return [...routes, ...projects]
}
