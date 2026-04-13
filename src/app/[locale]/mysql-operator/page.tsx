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
    keywords: [
      'MySQL Operator',
      'MySQL Kubernetes',
      'MySQL on Kubernetes',
      'KubeBlocks MySQL',
      'MySQL cluster Kubernetes',
      'MySQL HA Kubernetes',
      'MySQL Group Replication Kubernetes',
      'MySQL PITR Kubernetes',
      'MySQL backup restore Kubernetes',
      'open source MySQL operator',
      'MySQL Day-2 operations',
      'best MySQL operator Kubernetes 2026',
      'MySQL k8s',
      'MySQL k8s operator',
      'run MySQL on k8s',
      'k8s MySQL operator',
    ],
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
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
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
          name: 'What is the difference between KubeBlocks MySQL Operator and Percona Operator for MySQL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for MySQL with HA, backup, and scaling capabilities. Percona Operator is MySQL-specific with deep Percona XtraDB Cluster and Group Replication support and strong Percona ecosystem integration. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running multiple databases benefit from a single operator and consistent operational model. KubeBlocks adds stop/start lifecycle management, a web management UI (Enterprise), and cross-engine consistency that Percona does not provide natively.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks MySQL Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. An Enterprise edition adds major version blue-green upgrades, cross-cluster standby, and a web management UI.',
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
        {
          '@type': 'Question',
          name: 'What is the best MySQL k8s operator in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks MySQL Operator is a strong open-source choice for running MySQL on Kubernetes (k8s). It supports MySQL 8.0 and 8.4 with three production topologies: Semi-sync replication with Orchestrator-based failover, MySQL Group Replication (MGR) for multi-primary workloads, and standalone for development. Key capabilities include PITR via XtraBackup and binlog streaming, ProxySQL connection pooling and read/write splitting, TLS encryption, and full Day-2 operations — scaling, backup, parameter management, and version upgrades — via a unified OpsRequest API. As a unified operator for 35+ database engines, KubeBlocks reduces operational overhead for teams running MySQL alongside PostgreSQL, Redis, MongoDB, or other databases on k8s.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks MySQL Operator and Oracle MySQL Operator for Kubernetes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both KubeBlocks MySQL Operator and Oracle MySQL Operator for Kubernetes are open-source operators that support MySQL Group Replication (MGR) and read/write splitting. KubeBlocks additionally supports Semi-sync replication with Orchestrator-based automatic failover, full PITR via XtraBackup and binlog streaming, ProxySQL connection pooling, dynamic parameter reconfiguration without pod restarts, and horizontal scaling beyond what Oracle\'s operator provides. Oracle MySQL Operator is the official operator from MySQL\'s maintainer. KubeBlocks manages 35+ database engines with a unified OpsRequest API, making it easier for teams running MySQL alongside PostgreSQL, Redis, MongoDB, or other databases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks MySQL Operator and Percona Operator for MySQL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks MySQL Operator and Percona Operator for MySQL are both open-source operators for running MySQL on Kubernetes. KubeBlocks uniquely supports three HA topologies: Semi-sync replication with Orchestrator failover, MySQL Group Replication (MGR) for active-active multi-primary setups, and standalone. Percona Operator supports Group Replication and semi-sync but lacks Orchestrator integration. KubeBlocks adds ProxySQL-based read/write splitting, full PITR via XtraBackup and binlog streaming, and dynamic parameter reconfiguration without pod restarts. Both support TLS, Prometheus metrics, horizontal and vertical scaling, and PVC expansion. Percona adds open-source user and privilege management, which KubeBlocks provides in its Enterprise edition. KubeBlocks manages 35+ database engines with a single operator and OpsRequest API.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks MySQL Operator and Bitpoke MySQL Operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks MySQL Operator and Bitpoke MySQL Operator are both open-source operators for MySQL on Kubernetes. Both support Semi-sync replication, ProxySQL read/write splitting, and Prometheus metrics. KubeBlocks additionally supports MySQL Group Replication (MGR) for multi-primary workloads, Orchestrator-based automatic failover, full PITR via XtraBackup and binlog streaming, dynamic parameter reconfiguration without pod restarts, and rolling minor version upgrades. Bitpoke supports partial PITR and partial minor upgrades. KubeBlocks manages 35+ database engines with a unified OpsRequest API, reducing operational overhead for teams running MySQL alongside other databases.',
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
