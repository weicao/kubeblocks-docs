'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import ecloud       from '@/assets/customers/ecloud.svg';
import weipinhui    from '@/assets/customers/weipinhui.svg';
import tigerbrokers from '@/assets/customers/tigerbrokers.svg';
import sealos       from '@/assets/customers/sealos.svg';
import kuaishou     from '@/assets/customers/kuaishou.svg';

// ── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(target: number | null, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// ── Stat component ─────────────────────────────────────────────────────────
function AnimatedStat({
  number,
  suffix = '',
  label,
  large = false,
  t1,
  t3,
}: {
  number: number | null;
  suffix?: string;
  label: string;
  large?: boolean;
  t1: string;
  t3: string;
}) {
  const { value, ref } = useCountUp(number);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <Typography
        ref={ref}
        component="span"
        sx={{
          fontSize: large ? '1.5rem' : 'clamp(1.75rem, 2.5vw, 2.25rem)',
          fontWeight: 700,
          color: t1,
          letterSpacing: large ? '-0.01em' : '-0.03em',
          lineHeight: 1,
        }}
      >
        {number === null ? '' : `${value.toLocaleString()}${suffix}`}
      </Typography>
      <Typography
        component="span"
        sx={{
          fontSize: '0.72rem',
          color: t3,
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ── Case data ──────────────────────────────────────────────────────────────
const cases = [
  {
    logo: ecloud,
    logoFilter: 'none',
    company: 'China Mobile Cloud',
    badge: 'DBaaS Platform',
    stats: [
      { number: null, suffix: '', label: 'in R&D Efficiency', display: 'Qualitative Leap', large: true },
    ],
    title: 'Building a Universal DBaaS Platform from Scratch',
    description:
      'Faced with tight deadlines and limited headcount, China Mobile Cloud chose KubeBlocks to build a universal DBaaS platform supporting both RDS PostgreSQL and He3DB. By developing KubeBlocks Addons instead of building Operators from scratch, they instantly gained mature database orchestration capabilities.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/interview-china-mobile-cloud-dingshun' },
  },
  {
    logo: weipinhui,
    logoFilter: 'screen',
    company: 'VIP.com',
    badge: 'E-commerce · Multi-Engine',
    stats: [
      { number: 1000, suffix: '+', label: 'DB Clusters' },
      { number: 3000, suffix: '+', label: 'Managed Nodes' },
    ],
    title: 'Unifying Diverse Database Operations at Scale',
    description:
      'VIP.com adopted KubeBlocks to unify operations for their internal MySQL, ElasticSearch, and Kafka databases. With over 1,000 clusters and 3,000 nodes under management, they now enjoy a consistent, automated operational experience across entirely different database engines.',
    cta: null,
  },
  {
    logo: tigerbrokers,
    logoFilter: 'invert',
    company: 'Tiger Brokers',
    badge: 'FinTech · GitOps',
    stats: [
      { number: 100, suffix: '%', label: 'Infrastructure as Code' },
      { number: 5,   suffix: '+', label: 'DB Types Managed' },
    ],
    title: 'Automating Financial Data Infrastructure with GitOps',
    description:
      'Tiger Brokers integrated KubeBlocks into their GitOps workflows. Using Infrastructure as Code, they seamlessly provision and manage MySQL, Redis, RabbitMQ, Kafka, and ZooKeeper, ensuring strict version control and rapid deployment.',
    cta: null,
  },
  {
    logo: sealos,
    logoFilter: 'screen',
    company: 'Sealos',
    badge: 'Developer Platform · Operational Efficiency',
    stats: [
      { number: 6000, suffix: '+', label: 'Database Instances' },
      { number: 1,    suffix: '',  label: 'Engineer Required' },
    ],
    title: 'Managing 6,000+ Databases Without a DBA Team',
    description:
      'By adopting KubeBlocks\' declarative management and automated workflows, a single Kubernetes engineer — without a DBA background — now reliably manages over 6,000 database instances across four availability zones.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/mangage-6k-db-instance-with-kubeblocks' },
  },
  {
    logo: kuaishou,
    logoFilter: 'screen',
    company: 'Kuaishou',
    badge: 'Social Media · Ultra-Large Scale',
    stats: [
      { number: 10000, suffix: '+', label: 'Pods per Redis Cluster' },
      { number: 2,     suffix: '×', label: 'Resource Utilization' },
    ],
    title: 'Automating Ultra-Large-Scale Redis Clusters Across Kubernetes',
    description:
      'Kuaishou used KubeBlocks to build a custom federated architecture that seamlessly deploys Redis across multiple K8s clusters while hiding complexity from end-users — ultimately doubling resource utilization at unprecedented scale.',
    cta: null,
  },
];

// ── Arrow icon ─────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

// ── Single card ────────────────────────────────────────────────────────────
function CaseCard({
  c,
  cardBg,
  cardHover,
  dividerColor,
  badgeColor,
  t1,
  t2,
  t3,
  ctaColor,
  ctaHover,
}: {
  c: typeof cases[0];
  cardBg: string;
  cardHover: string;
  dividerColor: string;
  badgeColor: string;
  t1: string;
  t2: string;
  t3: string;
  ctaColor: string;
  ctaHover: string;
}) {
  const logoFilter =
    c.logoFilter === 'invert'
      ? 'brightness(0) invert(1)'
      : c.logoFilter === 'screen'
      ? undefined
      : undefined;

  return (
    <Box
      sx={{
        bgcolor: cardBg,
        p: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: 'background 0.2s',
        '&:hover': { bgcolor: cardHover },
        mixBlendMode: 'normal',
      }}
    >
      {/* Logo */}
      <Box sx={{ height: 28, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            img: {
              height: '22px !important',
              width: 'auto !important',
              maxWidth: '140px',
              objectFit: 'contain',
              opacity: c.logoFilter === 'screen' ? 0.85 : 0.7,
              filter: logoFilter,
              mixBlendMode: c.logoFilter === 'screen' ? 'screen' : undefined,
            },
          }}
        >
          <Image src={c.logo} alt={c.company} height={22} />
        </Box>
      </Box>

      {/* Badge */}
      <Typography
        component="span"
        sx={{
          fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: badgeColor,
        }}
      >
        {c.badge}
      </Typography>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
        {c.stats.map((s, i) =>
          'display' in s ? (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <Typography
                component="span"
                sx={{
                  fontSize: '1.5rem', fontWeight: 700, color: t1,
                  letterSpacing: '-0.01em', lineHeight: 1,
                }}
              >
                {s.display}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: '0.72rem', color: t3, fontWeight: 400,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ) : (
            <AnimatedStat
              key={i}
              number={s.number ?? null}
              suffix={s.suffix}
              label={s.label}
              t1={t1}
              t3={t3}
            />
          )
        )}
      </Box>

      {/* Divider */}
      <Box sx={{ width: '100%', height: '1px', bgcolor: dividerColor }} />

      {/* Title */}
      <Typography
        sx={{ fontSize: '0.95rem', fontWeight: 600, color: t2, lineHeight: 1.45 }}
      >
        {c.title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{ fontSize: '0.85rem', color: t3, lineHeight: 1.7, flex: 1 }}
      >
        {c.description}
      </Typography>

      {/* CTA */}
      {c.cta && (
        <Box
          component="a"
          href={c.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.82rem', fontWeight: 500, color: ctaColor,
            textDecoration: 'none',
            transition: 'color 0.15s, gap 0.15s',
            '&:hover': { color: ctaHover, gap: '8px' },
          }}
        >
          {c.cta.label}
          <ArrowIcon />
        </Box>
      )}
    </Box>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function CustomerCases() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const outerBorder  = isDark ? '#21262d' : '#E2E8F0';
  const cardBg       = isDark ? '#0d1117' : '#fff';
  const cardHover    = isDark ? '#111820' : '#F8FAFC';
  const dividerColor = isDark ? '#21262d' : '#E2E8F0';
  const badgeColor   = isDark ? '#8b949e' : '#64748B';
  const t1           = isDark ? '#f0f6fc' : '#0F172A';
  const t2           = isDark ? '#e6edf3' : '#1E293B';
  const t3           = isDark ? '#6e7681' : '#64748B';
  const ctaColor     = isDark ? '#58a6ff' : '#2563EB';
  const ctaHover     = isDark ? '#79c0ff' : '#1D4ED8';

  const cardProps = { cardBg, cardHover, dividerColor, badgeColor, t1, t2, t3, ctaColor, ctaHover };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: isDark ? 'transparent' : 'background.default' }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h4" fontWeight={600}
            sx={{ letterSpacing: '-0.02em', lineHeight: 1.25, mb: 1.75, color: t1 }}
          >
            Powering Mission-Critical Data Infrastructure at Scale
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: badgeColor, maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            See how industry leaders use KubeBlocks to cut costs, boost efficiency, and manage thousands of databases with ease.
          </Typography>
        </Box>

        {/* Unified grid block */}
        <Box
          sx={{
            border: `1px solid ${outerBorder}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Top row — 3 cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
              gap: '1px',
              bgcolor: outerBorder,
            }}
          >
            {cases.slice(0, 3).map((c) => (
              <CaseCard key={c.company} c={c} {...cardProps} />
            ))}
          </Box>

          {/* Bottom row — 2 cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
              gap: '1px',
              bgcolor: outerBorder,
              borderTop: `1px solid ${outerBorder}`,
            }}
          >
            {cases.slice(3, 5).map((c) => (
              <CaseCard key={c.company} c={c} {...cardProps} />
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
