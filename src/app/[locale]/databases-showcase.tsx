'use client';

import { LockOutlined } from '@mui/icons-material';
import {
  Box,
  Container,
  Tooltip,
  Typography,
} from '@mui/material';

type DbItem = { name: string; preview?: boolean; enterprise?: boolean };
type Category = { label: string; items: DbItem[] };

const categories: Category[] = [
  {
    label: 'Relational',
    items: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'MariaDB', preview: true },
      { name: 'TiDB', preview: true },
      { name: 'OceanBase', preview: true },
      { name: 'SQL Server', enterprise: true },
      { name: 'Oracle', enterprise: true },
    ],
  },
  {
    label: 'NoSQL',
    items: [
      { name: 'Redis' },
      { name: 'MongoDB' },
      { name: 'etcd' },
      { name: 'ZooKeeper' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { name: 'ClickHouse' },
      { name: 'StarRocks' },
    ],
  },
  {
    label: 'Message Queue',
    items: [
      { name: 'Kafka' },
      { name: 'RabbitMQ' },
      { name: 'RocketMQ' },
      { name: 'Pulsar', preview: true },
    ],
  },
  {
    label: 'AI / Vector / Graph',
    items: [
      { name: 'Milvus' },
      { name: 'Qdrant' },
      { name: 'ElasticSearch' },
      { name: 'OpenSearch', preview: true },
      { name: 'Neo4j', preview: true },
      { name: 'NebulaGraph', preview: true },
      { name: 'FalkorDB', preview: true },
    ],
  },
  {
    label: 'Time Series / Observability',
    items: [
      { name: 'InfluxDB', preview: true },
      { name: 'TDEngine', preview: true },
      { name: 'Loki', preview: true },
      { name: 'VictoriaMetrics', preview: true },
      { name: 'GreptimeDB', preview: true },
    ],
  },
  {
    label: 'Object Storage',
    items: [
      { name: 'MinIO' },
    ],
  },
];

function DbChip({ db }: { db: DbItem }) {

  const chip = (
    <Box
      {...(db.enterprise ? {
        component: 'a',
        href: 'https://kubeblocks.com/products/kubeblocks-enterprise',
        target: '_blank',
        rel: 'noopener noreferrer',
      } : {})}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 2.5,
        py: 2,
        borderRight: 1,
        borderColor: 'divider',
        opacity: db.preview ? 0.55 : 1,
        transition: 'background 0.15s, opacity 0.15s',
        textDecoration: 'none',
        '&:hover': {
          bgcolor: 'action.hover',
          opacity: db.preview ? 0.75 : 1,
        },
      }}
    >
      {db.enterprise && <LockOutlined sx={{ fontSize: 16, color: 'text.disabled' }} />}
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.secondary', whiteSpace: 'nowrap' }}>
        {db.name}
      </Typography>
      {db.enterprise && (
        <Box
          component="span"
          sx={{
            fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25,
            borderRadius: 0.5, lineHeight: 1.4,
            bgcolor: 'action.selected',
            color: 'text.secondary',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Enterprise
        </Box>
      )}
    </Box>
  );

  if (db.enterprise) {
    return (
      <Tooltip title="Available in KubeBlocks Enterprise" placement="top">
        {chip}
      </Tooltip>
    );
  }
  if (db.preview) {
    return (
      <Tooltip title="Community add-on" placement="top">
        {chip}
      </Tooltip>
    );
  }
  return chip;
}

export default function DatabasesShowcase() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Box textAlign="center" mb={5}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>Supported Engines</Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            35+ Database Engines, One Operator
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            From relational to NoSQL, from streaming to vector—KubeBlocks covers the modern data stack.
          </Typography>
        </Box>

        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
          {categories.map((cat, i) => (
            <Box
              key={cat.label}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                borderBottom: i < categories.length - 1 ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  width: 140,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  px: 2.5,
                  py: 2,
                  borderRight: 1,
                  borderColor: 'divider',
                  bgcolor: 'action.hover',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'text.disabled' }}>
                  {cat.label}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
                {cat.items.map((db) => (
                  <DbChip key={db.name} db={db} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box component="span" sx={{ fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'action.selected', color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Enterprise</Box>
            Closed-source, available in KubeBlocks Enterprise
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <Box
            component="a"
            href="https://github.com/apecloud/kubeblocks-addons"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              fontSize: '0.875rem', fontWeight: 600, color: 'primary.main',
              textDecoration: 'none', transition: 'opacity .15s',
              '&:hover': { opacity: 0.7 },
            }}
          >
            View all 35+ Add-ons on GitHub →
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
