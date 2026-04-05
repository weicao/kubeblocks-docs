import { getStaticParams } from '@/locales/server';
import { toAbsoluteUrl } from '@/utils/site';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import { Link } from '@/components/Link';

export async function generateStaticParams() {
  return getStaticParams();
}

const PAGE_TITLE = 'Supported Databases — KubeBlocks';
const PAGE_DESCRIPTION =
  'KubeBlocks supports 35+ database engines on Kubernetes, including MySQL, PostgreSQL, MongoDB, Redis, Kafka, Elasticsearch, ClickHouse, and more. Manage all your databases with a single operator.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/databases' },
  openGraph: {
    url: '/databases',
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/logo.png'],
  },
};

type Engine = {
  name: string;
  category: string;
  description: string;
  docsHref?: string;
  addonsHref?: string;
};

const ENGINES: Engine[] = [
  // Relational
  {
    name: 'MySQL',
    category: 'Relational',
    description: 'ApeCloud MySQL is a branch of MySQL with optimized Raft-based high availability, supporting multi-primary and read replicas topologies.',
    docsHref: '/docs/preview/kubeblocks-for-mysql',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/apecloud-mysql',
  },
  {
    name: 'PostgreSQL',
    category: 'Relational',
    description: 'Run PostgreSQL clusters with streaming replication, automatic failover, connection pooling, and point-in-time recovery on Kubernetes.',
    docsHref: '/docs/preview/kubeblocks-for-postgresql',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/postgresql',
  },
  {
    name: 'MariaDB',
    category: 'Relational',
    description: 'Deploy MariaDB clusters with replication, automated failover, and backup support on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/mariadb',
  },
  {
    name: 'TiDB',
    category: 'Relational',
    description: 'Manage TiDB distributed SQL clusters with TiKV storage and TiFlash for HTAP workloads on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/tidb',
  },
  {
    name: 'OceanBase CE',
    category: 'Relational',
    description: 'Run OceanBase Community Edition distributed relational database clusters with multi-replica HA on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/oceanbase-ce',
  },
  {
    name: 'PolarDB-X',
    category: 'Relational',
    description: 'Deploy PolarDB-X distributed MySQL-compatible database with horizontal sharding and strong consistency.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/polardbx',
  },
  {
    name: 'Neon',
    category: 'Relational',
    description: 'Run Neon serverless PostgreSQL with storage-compute separation and branching support on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/neon',
  },
  {
    name: 'OrioleDB',
    category: 'Relational',
    description: 'Deploy OrioleDB, a next-generation PostgreSQL storage engine with improved concurrency and scalability.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/orioledb',
  },
  {
    name: 'MogDB',
    category: 'Relational',
    description: 'Manage MogDB, an enterprise-grade openGauss-compatible relational database on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/mogdb',
  },
  // Document / NoSQL
  {
    name: 'MongoDB',
    category: 'Document',
    description: 'Deploy and manage MongoDB replica sets and sharded clusters with automated failover, backups, and horizontal scaling.',
    docsHref: '/docs/preview/kubeblocks-for-mongodb',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/mongodb',
  },
  // Cache / KV
  {
    name: 'Redis',
    category: 'Cache / KV',
    description: 'Manage Redis standalone, replication, and cluster topologies with Sentinel-based HA, ACL management, and TLS support.',
    docsHref: '/docs/preview/kubeblocks-for-redis',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/redis',
  },
  {
    name: 'Valkey',
    category: 'Cache / KV',
    description: 'Valkey is an open-source Redis-compatible in-memory data store. KubeBlocks manages Valkey clusters on Kubernetes.',
    docsHref: '/docs/release-1_0_2/kubeblocks-for-valkey',
  },
  {
    name: 'etcd',
    category: 'Cache / KV',
    description: 'Run etcd clusters as a reliable distributed key-value store for Kubernetes and cloud-native applications.',
    docsHref: '/docs/preview/kubeblocks-for-etcd',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/etcd',
  },
  // Message Queue / Streaming
  {
    name: 'Kafka',
    category: 'Message Queue',
    description: 'Deploy Apache Kafka clusters with KRaft mode, multi-broker topologies, and automated partition rebalancing on Kubernetes.',
    docsHref: '/docs/preview/kubeblocks-for-kafka',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/kafka',
  },
  {
    name: 'Pulsar',
    category: 'Message Queue',
    description: 'Manage Apache Pulsar clusters with BookKeeper and ZooKeeper components, enabling multi-tenant messaging on Kubernetes.',
    docsHref: '/docs/release-0_9/kubeblocks-for-pulsar',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/pulsar',
  },
  {
    name: 'RabbitMQ',
    category: 'Message Queue',
    description: 'Operate RabbitMQ clusters with quorum queues, management UI, and automated scaling on Kubernetes.',
    docsHref: '/docs/preview/kubeblocks-for-rabbitmq',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/rabbitmq',
  },
  {
    name: 'RocketMQ',
    category: 'Message Queue',
    description: 'Deploy Apache RocketMQ clusters with broker and nameserver topology for high-throughput messaging on Kubernetes.',
    docsHref: '/docs/preview/kubeblocks-for-rocketmq',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/rocketmq',
  },
  // Search
  {
    name: 'Elasticsearch',
    category: 'Search',
    description: 'Deploy Elasticsearch clusters with dedicated master, data, and ingest node roles, plus index lifecycle management.',
    docsHref: '/docs/preview/kubeblocks-for-elasticsearch',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/elasticsearch',
  },
  {
    name: 'OpenSearch',
    category: 'Search',
    description: 'Run OpenSearch clusters, the open-source fork of Elasticsearch, with multi-node topology and dashboards on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/opensearch',
  },
  // OLAP
  {
    name: 'ClickHouse',
    category: 'OLAP',
    description: 'Run ClickHouse clusters for real-time analytical queries with sharding, replication, and ZooKeeper coordination.',
    docsHref: '/docs/preview/kubeblocks-for-clickhouse',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/clickhouse',
  },
  {
    name: 'StarRocks',
    category: 'OLAP',
    description: 'Manage StarRocks analytical clusters with FE and BE separation, enabling MPP analytics on Kubernetes.',
  },
  {
    name: 'Doris',
    category: 'OLAP',
    description: 'Deploy Apache Doris clusters with FE/BE topology for interactive SQL analytics on large-scale datasets.',
  },
  {
    name: 'RisingWave',
    category: 'OLAP',
    description: 'Deploy RisingWave streaming database for real-time analytics with PostgreSQL-compatible SQL interface.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/risingwave',
  },
  // Time Series
  {
    name: 'InfluxDB',
    category: 'Time Series',
    description: 'Manage InfluxDB time series database clusters for high-throughput metrics, events, and real-time analytics.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/influxdb',
  },
  {
    name: 'VictoriaMetrics',
    category: 'Time Series',
    description: 'Deploy VictoriaMetrics as a fast and scalable Prometheus-compatible time series database on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/victoria-metrics',
  },
  {
    name: 'GreptimeDB',
    category: 'Time Series',
    description: 'Run GreptimeDB, a cloud-native time series database with SQL support and distributed architecture on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/greptimedb',
  },
  // Vector DB
  {
    name: 'Milvus',
    category: 'Vector DB',
    description: 'Deploy Milvus vector databases for AI-native similarity search, supporting standalone and distributed topologies.',
    docsHref: '/docs/preview/kubeblocks-for-milvus',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/milvus',
  },
  {
    name: 'Qdrant',
    category: 'Vector DB',
    description: 'Manage Qdrant vector search engine clusters for high-performance embedding storage and retrieval.',
    docsHref: '/docs/preview/kubeblocks-for-qdrant',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/qdrant',
  },
  {
    name: 'Weaviate',
    category: 'Vector DB',
    description: 'Run Weaviate vector databases with GraphQL API, multi-tenancy, and semantic search on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/weaviate',
  },
  {
    name: 'FalkorDB',
    category: 'Vector DB',
    description: 'Deploy FalkorDB, a graph database with vector search support, for knowledge graphs and AI applications.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/falkordb',
  },
  // Graph DB
  {
    name: 'Neo4j',
    category: 'Graph DB',
    description: 'Manage Neo4j graph database clusters for connected data, knowledge graphs, and relationship analytics.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/neo4j',
  },
  {
    name: 'Nebula Graph',
    category: 'Graph DB',
    description: 'Deploy Nebula Graph distributed graph database clusters for billion-scale graph data on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/nebula',
  },
  // AI / Inference
  {
    name: 'Xinference',
    category: 'AI / Inference',
    description: 'Run Xinference distributed LLM inference clusters for deploying open-source large language models on Kubernetes.',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/xinference',
  },
  // Coordination / Infrastructure
  {
    name: 'ZooKeeper',
    category: 'Coordination',
    description: 'Operate ZooKeeper ensembles for distributed coordination, often used alongside Kafka and ClickHouse.',
    docsHref: '/docs/preview/kubeblocks-for-zookeeper',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/zookeeper',
  },
  {
    name: 'MinIO',
    category: 'Object Storage',
    description: 'Deploy MinIO distributed object storage clusters for S3-compatible storage on Kubernetes.',
    docsHref: '/docs/preview/kubeblocks-for-minio',
    addonsHref: 'https://github.com/apecloud/kubeblocks-addons/tree/main/addons/minio',
  },
];

const CATEGORY_ORDER = [
  'Relational',
  'Document',
  'Cache / KV',
  'Message Queue',
  'Search',
  'OLAP',
  'Time Series',
  'Vector DB',
  'Graph DB',
  'AI / Inference',
  'Coordination',
  'Object Storage',
];

export default function DatabasesPage() {
  const categories = CATEGORY_ORDER.filter((cat) =>
    ENGINES.some((e) => e.category === cat),
  );

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'KubeBlocks Supported Database Engines',
    description: PAGE_DESCRIPTION,
    url: toAbsoluteUrl('/databases'),
    numberOfItems: ENGINES.length,
    itemListElement: ENGINES.filter((e) => e.docsHref || e.addonsHref).map((engine, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: engine.name,
      description: engine.description,
      url: engine.docsHref ? toAbsoluteUrl(engine.docsHref) : engine.addonsHref,
      item: {
        '@type': 'SoftwareApplication',
        name: engine.name,
        applicationCategory: 'DatabaseApplication',
        description: engine.description,
        operatingSystem: 'Kubernetes',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, '\\u003c') }}
      />
      <Container sx={{ paddingBlock: 6, minHeight: 'var(--container-min-height)' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Supported Databases
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={6} maxWidth={720}>
          KubeBlocks manages 35+ database engines on Kubernetes through a unified API and CRD interface.
          Click any engine to view its documentation or explore the add-ons on GitHub.
        </Typography>

        {categories.map((category) => (
          <Box key={category} mb={5}>
            <Typography variant="h5" gutterBottom fontWeight={600} mb={2}>
              {category}
            </Typography>
            <Grid container spacing={2}>
              {ENGINES.filter((e) => e.category === category).map((engine) => (
                <Grid key={engine.name} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    variant="outlined"
                    sx={{ height: '100%', boxShadow: 'none' }}
                  >
                    {(engine.docsHref || engine.addonsHref) ? (
                      <CardActionArea
                        component={Link}
                        href={engine.docsHref ?? engine.addonsHref!}
                        {...(!engine.docsHref ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        sx={{ height: '100%', alignItems: 'flex-start', display: 'flex' }}
                        underline="none"
                      >
                        <CardContent sx={{ width: '100%' }}>
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Typography variant="h6" fontWeight={600}>
                              {engine.name}
                            </Typography>
                            {engine.docsHref ? (
                              <Chip label="Docs" size="small" color="primary" variant="outlined" />
                            ) : (
                              <Chip label="Add-on" size="small" variant="outlined" />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {engine.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    ) : (
                      <CardContent sx={{ width: '100%' }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Typography variant="h6" fontWeight={600}>
                            {engine.name}
                          </Typography>
                          <Chip label="Coming soon" size="small" variant="outlined" color="default" />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {engine.description}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Box mt={4}>
          <Typography variant="body2" color="text.secondary">
            Looking for more?{' '}
            <Link href="https://github.com/apecloud/kubeblocks-addons" target="_blank" rel="noopener noreferrer">
              Browse all add-ons on GitHub
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </>
  );
}
