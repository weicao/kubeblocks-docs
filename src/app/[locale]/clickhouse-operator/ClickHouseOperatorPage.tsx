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
import ClickhouseArchitectureDiagram from '@/components/ClickhouseArchitectureDiagram';
import ClickhouseStandaloneArchitectureDiagram from '@/components/ClickhouseStandaloneArchitectureDiagram';

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
              Open Source · OLAP · CNCF Landscape
            </Box>

            <Typography
              variant="h2"
              mb={2.5}
              sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: isDark ? '#fff' : 'text.primary' }}
            >
              KubeBlocks ClickHouse Operator{' '}
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
              Deploy production-grade ClickHouse clusters in minutes. Manage sharding,
              replication, ClickHouse Keeper HA, and full backup/restore via a single
              open-source operator.
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
                href="/docs/preview/kubeblocks-for-clickhouse/02-quickstart"
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
                { value: '128', label: 'Max Shards' },
                { value: '2', label: 'Deployment Topologies' },
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

          {/* Right: terminal */}
          <Box
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
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
                Deploy ClickHouse in 4 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install ClickHouse Addon</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'helm upgrade -i kb-addon-clickhouse kubeblocks/clickhouse \\\n  -n kb-system'}
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a ClickHouse Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>ch-cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>namespace</span>{': '}
                <span style={{ color: '#a5d6ff' }}>demo{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>clickhouse{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>standalone</span>
                <span style={{ color: '#6e7681' }}>  # or cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>shardings</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>clickhouse{'\n'}</span>
                {'      '}
                <span style={{ color: '#79c0ff' }}>shards</span>{': '}
                <span style={{ color: '#f2cc60' }}>1{'\n'}</span>
                {'      '}
                <span style={{ color: '#79c0ff' }}>template</span>{':\n        '}
                <span style={{ color: '#79c0ff' }}>replicas</span>{': '}
                <span style={{ color: '#f2cc60' }}>1</span>
              </Box>

              {/* Step 4 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Cluster is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster ch-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME         CLUSTER-DEFINITION   TERMINATION-POLICY   STATUS    AGE\n'}</span>
                {'ch-cluster   clickhouse          Delete               '}
                <span style={{ color: '#3fb950', fontWeight: 700 }}>Running</span>
                {'   3m'}
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
    badgeColor: '#6366f1',
    tags: ['No Coordinator', 'Simple Analytics', 'Dev / Test'],
    desc: 'One or more independent ClickHouse shards without a coordinator. MergeTree tables are fully supported; ReplicatedMergeTree is not available in standalone topology — use the cluster topology with built-in ClickHouse Keeper.',
    features: [
      'Single or multi-shard deployment (up to 128 shards)',
      'MergeTree, SummingMergeTree, AggregatingMergeTree engines',
      'HTTP (8123) and native TCP (9000) client access',
      'MySQL and PostgreSQL wire protocol compatibility',
      'Prometheus metrics on port 8001',
      'Full and incremental backup via clickhouse-backup',
    ],
    diagram: <ClickhouseStandaloneArchitectureDiagram />,
  },
  {
    name: 'Cluster (with Keeper)',
    badgeColor: '#0165CB',
    tags: ['ClickHouse Keeper HA', 'ReplicatedMergeTree', 'Production'],
    desc: 'ClickHouse shards backed by a built-in ClickHouse Keeper ensemble. Enables ReplicatedMergeTree, distributed DDL replication, and automatic shard coordination.',
    features: [
      'Built-in ClickHouse Keeper (ZooKeeper-compatible, Raft consensus)',
      'ReplicatedMergeTree and Distributed table engines',
      'Distributed DDL replication (via ON CLUSTER queries)',
      'Leader switchover for Keeper via OpsRequest',
      'Multi-shard with 2+ replicas per shard for full HA',
      'Prometheus metrics on port 8001 for all nodes (shards and Keeper)',
    ],
    diagram: <ClickhouseArchitectureDiagram />,
  },
];

function Topologies() {
  const [activeTab, setActiveTab] = useState(0);
  const topo = topoData[activeTab];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Topologies" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Choose the Right{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>ClickHouse Architecture</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 540, mx: 'auto', lineHeight: 1.75 }}>
            From lightweight standalone analytics to production-grade replicated clusters
            with built-in Keeper coordination.
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mb: 4,
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.92rem' },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
          }}
        >
          {topoData.map((t) => (
            <Tab key={t.name} label={t.name} />
          ))}
        </Tabs>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'start' }}>
          {/* Left */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: topo.badgeColor }} />
              <Typography fontWeight={700} fontSize="1.1rem">{topo.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {topo.tags.map((tag) => (
                <Box key={tag} sx={{ px: 1.5, py: 0.5, borderRadius: 100, border: '1px solid', borderColor: 'divider', fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary' }}>
                  {tag}
                </Box>
              ))}
            </Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 3 }}>{topo.desc}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {topo.features.map((f) => (
                <Box key={f} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', mt: '1px', flexShrink: 0 }}>✓</Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{f}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: Architecture Diagram */}
          <Box>
            {topo.diagram}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 4. Capabilities Diagrams ──────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { label: 'Full & Incremental Backup' },
    { label: 'Shard Scale-out' },
    { label: 'Keeper Failover' },
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
        .cd * { box-sizing: border-box; }
        @keyframes cd-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cd-node {
          border: 1.5px solid var(--cd-border);
          border-radius: 10px;
          padding: 10px 16px;
          background: var(--cd-card-bg);
          font-size: 12px;
          color: var(--cd-text);
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
        }
        .cd-node-accent {
          border-color: ${theme.palette.primary.main};
          box-shadow: 0 0 0 2px ${alpha(theme.palette.primary.main, 0.18)};
          color: ${theme.palette.primary.main};
        }
        .cd-node-dim { opacity: 0.45; }
        .cd-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: .06em; text-transform: uppercase;
          color: var(--cd-text-muted);
        }
        .cd-arrow {
          width: 2px; background: var(--cd-border);
          flex-shrink: 0; position: relative; align-self: stretch;
        }
        .cd-arrow::after {
          content: ''; position: absolute; bottom: -1px; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
          border-top: 6px solid var(--cd-border);
        }
        .cd-arrow-h {
          height: 2px; background: var(--cd-border); align-self: center;
          position: relative; flex-shrink: 0;
        }
        .cd-arrow-h::after {
          content: ''; position: absolute; right: -1px; top: 50%;
          transform: translateY(-50%);
          border-top: 5px solid transparent; border-bottom: 5px solid transparent;
          border-left: 6px solid var(--cd-border);
        }
        .cd-badge {
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 100px; display: inline-block;
        }
        .cd-badge-ok   { background: ${alpha('#3fb950', 0.15)}; color: #3fb950; }
        .cd-badge-warn { background: ${alpha('#e3b341', 0.15)}; color: #e3b341; }
        .cd-badge-new  { background: ${alpha(theme.palette.primary.main, 0.15)}; color: ${theme.palette.primary.main}; }
        .cd-card {
          background: var(--cd-box-bg); border-radius: 10px;
          padding: 12px 18px; font-size: 12px; color: var(--cd-text-muted);
          border: 1px solid var(--cd-border);
        }
        .cd-row { display: flex; gap: 10px; align-items: center; }
        .cd-col { display: flex; flex-direction: column; gap: 10px; align-items: center; }
      `}</style>

      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="How It Works" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Day-2 Operations,{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Visualized</Box>
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 5, borderBottom: '1px solid', borderColor: 'divider',
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.88rem' },
            '& .Mui-selected': { color: 'primary.main' },
            '& .MuiTabs-indicator': { bgcolor: 'primary.main' },
          }}
        >
          {tabs.map((t) => <Tab key={t.label} label={t.label} />)}
        </Tabs>

        {activeTab === 0 && (
          <Box className="cd" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Backup flow */}
            <Box sx={{ flex: 1 }}>
              <Typography className="cd-label" mb={2}>Full Backup</Typography>
              <Box className="cd-col" sx={{ alignItems: 'stretch' }}>
                <Box className="cd-node cd-node-accent">ClickHouse Pod</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node">clickhouse-backup create</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node">S3-Compatible Object Storage</Box>
                <Box sx={{ mt: 1.5, textAlign: 'center' }}><span className="cd-badge cd-badge-ok">Snapshot Consistent</span></Box>
              </Box>
            </Box>
            {/* Incremental flow */}
            <Box sx={{ flex: 1 }}>
              <Typography className="cd-label" mb={2}>Incremental Backup</Typography>
              <Box className="cd-col" sx={{ alignItems: 'stretch' }}>
                <Box className="cd-node cd-node-dim">Previous Full Backup</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node cd-node-accent">clickhouse-backup create --diff-from=&lt;full-backup&gt;</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node">S3 (incremental parts only)</Box>
                <Box sx={{ mt: 1.5, textAlign: 'center' }}><span className="cd-badge cd-badge-ok">Storage Efficient</span></Box>
              </Box>
            </Box>
            {/* Restore */}
            <Box sx={{ flex: 1 }}>
              <Typography className="cd-label" mb={2}>Restore</Typography>
              <Box className="cd-col" sx={{ alignItems: 'stretch' }}>
                <Box className="cd-node">S3 Backup</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node cd-node-accent">New Cluster (kubectl apply)</Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-node">clickhouse-backup restore</Box>
                <Box sx={{ mt: 1.5, textAlign: 'center' }}><span className="cd-badge cd-badge-ok">Consistent Snapshot</span></Box>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box className="cd" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography className="cd-label">Before: 2 Shards × 2 Replicas</Typography>
            <Box className="cd-row" sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Shard 1 / Replica 1', 'Shard 1 / Replica 2', 'Shard 2 / Replica 1', 'Shard 2 / Replica 2'].map((n) => (
                <Box key={n} className="cd-node" sx={{ m: 0.5 }}>{n}</Box>
              ))}
            </Box>
            <Box className="cd-row" sx={{ justifyContent: 'center' }}>
              <Box className="cd-arrow" sx={{ height: 28, width: 2 }} />
            </Box>
            <Box className="cd-card">
              <strong>OpsRequest HorizontalScaling</strong> — shards: 2 → 3<br />
              KubeBlocks provisions new shard pods, runs post-scale-out-shard to register them in cluster config.
            </Box>
            <Box className="cd-row" sx={{ justifyContent: 'center' }}>
              <Box className="cd-arrow" sx={{ height: 28, width: 2 }} />
            </Box>
            <Typography className="cd-label">After: 3 Shards × 2 Replicas</Typography>
            <Box className="cd-row" sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Shard 1 / Replica 1', 'Shard 1 / Replica 2', 'Shard 2 / Replica 1', 'Shard 2 / Replica 2'].map((n) => (
                <Box key={n} className="cd-node" sx={{ m: 0.5 }}>{n}</Box>
              ))}
              <Box className="cd-node cd-node-accent" sx={{ m: 0.5 }}>Shard 3 / Replica 1 <span className="cd-badge cd-badge-new">New</span></Box>
              <Box className="cd-node cd-node-accent" sx={{ m: 0.5 }}>Shard 3 / Replica 2 <span className="cd-badge cd-badge-new">New</span></Box>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box className="cd" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography className="cd-label" mb={2}>Before: Leader Failure</Typography>
              <Box className="cd-col" sx={{ alignItems: 'stretch' }}>
                <Box className="cd-row">
                  <Box className="cd-node cd-node-dim" sx={{ flex: 1 }}>keeper-0 (Leader) ✗</Box>
                  <Box className="cd-node" sx={{ flex: 1 }}>keeper-1 (Follower)</Box>
                  <Box className="cd-node" sx={{ flex: 1 }}>keeper-2 (Follower)</Box>
                </Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-card">
                  Raft detects leader loss. Remaining 2 nodes form quorum and elect a new leader.
                  ClickHouse Keeper election completes in seconds — no manual action needed.
                </Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-row">
                  <Box className="cd-node cd-node-dim" sx={{ flex: 1 }}>keeper-0 (recovering)</Box>
                  <Box className="cd-node cd-node-accent" sx={{ flex: 1 }}>keeper-1 <span className="cd-badge cd-badge-ok">New Leader</span></Box>
                  <Box className="cd-node" sx={{ flex: 1 }}>keeper-2 (Follower)</Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography className="cd-label" mb={2}>Planned Switchover</Typography>
              <Box className="cd-col" sx={{ alignItems: 'stretch' }}>
                <Box className="cd-card">
                  <strong>OpsRequest Switchover</strong> — ch-keeper component<br />
                  Transfers Keeper leadership to a specific node with zero downtime.
                </Box>
                <Box className="cd-arrow" sx={{ height: 28, width: 2, mx: 'auto' }} />
                <Box className="cd-row">
                  <Box className="cd-node" sx={{ flex: 1 }}>keeper-0 (Follower)</Box>
                  <Box className="cd-node" sx={{ flex: 1 }}>keeper-1 (Follower)</Box>
                  <Box className="cd-node cd-node-accent" sx={{ flex: 1 }}>keeper-2 <span className="cd-badge cd-badge-ok">New Leader</span></Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'Sharding & Availability',
    color: '#0165CB',
    items: [
      { title: 'Shard Scale-out', desc: 'Add new shards to an existing ClickHouse cluster. After provisioning, run a post-scale-out OpsRequest to register the new shards in the cluster configuration.' },
      { title: 'Replica Scaling', desc: 'Add or remove replicas within a shard for read throughput or storage redundancy.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory for ClickHouse shards or Keeper nodes via rolling OpsRequest.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage on any shard without pod restarts on supported storage classes.' },
      { title: 'Stop / Start', desc: 'Suspend the entire cluster (shards + Keeper) to eliminate compute cost; resume with full state.' },
      { title: 'Rolling Restart', desc: 'Restart pods shard by shard with configurable batch size and health-check gates.' },
    ],
  },
  {
    title: 'Configuration, Data & Observability',
    color: '#059669',
    items: [
      { title: 'Full Backup & Restore', desc: 'Consistent full snapshots via clickhouse-backup, uploaded to S3-compatible object storage.' },
      { title: 'Incremental Backup', desc: 'Capture only changed parts since the last backup to minimize storage cost and backup duration.' },
      { title: 'Parameter Reconfiguration', desc: 'Update server and user XML configuration via ConfigMap; mutable parameters apply at runtime without restart.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrade across supported ClickHouse versions (22.x → 25.x) with health checks.' },
      { title: 'TLS Encryption', desc: 'Enable mutual TLS for client-server and inter-shard communication on any running cluster.' },
      { title: 'Prometheus Metrics', desc: 'Built-in metrics endpoint on port 8001 for ClickHouse shards and Keeper nodes; works with Grafana.' },
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
            <Box component="span" sx={{ color: 'primary.main' }}>Kubernetes Resource</Box>
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

// ── 6. Blog Posts ─────────────────────────────────────────────────────────────

const chPosts = [
  {
    title: 'KubeBlocks × ClickHouse: Production-Ready Operator on Kubernetes',
    description: 'How to operatorize ClickHouse with KubeBlocks: cluster management, sharding, Keeper integration, HA, parameter control, and backup/recovery.',
    image: '/img/blogs/thumbnails/clickhouse_kubeblocks_thumbnail.png',
    href: '/blog/kubeblocks-for-clickhouse',
  },
  {
    title: 'We Let an AI Agent Manage Our Databases. Here\'s Why Most Operators Failed It.',
    description: 'We tested AI agents against traditional Kubernetes database operators — and why a unified API like KubeBlocks changes everything.',
    image: '/img/blogs/thumbnails/blog-ai-agent-database-operators.png',
    href: '/blog/we-let-an-ai-agent-manage-our-databases',
  },
  {
    title: 'Running Databases on Kubernetes — Insights from Leading Chinese Internet Companies',
    description: 'Why leading internet companies are increasingly adopting the practice of running stateful databases on Kubernetes.',
    image: '/img/blogs/thumbnails/blog-run-databases-on-k8s-insight.png',
    href: '/blog/run-databases-on-k8s-insights-from-leading-chinese-internet-companies',
  },
];

function BlogPosts() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="From the Blog" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Go Deeper on{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>ClickHouse on Kubernetes</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {chPosts.map((post) => (
            <Card key={post.href} sx={{ boxShadow: 'none', border: 1, borderColor: 'divider' }}>
              <CardActionArea component="a" href={post.href}>
                <Box sx={{ height: 160, width: '100%', position: 'relative' }}>
                  <Image fill src={post.image} alt={post.title} style={{ objectFit: 'cover' }} />
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom fontWeight={600}
                    sx={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
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
  const checks = ['Open Source', 'ClickHouse & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks ClickHouse Operator,{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Risk-Free.</Box>
          </Typography>

          <Typography
            sx={{ fontSize: '1.05rem', color: 'text.secondary', maxWidth: 520, lineHeight: 1.75, mb: 4 }}
          >
            Open source and production-ready. Enterprise customers get dedicated onboarding,
            migration support, and SLA guarantees.
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

// ── Page Assembly ─────────────────────────────────────────────────────────────

export default function ClickHouseOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topologies />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <BlogPosts />
      <CTA />
    </Box>
  );
}
