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
  Chip,
  Container,
  Divider,
  Stack,
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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            35+ Database Engines, One Operator
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            A unified API for all your databases — from relational to vector, message queue to object storage.
          </Typography>
        </Box>

        <Stack spacing={3}>
          {categories.map((cat) => (
            <Box key={cat.label}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ mb: 1.5, display: 'block', letterSpacing: '0.1em' }}
              >
                {cat.label}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {cat.items.map((db) => (
                  <Chip
                    key={db.name}
                    icon={db.icon}
                    label={db.name}
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      px: 0.5,
                      '& .MuiChip-icon': { ml: 1 },
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ mt: 3 }} />
            </Box>
          ))}
        </Stack>

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
