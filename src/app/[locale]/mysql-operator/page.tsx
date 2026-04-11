import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import MysqlOperatorPage from './MysqlOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks MySQL Operator for Kubernetes — deploy production-grade MySQL with automated failover, PITR backup, SemiSync and Group Replication (MGR), ProxySQL, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    alternates: { canonical: '/mysql-operator' },
    openGraph: {
      url: '/mysql-operator',
      type: 'website',
      title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks MySQL Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade MySQL Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks MySQL Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/mysql-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/apecloud-mysql'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://opensource.org/licenses/Apache-2.0',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Semi-synchronous replication with automatic failover',
        'MySQL Group Replication (MGR) with multi-primary support',
        'ProxySQL for connection pooling and read/write splitting',
        'Physical backup and PITR via XtraBackup + binlog streaming',
        'TLS encryption and certificate rotation',
        'Horizontal and vertical scaling',
        'Volume expansion without downtime',
        'Minor version rolling upgrades',
        'Dynamic parameter configuration',
        'Prometheus metrics via mysqld-exporter',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What MySQL topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports three MySQL topologies: Semi-sync (primary-replica with semi-synchronous replication and orchestrator-based failover), MGR (MySQL Group Replication with multi-primary or single-primary mode), and a standalone instance for development.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks MySQL Operator support PITR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports Point-in-Time Recovery (PITR) for MySQL using XtraBackup for full physical backups and continuous binlog archiving to object storage. You can restore to any point in time within the retention window by replaying binlogs after the nearest full backup.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support MySQL Group Replication (MGR)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks has a dedicated MGR topology that supports both single-primary and multi-primary modes, with built-in health checks, automatic member management, and ProxySQL integration for read/write splitting.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks MySQL Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the Apache 2.0 license at https://github.com/apecloud/kubeblocks. An Enterprise edition adds major version blue-green upgrades, cross-cluster standby, and a web management UI.',
          },
        },
        {
          '@type': 'Question',
          name: 'What MySQL versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports MySQL 8.0 and 8.4.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle MySQL failover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For Semi-sync topology, KubeBlocks uses Orchestrator to detect primary failure and promote the most up-to-date replica. For MGR, MySQL Group Replication handles automatic primary election natively. Both topologies complete failover in under 30 seconds without manual intervention.',
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
      <MysqlOperatorPage />
      <Footer />
    </>
  );
}
