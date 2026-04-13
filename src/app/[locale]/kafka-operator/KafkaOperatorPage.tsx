'use client';

import React, { useState } from 'react';
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
import TrustedBy from '@/app/[locale]/trusted-by';
import KafkaCombinedArchitectureDiagram from '@/components/KafkaCombinedArchitectureDiagram';
import KafkaArchitectureDiagram from '@/components/KafkaArchitectureDiagram';
import KafkaZookeeperArchitectureDiagram from '@/components/KafkaZookeeperArchitectureDiagram';

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
              KubeBlocks Kafka Operator{' '}
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
              Deploy production-grade Apache Kafka clusters in minutes. KRaft mode,
              declarative topic management, SASL &amp; TLS security, and full Day-2
              operations.
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
                href="/docs/preview/kubeblocks-for-kafka/overview"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Read the Docs
              </Button>
            </Stack>

            <Box
              sx={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2, pt: 4,
                borderTop: '1px solid', borderColor: 'divider',
              }}
            >
              {[
                { value: '3',    label: 'Deployment Modes' },
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
                Deploy Kafka in 3 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Deploy a KRaft Combined Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>kafka-cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>namespace</span>{': '}
                <span style={{ color: '#a5d6ff' }}>demo{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>kafka{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>combined_monitor</span>
                <span style={{ color: '#6e7681' }}>  # or separated_monitor{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>componentSpecs</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>kafka-combine{'\n'}</span>
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
                {'kubectl get cluster kafka-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME            CLUSTER-DEF   TOPOLOGY           STATUS    AGE\n'}</span>
                {'kafka-cluster   kafka         combined_monitor   '}
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
    name: 'Combined Mode',
    badgeColor: '#0165CB',
    tags: ['KRaft', 'Dev & Small Production', 'Simpler Operations'],
    desc: 'Each node acts as both a Kafka broker and a KRaft controller. The metadata quorum and message storage run on the same pods. Ideal for development, testing, and small-to-medium production clusters where operational simplicity matters.',
    features: [
      'Broker and controller roles on the same pods',
      'No ZooKeeper dependency — pure KRaft consensus',
      'Quorum of 3 nodes handles both metadata and data',
      'Simpler architecture with fewer moving parts',
      'SASL/TLS security can be enabled independently',
    ],
    diagram: <KafkaCombinedArchitectureDiagram />,
  },
  {
    name: 'Separated Mode',
    badgeColor: '#059669',
    tags: ['KRaft', 'Large-Scale Production', 'Independent Scaling'],
    desc: 'Controllers and brokers run as separate pods. A dedicated 3-node controller quorum manages cluster metadata, while the broker pool handles message storage and client connections. Recommended for production clusters with high throughput requirements.',
    features: [
      'Dedicated 3-node KRaft controller quorum for metadata',
      'Broker pool and controller quorum scale independently, with isolated failure domains',
      'Controller quorum carries no storage overhead — brokers get the full PVC allocation',
      'Granular resource tuning per layer (CPU/memory for controllers vs brokers)',
      'Recommended for high-throughput production deployments',
    ],
    diagram: <KafkaArchitectureDiagram />,
  },
  {
    name: 'ZooKeeper Mode (Legacy)',
    badgeColor: '#92600a',
    tags: ['Kafka 2.7', 'Legacy', 'External ZooKeeper Required'],
    desc: 'Kafka 2.7 broker-only pods coordinated by an external ZooKeeper ensemble. ZooKeeper handles controller election, topic metadata, ISR tracking, and broker registration. Requires a separate ZooKeeper cluster referenced via serviceRef.',
    features: [
      'Broker-only pods — no embedded controller role',
      'External ZooKeeper ensemble manages all cluster metadata',
      'One broker elected as Kafka Controller via ZooKeeper ephemeral node',
      'Same per-pod ClusterIP service routing as KRaft topologies',
      'For new deployments, prefer Combined or Separated (KRaft) instead',
    ],
    diagram: <KafkaZookeeperArchitectureDiagram />,
  },
];

function Topologies() {
  const [tab, setTab] = useState(0);
  const topo = topoData[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Kafka Topologies" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Combined or Separated.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            Choose Combined mode for simplicity or Separated mode for independent scaling
            at large scale — both run on modern KRaft without ZooKeeper.
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' }, gap: 5, alignItems: 'start' }}>
          {/* Description + features */}
          <Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>
              {topo.desc}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {topo.features.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, bgcolor: alpha(topo.badgeColor, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: topo.badgeColor, fontWeight: 800, mt: '2px' }}>
                    ✓
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                    {f}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {topo.tags.map((tag) => (
                <Box key={tag} sx={{ px: 1.5, py: 0.5, borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, bgcolor: alpha(topo.badgeColor, 0.1), color: topo.badgeColor, border: `1px solid ${alpha(topo.badgeColor, 0.25)}`, letterSpacing: '.02em' }}>
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Diagram */}
          <Box>{topo.diagram}</Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'Kafka-Native Operations',
    color: '#0165CB',
    items: [
      { title: 'Topic Management', desc: 'Create, alter, and delete topics declaratively via OpsRequest — set partition count, replication factor, and per-topic config.' },
      { title: 'ACL Management', desc: 'Grant and revoke fine-grained producer/consumer/admin permissions per user, host, and resource pattern via OpsRequest.' },
      { title: 'Quota Management', desc: 'Set per-user and per-client bandwidth throttles (producerByteRate, consumerByteRate, requestPercentage) without direct broker config.' },
      { title: 'Horizontal Scaling', desc: 'Add or remove broker nodes online. KubeBlocks handles pod lifecycle; use Kafka Cruise Control or kbcli for partition rebalancing.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory requests/limits on running broker or controller pods with minimal disruption.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage on broker nodes without pod restarts on supported storage classes.' },
      { title: 'Stop / Start', desc: 'Suspend the cluster to save compute cost, then resume with full state preserved.' },
    ],
  },
  {
    title: 'Security, Configuration & Observability',
    color: '#059669',
    items: [
      { title: 'TLS Encryption', desc: 'Enable in-flight TLS for client and inter-broker connections. Certificates auto-issued via cert-manager or the built-in KubeBlocks issuer.' },
      { title: 'SASL Authentication', desc: 'SCRAM-SHA-256/512 authentication for client and broker connections. Credentials managed as Kubernetes Secrets.' },
      { title: 'Dynamic Configuration', desc: 'Tune Kafka broker parameters via OpsRequest — changes applied without broker restart where the config supports it.' },
      { title: 'Minor Version Upgrade', desc: 'Rolling broker-by-broker upgrades across Kafka 3.x minor versions with automated health checks.' },
      { title: 'Prometheus Metrics', desc: 'Per-broker JMX Exporter sidecar (port 5556) for JVM metrics, plus a dedicated kafka-exporter pod (port 9308) for consumer group lag, partition offsets, and topic throughput. Grafana dashboards included.' },
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
            No SSH into brokers, no direct kafka-topics.sh calls. Submit an OpsRequest and KubeBlocks handles the rest.
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
                  <Box key={featureTitle} sx={{ display: 'flex', gap: 2, py: 2, borderBottom: idx < items.length - 1 ? `1px solid ${cardBorder}` : 'none', transition: 'background .15s', borderRadius: 1, px: 1, mx: -1, '&:hover': { bgcolor: isDark ? alpha('#fff', 0.03) : alpha('#000', 0.02) } }}>
                    <Box sx={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: '1px', bgcolor: alpha(color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color, fontWeight: 800 }}>
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

// ── 4. Capabilities Diagrams ──────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const tabs = [
    { label: 'Rolling Upgrade' },
    { label: 'Scale Out' },
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
        @keyframes cd-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes cd-glow-green {
          0%, 100% { box-shadow: 0 0 6px #4ADE80; }
          50%       { box-shadow: 0 0 14px #4ADE80, 0 0 4px #4ADE80; }
        }
        .cd-card {
          background: var(--cd-card-bg, #1e2130);
          border: 1px solid var(--cd-border, rgba(255,255,255,0.08));
          border-radius: 20px; padding: 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--cd-text, #E8EAF0);
        }
        @media (max-width: 600px) { .cd-card { padding: 24px 16px; } }
        .cd-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 32px; gap: 16px; flex-wrap: wrap;
        }
        .cd-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .cd-icon-orange { background: rgba(242,145,17,0.12); }
        .cd-icon-blue   { background: rgba(108,182,255,0.12); }
        .cd-icon-green  { background: rgba(74,222,128,0.12); }
        .cd-title-group { flex: 1; }
        .cd-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .cd-desc  { font-size: 14px; color: var(--cd-text-muted, #8B90A0); }
        .cd-badge { padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .cd-badge-orange { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cd-badge-blue   { background: rgba(108,182,255,0.12); color: #6CB6FF; border: 1px solid #6CB6FF; }
        .cd-badge-green  { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        .cd-panel {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 20px;
        }
        .cd-panel-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 16px; }
        .cd-status-row {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          border-radius: 8px; margin-bottom: 8px; font-size: 12px;
          font-family: "JetBrains Mono", monospace;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
        }
        .cd-status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cd-status-dot.green  { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; animation: cd-glow-green 2s ease-in-out infinite; }
        .cd-status-dot.blue   { background: #6CB6FF; }
        .cd-status-dot.orange { background: #F29111; }
        .cd-status-val { margin-left: auto; font-size: 11px; font-weight: 600; }
        .cd-status-val.green  { color: #4ADE80; }
        .cd-status-val.blue   { color: #6CB6FF; }
        .cd-status-val.orange { color: #F29111; }
        /* upgrade grid */
        .cd-upgrade-grid {
          display: grid;
          grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr;
          gap: 8px; margin-bottom: 28px; align-items: start;
        }
        @media (max-width: 700px) {
          .cd-upgrade-grid { grid-template-columns: 1fr 1fr; }
          .cd-stage-arrow  { display: none; }
        }
        .cd-stage { background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 16px; }
        .cd-stage.highlight { border-color: #6CB6FF; }
        .cd-stage-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 16px; }
        .cd-stage-label span { background: var(--cd-border, rgba(255,255,255,0.06)); padding: 2px 8px; border-radius: 4px; }
        .cd-pod-grid { display: flex; flex-direction: column; gap: 8px; }
        .cd-pod { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; border: 1px solid transparent; font-size: 12px; font-weight: 500; font-family: "JetBrains Mono", monospace; }
        .cd-pod-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cd-pod.running    { background: rgba(74,222,128,0.06); border-color: rgba(74,222,128,0.2); }
        .cd-pod.running    .cd-pod-dot { background: #4ADE80; }
        .cd-pod.new        { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 8px rgba(108,182,255,0.2); }
        .cd-pod.new        .cd-pod-dot { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cd-pod.upgrading  { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cd-pod.upgrading  .cd-pod-dot { background: #FACC15; animation: cd-pulse 1s ease infinite; }
        .cd-pod.old        { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cd-pod.old        .cd-pod-dot { background: #8B90A0; }
        .cd-pod-version { margin-left: auto; font-size: 10px; padding: 1px 6px; border-radius: 4px; font-weight: 600; }
        .cd-v-old { background: var(--cd-border, rgba(255,255,255,0.06)); color: var(--cd-text-muted, #8B90A0); }
        .cd-v-new { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cd-v-upg { background: rgba(250,204,21,0.1); color: #FACC15; }
        .cd-stage-arrow { display: flex; align-items: center; justify-content: center; color: var(--cd-text-muted, #8B90A0); font-size: 18px; padding-top: 40px; }
        .cd-traffic { background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; }
        .cd-traffic-label { font-size: 12px; color: var(--cd-text-muted, #8B90A0); font-weight: 500; white-space: nowrap; }
        .cd-traffic-track { flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
        .cd-traffic-fill { height: 100%; border-radius: 3px; width: 100%; background: linear-gradient(90deg, #3fb950, #79c0ff, #3fb950); background-size: 200% 100%; animation: cd-shimmer 2s linear infinite; }
        .cd-traffic-status { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }
        /* scale-out */
        .cd-scale-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 24px; }
        @media (max-width: 600px) { .cd-scale-grid { grid-template-columns: repeat(3, 1fr); } }
        .cd-broker-node { border-radius: 12px; padding: 16px 10px; text-align: center; border: 1px solid; }
        .cd-broker-node.existing { background: rgba(74,222,128,0.05); border-color: rgba(74,222,128,0.25); }
        .cd-broker-node.new-node { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 12px rgba(108,182,255,0.2); }
        .cd-broker-icon { font-size: 20px; margin-bottom: 8px; }
        .cd-broker-name { font-size: 11px; font-family: "JetBrains Mono", monospace; font-weight: 600; margin-bottom: 6px; }
        .cd-broker-badge { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
        .cd-broker-badge.exist { background: rgba(74,222,128,0.1); color: #4ADE80; }
        .cd-broker-badge.added { background: rgba(108,182,255,0.12); color: #6CB6FF; }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production Kafka</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running Apache Kafka on Kubernetes — so your team doesn&apos;t have to.
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

        {/* ── Panel 0: Rolling Upgrade ── */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-blue">↻</div>
              <div className="cd-title-group">
                <div className="cd-title">Rolling Broker Upgrade</div>
                <div className="cd-desc">Brokers are upgraded one by one. Producers and consumers experience minimal client impact during the rolling restart.</div>
              </div>
              <div className="cd-badge cd-badge-blue">Minimal Cutover</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod running"><div className="cd-pod-dot"></div>broker-0<div className="cd-pod-version cd-v-old">3.7.1</div></div>
                  <div className="cd-pod running"><div className="cd-pod-dot"></div>broker-1<div className="cd-pod-version cd-v-old">3.7.1</div></div>
                  <div className="cd-pod running"><div className="cd-pod-dot"></div>broker-2<div className="cd-pod-version cd-v-old">3.7.1</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Upgrade</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod running"><div className="cd-pod-dot"></div>broker-0<div className="cd-pod-version cd-v-old">3.7.1</div></div>
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-1<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>broker-2<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 3 — Finish</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>broker-0<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-1<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-2<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Done</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-0<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-1<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                  <div className="cd-pod new"><div className="cd-pod-dot"></div>broker-2<div className="cd-pod-version cd-v-new">3.9.0</div></div>
                </div>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Producer &amp; Consumer Traffic</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Minimal Client Impact</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Scale Out ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green">+</div>
              <div className="cd-title-group">
                <div className="cd-title">Horizontal Scale Out</div>
                <div className="cd-desc">Add broker nodes online to increase throughput capacity. KubeBlocks handles the pod lifecycle.</div>
              </div>
              <div className="cd-badge cd-badge-green">Online Scale Out</div>
            </div>

            <div className="cd-scale-grid">
              {[
                { name: 'broker-0', isNew: false },
                { name: 'broker-1', isNew: false },
                { name: 'broker-2', isNew: false },
                { name: 'broker-3', isNew: true },
                { name: 'broker-4', isNew: true },
              ].map(({ name, isNew }) => (
                <div key={name} className={`cd-broker-node ${isNew ? 'new-node' : 'existing'}`}>
                  <div className="cd-broker-name" style={{ color: isNew ? '#6CB6FF' : 'var(--cd-text)' }}>{name}</div>
                  <div className={`cd-broker-badge ${isNew ? 'added' : 'exist'}`}>{isNew ? 'ADDED' : 'RUNNING'}</div>
                </div>
              ))}
            </div>

            <div className="cd-panel" style={{ marginBottom: '16px' }}>
              <div className="cd-panel-title">After Scaling (3 → 5 brokers)</div>
              <div className="cd-status-row">
                <div className="cd-status-dot green"></div>
                <span>Active brokers</span>
                <span className="cd-status-val green">5</span>
              </div>
              <div className="cd-status-row">
                <div className="cd-status-dot blue"></div>
                <span>Total partitions (all topics)</span>
                <span className="cd-status-val blue">unchanged</span>
              </div>
              <div className="cd-status-row">
                <div className="cd-status-dot orange"></div>
                <span>Rebalance partitions</span>
                <span className="cd-status-val" style={{ color: 'var(--cd-text-muted)', fontSize: '11px' }}>manual step (after scale)</span>
              </div>
            </div>
            <Typography sx={{ fontSize: '0.78rem', color: 'text.disabled', textAlign: 'center' }}>
              KubeBlocks adds broker pods. Partition reassignment to new brokers is triggered separately via kbcli or Kafka tooling.
            </Typography>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 6. Related Operators ──────────────────────────────────────────────────────

function RelatedOperators() {
  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          fontWeight={700}
          color="text.secondary"
          mb={3}
          sx={{ textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '0.7rem' }}
        >
          Also on KubeBlocks
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box maxWidth={360}>
            <Button
              variant="outlined"
              href="/zookeeper-operator"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, mb: 1 }}
            >
              Apache ZooKeeper Operator for Kubernetes →
            </Button>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Running Kafka 2.x with an external ZooKeeper ensemble? KubeBlocks ZooKeeper Operator
              manages production-grade ZooKeeper clusters with ZAB consensus, quorum-safe scaling,
              and snapshot backup — on the same platform as Kafka.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 7. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'Kafka & 35+ other engines', 'KRaft — no ZooKeeper', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}>
            Get Started with KubeBlocks Kafka Operator,{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Risk-Free.</Box>
          </Typography>

          <Typography sx={{ fontSize: '1.05rem', color: 'text.secondary', maxWidth: 520, lineHeight: 1.75, mb: 4 }}>
            Open source and production-ready. Enterprise customers get dedicated onboarding,
            migration support, and SLA guarantees.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={4}>
            <Button variant="contained" size="large" href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700, px: 3.5, py: 1.5, fontSize: '0.95rem' }}>
              Try Playground Free →
            </Button>
            <Button variant="outlined" size="large" href="https://kubeblocks.com/contact" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 500, px: 3.5, py: 1.5, fontSize: '0.95rem' }}>
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

export default function KafkaOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topologies />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <RelatedOperators />
      <CTA />
    </Box>
  );
}
