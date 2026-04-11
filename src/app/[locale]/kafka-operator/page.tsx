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
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://opensource.org/licenses/Apache-2.0',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'KRaft mode — no ZooKeeper dependency',
        'Combined and Separated deployment topologies',
        'Declarative topic management via OpsRequest',
        'Fine-grained ACL management via OpsRequest',
        'Per-user/client quota management',
        'SASL SCRAM-SHA-256/512 authentication',
        'TLS encryption and certificate rotation',
        'Horizontal scaling (add/remove brokers)',
        'Vertical scaling',
        'Volume expansion',
        'Rolling minor version upgrades',
        'Dynamic broker configuration',
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
          name: 'Does KubeBlocks Kafka Operator support KRaft mode?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports Apache Kafka in KRaft mode for Kafka 3.x, eliminating the ZooKeeper dependency. Both Combined mode (broker and controller on the same pods) and Separated mode (dedicated controller quorum and broker pool) are available.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Kafka topologies does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports four topology variants: combined_monitor (KRaft combined mode with Prometheus exporter), combined (KRaft combined mode without exporter), separated_monitor (separate controller and broker pods with exporter), and separated (separate controller and broker pods without exporter). The default is combined_monitor.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks manage Kafka topics and ACLs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks provides dedicated OpsDefinitions for Kafka: kafka-topic (create, alter, delete topics), kafka-user-acl (grant and revoke per-user permissions), and kafka-quota (set per-user or per-client throughput quotas). These are submitted as OpsRequest CRDs — no direct kafka-topics.sh access required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Kafka versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports Kafka 3.3.2, 3.7.1, 3.8.1, and 3.9.0 in KRaft mode. Kafka 2.7.0 and 2.8.2 are also available for deployments requiring ZooKeeper-based operation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks Kafka Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is fully open source under the Apache 2.0 license at https://github.com/apecloud/kubeblocks. An Enterprise edition adds a web management UI and additional enterprise features.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks support SASL and TLS for Kafka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports SASL SCRAM-SHA-256 and SCRAM-SHA-512 for client authentication, and TLS for in-flight encryption between clients and brokers and between brokers. TLS certificates can be issued via the built-in KubeBlocks issuer or an external cert-manager issuer.',
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
