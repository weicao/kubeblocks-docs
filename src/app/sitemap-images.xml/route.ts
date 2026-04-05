import { getBlogs } from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';

export async function GET() {
  const blogs = await getBlogs('en');

  const urlEntries = blogs
    .filter((blog) => blog.image)
    .map((blog) => {
      const pageUrl = toAbsoluteUrl(`/blog/${blog.name}`);
      const imageUrl = toAbsoluteUrl(blog.image);
      const title = (blog.title ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `  <url>
    <loc>${pageUrl}</loc>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${title}</image:title>
    </image:image>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
