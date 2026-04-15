'use client';

import React, { useMemo, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import hljsYaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('yaml', hljsYaml);
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
import RabbitMQArchitectureDiagram from '@/components/RabbitMQArchitectureDiagram';
import TrustedBy from '@/app/[locale]/trusted-by';

// ── YAML highlighter ──────────────────────────────────────────────────────────

const DARK_YAML_STYLE = `
.yaml-dark .hljs-attr    { color: #79c0ff; }
.yaml-dark .hljs-string  { color: #3fb950; }
.yaml-dark .hljs-number  { color: #e3b341; }
.yaml-dark .hljs-literal { color: #e3b341; }
.yaml-dark .hljs-comment { color: #7d8590; font-style: italic; }
`;
const LIGHT_YAML_STYLE = `
.yaml-light .hljs-attr    { color: #0550ae; }
.yaml-light .hljs-string  { color: #116329; }
.yaml-light .hljs-number  { color: #953800; }
.yaml-light .hljs-literal { color: #953800; }
.yaml-light .hljs-comment { color: #6e7781; font-style: italic; }
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
          m: 0, fontFamily: '"JetBrains Mono","Fira Code",monospace',
          fontSize: '0.78rem', lineHeight: 1.7, overflowX: 'auto',
          color: isDark ? '#e6edf3' : '#24292f',
          ...sx,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionEyebrow({ label }: { label: string }) {
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      mb: 1.5, fontSize: '11px', fontWeight: 700,
      letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main',
      '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' },
    }}>
      {label}
    </Box>
  );
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────

const CLUSTER_YAML = `apiVersion: apps.kubeblocks.io/v1
kind: Cluster
metadata:
  name: rabbitmq-cluster
  namespace: demo
spec:
  terminationPolicy: Delete
  componentSpecs:
    - name: rabbitmq
      componentDef: rabbitmq
      serviceVersion: "3.13.7"
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
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 6, md: 8 }, alignItems: 'center',
        }}>
          {/* Left: text */}
          <Box>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 1.5, py: 0.5, borderRadius: 100,
              border: '1px solid', borderColor: 'divider',
              fontSize: 12, fontWeight: 500, color: 'text.disabled', mb: 3,
            }}>
              Open Source · Production-Grade · CNCF Landscape
            </Box>

            <Typography variant="h2" mb={2.5}
              sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: isDark ? '#fff' : 'text.primary' }}>
              KubeBlocks RabbitMQ Operator{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>for Kubernetes</Box>
            </Typography>

            <Typography mb={4} sx={{
              color: isDark ? alpha('#fff', 0.7) : 'text.secondary',
              fontSize: { xs: 16, md: 17 }, lineHeight: 1.75,
            }}>
              Deploy production-grade RabbitMQ clusters on Kubernetes in minutes.
              Automate HA with quorum queues (Raft replication), and zero-downtime upgrades.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={7}>
              <Button variant="contained"
                href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
                target="_blank" size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 700 }}>
                Try Playground Free →
              </Button>
              <Button variant="outlined"
                href="/docs/preview/kubeblocks-for-rabbitmq/02-quickstart"
                size="large" sx={{ px: 4, py: 1.5 }}>
                Read the Docs
              </Button>
            </Stack>

            <Box sx={{
              display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              gap: 2, pt: 4, borderTop: '1px solid', borderColor: 'divider',
            }}>
              {[
                { value: '< 30s',  label: 'Leader Re-election' },
                { value: '100%',   label: 'Open Source' },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Typography variant="h4" fontWeight={800}
                    sx={{ color: 'primary.main', letterSpacing: '-0.03em' }}>
                    {value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: terminal */}
          <Box sx={{
            borderRadius: '16px', border: '1px solid rgba(249,115,22,0.15)',
            overflow: 'hidden', bgcolor: '#0d1117',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
          }}>
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
                Deploy RabbitMQ in 4 steps
              </Typography>
            </Box>

            <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Step 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(249,115,22,0.12)', border: '1px solid #F97316', color: '#F97316', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install KubeBlocks</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'hidden' }}>
                <span style={{ color: '#6e7681' }}># Add Helm repo{'\n'}</span>
                {'helm repo add kubeblocks https://apecloud.github.io/helm-charts\nhelm repo update\n\n'}
                <span style={{ color: '#6e7681' }}># Install KubeBlocks{'\n'}</span>
                {'helm install kubeblocks kubeblocks/kubeblocks \\\n  --namespace kb-system --create-namespace'}
              </Box>

              {/* Step 2 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(249,115,22,0.12)', border: '1px solid #F97316', color: '#F97316', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install RabbitMQ Addon</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'hidden' }}>
                {'helm upgrade -i kb-addon-rabbitmq kubeblocks/rabbitmq \\\n  --namespace kb-system'}
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(249,115,22,0.12)', border: '1px solid #F97316', color: '#F97316', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a RabbitMQ Cluster</Typography>
              </Box>
              <Box sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                <YamlBlock code={CLUSTER_YAML} isDark={true} />
              </Box>

              {/* Step 4 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(249,115,22,0.12)', border: '1px solid #F97316', color: '#F97316', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Cluster is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'hidden' }}>
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster rabbitmq-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME               CLUSTER-DEFINITION   TERMINATION-POLICY   STATUS    AGE\n'}</span>
                {'rabbitmq-cluster                        Delete               '}
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

// ── 2. Topology ───────────────────────────────────────────────────────────────

const RMQ_COLOR = '#F97316';

function Topology() {
  const features = [
    'Raft consensus — every quorum queue write is replicated to a majority before acknowledged',
    'Automatic leader re-election in under 30 seconds on node failure',
    'All nodes accept AMQP connections — clients reconnect to any surviving node',
    'Peer discovery via Kubernetes Endpoints API (no external etcd or ZooKeeper)',
    'Classic queues and quorum queues supported side-by-side',
    'Management UI on :15672, Prometheus metrics on :15692 per node',
  ];
  const tags = ['Quorum Queues', 'Raft Consensus', '3 or 5 Nodes', 'AMQP 0-9-1'];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="RabbitMQ Topology" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Production-Grade Cluster.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks deploys RabbitMQ as a 3- or 5-node HA cluster. Quorum queues use Raft replication for strong consistency; the cluster itself uses Erlang distributed clustering with Kubernetes peer discovery.
          </Typography>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
          gap: 5, alignItems: 'start',
        }}>
          {/* Description + features */}
          <Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>
              KubeBlocks deploys RabbitMQ in a 3-node (or 5-node) Raft cluster where quorum queues replicate every message to a majority of nodes before acknowledging the producer. If the leader node fails, the remaining quorum elects a new leader automatically — no manual intervention required.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {features.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    bgcolor: alpha(RMQ_COLOR, 0.12),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: RMQ_COLOR, fontWeight: 800, mt: '2px',
                  }}>✓</Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>{f}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag) => (
                <Box key={tag} sx={{
                  px: 1.5, py: 0.5, borderRadius: '6px',
                  fontSize: '0.78rem', fontWeight: 700,
                  bgcolor: alpha(RMQ_COLOR, 0.1), color: RMQ_COLOR,
                  border: `1px solid ${alpha(RMQ_COLOR, 0.25)}`,
                }}>
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Architecture diagram */}
          <Box><RabbitMQArchitectureDiagram /></Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'Availability & Scaling',
    color: RMQ_COLOR,
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove nodes (3→5 or 5→3) online. KubeBlocks joins new pods to the Raft cluster and rebalances queue leaders.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running nodes with a rolling strategy and no message loss.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage for message data without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts that maintain quorum throughout — the cluster stays available.' },
      { title: 'Stop / Start', desc: 'Suspend the cluster to eliminate compute cost; resume with full state and quorum intact.' },
    ],
  },
  {
    title: 'Configuration, Security & Observability',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Apply RabbitMQ parameters via OpsRequest. KubeBlocks applies changes with a rolling pod restart, keeping quorum available throughout.' },
      { title: 'Credential Management', desc: 'Admin credentials are auto-generated and stored in Kubernetes Secrets at cluster creation. Update via Secret rotation.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrades across supported versions (e.g. 3.13.7 → 4.0.9) with health checks between each pod.' },
      { title: 'Prometheus Metrics', desc: 'Per-node metrics on :15692 via the built-in Prometheus plugin. Grafana dashboards available.' },
      { title: 'Expose via LoadBalancer', desc: 'Expose AMQP or Management UI externally via a LoadBalancer or NodePort service.' },
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
                  <Box key={featureTitle} sx={{
                    display: 'flex', gap: 2, py: 2,
                    borderBottom: idx < items.length - 1 ? `1px solid ${cardBorder}` : 'none',
                    transition: 'background .15s', borderRadius: 1, px: 1, mx: -1,
                    '&:hover': { bgcolor: isDark ? alpha('#fff', 0.03) : alpha('#000', 0.02) },
                  }}>
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: '1px',
                      bgcolor: alpha(color, 0.1),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color, fontWeight: 800,
                    }}>✓</Box>
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
    { label: 'Auto Failover' },
    { label: 'Horizontal Scaling' },
    { label: 'Rolling Upgrade' },
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
        @keyframes cd-glow-orange {
          0%, 100% { box-shadow: 0 0 6px #F97316; }
          50%       { box-shadow: 0 0 14px #F97316, 0 0 4px #F97316; }
        }
        .cd-card {
          background: var(--cd-card-bg,#1e2130);
          border: 1px solid var(--cd-border,rgba(255,255,255,0.08));
          border-radius: 20px; padding: 40px;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          color: var(--cd-text,#E8EAF0);
        }
        @media (max-width:600px) { .cd-card { padding: 24px 16px; } }
        .cd-header {
          display:flex; align-items:flex-start; justify-content:space-between;
          margin-bottom:36px; gap:16px; flex-wrap:wrap;
        }
        .cd-icon {
          width:48px; height:48px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:22px; flex-shrink:0;
        }
        .cd-icon-orange { background:rgba(249,115,22,0.12); }
        .cd-icon-blue   { background:rgba(108,182,255,0.12); }
        .cd-icon-green  { background:rgba(74,222,128,0.12); }
        .cd-title-group { flex:1; }
        .cd-title { font-size:20px; font-weight:700; margin-bottom:6px; }
        .cd-desc  { font-size:14px; color:var(--cd-text-muted,#8B90A0); }
        .cd-badge { padding:6px 14px; border-radius:100px; font-size:12px; font-weight:700; flex-shrink:0; }
        .cd-badge-orange { background:rgba(249,115,22,0.12); color:#F97316; border:1px solid #F97316; }
        .cd-badge-blue   { background:rgba(108,182,255,0.12); color:#6CB6FF; border:1px solid #6CB6FF; }
        .cd-badge-green  { background:rgba(74,222,128,0.12);  color:#4ADE80; border:1px solid #4ADE80; }
        /* ── Failover timeline ── */
        .cd-fo-timeline {
          display:grid; grid-template-columns:repeat(5,1fr);
          gap:0; margin-bottom:32px; position:relative;
        }
        @media (max-width:700px) { .cd-fo-timeline { grid-template-columns:1fr; } }
        .cd-fo-phase { position:relative; padding:0 8px; }
        .cd-fo-phase::after {
          content:""; position:absolute; right:-1px; top:24px;
          width:2px; height:32px; background:var(--cd-border,rgba(255,255,255,0.08));
        }
        .cd-fo-phase:last-child::after { display:none; }
        .cd-fo-time {
          font-size:11px; font-family:"JetBrains Mono",monospace;
          color:var(--cd-text-muted,#8B90A0); margin-bottom:10px;
          display:flex; align-items:center; gap:6px;
        }
        .cd-fo-time-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .cd-fo-time-dot.green  { background:#4ADE80; box-shadow:0 0 6px #4ADE80; animation:cd-glow-green  2s ease-in-out infinite; }
        .cd-fo-time-dot.red    { background:#F87171; box-shadow:0 0 6px #F87171; }
        .cd-fo-time-dot.yellow { background:#FACC15; box-shadow:0 0 6px #FACC15; }
        .cd-fo-time-dot.blue   { background:#6CB6FF; box-shadow:0 0 6px #6CB6FF; }
        .cd-fo-card {
          background:var(--cd-card-bg,#1e2130);
          border:1px solid var(--cd-border,rgba(255,255,255,0.08));
          border-radius:10px; padding:14px 12px; font-size:12px;
        }
        .cd-fo-card.phase-0 { border-color:rgba(74,222,128,0.25); }
        .cd-fo-card.phase-1 { border-color:rgba(248,113,113,0.25); }
        .cd-fo-card.phase-2 { border-color:rgba(250,204,21,0.2); }
        .cd-fo-card.phase-3 { border-color:rgba(108,182,255,0.2); }
        .cd-fo-card.phase-4 { border-color:rgba(74,222,128,0.3); }
        .cd-fo-card-title { font-weight:700; font-size:12px; margin-bottom:10px; }
        .cd-fo-card-title.green  { color:#4ADE80; }
        .cd-fo-card-title.red    { color:#F87171; }
        .cd-fo-card-title.yellow { color:#FACC15; }
        .cd-fo-card-title.blue   { color:#6CB6FF; }
        .cd-fo-nodes { display:flex; flex-direction:column; gap:6px; }
        .cd-fo-node {
          display:flex; align-items:center; gap:6px;
          padding:5px 8px; border-radius:6px;
          font-size:11px; font-family:"JetBrains Mono",monospace;
          border:1px solid transparent;
        }
        .cd-fo-node-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .cd-fo-node.healthy  { background:rgba(74,222,128,0.06); }
        .cd-fo-node.healthy .cd-fo-node-dot { background:#4ADE80; animation:cd-glow-green 2s ease-in-out infinite; }
        .cd-fo-node.failed   { background:rgba(248,113,113,0.15); }
        .cd-fo-node.failed .cd-fo-node-dot { background:#F87171; animation:cd-pulse 0.8s ease infinite; }
        .cd-fo-node.detecting { background:rgba(250,204,21,0.06); }
        .cd-fo-node.detecting .cd-fo-node-dot { background:#FACC15; animation:cd-pulse 0.8s ease infinite; }
        .cd-fo-node.promoting { background:rgba(108,182,255,0.08); border-color:rgba(108,182,255,0.3); }
        .cd-fo-node.promoting .cd-fo-node-dot { background:#6CB6FF; animation:cd-pulse 0.6s ease infinite; }
        .cd-fo-node.new-leader { background:rgba(249,115,22,0.08); border-color:rgba(249,115,22,0.4); }
        .cd-fo-node.new-leader .cd-fo-node-dot { background:#F97316; box-shadow:0 0 6px #F97316; animation:cd-glow-orange 2s ease-in-out infinite; }
        .cd-fo-node.offline { opacity:0.3; }
        .cd-fo-node.offline .cd-fo-node-dot { background:#8B90A0; }
        .cd-fo-node-role {
          margin-left:auto; font-size:9px; font-weight:700;
          padding:1px 5px; border-radius:3px; text-transform:uppercase;
        }
        .role-leader   { background:rgba(249,115,22,0.12); color:#F97316; }
        .role-follower { background:var(--cd-border,rgba(255,255,255,0.05)); color:var(--cd-text-muted,#8B90A0); }
        .role-new      { background:rgba(74,222,128,0.12); color:#4ADE80; }
        .role-elect    { background:rgba(108,182,255,0.12); color:#6CB6FF; }
        .cd-fo-summary {
          background:var(--cd-box-bg,#252840); border:1px solid rgba(74,222,128,0.25);
          border-radius:14px; padding:20px 24px;
          display:flex; align-items:center; gap:32px; flex-wrap:wrap;
        }
        .cd-fo-metric { text-align:center; }
        .cd-fo-metric-val {
          font-size:28px; font-weight:800;
          font-family:"JetBrains Mono",monospace; line-height:1; margin-bottom:4px;
        }
        .cd-fo-metric-val.green  { color:#4ADE80; }
        .cd-fo-metric-val.blue   { color:#6CB6FF; }
        .cd-fo-metric-val.orange { color:#F97316; }
        .cd-fo-metric-label { font-size:11px; color:var(--cd-text-muted,#8B90A0); font-weight:500; }
        .cd-fo-divider { width:1px; height:40px; background:rgba(255,255,255,0.08); }
        .cd-fo-desc { flex:1; font-size:13px; color:var(--cd-text-muted,#8B90A0); min-width:200px; }
        .cd-fo-desc strong { color:var(--cd-text,#E8EAF0); }
        /* ── Scaling ── */
        .cd-scale-grid {
          display:grid; grid-template-columns:1fr 24px 1fr;
          gap:8px; margin-bottom:28px; align-items:start;
        }
        @media (max-width:600px) {
          .cd-scale-grid { grid-template-columns:1fr; }
          .cd-scale-arrow { display:none; }
        }
        .cd-scale-box {
          background:var(--cd-box-bg,#252840); border:1px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:20px 16px;
        }
        .cd-scale-box.highlight { border-color:#F97316; }
        .cd-scale-label {
          font-size:11px; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--cd-text-muted,#8B90A0); margin-bottom:16px;
        }
        .cd-scale-label span { background:var(--cd-border,rgba(255,255,255,0.06)); padding:2px 8px; border-radius:4px; }
        .cd-scale-nodes { display:flex; flex-direction:column; gap:8px; }
        .cd-snode {
          display:flex; align-items:center; gap:8px;
          padding:8px 10px; border-radius:8px; border:1px solid transparent;
          font-size:12px; font-weight:500;
          font-family:"JetBrains Mono",monospace;
        }
        .cd-snode-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .cd-snode.existing { background:rgba(249,115,22,0.08); border-color:rgba(249,115,22,0.3); }
        .cd-snode.existing .cd-snode-dot { background:#F97316; }
        .cd-snode.new-node { background:rgba(108,182,255,0.08); border-color:#6CB6FF; box-shadow:0 0 8px rgba(108,182,255,0.2); }
        .cd-snode.new-node .cd-snode-dot { background:#6CB6FF; box-shadow:0 0 6px #6CB6FF; animation:cd-pulse 1s ease infinite; }
        .cd-scale-arrow {
          display:flex; align-items:center; justify-content:center;
          color:var(--cd-text-muted,#8B90A0); font-size:18px; padding-top:36px;
        }
        .cd-scale-note {
          background:var(--cd-box-bg,#252840); border:1px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:16px 20px;
          display:flex; align-items:center; gap:16px; flex-wrap:wrap;
        }
        .cd-scale-note-dot { width:10px; height:10px; border-radius:50%; background:#F97316; flex-shrink:0; }
        .cd-scale-note-text { font-size:13px; color:var(--cd-text-muted,#8B90A0); }
        .cd-scale-note-text strong { color:var(--cd-text,#E8EAF0); }
        /* ── Upgrade ── */
        .cd-upgrade-grid {
          display:grid;
          grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr;
          gap:8px; margin-bottom:28px; align-items:start;
        }
        @media (max-width:700px) {
          .cd-upgrade-grid { grid-template-columns:1fr 1fr; }
          .cd-stage-arrow  { display:none; }
        }
        .cd-stage {
          background:var(--cd-box-bg,#252840); border:1px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:20px 16px;
        }
        .cd-stage.highlight { border-color:#6CB6FF; }
        .cd-stage-label {
          font-size:11px; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--cd-text-muted,#8B90A0); margin-bottom:16px;
        }
        .cd-stage-label span { background:var(--cd-border,rgba(255,255,255,0.06)); padding:2px 8px; border-radius:4px; }
        .cd-pod-grid { display:flex; flex-direction:column; gap:8px; }
        .cd-pod {
          display:flex; align-items:center; gap:8px;
          padding:8px 10px; border-radius:8px; border:1px solid transparent;
          font-size:12px; font-weight:500; font-family:"JetBrains Mono",monospace;
        }
        .cd-pod-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .cd-pod.leader-old { background:rgba(249,115,22,0.08); border-color:rgba(249,115,22,0.3); }
        .cd-pod.leader-old .cd-pod-dot { background:#F97316; }
        .cd-pod.leader-new { background:rgba(108,182,255,0.08); border-color:#6CB6FF; box-shadow:0 0 8px rgba(108,182,255,0.25); }
        .cd-pod.leader-new .cd-pod-dot { background:#6CB6FF; box-shadow:0 0 6px #6CB6FF; }
        .cd-pod.follower-old { background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.08); }
        .cd-pod.follower-old .cd-pod-dot { background:#8B90A0; }
        .cd-pod.follower-new { background:rgba(108,182,255,0.06); border-color:rgba(108,182,255,0.3); }
        .cd-pod.follower-new .cd-pod-dot { background:#6CB6FF; }
        .cd-pod.upgrading { background:rgba(250,204,21,0.06); border-color:rgba(250,204,21,0.3); }
        .cd-pod.upgrading .cd-pod-dot { background:#FACC15; animation:cd-pulse 1s ease infinite; }
        .cd-pod-version { margin-left:auto; font-size:10px; padding:1px 6px; border-radius:4px; font-weight:600; }
        .cd-v-old { background:var(--cd-border,rgba(255,255,255,0.06)); color:var(--cd-text-muted,#8B90A0); }
        .cd-v-new { background:rgba(108,182,255,0.12); color:#6CB6FF; }
        .cd-v-upg { background:rgba(250,204,21,0.1); color:#FACC15; }
        .cd-stage-arrow {
          display:flex; align-items:center; justify-content:center;
          color:var(--cd-text-muted,#8B90A0); font-size:18px; padding-top:40px;
        }
        .cd-traffic {
          background:var(--cd-box-bg,#252840); border:1px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:16px 20px;
          display:flex; align-items:center; gap:16px;
        }
        .cd-traffic-label { font-size:12px; color:var(--cd-text-muted,#8B90A0); font-weight:500; white-space:nowrap; }
        .cd-traffic-track { flex:1; height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; }
        .cd-traffic-fill {
          height:100%; border-radius:3px; width:100%;
          background:linear-gradient(90deg,#F97316,#6CB6FF,#F97316);
          background-size:200% 100%; animation:cd-shimmer 2s linear infinite;
        }
        .cd-traffic-status { font-size:12px; font-weight:700; color:#4ADE80; white-space:nowrap; }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production RabbitMQ</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running RabbitMQ on Kubernetes — so your team doesn&apos;t have to.
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
              bgcolor: activeTab === i ? 'rgba(249,115,22,0.10)' : 'transparent',
              color: activeTab === i ? 'primary.main' : 'text.secondary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}>
              {tab.label}
            </Box>
          ))}
        </Box>

        {/* Panel 0: Auto Failover */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green"></div>
              <div className="cd-title-group">
                <div className="cd-title">Automatic Raft Leader Re-election</div>
                <div className="cd-desc">When a node fails, the surviving quorum members elect a new quorum queue leader via Raft. KubeBlocks restarts the failed pod and rejoins it — all within 30 seconds.</div>
              </div>
              <div className="cd-badge cd-badge-green">RTO &lt; 30s</div>
            </div>
            <div className="cd-fo-timeline">
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+0s — Normal</div>
                <div className="cd-fo-card phase-0">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-0<div className="cd-fo-node-role role-leader">Leader</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-1<div className="cd-fo-node-role role-follower">Follower</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-2<div className="cd-fo-node-role role-follower">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot red"></div>T+1s — Failure</div>
                <div className="cd-fo-card phase-1">
                  <div className="cd-fo-card-title red">Node Down</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node failed"><div className="cd-fo-node-dot"></div>rabbit-0<div className="cd-fo-node-role role-leader">Failed</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-1<div className="cd-fo-node-role role-follower">Follower</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-2<div className="cd-fo-node-role role-follower">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot yellow"></div>T+5s — Detect</div>
                <div className="cd-fo-card phase-2">
                  <div className="cd-fo-card-title yellow">Detecting</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>rabbit-0<div className="cd-fo-node-role role-leader">Unreachable</div></div>
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>rabbit-1<div className="cd-fo-node-role role-elect">Candidate</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-2<div className="cd-fo-node-role role-follower">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot blue"></div>T+12s — Elect</div>
                <div className="cd-fo-card phase-3">
                  <div className="cd-fo-card-title blue">Electing</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>rabbit-0<div className="cd-fo-node-role role-follower">Offline</div></div>
                    <div className="cd-fo-node promoting"><div className="cd-fo-node-dot"></div>rabbit-1<div className="cd-fo-node-role role-elect">Elected…</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-2<div className="cd-fo-node-role role-follower">Follower</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+25s — Recovered</div>
                <div className="cd-fo-card phase-4">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>rabbit-0<div className="cd-fo-node-role role-follower">Rejoining</div></div>
                    <div className="cd-fo-node new-leader"><div className="cd-fo-node-dot"></div>rabbit-1<div className="cd-fo-node-role role-new">Leader ★</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>rabbit-2<div className="cd-fo-node-role role-follower">Follower</div></div>
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
                <div className="cd-fo-metric-val orange">Raft</div>
                <div className="cd-fo-metric-label">Consensus Protocol</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-desc">
                <strong>No human intervention needed.</strong> RabbitMQ&apos;s built-in Raft protocol detects the lost quorum member and promotes a new leader. KubeBlocks restarts the failed pod and rejoins it to the cluster automatically.
              </div>
            </div>
          </div>
        )}

        {/* Panel 1: Horizontal Scaling */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-orange"></div>
              <div className="cd-title-group">
                <div className="cd-title">Horizontal Scaling (3→5 Nodes)</div>
                <div className="cd-desc">Add nodes to grow the Raft quorum. KubeBlocks joins each new pod to the cluster and rebalances queue leaders across members.</div>
              </div>
              <div className="cd-badge cd-badge-orange">Zero Message Loss</div>
            </div>
            <div className="cd-scale-grid">
              <div className="cd-scale-box">
                <div className="cd-scale-label"><span>Before — 3 nodes</span></div>
                <div className="cd-scale-nodes">
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-0 (Leader)</div>
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-1 (Follower)</div>
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-2 (Follower)</div>
                </div>
              </div>
              <div className="cd-scale-arrow">›</div>
              <div className="cd-scale-box highlight">
                <div className="cd-scale-label"><span>After — 5 nodes</span></div>
                <div className="cd-scale-nodes">
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-0 (Leader)</div>
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-1 (Follower)</div>
                  <div className="cd-snode existing"><div className="cd-snode-dot"></div>rabbit-2 (Follower)</div>
                  <div className="cd-snode new-node"><div className="cd-snode-dot"></div>rabbit-3 (Joining…)</div>
                  <div className="cd-snode new-node"><div className="cd-snode-dot"></div>rabbit-4 (Joining…)</div>
                </div>
              </div>
            </div>
            <div className="cd-scale-note">
              <div className="cd-scale-note-dot"></div>
              <div className="cd-scale-note-text">
                <strong>Quorum tolerance increases:</strong> a 5-node cluster tolerates 2 simultaneous failures (vs. 1 failure for 3 nodes). AMQP clients remain connected throughout — scale-out is transparent to producers and consumers.
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: Rolling Upgrade */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-blue"></div>
              <div className="cd-title-group">
                <div className="cd-title">Rolling Version Upgrade</div>
                <div className="cd-desc">Followers are upgraded one by one. The leader is restarted last. Traffic is always served.</div>
              </div>
              <div className="cd-badge cd-badge-blue">No Cluster Downtime</div>
            </div>
            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial State</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod leader-old"><div className="cd-pod-dot"></div>rabbit-0<div className="cd-pod-version cd-v-old">3.13.7</div></div>
                  <div className="cd-pod follower-old"><div className="cd-pod-dot"></div>rabbit-1<div className="cd-pod-version cd-v-old">3.13.7</div></div>
                  <div className="cd-pod follower-old"><div className="cd-pod-dot"></div>rabbit-2<div className="cd-pod-version cd-v-old">3.13.7</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Upgrade Followers</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod leader-old"><div className="cd-pod-dot"></div>rabbit-0<div className="cd-pod-version cd-v-old">3.13.7</div></div>
                  <div className="cd-pod follower-new"><div className="cd-pod-dot"></div>rabbit-1<div className="cd-pod-version cd-v-new">4.0.9</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>rabbit-2<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 3 — Upgrade Leader</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>rabbit-0<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                  <div className="cd-pod leader-new"><div className="cd-pod-dot"></div>rabbit-1<div className="cd-pod-version cd-v-new">4.0.9 ★</div></div>
                  <div className="cd-pod follower-new"><div className="cd-pod-dot"></div>rabbit-2<div className="cd-pod-version cd-v-new">4.0.9</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod follower-new"><div className="cd-pod-dot"></div>rabbit-0<div className="cd-pod-version cd-v-new">4.0.9</div></div>
                  <div className="cd-pod leader-new"><div className="cd-pod-dot"></div>rabbit-1<div className="cd-pod-version cd-v-new">4.0.9 ★</div></div>
                  <div className="cd-pod follower-new"><div className="cd-pod-dot"></div>rabbit-2<div className="cd-pod-version cd-v-new">4.0.9</div></div>
                </div>
              </div>
            </div>
            <div className="cd-traffic">
              <div className="cd-traffic-label">AMQP Traffic</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Always Serving</div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Blog ───────────────────────────────────────────────────────────────────

const rmqPosts = [
  {
    title: 'We Let an AI Agent Manage Our Databases. Here\'s Why Most Operators Failed It.',
    description: 'We tested AI agents against traditional Kubernetes database operators. The results revealed a fundamental mismatch between fragmented operator APIs and how LLMs actually reason.',
    image: '/img/blogs/thumbnails/blog-ai-agent-database-operators.png',
    href: '/blog/we-let-an-ai-agent-manage-our-databases',
  },
  {
    title: 'Validating KubeBlocks Addon High Availability with Chaos Mesh',
    description: 'How to leverage Chaos Mesh for chaos engineering to validate and enhance KubeBlocks\' high availability capabilities through systematic fault injection testing.',
    image: '/img/blogs/thumbnails/blog-chaos-mesh.png',
    href: '/blog/validating-kubeblocks-addon-availability-with-chaos-mesh',
  },
  {
    title: 'Managing Over 6,000 Self-Hosted Databases Without a DBA',
    description: 'How Sealos used KubeBlocks to manage 6,000+ self-hosted databases across four availability zones — architecture, HA, backup, and operations.',
    image: '/img/blogs/thumbnails/blog-manage-6k-db-instance-with-kb.png',
    href: '/blog/manage-6k-db-instance-with-kubeblocks',
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
            <Box component="span" color="primary.main">RabbitMQ on Kubernetes</Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {rmqPosts.map((post) => (
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

// ── 6. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{
      py: { xs: 8, md: 12 }, borderTop: '1px solid', borderColor: 'divider',
      bgcolor: isDark ? '#070707' : '#f9fafb',
    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <SectionEyebrow label="Get Started" />
        <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-0.03em', lineHeight: 1.2, mb: 2 }}>
          RabbitMQ on Kubernetes,{' '}
          <Box component="span" color="primary.main">the Easy Way</Box>
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 5, maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}>
          Deploy a production-grade RabbitMQ cluster in minutes with automatic Raft HA, quorum queues, and full Day-2 operations — all open source.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" size="large"
            href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
            target="_blank"
            sx={{ px: 4, py: 1.5, fontWeight: 700 }}>
            Try Playground Free →
          </Button>
          <Button variant="outlined" size="large"
            href="https://kubeblocks.com/contact"
            target="_blank"
            sx={{ px: 4, py: 1.5 }}>
            Talk to the Team
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function RabbitMQOperatorPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Topology />
      <LifecycleFeatures />
      <CapabilitiesDiagrams />
      <BlogPosts />
      <CTA />
    </>
  );
}
