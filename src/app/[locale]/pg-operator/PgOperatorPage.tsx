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
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import PgHaArchitectureDiagram from '@/components/PgHaArchitectureDiagram';
import TrustedBy from '@/app/[locale]/trusted-by';

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
              KubeBlocks PostgreSQL Operator{' '}
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
              Deploy production-grade PostgreSQL clusters in minutes. Automate high availability
              with Patroni, WAL-based PITR backups, and minimal downtime upgrades — all through
              Kubernetes-native APIs.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={7}>
              <Button
                variant="contained"
                href="/docs/preview/kubeblocks-for-postgresql/02-quickstart"
                size="large"
                sx={{ px: 4, py: 1.5, fontWeight: 700 }}
              >
                Get Started Free →
              </Button>
              <Button
                variant="outlined"
                href="/docs/preview/kubeblocks-for-postgresql"
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
                { value: '0', label: 'Data Loss on Failover (Sync)' },
                { value: '99.99%', label: 'High Availability Target (3 Replicas)' },
                { value: '11+', label: 'Pre-installed Extensions' },
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
                Deploy PostgreSQL in 3 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a PostgreSQL Cluster</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#ff7b72' }}>apiVersion</span>{': apps.kubeblocks.io/v1\n'}
                <span style={{ color: '#ff7b72' }}>kind</span>{': Cluster\n'}
                <span style={{ color: '#ff7b72' }}>metadata</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>pg-cluster{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>namespace</span>{': '}
                <span style={{ color: '#a5d6ff' }}>demo{'\n'}</span>
                <span style={{ color: '#ff7b72' }}>spec</span>{':\n  '}
                <span style={{ color: '#79c0ff' }}>terminationPolicy</span>{': '}
                <span style={{ color: '#a5d6ff' }}>Delete{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>clusterDef</span>{': '}
                <span style={{ color: '#a5d6ff' }}>postgresql{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>topology</span>{': '}
                <span style={{ color: '#a5d6ff' }}>replication{'\n'}</span>
                {'  '}
                <span style={{ color: '#79c0ff' }}>componentSpecs</span>{':\n    - '}
                <span style={{ color: '#79c0ff' }}>name</span>{': '}
                <span style={{ color: '#a5d6ff' }}>postgresql{'\n'}</span>
                {'      '}
                <span style={{ color: '#79c0ff' }}>replicas</span>{': '}
                <span style={{ color: '#f2cc60' }}>3</span>
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Check Cluster Status</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'kubectl get cluster pg-cluster -n demo\n\n'}
                <span style={{ color: '#6e7681' }}>{'NAME        CLUSTER-DEFINITION  STATUS   AGE\n'}</span>
                <span style={{ color: '#3fb950' }}>{'pg-cluster  postgresql           Running  2m'}</span>
              </Box>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 2. Topology ───────────────────────────────────────────────────────────────

const topoFeatures = [
  'Patroni-driven leader election via Kubernetes API',
  'Streaming WAL replication — sync or async configurable',
  'Zero data loss on failover (synchronous commit)',
  'Built-in pgbouncer for connection pooling on :6432',
  'Automatic service endpoint switch on primary change',
  'pg-exporter sidecar for Prometheus metrics on :9187',
];

function Topology() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="PostgreSQL Topology" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Patroni HA.{' '}
            <Box component="span" color="primary.main">Battle-Tested in Production.</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks runs PostgreSQL with Patroni for leader election, using the Kubernetes API
            or a provided etcd as the Distributed Configuration Store.
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
          {/* Description + features */}
          <Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {['RTO < 30s', 'RPO = 0 (Sync)', 'pgbouncer built-in'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.5, py: 0.5, borderRadius: '6px',
                    fontSize: '0.78rem', fontWeight: 700,
                    bgcolor: alpha('#336791', 0.1),
                    color: '#336791',
                    border: `1px solid ${alpha('#336791', 0.25)}`,
                    letterSpacing: '.02em',
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: '0.95rem' }}>
              One primary with one or more streaming replicas managed by Patroni. Leader election
              uses a Kubernetes ConfigMap lease or an externally provided etcd. On failure, Patroni
              automatically promotes the most up-to-date replica and KubeBlocks updates the
              Kubernetes Service selector to route traffic to the new primary.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {topoFeatures.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0, mt: '2px',
                    bgcolor: alpha('#336791', 0.12),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#336791', fontWeight: 800,
                  }}>✓</Box>
                  <Typography sx={{ fontSize: '0.88rem', color: 'text.secondary', lineHeight: 1.6 }}>{f}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Diagram */}
          <Box>
            <PgHaArchitectureDiagram />
          </Box>
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
      borderRadius: 0.5, lineHeight: 1.4, display: 'inline-block',
      bgcolor: 'action.selected', color: 'text.secondary',
      letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>
      Enterprise
    </Box>
  );

  const rows = [
    { feature: 'Open Source',                        kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'Patroni-based HA',                   kb: YES,
      cnpg: <Box><Box component="span" sx={{ color: '#f85149', fontWeight: 700 }}>✗</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Uses its own HA controller, not Patroni</Typography></Box>,
      zalando: YES,  crunchy: YES  },
    { feature: 'Standby cluster (cross-k8s DR)', kb: ENT,  cnpg: YES,  zalando: PART, crunchy: YES  },
    { feature: 'Built-in connection pooler',         kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'PITR (WAL streaming)',               kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'Horizontal scaling',                 kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'Minor version upgrade',              kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'Major version upgrade',
      kb: <Box>{ENT}<Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Via blue-green deployment</Typography></Box>,
      cnpg: NO,  zalando: PART,
      crunchy: <Box><Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Via pg_upgrade</Typography></Box>,
    },
    { feature: 'TLS in-place rotation',              kb: YES,  cnpg: YES,  zalando: PART, crunchy: YES  },
    { feature: 'Prometheus metrics',                 kb: YES,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'DB / role management',               kb: ENT,  cnpg: YES,  zalando: YES,  crunchy: YES  },
    { feature: 'Logical replication management',     kb: PART, cnpg: YES,  zalando: PART, crunchy: PART },
    { feature: 'Bootstrap from external PG',
      kb: ENT,
      cnpg: YES,  zalando: PART, crunchy: PART },
    { feature: 'Web management UI',                  kb: ENT,  cnpg: NO,   zalando: YES,  crunchy: YES  },
    { feature: 'pgvector / PostGIS support',
      kb:      <Box><Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Pre-installed</Typography></Box>,
      cnpg:    <Box><Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Via custom image</Typography></Box>,
      zalando: <Box><Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Via custom image</Typography></Box>,
      crunchy: <Box><Box component="span" sx={{ color: '#3fb950', fontWeight: 700 }}>✓</Box><Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', mt: 0.5, lineHeight: 1.4 }}>Pre-installed</Typography></Box>,
    },
  ];

  const cols = [
    { label: 'KubeBlocks', highlight: true },
    { label: 'CloudNativePG', highlight: false },
    { label: 'Zalando Operator', highlight: false },
    { label: 'CrunchyData PGO', highlight: false },
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
            <Box component="span" color="primary.main">Other PostgreSQL Operators</Box>
          </Typography>
        </Box>

        <Box sx={{ overflowX: 'auto', borderRadius: '14px', border: `1px solid ${cardBorder}` }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', bgcolor: cardBg, tableLayout: 'fixed' }}>
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
                      px: 2, py: 2, fontSize: '0.82rem', fontWeight: 700,
                      borderBottom: `1px solid ${cardBorder}`,
                      textAlign: 'center',
                      borderLeft: `1px solid ${cardBorder}`,
                      bgcolor: highlight
                        ? (isDark ? alpha('#6CB6FF', 0.08) : alpha('#6CB6FF', 0.05))
                        : (isDark ? '#161b22' : '#f6f8fa'),
                      color: highlight ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {label}
                    {highlight && (
                      <Box component="span" sx={{ ml: 1, fontSize: '0.65rem', bgcolor: 'primary.main', color: '#fff', px: 0.75, py: 0.25, borderRadius: 0.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', verticalAlign: 'middle' }}>
                        This
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box component="tbody">
              {rows.map(({ feature, kb, cnpg, zalando, crunchy }) => (
                <Box
                  key={feature}
                  component="tr"
                  sx={{
                    '&:hover td, &:hover th': {
                      bgcolor: isDark ? alpha('#fff', 0.02) : alpha('#000', 0.015),
                    },
                  }}
                >
                  <Box
                    component="th"
                    scope="row"
                    sx={{
                      px: 2, py: 1.5, textAlign: 'left',
                      fontSize: '0.82rem', fontWeight: 500,
                      color: 'text.primary',
                      borderBottom: `1px solid ${cardBorder}`,
                    }}
                  >
                    {feature}
                  </Box>
                  {[kb, cnpg, zalando, crunchy].map((val, j) => (
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
    { label: 'Backup & PITR' },
    { label: 'Rolling upgrade' },
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
        /* PITR timeline */
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
        .cd-wal-bar {
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
          border: 2px solid var(--cd-card-bg, #16181f); position: relative; z-index: 2; margin-top: -5px;
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
        /* Upgrade */
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
        .cd-stage-arrow { display: flex; align-items: center; justify-content: center; color: var(--cd-text-muted, #8B90A0); font-size: 18px; padding-top: 40px; }
        .cd-pod-grid { display: flex; flex-direction: column; gap: 8px; }
        .cd-pod {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px; border: 1px solid transparent;
          font-size: 12px; font-weight: 500;
          font-family: "JetBrains Mono", monospace; transition: 0.3s;
        }
        .cd-pod-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .cd-pod-version { margin-left: auto; font-size: 10px; padding: 1px 5px; border-radius: 3px; }
        .cd-v-old { background: rgba(255,255,255,0.06); color: var(--cd-text-muted, #8B90A0); }
        .cd-v-new { background: rgba(108,182,255,0.12); color: #6CB6FF; }
        .cd-pod.primary-old { background: rgba(242,145,17,0.08); border-color: rgba(242,145,17,0.3); }
        .cd-pod.primary-old .cd-pod-dot { background: #F29111; }
        .cd-pod.primary-new { background: rgba(108,182,255,0.08); border-color: #6CB6FF; box-shadow: 0 0 8px rgba(108,182,255,0.25); }
        .cd-pod.primary-new .cd-pod-dot { background: #6CB6FF; box-shadow: 0 0 6px #6CB6FF; }
        .cd-pod.replica-old { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
        .cd-pod.replica-old .cd-pod-dot { background: #8B90A0; }
        .cd-pod.replica-new { background: rgba(108,182,255,0.06); border-color: rgba(108,182,255,0.3); }
        .cd-pod.replica-new .cd-pod-dot { background: #6CB6FF; }
        .cd-pod.upgrading { background: rgba(250,204,21,0.06); border-color: rgba(250,204,21,0.3); }
        .cd-pod.upgrading .cd-pod-dot { background: #FACC15; animation: cd-pulse 0.8s ease infinite; }
        .cd-upgrade-note {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(74,222,128,0.25);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: var(--cd-text-muted, #8B90A0);
        }
        .cd-upgrade-note strong { color: var(--cd-text, #E8EAF0); }
        /* Failover */
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
        .cd-fo-node.healthy   { background: rgba(74,222,128,0.06); }
        .cd-fo-node.healthy .cd-fo-node-dot { background: #4ADE80; animation: cd-glow-green 2s ease-in-out infinite; }
        .cd-fo-node.failed    { background: rgba(248,113,113,0.15); }
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
        .role-primary { background: rgba(74,222,128,0.12);  color: #4ADE80; }
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
            <Box component="span" color="primary.main">Production PostgreSQL</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running PostgreSQL on Kubernetes — so your team doesn&apos;t have to.
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

        {/* ── Panel 0: PITR ── */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-title-group">
                <div className="cd-title">Point-in-Time Recovery (PITR)</div>
                <div className="cd-desc">Continuous WAL streaming + scheduled full backups. Restore to any second in history.</div>
              </div>
              <div className="cd-badge cd-badge-orange">Restore to any second</div>
            </div>

            <div className="cd-tl-label">Backup Timeline</div>
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div className="cd-tl-track">
                <div className="cd-tl-fill"></div>
                <div className="cd-wal-bar"></div>
              </div>
              <div style={{ position: 'absolute', top: '-22px', left: 0,
                  fontSize: '11px', color: '#6CB6FF', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7 }}>
                ⟵ Continuous WAL Stream ⟶
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
                  <div className="cd-tl-tag target">Restore Target</div>
                  <div className="cd-tl-time">21:37:42</div>
                </div>
              </div>
            </div>

            <div className="cd-restore">
              <div className="cd-restore-step">
                <div className="cd-restore-text">
                  <strong>Load Base Backup</strong>
                  <span>Restore nearest full snapshot before target time</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-text">
                  <strong>Replay WAL Segments</strong>
                  <span>Apply all transactions up to 21:37:42</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-text">
                  <strong>Cluster Ready</strong>
                  <span>New PostgreSQL cluster restored to exact point in time</span>
                </div>
              </div>
              <div className="cd-pitr-badge">✓ Consistent at restore time</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Rolling Upgrade ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-title-group">
                <div className="cd-title">Rolling upgrade (low cutover)</div>
                <div className="cd-desc">Replicas are upgraded one by one. Traffic stays on a healthy primary while replicas catch up; the primary is switched and upgraded last.</div>
              </div>
              <div className="cd-badge cd-badge-blue">Near-zero downtime (typical)</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial State</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>postgresql-0<div className="cd-pod-version cd-v-old">16.2</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>postgresql-1<div className="cd-pod-version cd-v-old">16.2</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>postgresql-2<div className="cd-pod-version cd-v-old">16.2</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Upgrade Replica</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>postgresql-0<div className="cd-pod-version cd-v-old">16.2</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>postgresql-1<div className="cd-pod-version cd-v-new">16.4</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>postgresql-2<div className="cd-pod-version cd-v-old">16.2</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 3 — Switchover + Upgrade Primary</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>postgresql-0<div className="cd-pod-version cd-v-new">16.4</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>postgresql-1<div className="cd-pod-version cd-v-new">16.4</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>postgresql-2<div className="cd-pod-version cd-v-new">16.4</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>postgresql-0<div className="cd-pod-version cd-v-new">16.4</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>postgresql-1<div className="cd-pod-version cd-v-new">16.4</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>postgresql-2<div className="cd-pod-version cd-v-new">16.4</div></div>
                </div>
              </div>
            </div>

            <div className="cd-upgrade-note">
              <span><strong>How it works:</strong> KubeBlocks upgrades replicas first, then performs a planned Patroni switchover, promoting an already-upgraded replica to primary — so the old primary is upgraded last with minimal application-visible interruption.</span>
            </div>
          </div>
        )}

        {/* ── Panel 2: Auto Failover ── */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-title-group">
                <div className="cd-title">Automatic Failover</div>
                <div className="cd-desc">Patroni detects primary failure and promotes the best replica. KubeBlocks updates the Service endpoint automatically.</div>
              </div>
              <div className="cd-badge cd-badge-green">RTO &lt; 30s</div>
            </div>

            <div className="cd-fo-timeline">
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+0s — Healthy</div>
                <div className="cd-fo-card phase-0">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-0<div className="cd-fo-node-role role-primary">Leader</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-1<div className="cd-fo-node-role role-replica">Replica</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot red"></div>T+2s — Failure</div>
                <div className="cd-fo-card phase-1">
                  <div className="cd-fo-card-title red">Primary Down</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node failed"><div className="cd-fo-node-dot"></div>postgresql-0<div className="cd-fo-node-role role-replica">Failed</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-1<div className="cd-fo-node-role role-replica">Replica</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot yellow"></div>T+10s — Detecting</div>
                <div className="cd-fo-card phase-2">
                  <div className="cd-fo-card-title yellow">Patroni Failover</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>postgresql-0<div className="cd-fo-node-role role-replica">Offline</div></div>
                    <div className="cd-fo-node detecting"><div className="cd-fo-node-dot"></div>postgresql-1<div className="cd-fo-node-role role-elect">Candidate</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot blue"></div>T+15s — Promote</div>
                <div className="cd-fo-card phase-3">
                  <div className="cd-fo-card-title blue">Promoting</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>postgresql-0<div className="cd-fo-node-role role-replica">Offline</div></div>
                    <div className="cd-fo-node promoting"><div className="cd-fo-node-dot"></div>postgresql-1<div className="cd-fo-node-role role-elect">Promoting…</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
                  </div>
                </div>
              </div>
              <div className="cd-fo-phase">
                <div className="cd-fo-time"><div className="cd-fo-time-dot green"></div>T+28s — Recovered</div>
                <div className="cd-fo-card phase-4">
                  <div className="cd-fo-card-title green">Healthy</div>
                  <div className="cd-fo-nodes">
                    <div className="cd-fo-node offline"><div className="cd-fo-node-dot"></div>postgresql-0<div className="cd-fo-node-role role-replica">Rebuilding</div></div>
                    <div className="cd-fo-node new-primary"><div className="cd-fo-node-dot"></div>postgresql-1<div className="cd-fo-node-role role-new">Leader ★</div></div>
                    <div className="cd-fo-node healthy"><div className="cd-fo-node-dot"></div>postgresql-2<div className="cd-fo-node-role role-replica">Replica</div></div>
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
                <div className="cd-fo-metric-val orange">Patroni</div>
                <div className="cd-fo-metric-label">HA Engine</div>
              </div>
              <div className="cd-fo-divider"></div>
              <div className="cd-fo-desc">
                <strong>No human intervention needed.</strong> Patroni continuously monitors cluster health via the configured DCS (Kubernetes API or etcd), automatically elects the most up-to-date replica as the new primary, and KubeBlocks updates the Service selector — all without a single kubectl command.
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  );
}

// ── 5. Performance Benchmark ──────────────────────────────────────────────────

const BENCH_CARDS = [
  {
    value: '≈ Bare-VM',
    color: 'primary.main',
    label: 'Throughput (TPS)',
    desc: 'KubeBlocks PostgreSQL matches bare-VM throughput — Kubernetes adds no measurable overhead.',
  },
  {
    value: '0',
    color: 'primary.main',
    label: 'Kubernetes Performance Tax',
    desc: 'With proper parameter tuning, running PostgreSQL on Kubernetes introduces no performance degradation.',
  },
  {
    value: 'Zero',
    color: 'primary.main',
    label: 'TPS Jitters During Checkpoints',
    desc: 'Optimized WAL and filesystem configurations eliminate TPS drops during PostgreSQL checkpoint flushes.',
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
            Our benchmark shows KubeBlocks-managed PostgreSQL on Kubernetes delivers highly stable
            performance with zero TPS drops during checkpoints, matching or exceeding bare-metal deployments.
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
            href="/blog/a-testing-report-for-optimizing-PG-performance-on-kubeblocks"
            sx={{ fontWeight: 600 }}
          >
            Read Full Benchmark Report →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// ── 6. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'High Availability & Scaling',
    color: '#0165CB',
    items: [
      { title: 'Horizontal Scaling', desc: 'Add or remove replicas online without downtime or reconfiguration.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory on running instances with a rolling strategy.' },
      { title: 'Volume Expansion', desc: 'Expand PVC storage without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled pod restarts with minimal disruption.' },
      { title: 'Planned Switchover', desc: 'Promote a specific replica to primary via Patroni with zero data loss when configured for synchronous replication.' },
      { title: 'Stop / Start', desc: 'Suspend clusters to eliminate compute cost; resume with full state.' },
    ],
  },
  {
    title: 'Configuration, Extensions & Observability',
    color: '#3fb950',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune PostgreSQL parameters via OpsRequest — no restart for supported GUCs.' },
      { title: 'TLS Encryption', desc: 'Enable, rotate, or disable in-flight encryption without downtime.' },
      { title: 'Password Management', desc: 'Rotate superuser and custom account credentials stored in Kubernetes Secrets.' },
      { title: 'Minor Version Upgrade', desc: 'Rolling upgrades across minor PostgreSQL versions with health checks.' },
      { title: 'pg_exporter Metrics', desc: 'Per-instance metrics via pg_exporter on :9187, Grafana dashboards included.' },
      { title: 'Pre-installed Extensions', desc: 'pgvector, PostGIS, pg_stat_statements, pg_trgm, and 7+ more ready to use.' },
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

// ── 7. Blog ───────────────────────────────────────────────────────────────────

const pgPosts = [
  {
    title: 'PostgreSQL Performance Tuning on Kubernetes: A KubeBlocks Deep Dive',
    description: 'Benchmark and fix TPS drops, CPU fluctuations, and checkpoint issues by tuning WAL settings, IO bandwidth, and full_page_write.',
    image: '/img/blogs/thumbnails/blog-pg.png',
    href: '/blog/a-testing-report-for-optimizing-PG-performance-on-kubeblocks',
  },
  {
    title: 'Managing Over 6,000 Self-Hosted Databases Without a DBA',
    description: 'How Sealos used KubeBlocks to manage 6,000+ self-hosted databases across four availability zones — architecture, HA, backup, and operations.',
    image: '/img/blogs/thumbnails/blog-manage-6k-db-instance-with-kb.png',
    href: '/blog/mangage-6k-db-instance-with-kubeblocks',
  },
  {
    title: 'How Containerization Affects Database Performance: runC, Kata, and gVisor',
    description: 'CPU, memory, and I/O benchmarks across container runtimes — and how to avoid common pitfalls like I/O hangs and OOM errors in Kubernetes.',
    image: '/img/blogs/thumbnails/blog-containerization.png',
    href: '/blog/does-containerization-affect-the-performance-of-databases',
  },
];

function PgBlogPosts() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="From the Blog" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Go Deeper on{' '}
            <Box component="span" color="primary.main">PostgreSQL on Kubernetes</Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {pgPosts.map((post) => (
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

// ── 8. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'PostgreSQL & 30+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks PostgreSQL Operator,{' '}
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
              href="/docs/preview/kubeblocks-for-postgresql/02-quickstart"
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

// ── Root ──────────────────────────────────────────────────────────────────────

export default function PgOperatorPage() {
  return (
    <Box>
      <Hero />
      <TrustedBy />
      <Topology />
      <ComparisonTable />
      <CapabilitiesDiagrams />
      <PerformanceBenchmark />
      <LifecycleFeatures />
      <PgBlogPosts />
      <CTA />
    </Box>
  );
}
