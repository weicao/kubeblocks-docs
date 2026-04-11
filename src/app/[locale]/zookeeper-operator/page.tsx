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
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'ZAB (ZooKeeper Atomic Broadcast) consensus protocol',
        'Leader-only write service with automatic endpoint switching',
        'All-node read service for load-distributed reads',
        'Quorum-safe horizontal scaling',
        'Vertical scaling (CPU/memory)',
        'PVC volume expansion',
        'Dynamic parameter reconfiguration',
        'Rolling minor version upgrades (3.4 through 3.9)',
        'Backup and restore via zoocreeper',
        'Prometheus metrics on port 7000',
        'Stop/start cluster lifecycle management',
        'Kubernetes CRD-based declarative management',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What ZooKeeper versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Apache ZooKeeper versions 3.4.14, 3.6.4, 3.7.2, 3.8.4, 3.9.2, and 3.9.4. The latest supported version is 3.9.4.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle ZooKeeper leader election?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks relies on ZooKeeper\'s built-in ZAB (ZooKeeper Atomic Broadcast) protocol for leader election. When the leader pod fails, the remaining quorum members elect a new leader automatically. KubeBlocks provides a dedicated leader-only ClusterIP service (roleSelector: leader) that Kubernetes automatically updates when the leader changes — clients reconnect without reconfiguration.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks route reads and writes to ZooKeeper?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks creates two services: <cluster>-zookeeper (ClusterIP, roleSelector=leader) for writes and coordinated reads, and <cluster>-zookeeper-readable (ClusterIP, no roleSelector) that routes to all ensemble members for distributed reads.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my ZooKeeper ensemble horizontally?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling of ZooKeeper ensembles via OpsRequest. ZooKeeper ensembles should always have an odd number of members (3, 5, 7) to maintain quorum. KubeBlocks performs quorum-safe scaling sequences to prevent downtime.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support ZooKeeper backup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports snapshot-based backup for ZooKeeper using the zoocreeper tool. Backups can be stored in S3-compatible object storage and used to restore a new ensemble from any stored snapshot.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks ZooKeeper Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source and freely available at https://github.com/apecloud/kubeblocks.',
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
