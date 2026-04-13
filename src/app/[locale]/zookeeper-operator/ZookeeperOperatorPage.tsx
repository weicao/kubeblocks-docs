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
  Typography,
  useTheme,
} from '@mui/material';
import ZookeeperArchitectureDiagram from '@/components/ZookeeperArchitectureDiagram';
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

// ── 1. Hero ───────────────────────────────────────────────────────────────────

const DEPLOY_YAML = `apiVersion: apps.kubeblocks.io/v1
kind: Cluster
metadata:
  name: zookeeper-cluster
  namespace: demo
spec:
  terminationPolicy: Delete
  componentSpecs:
    - name: zookeeper
      componentDef: zookeeper
      serviceVersion: "3.9.4"
      replicas: 3`;

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
              KubeBlocks ZooKeeper Operator{' '}
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
              Deploy production-grade Apache ZooKeeper ensembles in minutes.
              Leader election, ZAB consensus, role-aware routing, and full Day-2 operations.
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
                href="/docs/preview/kubeblocks-for-zookeeper/02-quickstart"
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
                { value: '0', label: 'Data Loss on Failover (RPO)' },
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

          {/* Right: terminal steps */}
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
                Deploy ZooKeeper in 4 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install ZooKeeper Addon</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'helm upgrade -i kb-addon-zookeeper kubeblocks/zookeeper \\\n  -n kb-system'}
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a ZooKeeper Ensemble</Typography>
              </Box>
              <Box sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                <YamlBlock code={DEPLOY_YAML} isDark={true} />
              </Box>

              {/* Step 4 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Ensemble is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster zookeeper-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME                CLUSTER-DEF   STATUS    AGE\n'}</span>
                {'zookeeper-cluster               '}
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

// ── 2. Architecture ───────────────────────────────────────────────────────────

function Architecture() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Architecture" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            ZAB Consensus.{' '}
            <Box component="span" color="primary.main">Role-Aware Routing.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 600, mx: 'auto', lineHeight: 1.75 }}>
            Every ensemble runs the ZooKeeper Atomic Broadcast protocol for strict ordering guarantees.
            KubeBlocks provides separate services for leader-only writes and all-node reads.
          </Typography>
        </Box>

        <ZookeeperArchitectureDiagram />

        {/* Key facts */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3, mt: 4,
          }}
        >
          {[
            {
              color: '#3fb950',
              title: 'Leader-Only Write Service',
              desc: 'The <cluster>-zookeeper ClusterIP service uses roleSelector to route all writes to the current leader. When the leader changes, Kubernetes endpoint controller automatically updates the service endpoints — no client reconfiguration needed.',
            },
            {
              color: '#0d7d86',
              title: 'All-Node Read Service',
              desc: 'The <cluster>-zookeeper-readable ClusterIP service routes reads across all ensemble members, distributing load and maximizing read throughput for read-heavy workloads.',
            },
            {
              color: '#7c3aed',
              title: 'ZAB Protocol',
              desc: 'ZooKeeper Atomic Broadcast ensures all updates are totally ordered across the ensemble. A majority quorum must acknowledge each write before it is committed — 3 nodes tolerate 1 failure, 5 nodes tolerate 2.',
            },
          ].map(({ color, title, desc }) => (
            <Box
              key={title}
              sx={{
                p: 3, borderRadius: 2,
                border: '1px solid', borderColor: 'divider',
                bgcolor: isDark ? alpha(color, 0.05) : alpha(color, 0.03),
                transition: 'border-color .2s',
                '&:hover': { borderColor: alpha(color, 0.4) },
              }}
            >
              <Box sx={{ width: 4, height: 20, borderRadius: 1, bgcolor: color, mb: 1.5 }} />
              <Typography fontWeight={700} fontSize="0.9rem" mb={1}>{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.82rem' }}>
                {desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'High Availability & Scaling',
    color: '#0165CB',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove ensemble members online. KubeBlocks ensures quorum safety — never scale below 3 nodes on an active ensemble.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running pods with a rolling update that preserves quorum throughout.' },
      { title: 'Volume Expansion', desc: 'Expand data and snapshot-log PVCs without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts with quorum-aware sequencing to keep the ensemble available.' },
      { title: 'Stop / Start', desc: 'Suspend the ensemble to eliminate compute cost; resume with full state and leader election.' },
    ],
  },
  {
    title: 'Configuration, Observability & Backup',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune ZooKeeper parameters via OpsRequest — tickTime, maxClientCnxns, syncLimit — without full pod restarts.' },
      { title: 'Minor Version Upgrade', desc: 'Rolling upgrades across ZooKeeper 3.4 through 3.9 minor versions with health and quorum checks.' },
      { title: 'Prometheus Metrics', desc: 'Per-node metrics exposed on port 7000 via the built-in metrics provider; compatible with Prometheus and Grafana.' },
      { title: 'Admin API', desc: 'ZooKeeper Admin Server accessible on port 8080 for ruok checks, stat, and mntr commands.' },
      { title: 'Backup & Restore', desc: 'Snapshot-based backup via zoocreeper; restore to a new ensemble from any stored snapshot.' },
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

// ── 4. Capabilities Diagrams ──────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { label: 'Snapshot Backup & Restore' },
    { label: 'Rolling Upgrade' },
    { label: 'Auto Leader Failover' },
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
        @keyframes cd-glow-target {
          0%, 100% { box-shadow: 0 0 10px #4ADE80; }
          50%       { box-shadow: 0 0 20px #4ADE80, 0 0 8px #4ADE80; }
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
        /* ── Backup ── */
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
        .cd-tl-events { position: relative; height: 100px; margin-top: -2px; }
        .cd-tl-event {
          position: absolute; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .cd-tl-dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid #16181f; position: relative; z-index: 2; margin-top: -5px;
        }
        .cd-tl-dot.full   { background: #F29111; box-shadow: 0 0 10px #F29111; }
        .cd-tl-dot.target {
          background: #4ADE80; width: 18px; height: 18px; margin-top: -7px;
          animation: cd-glow-target 1.8s ease-in-out infinite;
        }
        .cd-tl-tag {
          font-size: 11px; font-weight: 600; padding: 3px 8px;
          border-radius: 6px; white-space: nowrap;
        }
        .cd-tl-tag.full   { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cd-tl-tag.target { background: rgba(74,222,128,0.12);  color: #4ADE80; border: 1px solid #4ADE80; }
        .cd-tl-time { font-size: 11px; color: var(--cd-text-muted, #8B90A0); font-family: "JetBrains Mono", monospace; }
        .cd-restore {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 24px 28px;
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .cd-restore-step { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 150px; }
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
        .cd-s3-badge {
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
        .cd-traffic-track { flex: 1; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
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
            <Box component="span" color="primary.main">Production ZooKeeper</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running ZooKeeper on Kubernetes — so your team doesn&apos;t have to.
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

        {/* ── Panel 0: Snapshot Backup & Restore ── */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-orange"></div>
              <div className="cd-title-group">
                <div className="cd-title">Snapshot Backup &amp; Restore</div>
                <div className="cd-desc">Scheduled snapshot backups via zoocreeper. Restore a full ensemble to any stored snapshot in minutes.</div>
              </div>
              <div className="cd-badge cd-badge-orange">zoocreeper</div>
            </div>

            <div className="cd-tl-label">Backup Timeline</div>
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div className="cd-tl-track">
                <div className="cd-tl-fill"></div>
              </div>
              <div className="cd-tl-events">
                <div className="cd-tl-event" style={{ left: '5%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Snapshot</div>
                  <div className="cd-tl-time">00:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '36%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Snapshot</div>
                  <div className="cd-tl-time">08:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '67%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Snapshot</div>
                  <div className="cd-tl-time">16:00</div>
                </div>
                <div className="cd-tl-event" style={{ left: '88%' }}>
                  <div className="cd-tl-dot target"></div>
                  <div className="cd-tl-tag target">Restore Target</div>
                  <div className="cd-tl-time">20:17</div>
                </div>
              </div>
            </div>

            <div className="cd-restore">
              <div className="cd-restore-step">
                <div className="cd-restore-icon orange"></div>
                <div className="cd-restore-text">
                  <strong>1. Load Snapshot</strong>
                  <span>Restore nearest snapshot before the target point</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon blue"></div>
                <div className="cd-restore-text">
                  <strong>2. Replay TXN Log</strong>
                  <span>Apply committed transactions from the transaction log</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon green"></div>
                <div className="cd-restore-text">
                  <strong>3. ZK Cluster Ready</strong>
                  <span>New ensemble started, leader elected via ZAB</span>
                </div>
              </div>
              <div className="cd-s3-badge">✓ S3-Compatible Storage</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Rolling Upgrade ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-blue"></div>
              <div className="cd-title-group">
                <div className="cd-title">Rolling Upgrade</div>
                <div className="cd-desc">Followers are upgraded first. Leader is transferred to a new-version node before upgrading the old leader.</div>
              </div>
              <div className="cd-badge cd-badge-blue">Minimal Cutover</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>zk-0<div className="cd-pod-version cd-v-old">3.8.4</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>zk-1<div className="cd-pod-version cd-v-old">3.8.4</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>zk-2<div className="cd-pod-version cd-v-old">3.8.4</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Followers</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>zk-0<div className="cd-pod-version cd-v-old">3.8.4</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>zk-1<div className="cd-pod-version cd-v-new">3.9.4</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>zk-2<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 3 — Transfer</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>zk-0<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>zk-1<div className="cd-pod-version cd-v-new">3.9.4 ★</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>zk-2<div className="cd-pod-version cd-v-new">3.9.4</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>zk-0<div className="cd-pod-version cd-v-new">3.9.4</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>zk-1<div className="cd-pod-version cd-v-new">3.9.4 ★</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>zk-2<div className="cd-pod-version cd-v-new">3.9.4</div></div>
                </div>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Application Traffic</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Minimal Client Impact</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Auto Leader Failover ── */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green"></div>
              <div className="cd-title-group">
                <div className="cd-title">Automatic Leader Failover</div>
                <div className="cd-desc">ZAB detects leader loss, the remaining quorum elects a new leader, and KubeBlocks updates the write service endpoint — all within seconds.</div>
              </div>
              <div className="cd-badge cd-badge-green">RTO &lt; 15s</div>
            </div>

            <div className="cd-fo-timeline">
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+0s — Normal</div>
                <div className="cd-fo-card phase-0">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-0<div className="cd-fo-node-role role-primary">Leader</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-1<div className="cd-fo-node-role role-replica">Follower</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-2<div className="cd-fo-node-role role-replica">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot red"></div>T+1s — Failure</div>
                <div className="cd-fo-card phase-1">
                  <div className="cd-fo-card-title red">Leader Down</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node failed"><div className="cd-fo-node-dot"></div>zk-0<div className="cd-fo-node-role role-primary">Failed</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-1<div className="cd-fo-node-role role-replica">Follower</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-2<div className="cd-fo-node-role role-replica">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot yellow"></div>T+3s — ZAB Detect</div>
                <div className="cd-fo-card phase-2">
                  <div className="cd-fo-card-title yellow">Detecting</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>zk-0<div className="cd-fo-node-role role-primary">Unreachable</div></div>
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>zk-1<div className="cd-fo-node-role role-elect">Candidate</div></div>
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>zk-2<div className="cd-fo-node-role role-elect">Candidate</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot blue"></div>T+8s — Election</div>
                <div className="cd-fo-card phase-3">
                  <div className="cd-fo-card-title blue">ZAB Election</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>zk-0<div className="cd-fo-node-role role-replica">Offline</div></div>
                    <div className="cd-fo-node promoting"><div className="cd-fo-node-dot"></div>zk-1<div className="cd-fo-node-role role-elect">Electing…</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-2<div className="cd-fo-node-role role-replica">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+13s — Recovered</div>
                <div className="cd-fo-card phase-4">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>zk-0<div className="cd-fo-node-role role-replica">Restarting</div></div>
                    <div className="cd-fo-node new-primary"><div className="cd-fo-node-dot"></div>zk-1<div className="cd-fo-node-role role-new">Leader ★</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>zk-2<div className="cd-fo-node-role role-replica">Follower</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cd-fo-summary">
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val green">&lt; 15s</div>
                <div className="cd-fo-metric-label">Recovery Time (RTO)</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val blue">0</div>
                <div className="cd-fo-metric-label">Data Loss (RPO)</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-metric">
                <div className="cd-fo-metric-val orange">ZAB</div>
                <div className="cd-fo-metric-label">Consensus Protocol</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-desc">
                <strong>No human intervention needed.</strong> KubeBlocks monitors ensemble health and automatically updates the leader-only ClusterIP service endpoint when ZAB elects a new leader — clients reconnect without reconfiguration.
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Related Operators ──────────────────────────────────────────────────────

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
              href="/kafka-operator"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, mb: 1 }}
            >
              Apache Kafka Operator for Kubernetes →
            </Button>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              ZooKeeper is the external coordination layer for Apache Kafka 2.x.
              KubeBlocks manages both — deploy your Kafka cluster and ZooKeeper ensemble
              with a single operator and unified Day-2 operations.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 6. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'ZooKeeper & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks ZooKeeper Operator,{' '}
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

export default function ZookeeperOperatorPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Architecture />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <RelatedOperators />
      <CTA />
    </>
  );
}
