import Footer from '@/components/Footer';
import { getStaticParams } from '@/locales/server';
import { toAbsoluteUrl } from '@/utils/site';
import type { Metadata } from 'next';
import RabbitMQOperatorPage from './RabbitMQOperatorPage';

export async function generateStaticParams() {
  return getStaticParams();
}

const DESCRIPTION =
  'KubeBlocks RabbitMQ Operator for Kubernetes — deploy production-grade RabbitMQ clusters with quorum queues, automatic leader re-election, horizontal scaling, and full Day-2 operations via a single open-source operator.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Production-Grade RabbitMQ Operator for Kubernetes | KubeBlocks',
    description: DESCRIPTION,
    keywords: [
      'RabbitMQ Operator',
      'RabbitMQ Kubernetes',
      'RabbitMQ on Kubernetes',
      'KubeBlocks RabbitMQ',
      'RabbitMQ cluster Kubernetes',
      'RabbitMQ HA Kubernetes',
      'RabbitMQ quorum queues Kubernetes',
      'RabbitMQ backup restore Kubernetes',
      'RabbitMQ horizontal scaling',
      'AMQP broker Kubernetes',
      'message broker Kubernetes',
      'open source RabbitMQ operator',
      'RabbitMQ Day-2 operations',
      'RabbitMQ Cluster Operator alternative',
      'best RabbitMQ operator Kubernetes 2026',
      'RabbitMQ k8s',
      'RabbitMQ k8s operator',
      'run RabbitMQ on k8s',
      'k8s RabbitMQ operator',
    ],
    alternates: { canonical: '/rabbitmq-operator' },
    openGraph: {
      url: '/rabbitmq-operator',
      type: 'website',
      title: 'The Production-Grade RabbitMQ Operator for Kubernetes | KubeBlocks',
      description: DESCRIPTION,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks RabbitMQ Operator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Production-Grade RabbitMQ Operator for Kubernetes | KubeBlocks',
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
      name: 'KubeBlocks RabbitMQ Operator',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Message Broker',
      operatingSystem: 'Kubernetes',
      description: DESCRIPTION,
      url: toAbsoluteUrl('/rabbitmq-operator'),
      sameAs: ['https://github.com/apecloud/kubeblocks-addons/tree/main/addons/rabbitmq'],
      downloadUrl: 'https://github.com/apecloud/kubeblocks',
      license: 'https://github.com/apecloud/kubeblocks/blob/main/LICENSE',
      author: { '@type': 'Organization', name: 'ApeCloud', url: 'https://kubeblocks.io' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Open source, free to use' },
      featureList: [
        'Quorum queues with Raft replication for durable, replicated message delivery',
        'Automatic quorum queue leader re-election on node failure (< 30s RTO)',
        '9 supported versions: 3.8 through 4.2',
        'Horizontal scaling (add/remove replicas while maintaining quorum)',
        'Vertical scaling (CPU and memory) via OpsRequest',
        'PVC volume expansion without pod restarts',
        'Dynamic parameter reconfiguration via OpsRequest (rolling pod restart)',
        'Rolling version upgrades across supported RabbitMQ versions (e.g. 3.13 → 4.0)',
        'Credential management via Kubernetes Secrets',
        'Prometheus metrics on port 15692 per node',
        'Stop/start cluster lifecycle management',
        'Expose via LoadBalancer for external client access',
        'Kubernetes CRD-based declarative cluster management',
      ],
      softwareRequirements: 'Kubernetes 1.21+',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I deploy RabbitMQ on Kubernetes using KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install KubeBlocks via Helm, then install the RabbitMQ addon: "helm upgrade -i kb-addon-rabbitmq kubeblocks/rabbitmq -n kb-system". Create a RabbitMQ cluster by applying a Cluster resource with componentDef: rabbitmq, your desired replica count (3 for a minimum production quorum), and serviceVersion. KubeBlocks provisions pods, services, and PVCs automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What RabbitMQ versions does KubeBlocks support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks supports RabbitMQ 3.8.34, 3.9.29, 3.10.25, 3.11.28, 3.12.14, 3.13.7, 4.0.9, 4.1.6, and 4.2.1. Rolling version upgrades between supported versions are available via OpsRequest.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does KubeBlocks handle RabbitMQ high availability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KubeBlocks deploys RabbitMQ as a 3- or 5-node HA cluster using Erlang distributed clustering with Kubernetes peer discovery. Quorum queues use the Raft consensus protocol to replicate messages across a majority of nodes — when a queue leader fails, the remaining members elect a new leader automatically within seconds. A 3-node cluster tolerates 1 failure; a 5-node cluster tolerates 2.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I scale my RabbitMQ cluster horizontally with KubeBlocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks supports horizontal scaling of RabbitMQ clusters via OpsRequest. You can safely add or remove replicas — KubeBlocks joins new pods to the cluster and redistributes quorum queue membership while maintaining availability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does KubeBlocks RabbitMQ Operator support TLS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TLS via the KubeBlocks TLS mechanism is not yet supported in the open-source RabbitMQ addon — the current ComponentDefinition does not declare a TLS spec. You can configure TLS manually by customizing the RabbitMQ configuration template (rabbitmq.conf) to add ssl_listeners and certificate paths mounted as Kubernetes Secrets.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between KubeBlocks RabbitMQ Operator and the official RabbitMQ Cluster Operator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both are Kubernetes-native operators for RabbitMQ. The official RabbitMQ Cluster Operator is maintained by the RabbitMQ team, has the deepest integration with RabbitMQ internals, and is complemented by the Messaging Topology Operator for declarative exchange, queue, and binding management. KubeBlocks uses a unified Cluster/OpsRequest API that works across 35+ database engines, making it easier to operate RabbitMQ alongside databases like PostgreSQL, MySQL, or Redis with a single operator and consistent operational model. KubeBlocks adds stop/start lifecycle management, PVC volume expansion, vertical scaling, and a web management UI (Enterprise).',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the KubeBlocks RabbitMQ Operator open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KubeBlocks is open source under the AGPL-3.0 license at https://github.com/apecloud/kubeblocks. The RabbitMQ addon is available at https://github.com/apecloud/kubeblocks-addons. An Enterprise edition adds a web management UI and dedicated support.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best RabbitMQ Operator for Kubernetes in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, KubeBlocks RabbitMQ Operator is a production-ready open-source option for running RabbitMQ on Kubernetes. It supports RabbitMQ 3.8 through 4.2 (9 versions) with quorum queues (Raft replication) for durable, replicated message delivery and automatic leader re-election in under 30 seconds. Key capabilities include horizontal and vertical scaling, PVC volume expansion, dynamic parameter reconfiguration (rolling pod restart), rolling version upgrades (including 3.x → 4.x), Prometheus metrics on port 15692, and stop/start lifecycle management. As a unified operator for 35+ database engines, KubeBlocks is especially valuable for platform teams running RabbitMQ alongside PostgreSQL, MySQL, Redis, or other databases on Kubernetes.',
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
      <RabbitMQOperatorPage />
      <Footer />
    </>
  );
}
