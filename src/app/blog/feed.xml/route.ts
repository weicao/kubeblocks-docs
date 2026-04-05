import { getBlogs } from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';

export async function GET() {
  const blogs = await getBlogs('en');
  const siteUrl = toAbsoluteUrl('/');
  const feedUrl = toAbsoluteUrl('/blog/feed.xml');

  const items = blogs
    .slice(0, 50)
    .map((blog) => {
      const url = toAbsoluteUrl(`/blog/${blog.name}`);
      const image = blog.image ? toAbsoluteUrl(blog.image) : undefined;
      return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${blog.description ?? ''}]]></description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      ${image ? `<enclosure url="${image}" type="image/png" />` : ''}
    </item>`.trim();
    })
    .join('\n    ');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KubeBlocks Blog</title>
    <link>${siteUrl}</link>
    <description>Technical blogs, release highlights, and engineering guides for running databases on Kubernetes with KubeBlocks.</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${toAbsoluteUrl('/logo.png')}</url>
      <title>KubeBlocks Blog</title>
      <link>${siteUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
