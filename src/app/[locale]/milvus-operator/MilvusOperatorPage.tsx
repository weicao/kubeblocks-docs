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
import MilvusArchitectureDiagram from '@/components/MilvusArchitectureDiagram';
import MilvusStandaloneArchitectureDiagram from '@/components/MilvusStandaloneArchitectureDiagram';
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
  name: milvus-cluster
  namespace: demo
spec:
  terminationPolicy: Delete
  topology: standalone
  componentSpecs:
    - name: milvus
      serviceVersion: "2.5.13"
      replicas: 1`;

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
              Open Source · Production-Grade · CNCF Graduated
            </Box>

            <Typography
              variant="h2"
              mb={2.5}
              sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: isDark ? '#fff' : 'text.primary' }}
            >
              KubeBlocks Milvus Operator{' '}
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
              Deploy production-grade Milvus vector database clusters in minutes.
              Standalone and distributed topologies, billion-scale ANN search, and full Day-2 operations.
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
                href="/docs/preview/kubeblocks-for-milvus/02-quickstart"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Read the Docs
              </Button>
            </Stack>

            <Box
              sx={{
                display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                gap: 2, pt: 4,
                borderTop: '1px solid', borderColor: 'divider',
              }}
            >
              {[
                { value: '1B+', label: 'Vectors at Scale' },
                { value: '< 1ms', label: 'ANN Search Latency' },
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
                Deploy Milvus in 4 steps
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
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Install Milvus Addon</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                {'helm upgrade -i kb-addon-milvus kubeblocks/milvus \\\n  -n kb-system'}
              </Box>

              {/* Step 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Create a Milvus Cluster</Typography>
              </Box>
              <Box sx={{ m: 0, mb: 2.5, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
                <YamlBlock code={DEPLOY_YAML} isDark={true} />
              </Box>

              {/* Step 4 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(108,182,255,0.12)', border: '1px solid #6CB6FF', color: '#6CB6FF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#8b949e' }}>Cluster is Ready</Typography>
              </Box>
              <Box component="pre" sx={{ m: 0, p: 2, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: '"JetBrains Mono","Fira Code",monospace', fontSize: { xs: '0.68rem', md: '0.72rem' }, lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <span style={{ color: '#3fb950', userSelect: 'none' }}>$ </span>
                {'kubectl get cluster milvus-cluster -n demo\n'}
                <span style={{ color: '#6e7681' }}>{'NAME                CLUSTER-DEF   STATUS    AGE\n'}</span>
                {'milvus-cluster               '}
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

const topoData = [
  {
    name: 'Standalone',
    badgeColor: '#7c3aed',
    tags: ['All-in-One Pod', 'Dev & Test', 'Simple Setup'],
    desc: 'A single Milvus pod runs all coordinator and worker roles as goroutines within one process. etcd and MinIO are deployed as companion pods. Ideal for development, CI pipelines, and single-node deployments.',
    features: [
      'Single pod runs all roles: Proxy, RootCoord, QueryCoord, DataCoord, IndexCoord, QueryNode, DataNode, IndexNode',
      'etcd and MinIO deployed as companion pods for metadata and object storage',
      'PVC-backed local segment cache for fast cold-start',
      'Minimal resource footprint — runs on a single Kubernetes node',
      'Same CRD API as distributed mode — switch topologies without application changes',
    ],
    Diagram: MilvusStandaloneArchitectureDiagram,
  },
  {
    name: 'Distributed (Cluster)',
    badgeColor: '#0165CB',
    tags: ['Billion-Scale', 'Horizontal Scaling', 'Production-Grade'],
    desc: 'The distributed topology decouples access, coordination, compute, and storage into independent services. All worker pods are stateless — scale any tier independently without data migration.',
    features: [
      'Proxy pods form a stateless access layer — scale out for higher query concurrency',
      'MixCoord unifies all coordinators (Root/Query/Data/Index) in a single lightweight pod',
      'DataNode, IndexNode, and QueryNode scale independently with no data migration',
      'All vectors, indexes, and WAL stored in MinIO + Pulsar — zero local state on compute pods',
      'Per-component Prometheus metrics on port 9091 for fine-grained observability',
    ],
    Diagram: MilvusArchitectureDiagram,
  },
];

function Architecture() {
  const [tab, setTab] = useState(0);
  const topo = topoData[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="Architecture" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            From Dev to Production.{' '}
            <Box component="span" color="primary.main">Same CRD API.</Box>
          </Typography>
        </Box>

        {/* MUI Tabs — underline style */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ '& .MuiTab-root': { fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', minHeight: 48 } }}
          >
            {topoData.map((t) => <Tab key={t.name} label={t.name} />)}
          </Tabs>
        </Box>

        {/* 2-column grid: desc left, diagram right */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' }, gap: 5, alignItems: 'start' }}>
          <Box>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>{topo.desc}</Typography>

            {/* Feature checklist */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 3 }}>
              {topo.features.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box sx={{
                    width: 20, height: 20, borderRadius: '50%',
                    bgcolor: alpha(topo.badgeColor, 0.12),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: topo.badgeColor, fontWeight: 800, mt: '2px', flexShrink: 0,
                  }}>✓</Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>{f}</Typography>
                </Box>
              ))}
            </Box>

            {/* Metric tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {topo.tags.map((tag) => (
                <Box key={tag} sx={{
                  px: 1.5, py: 0.5, borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700,
                  bgcolor: alpha(topo.badgeColor, 0.1), color: topo.badgeColor,
                  border: `1px solid ${alpha(topo.badgeColor, 0.25)}`,
                }}>{tag}</Box>
              ))}
            </Box>
          </Box>

          <Box><topo.Diagram /></Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 3. Capabilities Diagrams ──────────────────────────────────────────────────

function CapabilitiesDiagrams() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const tabs = [
    { label: 'Backup & Restore' },
    { label: 'Horizontal Scaling' },
    { label: 'Version Upgrade' },
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
        /* ── Scaling ── */
        .cd-scale-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 20px; margin-bottom: 28px;
        }
        @media (max-width: 600px) { .cd-scale-grid { grid-template-columns: 1fr; } }
        .cd-scale-card {
          background: var(--cd-box-bg, #252840); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 20px 18px;
        }
        .cd-scale-header {
          font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--cd-text-muted, #8B90A0); margin-bottom: 14px;
        }
        .cd-scale-row {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
        }
        .cd-scale-label { font-size: 12px; font-weight: 600; font-family: "JetBrains Mono", monospace; flex: 1; }
        .cd-scale-bar-bg {
          flex: 2; height: 8px; background: rgba(255,255,255,0.08);
          border-radius: 4px; overflow: hidden;
        }
        .cd-scale-bar-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #6CB6FF, #4ADE80);
        }
        .cd-scale-count {
          font-size: 11px; font-weight: 700; font-family: "JetBrains Mono", monospace;
          color: #6CB6FF; min-width: 30px; text-align: right;
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
      `}</style>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionEyebrow label="Capabilities" />
          <Typography variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
            Built for{' '}
            <Box component="span" color="primary.main">Production Milvus</Box>
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}>
            KubeBlocks automates the hardest parts of running Milvus on Kubernetes — so your team doesn&apos;t have to.
          </Typography>
        </Box>

        {/* Tab bar */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 6 }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ '& .MuiTab-root': { fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', minHeight: 48 } }}
          >
            {tabs.map((tab, i) => <Tab key={i} label={tab.label} />)}
          </Tabs>
        </Box>

        {/* ── Panel 0: Backup & Restore ── */}
        {activeTab === 0 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-orange"></div>
              <div className="cd-title-group">
                <div className="cd-title">Backup &amp; Restore</div>
                <div className="cd-desc">Collection-level snapshot backups via milvus-backup. Export to S3-compatible object storage and restore to a new cluster at any time.</div>
              </div>
              <div className="cd-badge cd-badge-orange">milvus-backup</div>
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
                  <strong>1. Export Collections</strong>
                  <span>milvus-backup exports collection data and indexes to S3</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon blue"></div>
                <div className="cd-restore-text">
                  <strong>2. Upload to S3</strong>
                  <span>Backup stored in S3-compatible object storage</span>
                </div>
              </div>
              <div className="cd-restore-arrow">→</div>
              <div className="cd-restore-step">
                <div className="cd-restore-icon green"></div>
                <div className="cd-restore-text">
                  <strong>3. Restore Cluster</strong>
                  <span>New Milvus cluster restored from any stored snapshot</span>
                </div>
              </div>
              <div className="cd-s3-badge">✓ S3-Compatible Storage</div>
            </div>
          </div>
        )}

        {/* ── Panel 1: Horizontal Scaling ── */}
        {activeTab === 1 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-green"></div>
              <div className="cd-title-group">
                <div className="cd-title">Horizontal Scaling</div>
                <div className="cd-desc">Scale querynode, datanode, indexnode, and proxy independently. All workers are stateless — scale out without data migration. Expect brief segment rebalancing during scale-out.</div>
              </div>
              <div className="cd-badge cd-badge-blue">Minimal Disruption</div>
            </div>

            <div className="cd-scale-grid">
              <div className="cd-scale-card">
                <div className="cd-scale-header">QueryNode — Search Throughput</div>
                <div className="cd-scale-row">
                  <div className="cd-scale-label">Before</div>
                  <div className="cd-scale-bar-bg"><div className="cd-scale-bar-fill" style={{width:'33%'}}></div></div>
                  <div className="cd-scale-count">×1</div>
                </div>
                <div className="cd-scale-row">
                  <div className="cd-scale-label">After</div>
                  <div className="cd-scale-bar-bg"><div className="cd-scale-bar-fill" style={{width:'100%'}}></div></div>
                  <div className="cd-scale-count">×3</div>
                </div>
                <div style={{fontSize:'11px',color:'var(--cd-text-muted)',marginTop:'8px'}}>
                  +3 replicas → 3× ANN search throughput; segments rebalanced automatically
                </div>
              </div>

              <div className="cd-scale-card">
                <div className="cd-scale-header">DataNode — Ingest Throughput</div>
                <div className="cd-scale-row">
                  <div className="cd-scale-label">Before</div>
                  <div className="cd-scale-bar-bg"><div className="cd-scale-bar-fill" style={{width:'50%'}}></div></div>
                  <div className="cd-scale-count">×1</div>
                </div>
                <div className="cd-scale-row">
                  <div className="cd-scale-label">After</div>
                  <div className="cd-scale-bar-bg"><div className="cd-scale-bar-fill" style={{width:'100%'}}></div></div>
                  <div className="cd-scale-count">×2</div>
                </div>
                <div style={{fontSize:'11px',color:'var(--cd-text-muted)',marginTop:'8px'}}>
                  +1 datanode → higher vector insert and flush concurrency
                </div>
              </div>
            </div>

            <div className="cd-traffic">
              <div className="cd-traffic-label">Search Throughput</div>
              <div className="cd-traffic-track"><div className="cd-traffic-fill"></div></div>
              <div className="cd-traffic-status">✓ Online Scale-Out</div>
            </div>
          </div>
        )}

        {/* ── Panel 2: Version Upgrade ── */}
        {activeTab === 2 && (
          <div className="cd-card">
            <div className="cd-header">
              <div className="cd-icon cd-icon-blue"></div>
              <div className="cd-title-group">
                <div className="cd-title">Version Upgrade</div>
                <div className="cd-desc">Rolling upgrade from 2.3.x to 2.5.x. Workers upgraded first (datanode, indexnode, querynode), then proxy, then mixcoord last to maintain service continuity.</div>
              </div>
              <div className="cd-badge cd-badge-blue">Minimal Cutover</div>
            </div>

            <div className="cd-upgrade-grid">
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 1 — Initial</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>datanode<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>indexnode<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>querynode<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>proxy<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>mixcoord<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 2 — Workers</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>datanode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>indexnode<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                  <div className="cd-pod replica-old"><div className="cd-pod-dot"></div>querynode<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>proxy<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>mixcoord<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage highlight">
                <div className="cd-stage-label"><span>Step 3 — Proxy</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>datanode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>indexnode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>querynode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod upgrading"><div className="cd-pod-dot"></div>proxy<div className="cd-pod-version cd-v-upg">upgrading…</div></div>
                  <div className="cd-pod primary-old"><div className="cd-pod-dot"></div>mixcoord<div className="cd-pod-version cd-v-old">2.3.2</div></div>
                </div>
              </div>
              <div className="cd-stage-arrow">›</div>
              <div className="cd-stage">
                <div className="cd-stage-label"><span>Step 4 — Complete</span></div>
                <div className="cd-pod-grid">
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>datanode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>indexnode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod replica-new"><div className="cd-pod-dot"></div>querynode<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>proxy<div className="cd-pod-version cd-v-new">2.5.13</div></div>
                  <div className="cd-pod primary-new"><div className="cd-pod-dot"></div>mixcoord<div className="cd-pod-version cd-v-new">2.5.13</div></div>
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
      </Container>
    </Box>
  );
}

// ── 5. Lifecycle Features ─────────────────────────────────────────────────────

const lifecycleCategories = [
  {
    title: 'Scaling & Availability',
    color: '#0165CB',
    items: [
      { title: 'Horizontal Scaling', desc: 'Scale querynode, datanode, indexnode, and proxy independently. All workers are stateless — scale out without data migration.' },
      { title: 'Vertical Scaling', desc: 'Resize CPU and memory for any Milvus component via OpsRequest with a rolling restart that keeps the cluster available.' },
      { title: 'Volume Expansion', desc: 'Expand PVCs for components that use persistent storage without pod restarts on supported storage classes.' },
      { title: 'Rolling Restart', desc: 'Controlled rolling restarts with health checks between each pod to maintain service availability.' },
      { title: 'Stop / Start', desc: 'Suspend the Milvus cluster to eliminate compute cost; resume with full state from MinIO and etcd.' },
    ],
  },
  {
    title: 'Configuration & Data',
    color: '#059669',
    items: [
      { title: 'Dynamic Configuration', desc: 'Tune Milvus parameters via OpsRequest — dataCoord settings, queryNode cache sizes, etcd endpoints — without full restarts.' },
      { title: 'Version Upgrade', desc: 'Rolling upgrades from 2.3.x to 2.5.x with component-ordered sequencing: workers first, proxy, then mixcoord.' },
      { title: 'Prometheus Metrics', desc: 'Per-component metrics exposed on port 9091; compatible with Prometheus and Grafana dashboards.' },
      { title: 'Backup & Restore', desc: 'Collection-level backup via milvus-backup (v0.5.9+); restore to a new cluster from any stored snapshot.' },
      { title: 'Expose via LoadBalancer', desc: 'Expose the gRPC proxy endpoint on port 19530 via a Kubernetes LoadBalancer service for external client access.' },
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

const milvusPosts = [
  {
    title: 'KubeBlocks x Milvus: Kubernetes Operator Guide',
    description: 'Deploy standalone and cluster modes, integrate etcd/MinIO via Addons, and manage Day-2 operations with an operator-first approach.',
    image: '/img/blogs/thumbnails/milvus_kubeblocks_thumbnail.png',
    href: '/blog/kubeblocks-x-milvus-kubernetes-operator-guide',
  },
  {
    title: 'We Let an AI Agent Manage Our Databases',
    description: 'We tested AI agents against traditional Kubernetes database operators — and why a unified API like KubeBlocks changes everything.',
    image: '/img/blogs/thumbnails/blog-ai-agent-database-operators.png',
    href: '/blog/we-let-an-ai-agent-manage-our-databases',
  },
  {
    title: 'Deploy Production-Ready AIGC Applications with KubeBlocks and Dify',
    description: 'Build and deploy production-grade AIGC applications on Kubernetes with KubeBlocks managing PostgreSQL, Redis, and Qdrant.',
    image: '/img/blogs/thumbnails/blog-dify.png',
    href: '/blog/deploy-aigc-applications-using-kubeblocks-and-dify',
  },
];

function MilvusBlogPosts() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <SectionEyebrow label="From the Blog" />
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Go Deeper on{' '}
            <Box component="span" color="primary.main">Milvus on Kubernetes</Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {milvusPosts.map((post) => (
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

// ── 7. Related Operators ──────────────────────────────────────────────────────

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
              Milvus 2.5+ supports Apache Kafka as its write-ahead log (WAL) for higher
              throughput streaming. KubeBlocks manages both Milvus and Kafka clusters —
              deploy the full AI data stack on a single operator.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ── 8. CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  const checks = ['Open Source', 'Milvus & 35+ other engines', 'Production-grade HA', 'No vendor lock-in'];

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>
          <SectionEyebrow label="Get Started" />

          <Typography
            variant="h3" fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}
          >
            Get Started with KubeBlocks Milvus Operator,{' '}
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

export default function MilvusOperatorPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Architecture />
      <CapabilitiesDiagrams />
      <LifecycleFeatures />
      <MilvusBlogPosts />
      <RelatedOperators />
      <CTA />
    </>
  );
}
