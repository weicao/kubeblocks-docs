import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import ZookeeperOperatorPage from './ZookeeperOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks ZooKeeper Operator for Kubernetes — deploy production-grade Apache ZooKeeper ensembles with ZAB consensus, role-aware leader/follower routing, horizontal scaling, dynamic reconfiguration, backup, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Apache ZooKeeper Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'ZooKeeper Operator',
      'ZooKeeper Kubernetes',
      'Apache ZooKeeper on Kubernetes',
      'KubeBlocks ZooKeeper',
      'ZooKeeper ensemble Kubernetes',
      'ZooKeeper KRaft replacement',
      'ZooKeeper HA Kubernetes',
      'ZooKeeper horizontal scaling',
      'ZooKeeper backup restore Kubernetes',
      'ZooKeeper dynamic reconfiguration',
      'distributed coordination Kubernetes',
      'open source ZooKeeper operator',
      'ZooKeeper Day-2 operations',
      'best ZooKeeper operator Kubernetes 2026',
      'ZooKeeper k8s',
      'ZooKeeper k8s operator',
      'run ZooKeeper on k8s',
      'k8s ZooKeeper operator',
    ],
    alternates: { canonical: '/zookeeper-operator' },
    openGraph: {
      url: '/zookeeper-operator',
      type: 'website',
      title: 'The Production-Grade Apache ZooKeeper Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks ZooKeeper Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Apache ZooKeeper Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks ZooKeeper Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Distributed Coordination Service',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/zookeeper-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/zookeeper'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'ZAB (ZooKeeper Atomic Broadcast) consensus protocol for leader election',
        'Leader-only write service with automatic endpoint switching on failover',
        'All-node read service for load-distributed reads across the ensemble',
        'Quorum-safe horizontal scaling (add/remove members while maintaining odd quorum)',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Dynamic parameter reconfiguration without full ensemble restarts',
        'Rolling minor version upgrades (3.4 through 3.9)',
        'Snapshot-based backup and restore via zoocreeper',
        'S3-compatible object storage for backup snapshots',
        'Prometheus metrics on port 7000',
        'Stop/start cluster lifecycle management',
        'Kubernetes CRD-based declarative ensemble management',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy Apache ZooKeeper on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the ZooKeeper addon: "helm upgrade -i kb-addon-zookeeper kubeblocks/zookeeper -n kb-system". Create a ZooKeeper ensemble by applying a Cluster resource with the zookeeper topology and your desired replica count (3 for a minimum production quorum). KubeBlocks provisions pods, headless services, and PVCs automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What ZooKeeper versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Apache ZooKeeper 3.4.14, 3.6.4, 3.7.2, 3.8.4, 3.9.2, and 3.9.4. The latest supported version is 3.9.4. Rolling minor version upgrades across these versions are supported.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle ZooKeeper leader election and failover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks relies on ZooKeeper\'s built-in ZAB (ZooKeeper Atomic Broadcast) protocol for leader election. When the leader pod fails, the remaining quorum members elect a new leader automatically. KubeBlocks provides a dedicated leader-only ClusterIP service (roleSelector: leader) that Kubernetes updates when the leader changes — clients reconnect without manual reconfiguration.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks route reads and writes to ZooKeeper?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks creates two services per cluster: <cluster>-zookeeper (ClusterIP, roleSelector=leader) for writes and coordinated reads, and <cluster>-zookeeper-readable (ClusterIP, no roleSelector) that routes to all ensemble members for distributed read load.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my ZooKeeper ensemble horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling of ZooKeeper ensembles via OpsRequest. ZooKeeper ensembles must always have an odd number of members (3, 5, 7) to maintain quorum. KubeBlocks performs quorum-safe scale sequences — adding the new member to the configuration before joining, and removing it cleanly before pod termination.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support ZooKeeper backup and restore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports snapshot-based backup for ZooKeeper using the zoocreeper tool. Backups are stored in S3-compatible object storage and can restore a new ensemble from any stored snapshot. Scheduled backups are also supported via the BackupSchedule CRD.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks ZooKeeper Operator and Pravega ZooKeeper Operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both manage ZooKeeper on Kubernetes with HA and scaling support. Pravega ZooKeeper Operator is a widely used, focused operator maintained by the Pravega community. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running ZooKeeper alongside other databases benefit from a single operator and consistent operational model. KubeBlocks adds snapshot backup/restore to S3-compatible storage, stop/start lifecycle management, PVC volume expansion, and a web management UI (Enterprise) — capabilities not natively provided by Pravega ZooKeeper Operator.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks ZooKeeper Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The ZooKeeper addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best Apache ZooKeeper k8s operator in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks ZooKeeper Operator is a production-ready open-source option for running Apache ZooKeeper on Kubernetes (k8s). It supports ZooKeeper 3.4 through 3.9.4 with ZAB consensus-based leader election, role-aware service routing (leader-only writes, all-node reads), and quorum-safe horizontal scaling (odd-number ensembles of 3, 5, or 7 nodes). Key capabilities include snapshot-based backup and restore via zoocreeper to S3-compatible storage, dynamic parameter reconfiguration, rolling version upgrades, and Prometheus metrics on port 7000. As a unified operator for 35+ database engines, KubeBlocks simplifies operations for teams running ZooKeeper alongside Kafka, MongoDB, or other databases on k8s.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks ZooKeeper Operator and Pravega ZooKeeper Operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both KubeBlocks ZooKeeper Operator and Pravega ZooKeeper Operator are open-source, Kubernetes-native operators for managing Apache ZooKeeper ensembles. Both support ZAB consensus-based leader election, automatic failover, and quorum-safe horizontal scaling. Pravega ZooKeeper Operator is a widely used, ZooKeeper-focused operator maintained by the Pravega community. KubeBlocks adds snapshot-based backup and restore to S3-compatible storage via zoocreeper, vertical scaling (CPU and memory), PVC volume expansion, dynamic parameter reconfiguration without full ensemble restarts, stop/start lifecycle management, and role-aware service routing — none of which Pravega ZooKeeper Operator supports. KubeBlocks manages 35+ database engines with a unified OpsRequest API, making it especially valuable for teams running ZooKeeper alongside Kafka, MongoDB, or other databases.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks ZooKeeper Operator and Bitnami ZooKeeper Helm Chart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks ZooKeeper Operator uses a Kubernetes-native CRD API, while the Bitnami ZooKeeper Helm Chart is a Helm-based deployment with no CRD API or declarative Day-2 operations. KubeBlocks supports quorum-safe horizontal scaling, role-aware service routing (leader-only writes, all-node reads), snapshot-based backup and restore via zoocreeper to S3-compatible storage, vertical scaling, PVC volume expansion, dynamic parameter reconfiguration, rolling version upgrades, stop/start lifecycle management, and Prometheus metrics — none of which Bitnami supports or supports only partially. Bitnami provides automatic leader failover detection only partially, while KubeBlocks fully monitors ensemble health. For production Apache ZooKeeper on Kubernetes requiring backup, operational lifecycle management, and declarative Day-2 operations, KubeBlocks is the more complete solution.',
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
      <ZookeeperOperatorPage />
      <Footer />
    </>
  );
}
