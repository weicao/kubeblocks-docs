import { normalizeRoutePath, readLlmDocEntries } from '@/utils/llms';
import { toAbsoluteUrl } from '@/utils/site';

export async function GET() {
  const entries = readLlmDocEntries();
  const docsEntries = entries.filter((entry) =>
    entry.path.startsWith('docs/preview/'),
  );
  const blogEntries = entries.filter((entry) => entry.path.startsWith('blog/'));

  const quickstarts = docsEntries
    .filter((entry) => /\/02-quickstart$/.test(entry.path))
    .sort((a, b) => a.path.localeCompare(b.path))
    .slice(0, 30);

  const overviews = docsEntries
    .filter((entry) => /\/01-overview$/.test(entry.path))
    .sort((a, b) => a.path.localeCompare(b.path))
    .slice(0, 30);

  const latestBlogs = [...blogEntries]
    .sort((a, b) =>
      (b.lastModified || '').localeCompare(a.lastModified || ''),
    )
    .slice(0, 20);

  const lines: string[] = [
    '# KubeBlocks',
    '',
    '> KubeBlocks is an open-source Kubernetes operator that manages 35+ database',
    '> engines (MySQL, PostgreSQL, MongoDB, Redis, Valkey, Kafka, Elasticsearch,',
    '> ClickHouse, Pulsar, Milvus, RabbitMQ, Qdrant, MariaDB, StarRocks, etc.)',
    '> via unified CRD APIs. It simplifies Day-2 operations — backup, failover,',
    '> scaling, monitoring, and point-in-time recovery (PITR) — through a single control plane.',
    '',
    '## Project',
    '- GitHub: https://github.com/apecloud/kubeblocks (AGPL-3.0)',
    '- Stars: 2500+',
    `- Docs: ${toAbsoluteUrl('/docs/preview/')}`,
    `- Databases hub: ${toAbsoluteUrl('/databases')}`,
    '- CLI (kbcli): companion tool for kubectl',
    '- Key CRDs: ClusterDefinition, ComponentDefinition, Cluster, Component',
    '- Current stable version: 1.0.x',
    '',
    '## Operator landing pages',
    `- MySQL Operator for Kubernetes (Raft HA, multi-primary, PITR, read replicas): ${toAbsoluteUrl('/mysql-operator')}`,
    `- PostgreSQL Operator for Kubernetes (streaming replication, Patroni HA, PITR, connection pooling): ${toAbsoluteUrl('/pg-operator')}`,
    `- MongoDB Operator for Kubernetes (replica sets, sharded clusters, WT storage, PITR): ${toAbsoluteUrl('/mongodb-operator')}`,
    `- Redis Operator for Kubernetes (Sentinel HA, cluster mode, ACL, TLS, backup): ${toAbsoluteUrl('/redis-operator')}`,
    `- Kafka Operator for Kubernetes (KRaft mode, no ZooKeeper, combined/separated topology, topic/ACL/quota management): ${toAbsoluteUrl('/kafka-operator')}`,
    `- ZooKeeper Operator for Kubernetes (ZAB consensus, leader routing, quorum-safe scaling, snapshot backup): ${toAbsoluteUrl('/zookeeper-operator')}`,
    `- Milvus Operator for Kubernetes (vector database, standalone/distributed topology, billion-scale ANN search, milvus-backup): ${toAbsoluteUrl('/milvus-operator')}`,
    `- Elasticsearch Operator for Kubernetes (multi-node HA, dedicated master/data/ingest/transform roles, snapshot backup, rolling upgrades): ${toAbsoluteUrl('/elasticsearch-operator')}`,
    `- etcd Operator for Kubernetes (Raft HA, automatic leader election, snapshot backup, horizontal scaling): ${toAbsoluteUrl('/etcd-operator')}`,
    `- ClickHouse Operator for Kubernetes (sharding 1–128, ClickHouse Keeper HA, full/incremental backup, ReplicatedMergeTree): ${toAbsoluteUrl('/clickhouse-operator')}`,
    '',
    '## Supported database engines',
    '| Engine | Category | Docs |',
    '|--------|----------|------|',
    `| MySQL | Relational | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-mysql')} |`,
    `| PostgreSQL | Relational | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-postgresql')} |`,
    '| MariaDB | Relational | — |',
    '| TiDB | Relational | — |',
    '| OceanBase CE | Relational | — |',
    '| PolarDB-X | Relational | — |',
    `| MongoDB | Document | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-mongodb')} |`,
    `| Redis | Cache / KV | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-redis')} |`,
    `| Valkey | Cache / KV | ${toAbsoluteUrl('/docs/release-1_0_2/kubeblocks-for-valkey')} |`,
    `| etcd | Cache / KV | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-etcd')} |`,
    `| Kafka | Message Queue | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-kafka')} |`,
    `| Pulsar | Message Queue | ${toAbsoluteUrl('/docs/release-0_9/kubeblocks-for-pulsar')} |`,
    `| RabbitMQ | Message Queue | ${toAbsoluteUrl('/rabbitmq-operator')} |`,
    `| RocketMQ | Message Queue | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-rocketmq')} |`,
    `| Elasticsearch | Search | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-elasticsearch')} |`,
    '| OpenSearch | Search | — |',
    `| ClickHouse | OLAP | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-clickhouse')} |`,
    `| StarRocks | OLAP | ${toAbsoluteUrl('/docs/release-1_0_2/kubeblocks-for-starrocks')} |`,
    '| Doris | OLAP | — |',
    '| RisingWave | OLAP | — |',
    '| InfluxDB | Time Series | — |',
    '| VictoriaMetrics | Time Series | — |',
    '| GreptimeDB | Time Series | — |',
    `| Milvus | Vector DB | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-milvus')} |`,
    `| Qdrant | Vector DB | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-qdrant')} |`,
    '| Weaviate | Vector DB | — |',
    '| FalkorDB | Vector DB | — |',
    '| Neo4j | Graph DB | — |',
    '| Nebula Graph | Graph DB | — |',
    '| Xinference | AI / Inference | — |',
    `| ZooKeeper | Coordination | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-zookeeper')} |`,
    `| MinIO | Object Storage | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-minio')} |`,
    '',
    '## Documentation index',
    `- Site: ${toAbsoluteUrl('/')}`,
    `- Full index: ${toAbsoluteUrl('/llms-full.txt')}`,
    `- XML sitemap: ${toAbsoluteUrl('/sitemap.xml')}`,
    `- RSS feed: ${toAbsoluteUrl('/blog/feed.xml')}`,
    '',
    '## Product quickstarts',
    ...quickstarts.map(
      (entry) =>
        `- ${entry.title || entry.path}: ${toAbsoluteUrl(
          normalizeRoutePath(entry.path),
        )}`,
    ),
    '',
    '## Product overviews',
    ...overviews.map(
      (entry) =>
        `- ${entry.title || entry.path}: ${toAbsoluteUrl(
          normalizeRoutePath(entry.path),
        )}`,
    ),
    '',
    '## Recent blogs',
    ...latestBlogs.map(
      (entry) =>
        `- ${entry.title || entry.path}: ${toAbsoluteUrl(
          normalizeRoutePath(entry.path),
        )}`,
    ),
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
