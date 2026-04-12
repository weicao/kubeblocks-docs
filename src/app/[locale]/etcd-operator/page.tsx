import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import EtcdOperatorPage from './EtcdOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks etcd Operator for Kubernetes — deploy production-grade etcd clusters with Raft HA, automatic leader election, snapshot backup, horizontal scaling, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade etcd Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'etcd Operator',
      'etcd Kubernetes',
      'etcd on Kubernetes',
      'KubeBlocks etcd',
      'etcd cluster Kubernetes',
      'etcd HA Kubernetes',
      'etcd Raft consensus',
      'etcd backup restore Kubernetes',
      'etcd rolling upgrade',
      'distributed key-value store Kubernetes',
      'open source etcd operator',
      'etcd Day-2 operations',
    ],
    alternates: { canonical: '/etcd-operator' },
    openGraph: {
      url: '/etcd-operator',
      type: 'website',
      title: 'The Production-Grade etcd Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks etcd Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade etcd Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks etcd Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/etcd-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/etcd'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Raft consensus with automatic leader election (< 5s)',
        '3-node or 5-node quorum-based HA clusters',
        'Horizontal scaling (add/remove members while maintaining quorum)',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Dynamic parameter reconfiguration (heartbeat, election timeout)',
        'Rolling version upgrades (3.5.x → 3.6.x)',
        'Snapshot-based backup and restore to S3-compatible object storage',
        'Built-in Prometheus metrics at :2379/metrics',
        'Stop/start cluster lifecycle management',
        'Expose via LoadBalancer for external client access',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy etcd on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the etcd addon: "helm upgrade -i kb-addon-etcd kubeblocks/etcd -n kb-system". Create an etcd cluster by applying a Cluster resource with clusterDef: etcd, your desired replica count (3 or 5), and serviceVersion. KubeBlocks provisions pods, services, and PVCs automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What etcd versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports etcd 3.5.6, 3.5.15, and 3.6.1. Rolling upgrades between versions are supported via OpsRequest.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle etcd high availability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks deploys etcd in a Raft cluster with 3 or 5 nodes. A 3-node cluster tolerates 1 failure; a 5-node cluster tolerates 2. When the leader fails, Raft elects a new leader among the remaining members within seconds — no manual intervention needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks etcd Operator support backup and restore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports snapshot-based backup for etcd using etcdctl to create consistent DB snapshots, which are then uploaded to S3-compatible object storage. Scheduled backups are supported via the BackupSchedule CRD. Restore creates a new cluster from any stored snapshot.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my etcd cluster horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling of etcd clusters via OpsRequest. You can safely grow from 3 to 5 nodes — KubeBlocks joins new pods to the Raft cluster, ensuring quorum is maintained at every step. Scaling from 5 to 3 is also supported.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks etcd Operator and the community etcd-operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both manage etcd clusters on Kubernetes with Raft-based HA. The community etcd-operator (originally from CoreOS) is a lightweight, focused operator. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running etcd alongside other databases benefit from a single operator and consistent operational model. KubeBlocks adds snapshot backup/restore to S3-compatible storage, stop/start lifecycle management, PVC volume expansion, vertical scaling, and a web management UI (Enterprise) — operational capabilities that the community etcd-operator does not natively provide.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks etcd Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The etcd addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
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
      <EtcdOperatorPage />
      <Footer />
    </>
  );
}
