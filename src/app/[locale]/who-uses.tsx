'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';

const tabs = [
  {
    id: 'gitops',
    label: 'GitOps & Platform Engineers',
    heading: 'Declare All Your Databases as Code',
    description:
      'Manage every database engine through the same Kubernetes-native CRDs you already use for your apps. Write once in YAML, apply via ArgoCD or Flux, and let KubeBlocks reconcile the desired state—no imperative scripts, no snowflake configs.',
    bullets: [
      'Kubernetes-native CRDs — fits naturally into any GitOps repo',
      'Declarative cluster topology: replicas, proxies, storage, all in YAML',
      'Consistent schema across MySQL, Redis, Kafka, and 30+ more engines',
      'Helm-based install, ArgoCD & Flux compatible out of the box',
    ],
  },
  {
    id: 'platform',
    label: 'Internal Platform Teams',
    heading: 'Give Developers Self-Service Databases in Minutes',
    description:
      "Build a self-service database layer on top of Kubernetes without writing a single Operator. KubeBlocks' Addon system lets you onboard any database engine with configuration files—no Golang required—so your platform team ships faster and your developers stop waiting.",
    bullets: [
      'Low-code Addon framework: onboard any DB engine without writing Go',
      'Expose a clean API surface to app developers via Namespace isolation',
      'Built-in RBAC, multi-tenancy, and resource quota management',
      'Consistent operational experience across all database engines',
    ],
  },
  {
    id: 'dbaas',
    label: 'DBaaS & Product Teams',
    heading: 'Launch a Database Service Without Building an Operator',
    description:
      "Skip months of Operator development. KubeBlocks provides the entire operational foundation—provisioning, HA, backup, observability, lifecycle management—so you can focus on your product's differentiation, not the plumbing.",
    bullets: [
      'Production-grade HA, PITR backup, and auto-failover out of the box',
      'Multi-tenant architecture with per-cluster isolation',
      'API-first design: integrate with your billing, portal, or control plane',
      'Used by China Mobile Cloud to ship He3DB in weeks, not quarters',
    ],
  },
];

export default function WhoUses() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>
            Who Uses KubeBlocks
          </Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em', mb: 1.5 }}>
            Built for Every Team That Runs{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Databases on Kubernetes</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            Whether you&apos;re managing databases as code, building an internal developer platform, or shipping a database service—KubeBlocks fits your workflow.
          </Typography>
        </Box>

        {/* Tab buttons */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5 }}>
          {tabs.map((t, i) => (
            <Box
              key={t.id}
              component="button"
              onClick={() => setActive(i)}
              sx={{
                display: 'inline-flex', alignItems: 'center',
                px: 2, py: 1, borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500,
                cursor: 'pointer', border: '1px solid',
                transition: 'all 0.2s',
                ...(active === i
                  ? { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' }
                  : { bgcolor: 'transparent', color: 'text.secondary', borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main', color: 'text.primary' } }
                ),
              }}
            >
              {t.label}
            </Box>
          ))}
        </Box>

        {/* Tab content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'start' }}>
          {/* Left: heading + description */}
          <Box>
            <Typography fontWeight={700} sx={{ fontSize: '1.35rem', letterSpacing: '-0.02em', mb: 2 }}>
              {tab.heading}
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary', lineHeight: 1.75 }}>
              {tab.description}
            </Typography>
          </Box>

          {/* Right: bullets */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            {tab.bullets.map((b) => (
              <Box key={b} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, fontSize: '0.875rem', color: 'text.primary' }}>
                <Box component="span" sx={{ color: '#34d399', fontWeight: 700, flexShrink: 0, mt: '2px' }}>✓</Box>
                {b}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
