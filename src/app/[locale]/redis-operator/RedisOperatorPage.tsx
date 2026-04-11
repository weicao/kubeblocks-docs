'use client';

import React, { useState } from 'react';
import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import TrustedBy from '@/app/[locale]/trusted-by';
import RedisArchitectureDiagram from '@/components/RedisArchitectureDiagram';
import RedisStandaloneArchitectureDiagram from '@/components/RedisStandaloneArchitectureDiagram';
import RedisClusterArchitectureDiagram from '@/components/RedisClusterArchitectureDiagram';

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionEyebrow({ label }: { label: string }) {
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        mb: 1.5, fontSize: '11px', fontWeight: 700,
        letterSpacing: '.12em', textTransform: 'uppercase',
        color: 'primary.main',
        '&::before': {
          content: '""', width: '14px', height: '2px',
          borderRadius: '1px', bgcolor: 'primary.main', display: 'block',
        },
      }}
    >
      {label}
    </Box>
  );
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const bgDark = {
    backgroundColor: '#070707',
    backgroundImage: `url("/site/home-rectangles.svg")`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  };
  const bgLight = {
    backgroundColor: '#f9fafb',
    backgroundImage: [
      'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '72px 72px',
  };

  return (
    <Box sx={{ ...(isDark ? bgDark : bgLight), py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left: text */}
          <Box>
            <Box
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 1.5, py: 0.5, borderRadius: 100,
                border: '1px solid', borderColor: 'divider',
                fontSize: 12, fontWeight: 500, color: 'text.disabled', mb: 3,
              }}
            >
              Open Source · Production-Grade · CNCF Landscape
            </Box>

            <Typography
              variant="h2"
              mb={2.5}
              sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: isDark ? '#fff' : 'text.primary' }}
            >
              KubeBlocks Redis Operator{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>for Kubernetes</Box>
            </Typography>

            <Typography
              mb={4}
              sx={{
                color: isDark ? alpha('#fff', 0.7) : 'text.secondary',
                fontSize: { xs: 16, md: 17 },
                lineHeight: 1.75,
              }}
            >
              Deploy production-grade Redis clusters in minutes. Multi-topology HA,
              ACL management, backup & restore, and full Day-2 operations — all via a
              unified Kubernetes API.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={7}>
              <Button
                variant="contained"
                href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
                target="_blank"
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 700 }}
              >
                Try Playground Free →
              </Button>
              <Button
                variant="outlined"
                href="/docs/preview/kubeblocks-for-redis/02-quickstart"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Read the Docs
              </Button>
            </Stack>

            <Box
              sx={{
                display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 2, pt: 4,
                borderTop: '1px solid', borderColor: 'divider',
              }}
            >
              {[
                { value: '3', label: 'Supported Topologies' },
                { value: '99.99%', label: 'HA target' },
                { value: '100%', label: 'Open Source' },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Typography
                    variant="h4" fontWeight={800}
                    sx={{ color: 'primary.main', letterSpacing: '-0.03em' }}
                  >
                    {value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

          </Box>

          {/* Right: 3-step terminal */}
          <Box
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(108,182,255,0.15)',
              overflow: 'hidden',
              bgcolor: '#0d1117',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          >
            {/* Traffic-light bar */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 2.25, py: 1.75,
              bgcolor: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f57' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28c840' }} />
              <Typography sx={{ ml: 1, fontSize: '13px', color: '#8b949e', fontFamily: 'monospace' }}>
                Deploy Redis in 3 steps
              </Typography>
            </Box>

            {/* Steps */}
            <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Step 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install KubeBlocks</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#6e7681' }}># Add Helm repo{'\n'}</span>
                {'helm repo add kubeblocks https://apecloud.github.io/helm-charts\nhelm repo update\n\n'}
                <span style={{ color: '#6e7681' }}># Install KubeBlocks{'\n'}</span>
                {'helm install kubeblocks kubeblocks/kubeblocks \\\n  --namespace kb-system --create-namespace'}
              </Box>

              {/* Step 2 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a Replication Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>redis-cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>namespace</span>{': '}
                <span style={{ color: '#a5d6ff' }}>demo{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>redis{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>replication{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>componentSpecs</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>redis{'\n'}</span>
                {'      '}
                <span style={{ color: '#79c0ff' }}>replicas</span>{': '}
                <span style={{ color: '#f2cc60' }}>2{'\n'}</span>
                {'    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>redis-sentinel{'\n'}</span>
                {'      '}
                <span style={{ color: '#79c0ff' }}>replicas</span>{': '}
                <span style={{ color: '#f2cc60' }}>3</span>
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Cluster is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'kubectl get cluster redis-cluster -n demo\n\n'}
                <span style={{ color: '#6e7681' }}>{'NAME           CLUSTER-DEFINITION  STATUS   AGE\n'}</span>
                <span style={{ color: '#3fb950' }}>{'redis-cluster  redis               Running  2m'}</span>
              </Box>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 2. Topologies ─────────────────────────────────────────────────────────────

const topoData = [
  {
    name: 'Standalone',
    badgeColor: '#6B7280',
    tags: ['Single Node', 'Dev / Test', 'Minimal Resources'],
    desc: 'A single Redis pod with no replication or Sentinel. Ideal for development, testing, or lightweight workloads that do not require high availability. Each pod gets its own PVC for RDB/AOF durability.',
    features: [
      'Single pod, minimal Kubernetes resource footprint',
      'Full Redis feature set (all data structures, scripting)',
      'PVC per pod for RDB / AOF durability across restarts',
      'Vertical scaling and volume expansion supported',
      'Fast cold-start — no quorum bootstrap needed',
    ],
    diagram: <RedisStandaloneArchitectureDiagram />,
  },
  {
    name: 'Replication + Sentinel',
    badgeColor: '#DC2626',
    tags: ['Automatic Failover', '3-node Quorum', 'Read Scale-out'],
    desc: 'One primary with one or more replicas, monitored by a dedicated three-node Sentinel quorum. On primary failure, Sentinel reaches quorum, promotes the most up-to-date replica, and reconfigures all replicas and clients automatically. Total failover time is typically 10–30 seconds.',
    features: [
      'Sentinel quorum (3 pods) for reliable failure detection',
      'Automatic promotion of the most up-to-date replica',
      'Read scale-out via replica endpoints',
      'Planned switchover via SENTINEL FAILOVER',
      'Writes route via a role-aware ClusterIP service (no client-side reconfiguration needed)',
    ],
    diagram: <RedisArchitectureDiagram />,
  },
  {
    name: 'Redis Cluster',
    badgeColor: '#7C3AED',
    tags: ['Horizontal Sharding', 'No Single Point of Failure', '16384 Hash Slots'],
    desc: 'Native Redis Cluster with hash-slot-based sharding across multiple independent shards. Each shard has its own primary and replicas. Nodes coordinate through a gossip protocol on the cluster bus — no Sentinel processes required.',
    features: [
      '16,384 hash slots distributed evenly across shards via CRC16',
      'Automatic failover per shard — gossip protocol, no Sentinel',
      'Horizontal write scalability — add shards and rebalance online',
      'Cluster-aware client required; MOVED/ASK redirects handled by the client library',
      'Each shard gets its own PVC; minimum 3 shards for quorum',
    ],
    diagram: <RedisClusterArchitectureDiagram />,
  },
];

function Topologies() {
  const [tab, setTab] = useState(0);
  const topo = topoData[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Redis Topologies" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Every Redis Topology.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            From a lightweight standalone instance to a sharded cluster —
            choose the topology that fits your workload.
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': { fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', minHeight: 48 },
              '& .Mui-selected': { color: 'primary.main' },
            }}
          >
            {topoData.map((t) => (
              <Tab key={t.name} label={t.name} />
            ))}
          </Tabs>
        </Box>

        {/* Tab panel */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
            gap: 5,
            alignItems: 'start',
          }}
        >
          {/* Description + features */}
          <Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>
              {topo.desc}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {topo.features.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      bgcolor: alpha(topo.badgeColor, 0.12),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: topo.badgeColor, fontWeight: 800, mt: '2px',
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                    {f}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Metric tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {topo.tags.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.5, py: 0.5, borderRadius: '6px',
                    fontSize: '0.78rem', fontWeight: 700,
                    bgcolor: alpha(topo.badgeColor, 0.1),
                    color: topo.badgeColor,
                    border: `1px solid ${alpha(topo.badgeColor, 0.25)}`,
                    letterSpacing: '.02em',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Diagram */}
          {topo.diagram && (
            <Box>{topo.diagram}</Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Comparison Table ───────────────────────────────────────────────────────

function ComparisonTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardBg = theme.palette.background.paper;
  const cardBorder = theme.palette.divider;

  const YES  = <Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box>;
  const NO   = <Box component="span" sx={{ color: '#f85149', fontWeight: 700 }}>✗</Box>;
  const PART = <Box component="span" sx={{ color: '#e3b341', fontWeight: 700 }}>~</Box>;
  const ENT  = (
    <Box component="span" sx={{
      fontSize: '0.65rem', fontWeight: 700, px: 0.75, py: 0.25,
      borderRadius: 0.5, bgcolor: 'action.selected',
      color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>
      Enterprise
    </Box>
  );

  const rows = [
    { feature: 'Open Source',                  kb: YES,  spotahome: YES,  opstree: YES,  enterprise: NO   },
    { feature: 'Sentinel-based HA',            kb: YES,  spotahome: YES,  opstree: YES,  enterprise: NO   },
    { feature: 'Redis Cluster (sharding)',      kb: YES,  spotahome: NO,   opstree: YES,  enterprise: YES  },
    { feature: 'TLS encryption',               kb: YES,  spotahome: NO,   opstree: YES,  enterprise: YES  },
    { feature: 'TLS in-place rotation',        kb: YES,  spotahome: NO,   opstree: PART, enterprise: YES  },
    { feature: 'ACL management',               kb: YES,  spotahome: NO,   opstree: YES,  enterprise: YES  },
    { feature: 'Backup (RDB snapshot)',         kb: YES,  spotahome: NO,   opstree: PART, enterprise: YES  },
    { feature: 'Scheduled backup',             kb: YES,  spotahome: NO,   opstree: NO,   enterprise: YES  },
    { feature: 'Restore from backup',          kb: YES,  spotahome: NO,   opstree: PART, enterprise: YES  },
    { feature: 'Horizontal scaling',           kb: YES,  spotahome: YES,  opstree: YES,  enterprise: YES  },
    { feature: 'Vertical scaling',             kb: YES,  spotahome: YES,  opstree: YES,  enterprise: YES  },
    { feature: 'Volume expansion',             kb: YES,  spotahome: NO,   opstree: YES,  enterprise: YES  },
    { feature: 'Dynamic config',               kb: YES,  spotahome: PART, opstree: PART, enterprise: YES  },
    { feature: 'Planned switchover',           kb: YES,  spotahome: NO,   opstree: NO,   enterprise: PART },
    { feature: 'Minor Upgrade',               kb: YES,  spotahome: PART, opstree: YES,  enterprise: YES  },
    { feature: 'Major Upgrade',               kb: YES,  spotahome: NO,   opstree: PART, enterprise: YES  },
    { feature: 'Standby cluster (cross-k8s DR)', kb: ENT, spotahome: NO,  opstree: NO,   enterprise: YES  },
    { feature: 'Bootstrap from external Redis', kb: ENT,  spotahome: YES, opstree: NO,   enterprise: PART },
    { feature: 'Prometheus metrics',           kb: YES,  spotahome: YES,  opstree: YES,  enterprise: YES  },
    { feature: 'Web management UI',            kb: ENT,  spotahome: NO,   opstree: NO,   enterprise: YES  },
  ];

  const cols = [
    { label: 'KubeBlocks', highlight: true },
    { label: 'Spotahome Operator (archived)', highlight: false },
    { label: 'Opstree Operator', highlight: false },
    { label: 'Redis Enterprise', highlight: false },
  ];

  const cellSx = {
    px: 2, py: 1.5,
    fontSize: '0.82rem',
    borderBottom: `1px solid ${cardBorder}`,
    textAlign: 'center' as const,
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Comparison" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            How KubeBlocks Compares to{' '}
            <Box component="span" color="primary.main">Other Redis Operators</Box>
          </Typography>
        </Box>

        <Box sx={{ overflowX: 'auto', borderRadius: '14px', border: `1px solid ${cardBorder}` }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', bgcolor: cardBg }}>
            <Box component="thead">
              <Box component="tr">
                <Box
                  component="th"
                  sx={{
                    px: 2, py: 2, textAlign: 'left',
                    fontSize: '0.78rem', fontWeight: 700,
                    color: 'text.secondary', letterSpacing: '.08em', textTransform: 'uppercase',
                    borderBottom: `1px solid ${cardBorder}`,
                    bgcolor: isDark ? '#161b22' : '#f6f8fa',
                    width: '30%',
                  }}
                >
                  Feature
                </Box>
                {cols.map(({ label, highlight }) => (
                  <Box
                    key={label}
                    component="th"
                    sx={{
                      px: 2, py: 2,
                      fontSize: highlight ? '0.82rem' : '0.78rem',
                      fontWeight: highlight ? 800 : 600,
                      textAlign: 'center',
                      borderBottom: `1px solid ${cardBorder}`,
                      borderLeft: `1px solid ${cardBorder}`,
                      bgcolor: highlight
                        ? (isDark ? alpha('#6CB6FF', 0.08) : alpha('#6CB6FF', 0.06))
                        : (isDark ? '#161b22' : '#f6f8fa'),
                      color: highlight ? 'primary.main' : 'text.secondary',
                      width: '17.5%',
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {rows.map(({ feature, kb, spotahome, opstree, enterprise }) => (
                <Box component="tr" key={feature}>
                  <Box
                    component="td"
                    sx={{
                      ...cellSx,
                      textAlign: 'left',
                      color: 'text.primary',
                      fontWeight: 500,
                      borderRight: `1px solid ${cardBorder}`,
                    }}
                  >
                    {feature}
                  </Box>
                  {[kb, spotahome, opstree, enterprise].map((val, j) => (
                    <Box
                      key={j}
                      component="td"
                      sx={{
                        ...cellSx,
                        borderLeft: `1px solid ${cardBorder}`,
                        bgcolor: j === 0
                          ? (isDark ? alpha('#6CB6FF', 0.04) : alpha('#6CB6FF', 0.03))
                          : 'transparent',
                      }}
                    >
                      {val}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 2, fontSize: '0.75rem' }}>
          <Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box>{' '}= Supported · <Box component="span" sx={{ color: '#e3b341', fontWeight: 700 }}>~</Box>{' '}= Partial / Limited · <Box component="span" sx={{ color: '#f85149', fontWeight: 700 }}>✗</Box>{' '}= Not supported
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 0.75, fontSize: '0.75rem' }}>
          <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 700, px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'action.selected', color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mr: 0.75 }}>Enterprise</Box>
          indicates a capability available in KubeBlocks Enterprise, not the open-source distribution.{' '}
          <Box component="a" href="https://kubeblocks.com/contact" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
            Contact us for licensing →
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center', mt: 0.75, fontSize: '0.72rem' }}>
          Based on publicly available documentation. Features may vary by version.
        </Typography>
      </Container>
    </Box>
  );
}

// ── 4. Capabilities Diagrams ──────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { label: 'Backup & Restore' },
    { label: 'Rolling Upgrade' },
    { label: 'Auto Failover' },
  ];

  return (
    <Box component="section"
      style={{
        '--cd-card-bg':    theme.palette.background.paper,
        '--cd-box-bg':     theme.palette.mode === 'dark' ? '#252840' : theme.palette.action.hover,
        '--cd-text':       theme.palette.text.primary,
        '--cd-text-muted': theme.palette.text.secondary,
        '--cd-border':     theme.palette.divider,
      } as React.CSSProperties}
      sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>

      <style>{`
        .cdr * { box-sizing: border-box; }
        @keyframes cdr-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cdr-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes cdr-glow-green {
          0%, 100% { box-shadow: 0 0 6px #4ADE80; }
          50%       { box-shadow: 0 0 14px #4ADE80, 0 0 4px #4ADE80; }
        }
        @keyframes cdr-glow-target {
          0%, 100% { box-shadow: 0 0 10px #4ADE80; }
          50%       { box-shadow: 0 0 20px #4ADE80, 0 0 8px #4ADE80; }
        }
        .cdr-card {
          background: var(--cd-card-bg, #1e2130);
          border: 1px solid var(--cd-border, rgba(255,255,255,0.08));
          border-radius: 20px; padding: 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--cd-text, #E8EAF0);
        }
        @media (max-width: 600px) { .cdr-card { padding: 24px 16px; } }
        .cdr-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 36px; gap: 16px; flex-wrap: wrap;
        }
        .cdr-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        .cdr-icon-orange { background: rgba(242,145,17,0.12); }
        .cdr-icon-green  { background: rgba(74,222,128,0.12); }
        .cdr-title-group { flex: 1; }
        .cdr-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .cdr-desc  { font-size: 14px; color: var(--cd-text-muted, #8B90A0); }
        .cdr-badge {
          padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; flex-shrink: 0;
        }
        .cdr-badge-orange { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cdr-badge-green  { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        /* ── Backup ── */
        .cdr-tl-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 20px;
        }
        .cdr-tl-track {
          position: relative; height: 4px;
          background: rgba(255,255,255,0.08); border-radius: 4px;
        }
        .cdr-tl-fill {
          position: absolute; left: 0; top: 0; height: 100%;
          background: linear-gradient(90deg, #F29111, #6CB6FF);
          border-radius: 4px; width: 100%;
        }
        .cdr-tl-events {
          position: relative; height: 100px; margin-top: -2px;
        }
        .cdr-tl-event {
          position: absolute; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .cdr-tl-dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid #16181f; position: relative; z-index: 2; margin-top: -5px;
        }
        .cdr-tl-dot.snap   { background: #F29111; box-shadow: 0 0 10px #F29111; }
        .cdr-tl-dot.target {
          background: #4ADE80; width: 18px; height: 18px; margin-top: -7px;
          animation: cdr-glow-target 1.8s ease-in-out infinite;
        }
        .cdr-tl-tag {
          font-size: 11px; font-weight: 600; padding: 3px 8px;
          border-radius: 6px; white-space: nowrap;
        }
        .cdr-tl-tag.snap   { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cdr-tl-tag.target { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        .cdr-tl-time { font-size: 11px; color: var(--cd-text-muted, #8B90A0); font-family: "JetBrains Mono", monospace; }
        .cdr-restore {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 24px 28px;
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .cdr-restore-step {
          display: flex; align-items: center; gap: 12px; flex: 1; min-width: 150px;
        }
        .cdr-restore-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .cdr-restore-icon.orange { background: rgba(242,145,17,0.12); }
        .cdr-restore-icon.blue   { background: rgba(108,182,255,0.12); }
        .cdr-restore-icon.green  { background: rgba(74,222,128,0.12); }
        .cdr-restore-text strong { display: block; font-size: 13px; font-weight: 600; }
        .cdr-restore-text span   { font-size: 12px; color: var(--cd-text-muted, #8B90A0); }
        .cdr-restore-arrow { color: var(--cd-text-muted, #8B90A0); font-size: 20px; flex-shrink: 0; }
        /* ── Failover ── */
        .cdr-fo-timeline {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 0; margin-bottom: 32px; position: relative;
        }
        @media (max-width: 700px) { .cdr-fo-timeline { grid-template-columns: 1fr; } }
        .cdr-fo-phase { position: relative; padding: 0 8px; }
        .cdr-fo-phase::after {
          content: ""; position: absolute; right: -1px; top: 24px;
          width: 2px; height: 32px; background: var(--cd-border, rgba(255,255,255,0.08));
        }
        .cdr-fo-phase:last-child::after { display: none; }
        .cdr-fo-time {
          font-size: 11px; font-family: "JetBrains Mono", monospace;
          color: var(--cd-text-muted, #8B90A0); margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .cdr-fo-time-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cdr-fo-time-dot.green  { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; animation: cdr-glow-green 2s ease-in-out infinite; }
        .cdr-fo-time-dot.red    { background: #F87171; box-shadow: 0 0 6px #F87171; }
        .cdr-fo-time-dot.yellow { background: #FACC15; box-shadow: 0 0 6px #FACC15; }
        .cdr-fo-time-dot.blue   { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cdr-fo-card {
          background: var(--cd-card-bg, #1e2130); border: 1px solid var(--cd-border, rgba(255,255,255,0.08));
          border-radius: 10px; padding: 14px 12px; font-size: 12px;
        }
        .cdr-fo-card.phase-0 { border-color: rgba(74,222,128,0.25); }
        .cdr-fo-card.phase-1 { border-color: rgba(248,113,113,0.25); }
        .cdr-fo-card.phase-2 { border-color: rgba(250,204,21,0.2); }
        .cdr-fo-card.phase-3 { border-color: rgba(108,182,255,0.2); }
        .cdr-fo-card.phase-4 { border-color: rgba(74,222,128,0.3); }
        .cdr-fo-card-title { font-weight: 700; font-size: 12px; margin-bottom: 10px; }
        .cdr-fo-card-title.green  { color: #4ADE80; }
        .cdr-fo-card-title.red    { color: #F87171; }
        .cdr-fo-card-title.yellow { color: #FACC15; }
        .cdr-fo-card-title.blue   { color: #6CB6FF; }
        .cdr-fo-nodes { display: flex; flex-direction: column; gap: 6px; }
        .cdr-fo-node {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 8px; border-radius: 6px;
          font-size: 11px; font-family: "JetBrains Mono", monospace;
          border: 1px solid transparent;
        }
        .cdr-fo-node-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cdr-fo-node.healthy     { background: rgba(74,222,128,0.06); }
        .cdr-fo-node.healthy .cdr-fo-node-dot { background: #4ADE80; animation: cdr-glow-green 2s ease-in-out infinite; }
        .cdr-fo-node.failed      { background: rgba(248,113,113,0.15); }
        .cdr-fo-node.failed .cdr-fo-node-dot { background: #F87171; animation: cdr-pulse 0.8s ease infinite; }
        .cdr-fo-node.detecting   { background: rgba(250,204,21,0.06); }
        .cdr-fo-node.detecting .cdr-fo-node-dot { background: #FACC15; animation: cdr-pulse 0.8s ease infinite; }
        .cdr-fo-node.promoting   { background: rgba(108,182,255,0.08); border-color: rgba(108,182,255,0.3); }
        .cdr-fo-node.promoting .cdr-fo-node-dot { background: #6CB6FF; animation: cdr-pulse 0.6s ease infinite; }
        .cdr-fo-node.new-primary { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.4); }
        .cdr-fo-node.new-primary .cdr-fo-node-dot { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; }
        .cdr-fo-node.offline     { opacity: 0.3; }
        .cdr-fo-node.offline .cdr-fo-node-dot { background: #8B90A0; }
        .cdr-fo-node-role {
          margin-left: auto; font-size: 9px; font-weight: 700;
          padding: 1px 5px; border-radius: 3px; text-transform: uppercase;
        }
        .cdr-role-primary  { background: rgba(242,145,17,0.12); color: #F29111; }
        .cdr-role-replica  { background: var(--cd-border, rgba(255,255,255,0.05)); color: var(--cd-text-muted, #8B90A0); }
        .cdr-role-new      { background: rgba(74,222,128,0.12);  color: #4ADE80; }
        .cdr-role-elect    { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cdr-fo-summary {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(74,222,128,0.25);
          border-radius: 14px; padding: 20px 24px;
          display: flex; align-items: center; gap: 32px; flex-wrap: wrap;
        }
        .cdr-fo-metric { text-align: center; }
        .cdr-fo-metric-val {
          font-size: 28px; font-weight: 800;
          font-family: "JetBrains Mono", monospace; line-height: 1; margin-bottom: 4px;
        }
        .cdr-fo-metric-val.green  { color: #4ADE80; }
        .cdr-fo-metric-val.blue   { color: #6CB6FF; }
        .cdr-fo-metric-val.orange { color: #F29111; }
        .cdr-fo-metric-label { font-size: 11px; color: var(--cd-text-muted, #8B90A0); font-weight: 500; }
        .cdr-fo-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.08); }
        .cdr-fo-desc { flex: 1; font-size: 13px; color: var(--cd-text-muted, #8B90A0); min-width: 200px; }
        .cdr-fo-desc strong { color: var(--cd-text, #E8EAF0); }
        .cdr-traffic {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 16px 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .cdr-traffic-label { font-size: 12px; color: var(--cd-text-muted, #8B90A0); font-weight: 500; white-space: nowrap; }
        .cdr-traffic-track {
          flex: 1; height: 6px; background: rgba(255,255,255,0.08);
          border-radius: 3px; overflow: hidden;
        }
        .cdr-traffic-fill {
          height: 100%; border-radius: 3px; width: 100%;
          background: linear-gradient(90deg, #3fb950, #79c0ff, #3fb950);
          background-size: 200% 100%;
          animation: cdr-shimmer 2s linear infinite;
        }
        .cdr-traffic-status { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }
        /* ── Upgrade ── */
        .cdr-upgrade-grid {
          display: grid;
          grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr;
          gap: 8px; margin-bottom: 28px; align-items: start;
        }
        @media (max-width: 700px) {
          .cdr-upgrade-grid { grid-template-columns: 1fr 1fr; }
          .cdr-stage-arrow  { display: none; }
        }
        .cdr-stage {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 20px 16px;
        }
        .cdr-stage.highlight { border-color: #6CB6FF; }
        .cdr-stage-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 16px;
        }
        .cdr-stage-label span {
          background: var(--cd-border, rgba(255,255,255,0.06)); padding: 2px 8px; border-radius: 4px;
        }
        .cdr-pod-grid { display: flex; flex-direction: column; gap: 8px; }
        .cdr-pod {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px; border: 1px solid transparent;
          font-size: 12px; font-weight: 500;
          font-family: "JetBrains Mono", monospace; transition: 0.3s;
        }
        .cdr-pod-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cdr-pod.primary-old { background: rgba(242,145,17,0.08); border-color: rgba(242,145,17,0.3); }
        .cdr-pod.primary-old .cdr-pod-dot { background: #F29111; }
        .cdr-pod.primary-new { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 8px rgba(108,182,255,0.25); }
        .cdr-pod.primary-new .cdr-pod-dot { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cdr-pod.replica-old { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cdr-pod.replica-old .cdr-pod-dot { background: #8B90A0; }
        .cdr-pod.replica-new { background: rgba(108,182,255,0.06); border-color: rgba(108,182,255,0.3); }
        .cdr-pod.replica-new .cdr-pod-dot { background: #6CB6FF; }
        .cdr-pod.upgrading { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cdr-pod.upgrading .cdr-pod-dot { background: #FACC15; animation: cdr-pulse 1s ease infinite; }
        .cdr-pod-version {
          margin-left: auto; font-size: 10px; padding: 1px 6px;
          border-radius: 4px; font-weight: 600;
        }
        .cdr-v-old { background: var(--cd-border, rgba(255,255,255,0.06)); color: var(--cd-text-muted, #8B90A0); }
        .cdr-v-new { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cdr-v-upg { background: rgba(250,204,21,0.1); color: #FACC15; }
        .cdr-stage-arrow {
          display: flex; align-items: center; justify-content: center;
          color: var(--cd-text-muted, #8B90A0); font-size: 18px; padding-top: 40px;
        }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Built-in capabilities,{' '}
            <Box component="span" color="primary.main">declarative</Box>
            {' '}on Kubernetes
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            Backup, failover, scaling, and configuration — describe the desired state in YAML; KubeBlocks reconciles Redis for your chosen topology.
          </Typography>
        </Box>

        {/* Tab bar */}
        <Box sx={{ display: 'flex', gap: 1, mb: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tabs.map((tab, i) => (
            <Box key={i} component="button" onClick={() => setActiveTab(i)} sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 2.5, py: 1.25, border: '1px solid', borderRadius: '100px',
              cursor: 'pointer', fontSize: '14px', fontWeight: 500,
              transition: 'all 0.2s', fontFamily: 'inherit',
              borderColor: activeTab === i ? 'primary.main' : 'divider',
              bgcolor: activeTab === i ? 'rgba(108,182,255,0.12)' : 'transparent',
              color: activeTab === i ? 'primary.main' : 'text.secondary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}>
              {tab.label}
            </Box>
          ))}
        </Box>

        {/* ── Panel 0: Backup & Restore ── */}
        {activeTab === 0 && (
          <div className="cdr-card">
            <div className="cdr-header">
              <div className="cdr-icon cdr-icon-orange">BR</div>
              <div className="cdr-title-group">
                <div className="cdr-title">Backup &amp; Restore (RDB Snapshot)</div>
                <div className="cdr-desc">KubeBlocks triggers a BGSAVE on the primary, streams the RDB file to object storage, and restores to a new cluster from any saved snapshot — declarative, no cron scripts.</div>
              </div>
              <div className="cdr-badge cdr-badge-orange">Scheduled Backups</div>
            </div>

            <div className="cdr-tl-label">Snapshot Timeline</div>
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div className="cdr-tl-track">
                <div className="cdr-tl-fill"></div>
              </div>
              <div className="cdr-tl-events">
                <div className="cdr-tl-event" style={{ left: '10%' }}>
                  <div className="cdr-tl-dot snap"></div>
                  <div className="cdr-tl-tag snap">Snapshot</div>
                  <div className="cdr-tl-time">00:00</div>
                </div>
                <div className="cdr-tl-event" style={{ left: '35%' }}>
                  <div className="cdr-tl-dot snap"></div>
                  <div className="cdr-tl-tag snap">Snapshot</div>
                  <div className="cdr-tl-time">06:00</div>
                </div>
                <div className="cdr-tl-event" style={{ left: '60%' }}>
                  <div className="cdr-tl-dot snap"></div>
                  <div className="cdr-tl-tag snap">Snapshot</div>
                  <div className="cdr-tl-time">12:00</div>
                </div>
                <div className="cdr-tl-event" style={{ left: '85%' }}>
                  <div className="cdr-tl-dot target"></div>
                  <div className="cdr-tl-tag target">Restore Point</div>
                  <div className="cdr-tl-time">17:42</div>
                </div>
              </div>
            </div>

            <div className="cdr-restore">
              <div className="cdr-restore-step">
                <div className="cdr-restore-icon orange">1</div>
                <div className="cdr-restore-text">
                  <strong>1. Trigger BGSAVE</strong>
                  <span>KubeBlocks calls BGSAVE on the primary; Redis forks and writes a point-in-time RDB snapshot to disk</span>
                </div>
              </div>
              <div className="cdr-restore-arrow">→</div>
              <div className="cdr-restore-step">
                <div className="cdr-restore-icon blue">2</div>
                <div className="cdr-restore-text">
                  <strong>2. Upload to Object Storage</strong>
                  <span>RDB file streamed to S3 / GCS / OSS with encryption and versioning</span>
                </div>
              </div>
              <div className="cdr-restore-arrow">→</div>
              <div className="cdr-restore-step">
                <div className="cdr-restore-icon green">3</div>
                <div className="cdr-restore-text">
                  <strong>3. Restore &amp; Ready</strong>
                  <span>New cluster bootstraps from the RDB snapshot and returns to normal operation with updated endpoints</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Rolling Upgrade ── */}
        {activeTab === 1 && (
          <div className="cdr-card">
            <div className="cdr-header">
              <div className="cdr-icon cdr-icon-blue" style={{ background: 'rgba(108,182,255,0.12)' }}>RU</div>
              <div className="cdr-title-group">
                <div className="cdr-title">Rolling Version Upgrade</div>
                <div className="cdr-desc">Replicas are upgraded one by one. In Sentinel topology, a planned switchover promotes an upgraded replica to primary before the old primary is upgraded — traffic is served throughout.</div>
              </div>
              <div className="cdr-badge" style={{ background: 'rgba(108,182,255,0.12)', color: '#6CB6FF', border: '1px solid #6CB6FF' }}>Minimal cutover</div>
            </div>

            <div className="cdr-upgrade-grid">
              <div className="cdr-stage">
                <div className="cdr-stage-label"><span>Step 1 — Initial</span></div>
                <div className="cdr-pod-grid">
                  <div className="cdr-pod primary-old"><div className="cdr-pod-dot"></div>redis-0<div className="cdr-pod-version cdr-v-old">7.2.3</div></div>
                  <div className="cdr-pod replica-old"><div className="cdr-pod-dot"></div>redis-1<div className="cdr-pod-version cdr-v-old">7.2.3</div></div>
                  <div className="cdr-pod replica-old"><div className="cdr-pod-dot"></div>redis-2<div className="cdr-pod-version cdr-v-old">7.2.3</div></div>
                </div>
              </div>
              <div className="cdr-stage-arrow">›</div>
              <div className="cdr-stage highlight">
                <div className="cdr-stage-label"><span>Step 2 — Upgrade Replicas</span></div>
                <div className="cdr-pod-grid">
                  <div className="cdr-pod primary-old"><div className="cdr-pod-dot"></div>redis-0<div className="cdr-pod-version cdr-v-old">7.2.3</div></div>
                  <div className="cdr-pod replica-new"><div className="cdr-pod-dot"></div>redis-1<div className="cdr-pod-version cdr-v-new">7.2.6</div></div>
                  <div className="cdr-pod upgrading"><div className="cdr-pod-dot"></div>redis-2<div className="cdr-pod-version cdr-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cdr-stage-arrow">›</div>
              <div className="cdr-stage highlight">
                <div className="cdr-stage-label"><span>Step 3 — Switchover</span></div>
                <div className="cdr-pod-grid">
                  <div className="cdr-pod upgrading"><div className="cdr-pod-dot"></div>redis-0<div className="cdr-pod-version cdr-v-upg">switching…</div></div>
                  <div className="cdr-pod primary-new"><div className="cdr-pod-dot"></div>redis-1<div className="cdr-pod-version cdr-v-new">7.2.6 ★</div></div>
                  <div className="cdr-pod replica-new"><div className="cdr-pod-dot"></div>redis-2<div className="cdr-pod-version cdr-v-new">7.2.6</div></div>
                </div>
              </div>
              <div className="cdr-stage-arrow">›</div>
              <div className="cdr-stage">
                <div className="cdr-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cdr-pod-grid">
                  <div className="cdr-pod replica-new"><div className="cdr-pod-dot"></div>redis-0<div className="cdr-pod-version cdr-v-new">7.2.6</div></div>
                  <div className="cdr-pod primary-new"><div className="cdr-pod-dot"></div>redis-1<div className="cdr-pod-version cdr-v-new">7.2.6 ★</div></div>
                  <div className="cdr-pod replica-new"><div className="cdr-pod-dot"></div>redis-2<div className="cdr-pod-version cdr-v-new">7.2.6</div></div>
                </div>
              </div>
            </div>

            <div className="cdr-traffic">
              <div className="cdr-traffic-label">Application Traffic</div>
              <div className="cdr-traffic-track"><div className="cdr-traffic-fill"></div></div>
              <div className="cdr-traffic-status">✓ Always Serving</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Auto Failover ── */}
        {activeTab === 2 && (
          <div className="cdr-card">
            <div className="cdr-header">
              <div className="cdr-icon cdr-icon-green">HA</div>
              <div className="cdr-title-group">
                <div className="cdr-title">Sentinel Auto Failover</div>
                <div className="cdr-desc">Three Sentinel pods continuously monitor the primary. On failure, Sentinels reach quorum, elect the most up-to-date replica, and update Service endpoints — all within 30 seconds.</div>
              </div>
              <div className="cdr-badge cdr-badge-green">RTO &lt; 30s</div>
            </div>

            <div className="cdr-fo-timeline">
              <div className="cdr-fo-phase">
                <div className="cdr-fo-time"><div className="cdr-fo-time-dot green"></div>T+0s — Normal</div>
                <div className="cdr-fo-card phase-0">
                  <div className="cdr-fo-card-title green">Healthy</div>
                  <div className="cdr-fo-nodes">
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>redis-0<div className="cdr-fo-node-role cdr-role-primary">Primary</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>redis-1<div className="cdr-fo-node-role cdr-role-replica">Replica</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>sentinel×3<div className="cdr-fo-node-role cdr-role-replica">Watching</div></div>
                  </div>
                </div>
              </div>
              <div className="cdr-fo-phase">
                <div className="cdr-fo-time"><div className="cdr-fo-time-dot red"></div>T+1s — Failure</div>
                <div className="cdr-fo-card phase-1">
                  <div className="cdr-fo-card-title red">Node Down</div>
                  <div className="cdr-fo-nodes">
                    <div className="cdr-fo-node failed"><div className="cdr-fo-node-dot"></div>redis-0<div className="cdr-fo-node-role cdr-role-primary">Failed</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>redis-1<div className="cdr-fo-node-role cdr-role-replica">Replica</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>sentinel×3<div className="cdr-fo-node-role cdr-role-replica">Pinging</div></div>
                  </div>
                </div>
              </div>
              <div className="cdr-fo-phase">
                <div className="cdr-fo-time"><div className="cdr-fo-time-dot yellow"></div>T+5s — Detect</div>
                <div className="cdr-fo-card phase-2">
                  <div className="cdr-fo-card-title yellow">SDOWN→ODOWN</div>
                  <div className="cdr-fo-nodes">
                    <div className="cdr-fo-node detecting"><div className="cdr-fo-node-dot"></div>redis-0<div className="cdr-fo-node-role cdr-role-primary">Unreachable</div></div>
                    <div className="cdr-fo-node detecting"><div className="cdr-fo-node-dot"></div>redis-1<div className="cdr-fo-node-role cdr-role-elect">Candidate</div></div>
                    <div className="cdr-fo-node detecting"><div className="cdr-fo-node-dot"></div>quorum 2/3<div className="cdr-fo-node-role cdr-role-elect">Agreed</div></div>
                  </div>
                </div>
              </div>
              <div className="cdr-fo-phase">
                <div className="cdr-fo-time"><div className="cdr-fo-time-dot blue"></div>T+15s — Promote</div>
                <div className="cdr-fo-card phase-3">
                  <div className="cdr-fo-card-title blue">Promoting</div>
                  <div className="cdr-fo-nodes">
                    <div className="cdr-fo-node offline"><div className="cdr-fo-node-dot"></div>redis-0<div className="cdr-fo-node-role cdr-role-replica">Offline</div></div>
                    <div className="cdr-fo-node promoting"><div className="cdr-fo-node-dot"></div>redis-1<div className="cdr-fo-node-role cdr-role-elect">Promoting…</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>sentinel×3<div className="cdr-fo-node-role cdr-role-replica">Coordinating</div></div>
                  </div>
                </div>
              </div>
              <div className="cdr-fo-phase">
                <div className="cdr-fo-time"><div className="cdr-fo-time-dot green"></div>T+28s — Recovered</div>
                <div className="cdr-fo-card phase-4">
                  <div className="cdr-fo-card-title green">Healthy</div>
                  <div className="cdr-fo-nodes">
                    <div className="cdr-fo-node offline"><div className="cdr-fo-node-dot"></div>redis-0<div className="cdr-fo-node-role cdr-role-replica">Rebuilding</div></div>
                    <div className="cdr-fo-node new-primary"><div className="cdr-fo-node-dot"></div>redis-1<div className="cdr-fo-node-role cdr-role-new">Primary ★</div></div>
                    <div className="cdr-fo-node healthy"><div className="cdr-fo-node-dot"></div>sentinel×3<div className="cdr-fo-node-role cdr-role-replica">Updated</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cdr-fo-summary">
              <div className="cdr-fo-metric">
                <div className="cdr-fo-metric-val green">&lt; 30s</div>
                <div className="cdr-fo-metric-label">Recovery Time (RTO)</div>
              </div>
              <div className="cdr-fo-divider"></div>
              <div className="cdr-fo-metric">
                <div className="cdr-fo-metric-val blue">0</div>
                <div className="cdr-fo-metric-label">Manual Steps Required</div>
              </div>
              <div className="cdr-fo-divider"></div>
              <div className="cdr-fo-metric">
                <div className="cdr-fo-metric-val orange">Sentinel</div>
                <div className="cdr-fo-metric-label">HA Mechanism</div>
              </div>
              <div className="cdr-fo-divider"></div>
              <div className="cdr-fo-desc">
                <strong>No human intervention needed.</strong> Three Sentinel pods continuously monitor cluster health, automatically elect the most up-to-date replica as the new primary, and KubeBlocks updates the Service selector — all without a single kubectl command.
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'High Availability & Scaling',
    color: '#DC2626',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove replicas online without downtime — KubeBlocks handles topology reconfiguration automatically.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running instances with a rolling strategy.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts with minimal disruption to active connections.' },
      { title: 'Planned Switchover', desc: 'Promote a specific replica to primary on demand — via SENTINEL FAILOVER in Sentinel topology.' },
      { title: 'Stop / Start', desc: 'Suspend clusters to eliminate compute cost; resume with full state restored.' },
    ],
  },
  {
    title: 'Configuration, Security & Observability',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune Redis parameters via OpsRequest — changes applied without restart where supported.' },
      { title: 'TLS Encryption', desc: 'Enable, rotate, or disable in-flight encryption without downtime.' },
      { title: 'ACL Management', desc: 'Declarative user and permission management via Kubernetes — synced across all replicas automatically.' },
      { title: 'Password Management', desc: 'Rotate credentials stored in Kubernetes Secrets with automatic propagation.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrades across Redis minor versions, with cross-major support (e.g., 7 → 8).' },
      { title: 'Prometheus Metrics', desc: 'Per-instance metrics via redis-exporter, with pre-built Grafana dashboards.' },
    ],
  },
];

function LifecycleFeatures() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardBorder = theme.palette.divider;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={7}>
          <SectionEyebrow label="Day-2 Operations" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Every Operation Declared as a{' '}
            <Box component="span" color="primary.main">Kubernetes Resource</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}>
            No SSH into pods, no shell scripts. Submit an OpsRequest and KubeBlocks handles the rest.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {lifecycleCategories.map(({ title, color, items }) => (
            <Box key={title}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2, borderBottom: `2px solid ${alpha(color, 0.3)}` }}>
                <Box sx={{ width: 4, height: 20, borderRadius: 2, bgcolor: color }} />
                <Typography fontWeight={700} fontSize="0.9rem" sx={{ color: isDark ? '#f0f6fc' : 'text.primary' }}>
                  {title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {items.map(({ title: featureTitle, desc }, idx) => (
                  <Box
                    key={featureTitle}
                    sx={{
                      display: 'flex', gap: 2, py: 2,
                      borderBottom: idx < items.length - 1 ? `1px solid ${cardBorder}` : 'none',
                      transition: 'background .15s', borderRadius: 1, px: 1, mx: -1,
                      '&:hover': { bgcolor: isDark ? alpha('#fff', 0.03) : alpha('#000', 0.02) },
                    }}
                  >
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: '1px',
                      bgcolor: alpha(color, 0.1),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color, fontWeight: 800,
                    }}>
                      ✓
                    </Box>
                    <Box>
                      <Typography fontWeight={600} fontSize="0.88rem" mb={0.4}>{featureTitle}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6 }}>
                        {desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ── 6. Blog ───────────────────────────────────────────────────────────────────

const redisPosts = [
  {
    title: 'Redis Operatorization — Ready Yet?',
    description: 'HA, persistence, sharding challenges — and why Redis on Kubernetes is harder than it looks.',
    image: '/img/blogs/thumbnails/blog-redis-containerization.png',
    href: '/blog/redis-operatorization-ready-yet',
  },
  {
    title: 'Large-Scale Redis Migration from Bare Metal to Kubernetes',
    description: 'How Kuaishou migrated thousands of Redis instances to Kubernetes and improved resource utilisation.',
    image: '/img/blogs/thumbnails/blog-kubecon-kuaishou.png',
    href: '/blog/migrate-redis-at-kuaishou-from-bare-metal-to-k8s',
  },
  {
    title: 'Mastering Redis Network Modes in Kubernetes',
    description: 'Headless Service, HostNetwork, NodePort, LoadBalancer — which network mode fits your Redis deployment.',
    image: '/img/blogs/thumbnails/blog-redis-network-modes.png',
    href: '/blog/5-network-modes-for-kubeblocks-for-redis',
  },
];

function RedisBlogPosts() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="From the Blog" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Go Deeper on{' '}
            <Box component="span" color="primary.main">Redis on Kubernetes</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {redisPosts.map((post) => (
            <Card key={post.href} sx={{ boxShadow: 'none', border: 1, borderColor: 'divider' }}>
              <CardActionArea component="a" href={post.href}>
                <Box sx={{ height: 160, width: '100%', position: 'relative' }}>
                  <Image fill src={post.image} alt={post.title} style={{ objectFit: 'cover' }} />
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom fontWeight={600}
                    sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ height: 40, overflow: 'hidden' }}>
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ── 7. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'Redis & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks Redis Operator,{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Risk-Free.</Box>
          </Typography>

          <Typography
            sx={{ fontSize: '1.05rem', color: 'text.secondary', maxWidth: 520, lineHeight: 1.75, mb: 4 }}
          >
            Open source and production-ready. Enterprise customers get dedicated onboarding,
            migration support, and SLA-backed support.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={4}>
            <Button
              variant="contained" size="large"
              href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
              target="_blank" rel="noopener noreferrer"
              sx={{ fontWeight: 700, px: 3.5, py: 1.5, fontSize: '0.95rem' }}
            >
              Try Playground Free →
            </Button>
            <Button
              variant="outlined" size="large"
              href="https://kubeblocks.com/contact"
              target="_blank" rel="noopener noreferrer"
              sx={{ fontWeight: 500, px: 3.5, py: 1.5, fontSize: '0.95rem' }}
            >
              Talk to the Team
            </Button>
          </Stack>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, sm: 3 }}>
            {checks.map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.82rem', color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#34d399', fontWeight: 700 }}>✓</Box>
                {item}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function RedisOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topologies />
      <ComparisonTable />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <RedisBlogPosts />
      <CTA />
    </Box>
  );
}
