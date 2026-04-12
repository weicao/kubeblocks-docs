import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import PgOperatorPage from './PgOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks PostgreSQL Operator for Kubernetes — deploy production-grade PostgreSQL with Patroni HA, WAL-based PITR, built-in pgbouncer, pgvector, PostGIS, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'PostgreSQL Operator',
      'PostgreSQL Kubernetes',
      'PostgreSQL on Kubernetes',
      'KubeBlocks PostgreSQL',
      'PostgreSQL cluster Kubernetes',
      'PostgreSQL HA Kubernetes',
      'PostgreSQL PITR Kubernetes',
      'PostgreSQL backup restore Kubernetes',
      'Patroni Kubernetes',
      'pgbouncer Kubernetes',
      'open source PostgreSQL operator',
      'PostgreSQL Day-2 operations',
      'Zalando postgres-operator alternative',
      'best PostgreSQL operator Kubernetes 2026',
    ],
    alternates: { canonical: '/pg-operator' },
    openGraph: {
      url: '/pg-operator',
      type: 'website',
      title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks PostgreSQL Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade PostgreSQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: ['/logo.png'],
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'KubeBlocks PostgreSQL Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/pg-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/postgresql'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Patroni-based HA with automatic failover',
        'WAL-based PITR to any point in time',
        'Built-in pgbouncer for connection pooling',
        'pgvector extension for AI/vector workloads',
        'PostGIS extension for geospatial data',
        '11 pre-installed PostgreSQL extensions',
        'TLS encryption and certificate rotation',
        'Horizontal and vertical scaling',
        'Volume expansion without downtime',
        'Minor version rolling upgrades',
        'Dynamic parameter configuration',
        'Prometheus metrics via postgres-exporter',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does PostgreSQL HA work with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks uses Patroni for PostgreSQL high availability. Patroni monitors the primary and standby nodes using distributed consensus (etcd). When the primary fails, Patroni automatically elects the most up-to-date standby as the new primary, typically within 30 seconds.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks PostgreSQL Operator support PITR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports WAL-based Point-in-Time Recovery (PITR) for PostgreSQL. Base backups are taken periodically and WAL segments are archived continuously to object storage. You can restore to any second within the retention window.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support pgvector for AI workloads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks PostgreSQL includes pgvector pre-installed, enabling vector similarity search for AI and machine learning workloads. PostGIS for geospatial data and 9 other extensions are also pre-installed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks PostgreSQL Operator and CloudNativePG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for PostgreSQL. CloudNativePG is a CNCF sandbox project with a PostgreSQL-first design, strong community, and tight integration with PostgreSQL streaming replication. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running multiple databases benefit from a single operator and consistent operational model. KubeBlocks adds incremental backup, stop/start lifecycle management, and a web management UI (Enterprise). CloudNativePG offers deeper PostgreSQL-specific configuration and is a good choice for teams running PostgreSQL exclusively.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks PostgreSQL Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. An Enterprise edition adds major version upgrades via blue-green deployment, cross-cluster standby, and a web management UI.',
          },
        },
        {
          '@type': 'Question',
          name: 'What PostgreSQL versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports PostgreSQL 14, 15, and 16.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks include connection pooling for PostgreSQL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks includes pgbouncer as a built-in connection pooler in the PostgreSQL topology. It handles connection pooling in transaction mode, reducing the overhead of short-lived connections in high-concurrency workloads.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best PostgreSQL Operator for Kubernetes in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks PostgreSQL Operator is a production-ready open-source option for running PostgreSQL on Kubernetes. It supports PostgreSQL 14, 15, and 16 with Patroni-based HA, WAL-based PITR to any point in time, built-in pgbouncer for connection pooling, and 11 pre-installed extensions including pgvector (for AI/vector workloads) and PostGIS (for geospatial data). Day-2 operations — horizontal and vertical scaling, volume expansion, rolling version upgrades, TLS, and dynamic parameter configuration — are managed declaratively via OpsRequest CRDs. As a unified operator for 35+ database engines, KubeBlocks is especially valuable for teams running PostgreSQL alongside MySQL, Redis, MongoDB, or other databases on the same cluster.',
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PgOperatorPage />
      <Footer />
    </>
  );
}
