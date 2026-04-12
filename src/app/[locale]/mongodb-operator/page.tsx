import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import MongoDBOperatorPage from './MongoDBOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks MongoDB Operator for Kubernetes — deploy production-grade MongoDB with ReplicaSet HA, sharding, PITR via oplog streaming, TLS, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'MongoDB Operator',
      'MongoDB Kubernetes',
      'MongoDB on Kubernetes',
      'KubeBlocks MongoDB',
      'MongoDB cluster Kubernetes',
      'MongoDB HA Kubernetes',
      'MongoDB ReplicaSet Kubernetes',
      'MongoDB sharding Kubernetes',
      'MongoDB PITR Kubernetes',
      'open source MongoDB operator',
      'MongoDB Day-2 operations',
      'best MongoDB operator Kubernetes 2026',
    ],
    alternates: { canonical: '/mongodb-operator' },
    openGraph: {
      url: '/mongodb-operator',
      type: 'website',
      title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks MongoDB Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade MongoDB Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks MongoDB Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Database Management',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/mongodb-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/mongodb'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'ReplicaSet HA with automatic majority-vote failover under 30 seconds',
        'Sharded cluster topology with mongos routing',
        'Physical backup on secondary with no primary impact',
        'PITR via continuous oplog streaming to object storage',
        'TLS encryption and certificate rotation',
        'Horizontal and vertical scaling',
        'Volume expansion without downtime',
        'Minor version rolling upgrades',
        'Dynamic mongod configuration',
        'Prometheus metrics via mongodb-exporter',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What MongoDB topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports two MongoDB topologies: ReplicaSet (3-node replica set with automatic majority-vote failover in under 30 seconds) and Sharding (distributed shard replica sets with mongos routers and a Config Server Replica Set for horizontal write scalability).',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks MongoDB Operator support PITR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports Point-in-Time Recovery (PITR) for MongoDB via continuous oplog archiving. Scheduled full backups are taken on a secondary and the oplog is streamed continuously to S3-compatible object storage, allowing restore to any second within the retention window — not just snapshot points.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does MongoDB failover work with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KubeBlocks relies on MongoDB's native majority-vote election. When the primary becomes unreachable, the replica set automatically elects the most up-to-date secondary as the new primary — typically within 30 seconds, with no manual intervention. KubeBlocks then updates the Kubernetes Service selector to route writes to the new primary without client-side changes.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks MongoDB Operator and MongoDB Community Operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for MongoDB. MongoDB Community Operator is maintained by MongoDB Inc. and is the standard choice for self-managed MongoDB on Kubernetes, with tight integration with MongoDB tooling. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines. KubeBlocks adds backup/restore to S3-compatible storage, incremental backup, stop/start lifecycle management, PVC volume expansion, and a web management UI (Enterprise) — operational features the Community Operator does not provide natively. KubeBlocks also supports sharded cluster topology alongside replica sets.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks MongoDB Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the AGPL-3.0 license. The source code is available at https://github.com/apecloud/kubeblocks. An Enterprise edition with additional features such as major version blue-green upgrades, cross-cluster DR, and a web management UI is also available.',
          },
        },
        {
          '@type': 'Question',
          name: 'What MongoDB versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports MongoDB 6.0, 7.0, and 8.0.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I deploy a MongoDB cluster on Kubernetes with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then apply a Cluster manifest with clusterDef: mongodb and topology: replicaset. A 3-node ReplicaSet cluster is ready in minutes. Sharded clusters use topology: sharding. All Day-2 operations (scaling, backup, upgrade, TLS) are managed via OpsRequest CRDs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best MongoDB Operator for Kubernetes in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks MongoDB Operator is a production-ready open-source option for running MongoDB on Kubernetes. It supports MongoDB 6.0, 7.0, and 8.0 with two topologies: ReplicaSet (3-node replica set with automatic majority-vote failover in under 30 seconds) and Sharding (distributed shard replica sets with mongos routers). Key capabilities include PITR via continuous oplog streaming, physical backup taken on a secondary with no primary impact, TLS encryption, and Day-2 operations — scaling, upgrades, parameter management — via OpsRequest CRDs. As a unified operator for 35+ database engines, KubeBlocks is a strong choice for teams running MongoDB alongside PostgreSQL, MySQL, Redis, or other databases on Kubernetes.',
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
      <MongoDBOperatorPage />
      <Footer />
    </>
  );
}
