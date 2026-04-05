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
    '| etcd | Cache / KV | — |',
    `| Kafka | Message Queue | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-kafka')} |`,
    `| Pulsar | Message Queue | ${toAbsoluteUrl('/docs/release-0_9/kubeblocks-for-pulsar')} |`,
    `| RabbitMQ | Message Queue | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-rabbitmq')} |`,
    '| RocketMQ | Message Queue | — |',
    `| Elasticsearch | Search | ${toAbsoluteUrl('/docs/preview/kubeblocks-for-elasticsearch')} |`,
    '| OpenSearch | Search | — |',
    '| ClickHouse | OLAP | — |',
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
    '| ZooKeeper | Coordination | — |',
    '| MinIO | Object Storage | — |',
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
