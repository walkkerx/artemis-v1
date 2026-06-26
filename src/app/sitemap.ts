import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artemis.collegium.edu';
  const lastModified = new Date();

  // Main pages
  const mainPages = [
    '', 'education', 'research', 'innovation', 'admissions', 'campus',
    'colleges', 'about', 'blog', 'apply', 'fundraising',
    'undergraduate', 'programs', 'centers-of-inquiry', 'collegium-alliance',
    'the-university', 'how-we-are-run', 'our-people', 'history',
    'graduate-coming-soon',
  ];

  return mainPages.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : path === 'apply' || path === 'admissions' ? 0.9 : 0.7,
  }));
}
