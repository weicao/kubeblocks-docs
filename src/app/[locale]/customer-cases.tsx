'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

import ecloud       from '@/assets/customers/ecloud.svg';
import weipinhui    from '@/assets/customers/weipinhui.svg';
import tigerbrokers from '@/assets/customers/tigerbrokers.svg';
import sealos       from '@/assets/customers/sealos.svg';
import kuaishou     from '@/assets/customers/kuaishou.svg';

// ── Case data ───────────────────────────────────────────────────────────────
const cases = [
  {
    logo: sealos,
    logoFilter: 'screen',
    company: 'Sealos',
    category: 'Developer Platform',
    tag: 'Operational Efficiency',
    stats: [
      { value: '6,000+', label: 'Database Instances' },
      { value: '1', label: 'Engineer Required' },
      { value: '4', label: 'Regions' },
    ],
    title: '1 Engineer. 6,000+ Databases. No DBA Team.',
    description:
      "By adopting KubeBlocks' declarative management and automated workflows, a single Kubernetes engineer — without a DBA background — now reliably manages over 6,000 database instances across four regions.",
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/mangage-6k-db-instance-with-kubeblocks' },
    cta2: null,
  },
  {
    logo: weipinhui,
    logoFilter: 'screen',
    company: 'VIP.com',
    category: 'E-Commerce · Multi-Engine',
    tag: 'Unified Operations',
    stats: [
      { value: '1,000+', label: 'DB Clusters' },
      { value: '3,000+', label: 'Managed Nodes' },
    ],
    title: '1,000+ Clusters, One Unified Operations Experience',
    description:
      'VIP.com adopted KubeBlocks to unify operations for MySQL, ElasticSearch, and Kafka. With 1,000+ clusters and 3,000+ nodes, they now enjoy a consistent, automated operational experience across entirely different database engines.',
    cta: null,
    cta2: null,
  },
  {
    logo: kuaishou,
    logoFilter: 'screen',
    company: 'Kuaishou',
    category: 'Social Media · KubeCon Speaker',
    tag: 'Ultra-Large Scale',
    stats: [
      { value: '10,000+', label: 'Pods per Redis Cluster' },
      { value: '2×', label: 'Resource Utilization' },
    ],
    title: '2× Resource Utilization at 10,000-Pod Scale',
    description:
      'Kuaishou built a custom federated architecture with KubeBlocks that deploys Redis across multiple K8s clusters — ultimately doubling resource utilization while hiding all complexity from end-users.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/manage-large-scale-redis-on-k8s-with-kubeblocks' },
    cta2: { label: 'Watch KubeCon talk', href: 'https://www.youtube.com/watch?v=yHXPOupg-iM' },
  },
  {
    logo: tigerbrokers,
    logoFilter: 'invert',
    company: 'Tiger Brokers',
    category: 'FinTech · GitOps',
    tag: 'Infrastructure as Code',
    stats: [
      { value: '100%', label: 'Infrastructure as Code' },
      { value: '5+', label: 'DB Types Managed' },
    ],
    title: '100% Infrastructure as Code for Financial Data',
    description:
      'Tiger Brokers integrated KubeBlocks into their GitOps workflows. Using IaC, they seamlessly provision and manage MySQL, Redis, RabbitMQ, Kafka, and ZooKeeper — ensuring strict version control and rapid deployment.',
    cta: null,
    cta2: null,
  },
  {
    logo: ecloud,
    logoFilter: 'none',
    company: 'China Mobile Cloud',
    category: 'DBaaS Platform · KubeCon Speaker',
    tag: 'Platform Engineering',
    stats: [
      { value: 'Weeks', label: 'vs. Quarters to Ship' },
      { value: '0→1', label: 'DBaaS Platform Built' },
    ],
    title: 'Built a Full DBaaS Platform in Weeks, Not Quarters',
    description:
      'China Mobile Cloud chose KubeBlocks to power He3DB — their AWS Aurora-comparable flagship database. By developing KubeBlocks Addons instead of building Operators from scratch, they cut platform development time from months to weeks.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/interview-china-mobile-cloud-dingshun' },
    cta2: { label: 'Watch KubeCon talk', href: 'https://www.youtube.com/watch?v=i894E5o36EI' },
  },
];

// ── Arrow icon ──────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

// ── Single card ─────────────────────────────────────────────────────────────
function CaseCard({
  c, cardBg, cardHover, dividerColor,
  t1, t2, t3, ctaColor, ctaHover, primaryDim, primaryBorder,
}: {
  c: typeof cases[0];
  cardBg: string; cardHover: string; dividerColor: string;
  t1: string; t2: string; t3: string; ctaColor: string; ctaHover: string;
  primaryDim: string; primaryBorder: string;
}) {
  const imgFilter = c.logoFilter === 'invert' ? 'brightness(0) invert(1)' : undefined;

  return (
    <Box
      sx={{
        bgcolor: cardBg, p: '28px 24px',
        display: 'flex', flexDirection: 'column', gap: '14px',
        transition: 'background 0.2s',
        '&:hover': { bgcolor: cardHover },
      }}
    >
      {/* Top row: logo+company LEFT, tag badge RIGHT */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box sx={{ img: { height: '20px !important', width: 'auto !important', maxWidth: '100px', objectFit: 'contain', opacity: c.logoFilter === 'screen' ? 0.85 : 0.65, filter: imgFilter, mixBlendMode: c.logoFilter === 'screen' ? 'screen' : undefined } }}>
              <Image src={c.logo} alt={c.company} height={20} />
            </Box>
            <Typography component="span" sx={{ fontSize: '0.875rem', fontWeight: 700, color: t1 }}>
              {c.company}
            </Typography>
          </Box>
          <Typography component="span" sx={{ fontSize: '0.7rem', color: t3 }}>
            {c.category}
          </Typography>
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: '11px', fontWeight: 500,
            px: 1.25, py: '3px',
            borderRadius: '999px',
            bgcolor: primaryDim,
            color: 'primary.main',
            border: '1px solid',
            borderColor: primaryBorder,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          {c.tag}
        </Box>
      </Box>

      {/* Title */}
      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: t2, lineHeight: 1.45 }}>
        {c.title}
      </Typography>

      {/* Description */}
      <Typography sx={{ fontSize: '0.85rem', color: t3, lineHeight: 1.7, flex: 1 }}>
        {c.description}
      </Typography>

      {/* CTA links */}
      {(c.cta || c.cta2) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {c.cta && (
            <Box
              component="a" href={c.cta.href} target="_blank" rel="noopener noreferrer"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 500, color: ctaColor, textDecoration: 'none', transition: 'color 0.15s, gap 0.15s', '&:hover': { color: ctaHover, gap: '8px' } }}
            >
              {c.cta.label}
              <ArrowIcon />
            </Box>
          )}
          {c.cta2 && (
            <Box
              component="a" href={c.cta2.href} target="_blank" rel="noopener noreferrer"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 500, color: ctaColor, textDecoration: 'none', transition: 'color 0.15s, gap 0.15s', opacity: 0.7, '&:hover': { color: ctaHover, gap: '8px', opacity: 1 } }}
            >
              {c.cta2.label}
              <ArrowIcon />
            </Box>
          )}
        </Box>
      )}

      {/* Stats — bottom, border-top */}
      <Box sx={{ display: 'flex', gap: '24px', pt: '16px', borderTop: `1px solid ${dividerColor}`, mt: 'auto' }}>
        {c.stats.map((s) => (
          <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Typography
              component="span"
              sx={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: 'primary.main', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              {s.value}
            </Typography>
            <Typography
              component="span"
              sx={{ fontSize: '0.65rem', color: t3, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}
            >
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function CustomerCases() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const outerBorder  = theme.palette.divider;
  const cardBg       = theme.palette.background.paper;
  const cardHover    = theme.palette.action.hover;
  const dividerColor = theme.palette.divider;
  const t1           = isDark ? '#f0f6fc' : '#0F172A';
  const t2           = isDark ? '#e6edf3' : '#1E293B';
  const t3           = isDark ? '#6e7681' : '#64748B';
  const ctaColor     = isDark ? '#58a6ff' : '#2563EB';
  const ctaHover     = isDark ? '#79c0ff' : '#1D4ED8';
  const primaryDim   = isDark ? 'rgba(91,127,255,0.1)' : 'rgba(59,91,219,0.07)';
  const primaryBorder = isDark ? 'rgba(91,127,255,0.25)' : 'rgba(59,91,219,0.2)';

  const cardProps = { cardBg, cardHover, dividerColor, t1, t2, t3, ctaColor, ctaHover, primaryDim, primaryBorder };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: isDark ? 'transparent' : 'background.default' }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>
            Case Studies
          </Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em', lineHeight: 1.2, mb: 1.5, color: t1 }}>
            Learn from Teams{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Running at Scale</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Real engineering teams. Real production workloads. Real numbers.
          </Typography>
        </Box>

        {/* Case cards */}
        <Box sx={{ border: `1px solid ${outerBorder}`, borderRadius: '12px', overflow: 'hidden' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: '1px', bgcolor: outerBorder }}>
            {cases.slice(0, 3).map((c) => (
              <CaseCard key={c.company} c={c} {...cardProps} />
            ))}
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' }, gap: '1px', bgcolor: outerBorder, borderTop: `1px solid ${outerBorder}` }}>
            {cases.slice(3, 5).map((c) => (
              <CaseCard key={c.company} c={c} {...cardProps} />
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
