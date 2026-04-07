'use client';

import { Link } from '@/components/Link';
import {
  ElasticSearchIcon,
  KafkaIcon,
  MilvusIcon,
  MongodbIcon,
  MySQLIcon,
  PostgreSQLIcon,
  PulsarIcon,
  QdrantIcon,
  RabbitMQIcon,
  RedisIcon,
  StarRocksIcon,
} from '@/components/icons';
import {
  AccountTree,
  GitHub,
  Inventory2,
  OpenInNew,
  Rocket,
  Storage,
  ViewInAr,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';

const iconSx = { sx: { fontSize: 20 } };

const categories = [
  {
    label: 'Relational',
    items: [
      { name: 'MySQL', icon: <MySQLIcon {...iconSx} /> },
      { name: 'PostgreSQL', icon: <PostgreSQLIcon {...iconSx} /> },
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
      { name: 'Pulsar', icon: <PulsarIcon {...iconSx} /> },
    ],
  },
  {
    label: 'Vector / Search',
    items: [
      { name: 'Milvus', icon: <MilvusIcon {...iconSx} /> },
      { name: 'Qdrant', icon: <QdrantIcon {...iconSx} /> },
      { name: 'ElasticSearch', icon: <ElasticSearchIcon {...iconSx} /> },
    ],
  },
  {
    label: 'Object Storage',
    items: [
      { name: 'MinIO', icon: <Inventory2 sx={{ fontSize: 20 }} /> },
    ],
  },
];

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
            A unified API for all your databases — from relational to vector, message queue to object storage.
          </Typography>
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
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
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'text.disabled',
                  }}
                >
                  {cat.label}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
                {cat.items.map((db, j) => (
                  <Box
                    key={db.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 2,
                      borderRight: j < cat.items.length - 1 ? 1 : 0,
                      borderColor: 'divider',
                      transition: 'background 0.15s',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    {db.icon}
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                      {db.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box textAlign="center" mt={4}>
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
            View all Add-ons
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
