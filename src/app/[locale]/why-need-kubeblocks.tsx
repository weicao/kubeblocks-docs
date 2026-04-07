'use client';
import {
  CableOutlined,
  Diversity2Outlined,
  ExtensionOutlined,
  HubOutlined,
  NetworkCheckOutlined,
  WebhookOutlined,
} from '@mui/icons-material';
import { Avatar, Grid2 as Grid, Stack } from '@mui/material';

import { Box, Container, Typography, useTheme } from '@mui/material';

const mainData = [
  {
    title: 'Zero Learning Curve Across 35+ Engines',
    icon: <CableOutlined sx={{ color: '#FFF' }} />,
    description: 'Stop learning a new operator for every database. KubeBlocks provides a single, unified API to provision, scale, and manage any database—from MySQL to vector databases—drastically reducing operational complexity and training costs.',
  },
  {
    title: 'Integrate Any Database in Days, Not Months',
    icon: <ExtensionOutlined sx={{ color: '#FFF' }} />,
    description: "Bring your own database to Kubernetes without writing complex Golang operators. KubeBlocks' low-code Addon architecture turns your DBA knowledge into automated workflows instantly, accelerating your DBaaS platform delivery.",
  },
  {
    title: 'Production-Grade Reliability at Scale',
    icon: <NetworkCheckOutlined sx={{ color: '#FFF' }} />,
    description: 'Ensure your mission-critical data is always accessible. KubeBlocks features a decentralized, lightweight high-availability architecture with built-in auto-failover, perfectly suited for managing massive MySQL and Redis clusters with minimal resource overhead.',
  },
  {
    title: 'Tailor Topologies to Your Workloads',
    icon: <HubOutlined sx={{ color: '#FFF' }} />,
    description: 'Deploy databases exactly how your business demands. Whether you need a lightweight single-node instance for dev/test, a robust primary-replica setup, or a complex sharded cluster with custom proxies, KubeBlocks adapts to your specific requirements.',
  },
  {
    title: 'Multi-Cloud & Hybrid Deployment',
    icon: <Diversity2Outlined sx={{ color: '#FFF' }} />,
    description: 'Run your data infrastructure wherever your business demands. KubeBlocks is fully Kubernetes-native, ensuring seamless deployment across AWS EKS, Google GKE, Azure AKS, or on-premises environments including OpenShift and OpenStack Magnum—eliminating vendor lock-in completely.',
  },
  {
    title: 'Zero-Downtime Maintenance',
    icon: <WebhookOutlined sx={{ color: '#FFF' }} />,
    description: "Go beyond Kubernetes StatefulSets. KubeBlocks' innovative InstanceSet enables role-aware management, in-place pod updates, and the ability to take individual instances offline for proactive maintenance—all without disrupting your production traffic.",
  },
];

export default function WhyNeedKubeBlocks() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingBlock: 12,
      }}
    >
      <Container>
        <Box textAlign="center" mb={8}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>Architecture</Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em', mb: 1.5 }}>
            Why KubeBlocks
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
            Built for teams who run databases on Kubernetes at scale.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {mainData.map((item, index) => (
            <Grid
              size={{ md: 6, sm: 12 }}
              key={index}
              sx={{
                borderBottom: '1px solid', borderColor: 'divider',
                position: 'relative', overflow: 'hidden',
                transition: 'background .2s',
                '&:hover': { bgcolor: 'action.hover' },
                '&::after': {
                  content: '""', position: 'absolute',
                  top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main ?? theme.palette.primary.light})`,
                  transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: 'transform .35s',
                },
                '&:hover::after': { transform: 'scaleX(1)' },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {item.icon}
                </Avatar>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 }}>{item.title}</Typography>
              </Stack>
              <Typography color="textSecondary" mb={4}>
                {item.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
