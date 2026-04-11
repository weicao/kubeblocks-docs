import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import MilvusOperatorPage from './MilvusOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks Milvus Operator for Kubernetes — deploy production-grade Milvus vector database clusters with standalone and distributed topologies, billion-scale ANN search, horizontal scaling, backup, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Milvus Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'Milvus Operator',
      'Milvus Kubernetes',
      'Milvus on Kubernetes',
      'vector database Kubernetes',
      'KubeBlocks Milvus',
      'Milvus standalone',
      'Milvus distributed',
      'Milvus cluster',
      'ANN search Kubernetes',
      'vector search operator',
      'Milvus backup restore',
      'Milvus horizontal scaling',
      'Milvus Helm alternative',
      'open source Milvus operator',
    ],
    alternates: { canonical: '/milvus-operator' },
    openGraph: {
      url: '/milvus-operator',
      type: 'website',
      title: 'The Production-Grade Milvus Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks Milvus Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Milvus Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks Milvus Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Vector Database',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/milvus-operator',
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Standalone topology: single all-in-one pod for development and testing',
        'Distributed (cluster) topology: proxy, mixcoord, datanode, indexnode, querynode',
        'Billion-scale approximate nearest-neighbor (ANN) vector search',
        'Independent horizontal scaling of querynode, datanode, indexnode, and proxy',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Dynamic parameter reconfiguration without full cluster restarts',
        'Rolling version upgrades from 2.3.x to 2.5.x with component-ordered sequencing',
        'Collection-level backup and restore via milvus-backup v0.5.9+',
        'S3-compatible object storage (MinIO) for vectors, indexes, and WAL',
        'Prometheus-compatible metrics on port 9091 per component',
        'Stop/start cluster lifecycle management to eliminate idle compute cost',
        'Kubernetes CRD-based declarative cluster management',
        'Same CRD API for standalone and distributed topologies',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy Milvus on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the Milvus addon: "helm upgrade -i kb-addon-milvus kubeblocks/milvus -n kb-system". Create a cluster by applying a Cluster resource with topology: standalone or topology: cluster. KubeBlocks provisions all required pods, services, and storage automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Milvus Standalone and Distributed topology in KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standalone runs all Milvus coordinator and worker roles as goroutines inside a single pod — ideal for development, CI, and single-node deployments. Distributed (cluster) runs each component (proxy, mixcoord, datanode, indexnode, querynode) as separate scalable pods backed by MinIO, etcd, and Pulsar — designed for production and billion-scale workloads. Both topologies use the same Cluster CRD API; switch by changing the topology field.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Milvus versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Milvus 2.3.2 and 2.5.13. Rolling version upgrades from 2.3.x to 2.5.x are supported with component-ordered sequencing: worker nodes (datanode, indexnode, querynode) are upgraded first, then proxy, then mixcoord.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale Milvus horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports independent horizontal scaling of querynode (for more ANN search throughput), datanode (for higher insert and flush concurrency), indexnode (for faster index builds), and proxy (for higher client concurrency). All Milvus workers are stateless — scale out without data migration. Brief segment rebalancing occurs during querynode scale-out.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support Milvus backup and restore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks integrates milvus-backup (v0.5.9+) for collection-level snapshots. Backups are exported to S3-compatible object storage (MinIO or any compatible endpoint) and can restore to a new Milvus cluster at any time. Standalone clusters also support volume snapshot backup.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Milvus store data when managed by KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All Milvus compute pods (proxy, mixcoord, datanode, indexnode, querynode) are stateless and use emptyDir volumes. Persistent state is stored externally: vectors and indexes in MinIO (S3-compatible object storage), cluster metadata and collection schemas in etcd, and the write-ahead log in Pulsar or Kafka. This separation of compute and storage allows any worker pod to be scaled or restarted without data loss.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks Milvus Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The Milvus addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI, cross-cluster standby, and dedicated support.',
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
      <MilvusOperatorPage />
      <Footer />
    </>
  );
}
