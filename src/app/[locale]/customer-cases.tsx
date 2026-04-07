'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

import ecloud       from '@/assets/customers/ecloud.svg';
import weipinhui    from '@/assets/customers/weipinhui.svg';
import tigerbrokers from '@/assets/customers/tigerbrokers.svg';
import sealos       from '@/assets/customers/sealos.svg';
import kuaishou     from '@/assets/customers/kuaishou.svg';

import boncloud          from '@/assets/customers/boncloud.svg';
import ctyun             from '@/assets/customers/ctyun.svg';
import fastgpt           from '@/assets/customers/fastgpt.svg';
import kubesphere        from '@/assets/customers/kubesphere.svg';
import logo360           from '@/assets/customers/logo360.svg';
import momenta           from '@/assets/customers/momenta.svg';
import pingan            from '@/assets/customers/pingan.svg';
import tencent           from '@/assets/customers/tencent.svg';
import tilaa             from '@/assets/customers/tilaa.svg';
import xiaomi            from '@/assets/customers/xiaomi.svg';
import zhongxinzhengquan from '@/assets/customers/zhongxinzhengquan.svg';

// ── Logo marquee data ───────────────────────────────────────────────────────
const logos = [
  { img: boncloud,          title: 'BONC Cloud' },
  { img: ecloud,            title: 'China Mobile Cloud' },
  { img: ctyun,             title: 'China Telecom Cloud' },
  { img: tencent,           title: 'Tencent' },
  { img: xiaomi,            title: 'Xiaomi' },
  { img: pingan,            title: 'Ping An' },
  { img: weipinhui,         title: 'VIP.com' },
  { img: kuaishou,          title: 'Kwai' },
  { img: tigerbrokers,      title: 'Tiger Brokers' },
  { img: zhongxinzhengquan, title: 'CITIC' },
  { img: sealos,            title: 'SealOS' },
  { img: fastgpt,           title: 'FastGPT' },
  { img: kubesphere,        title: 'KubeSphere' },
  { img: momenta,           title: 'Momenta' },
  { img: logo360,           title: '360' },
  { img: tilaa,             title: 'Tilaa' },
];

// ── Case data ───────────────────────────────────────────────────────────────
const cases = [
  {
    logo: weipinhui,
    logoFilter: 'screen',
    company: 'VIP.com',
    badge: 'E-commerce · Multi-Engine',
    stats: [
      { value: '1,000+', label: 'DB Clusters' },
      { value: '3,000+', label: 'Managed Nodes' },
    ],
    title: 'Unifying Diverse Database Operations at Scale',
    description:
      'VIP.com adopted KubeBlocks to unify operations for their internal MySQL, ElasticSearch, and Kafka databases. With over 1,000 clusters and 3,000 nodes under management, they now enjoy a consistent, automated operational experience across entirely different database engines.',
    cta: null,
  },
  {
    logo: sealos,
    logoFilter: 'screen',
    company: 'Sealos',
    badge: 'Developer Platform · Operational Efficiency',
    stats: [
      { value: '6,000+', label: 'Database Instances' },
      { value: '1', label: 'Engineer Required' },
    ],
    title: 'Managing 6,000+ Databases Without a DBA Team',
    description:
      'By adopting KubeBlocks\' declarative management and automated workflows, a single Kubernetes engineer — without a DBA background — now reliably manages over 6,000 database instances across four availability zones.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/mangage-6k-db-instance-with-kubeblocks' },
  },
  {
    logo: tigerbrokers,
    logoFilter: 'invert',
    company: 'Tiger Brokers',
    badge: 'FinTech · GitOps',
    stats: [
      { value: '100%', label: 'Infrastructure as Code' },
      { value: '5+', label: 'DB Types Managed' },
    ],
    title: 'Automating Financial Data Infrastructure with GitOps',
    description:
      'Tiger Brokers integrated KubeBlocks into their GitOps workflows. Using Infrastructure as Code, they seamlessly provision and manage MySQL, Redis, RabbitMQ, Kafka, and ZooKeeper, ensuring strict version control and rapid deployment.',
    cta: null,
  },
  {
    logo: ecloud,
    logoFilter: 'none',
    company: 'China Mobile Cloud',
    badge: 'DBaaS Platform · KubeCon Speaker',
    stats: [
      { value: 'Qualitative Leap', label: 'in R&D Efficiency' },
    ],
    title: 'Building a Universal DBaaS Platform from Scratch',
    description:
      'Faced with tight deadlines and limited headcount, China Mobile Cloud chose KubeBlocks to power He3DB — their flagship database comparable to AWS Aurora — alongside RDS PostgreSQL. By developing KubeBlocks Addons instead of building Operators from scratch, they instantly gained mature database orchestration capabilities.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/interview-china-mobile-cloud-dingshun' },
    cta2: { label: 'Watch KubeCon talk', href: 'https://www.youtube.com/watch?v=i894E5o36EI' },
  },
  {
    logo: kuaishou,
    logoFilter: 'screen',
    company: 'Kuaishou',
    badge: 'Social Media · Ultra-Large Scale · KubeCon Speaker',
    stats: [
      { value: '10,000+', label: 'Pods per Redis Cluster' },
      { value: '2×', label: 'Resource Utilization' },
    ],
    title: 'Automating Ultra-Large-Scale Redis Clusters Across Kubernetes',
    description:
      'Kuaishou used KubeBlocks to build a custom federated architecture that seamlessly deploys Redis across multiple K8s clusters while hiding complexity from end-users — ultimately doubling resource utilization at unprecedented scale.',
    cta: { label: 'Read the story', href: 'https://kubeblocks.io/blog/run-redis-on-k8s-kuaishou-solution-with-kubeblocks' },
    cta2: { label: 'Watch KubeCon talk', href: 'https://www.youtube.com/watch?v=yHXPOupg-iM' },
  },
];

// ── Arrow icon ──────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

// ── Stat box ────────────────────────────────────────────────────────────────
function StatBox({ value, label, t1, t3 }: { value: string; label: string; t1: string; t3: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <Typography
        component="span"
        sx={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: t1, letterSpacing: '-0.03em', lineHeight: 1 }}
      >
        {value}
      </Typography>
      <Typography
        component="span"
        sx={{ fontSize: '0.72rem', color: t3, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.05em' }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ── Single card ─────────────────────────────────────────────────────────────
function CaseCard({
  c, cardBg, cardHover, dividerColor, badgeColor, t1, t2, t3, ctaColor, ctaHover,
}: {
  c: typeof cases[0];
  cardBg: string; cardHover: string; dividerColor: string; badgeColor: string;
  t1: string; t2: string; t3: string; ctaColor: string; ctaHover: string;
}) {
  const logoFilter =
    c.logoFilter === 'invert' ? 'brightness(0) invert(1)' : undefined;

  return (
    <Box
      sx={{
        bgcolor: cardBg, p: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px',
        transition: 'background 0.2s', '&:hover': { bgcolor: cardHover },
      }}
    >
      {/* Logo + Company */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box sx={{ img: { height: '22px !important', width: 'auto !important', maxWidth: '120px', objectFit: 'contain', opacity: c.logoFilter === 'screen' ? 0.85 : 0.7, filter: logoFilter, mixBlendMode: c.logoFilter === 'screen' ? 'screen' : undefined } }}>
          <Image src={c.logo} alt={c.company} height={22} />
        </Box>
        <Box sx={{ width: '1px', height: '16px', bgcolor: dividerColor }} />
        <Typography component="span" sx={{ fontSize: '0.78rem', fontWeight: 500, color: t2 }}>
          {c.company}
        </Typography>
      </Box>

      {/* Badge */}
      <Typography component="span" sx={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: badgeColor }}>
        {c.badge}
      </Typography>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
        {c.stats.map((s, i) => (
          <StatBox key={i} value={s.value} label={s.label} t1={t1} t3={t3} />
        ))}
      </Box>

      <Box sx={{ width: '100%', height: '1px', bgcolor: dividerColor }} />

      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: t2, lineHeight: 1.45 }}>
        {c.title}
      </Typography>

      <Typography sx={{ fontSize: '0.85rem', color: t3, lineHeight: 1.7, flex: 1 }}>
        {c.description}
      </Typography>

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
  const badgeColor   = isDark ? '#8b949e' : '#64748B';
  const t1           = isDark ? '#f0f6fc' : '#0F172A';
  const t2           = isDark ? '#e6edf3' : '#1E293B';
  const t3           = isDark ? '#6e7681' : '#64748B';
  const ctaColor     = isDark ? '#58a6ff' : '#2563EB';
  const ctaHover     = isDark ? '#79c0ff' : '#1D4ED8';
  const logoFilter   = isDark ? 'none' : 'brightness(0) opacity(0.5)';

  const cardProps = { cardBg, cardHover, dividerColor, badgeColor, t1, t2, t3, ctaColor, ctaHover };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: isDark ? 'transparent' : 'background.default' }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: t3, '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: t3, display: 'block' } }}>
            Trusted by
          </Box>
          <Typography variant="h4" fontWeight={600} sx={{ letterSpacing: '-0.02em', lineHeight: 1.25, mb: 1.75, color: t1 }}>
            In Production Worldwide
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: badgeColor, maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Engineering teams from fintech to social media share how they run databases on Kubernetes at scale.
          </Typography>
        </Box>

        {/* Logo marquee */}
        <Box
          sx={{
            overflow: 'hidden',
            mb: 6,
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee 35s linear infinite',
              '@keyframes marquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },
            }}
          >
            {[...logos, ...logos].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5, px: 4, py: 1.5,
                  borderRight: `1px solid ${outerBorder}`,
                  '&:last-child': { borderRight: 'none' },
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  height={24}
                  style={{ filter: logoFilter, opacity: 0.7, display: 'block' }}
                />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: t3, whiteSpace: 'nowrap' }}>
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
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
