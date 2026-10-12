import { MetadataRoute } from 'next';
import { lessons } from '@/lib/lessons-data';
import { projects } from '@/lib/projects-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rag-learning-hub.dev';

  const staticRoutes = [
    '',
    '/learn',
    '/tools',
    '/projects',
    '/compare/rag-vs-fine-tuning',
    '/glossary',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const lessonRoutes = Object.keys(lessons).map(slug => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const projectRoutes = Object.keys(projects).map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...lessonRoutes, ...projectRoutes];
}
