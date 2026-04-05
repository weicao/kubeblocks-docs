import { SidebarMenuItem } from '@/components/SidebarMenu';
import HtmlRenderer from '@/components/HtmlRenderer';
import { getStaticParams } from '@/locales/server';
import {
  DOCS_DIR,
  getFirstMenuItem,
  getMarkDownMetaData,
  getMarkDownSideBar,
  MarkdownPageParams,
} from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';
import fs from 'fs';
import _ from 'lodash';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import path from 'path';

const ENGINE_NAME_MAP: Record<string, string> = {
  'kubeblocks-for-mysql': 'MySQL',
  'kubeblocks-for-postgresql': 'PostgreSQL',
  'kubeblocks-for-mongodb': 'MongoDB',
  'kubeblocks-for-redis': 'Redis',
  'kubeblocks-for-valkey': 'Valkey',
  'kubeblocks-for-kafka': 'Kafka',
  'kubeblocks-for-elasticsearch': 'Elasticsearch',
  'kubeblocks-for-opensearch': 'OpenSearch',
  'kubeblocks-for-milvus': 'Milvus',
  'kubeblocks-for-pulsar': 'Pulsar',
  'kubeblocks-for-rabbitmq': 'RabbitMQ',
  'kubeblocks-for-rocketmq': 'RocketMQ',
  'kubeblocks-for-qdrant': 'Qdrant',
  'kubeblocks-for-weaviate': 'Weaviate',
  'kubeblocks-for-mariadb': 'MariaDB',
  'kubeblocks-for-tidb': 'TiDB',
  'kubeblocks-for-starrocks': 'StarRocks',
  'kubeblocks-for-clickhouse': 'ClickHouse',
  'kubeblocks-for-influxdb': 'InfluxDB',
  'kubeblocks-for-neo4j': 'Neo4j',
  'kubeblocks-for-nebula': 'Nebula Graph',
  'kubeblocks-for-greptimedb': 'GreptimeDB',
  'kubeblocks-for-victoria-metrics': 'VictoriaMetrics',
  'kubeblocks-for-apecloud-mysql': 'ApeCloud MySQL',
};

export async function generateStaticParams() {
  const data: MarkdownPageParams[] = [];
  const docsDir = path.join(process.cwd(), 'docs');

  const getPaths = (dir: string, initData: string[] = []): string[] => {
    fs.readdirSync(dir).forEach((f) => {
      const d = path.join(dir, f);
      const stat = fs.statSync(d);
      if (stat.isDirectory()) {
        getPaths(d, initData);
      }
      if (stat.isFile() && f.endsWith('.mdx')) {
        initData.push(d);
      }
    });
    return initData;
  };

  getStaticParams().forEach((item) => {
    const localeDir = path.join(docsDir, item.locale);

    fs.readdirSync(localeDir).forEach((version) => {
      const versionDir = path.join(localeDir, version);
      fs.readdirSync(versionDir).forEach((category) => {
        const cateDir = path.join(versionDir, category);
        const paths: string[] = getPaths(cateDir).map((item) =>
          item.replace(cateDir + '/', '').replace('.mdx', ''),
        );

        paths.forEach((p) => {
          const items = p.split('/');
          data.push({
            locale: item.locale,
            version,
            category,
            paths: items,
          });
        });
      });
    });
  });
  return data;
}

export default async function MarkdownPage({
  params,
}: {
  params: Promise<MarkdownPageParams>;
}) {
  const { locale, version, category, paths = [] } = await params;

  /**
   * redirect to default document when docs path is empty;
   */
  const dir = path.join(DOCS_DIR, locale, version, category);
  const defaultEnDir = path.join(DOCS_DIR, 'en', version, category);
  let menu: SidebarMenuItem[] = [];
  if (fs.existsSync(dir)) {
    menu = await getMarkDownSideBar(dir);
  } else if (fs.existsSync(defaultEnDir)) {
    menu = await getMarkDownSideBar(defaultEnDir);
  }
  const first = getFirstMenuItem(menu);

  if (_.isEmpty(paths) && first?.href) {
    redirect(first.href);
  }

  /**
   * render markdown.
   */
  const relativePath = path.join(locale, version, category, ...paths);
  const mdxPath = path.join(DOCS_DIR, `${relativePath}.mdx`);

  const defaultRelativeEnPath = path.join('en', version, category, ...paths);
  const defaultMdxEnPath = path.join(DOCS_DIR, `${defaultRelativeEnPath}.mdx`);

  // Check if this is an api-reference file
  const isApiReference = paths.some(p => p.includes('api-reference')) ||
                         relativePath.includes('api-reference');

  // Build JSON-LD metadata
  const activeMdxPath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(defaultMdxEnPath)
      ? defaultMdxEnPath
      : null;

  const inLanguage = locale === 'zh' ? 'zh-CN' : 'en';
  const canonicalUrl = toAbsoluteUrl(`/docs/${version}/${category}/${paths.join('/')}`);
  const engineName = ENGINE_NAME_MAP[category];

  const docMeta = activeMdxPath
    ? await getMarkDownMetaData(activeMdxPath).catch(() => ({} as Record<string, unknown>))
    : {} as Record<string, unknown>;

  const dateModified = activeMdxPath
    ? fs.statSync(activeMdxPath).mtime.toISOString()
    : undefined;

  // Check if this is a FAQ page (by filename)
  const lastSegment = paths[paths.length - 1] ?? '';
  const isFaqPage = /faq/i.test(lastSegment);

  // Extract FAQ Q&A pairs for FAQPage JSON-LD (Google Rich Results)
  let faqJsonLd: object | null = null;
  if (isFaqPage && activeMdxPath) {
    const rawContent = fs.readFileSync(activeMdxPath, 'utf-8');
    const { content: faqContent } = matter(rawContent);
    const faqMatches = [...(faqContent + '\n##').matchAll(/^##\s+(.+)\n+([\s\S]*?)(?=^##)/gm)];
    const faqItems = faqMatches
      .map(m => ({
        '@type': 'Question',
        name: m[1].trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: m[2].replace(/```[\s\S]*?```/g, '').replace(/[`*_#]/g, '').trim().slice(0, 500),
        },
      }))
      .filter(item => item.name && item.acceptedAnswer.text);
    if (faqItems.length > 0) {
      faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems };
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: docMeta.title,
    description: docMeta.description,
    inLanguage,
    url: canonicalUrl,
    ...(dateModified ? { dateModified } : {}),
    ...(engineName
      ? { about: { '@type': 'SoftwareApplication', name: engineName, applicationCategory: 'DatabaseApplication', operatingSystem: 'Kubernetes' } }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'KubeBlocks',
      url: 'https://kubeblocks.io',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Docs', item: toAbsoluteUrl('/docs') },
        { '@type': 'ListItem', position: 2, name: version, item: toAbsoluteUrl(`/docs/${version}`) },
        { '@type': 'ListItem', position: 3, name: category, item: toAbsoluteUrl(`/docs/${version}/${category}`) },
        ...paths.map((p, i) => ({ '@type': 'ListItem', position: 4 + i, name: p })),
      ],
    },
  };

  const jsonLdScript = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );

  if (fs.existsSync(mdxPath)) {
    if (isApiReference) {
      const fileContent = fs.readFileSync(mdxPath, 'utf-8');
      const { content } = matter(fileContent);
      return (
        <>
          {jsonLdScript}
          <HtmlRenderer content={content} />
        </>
      );
    } else {
      const { default: MDXContent } = await import(`@docs/${relativePath}.mdx`);
      return (
        <>
          {jsonLdScript}
          <MDXContent />
        </>
      );
    }
  } else if (fs.existsSync(defaultMdxEnPath)) {
    if (isApiReference) {
      const fileContent = fs.readFileSync(defaultMdxEnPath, 'utf-8');
      const { content } = matter(fileContent);
      return (
        <>
          {jsonLdScript}
          <HtmlRenderer content={content} />
        </>
      );
    } else {
      const { default: MDXContent } = await import(
        `@docs/${defaultRelativeEnPath}.mdx`
      );
      return (
        <>
          {jsonLdScript}
          <MDXContent />
        </>
      );
    }
  } else if (first?.href) {
    redirect(first.href);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<MarkdownPageParams>;
}): Promise<Metadata> {
  const { locale, version, category, paths = [] } = await params;
  const mdxPath =
    path.join(DOCS_DIR, locale, version, category, ...paths) + '.mdx';

  const defaultDdxEnPath =
    path.join(DOCS_DIR, 'en', version, category, ...paths) + '.mdx';

  const canonicalPath = `/docs/${version}/${category}/${paths.join('/')}`;

  const activePath = fs.existsSync(mdxPath) ? mdxPath : defaultDdxEnPath;
  const metadata = (await getMarkDownMetaData(activePath)) as Metadata & { title?: string; description?: string };

  const ogImageUrl = toAbsoluteUrl(
    `/api/og?type=docs&title=${encodeURIComponent((metadata.title ?? '').slice(0, 80))}`,
  );

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: canonicalPath,
    },
    openGraph: {
      ...metadata.openGraph,
      url: canonicalPath,
      type: 'article',
      title: metadata.title,
      description: metadata.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metadata.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [ogImageUrl],
    },
  };
}
