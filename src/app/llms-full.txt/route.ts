import { normalizeRoutePath, readLlmDocEntries } from '@/utils/llms';
import { toAbsoluteUrl } from '@/utils/site';

const SECTION_DESCRIPTIONS: Record<string, string> = {
  'docs/preview/user_docs': 'End-user documentation: installation, cluster management, backup, scaling, monitoring',
  'docs/preview/kubeblocks-for-apecloud-mysql': 'ApeCloud MySQL (MySQL-compatible with Raft-based HA) guides',
  'docs/preview/kubeblocks-for-postgresql': 'PostgreSQL cluster management, HA, extensions',
  'docs/preview/kubeblocks-for-mongodb': 'MongoDB sharded/replica-set cluster management',
  'docs/preview/kubeblocks-for-redis': 'Redis cluster, Sentinel, network modes',
  'docs/preview/kubeblocks-for-kafka': 'Kafka broker/controller cluster management',
  'docs/preview/kubeblocks-for-pulsar': 'Apache Pulsar cluster management',
  'docs/preview/kubeblocks-for-milvus': 'Milvus vector database management',
  'docs/preview/kubeblocks-for-qdrant': 'Qdrant vector database management',
  'docs/preview/kubeblocks-for-weaviate': 'Weaviate vector database management',
  'docs/preview/kubeblocks-for-elasticsearch': 'Elasticsearch cluster management',
  'docs/preview/kubeblocks-for-clickhouse': 'ClickHouse OLAP cluster management',
  'docs/preview/kubeblocks-for-starrocks': 'StarRocks MPP database management',
  'docs/preview/kubeblocks-for-doris': 'Apache Doris MPP database management',
  'docs/preview/kubeblocks-for-flink': 'Apache Flink stream processing management',
  'docs/preview/kubeblocks-for-rabbitmq': 'RabbitMQ message broker management',
  'docs/preview/kubeblocks-for-etcd': 'etcd key-value store management',
  'docs/preview/kubeblocks-for-zookeeper': 'Apache ZooKeeper management',
  'docs/preview/kubeblocks-for-minio': 'MinIO object storage management',
  'docs/preview/developer_docs': 'Developer docs: CRD reference, addon development, API',
};

function getSectionDescription(entryPath: string): string | undefined {
  for (const [prefix, desc] of Object.entries(SECTION_DESCRIPTIONS)) {
    if (entryPath.startsWith(prefix)) return desc;
  }
  return undefined;
}

export async function GET() {
  const entries = readLlmDocEntries().sort((a, b) =>
    a.path.localeCompare(b.path),
  );

  // Group entries by top-level section (first 3 path segments)
  const sections = new Map<string, typeof entries>();
  for (const entry of entries) {
    const parts = entry.path.split('/');
    const sectionKey = parts.slice(0, 3).join('/');
    if (!sections.has(sectionKey)) sections.set(sectionKey, []);
    sections.get(sectionKey)!.push(entry);
  }

  const lines: string[] = [
    '# KubeBlocks — Full Documentation Index',
    '',
    '> KubeBlocks is an open-source Kubernetes operator managing 35+ database engines',
    '> via unified CRD APIs. This file lists every indexed page for LLM retrieval.',
    '',
    `- Site: ${toAbsoluteUrl('/')}`,
    `- Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`,
    `- Summary index: ${toAbsoluteUrl('/llms.txt')}`,
    `- Raw index JSON: ${toAbsoluteUrl('/docs-index.json')}`,
    '',
  ];

  let lastSection = '';
  for (const [sectionKey, sectionEntries] of sections) {
    if (sectionKey !== lastSection) {
      lastSection = sectionKey;
      const desc = getSectionDescription(sectionKey);
      lines.push(`## ${sectionKey}${desc ? ` — ${desc}` : ''}`);
    }
    for (const entry of sectionEntries) {
      const title = entry.title || entry.path;
      const url = toAbsoluteUrl(normalizeRoutePath(entry.path));
      const desc = entry.description ? ` — ${entry.description}` : '';
      lines.push(`- ${title}${desc}: ${url}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
