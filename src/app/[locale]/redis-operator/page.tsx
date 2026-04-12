import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import RedisOperatorPage from './RedisOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks Redis Operator for Kubernetes — deploy production-grade Redis with Sentinel-based HA, ACL management, RDB backup & restore, horizontal scaling, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'Redis Operator',
      'Redis Kubernetes',
      'Redis on Kubernetes',
      'KubeBlocks Redis',
      'Redis cluster Kubernetes',
      'Redis HA Kubernetes',
      'Redis Sentinel Kubernetes',
      'Redis backup restore Kubernetes',
      'Valkey Kubernetes',
      'open source Redis operator',
      'Redis Day-2 operations',
    ],
    alternates: { canonical: '/redis-operator' },
    openGraph: {
      url: '/redis-operator',
      type: 'website',
      title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks Redis Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Redis Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks Redis Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/redis-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/redis'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Sentinel-based HA with automatic failover',
        'Redis Cluster topology for horizontal sharding',
        'ACL-based user and permission management',
        'RDB snapshot backup and restore',
        'TLS encryption and certificate rotation',
        'Horizontal scaling (add/remove replicas)',
        'Vertical scaling',
        'Volume expansion',
        'Rolling version upgrades',
        'Dynamic Redis configuration',
        'Prometheus metrics via redis-exporter',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What Redis topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports three Redis topologies: Standalone (single instance), Replication (primary-replica with Redis Sentinel for automatic failover), and Cluster (native Redis Cluster for horizontal sharding across multiple shards).',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Redis failover work with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KubeBlocks uses Redis Sentinel for automatic failover in the Replication topology. Sentinel monitors the primary and replicas; when the primary becomes unreachable and a quorum of Sentinels agree, a replica is elected as the new primary. KubeBlocks updates the Kubernetes Service endpoints accordingly.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks Redis Operator support ACL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports Redis ACL (Access Control Lists) for user and permission management. ACL rules are managed declaratively via Kubernetes resources and synchronized across all replica set members.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks Redis Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. It supports both Redis and Valkey (the open-source Redis fork).',
          },
        },
        {
          '@type': 'Question',
          name: 'What Redis versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Redis 7.0, 7.2, and 8.x. It also supports Valkey 8.x as a Redis-compatible alternative.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can KubeBlocks scale Redis horizontally?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. In Replication topology, you can add or remove replicas online via an OpsRequest. In Cluster topology, you can add shards for horizontal write scalability. KubeBlocks handles the topology reconfiguration and data rebalancing automatically.',
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
      <RedisOperatorPage />
      <Footer />
    </>
  );
}
