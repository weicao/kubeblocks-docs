'use client';

import React, { useMemo, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import hljsYaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('yaml', hljsYaml);
import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import MysqlArchitectureDiagram from '@/components/MysqlArchitectureDiagram';
import MysqlMGRArchitectureDiagram from '@/components/MysqlMGRArchitectureDiagram';
import MysqlOrchestratorArchitectureDiagram from '@/components/MysqlOrchestratorArchitectureDiagram';
import TrustedBy from '@/app/[locale]/trusted-by';

// ── YAML syntax highlighter ───────────────────────────────────────────────────

const DARK_YAML_STYLE = `
.yaml-dark .hljs-attr       { color: #79c0ff; }
.yaml-dark .hljs-string     { color: #3fb950; }
.yaml-dark .hljs-number     { color: #e3b341; }
.yaml-dark .hljs-literal    { color: #e3b341; }
.yaml-dark .hljs-comment    { color: #7d8590; font-style: italic; }
.yaml-dark .hljs-meta       { color: #7d8590; }
.yaml-dark .hljs-bullet     { color: #e3b341; }
.yaml-dark .hljs-type       { color: #79c0ff; }
.yaml-dark .hljs-symbol     { color: #3fb950; }
`;

const LIGHT_YAML_STYLE = `
.yaml-light .hljs-attr      { color: #0550ae; }
.yaml-light .hljs-string    { color: #116329; }
.yaml-light .hljs-number    { color: #953800; }
.yaml-light .hljs-literal   { color: #953800; }
.yaml-light .hljs-comment   { color: #6e7781; font-style: italic; }
.yaml-light .hljs-meta      { color: #6e7781; }
.yaml-light .hljs-bullet    { color: #953800; }
.yaml-light .hljs-type      { color: #0550ae; }
.yaml-light .hljs-symbol    { color: #116329; }
`;

function YamlBlock({ code, isDark, sx = {} }: { code: string; isDark: boolean; sx?: object }) {
  const html = useMemo(() => hljs.highlight(code, { language: 'yaml' }).value, [code]);
  const cls = isDark ? 'yaml-dark' : 'yaml-light';
  return (
    <>
      <style>{isDark ? DARK_YAML_STYLE : LIGHT_YAML_STYLE}</style>
      <Box
        component="pre"
        className={cls}
        sx={{
          m: 0, fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontSize: '0.78rem', lineHeight: 1.7, overflowX: 'auto',
          color: isDark ? '#e6edf3' : '#24292f',
          ...sx,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

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

// ── 1. Hero (split layout) ────────────────────────────────────────────────────


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
              KubeBlocks MySQL Operator{' '}
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
              Deploy production-grade MySQL clusters in minutes. Automate high availability,
              PITR backups, and zero-downtime upgrades.
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
                href="/docs/preview/kubeblocks-for-mysql/02-quickstart"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Read the Docs
              </Button>
            </Stack>

            <Box
              sx={{
                display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: 2, pt: 4,
                borderTop: '1px solid', borderColor: 'divider',
              }}
            >
              {[
                { value: '3', label: 'HA Topologies' },
                { value: '0', label: 'Data Loss on Failover' },
                { value: '99.99%', label: 'High Availability Target' },
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
                Deploy MySQL in 3 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a MySQL Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mysql-cluster{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mysql{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>semisync</span>
                <span style={{ color: '#6e7681' }}>  # or mgr{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>componentSpecs</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>mysql{'\n'}</span>
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
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster mysql-cluster\n'}
                <span style={{ color: '#6e7681' }}>{'NAME            CLUSTER-DEF   TOPOLOGY    STATUS    AGE\n'}</span>
                {'mysql-cluster   mysql         semisync    '}
                <span style={{ color: '#3fb950', fontWeight: 700 }}>Running</span>
                {'   2m'}
              </Box>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 2. Topologies (Tabs) ──────────────────────────────────────────────────────

const topoData = [
  {
    name: 'SemiSync Replication',
    badgeColor: '#0165CB',
    tags: ['RTO < 30s', 'RPO = 0', 'Read/Write Split via ProxySQL'],
    desc: 'One primary with one or more semi-synchronous replicas. At least one replica acknowledges each transaction before the primary commits, ensuring zero data loss on failover.',
    features: [
      'Automatic primary election on failure',
      'Read scale-out via replicas',
      'Zero data loss — semi-sync ACK before commit',
      'Optional ProxySQL for read/write splitting',
      'Syncer sidecar manages role detection',
    ],
    diagram: <MysqlArchitectureDiagram />,
  },
  {
    name: 'Group Replication (MGR)',
    badgeColor: '#059669',
    tags: ['No External Coordinator', 'Built-in Consensus', 'Auto Membership'],
    desc: 'Paxos-based consensus replication built natively into MySQL. All writes are certified by the group before committing — no external coordination layer needed. KubeBlocks operates MGR in single-primary mode with automatic group failover.',
    features: [
      'Distributed Paxos consensus on port :33061',
      'Single-primary mode, automatic group failover',
      'All members certify each transaction',
      'No external etcd or ZooKeeper dependency',
      'Native MySQL — no Galera, no Percona XtraDB',
    ],
    diagram: <MysqlMGRArchitectureDiagram />,
  },
  {
    name: 'Orchestrator HA',
    badgeColor: '#7C3AED',
    tags: ['Cross-DC Failover', 'Pseudo-GTID', 'Complex Topologies'],
    desc: 'Battle-tested topology management powered by MySQL Orchestrator. Handles complex replication chains, pseudo-GTID stitching, and cross-datacenter failover scenarios. Best suited for large-scale or multi-region deployments.',
    features: [
      'Orchestrator-driven failover decisions',
      'Complex replication chain management',
      'Pseudo-GTID for crash-safe recovery',
      'Optional ProxySQL for read/write splitting',
      'Supports intermediate primary topologies',
    ],
    diagram: <MysqlOrchestratorArchitectureDiagram />,
  },
];

function Topologies() {
  const [tab, setTab] = useState(0);
  const topo = topoData[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="MySQL Topologies" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Every MySQL Topology.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            From a lightweight dev instance to a production-grade Group Replication cluster —
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
            gridTemplateColumns: topo.diagram ? { xs: '1fr', md: '2fr 3fr' } : '1fr',
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

          {/* Diagram (only for tabs that have one) */}
          {topo.diagram && (
            <Box>{topo.diagram}</Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}


// ── 3. Lifecycle Features (2-column categorized checklist) ────────────────────

const lifecycleCategories = [
  {
    title: 'High Availability & Scaling',
    color: '#0165CB',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove replicas online without downtime or reconfiguration.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running instances with a rolling strategy.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts with zero traffic disruption.' },
      { title: 'Planned Switchover', desc: 'Promote a specific replica to primary with zero data loss.' },
      { title: 'Stop / Start', desc: 'Suspend clusters to eliminate compute cost; resume with full state.' },
    ],
  },
  {
    title: 'Configuration, Security & Observability',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune MySQL parameters via OpsRequest — no restart for supported vars.' },
      { title: 'TLS Encryption', desc: 'Enable, rotate, or disable in-flight encryption without downtime.' },
      { title: 'Password Management', desc: 'Rotate root and custom account credentials stored in Kubernetes Secrets.' },
      { title: 'Minor Version Upgrade', desc: 'Rolling upgrades across minor MySQL versions with health checks.' },
      { title: 'Prometheus Metrics', desc: 'Per-instance metrics via mysqld_exporter on :9104, Grafana dashboards included.' },
      { title: 'Audit Logging', desc: 'Centralized query audit trail via Loki Stack for compliance requirements.' },
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

// ── Capabilities Diagrams (Tabbed) ────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { icon: '🗄️', label: 'Backup & PITR' },
    { icon: '⬆️', label: 'Zero-Downtime Upgrade' },
    { icon: '⚡', label: 'Auto Failover' },
  ];

  return (
    <Box component="section"
      style={{
        '--cd-card-bg':   theme.palette.background.paper,
        '--cd-box-bg':    theme.palette.mode === 'dark' ? '#252840' : theme.palette.action.hover,
        '--cd-text':      theme.palette.text.primary,
        '--cd-text-muted':theme.palette.text.secondary,
        '--cd-border':    theme.palette.divider,
      } as React.CSSProperties}
      sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <style>{`
        .cd * { box-sizing: border-box; }
        @keyframes cd-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cd-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes cd-glow-green {
          0%, 100% { box-shadow: 0 0 6px #4ADE80; }
          50%       { box-shadow: 0 0 14px #4ADE80, 0 0 4px #4ADE80; }
        }
        @keyframes cd-glow-target {
          0%, 100% { box-shadow: 0 0 10px #4ADE80; }
          50%       { box-shadow: 0 0 20px #4ADE80, 0 0 8px #4ADE80; }
        }
        /* section card */
        .cd-card {
          background: var(--cd-card-bg, #1e2130);
          border: 1px solid var(--cd-border, rgba(255,255,255,0.08));
          border-radius: 20px;
          padding: 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--cd-text, #E8EAF0);
        }
        @media (max-width: 600px) { .cd-card { padding: 24px 16px; } }
        /* header */
        .cd-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 36px; gap: 16px; flex-wrap: wrap;
        }
        .cd-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        .cd-icon-orange { background: rgba(242,145,17,0.12); }
        .cd-icon-blue   { background: rgba(108,182,255,0.12); }
        .cd-icon-green  { background: rgba(74,222,128,0.12); }
        .cd-title-group { flex: 1; }
        .cd-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .cd-desc  { font-size: 14px; color: var(--cd-text-muted, #8B90A0); }
        .cd-badge {
          padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; flex-shrink: 0;
        }
        .cd-badge-orange { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cd-badge-blue   { background: rgba(108,182,255,0.12); color: #6CB6FF; border: 1px solid #6CB6FF; }
        .cd-badge-green  { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        /* ── PITR ── */
        .cd-tl-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 20px;
        }
        .cd-tl-track {
          position: relative; height: 4px;
          background: rgba(255,255,255,0.08); border-radius: 4px;
        }
        .cd-tl-fill {
          position: absolute; left: 0; top: 0; height: 100%;
          background: linear-gradient(90deg, #F29111, #6CB6FF);
          border-radius: 4px; width: 100%;
        }
        .cd-binlog-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: repeating-linear-gradient(90deg, #6CB6FF 0px, #6CB6FF 6px, transparent 6px, transparent 10px);
          opacity: 0.5; border-radius: 2px;
        }
        .cd-tl-events {
          position: relative; height: 100px; margin-top: -2px;
        }
        .cd-tl-event {
          position: absolute; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .cd-tl-dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid #16181f; position: relative; z-index: 2; margin-top: -5px;
        }
        .cd-tl-dot.full   { background: #F29111; box-shadow: 0 0 10px #F29111; }
        .cd-tl-dot.incr   { background: #6CB6FF; box-shadow: 0 0 8px #6CB6FF; }
        .cd-tl-dot.target {
          background: #4ADE80; width: 18px; height: 18px; margin-top: -7px;
          animation: cd-glow-target 1.8s ease-in-out infinite;
        }
        .cd-tl-tag {
          font-size: 11px; font-weight: 600; padding: 3px 8px;
          border-radius: 6px; white-space: nowrap;
        }
        .cd-tl-tag.full   { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cd-tl-tag.incr   { background: rgba(108,182,255,0.12); color: #6CB6FF; border: 1px solid #6CB6FF; }
        .cd-tl-tag.target { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        .cd-tl-time { font-size: 11px; color: var(--cd-text-muted, #8B90A0); font-family: "JetBrains Mono", monospace; }
        .cd-restore {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 24px 28px;
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .cd-restore-step {
          display: flex; align-items: center; gap: 12px; flex: 1; min-width: 150px;
        }
        .cd-restore-icon {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .cd-restore-icon.orange { background: rgba(242,145,17,0.12); }
        .cd-restore-icon.blue   { background: rgba(108,182,255,0.12); }
        .cd-restore-icon.green  { background: rgba(74,222,128,0.12); }
        .cd-restore-text strong { display: block; font-size: 13px; font-weight: 600; }
        .cd-restore-text span   { font-size: 12px; color: var(--cd-text-muted, #8B90A0); }
        .cd-restore-arrow { color: var(--cd-text-muted, #8B90A0); font-size: 20px; flex-shrink: 0; }
        .cd-pitr-badge {
          margin-left: auto; background: rgba(74,222,128,0.12);
          border: 1px solid #4ADE80; color: #4ADE80;
          border-radius: 100px; padding: 6px 16px;
          font-size: 13px; font-weight: 700; white-space: nowrap;
        }
        /* ── Upgrade ── */
        .cd-upgrade-grid {
          display: grid;
          grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr;
          gap: 8px; margin-bottom: 28px; align-items: start;
        }
        @media (max-width: 700px) {
          .cd-upgrade-grid { grid-template-columns: 1fr 1fr; }
          .cd-stage-arrow  { display: none; }
        }
        .cd-stage {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 20px 16px;
        }
        .cd-stage.highlight { border-color: #6CB6FF; }
        .cd-stage-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 16px;
        }
        .cd-stage-label span {
          background: var(--cd-border, rgba(255,255,255,0.06)); padding: 2px 8px; border-radius: 4px;
        }
        .cd-pod-grid { display: flex; flex-direction: column; gap: 8px; }
        .cd-pod {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px; border: 1px solid transparent;
          font-size: 12px; font-weight: 500;
          font-family: "JetBrains Mono", monospace; transition: 0.3s;
        }
        .cd-pod-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cd-pod.primary-old { background: rgba(242,145,17,0.08); border-color: rgba(242,145,17,0.3); }
        .cd-pod.primary-old .cd-pod-dot { background: #F29111; }
        .cd-pod.primary-new { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 8px rgba(108,182,255,0.25); }
        .cd-pod.primary-new .cd-pod-dot { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cd-pod.replica-old { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cd-pod.replica-old .cd-pod-dot { background: #8B90A0; }
        .cd-pod.replica-new { background: rgba(108,182,255,0.06); border-color: rgba(108,182,255,0.3); }
        .cd-pod.replica-new .cd-pod-dot { background: #6CB6FF; }
        .cd-pod.upgrading { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cd-pod.upgrading .cd-pod-dot { background: #FACC15; animation: cd-pulse 1s ease infinite; }
        .cd-pod-version {
          margin-left: auto; font-size: 10px; padding: 1px 6px;
          border-radius: 4px; font-weight: 600;
        }
        .cd-v-old { background: var(--cd-border, rgba(255,255,255,0.06)); color: var(--cd-text-muted, #8B90A0); }
        .cd-v-new { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cd-v-upg { background: rgba(250,204,21,0.1); color: #FACC15; }
        .cd-stage-arrow {
          display: flex; align-items: center; justify-content: center;
          color: var(--cd-text-muted, #8B90A0); font-size: 18px; padding-top: 40px;
        }
        .cd-traffic {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 16px 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .cd-traffic-label { font-size: 12px; color: var(--cd-text-muted, #8B90A0); font-weight: 500; white-space: nowrap; }
        .cd-traffic-track {
          flex: 1; height: 6px; background: rgba(255,255,255,0.08);
          border-radius: 3px; overflow: hidden;
        }
        .cd-traffic-fill {
          height: 100%; border-radius: 3px; width: 100%;
          background: linear-gradient(90deg, #3fb950, #79c0ff, #3fb950);
          background-size: 200% 100%;
          animation: cd-shimmer 2s linear infinite;
        }
        .cd-traffic-status { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }
        /* ── Failover ── */
        .cd-fo-timeline {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 0; margin-bottom: 32px; position: relative;
        }
        @media (max-width: 700px) { .cd-fo-timeline { grid-template-columns: 1fr; } }
        .cd-fo-phase { position: relative; padding: 0 8px; }
        .cd-fo-phase::after {
          content: ""; position: absolute; right: -1px; top: 24px;
          width: 2px; height: 32px; background: var(--cd-border, rgba(255,255,255,0.08));
        }
        .cd-fo-phase:last-child::after { display: none; }
        .cd-fo-time {
          font-size: 11px; font-family: "JetBrains Mono", monospace;
          color: var(--cd-text-muted, #8B90A0); margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .cd-fo-time-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cd-fo-time-dot.green  { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; animation: cd-glow-green 2s ease-in-out infinite; }
        .cd-fo-time-dot.red    { background: #F87171; box-shadow: 0 0 6px #F87171; }
        .cd-fo-time-dot.yellow { background: #FACC15; box-shadow: 0 0 6px #FACC15; }
        .cd-fo-time-dot.blue   { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cd-fo-card {
          background: var(--cd-card-bg, #1e2130); border: 1px solid var(--cd-border, rgba(255,255,255,0.08));
          border-radius: 10px; padding: 14px 12px; font-size: 12px;
        }
        .cd-fo-card.phase-0 { border-color: rgba(74,222,128,0.25); }
        .cd-fo-card.phase-1 { border-color: rgba(248,113,113,0.25); }
        .cd-fo-card.phase-2 { border-color: rgba(250,204,21,0.2); }
        .cd-fo-card.phase-3 { border-color: rgba(108,182,255,0.2); }
        .cd-fo-card.phase-4 { border-color: rgba(74,222,128,0.3); }
        .cd-fo-card-title { font-weight: 700; font-size: 12px; margin-bottom: 10px; }
        .cd-fo-card-title.green  { color: #4ADE80; }
        .cd-fo-card-title.red    { color: #F87171; }
        .cd-fo-card-title.yellow { color: #FACC15; }
        .cd-fo-card-title.blue   { color: #6CB6FF; }
        .cd-fo-nodes { display: flex; flex-direction: column; gap: 6px; }
        .cd-fo-node {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 8px; border-radius: 6px;
          font-size: 11px; font-family: "JetBrains Mono", monospace;
          border: 1px solid transparent;
        }
        .cd-fo-node-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cd-fo-node.healthy  { background: rgba(74,222,128,0.06); }
        .cd-fo-node.healthy .cd-fo-node-dot { background: #4ADE80; animation: cd-glow-green 2s ease-in-out infinite; }
        .cd-fo-node.failed   { background: rgba(248,113,113,0.15); }
        .cd-fo-node.failed .cd-fo-node-dot { background: #F87171; animation: cd-pulse 0.8s ease infinite; }
        .cd-fo-node.detecting { background: rgba(250,204,21,0.06); }
        .cd-fo-node.detecting .cd-fo-node-dot { background: #FACC15; animation: cd-pulse 0.8s ease infinite; }
        .cd-fo-node.promoting { background: rgba(108,182,255,0.08); border-color: rgba(108,182,255,0.3); }
        .cd-fo-node.promoting .cd-fo-node-dot { background: #6CB6FF; animation: cd-pulse 0.6s ease infinite; }
        .cd-fo-node.new-primary { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.4); }
        .cd-fo-node.new-primary .cd-fo-node-dot { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; }
        .cd-fo-node.offline { opacity: 0.3; }
        .cd-fo-node.offline .cd-fo-node-dot { background: #8B90A0; }
        .cd-fo-node-role {
          margin-left: auto; font-size: 9px; font-weight: 700;
          padding: 1px 5px; border-radius: 3px; text-transform: uppercase;
        }
        .role-primary { background: rgba(242,145,17,0.12); color: #F29111; }
        .role-replica { background: var(--cd-border, rgba(255,255,255,0.05)); color: var(--cd-text-muted, #8B90A0); }
        .role-new     { background: rgba(74,222,128,0.12);  color: #4ADE80; }
        .role-elect   { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        /* summary bar */
        .cd-fo-summary {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(74,222,128,0.25);
          border-radius: 14px; padding: 20px 24px;
          display: flex; align-items: center; gap: 32px; flex-wrap: wrap;
        }
        .cd-fo-metric { text-align: center; }
        .cd-fo-metric-val {
          font-size: 28px; font-weight: 800;
          font-family: "JetBrains Mono", monospace; line-height: 1; margin-bottom: 4px;
        }
        .cd-fo-metric-val.green  { color: #4ADE80; }
        .cd-fo-metric-val.blue   { color: #6CB6FF; }
        .cd-fo-metric-val.orange { color: #F29111; }
        .cd-fo-metric-label { font-size: 11px; color: var(--cd-text-muted, #8B90A0); font-weight: 500; }
        .cd-fo-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.08); }
        .cd-fo-desc { flex: 1; font-size: 13px; color: var(--cd-text-muted, #8B90A0); min-width: 200px; }
        .cd-fo-desc strong { color: var(--cd-text, #E8EAF0); }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production MySQL</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running MySQL on Kubernetes — so your team doesn&apos;t have to.
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
              <span>{tab.icon}</span>{tab.label}
            </Box>
          ))}
        </Box>

        {/* ── Panel 0: PITR ── */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-orange">🗄️</div>
              <div className="cd-title-group">
                <div className="cd-title">Point-in-Time Recovery (PITR)</div>
                <div className="cd-desc">Continuous binlog streaming + scheduled full backups. Restore to any second in history.</div>
              </div>
              <div className="cd-badge cd-badge-orange">RPO &lt; 1 second</div>
            </div>

            <div className="cd-tl-label">Backup Timeline</div>
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div className="cd-tl-track">
                <div className="cd-tl-fill"></div>
                <div className="cd-binlog-bar"></div>
              </div>
              <div style={{ position: 'absolute', top: '-22px', left: 0,
                  fontSize: '11px', color: '#6CB6FF', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7 }}>
                ⟵ Continuous Binlog Stream ⟶
              </div>
              <div className="cd-tl-events">
                <div className="cd-tl-event" style={{ left: '5%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Full Backup</div>
                  <div className="cd-tl-time">00:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '28%' }}>
                  <div className="cd-tl-dot incr"></div>
                  <div className="cd-tl-tag incr">Incremental</div>
                  <div className="cd-tl-time">06:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '55%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Full Backup</div>
                  <div className="cd-tl-time">12:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '76%' }}>
                  <div className="cd-tl-dot incr"></div>
                  <div className="cd-tl-tag incr">Incremental</div>
                  <div className="cd-tl-time">18:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '88%' }}>
                  <div className="cd-tl-dot target"></div>
                  <div className="cd-tl-tag target">🎯 Restore Target</div>
                  <div className="cd-tl-time">21:37:42</div>
                </div>
              </div>
            </div>

            <div className="cd-restore">
              <div className="cd-restore-step">
                <div className="cd-restore-icon orange">📦</div>
                <div className="cd-restore-text">
                  <strong>1. Load Base Backup</strong>
                  <span>Restore nearest full snapshot before target time</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon blue">📜</div>
                <div className="cd-restore-text">
                  <strong>2. Replay Binlogs</strong>
                  <span>Apply all transactions up to 21:37:42</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon green">✅</div>
                <div className="cd-restore-text">
                  <strong>3. Cluster Ready</strong>
                  <span>New MySQL cluster restored to exact point in time</span>
                </div>
              </div>
              <div className="cd-pitr-badge">✓ Zero Data Loss</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Rolling Upgrade ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-blue">⬆️</div>
              <div className="cd-title-group">
                <div className="cd-title">Zero-Downtime Rolling Upgrade</div>
                <div className="cd-desc">Replicas are upgraded one by one. Traffic is always served. Primary is switched last.</div>
              </div>
              <div className="cd-badge cd-badge-blue">0 ms Downtime</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial State</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>mysql-0<div className="cd-pod-version cd-v-old">8.0.32</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>mysql-1<div className="cd-pod-version cd-v-old">8.0.32</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>mysql-2<div className="cd-pod-version cd-v-old">8.0.32</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Upgrade Replica</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>mysql-0<div className="cd-pod-version cd-v-old">8.0.32</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>mysql-1<div className="cd-pod-version cd-v-new">8.0.36</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>mysql-2<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 3 — Switchover</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>mysql-0<div className="cd-pod-version cd-v-upg">switching…</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>mysql-1<div className="cd-pod-version cd-v-new">8.0.36 ★</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>mysql-2<div className="cd-pod-version cd-v-new">8.0.36</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>mysql-0<div className="cd-pod-version cd-v-new">8.0.36</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>mysql-1<div className="cd-pod-version cd-v-new">8.0.36 ★</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>mysql-2<div className="cd-pod-version cd-v-new">8.0.36</div></div>
                </div>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Application Traffic</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Always Serving</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Auto Failover ── */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green">⚡</div>
              <div className="cd-title-group">
                <div className="cd-title">Automatic Failover</div>
                <div className="cd-desc">KubeBlocks detects failure, elects a new primary, and redirects traffic — all within 30 seconds.</div>
              </div>
              <div className="cd-badge cd-badge-green">RTO &lt; 30s</div>
            </div>

            <div className="cd-fo-timeline">
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+0s — Normal</div>
                <div className="cd-fo-card phase-0">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-0<div className="cd-fo-node-role role-primary">Primary</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-1<div className="cd-fo-node-role role-replica">Replica</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot red"></div>T+1s — Failure</div>
                <div className="cd-fo-card phase-1">
                  <div className="cd-fo-card-title red">💥 Node Down</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node failed"><div className="cd-fo-node-dot"></div>mysql-0<div className="cd-fo-node-role role-primary">Failed</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-1<div className="cd-fo-node-role role-replica">Replica</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot yellow"></div>T+5s — Detect</div>
                <div className="cd-fo-card phase-2">
                  <div className="cd-fo-card-title yellow">🔍 Detecting</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>mysql-0<div className="cd-fo-node-role role-primary">Unreachable</div></div>
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>mysql-1<div className="cd-fo-node-role role-elect">Candidate</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot blue"></div>T+15s — Promote</div>
                <div className="cd-fo-card phase-3">
                  <div className="cd-fo-card-title blue">⬆️ Promoting</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>mysql-0<div className="cd-fo-node-role role-replica">Offline</div></div>
                    <div className="cd-fo-node promoting"><div className="cd-fo-node-dot"></div>mysql-1<div className="cd-fo-node-role role-elect">Promoting…</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+28s — Recovered</div>
                <div className="cd-fo-card phase-4">
                  <div className="cd-fo-card-title green">✅ Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>mysql-0<div className="cd-fo-node-role role-replica">Rebuilding</div></div>
                    <div className="cd-fo-node new-primary"><div className="cd-fo-node-dot"></div>mysql-1<div className="cd-fo-node-role role-new">Primary ★</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>mysql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cd-fo-summary">
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val green">&lt; 30s</div>
                <div className="cd-fo-metric-label">Recovery Time (RTO)</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val blue">0</div>
                <div className="cd-fo-metric-label">Manual Steps Required</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val orange">Semi-Sync</div>
                <div className="cd-fo-metric-label">Replication Mode</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-desc">
                <strong>No human intervention needed.</strong> KubeBlocks Operator continuously monitors cluster health, automatically elects the most up-to-date replica as the new primary, and updates the service endpoint — all without a single kubectl command.
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── Performance Benchmark ─────────────────────────────────────────────────────

const BENCH_CARDS = [
  {
    value: '≈ RDS',
    color: '#F29111',
    label: 'Throughput (TPS)',
    desc: 'KubeBlocks MySQL achieves comparable TPS to Amazon RDS MySQL under equivalent hardware configurations.',
  },
  {
    value: '-25%',
    color: 'primary.main',
    label: 'P99 Latency vs. Amazon RDS',
    desc: 'In IO-bound write-intensive workloads (8C32GB / 3,000 IOPS), KubeBlocks achieves 25% lower P99 latency than RDS — driven by a 2G redo log capacity default vs. RDS\'s 100M.',
  },
  {
    value: '0',
    color: '#3fb950',
    label: 'Kubernetes Performance Tax',
    desc: 'With proper parameter tuning and IOPS, running MySQL on Kubernetes introduces no performance degradation vs. bare-EC2 deployments.',
  },
];

function PerformanceBenchmark() {
  const theme = useTheme();
  const cardBorder = theme.palette.divider;
  const cardBg = theme.palette.background.paper;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <SectionEyebrow label="Performance" />
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, mb: 2 }}
          >
            Kubernetes Doesn&apos;t Mean Performance Penalty
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            Our benchmark shows KubeBlocks-managed MySQL on Kubernetes delivers performance on par with — or better than — Amazon RDS.
          </Typography>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
          mb: 5,
        }}>
          {BENCH_CARDS.map(({ value, color, label, desc }) => (
            <Box
              key={label}
              sx={{
                bgcolor: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: '16px',
                p: 3.5,
                textAlign: 'center',
              }}
            >
              <Typography sx={{
                fontSize: '2.5rem', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1,
                color, mb: 0.75,
              }}>
                {value}
              </Typography>
              <Typography sx={{
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'text.disabled', mb: 1.75,
              }}>
                {label}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.6 }}>
                {desc}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            href="https://kubeblocks.io/blog/does-running-mysql-on-kubernetes-lead-to-significant-performance-degradation"
            target="_blank"
            sx={{ fontWeight: 600 }}
          >
            Read Full Benchmark Report →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function ComparisonTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const cardBg = theme.palette.background.paper;
  const cardBorder = theme.palette.divider;

  const YES  = <Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box>;
  const NO   = <Box component="span" sx={{ color: '#f85149', fontWeight: 700 }}>✗</Box>;
  const PART = <Box component="span" sx={{ color: '#e3b341', fontWeight: 700 }}>~</Box>;

  const rows = [
    { feature: 'Open Source',                  kb: YES,  oracle: YES,  percona: YES,  bitpoke: YES  },
    { feature: 'Multi-engine (one operator)',   kb: YES,  oracle: NO,   percona: NO,   bitpoke: NO   },
    { feature: 'SemiSync Replication',          kb: YES,  oracle: YES,  percona: PART, bitpoke: YES  },
    { feature: 'Group Replication (MGR)',        kb: YES,  oracle: YES,  percona: PART, bitpoke: NO   },
    { feature: 'Orchestrator HA',               kb: YES,  oracle: NO,   percona: NO,   bitpoke: NO   },
    { feature: 'ProxySQL (read/write split)',    kb: YES,  oracle: NO,   percona: YES,  bitpoke: YES  },
    { feature: 'PITR (binlog streaming)',        kb: YES,  oracle: PART, percona: YES,  bitpoke: PART },
    { feature: 'Unified OpsRequest API',        kb: YES,  oracle: NO,   percona: NO,   bitpoke: NO   },
    { feature: 'Dynamic config (no restart)',   kb: YES,  oracle: PART, percona: PART, bitpoke: PART },
    { feature: 'Horizontal scaling OpsRequest', kb: YES,  oracle: PART, percona: PART, bitpoke: NO   },
    { feature: 'TLS in-place rotation',         kb: YES,  oracle: PART, percona: PART, bitpoke: PART },
    { feature: 'Prometheus metrics',            kb: YES,  oracle: YES,  percona: YES,  bitpoke: YES  },
  ];

  const cols = [
    { label: 'KubeBlocks', highlight: true },
    { label: 'Oracle MySQL Operator', highlight: false },
    { label: 'Percona Operator', highlight: false },
    { label: 'Bitpoke Operator', highlight: false },
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
            <Box component="span" color="primary.main">Other MySQL Operators</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            ✓ = Supported · ~ = Partial / Limited · ✗ = Not supported
          </Typography>
        </Box>

        <Box sx={{ overflowX: 'auto', borderRadius: '14px', border: `1px solid ${cardBorder}` }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', bgcolor: cardBg }}>
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
                  }}
                >
                  Feature
                </Box>
                {cols.map(({ label, highlight }) => (
                  <Box
                    key={label}
                    component="th"
                    sx={{
                      px: 2, py: 2, textAlign: 'center',
                      fontSize: '0.78rem', fontWeight: 700,
                      color: highlight ? 'primary.main' : 'text.secondary',
                      letterSpacing: '.04em',
                      borderBottom: `1px solid ${cardBorder}`,
                      borderLeft: `1px solid ${cardBorder}`,
                      bgcolor: highlight
                        ? (isDark ? alpha('#0165CB', 0.08) : alpha('#0165CB', 0.04))
                        : (isDark ? '#161b22' : '#f6f8fa'),
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box component="tbody">
              {rows.map(({ feature, kb, oracle, percona, bitpoke }) => (
                <Box
                  key={feature}
                  component="tr"
                  sx={{
                    '&:hover td, &:hover th': {
                      bgcolor: isDark ? alpha('#fff', 0.02) : alpha('#000', 0.02),
                    },
                  }}
                >
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
                  {[kb, oracle, percona, bitpoke].map((val, j) => (
                    <Box
                      key={j}
                      component="td"
                      sx={{
                        ...cellSx,
                        borderLeft: `1px solid ${cardBorder}`,
                        bgcolor: j === 0
                          ? (isDark ? alpha('#0165CB', 0.06) : alpha('#0165CB', 0.03))
                          : 'inherit',
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

        <Typography
          variant="body2"
          sx={{ color: 'text.disabled', textAlign: 'center', mt: 2, fontSize: '0.75rem' }}
        >
          Based on publicly available documentation. Features may vary by version.
        </Typography>
      </Container>
    </Box>
  );
}

// ── 6. Quick Start ────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'MySQL + 35 other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks MySQL Operator,{' '}
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

// ── Root ──────────────────────────────────────────────────────────────────────

export default function MysqlOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topologies />
      <ComparisonTable />
      <CapabilitiesDiagrams />
      <PerformanceBenchmark />
      <LifecycleFeatures />
      <CTA />
    </Box>
  );
}
