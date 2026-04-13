import { getStaticParams } from '@/locales/server';
import { getBlogAliasRouteSlugs, getBlogCanonicalSlug, resolveBlogMdxSlug } from '@/utils/blogSlugAliases';
import { BLOGS_DIR, getMarkDownMetaData } from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';
import fs from 'fs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';

type ParamsProps = { name: string; locale: string };

export async function generateStaticParams() {
  const data: ParamsProps[] = [];
  getStaticParams().forEach((item) => {
    const dir = path.join(BLOGS_DIR, item.locale);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir)
        .filter((f) => f.endsWith('.mdx'))
        .forEach((f) => {
          data.push({
            locale: item.locale,
            name: f.replace(/\.mdx/, ''),
          });
        });
      getBlogAliasRouteSlugs().forEach((alias) => {
        data.push({ locale: item.locale, name: alias });
      });
    }
  });
  return data;
}

function buildBlogMetadata(
  meta: Record<string, unknown>,
  canonicalPath: string,
  modifiedTime?: string,
): Metadata {
  const title = meta.title as string | undefined;
  const description = meta.description as string | undefined;
  const image = meta.image as string | undefined;
  const date = meta.date as string | undefined;
  const tags = Array.isArray(meta.tags) ? (meta.tags as string[]) : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authorsRaw = meta.authors as any;
  const authorNames: string[] = Array.isArray(authorsRaw)
    ? authorsRaw.map((a) => a.name).filter(Boolean)
    : authorsRaw?.name
      ? [authorsRaw.name]
      : [];

  const ogImageUrl = toAbsoluteUrl(
    `/api/og?type=blog&title=${encodeURIComponent((title ?? '').slice(0, 80))}`,
  );
  // Prefer the article's own thumbnail; fall back to generated OG image
  const ogImages = image
    ? [{ url: toAbsoluteUrl(image), width: 1200, height: 630, alt: title }]
    : [{ url: ogImageUrl, width: 1200, height: 630, alt: title }];

  return {
    ...(meta as Metadata),
    alternates: { canonical: canonicalPath },
    openGraph: {
      url: canonicalPath,
      type: 'article',
      title,
      description,
      images: ogImages,
      ...(date ? { publishedTime: date } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authorNames.length ? { authors: authorNames } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ? toAbsoluteUrl(image) : ogImageUrl],
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ParamsProps>;
}): Promise<Metadata> {
  const { locale, name } = await params;
  const mdxSlug = resolveBlogMdxSlug(name);
  const canonicalSlug = getBlogCanonicalSlug(name);
  const mdxPath = path.join(BLOGS_DIR, locale, `${mdxSlug}.mdx`);
  const defaultMdxEnPath = path.join(BLOGS_DIR, 'en', `${mdxSlug}.mdx`);
  const canonicalPath = `/blog/${canonicalSlug}`;

  const activePath = fs.existsSync(mdxPath) ? mdxPath : defaultMdxEnPath;
  const meta = await getMarkDownMetaData(activePath);
  const modifiedTime = fs.existsSync(activePath)
    ? fs.statSync(activePath).mtime.toISOString()
    : undefined;
  return buildBlogMetadata(meta, canonicalPath, modifiedTime);
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { name, locale } = await params;
  const mdxSlug = resolveBlogMdxSlug(name);
  const canonicalSlug = getBlogCanonicalSlug(name);

  const mdxPath = path.join(BLOGS_DIR, locale, `${mdxSlug}.mdx`);
  const defaultMdxEnPath = path.join(BLOGS_DIR, 'en', `${mdxSlug}.mdx`);

  const activePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(defaultMdxEnPath)
      ? defaultMdxEnPath
      : null;

  if (!activePath) notFound();

  const meta = await getMarkDownMetaData(activePath);
  const metaTags = Array.isArray(meta.tags) ? (meta.tags as string[]) : [];
  const inLanguage = locale === 'zh' ? 'zh-CN' : 'en';
  const dateModified = fs.statSync(activePath).mtime.toISOString();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authorsRaw = meta.authors as any;
  const authors = Array.isArray(authorsRaw)
    ? authorsRaw.map((a: { name: string; url?: string }) => ({ '@type': 'Person', name: a.name, url: a.url }))
    : authorsRaw?.name
      ? [{ '@type': 'Person', name: authorsRaw.name }]
      : undefined;

  const image = meta.image as string | undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    inLanguage,
    image: image ? toAbsoluteUrl(image) : undefined,
    datePublished: meta.date,
    dateModified,
    author: authors,
    publisher: {
      '@type': 'Organization',
      name: 'KubeBlocks',
      url: 'https://kubeblocks.io',
      logo: { '@type': 'ImageObject', url: toAbsoluteUrl('/logo.png') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': toAbsoluteUrl(`/blog/${canonicalSlug}`) },
  };

  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );

  if (fs.existsSync(mdxPath)) {
    const { default: MDXContent } = await import(`@blogs/${locale}/${mdxSlug}.mdx`);
    return (
      <>
        {jsonLdScript}
        <MDXContent />
      </>
    );
  } else {
    const _locale = 'en';
    const { default: MDXContent } = await import(`@blogs/${_locale}/${mdxSlug}.mdx`);
    return (
      <>
        {jsonLdScript}
        <MDXContent />
      </>
    );
  }
}
