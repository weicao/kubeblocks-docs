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
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import EtcdArchitectureDiagram from '@/components/EtcdArchitectureDiagram';
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
  name: etcd-cluster
  namespace: demo
spec:
  terminationPolicy: Delete
  clusterDef: etcd
  componentSpecs:
    - name: etcd
      serviceVersion: "3.5.15"
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
              Open Source · CNCF Graduated · Powers Kubernetes
            </Box>

            <Typography
              variant="h2"
              mb={2.5}
              sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: isDark ? '#fff' : 'text.primary' }}
            >
              KubeBlocks etcd Operator{' '}
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
              Deploy production-grade etcd clusters in minutes.
              Raft HA, snapshot backup, horizontal scaling, and full Day-2 operations via a single operator.
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
                href="/docs/preview/kubeblocks-for-etcd/02-quickstart"
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
                { value: '< 5s', label: 'Leader Election' },
                { value: '99.99%', label: 'HA Availability' },
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
              border: '1px solid rgba(20,184,166,0.15)',
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
                Deploy etcd in 4 steps
              </Typography>
            </Box>

            {/* Steps */}
            <Box sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Step 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.12)', border: '1px solid #14b8a6', color: '#14b8a6', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</Box>
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
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.12)', border: '1px solid #14b8a6', color: '#14b8a6', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install etcd Addon</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'helm upgrade -i kb-addon-etcd kubeblocks/etcd \\\n  -n kb-system'}
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.12)', border: '1px solid #14b8a6', color: '#14b8a6', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create an etcd Cluster</Typography>
              </Box>
              <Box sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                <YamlBlock code={DEPLOY_YAML} isDark={true} />
              </Box>

              {/* Step 4 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(20,184,166,0.12)', border: '1px solid #14b8a6', color: '#14b8a6', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Cluster is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster etcd-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME           CLUSTER-DEF   STATUS    AGE\n'}</span>
                {'etcd-cluster   etcd          '}
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

// ── 2. Architecture (MySQL-style two-column layout) ───────────────────────────

const etcdArchBadge = '#14b8a6';

const etcdArchTags = ['Raft consensus', 'Majority quorum', 'Automatic failover', 'Snapshot backup'];

const etcdArchDesc =
  'KubeBlocks runs etcd as one Raft HA architecture on Kubernetes: one leader handles writes, followers ' +
  'replicate the WAL, and a majority of members must acknowledge before a write is committed. Cluster size is ' +
  'configurable for your SLOs; the same operator workflow covers backup, restore, switchover, TLS, and Day-2 ops.';

const etcdArchFeatures = [
  'Majority quorum — committed writes are replicated to most members before acknowledgment',
  'Automatic leader election when the current leader is unavailable',
  'Headless service for stable per-pod DNS; optional ClusterIP client service',
  'Consistent snapshot backup to object storage (full snapshot, not PITR)',
];

function Architecture() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Architecture" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Raft Consensus.{' '}
            <Box component="span" color="primary.main">One Operator.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            One etcd Raft HA topology — leader, followers, and quorum — operated consistently on Kubernetes.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
            gap: 5,
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>
              {etcdArchDesc}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {etcdArchFeatures.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      bgcolor: alpha(etcdArchBadge, 0.12),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: etcdArchBadge, fontWeight: 800, mt: '2px',
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

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {etcdArchTags.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.5, py: 0.5, borderRadius: '6px',
                    fontSize: '0.78rem', fontWeight: 700,
                    bgcolor: alpha(etcdArchBadge, 0.1),
                    color: etcdArchBadge,
                    border: `1px solid ${alpha(etcdArchBadge, 0.25)}`,
                    letterSpacing: '.02em',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <EtcdArchitectureDiagram />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Comparison Table ───────────────────────────────────────────────────────

function Comparison() {
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
    { feature: 'Kubernetes-native CRD API',        kb: YES,  bitnami: NO,   community: YES  },
    { feature: 'Raft HA (3 / 5-node)',              kb: YES,  bitnami: YES,  community: YES  },
    { feature: 'TLS encryption (peer & client)',   kb: YES,  bitnami: YES,  community: PART },
    { feature: 'Leader switchover (Switchover)',    kb: YES,  bitnami: NO,   community: PART },
    { feature: 'Horizontal scaling',                kb: YES,  bitnami: YES,  community: YES  },
    { feature: 'Vertical scaling (CPU/memory)',     kb: YES,  bitnami: YES,  community: NO   },
    { feature: 'PVC volume expansion',              kb: YES,  bitnami: NO,   community: NO   },
    { feature: 'Parameter reconfiguration',         kb: YES,  bitnami: YES,  community: NO   },
    { feature: 'Rolling version upgrade',           kb: YES,  bitnami: YES,  community: NO   },
    { feature: 'Snapshot backup & restore',         kb: YES,  bitnami: PART, community: PART },
    { feature: 'Prometheus metrics',                kb: YES,  bitnami: YES,  community: YES  },
    { feature: 'Stop / start cluster',              kb: YES,  bitnami: NO,   community: NO   },
    { feature: 'Open Source',                       kb: YES,  bitnami: YES,  community: YES  },
    { feature: 'Cluster management web UI',         kb: ENT,  bitnami: NO,   community: NO   },
  ];

  const cols = [
    { label: 'KubeBlocks',          highlight: true  },
    { label: 'Bitnami Helm Chart',  highlight: false },
    { label: 'etcd-operator',       highlight: false },
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
            <Box component="span" color="primary.main">Other etcd Options</Box>
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
              {rows.map(({ feature, kb, bitnami, community }) => (
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
                  {[kb, bitnami, community].map((val, j) => (
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
          sx={{ color: 'text.secondary', textAlign: 'center', mt: 2, fontSize: '0.75rem' }}
        >
          <Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box>{' '}= Supported · <Box component="span" sx={{ color: '#e3b341', fontWeight: 700 }}>~</Box>{' '}= Partial / Limited · <Box component="span" sx={{ color: '#f85149', fontWeight: 700 }}>✗</Box>{' '}= Not supported
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 0.75, fontSize: '0.75rem' }}>
          <Box component="span" sx={{ fontSize: '0.65rem', fontWeight: 700, px: 0.75, py: 0.25, borderRadius: 0.5, bgcolor: 'action.selected', color: 'text.secondary', letterSpacing: '0.04em', textTransform: 'uppercase', mr: 0.75 }}>Enterprise</Box>
          indicates a capability available in KubeBlocks Enterprise, not the open-source distribution.{' '}
          <Box component="a" href="https://kubeblocks.com/contact" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
            Contact us for licensing →
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center', mt: 0.5, fontSize: '0.72rem' }}>
          etcd-operator column based on hands-on testing of etcd-io/etcd-operator v0.2.0 (Mar 2026) on EKS. Other columns based on official documentation and GitHub issues. Features may vary by version.
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
    { label: 'Snapshot Backup & Restore' },
    { label: 'Auto Failover' },
    { label: 'Horizontal Scaling' },
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
        .cd-icon-teal   { background: rgba(20,184,166,0.12); }
        .cd-icon-green  { background: rgba(74,222,128,0.12); }
        .cd-title-group { flex: 1; }
        .cd-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .cd-desc  { font-size: 14px; color: var(--cd-text-muted, #8B90A0); }
        .cd-badge {
          padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700; flex-shrink: 0;
        }
        .cd-badge-orange { background: rgba(242,145,17,0.12); color: #F29111; border: 1px solid #F29111; }
        .cd-badge-teal   { background: rgba(20,184,166,0.12); color: #14B8A6; border: 1px solid #14B8A6; }
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
          background: linear-gradient(90deg, #F29111, #14B8A6);
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
        .cd-restore-icon.teal   { background: rgba(20,184,166,0.12); }
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
        /* ── Failover ── */
        .cd-upgrade-grid {
          display: grid;
          grid-template-columns: 1fr 24px 1fr 24px 1fr;
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
        .cd-stage.highlight { border-color: #14B8A6; }
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
        .cd-pod.leader-old { background: rgba(20,184,166,0.08); border-color: rgba(20,184,166,0.3); }
        .cd-pod.leader-old .cd-pod-dot { background: #14B8A6; }
        .cd-pod.leader-new { background: rgba(20,184,166,0.08); border-color: #14B8A6; box-shadow: 0 0 8px rgba(20,184,166,0.25); }
        .cd-pod.leader-new .cd-pod-dot { background: #14B8A6; box-shadow: 0 0 6px #14B8A6; }
        .cd-pod.follower-ok { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cd-pod.follower-ok .cd-pod-dot { background: #8B90A0; }
        .cd-pod.failed { background: rgba(248,81,73,0.06); border-color: rgba(248,81,73,0.3); }
        .cd-pod.failed .cd-pod-dot { background: #f85149; }
        .cd-pod.electing { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cd-pod.electing .cd-pod-dot { background: #FACC15; animation: cd-pulse 1s ease infinite; }
        .cd-pod-version {
          margin-left: auto; font-size: 10px; padding: 1px 6px;
          border-radius: 4px; font-weight: 600;
        }
        .cd-v-leader { background: rgba(20,184,166,0.12); color: #14B8A6; }
        .cd-v-fail   { background: rgba(248,81,73,0.12); color: #f85149; }
        .cd-v-elect  { background: rgba(250,204,21,0.1); color: #FACC15; }
        .cd-v-follow { background: var(--cd-border, rgba(255,255,255,0.06)); color: var(--cd-text-muted, #8B90A0); }
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
          background: linear-gradient(90deg, #14b8a6, #4ADE80, #14b8a6);
          background-size: 200% 100%;
          animation: cd-shimmer 2s linear infinite;
        }
        .cd-traffic-status { font-size: 12px; font-weight: 700; color: #4ADE80; white-space: nowrap; }
        /* ── Scaling ── */
        .cd-scale-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;
        }
        @media (max-width: 640px) { .cd-scale-grid { grid-template-columns: 1fr; } }
        .cd-scale-box {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 20px;
        }
        .cd-scale-title {
          font-size: 13px; font-weight: 700; margin-bottom: 4px;
        }
        .cd-scale-desc {
          font-size: 12px; color: var(--cd-text-muted, #8B90A0); margin-bottom: 16px;
        }
        .cd-scale-before, .cd-scale-after {
          display: flex; flex-direction: column; gap: 6px;
        }
        .cd-scale-label {
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0);
          margin-bottom: 4px;
        }
        .cd-scale-pod {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 10px; border-radius: 8px;
          font-size: 12px; font-family: "JetBrains Mono", monospace;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }
        .cd-scale-pod-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cd-scale-pod.existing .cd-scale-pod-dot { background: #14B8A6; }
        .cd-scale-pod.added    .cd-scale-pod-dot { background: #4ADE80; box-shadow: 0 0 6px #4ADE80; animation: cd-glow-green 2s ease-in-out infinite; }
        .cd-scale-pod.added { border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.06); }
        .cd-scale-arrow {
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: var(--cd-text-muted, #8B90A0); padding: 8px 0;
        }
        .cd-scale-badge {
          display: inline-block; font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 100px; margin-top: 12px;
        }
        .cd-scale-badge.green  { background: rgba(74,222,128,0.12); color: #4ADE80; border: 1px solid #4ADE80; }
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production etcd</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running etcd on Kubernetes — so your team doesn&apos;t have to.
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
              bgcolor: activeTab === i ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
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
              <div className="cd-icon cd-icon-orange">📸</div>
              <div className="cd-title-group">
                <div className="cd-title">Snapshot Backup &amp; Restore</div>
                <div className="cd-desc">Scheduled snapshot backups via etcdctl to S3-compatible object storage. Restore a full cluster from any stored snapshot.</div>
              </div>
              <div className="cd-badge cd-badge-orange">S3 Storage</div>
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
                  <div className="cd-tl-time">+12h</div>
                </div>
                <div className="cd-tl-event" style={{ left: '68%' }}>
                  <div className="cd-tl-dot full"></div>
                  <div className="cd-tl-tag full">Snapshot</div>
                  <div className="cd-tl-time">+24h</div>
                </div>
                <div className="cd-tl-event" style={{ left: '88%' }}>
                  <div className="cd-tl-dot target"></div>
                  <div className="cd-tl-tag target">Restore</div>
                  <div className="cd-tl-time">target</div>
                </div>
              </div>
            </div>

            <div className="cd-restore">
              <div className="cd-restore-step">
                <div className="cd-restore-icon orange">📸</div>
                <div className="cd-restore-text">
                  <strong>etcdctl snapshot</strong>
                  <span>Consistent DB snapshot</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon teal">☁️</div>
                <div className="cd-restore-text">
                  <strong>Upload to S3</strong>
                  <span>Durable object storage</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon green">🚀</div>
                <div className="cd-restore-text">
                  <strong>Restore Cluster</strong>
                  <span>New cluster from snapshot</span>
                </div>
              </div>
              <span className="cd-s3-badge">✓ Stored Safely</span>
            </div>
          </div>
        )}

        {/* ── Panel 1: Auto Failover ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-teal">⚡</div>
              <div className="cd-title-group">
                <div className="cd-title">Auto Failover via Raft Election</div>
                <div className="cd-desc">When the leader fails, the remaining members hold a Raft election and elect a new leader in under 5 seconds — no manual intervention required.</div>
              </div>
              <div className="cd-badge cd-badge-teal">&lt; 5s Election</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Before</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod leader-old"><div className="cd-pod-dot"></div>etcd-0<span className="cd-pod-version cd-v-leader">LEADER</span></div>
                  <div className="cd-pod follower-ok"><div className="cd-pod-dot"></div>etcd-1<span className="cd-pod-version cd-v-follow">follower</span></div>
                  <div className="cd-pod follower-ok"><div className="cd-pod-dot"></div>etcd-2<span className="cd-pod-version cd-v-follow">follower</span></div>
                </div>
              </div>

              <div className="cd-stage-arrow">→</div>

              <div className="cd-stage">
                <div className="cd-stage-label"><span>Leader Failure</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod failed"><div className="cd-pod-dot"></div>etcd-0<span className="cd-pod-version cd-v-fail">FAILED</span></div>
                  <div className="cd-pod electing"><div className="cd-pod-dot"></div>etcd-1<span className="cd-pod-version cd-v-elect">CANDIDATE</span></div>
                  <div className="cd-pod electing"><div className="cd-pod-dot"></div>etcd-2<span className="cd-pod-version cd-v-elect">CANDIDATE</span></div>
                </div>
              </div>

              <div className="cd-stage-arrow">→</div>

              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>New Leader</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod follower-ok" style={{opacity:0.4}}><div className="cd-pod-dot"></div>etcd-0<span className="cd-pod-version cd-v-follow">restarting</span></div>
                  <div className="cd-pod leader-new"><div className="cd-pod-dot"></div>etcd-1<span className="cd-pod-version cd-v-leader">LEADER</span></div>
                  <div className="cd-pod follower-ok"><div className="cd-pod-dot"></div>etcd-2<span className="cd-pod-version cd-v-follow">follower</span></div>
                </div>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Cluster Availability During Failover</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Online — New Leader Elected</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Horizontal Scaling ── */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green">⚖️</div>
              <div className="cd-title-group">
                <div className="cd-title">Horizontal Scaling</div>
                <div className="cd-desc">Add members to increase quorum size (3 → 5 nodes). A 5-node cluster tolerates 2 simultaneous failures instead of 1.</div>
              </div>
              <div className="cd-badge cd-badge-green">Scale Out</div>
            </div>

            <div className="cd-scale-grid">
              <div className="cd-scale-box">
                <div className="cd-scale-title" style={{color:'#14B8A6'}}>Before (3-node quorum)</div>
                <div className="cd-scale-desc">Tolerates 1 failure · 2 nodes needed for quorum</div>
                <div className="cd-scale-label">Members</div>
                <div className="cd-scale-before">
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-0 (leader)</div>
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-1 (follower)</div>
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-2 (follower)</div>
                </div>
              </div>

              <div className="cd-scale-box">
                <div className="cd-scale-title" style={{color:'#4ADE80'}}>After (5-node quorum)</div>
                <div className="cd-scale-desc">Tolerates 2 failures · 3 nodes needed for quorum</div>
                <div className="cd-scale-label">Members</div>
                <div className="cd-scale-after">
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-0 (leader)</div>
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-1 (follower)</div>
                  <div className="cd-scale-pod existing"><div className="cd-scale-pod-dot"></div>etcd-2 (follower)</div>
                  <div className="cd-scale-pod added"><div className="cd-scale-pod-dot"></div>etcd-3 (follower) ✦ new</div>
                  <div className="cd-scale-pod added"><div className="cd-scale-pod-dot"></div>etcd-4 (follower) ✦ new</div>
                </div>
                <span className="cd-scale-badge green">Fault Tolerance ↑</span>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Cluster Health During Scale-Out</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Online — New Members Joining</div>
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
    title: 'Scaling & Availability',
    color: '#0d9488',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove etcd members (3 → 5 or 5 → 3) online. Raft safely admits new members and redistributes the quorum.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on etcd pods with a rolling strategy that keeps quorum available throughout.' },
      { title: 'Volume Expansion', desc: 'Expand etcd PVCs to increase data directory capacity without pod restarts.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts one at a time — quorum is never lost during the operation.' },
      { title: 'Stop / Start', desc: 'Suspend clusters to eliminate compute cost during off-hours; resume with full cluster state.' },
    ],
  },
  {
    title: 'Configuration, Security & Observability',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune etcd parameters such as heartbeat interval and election timeout via OpsRequest.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrades from 3.5.x to 3.6.x with health checks. Quorum is maintained at each step.' },
      { title: 'Prometheus Metrics', desc: 'Built-in Prometheus metrics endpoint at :2379/metrics — plug into Grafana dashboards.' },
      { title: 'Snapshot Backup & Restore', desc: 'Consistent snapshots via etcdctl to S3-compatible object storage; restore from any stored snapshot.' },
      { title: 'TLS Encryption', desc: 'Enable mTLS for both client-server (:2379) and peer (:2380) communication with auto-managed certificates via cert-manager.' },
      { title: 'Expose via LoadBalancer', desc: 'Enable external client access for applications running outside the Kubernetes cluster.' },
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

// ── 6. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'etcd & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks etcd Operator,{' '}
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

// ── Blog Posts ────────────────────────────────────────────────────────────────

const etcdPosts = [
  {
    title: "We Let an AI Agent Manage Our Databases. Here's Why Most Operators Failed It.",
    description: 'We tested AI agents against traditional Kubernetes database operators — and why a unified API like KubeBlocks changes everything.',
    image: '/img/blogs/thumbnails/blog-ai-agent-database-operators.png',
    href: '/blog/we-let-an-ai-agent-manage-our-databases',
  },
  {
    title: 'How to Manage Database Clusters Without a Dedicated Operator?',
    description: 'A unified approach to managing diverse databases on Kubernetes — including infrastructure services like etcd — without the overhead of dedicated operators.',
    image: '/img/blogs/thumbnails/blog-kubecon-china-mobile-cloud.png',
    href: '/blog/how-to-manage-database-clusters-without-a-dedicated-operator',
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
            <Box component="span" color="primary.main">etcd on Kubernetes</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {etcdPosts.map((post) => (
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

// ── Page Assembly ─────────────────────────────────────────────────────────────

export default function EtcdOperatorPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Architecture />
      <Comparison />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <BlogPosts />
      <CTA />
    </>
  );
}
