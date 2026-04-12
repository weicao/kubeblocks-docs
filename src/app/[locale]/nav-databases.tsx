'use client';

import { DropDown } from '@/components/DropDown';
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
} from '@/components/icons';
import { Link } from '@/components/Link';
import { useI18n } from '@/locales/client';
import { AccountTree, ExpandMore, GitHub, Inventory2, Rocket, Storage, ViewInAr } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid2 as Grid,
  ListItemText,
  MenuItem,
  Stack,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

export default function DatabasesNav() {
  const [open, setOpen] = useState<boolean>(false);
  const t = useI18n();
  const theme = useTheme();

  const iconProps = { sx: { fontSize: 30, lineHeight: 1 } };

  const databases = [
    {
      title: 'MySQL',
      icon: <MySQLIcon {...iconProps} />,
      href: '/mysql-operator',
    },
    {
      title: 'PostgreSQL',
      icon: <PostgreSQLIcon {...iconProps} />,
      href: '/pg-operator',
    },
    {
      title: 'Redis',
      icon: <RedisIcon {...iconProps} />,
      href: '/redis-operator',
    },
    {
      title: 'MongoDB',
      icon: <MongodbIcon {...iconProps} />,
      href: '/mongodb-operator',
    },
    {
      title: 'Kafka',
      icon: <KafkaIcon {...iconProps} />,
      href: '/kafka-operator',
    },
    {
      title: 'Milvus',
      icon: <MilvusIcon {...iconProps} />,
      href: '/milvus-operator',
    },
    {
      title: 'Qdrant',
      icon: <QdrantIcon {...iconProps} />,
      href: '/docs/preview/kubeblocks-for-qdrant',
    },
    {
      title: 'RabbitMQ',
      icon: <RabbitMQIcon {...iconProps} />,
      href: '/docs/preview/kubeblocks-for-rabbitmq',
    },
    {
      title: 'Elasticsearch',
      icon: <ElasticSearchIcon {...iconProps} />,
      href: '/elasticsearch-operator',
    },
    {
      title: 'ClickHouse',
      icon: <Storage {...iconProps} />,
      href: '/docs/preview/kubeblocks-for-clickhouse',
    },
    {
      title: 'RocketMQ',
      icon: <Rocket {...iconProps} />,
      href: '/docs/preview/kubeblocks-for-rocketmq',
    },
    {
      title: 'etcd',
      icon: <AccountTree {...iconProps} />,
      href: '/etcd-operator',
    },
    {
      title: 'ZooKeeper',
      icon: <ViewInAr {...iconProps} />,
      href: '/zookeeper-operator',
    },
    {
      title: 'MinIO',
      icon: <Inventory2 {...iconProps} />,
      href: '/docs/preview/kubeblocks-for-minio',
    },
    {
      title: 'More Add-ons',
      icon: <GitHub {...iconProps} />,
      href: 'https://github.com/apecloud/kubeblocks-addons/',
      external: true,
    },
  ];

  return (
    <DropDown
      offset={[0, 12]}
      trigger={
        <Button
          color="inherit"
          size="large"
          sx={{
            paddingInline: 2,
            bgcolor: open ? theme.palette.action.hover : 'transparent',
            '&:hover': { bgcolor: theme.palette.action.hover },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          endIcon={
            <ExpandMore
              sx={{
                transition: 'rotate, 0.3s',
                transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
                scale: 0.6,
                opacity: 0.8,
              }}
            />
          }
        >
          {t('navigation.databases')}
        </Button>
      }
      onChange={(v) => setOpen(v)}
      sx={{ maxWidth: 760 }}
      placement="bottom-start"
    >
      <Box p={1.5}>
        <Grid container spacing={1}>
          {databases.map((item, index) => (
            <Grid size={{ lg: 4, md: 4, sm: 6, xs: 6 }} key={index}>
              <MenuItem
                dense
                component={Link}
                href={item.href}
                {...(('external' in item && item.external) && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                sx={{ borderRadius: 1 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {item.icon}
                  <ListItemText>{item.title}</ListItemText>
                </Stack>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DropDown>
  );
}
