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
    title: 'One API, Any Database, Zero Re-Learning',
    icon: <CableOutlined sx={{ color: '#FFF' }} />,
    description: 'Stop learning a new operator for every database you add. KubeBlocks provides a single, unified API to provision, scale, and manage any database—drastically reducing operational complexity and training costs.',
  },
  {
    title: 'Onboard Any Database Engine — No Operator SDK Required',
    icon: <ExtensionOutlined sx={{ color: '#FFF' }} />,
    description: "Bring any database to Kubernetes without writing complex Golang operators. KubeBlocks' low-code Addon architecture lets you define engine behavior in configuration files, turning your DBA knowledge into automated, declarative workflows.",
  },
  {
    title: 'Upgrade Databases Without Waking Up at 3 AM',
    icon: <WebhookOutlined sx={{ color: '#FFF' }} />,
    description: "KubeBlocks' innovative InstanceSet enables role-aware management, in-place pod updates, and the ability to take individual instances offline for proactive maintenance—all without disrupting your production traffic.",
  },
  {
    title: 'Deploy Exactly What Your Workload Needs',
    icon: <HubOutlined sx={{ color: '#FFF' }} />,
    description: 'Whether you need a lightweight single-node instance for dev/test, a robust primary-replica setup, or a complex sharded cluster with custom proxies—KubeBlocks adapts to your specific requirements without extra configuration overhead.',
  },
  {
    title: 'Run Anywhere. Lock In to Nothing.',
    icon: <Diversity2Outlined sx={{ color: '#FFF' }} />,
    description: 'KubeBlocks is fully Kubernetes-native, ensuring seamless deployment across AWS EKS, Google GKE, Azure AKS, or on-premises environments including OpenShift and OpenStack Magnum—eliminating vendor lock-in completely.',
  },
  {
    title: 'Production-Grade HA with Minimal Overhead',
    icon: <NetworkCheckOutlined sx={{ color: '#FFF' }} />,
    description: 'Ensure your mission-critical data is always accessible. KubeBlocks features a decentralized, lightweight high-availability architecture with built-in auto-failover, perfectly suited for managing massive MySQL and Redis clusters.',
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
            Engineered for the{' '}
            <Box component="span" color="primary.main">Realities of Production</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            Not just for demos. KubeBlocks is built for teams who run databases at scale—where reliability, flexibility, and operational simplicity are non-negotiable.
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
