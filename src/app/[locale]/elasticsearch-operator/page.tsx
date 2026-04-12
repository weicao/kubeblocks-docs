import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import ElasticsearchOperatorPage from './ElasticsearchOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks Elasticsearch Operator for Kubernetes — deploy production-grade Elasticsearch clusters with multi-node HA, dedicated master/data/ingest/transform topologies, snapshot backup, horizontal scaling, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Elasticsearch Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'Elasticsearch Operator',
      'Elasticsearch Kubernetes',
      'Elasticsearch on Kubernetes',
      'KubeBlocks Elasticsearch',
      'Elasticsearch cluster Kubernetes',
      'Elasticsearch HA Kubernetes',
      'Elasticsearch horizontal scaling',
      'Elasticsearch backup restore Kubernetes',
      'Elasticsearch rolling upgrade',
      'full-text search Kubernetes',
      'open source Elasticsearch operator',
      'Elasticsearch Day-2 operations',
      'ECK alternative',
      'best Elasticsearch operator Kubernetes 2026',
    ],
    alternates: { canonical: '/elasticsearch-operator' },
    openGraph: {
      url: '/elasticsearch-operator',
      type: 'website',
      title: 'The Production-Grade Elasticsearch Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks Elasticsearch Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Elasticsearch Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks Elasticsearch Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Search Engine',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/elasticsearch-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/elasticsearch'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Single-node, MDIT (combined roles), multi-node (master+dit), and fully-separated (m-d-i-t) topologies',
        'Dedicated master nodes for cluster state with quorum-based cluster coordination',
        'Horizontal scaling of data, ingest, and transform nodes without re-indexing',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Dynamic parameter reconfiguration without full cluster restarts',
        'Rolling version upgrades within the same major series (e.g. 7.10 → 7.17); cross-major upgrades supported with compatibility prerequisites',
        'Snapshot-based backup and restore to S3-compatible object storage',
        'Prometheus metrics on port 9114 via elasticsearch-exporter',
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
          name: 'How do I deploy Elasticsearch on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the Elasticsearch addon: "helm upgrade -i kb-addon-elasticsearch kubeblocks/elasticsearch -n kb-system". Create an Elasticsearch cluster by applying a Cluster resource with the desired topology (single-node, mdit, multi-node, or m-d-i-t) and replica count. KubeBlocks provisions pods, services, and PVCs automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Elasticsearch topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports four Elasticsearch topologies: single-node (all roles in one pod, for development), mdit (multiple nodes each running all roles, for scalable medium workloads without dedicated masters), multi-node (dedicated master nodes + combined data/ingest/transform nodes, for production HA), and m-d-i-t (fully separated master, data, ingest, and transform nodes, for large-scale deployments with role isolation).',
          },
        },
        {
          '@type': 'Question',
          name: 'What Elasticsearch versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Elasticsearch 6.8.23, 7.7.1, 7.8.1, 7.10.1, 7.10.2, 8.1.3, 8.8.2, and 8.15.5. The latest supported version is 8.15.5. Rolling upgrades within the same major series are supported; cross-major upgrades require meeting Elasticsearch compatibility prerequisites.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle Elasticsearch high availability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks deploys dedicated master nodes (minimum 3) that use Elasticsearch cluster coordination (quorum-based) for cluster state management. Data nodes store and serve index shards with configurable replication. If a master node fails, the remaining quorum elects a new master automatically. KubeBlocks monitors cluster health and manages pod restarts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks Elasticsearch Operator support backup and restore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports snapshot-based backup for Elasticsearch using S3-compatible object storage (AWS S3, MinIO, etc.). Scheduled backups are supported via the BackupSchedule CRD. Restore creates a new cluster from any stored snapshot.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my Elasticsearch cluster horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling of Elasticsearch data, ingest, and transform nodes via OpsRequest. When you add data nodes, Elasticsearch automatically rebalances shards across the new nodes without re-indexing. The cluster remains available throughout; a brief rebalancing phase may cause minor latency variation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks Elasticsearch Operator and ECK (Elastic Cloud on Kubernetes)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for Elasticsearch. ECK is the official operator from Elastic with the deepest Elasticsearch integration, support for the full Elastic Stack (Kibana, APM, Fleet), and enterprise-grade security features. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running multiple databases benefit from a single operator and consistent operational model. KubeBlocks is fully open source (AGPL-3.0) with no license-gated features for core operations, whereas ECK requires an Elastic license for enterprise features. KubeBlocks adds stop/start lifecycle management and a web management UI (Enterprise).',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks Elasticsearch Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The Elasticsearch addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best Elasticsearch Operator for Kubernetes in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks Elasticsearch Operator is a fully open-source option for running Elasticsearch on Kubernetes. It supports Elasticsearch 7.x and 8.x (up to 8.15.5) across four topologies: single-node (development), mdit (multi-node combined roles), multi-node (dedicated master + data/ingest/transform), and fully-separated (m-d-i-t for large-scale role isolation). Key capabilities include quorum-based HA with dedicated master nodes, horizontal scaling of data nodes with automatic shard rebalancing, snapshot-based backup and restore to S3-compatible storage, and Day-2 operations via OpsRequest CRDs. KubeBlocks is fully open source under AGPL-3.0, with no license-gated core features, and manages 35+ database engines with a single operator.',
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
      <ElasticsearchOperatorPage />
      <Footer />
    </>
  );
}
