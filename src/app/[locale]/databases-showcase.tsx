'use client';

import { Link } from '@/components/Link';
import {
  ElasticSearchIcon,
  KafkaIcon,
  MilvusIcon,
  MongodbIcon,
  MySQLIcon,
  PostgreSQLIcon,
  QdrantIcon,
  RabbitMQIcon,
  RedisIcon,
  StarRocksIcon,
} from '@/components/icons';
import {
  AccountTree,
  GitHub,
  Inventory2,
  LockOutlined,
  OpenInNew,
  Rocket,
  Storage,
  ViewInAr,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Tooltip,
  Typography,
} from '@mui/material';

const iconSx = { sx: { fontSize: 20 } };

type DbItem = { name: string; icon?: React.ReactNode; preview?: boolean; enterprise?: boolean };
type Category = { label: string; items: DbItem[] };

const categories: Category[] = [
  {
    label: 'Relational',
    items: [
      { name: 'MySQL', icon: <MySQLIcon {...iconSx} /> },
      { name: 'PostgreSQL', icon: <PostgreSQLIcon {...iconSx} /> },
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
      { name: 'Redis', icon: <RedisIcon {...iconSx} /> },
      { name: 'MongoDB', icon: <MongodbIcon {...iconSx} /> },
      { name: 'etcd', icon: <AccountTree sx={{ fontSize: 20 }} /> },
      { name: 'ZooKeeper', icon: <ViewInAr sx={{ fontSize: 20 }} /> },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { name: 'ClickHouse', icon: <Storage sx={{ fontSize: 20 }} /> },
      { name: 'StarRocks', icon: <StarRocksIcon {...iconSx} /> },
    ],
  },
  {
    label: 'Message Queue',
    items: [
      { name: 'Kafka', icon: <KafkaIcon {...iconSx} /> },
      { name: 'RabbitMQ', icon: <RabbitMQIcon {...iconSx} /> },
      { name: 'RocketMQ', icon: <Rocket sx={{ fontSize: 20 }} /> },
      { name: 'Pulsar', preview: true },
    ],
  },
  {
    label: 'AI / Vector / Graph',
    items: [
      { name: 'Milvus', icon: <MilvusIcon {...iconSx} /> },
      { name: 'Qdrant', icon: <QdrantIcon {...iconSx} /> },
      { name: 'ElasticSearch', icon: <ElasticSearchIcon {...iconSx} /> },
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
      { name: 'MinIO', icon: <Inventory2 sx={{ fontSize: 20 }} /> },
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
      {db.enterprise ? (
        <LockOutlined sx={{ fontSize: 16, color: 'text.disabled' }} />
      ) : db.icon ? (
        db.icon
      ) : null}
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.secondary', whiteSpace: 'nowrap' }}>
        {db.name}
      </Typography>
      {db.preview && (
        <Box
          component="span"
          sx={{
            fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25,
            borderRadius: 0.5, lineHeight: 1.4,
            bgcolor: 'action.selected',
            color: 'text.disabled',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Preview
        </Box>
      )}
      {db.enterprise && (
        <Box
          component="span"
          sx={{
            fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25,
            borderRadius: 0.5, lineHeight: 1.4,
            bgcolor: 'warning.main',
            color: 'warning.contrastText',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: 0.85,
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
      <Tooltip title="Community add-on — limited features and documentation" placement="top">
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
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'text.disabled', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'text.disabled', display: 'block' } }}>Supported Engines</Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            35+ Database Engines, One Operator
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            A unified API for all your databases — from relational to AI-ready vector & graph, message queue to object storage.
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
            <Box component="span" sx={{ fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'action.selected', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Preview</Box>
            Community add-on — limited features and documentation
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box component="span" sx={{ fontSize: '0.6rem', fontWeight: 700, px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'warning.main', color: 'warning.contrastText', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.85 }}>Enterprise</Box>
            Closed-source, available in KubeBlocks Enterprise
          </Typography>
        </Box>

        <Box textAlign="center" mt={3}>
          <Button
            component={Link}
            href="https://github.com/apecloud/kubeblocks-addons"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHub />}
            endIcon={<OpenInNew fontSize="small" />}
            size="large"
          >
            View all Add-ons on GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
