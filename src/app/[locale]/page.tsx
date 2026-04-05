import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import { getBlogs } from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';
import { Box, Divider } from '@mui/material';
import type { Metadata } from 'next';
import Banner from './banner';
import BlogsPreview from './blogs-preview';
import Contact from './contact';
import Customers from './customers';
import { Evaluate } from './Evaluate';
import Features from './features';
import WhyNeedKubeBlocks from './why-need-kubeblocks';

export async function generateStaticParams() {
  return getStaticParams();
}

const HOME_DESCRIPTION =
  'KubeBlocks is an open-source Kubernetes operator for managing MySQL, PostgreSQL, MongoDB, Redis, Kafka, Elasticsearch, ClickHouse, and 35+ databases via unified CRD APIs. Simplify Day-2 operations: backup, failover, scaling, and monitoring — all through a single control plane.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'KubeBlocks — Open-Source Database Operator for Kubernetes',
    description: HOME_DESCRIPTION,
    alternates: { canonical: '/' },
    openGraph: {
      url: '/',
      type: 'website',
      title: 'KubeBlocks — Open-Source Database Operator for Kubernetes',
      description: HOME_DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KubeBlocks — Open-Source Database Operator for Kubernetes',
      description: HOME_DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KubeBlocks',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Kubernetes',
    description: HOME_DESCRIPTION,
    url: 'https://kubeblocks.io',
    license: 'https://www.gnu.org/licenses/agpl-3.0.html',
    codeRepository: 'https://github.com/apecloud/kubeblocks',
    featureList: [
      'MySQL cluster management on Kubernetes',
      'PostgreSQL cluster management on Kubernetes',
      'MongoDB cluster management on Kubernetes',
      'Redis / Valkey cluster management on Kubernetes',
      'Kafka cluster management on Kubernetes',
      'Elasticsearch cluster management on Kubernetes',
      'ClickHouse cluster management on Kubernetes',
      'Automated backup and point-in-time recovery (PITR)',
      'Horizontal and vertical scaling',
      'Automated failover and high availability',
      'Monitoring and alerting integration',
      'TLS / mTLS encryption',
      'Multi-version upgrade management',
      'Unified CRD API for all database engines',
    ],
    softwareRequirements: [
      { '@type': 'SoftwareApplication', name: 'MySQL', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'PostgreSQL', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'MongoDB', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Redis', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Valkey', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Kafka', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Elasticsearch', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'OpenSearch', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'ClickHouse', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Pulsar', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'RocketMQ', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Milvus', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Qdrant', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Weaviate', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'RabbitMQ', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'MariaDB', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'TiDB', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'StarRocks', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'InfluxDB', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Neo4j', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'Nebula Graph', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'GreptimeDB', applicationCategory: 'DatabaseApplication' },
      { '@type': 'SoftwareApplication', name: 'VictoriaMetrics', applicationCategory: 'DatabaseApplication' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ApeCloud',
    url: 'https://kubeblocks.io',
    logo: { '@type': 'ImageObject', url: toAbsoluteUrl('/logo.png') },
    sameAs: ['https://github.com/apecloud', 'https://twitter.com/KubeBlocks'],
  },
];


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const blogs = await getBlogs(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c') }}
      />
      <Box style={{ minHeight: 'var(--container-min-height)' }}>
        <Banner />
        <Divider />
        <Customers />
        <Evaluate />
        <Divider />
        <WhyNeedKubeBlocks />
        <Features />
        <Contact />
        <BlogsPreview blogs={blogs} />
      </Box>
      <Footer />
    </>
  );
}
