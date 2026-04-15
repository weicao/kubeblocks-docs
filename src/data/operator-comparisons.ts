/**
 * Operator comparison data — source of truth for competitor feature matrices.
 *
 * This file is NOT rendered on any page. It exists so that:
 *   1. You can update competitor support levels here as the ecosystem evolves.
 *   2. After updating, revise the corresponding FAQ answer in each operator's page.tsx
 *      (search for "What is the difference between KubeBlocks").
 *
 * Support values:
 *   YES  — fully supported
 *   PART — partial / limited support
 *   NO   — not supported
 *   ENT  — available in KubeBlocks Enterprise edition only
 */

export type Support = 'YES' | 'NO' | 'PART' | 'ENT';

export interface ComparisonRow {
  feature: string;
  kb: Support;
  [competitorKey: string]: Support | string;
}

export interface Competitor {
  key: string;
  label: string;
  url?: string;
}

export interface OperatorComparison {
  engine: string;
  slug: string;
  competitors: Competitor[];
  rows: ComparisonRow[];
  notes?: string[];
  /** Last verified against competitor documentation */
  lastVerified?: string;
}

// ---------------------------------------------------------------------------
// MySQL
// ---------------------------------------------------------------------------
export const mysqlComparison: OperatorComparison = {
  engine: 'MySQL',
  slug: 'mysql',
  lastVerified: '2026-04',
  competitors: [
    { key: 'oracle',  label: 'Oracle MySQL Operator', url: 'https://github.com/mysql/mysql-operator' },
    { key: 'percona', label: 'Percona Operator for MySQL', url: 'https://github.com/percona/percona-server-mysql-operator' },
    { key: 'bitpoke', label: 'Bitpoke MySQL Operator', url: 'https://github.com/bitpoke/mysql-operator' },
  ],
  rows: [
    { feature: 'Open Source',                      kb: 'YES',  oracle: 'YES',  percona: 'YES',  bitpoke: 'YES'  },
    { feature: 'SemiSync Replication',              kb: 'YES',  oracle: 'PART', percona: 'PART', bitpoke: 'YES'  },
    { feature: 'Group Replication (MGR)',            kb: 'YES',  oracle: 'YES',  percona: 'PART', bitpoke: 'NO'   },
    { feature: 'Orchestrator HA Integration',       kb: 'YES',  oracle: 'NO',   percona: 'NO',   bitpoke: 'NO'   },
    { feature: 'Standby cluster (cross-k8s DR)',    kb: 'ENT',  oracle: 'NO',   percona: 'NO',   bitpoke: 'NO'   },
    { feature: 'ProxySQL Integration',              kb: 'YES',  oracle: 'NO',   percona: 'YES',  bitpoke: 'YES'  },
    { feature: 'Read/write split',                  kb: 'YES',  oracle: 'YES',  percona: 'YES',  bitpoke: 'YES'  },
    { feature: 'PITR (binlog streaming)',            kb: 'YES',  oracle: 'PART', percona: 'YES',  bitpoke: 'PART' },
    { feature: 'Bootstrap from external MySQL',     kb: 'ENT',  oracle: 'NO',   percona: 'NO',   bitpoke: 'NO'   },
    { feature: 'Horizontal scaling',                kb: 'YES',  oracle: 'PART', percona: 'PART', bitpoke: 'PART' },
    { feature: 'Minor version upgrade',             kb: 'YES',  oracle: 'YES',  percona: 'YES',  bitpoke: 'PART' },
    { feature: 'Major version upgrade',             kb: 'ENT',  oracle: 'PART', percona: 'PART', bitpoke: 'NO'   },
    { feature: 'Dynamic config (no restart)',       kb: 'YES',  oracle: 'PART', percona: 'PART', bitpoke: 'PART' },
    { feature: 'TLS in-place rotation',             kb: 'YES',  oracle: 'PART', percona: 'PART', bitpoke: 'PART' },
    { feature: 'User / privilege management',       kb: 'ENT',  oracle: 'PART', percona: 'YES',  bitpoke: 'PART' },
    { feature: 'Prometheus metrics',                kb: 'YES',  oracle: 'YES',  percona: 'YES',  bitpoke: 'YES'  },
    { feature: 'Web management UI',                 kb: 'ENT',  oracle: 'NO',   percona: 'YES',  bitpoke: 'NO'   },
  ],
  notes: [
    'ENT (Major upgrade): Via blue-green deployment in KubeBlocks Enterprise.',
  ],
};

// ---------------------------------------------------------------------------
// PostgreSQL
// ---------------------------------------------------------------------------
export const postgresqlComparison: OperatorComparison = {
  engine: 'PostgreSQL',
  slug: 'postgresql',
  lastVerified: '2026-04',
  competitors: [
    { key: 'cnpg',    label: 'CloudNativePG', url: 'https://cloudnative-pg.io' },
    { key: 'zalando', label: 'Zalando Postgres Operator', url: 'https://github.com/zalando/postgres-operator' },
    { key: 'crunchy', label: 'CrunchyData PGO', url: 'https://github.com/CrunchyData/postgres-operator' },
  ],
  rows: [
    { feature: 'Open Source',                    kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Patroni-based HA',               kb: 'YES',  cnpg: 'NO',   zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Standby cluster (cross-k8s DR)', kb: 'ENT',  cnpg: 'YES',  zalando: 'PART', crunchy: 'YES'  },
    { feature: 'Built-in connection pooler',     kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'PITR (WAL streaming)',           kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Horizontal scaling',             kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Minor version upgrade',          kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Major version upgrade',          kb: 'ENT',  cnpg: 'NO',   zalando: 'PART', crunchy: 'YES'  },
    { feature: 'TLS in-place rotation',          kb: 'YES',  cnpg: 'YES',  zalando: 'PART', crunchy: 'YES'  },
    { feature: 'Prometheus metrics',             kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'DB / role management',           kb: 'ENT',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'Logical replication management', kb: 'PART', cnpg: 'YES',  zalando: 'PART', crunchy: 'PART' },
    { feature: 'Bootstrap from external PG',     kb: 'ENT',  cnpg: 'YES',  zalando: 'PART', crunchy: 'PART' },
    { feature: 'Web management UI',              kb: 'ENT',  cnpg: 'NO',   zalando: 'YES',  crunchy: 'YES'  },
    { feature: 'pgvector / PostGIS support',     kb: 'YES',  cnpg: 'YES',  zalando: 'YES',  crunchy: 'YES'  },
  ],
  notes: [
    'CloudNativePG uses its own HA controller, not Patroni.',
    'CrunchyData PGO major upgrade: via pg_upgrade.',
    'ENT (Major upgrade): Via blue-green deployment in KubeBlocks Enterprise.',
    'pgvector/PostGIS: All operators support via pre-installed or custom image approach.',
  ],
};

// ---------------------------------------------------------------------------
// Redis
// ---------------------------------------------------------------------------
export const redisComparison: OperatorComparison = {
  engine: 'Redis',
  slug: 'redis',
  lastVerified: '2026-04',
  competitors: [
    { key: 'spotahome', label: 'Spotahome Operator (archived)', url: 'https://github.com/spotahome/redis-operator' },
    { key: 'opstree',   label: 'Opstree Redis Operator', url: 'https://github.com/OT-CONTAINER-KIT/redis-operator' },
    { key: 'enterprise', label: 'Redis Enterprise', url: 'https://redis.io/docs/latest/operate/kubernetes' },
  ],
  rows: [
    { feature: 'Open Source',                     kb: 'YES',  spotahome: 'YES',  opstree: 'YES',  enterprise: 'NO'   },
    { feature: 'Sentinel-based HA',               kb: 'YES',  spotahome: 'YES',  opstree: 'YES',  enterprise: 'NO'   },
    { feature: 'Redis Cluster (sharding)',         kb: 'YES',  spotahome: 'NO',   opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'TLS encryption',                  kb: 'YES',  spotahome: 'NO',   opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'TLS in-place rotation',           kb: 'YES',  spotahome: 'NO',   opstree: 'PART', enterprise: 'YES'  },
    { feature: 'ACL management',                  kb: 'YES',  spotahome: 'NO',   opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Backup (RDB snapshot)',            kb: 'YES',  spotahome: 'NO',   opstree: 'PART', enterprise: 'YES'  },
    { feature: 'Scheduled backup',                kb: 'YES',  spotahome: 'NO',   opstree: 'NO',   enterprise: 'YES'  },
    { feature: 'Restore from backup',             kb: 'YES',  spotahome: 'NO',   opstree: 'PART', enterprise: 'YES'  },
    { feature: 'Horizontal scaling',              kb: 'YES',  spotahome: 'YES',  opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Vertical scaling',                kb: 'YES',  spotahome: 'YES',  opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Volume expansion',                kb: 'YES',  spotahome: 'NO',   opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Dynamic config',                  kb: 'YES',  spotahome: 'PART', opstree: 'PART', enterprise: 'YES'  },
    { feature: 'Planned switchover',              kb: 'YES',  spotahome: 'NO',   opstree: 'NO',   enterprise: 'PART' },
    { feature: 'Minor version upgrade',           kb: 'YES',  spotahome: 'PART', opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Major version upgrade',           kb: 'YES',  spotahome: 'NO',   opstree: 'PART', enterprise: 'YES'  },
    { feature: 'Standby cluster (cross-k8s DR)',  kb: 'ENT',  spotahome: 'NO',   opstree: 'NO',   enterprise: 'YES'  },
    { feature: 'Bootstrap from external Redis',   kb: 'ENT',  spotahome: 'YES',  opstree: 'NO',   enterprise: 'PART' },
    { feature: 'Prometheus metrics',              kb: 'YES',  spotahome: 'YES',  opstree: 'YES',  enterprise: 'YES'  },
    { feature: 'Web management UI',               kb: 'ENT',  spotahome: 'NO',   opstree: 'NO',   enterprise: 'YES'  },
  ],
  notes: [
    'Spotahome Operator is no longer actively maintained.',
  ],
};

// ---------------------------------------------------------------------------
// MongoDB
// ---------------------------------------------------------------------------
export const mongodbComparison: OperatorComparison = {
  engine: 'MongoDB',
  slug: 'mongodb',
  lastVerified: '2026-04',
  competitors: [
    { key: 'percona',   label: 'Percona Operator for MongoDB', url: 'https://github.com/percona/percona-server-mongodb-operator' },
    { key: 'community', label: 'MongoDB Community Operator', url: 'https://github.com/mongodb/mongodb-kubernetes-operator' },
  ],
  rows: [
    { feature: 'Open Source',                      kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'ReplicaSet HA',                    kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'Sharding',                         kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'TLS encryption',                   kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'TLS rotation',                     kb: 'YES',  percona: 'YES',  community: 'PART' },
    { feature: 'Backup (physical)',                kb: 'YES',  percona: 'YES',  community: 'NO'   },
    { feature: 'Scheduled backup',                 kb: 'YES',  percona: 'YES',  community: 'NO'   },
    { feature: 'Restore from backup',              kb: 'YES',  percona: 'YES',  community: 'NO'   },
    { feature: 'PITR (oplog streaming)',           kb: 'YES',  percona: 'YES',  community: 'NO'   },
    { feature: 'Horizontal scaling',               kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'Vertical scaling',                 kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'Volume expansion',                 kb: 'YES',  percona: 'YES',  community: 'YES'  },
    { feature: 'Dynamic config',                   kb: 'YES',  percona: 'YES',  community: 'PART' },
    { feature: 'Prometheus metrics',               kb: 'YES',  percona: 'YES',  community: 'NO'   },
    { feature: 'Minor version upgrade',            kb: 'YES',  percona: 'YES',  community: 'PART' },
    { feature: 'Major version upgrade',            kb: 'ENT',  percona: 'PART', community: 'NO'   },
    { feature: 'Cross-cluster DR (standby)',       kb: 'ENT',  percona: 'NO',   community: 'NO'   },
    { feature: 'Bootstrap from external MongoDB',  kb: 'ENT',  percona: 'NO',   community: 'NO'   },
    { feature: 'User & role management',           kb: 'ENT',  percona: 'YES',  community: 'YES'  },
    { feature: 'Web management UI',                kb: 'ENT',  percona: 'NO',   community: 'NO'   },
  ],
  notes: [
    'ENT (Major upgrade): Via blue-green deployment in KubeBlocks Enterprise.',
  ],
};

// ---------------------------------------------------------------------------
// ClickHouse
// ---------------------------------------------------------------------------
export const clickhouseComparison: OperatorComparison = {
  engine: 'ClickHouse',
  slug: 'clickhouse',
  lastVerified: '2026-04',
  competitors: [
    { key: 'altinity', label: 'Altinity Operator for ClickHouse', url: 'https://github.com/Altinity/clickhouse-operator' },
    { key: 'bitnami',  label: 'Bitnami Helm Chart', url: 'https://github.com/bitnami/charts/tree/main/bitnami/clickhouse' },
  ],
  rows: [
    { feature: 'Kubernetes-native CRD API',          kb: 'YES',  altinity: 'YES',  bitnami: 'NO'   },
    { feature: 'Standalone topology',                 kb: 'YES',  altinity: 'YES',  bitnami: 'PART' },
    { feature: 'Cluster + ClickHouse Keeper HA',      kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'Multi-shard deployment (1–128)',       kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'Horizontal shard scaling',             kb: 'YES',  altinity: 'YES',  bitnami: 'PART' },
    { feature: 'Replica scaling within shard',         kb: 'YES',  altinity: 'YES',  bitnami: 'PART' },
    { feature: 'Vertical scaling (CPU/memory)',        kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'PVC volume expansion',                 kb: 'YES',  altinity: 'PART', bitnami: 'NO'   },
    { feature: 'Full backup & restore',                kb: 'YES',  altinity: 'PART', bitnami: 'NO'   },
    { feature: 'Incremental backup',                   kb: 'YES',  altinity: 'PART', bitnami: 'NO'   },
    { feature: 'Dynamic parameter reconfiguration',    kb: 'YES',  altinity: 'PART', bitnami: 'NO'   },
    { feature: 'Rolling version upgrade',              kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'TLS encryption',                       kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'Prometheus metrics',                   kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'Stop / start cluster',                 kb: 'YES',  altinity: 'YES',  bitnami: 'PART' },
    { feature: 'Open Source',                          kb: 'YES',  altinity: 'YES',  bitnami: 'YES'  },
    { feature: 'Cluster management web UI',            kb: 'ENT',  altinity: 'NO',   bitnami: 'NO'   },
  ],
};

// ---------------------------------------------------------------------------
// Kafka
// ---------------------------------------------------------------------------
export const kafkaComparison: OperatorComparison = {
  engine: 'Kafka',
  slug: 'kafka',
  lastVerified: '2026-04',
  competitors: [
    { key: 'strimzi',   label: 'Strimzi', url: 'https://strimzi.io' },
    { key: 'confluent', label: 'Confluent for Kubernetes', url: 'https://docs.confluent.io/operator/current/overview.html' },
  ],
  rows: [
    { feature: 'Open Source',                   kb: 'YES',  strimzi: 'YES',  confluent: 'NO'   },
    { feature: 'KRaft Mode',                    kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'ZooKeeper Mode (legacy)',        kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Combined Mode (broker+ctrl)',    kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Separated Mode',                kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'TLS Encryption',                kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'SASL (SCRAM-SHA-256/512)',       kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Topic management',              kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'ACL management',               kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Quota management',              kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Dynamic config (no restart)',   kb: 'PART', strimzi: 'PART', confluent: 'PART' },
    { feature: 'Horizontal scaling (broker)',   kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Minor version rolling upgrade', kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Prometheus metrics',            kb: 'YES',  strimzi: 'YES',  confluent: 'YES'  },
    { feature: 'Web management UI',             kb: 'ENT',  strimzi: 'NO',   confluent: 'YES'  },
  ],
};

// ---------------------------------------------------------------------------
// Elasticsearch
// ---------------------------------------------------------------------------
export const elasticsearchComparison: OperatorComparison = {
  engine: 'Elasticsearch',
  slug: 'elasticsearch',
  lastVerified: '2026-04',
  competitors: [
    { key: 'eck',    label: 'ECK (Elastic Cloud on Kubernetes)', url: 'https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html' },
    { key: 'bitnami', label: 'Bitnami Helm Chart', url: 'https://github.com/bitnami/charts/tree/main/bitnami/elasticsearch' },
  ],
  rows: [
    { feature: 'Kubernetes-native CRD API',              kb: 'YES',  eck: 'YES',  bitnami: 'NO'   },
    { feature: 'Single-node / multi-node topologies',    kb: 'YES',  eck: 'YES',  bitnami: 'PART' },
    { feature: 'Fully separated role topology (m-d-i-t)', kb: 'YES', eck: 'YES',  bitnami: 'NO'   },
    { feature: 'Horizontal scaling (data nodes)',        kb: 'YES',  eck: 'YES',  bitnami: 'PART' },
    { feature: 'Vertical scaling (CPU/memory)',          kb: 'YES',  eck: 'YES',  bitnami: 'PART' },
    { feature: 'PVC volume expansion',                   kb: 'YES',  eck: 'PART', bitnami: 'PART' },
    { feature: 'Dynamic parameter reconfiguration',      kb: 'YES',  eck: 'PART', bitnami: 'NO'   },
    { feature: 'Rolling version upgrade',                kb: 'YES',  eck: 'YES',  bitnami: 'PART' },
    { feature: 'Snapshot backup & restore',              kb: 'YES',  eck: 'PART', bitnami: 'PART' },
    { feature: 'Prometheus metrics',                     kb: 'YES',  eck: 'YES',  bitnami: 'YES'  },
    { feature: 'Kibana integration',                     kb: 'YES',  eck: 'YES',  bitnami: 'PART' },
    { feature: 'Stop / start cluster',                   kb: 'YES',  eck: 'NO',   bitnami: 'NO'   },
    { feature: 'Open Source',                            kb: 'YES',  eck: 'PART', bitnami: 'YES'  },
    { feature: 'Cluster management web UI',              kb: 'ENT',  eck: 'PART', bitnami: 'NO'   },
  ],
  notes: [
    'ECK is licensed under the Elastic License 2.0, which is not OSI open source. Advanced features require an Elastic subscription.',
    'KubeBlocks is fully open source under AGPL-3.0.',
  ],
};

// ---------------------------------------------------------------------------
// etcd
// ---------------------------------------------------------------------------
export const etcdComparison: OperatorComparison = {
  engine: 'etcd',
  slug: 'etcd',
  lastVerified: '2026-04',
  competitors: [
    { key: 'bitnami',   label: 'Bitnami Helm Chart', url: 'https://github.com/bitnami/charts/tree/main/bitnami/etcd' },
    { key: 'community', label: 'etcd-operator (community)', url: 'https://github.com/etcd-io/etcd' },
  ],
  rows: [
    { feature: 'Kubernetes-native CRD API',        kb: 'YES',  bitnami: 'NO',   community: 'YES'  },
    { feature: 'Raft HA (3 / 5-node)',              kb: 'YES',  bitnami: 'YES',  community: 'YES'  },
    { feature: 'TLS encryption (peer & client)',   kb: 'YES',  bitnami: 'YES',  community: 'PART' },
    { feature: 'Leader switchover (Switchover)',    kb: 'YES',  bitnami: 'NO',   community: 'PART' },
    { feature: 'Horizontal scaling',                kb: 'YES',  bitnami: 'YES',  community: 'YES'  },
    { feature: 'Vertical scaling (CPU/memory)',     kb: 'YES',  bitnami: 'YES',  community: 'NO'   },
    { feature: 'PVC volume expansion',              kb: 'YES',  bitnami: 'NO',   community: 'NO'   },
    { feature: 'Parameter reconfiguration',         kb: 'YES',  bitnami: 'YES',  community: 'NO'   },
    { feature: 'Rolling version upgrade',           kb: 'YES',  bitnami: 'YES',  community: 'NO'   },
    { feature: 'Snapshot backup & restore',         kb: 'YES',  bitnami: 'PART', community: 'PART' },
    { feature: 'Prometheus metrics',                kb: 'YES',  bitnami: 'YES',  community: 'YES'  },
    { feature: 'Stop / start cluster',              kb: 'YES',  bitnami: 'NO',   community: 'NO'   },
    { feature: 'Open Source',                       kb: 'YES',  bitnami: 'YES',  community: 'YES'  },
    { feature: 'Cluster management web UI',         kb: 'ENT',  bitnami: 'NO',   community: 'NO'   },
  ],
};

// ---------------------------------------------------------------------------
// ZooKeeper
// ---------------------------------------------------------------------------
export const zookeeperComparison: OperatorComparison = {
  engine: 'ZooKeeper',
  slug: 'zookeeper',
  lastVerified: '2026-04',
  competitors: [
    { key: 'bitnami', label: 'Bitnami Helm Chart', url: 'https://github.com/bitnami/charts/tree/main/bitnami/zookeeper' },
    { key: 'pravega', label: 'Pravega ZooKeeper Operator', url: 'https://github.com/pravega/zookeeper-operator' },
  ],
  rows: [
    { feature: 'Kubernetes-native CRD API',          kb: 'YES',  bitnami: 'NO',   pravega: 'YES'  },
    { feature: 'Automatic leader failover detection', kb: 'YES',  bitnami: 'PART', pravega: 'YES'  },
    { feature: 'Quorum-safe horizontal scaling',      kb: 'YES',  bitnami: 'NO',   pravega: 'YES'  },
    { feature: 'Vertical scaling (CPU/memory)',        kb: 'YES',  bitnami: 'NO',   pravega: 'PART' },
    { feature: 'PVC volume expansion',                 kb: 'YES',  bitnami: 'NO',   pravega: 'NO'   },
    { feature: 'Role-aware service routing',           kb: 'YES',  bitnami: 'PART', pravega: 'PART' },
    { feature: 'Dynamic parameter reconfiguration',    kb: 'YES',  bitnami: 'NO',   pravega: 'NO'   },
    { feature: 'Minor version upgrade (rolling)',      kb: 'YES',  bitnami: 'PART', pravega: 'YES'  },
    { feature: 'Backup & restore (zoocreeper)',        kb: 'YES',  bitnami: 'NO',   pravega: 'NO'   },
    { feature: 'Prometheus metrics',                   kb: 'YES',  bitnami: 'YES',  pravega: 'PART' },
    { feature: 'Stop / start cluster',                 kb: 'YES',  bitnami: 'NO',   pravega: 'NO'   },
    { feature: 'Open Source',                          kb: 'YES',  bitnami: 'YES',  pravega: 'YES'  },
    { feature: 'Web management UI',                    kb: 'ENT',  bitnami: 'NO',   pravega: 'NO'   },
  ],
};

// ---------------------------------------------------------------------------
// RabbitMQ
// ---------------------------------------------------------------------------
export const rabbitmqComparison: OperatorComparison = {
  engine: 'RabbitMQ',
  slug: 'rabbitmq',
  lastVerified: '2026-04',
  competitors: [
    { key: 'bitnami',    label: 'Bitnami Helm Chart', url: 'https://github.com/bitnami/charts/tree/main/bitnami/rabbitmq' },
    { key: 'cluster_op', label: 'RabbitMQ Cluster Operator', url: 'https://github.com/rabbitmq/cluster-operator' },
    { key: 'messaging',  label: 'Messaging Topology Operator', url: 'https://github.com/rabbitmq/messaging-topology-operator' },
  ],
  rows: [
    { feature: 'Open Source',                   kb: 'YES',  bitnami: 'YES',  cluster_op: 'YES',  messaging: 'YES'  },
    { feature: 'Quorum Queues (Raft consensus)', kb: 'YES',  bitnami: 'YES',  cluster_op: 'YES',  messaging: 'YES'  },
    { feature: 'Kubernetes-native CRD API',      kb: 'YES',  bitnami: 'NO',   cluster_op: 'YES',  messaging: 'YES'  },
    { feature: 'Horizontal scaling',             kb: 'YES',  bitnami: 'PART', cluster_op: 'YES',  messaging: 'PART' },
    { feature: 'Vertical scaling (CPU/memory)',  kb: 'YES',  bitnami: 'NO',   cluster_op: 'PART', messaging: 'NO'   },
    { feature: 'PVC volume expansion',           kb: 'YES',  bitnami: 'NO',   cluster_op: 'PART', messaging: 'NO'   },
    { feature: 'Dynamic reconfiguration',        kb: 'YES',  bitnami: 'PART', cluster_op: 'PART', messaging: 'PART' },
    { feature: 'Rolling version upgrade',        kb: 'YES',  bitnami: 'PART', cluster_op: 'YES',  messaging: 'PART' },
    { feature: 'TLS encryption',                 kb: 'NO',   bitnami: 'YES',  cluster_op: 'YES',  messaging: 'PART' },
    { feature: 'Stop / start lifecycle',         kb: 'YES',  bitnami: 'NO',   cluster_op: 'NO',   messaging: 'NO'   },
    { feature: 'Prometheus metrics',             kb: 'YES',  bitnami: 'YES',  cluster_op: 'YES',  messaging: 'YES'  },
    { feature: 'Web management UI',              kb: 'ENT',  bitnami: 'NO',   cluster_op: 'NO',   messaging: 'NO'   },
    { feature: 'Multi-engine (35+ DB engines)',  kb: 'YES',  bitnami: 'NO',   cluster_op: 'NO',   messaging: 'NO'   },
  ],
  notes: [
    'Messaging Topology Operator is a companion to RabbitMQ Cluster Operator for declarative exchange, queue, and binding management.',
  ],
};

// ---------------------------------------------------------------------------
// Milvus (no competitor comparison data yet)
// ---------------------------------------------------------------------------
// export const milvusComparison: OperatorComparison = { ... };

// ---------------------------------------------------------------------------
// Index
// ---------------------------------------------------------------------------
export const allComparisons: OperatorComparison[] = [
  mysqlComparison,
  postgresqlComparison,
  redisComparison,
  mongodbComparison,
  clickhouseComparison,
  kafkaComparison,
  elasticsearchComparison,
  etcdComparison,
  zookeeperComparison,
  rabbitmqComparison,
];
