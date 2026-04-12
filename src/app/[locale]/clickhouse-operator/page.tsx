import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import { toAbsoluteUrl } from '@/utils/site';
import type { Metadata } from 'next';
import ClickHouseOperatorPage from './ClickHouseOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks ClickHouse Operator for Kubernetes — deploy production-grade ClickHouse clusters with sharding, ClickHouse Keeper HA, full and incremental backup, horizontal scaling, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade ClickHouse Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'ClickHouse Operator',
      'ClickHouse Kubernetes',
      'ClickHouse on Kubernetes',
      'KubeBlocks ClickHouse',
      'ClickHouse cluster Kubernetes',
      'ClickHouse HA Kubernetes',
      'ClickHouse sharding Kubernetes',
      'ClickHouse backup restore Kubernetes',
      'ClickHouse Keeper Kubernetes',
      'OLAP database Kubernetes',
      'open source ClickHouse operator',
      'ClickHouse Day-2 operations',
      'Altinity operator alternative',
    ],
    alternates: { canonical: '/clickhouse-operator' },
    openGraph: {
      url: '/clickhouse-operator',
      type: 'website',
      title: 'The Production-Grade ClickHouse Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks ClickHouse Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade ClickHouse Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks ClickHouse Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: toAbsoluteUrl('/clickhouse-operator'),
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/clickhouse'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Standalone and Cluster (with ClickHouse Keeper) topologies',
        'Multi-shard deployment with 1 to 128 shards',
        'ClickHouse Keeper built-in — ZooKeeper-compatible, Raft consensus for ReplicatedMergeTree',
        'Horizontal shard and replica scaling via OpsRequest',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Full and incremental backup via clickhouse-backup to S3-compatible object storage',
        'Dynamic parameter reconfiguration via XML ConfigMap (no restart for mutable params)',
        'Rolling version upgrades across supported ClickHouse versions',
        'TLS encryption for client and inter-shard communication',
        'Prometheus metrics on port 8001 for shards and Keeper nodes',
        'Stop/start cluster lifecycle management',
        'Kubernetes CRD-based declarative cluster management',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy ClickHouse on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the ClickHouse addon: "helm upgrade -i kb-addon-clickhouse kubeblocks/clickhouse -n kb-system". Create a ClickHouse cluster by applying a Cluster resource with clusterDef: clickhouse, your desired topology (standalone or cluster), shard count, and replica count per shard. KubeBlocks provisions pods, services, PVCs, and ClickHouse Keeper automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What ClickHouse topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports two ClickHouse topologies: standalone (one or more independent shards without a coordinator, suitable for development and simple analytics) and cluster (shards backed by a built-in ClickHouse Keeper ensemble for Raft consensus, enabling ReplicatedMergeTree tables, DDL replication, and production HA). The cluster topology supports 1 to 128 shards with configurable replicas per shard.',
          },
        },
        {
          '@type': 'Question',
          name: 'What ClickHouse versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports ClickHouse 22.8, 24.8, and 25.4 (latest). Rolling upgrades between supported versions are available via OpsRequest.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle ClickHouse high availability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the cluster topology, KubeBlocks deploys a built-in ClickHouse Keeper ensemble (typically 3 nodes) using Raft consensus. Keeper tracks replica state for ReplicatedMergeTree tables and coordinates distributed DDL. When the Keeper leader fails, the remaining quorum elects a new leader automatically within seconds. Planned switchover is also supported via OpsRequest.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks ClickHouse Operator support backup and restore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports both full and incremental backup for ClickHouse using clickhouse-backup, which uploads snapshots to S3-compatible object storage. Incremental backups capture only changed data parts since the last full backup, minimizing storage cost. Restore creates a new cluster from any stored snapshot.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my ClickHouse cluster horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling in two dimensions: adding/removing shards (up to 128 shards total) and adding/removing replicas within each shard. After adding new shards, KubeBlocks runs a post-scale-out step to register them in the cluster configuration automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks ClickHouse Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The ClickHouse addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
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
      <ClickHouseOperatorPage />
      <Footer />
    </>
  );
}
