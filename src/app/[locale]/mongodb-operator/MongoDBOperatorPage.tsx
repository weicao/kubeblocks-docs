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
import MongodbArchitectureDiagram from '@/components/MongodbArchitectureDiagram';
import MongodbShardingArchitectureDiagram from '@/components/MongodbShardingArchitectureDiagram';

// ── Shared helpers ─────────────────────────────────────────────────────────────

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

// ── 1. Hero ────────────────────────────────────────────────────────────────────

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
              KubeBlocks MongoDB Operator{' '}
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
              Deploy production-grade MongoDB clusters in minutes. ReplicaSet HA,
              sharding, backup & restore, and full Day-2 operations — all via a
              unified Kubernetes API.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={7}>
              <Button
                variant="contained"
                href="/docs/preview/kubeblocks-for-mongodb/02-quickstart"
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 700 }}
              >
                Get Started Free →
              </Button>
              <Button
                variant="outlined"
                href="/docs/preview/kubeblocks-for-mongodb"
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
                { value: '0', label: 'RPO (w:majority)' },
                { value: '< 30s', label: 'Failover RTO' },
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
                Deploy MongoDB in 3 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a ReplicaSet Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mongodb-cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>namespace</span>{': '}
                <span style={{ color: '#a5d6ff' }}>demo{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mongodb{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>replicaset{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>componentSpecs</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mongodb{'\n'}</span>
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
                {'kubectl get cluster mongodb-cluster -n demo\n\n'}
                <span style={{ color: '#6e7681' }}>{'NAME              CLUSTER-DEFINITION  STATUS   AGE\n'}</span>
                <span style={{ color: '#3fb950' }}>{'mongodb-cluster   mongodb             Running  2m'}</span>
              </Box>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 2. Topologies ──────────────────────────────────────────────────────────────

const topoData = [
  {
    name: 'ReplicaSet',
    badgeColor: '#16A34A',
    tags: ['Automatic Failover', 'Majority Election', 'Read Scale-out'],
    desc: 'One primary handles all writes while one or more secondaries replicate via the oplog. On primary failure, the remaining nodes hold an election — the member with the most up-to-date oplog and a majority of votes is promoted. Failover typically completes within 10–30 seconds.',
    features: [
      'Majority-vote election — no external coordinator required',
      'Automatic promotion of the most up-to-date secondary',
      'Read scale-out via secondary endpoints',
      'Writes route via a role-aware ClusterIP service',
      'w:majority write concern for stronger durability of acknowledged writes',
    ],
    diagram: <MongodbArchitectureDiagram />,
  },
  {
    name: 'Sharding',
    badgeColor: '#7C3AED',
    tags: ['Horizontal Sharding', 'Independent Shard Failover', 'Mongos Routing'],
    desc: 'Data is distributed across independent shard replica sets. Mongos routers handle query routing and chunk management. A 3-node Config Server Replica Set (CSRS) stores the routing metadata. Each shard fails over independently — there is no single point of failure.',
    features: [
      'Mongos routers for transparent query routing across shards',
      'Config Server Replica Set (CSRS) for chunk metadata',
      'Each shard is an independent replica set with its own failover',
      'Shard key-based data distribution; online shard balancing',
      'Horizontal write scalability — add shards and rebalance online',
    ],
    diagram: <MongodbShardingArchitectureDiagram />,
  },
];

function Topologies() {
  const [tab, setTab] = useState(0);
  const topo = topoData[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="MongoDB Topologies" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Every MongoDB Topology.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            From a 3-node ReplicaSet to a sharded cluster —
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

            {/* Tags */}
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

// ── 3. Comparison Table ────────────────────────────────────────────────────────

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
    { feature: 'Open Source',                 kb: YES,  percona: YES,  community: YES  },
    { feature: 'ReplicaSet HA',               kb: YES,  percona: YES,  community: YES  },
    { feature: 'Sharding',                    kb: YES,  percona: YES,  community: YES  },
    { feature: 'TLS encryption',              kb: YES,  percona: YES,  community: YES  },
    { feature: 'TLS rotation',                 kb: YES,  percona: YES,  community: PART },
    { feature: 'Backup (physical)',           kb: YES,  percona: YES,  community: NO   },
    { feature: 'Scheduled backup',            kb: YES,  percona: YES,  community: NO   },
    { feature: 'Restore from backup',         kb: YES,  percona: YES,  community: NO   },
    { feature: 'PITR (oplog streaming)',      kb: YES,  percona: YES,  community: NO   },
    { feature: 'Horizontal scaling',          kb: YES,  percona: YES,  community: YES  },
    { feature: 'Vertical scaling',            kb: YES,  percona: YES,  community: YES  },
    { feature: 'Volume expansion',            kb: YES,  percona: YES,  community: YES  },
    { feature: 'Dynamic config',              kb: YES,  percona: YES,  community: PART },
    { feature: 'Prometheus metrics',           kb: YES,  percona: YES,  community: NO   },
    { feature: 'Minor Upgrade',               kb: YES,  percona: YES,  community: PART },
    { feature: 'Major Upgrade',
      kb: <Box>{ENT}<Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Via blue-green deployment</Typography></Box>,
      percona: PART, community: NO },
    { feature: 'Cross-cluster DR (standby)',  kb: ENT,  percona: NO,   community: NO   },
    { feature: 'Bootstrap from external MongoDB', kb: ENT, percona: NO, community: NO  },
    { feature: 'User & role management',       kb: ENT,  percona: YES,  community: YES  },
    { feature: 'Web management UI',           kb: ENT,  percona: NO,   community: NO   },
  ];

  const cols = [
    { label: 'KubeBlocks', highlight: true },
    { label: 'Percona Operator', highlight: false },
    { label: 'MongoDB Community Operator', highlight: false },
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
            <Box component="span" color="primary.main">Other MongoDB Solutions</Box>
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
                    width: '28%',
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
                      width: '18%',
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {rows.map(({ feature, kb, percona, community }) => (
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
                  {[kb, percona, community].map((val, j) => (
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

// ── 4. Capabilities Diagrams ───────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { label: 'Backup & PITR' },
    { label: 'Minor Rolling Upgrade' },
    { label: 'Auto Failover' },
  ];

  return (
    <Box component="section"
      style={{
        '--cmg-card-bg':    theme.palette.background.paper,
        '--cmg-box-bg':     theme.palette.mode === 'dark' ? '#252840' : theme.palette.action.hover,
        '--cmg-text':       theme.palette.text.primary,
        '--cmg-text-muted': theme.palette.text.secondary,
        '--cmg-border':     theme.palette.divider,
      } as React.CSSProperties}
      sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <style>{`
        .cmg * { box-sizing: border-box; }
        @keyframes cmg-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cmg-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes cmg-glow-green {
          0%, 100% { box-shadow: 0 0 6px #4ADE80; }
          50%       { box-shadow: 0 0 14px #4ADE80, 0 0 4px #4ADE80; }
        }
        @keyframes cmg-glow-target {
          0%, 100% { box-shadow: 0 0 10px #4ADE80; }
          50%       { box-shadow: 0 0 20px #4ADE80, 0 0 8px #4ADE80; }
        }
        /* card */
        .cmg-card {
          background: var(--cmg-card-bg); border: 1px solid var(--cmg-border);
          border-radius: 20px; padding: 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--cmg-text);
        }
        @media (max-width: 600px) { .cmg-card { padding: 24px 16px; } }
        /* header */
        .cmg-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 36px; gap: 16px; flex-wrap: wrap; }
        .cmg-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cmg-icon-orange { background: rgba(251,146,60,0.12); }
        .cmg-icon-blue   { background: rgba(108,182,255,0.12); }
        .cmg-icon-green  { background: rgba(74,222,128,0.12); }
        .cmg-title-group { flex: 1; }
        .cmg-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .cmg-desc  { font-size: 14px; color: var(--cmg-text-muted); line-height: 1.6; }
        .cmg-badge { padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .cmg-badge-orange { background: rgba(251,146,60,0.12); color: #fb923c; border: 1px solid #fb923c; }
        .cmg-badge-blue   { background: rgba(108,182,255,0.12); color: #6CB6FF; border: 1px solid #6CB6FF; }
        .cmg-badge-green  { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        /* ── Backup timeline ── */
        .cmg-tl-label { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cmg-text-muted); margin-bottom: 20px; }
        .cmg-tl-track { position: relative; height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; }
        .cmg-tl-fill { position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, #fb923c, #6CB6FF); border-radius: 4px; width: 100%; }
        .cmg-tl-events { position: relative; height: 100px; margin-top: -2px; }
        .cmg-tl-event { position: absolute; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .cmg-tl-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #16181f; position: relative; z-index: 2; margin-top: -5px; }
        .cmg-tl-dot.snap   { background: #fb923c; box-shadow: 0 0 10px #fb923c; }
        .cmg-tl-dot.target { background: #4ADE80; width: 18px; height: 18px; margin-top: -7px; animation: cmg-glow-target 1.8s ease-in-out infinite; }
        .cmg-tl-tag { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; white-space: nowrap; }
        .cmg-tl-tag.snap   { background: rgba(251,146,60,0.12); color: #fb923c; border: 1px solid #fb923c; }
        .cmg-tl-tag.target { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        .cmg-tl-time { font-size: 11px; color: var(--cmg-text-muted); font-family: "JetBrains Mono", monospace; }
        /* restore */
        .cmg-restore { background: var(--cmg-box-bg); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .cmg-restore-step { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 150px; }
        .cmg-restore-icon { width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0; }
        .cmg-restore-icon.orange { background: rgba(251,146,60,0.12); }
        .cmg-restore-icon.blue   { background: rgba(108,182,255,0.12); }
        .cmg-restore-icon.green  { background: rgba(74,222,128,0.12); }
        .cmg-restore-text strong { display: block; font-size: 13px; font-weight: 600; }
        .cmg-restore-text span   { font-size: 12px; color: var(--cmg-text-muted); }
        .cmg-restore-arrow { color: var(--cmg-text-muted); font-size: 20px; flex-shrink: 0; }
        .cmg-snap-badge { margin-left: auto; background: rgba(74,222,128,0.12); border: 1px solid #4ADE80; color: #4ADE80; border-radius: 100px; padding: 6px 16px; font-size: 13px; font-weight: 700; white-space: nowrap; }
        /* ── Upgrade ── */
        .cmg-upgrade-grid { display: grid; grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr; gap: 8px; margin-bottom: 28px; align-items: start; }
        @media (max-width: 700px) { .cmg-upgrade-grid { grid-template-columns: 1fr 1fr; } .cmg-stage-arrow { display: none; } }
        .cmg-stage { background: var(--cmg-box-bg); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 16px; }
        .cmg-stage.highlight { border-color: #6CB6FF; }
        .cmg-stage-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cmg-text-muted); margin-bottom: 16px; }
        .cmg-stage-label span { background: var(--cmg-border, rgba(255,255,255,0.06)); padding: 2px 8px; border-radius: 4px; }
        .cmg-pod-grid { display: flex; flex-direction: column; gap: 8px; }
        .cmg-pod { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; border: 1px solid transparent; font-size: 12px; font-weight: 500; font-family: "JetBrains Mono", monospace; transition: 0.3s; }
        .cmg-pod-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cmg-pod.primary-old   { background: rgba(251,146,60,0.08);  border-color: rgba(251,146,60,0.3); }
        .cmg-pod.primary-old .cmg-pod-dot { background: #fb923c; }
        .cmg-pod.primary-new   { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 8px rgba(108,182,255,0.25); }
        .cmg-pod.primary-new .cmg-pod-dot { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cmg-pod.secondary-old { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cmg-pod.secondary-old .cmg-pod-dot { background: #8B90A0; }
        .cmg-pod.secondary-new { background: rgba(108,182,255,0.06); border-color: rgba(108,182,255,0.3); }
        .cmg-pod.secondary-new .cmg-pod-dot { background: #6CB6FF; }
        .cmg-pod.upgrading { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cmg-pod.upgrading .cmg-pod-dot { background: #FACC15; animation: cmg-pulse 1s ease infinite; }
        .cmg-pod-version { margin-left: auto; font-size: 10px; padding: 1px 6px; border-radius: 4px; font-weight: 600; }
        .cmg-v-old { background: var(--cmg-border, rgba(255,255,255,0.06)); color: var(--cmg-text-muted); }
        .cmg-v-new { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cmg-v-upg { background: rgba(250,204,21,0.1);  color: #FACC15; }
        .cmg-stage-arrow { display: flex; align-items: center; justify-content: center; color: var(--cmg-text-muted); font-size: 18px; padding-top: 40px; }
        .cmg-traffic { background: var(--cmg-box-bg); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; }
        .cmg-traffic-label { font-size: 12px; color: var(--cmg-text-muted); font-weight: 500; white-space: nowrap; }
        .cmg-traffic-track { flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .cmg-traffic-fill { height: 100%; border-radius: 3px; width: 100%; background: linear-gradient(90deg, #3fb950, #79c0ff, #3fb950); background-size: 200% 100%; animation: cmg-shimmer 2s linear infinite; }
        .cmg-traffic-status { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }
        /* ── Failover ── */
        .cmg-fo-timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 32px; position: relative; }
        @media (max-width: 700px) { .cmg-fo-timeline { grid-template-columns: 1fr; } }
        .cmg-fo-phase { position: relative; padding: 0 8px; }
        .cmg-fo-phase::after { content: ""; position: absolute; right: -1px; top: 24px; width: 2px; height: 32px; background: var(--cmg-border); }
        .cmg-fo-phase:last-child::after { display: none; }
        .cmg-fo-time { font-size: 11px; font-family: "JetBrains Mono", monospace; color: var(--cmg-text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .cmg-fo-time-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cmg-fo-time-dot.green  { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; animation: cmg-glow-green 2s ease-in-out infinite; }
        .cmg-fo-time-dot.red    { background: #F87171; box-shadow: 0 0 6px #F87171; }
        .cmg-fo-time-dot.yellow { background: #FACC15; box-shadow: 0 0 6px #FACC15; }
        .cmg-fo-time-dot.blue   { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cmg-fo-card { background: var(--cmg-card-bg); border: 1px solid var(--cmg-border); border-radius: 10px; padding: 14px 12px; font-size: 12px; }
        .cmg-fo-card.phase-1 { border-color: rgba(248,113,113,0.25); }
        .cmg-fo-card.phase-2 { border-color: rgba(250,204,21,0.2); }
        .cmg-fo-card.phase-3 { border-color: rgba(108,182,255,0.2); }
        .cmg-fo-card.phase-4 { border-color: rgba(74,222,128,0.3); }
        .cmg-fo-card-title { font-weight: 700; font-size: 12px; margin-bottom: 10px; }
        .cmg-fo-card-title.red    { color: #F87171; }
        .cmg-fo-card-title.yellow { color: #FACC15; }
        .cmg-fo-card-title.blue   { color: #6CB6FF; }
        .cmg-fo-card-title.green  { color: #4ADE80; }
        .cmg-fo-nodes { display: flex; flex-direction: column; gap: 6px; }
        .cmg-fo-node { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-family: "JetBrains Mono", monospace; border: 1px solid transparent; }
        .cmg-fo-node-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cmg-fo-node.healthy     { background: rgba(74,222,128,0.06); }
        .cmg-fo-node.healthy .cmg-fo-node-dot { background: #4ADE80; animation: cmg-glow-green 2s ease-in-out infinite; }
        .cmg-fo-node.failed      { background: rgba(248,113,113,0.15); }
        .cmg-fo-node.failed .cmg-fo-node-dot { background: #F87171; animation: cmg-pulse 0.8s ease infinite; }
        .cmg-fo-node.detecting   { background: rgba(250,204,21,0.06); }
        .cmg-fo-node.detecting .cmg-fo-node-dot { background: #FACC15; animation: cmg-pulse 0.8s ease infinite; }
        .cmg-fo-node.promoting   { background: rgba(108,182,255,0.08); border-color: rgba(108,182,255,0.3); }
        .cmg-fo-node.promoting .cmg-fo-node-dot { background: #6CB6FF; animation: cmg-pulse 0.6s ease infinite; }
        .cmg-fo-node.new-primary { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.4); }
        .cmg-fo-node.new-primary .cmg-fo-node-dot { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; }
        .cmg-fo-node.offline     { opacity: 0.3; }
        .cmg-fo-node.offline .cmg-fo-node-dot { background: #8B90A0; }
        .cmg-fo-node-role { margin-left: auto; font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 3px; text-transform: uppercase; }
        .cmg-role-primary { background: rgba(251,146,60,0.12); color: #fb923c; }
        .cmg-role-secondary { background: var(--cmg-border, rgba(255,255,255,0.05)); color: var(--cmg-text-muted); }
        .cmg-role-new     { background: rgba(74,222,128,0.12); color: #4ADE80; }
        .cmg-role-elect   { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        /* summary */
        .cmg-fo-summary { background: var(--cmg-box-bg); border: 1px solid rgba(74,222,128,0.25); border-radius: 14px; padding: 20px 24px; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
        .cmg-fo-metric { text-align: center; }
        .cmg-fo-metric-val { font-size: 28px; font-weight: 800; font-family: "JetBrains Mono", monospace; line-height: 1; margin-bottom: 4px; }
        .cmg-fo-metric-val.green  { color: #4ADE80; }
        .cmg-fo-metric-val.blue   { color: #6CB6FF; }
        .cmg-fo-metric-val.orange { color: #fb923c; font-size: 18px; }
        .cmg-fo-metric-label { font-size: 11px; color: var(--cmg-text-muted); font-weight: 500; }
        .cmg-fo-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.08); }
        .cmg-fo-desc { flex: 1; font-size: 13px; color: var(--cmg-text-muted); min-width: 200px; line-height: 1.6; }
        .cmg-fo-desc strong { color: var(--cmg-text); }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production MongoDB</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            Backup, failover, scaling, and configuration — describe the desired state in YAML; KubeBlocks reconciles MongoDB for your chosen topology.
          </Typography>
        </Box>

        {/* Tab bar */}
        <Box sx={{ display: 'flex', gap: 1, mb: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tabs.map((tab, i) => (
            <Box key={i} component="button" onClick={() => setActiveTab(i)} sx={{
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

        {/* ── Panel 0: Backup & PITR ── */}
        {activeTab === 0 && (
          <div className="cmg-card">
            <div className="cmg-header">
              <div className="cmg-icon cmg-icon-orange"></div>
              <div className="cmg-title-group">
                <div className="cmg-title">Backup &amp; PITR</div>
                <div className="cmg-desc">KubeBlocks takes scheduled full backups on a secondary and continuously archives the oplog to object storage. Restore to any second within the retention window — not just snapshot points.</div>
              </div>
              <div className="cmg-badge cmg-badge-orange">PITR · Minute-level RPO</div>
            </div>

            <div className="cmg-tl-label">Full Backup + Continuous Oplog Coverage</div>
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div className="cmg-tl-track">
                <div className="cmg-tl-fill"></div>
              </div>
              {/* Oplog coverage band */}
              <div style={{ position: 'absolute', left: '10%', right: '15%', top: '-1px', height: '6px', background: 'rgba(108,182,255,0.15)', borderRadius: '3px', pointerEvents: 'none' }}></div>
              <div className="cmg-tl-events">
                <div className="cmg-tl-event" style={{ left: '10%' }}>
                  <div className="cmg-tl-dot snap"></div>
                  <div className="cmg-tl-tag snap">Full Backup</div>
                  <div className="cmg-tl-time">00:00</div>
                </div>
                <div className="cmg-tl-event" style={{ left: '38%' }}>
                  <div className="cmg-tl-dot snap"></div>
                  <div className="cmg-tl-tag snap">Full Backup</div>
                  <div className="cmg-tl-time">06:00</div>
                </div>
                <div className="cmg-tl-event" style={{ left: '65%' }}>
                  <div className="cmg-tl-dot snap"></div>
                  <div className="cmg-tl-tag snap">Full Backup</div>
                  <div className="cmg-tl-time">12:00</div>
                </div>
                <div className="cmg-tl-event" style={{ left: '85%' }}>
                  <div className="cmg-tl-dot target"></div>
                  <div className="cmg-tl-tag target">PITR Restore</div>
                  <div className="cmg-tl-time">16:23</div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-28px', left: 0, right: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--cmg-text-muted)' }}>
                <div style={{ width: '10px', height: '3px', borderRadius: '2px', background: 'rgba(108,182,255,0.5)', flexShrink: 0 }}></div>
                <span>Oplog archived continuously (every ~5 min) — restore to any point between full backups</span>
              </div>
            </div>

            <div className="cmg-restore">
              <div className="cmg-restore-step">
                <div className="cmg-restore-icon orange"></div>
                <div className="cmg-restore-text">
                  <strong>1. Restore Full Backup</strong>
                  <span>Load nearest snapshot from object storage onto a secondary</span>
                </div>
              </div>
              <div className="cmg-restore-arrow">→</div>
              <div className="cmg-restore-step">
                <div className="cmg-restore-icon blue"></div>
                <div className="cmg-restore-text">
                  <strong>2. Replay Oplog</strong>
                  <span>Apply archived oplog entries up to the exact target timestamp</span>
                </div>
              </div>
              <div className="cmg-restore-arrow">→</div>
              <div className="cmg-restore-step">
                <div className="cmg-restore-icon green"></div>
                <div className="cmg-restore-text">
                  <strong>3. Cluster Ready</strong>
                  <span>New replica set is consistent at the chosen point in time</span>
                </div>
              </div>
              <div className="cmg-snap-badge">✓ PITR · Minute-level RPO</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Rolling Upgrade ── */}
        {activeTab === 1 && (
          <div className="cmg-card">
            <div className="cmg-header">
              <div className="cmg-icon cmg-icon-blue"></div>
              <div className="cmg-title-group">
                <div className="cmg-title">Minor Rolling Upgrade</div>
                <div className="cmg-desc">Secondaries are upgraded one by one. Once all secondaries are on the new version, the primary steps down, a secondary is elected as the new primary, and the old primary is upgraded last. Traffic is served throughout.</div>
              </div>
              <div className="cmg-badge cmg-badge-blue">Minimal Cutover</div>
            </div>

            <div className="cmg-upgrade-grid">
              <div className="cmg-stage">
                <div className="cmg-stage-label"><span>Step 1 — Initial State</span></div>
                <div className="cmg-pod-grid">
                  <div className="cmg-pod primary-old"><div className="cmg-pod-dot"></div>mongo-0<div className="cmg-pod-version cmg-v-old">7.0.5</div></div>
                  <div className="cmg-pod secondary-old"><div className="cmg-pod-dot"></div>mongo-1<div className="cmg-pod-version cmg-v-old">7.0.5</div></div>
                  <div className="cmg-pod secondary-old"><div className="cmg-pod-dot"></div>mongo-2<div className="cmg-pod-version cmg-v-old">7.0.5</div></div>
                </div>
              </div>
              <div className="cmg-stage-arrow">›</div>
              <div className="cmg-stage highlight">
                <div className="cmg-stage-label"><span>Step 2 — Upgrade Secondaries</span></div>
                <div className="cmg-pod-grid">
                  <div className="cmg-pod primary-old"><div className="cmg-pod-dot"></div>mongo-0<div className="cmg-pod-version cmg-v-old">7.0.5</div></div>
                  <div className="cmg-pod secondary-new"><div className="cmg-pod-dot"></div>mongo-1<div className="cmg-pod-version cmg-v-new">7.0.9</div></div>
                  <div className="cmg-pod upgrading"><div className="cmg-pod-dot"></div>mongo-2<div className="cmg-pod-version cmg-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cmg-stage-arrow">›</div>
              <div className="cmg-stage highlight">
                <div className="cmg-stage-label"><span>Step 3 — Primary Stepdown</span></div>
                <div className="cmg-pod-grid">
                  <div className="cmg-pod upgrading"><div className="cmg-pod-dot"></div>mongo-0<div className="cmg-pod-version cmg-v-upg">upgrading…</div></div>
                  <div className="cmg-pod primary-new"><div className="cmg-pod-dot"></div>mongo-1<div className="cmg-pod-version cmg-v-new">7.0.9 ★</div></div>
                  <div className="cmg-pod secondary-new"><div className="cmg-pod-dot"></div>mongo-2<div className="cmg-pod-version cmg-v-new">7.0.9</div></div>
                </div>
              </div>
              <div className="cmg-stage-arrow">›</div>
              <div className="cmg-stage">
                <div className="cmg-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cmg-pod-grid">
                  <div className="cmg-pod secondary-new"><div className="cmg-pod-dot"></div>mongo-0<div className="cmg-pod-version cmg-v-new">7.0.9</div></div>
                  <div className="cmg-pod primary-new"><div className="cmg-pod-dot"></div>mongo-1<div className="cmg-pod-version cmg-v-new">7.0.9 ★</div></div>
                  <div className="cmg-pod secondary-new"><div className="cmg-pod-dot"></div>mongo-2<div className="cmg-pod-version cmg-v-new">7.0.9</div></div>
                </div>
              </div>
            </div>

            <div className="cmg-traffic">
              <div className="cmg-traffic-label">Application Traffic</div>
              <div className="cmg-traffic-track"><div className="cmg-traffic-fill"></div></div>
              <div className="cmg-traffic-status">✓ Always Serving</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Auto Failover ── */}
        {activeTab === 2 && (
          <div className="cmg-card">
            <div className="cmg-header">
              <div className="cmg-icon cmg-icon-green"></div>
              <div className="cmg-title-group">
                <div className="cmg-title">Majority-Vote Auto Failover</div>
                <div className="cmg-desc">Secondaries continuously ping the primary. On failure, the secondary with the most up-to-date oplog calls an election — a majority vote promotes it to primary automatically.</div>
              </div>
              <div className="cmg-badge cmg-badge-green">RTO &lt; 30s</div>
            </div>

            <div className="cmg-fo-timeline">
              <div className="cmg-fo-phase">
                <div className="cmg-fo-time"><div className="cmg-fo-time-dot red"></div>T+1s — Failure</div>
                <div className="cmg-fo-card phase-1">
                  <div className="cmg-fo-card-title red">Node Down</div>
                  <div className="cmg-fo-nodes">
                    <div className="cmg-fo-node failed"><div className="cmg-fo-node-dot"></div>mongo-0<div className="cmg-fo-node-role cmg-role-primary">Failed</div></div>
                    <div className="cmg-fo-node healthy"><div className="cmg-fo-node-dot"></div>mongo-1<div className="cmg-fo-node-role cmg-role-secondary">Secondary</div></div>
                    <div className="cmg-fo-node healthy"><div className="cmg-fo-node-dot"></div>mongo-2<div className="cmg-fo-node-role cmg-role-secondary">Secondary</div></div>
                  </div>
                </div>
              </div>
              <div className="cmg-fo-phase">
                <div className="cmg-fo-time"><div className="cmg-fo-time-dot yellow"></div>T+5s — Election</div>
                <div className="cmg-fo-card phase-2">
                  <div className="cmg-fo-card-title yellow">Voting</div>
                  <div className="cmg-fo-nodes">
                    <div className="cmg-fo-node failed"><div className="cmg-fo-node-dot"></div>mongo-0<div className="cmg-fo-node-role cmg-role-primary">Unreachable</div></div>
                    <div className="cmg-fo-node detecting"><div className="cmg-fo-node-dot"></div>mongo-1<div className="cmg-fo-node-role cmg-role-elect">Candidate</div></div>
                    <div className="cmg-fo-node detecting"><div className="cmg-fo-node-dot"></div>mongo-2<div className="cmg-fo-node-role cmg-role-secondary">Voted</div></div>
                  </div>
                </div>
              </div>
              <div className="cmg-fo-phase">
                <div className="cmg-fo-time"><div className="cmg-fo-time-dot blue"></div>T+15s — Promote</div>
                <div className="cmg-fo-card phase-3">
                  <div className="cmg-fo-card-title blue">Promoting</div>
                  <div className="cmg-fo-nodes">
                    <div className="cmg-fo-node offline"><div className="cmg-fo-node-dot"></div>mongo-0<div className="cmg-fo-node-role cmg-role-secondary">Offline</div></div>
                    <div className="cmg-fo-node promoting"><div className="cmg-fo-node-dot"></div>mongo-1<div className="cmg-fo-node-role cmg-role-elect">Promoting…</div></div>
                    <div className="cmg-fo-node healthy"><div className="cmg-fo-node-dot"></div>mongo-2<div className="cmg-fo-node-role cmg-role-secondary">Secondary</div></div>
                  </div>
                </div>
              </div>
              <div className="cmg-fo-phase">
                <div className="cmg-fo-time"><div className="cmg-fo-time-dot green"></div>T+28s — Recovered</div>
                <div className="cmg-fo-card phase-4">
                  <div className="cmg-fo-card-title green">Healthy</div>
                  <div className="cmg-fo-nodes">
                    <div className="cmg-fo-node offline"><div className="cmg-fo-node-dot"></div>mongo-0<div className="cmg-fo-node-role cmg-role-secondary">Rebuilding</div></div>
                    <div className="cmg-fo-node new-primary"><div className="cmg-fo-node-dot"></div>mongo-1<div className="cmg-fo-node-role cmg-role-new">Primary ★</div></div>
                    <div className="cmg-fo-node healthy"><div className="cmg-fo-node-dot"></div>mongo-2<div className="cmg-fo-node-role cmg-role-secondary">Secondary</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cmg-fo-summary">
              <div className="cmg-fo-metric">
                <div className="cmg-fo-metric-val green">&lt; 30s</div>
                <div className="cmg-fo-metric-label">Recovery Time (RTO)</div>
              </div>
              <div className="cmg-fo-divider"></div>
              <div className="cmg-fo-metric">
                <div className="cmg-fo-metric-val blue">0</div>
                <div className="cmg-fo-metric-label">Manual Steps Required</div>
              </div>
              <div className="cmg-fo-divider"></div>
              <div className="cmg-fo-metric">
                <div className="cmg-fo-metric-val orange">Majority vote</div>
                <div className="cmg-fo-metric-label">Replica set election</div>
              </div>
              <div className="cmg-fo-divider"></div>
              <div className="cmg-fo-desc">
                <strong>No human intervention needed.</strong> MongoDB&apos;s built-in majority-vote election promotes the most up-to-date secondary automatically. KubeBlocks updates the Service selector so writes are routed to the new primary without client-side reconfiguration.
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Lifecycle Features ──────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'High Availability & Scaling',
    color: '#16A34A',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove replica set members online — KubeBlocks handles topology reconfiguration automatically.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running instances with a rolling strategy.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts with minimal disruption to active connections.' },
      { title: 'Planned Primary Stepdown', desc: 'Trigger a graceful rs.stepDown() on demand to promote a specific secondary.' },
      { title: 'Stop / Start', desc: 'Suspend clusters to eliminate compute cost; resume with full state restored.' },
    ],
  },
  {
    title: 'Configuration, Security & Observability',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune mongod parameters via OpsRequest — changes applied without restart where supported.' },
      { title: 'TLS Encryption', desc: 'Enable, rotate, or disable in-flight encryption without downtime.' },
      { title: 'Custom Users & Roles', desc: 'Declarative user and role management via Kubernetes Secrets — synced across all replica set members.' },
      { title: 'Password Management', desc: 'Rotate credentials stored in Kubernetes Secrets with automatic propagation.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrades across MongoDB minor versions; major version upgrades with blue-green deployment are available in KubeBlocks Enterprise.' },
      { title: 'Prometheus Metrics', desc: 'Per-instance metrics via mongodb-exporter, with pre-built Grafana dashboards.' },
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

// ── 6. Blog ────────────────────────────────────────────────────────────────────

const mongodbPosts = [
  {
    title: 'Managing Over 6,000 Self-Hosted Databases Without a DBA',
    description: 'How Sealos used KubeBlocks to manage 6,000+ self-hosted databases across four availability zones — architecture, HA, backup, and operations.',
    image: '/img/blogs/thumbnails/blog-manage-6k-db-instance-with-kb.png',
    href: '/blog/manage-6k-db-instance-with-kubeblocks',
  },
  {
    title: 'How Containerization Affects Database Performance: runC, Kata, and gVisor',
    description: 'CPU, memory, and I/O benchmarks across container runtimes — and how to avoid common pitfalls like I/O hangs and OOM errors in Kubernetes.',
    image: '/img/blogs/thumbnails/blog-containerization.png',
    href: '/blog/Does-containerization-affect-the-performance-of-databases',
  },
  {
    title: 'Running Databases on Kubernetes — Insights from Leading Chinese Internet Companies',
    description: 'Why major internet companies are moving databases to Kubernetes, and what it takes to operate them reliably at scale.',
    image: '/img/blogs/thumbnails/blog-run-databases-on-k8s-insight.png',
    href: '/blog/run-databases-on-k8s-insight-from-chinese-internet-giants',
  },
];

function MongoDBBlogPosts() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="From the Blog" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Go Deeper on{' '}
            <Box component="span" color="primary.main">MongoDB on Kubernetes</Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {mongodbPosts.map((post) => (
            <Card key={post.href} sx={{ boxShadow: 'none', border: 1, borderColor: 'divider' }}>
              <CardActionArea component="a" href={post.href}>
                <Box sx={{ height: 160, width: '100%', position: 'relative' }}>
                  <Image fill src={post.image} alt={post.title} style={{ objectFit: 'cover' }} />
                </Box>
                <CardContent>
                  <Typography gutterBottom fontWeight={600} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
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

// ── 7. CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'MongoDB & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks MongoDB Operator,{' '}
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
              href="/docs/preview/kubeblocks-for-mongodb/02-quickstart"
              sx={{ fontWeight: 700, px: 3.5, py: 1.5, fontSize: '0.95rem' }}
            >
              Get Started Free →
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

// ── Root ───────────────────────────────────────────────────────────────────────

export default function MongoDBOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topologies />
      <ComparisonTable />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <MongoDBBlogPosts />
      <CTA />
    </Box>
  );
}
