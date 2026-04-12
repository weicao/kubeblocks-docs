import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import type { Metadata } from 'next';
import KafkaOperatorPage from './KafkaOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks Kafka Operator for Kubernetes — deploy production-grade Apache Kafka with KRaft mode, declarative topic and ACL management, SASL/TLS security, horizontal scaling, and unified Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade Apache Kafka Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'Kafka Operator',
      'Kafka Kubernetes',
      'Apache Kafka on Kubernetes',
      'KubeBlocks Kafka',
      'KRaft mode Kubernetes',
      'Kafka KRaft operator',
      'Kafka without ZooKeeper',
      'Kafka cluster Kubernetes',
      'Kafka SASL TLS Kubernetes',
      'Kafka horizontal scaling',
      'Kafka topic management Kubernetes',
      'Strimzi alternative',
      'open source Kafka operator',
      'Kafka Day-2 operations',
      'best Kafka operator Kubernetes 2026',
    ],
    alternates: { canonical: '/kafka-operator' },
    openGraph: {
      url: '/kafka-operator',
      type: 'website',
      title: 'The Production-Grade Apache Kafka Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks Kafka Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade Apache Kafka Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks Kafka Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Message Streaming Platform',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: 'https://kubeblocks.io/kafka-operator',
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/kafka'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'KRaft mode — no ZooKeeper dependency for Kafka 3.x',
        'Combined topology: broker and controller co-located on same pods',
        'Separated topology: dedicated controller quorum and independent broker pool',
        'Declarative topic management via OpsRequest (create, alter, delete)',
        'Fine-grained ACL management via OpsRequest (grant, revoke per-user permissions)',
        'Per-user and per-client throughput quota management',
        'SASL SCRAM-SHA-256 and SCRAM-SHA-512 authentication',
        'TLS encryption for client-broker and broker-broker traffic',
        'Horizontal scaling — add or remove brokers without topic reconfiguration',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion for broker log storage',
        'Rolling minor version upgrades',
        'Dynamic broker configuration without full restarts',
        'Prometheus metrics via JMX exporter',
        'Declarative cluster management via Kubernetes CRDs',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy Apache Kafka on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the Kafka addon: "helm upgrade -i kb-addon-kafka kubeblocks/kafka -n kb-system". Create a cluster by applying a Cluster resource — choose topology combined_monitor for KRaft combined mode with Prometheus, or separated_monitor for dedicated controller and broker pods. KubeBlocks provisions all required pods, services, and PVCs automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks Kafka Operator support KRaft mode (no ZooKeeper)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports Apache Kafka in KRaft mode for Kafka 3.x, eliminating the ZooKeeper dependency entirely. Both Combined mode (broker and controller on the same pods) and Separated mode (dedicated controller quorum and independent broker pool) are available as named topologies.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Combined and Separated Kafka topology in KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Combined topology runs Kafka broker and KRaft controller roles on the same pods — simpler to operate and suitable for most workloads. Separated topology runs a dedicated controller quorum (3 pods) and a separate broker pool — recommended when you need to scale brokers independently without touching the controller quorum, or when controller and broker resource profiles differ significantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks manage Kafka topics and ACLs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks provides dedicated OpsDefinitions for Kafka: kafka-topic (create, alter, delete topics), kafka-user-acl (grant and revoke per-user permissions), and kafka-quota (set per-user or per-client throughput quotas). These are submitted as OpsRequest CRDs — no direct kafka-topics.sh shell access required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Kafka versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Kafka 3.3.2, 3.7.1, 3.8.1, and 3.9.0 in KRaft mode. Kafka 2.7.0 and 2.8.2 are also available for deployments requiring ZooKeeper-based operation. Rolling minor version upgrades between supported versions are supported.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support SASL and TLS security for Kafka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports SASL SCRAM-SHA-256 and SCRAM-SHA-512 for client authentication, and TLS for in-flight encryption between clients and brokers and between brokers. TLS certificates can be issued via the built-in KubeBlocks issuer or an external cert-manager issuer.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks Kafka Operator and Strimzi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for Apache Kafka. Strimzi is a CNCF graduated project with broad community adoption, deep Kafka ecosystem support (Kafka Connect, MirrorMaker, Kafka Bridge), and extensive configuration flexibility. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, so teams running multiple databases benefit from a single operator and consistent operational model. KubeBlocks supports KRaft mode (no ZooKeeper dependency), topic and ACL management via OpsRequest, backup/restore, and a web management UI (Enterprise). Strimzi is the better choice for teams needing deep Kafka ecosystem integration; KubeBlocks is better for multi-engine environments.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks Kafka Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The Kafka addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best Apache Kafka Operator for Kubernetes in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks Kafka Operator is a production-ready open-source option for running Apache Kafka on Kubernetes. It supports Kafka 3.3 through 3.9 in KRaft mode (no ZooKeeper dependency) with two topologies: Combined (broker and controller on the same pods) and Separated (dedicated controller quorum and independent broker pool). Key capabilities include declarative topic and ACL management via OpsRequest, SASL SCRAM-SHA-256/512 authentication, TLS encryption, horizontal broker scaling, Prometheus metrics via JMX exporter, and rolling version upgrades. As a unified operator for 35+ database engines, KubeBlocks is especially valuable for data platform teams running Kafka alongside databases like PostgreSQL, MySQL, or ClickHouse.',
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
      <KafkaOperatorPage />
      <Footer />
    </>
  );
}
