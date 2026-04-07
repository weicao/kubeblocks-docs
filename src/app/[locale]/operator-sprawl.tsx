'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

type DbKey = 'mysql' | 'pg' | 'redis' | 'mongo' | 'kafka';

const databases: { name: string; key: DbKey }[] = [
  { name: 'MySQL',      key: 'mysql' },
  { name: 'PostgreSQL', key: 'pg' },
  { name: 'Redis',      key: 'redis' },
  { name: 'MongoDB',    key: 'mongo' },
  { name: 'Kafka',      key: 'kafka' },
];

// Subtle tinted colors — same for dark and light, just opacity-adjusted
const DB_COLORS: Record<DbKey, { border: string; color: string }> = {
  mysql: { border: 'rgba(251,146,60,.3)',  color: 'rgba(253,186,116,.85)' },
  pg:    { border: 'rgba(96,165,250,.28)', color: 'rgba(147,197,253,.85)' },
  redis: { border: 'rgba(252,165,165,.28)',color: 'rgba(252,165,165,.85)' },
  mongo: { border: 'rgba(110,231,183,.25)',color: 'rgba(110,231,183,.85)' },
  kafka: { border: 'rgba(203,213,225,.2)', color: 'rgba(203,213,225,.75)' },
};

const DB_LIGHT: Record<DbKey, { bg: string; color: string }> = {
  mysql: { bg: 'rgba(251,146,60,.08)',  color: '#C2410C' },
  pg:    { bg: 'rgba(59,130,246,.08)',  color: '#1D4ED8' },
  redis: { bg: 'rgba(220,38,38,.07)',   color: '#B91C1C' },
  mongo: { bg: 'rgba(22,163,74,.07)',   color: '#15803D' },
  kafka: { bg: 'rgba(71,85,105,.07)',   color: '#334155' },
};

const capCards = [
  {
    title: 'Backup & Recovery',
    items: ['Instant Backup', 'Point-in-Time Recovery', 'Delete Protection'],
  },
  {
    title: 'Observability',
    items: ['Metrics & Logs', 'Slow SQL Analysis', 'Alert Rules'],
  },
  {
    title: 'Lifecycle',
    items: ['Rolling Upgrade', 'Auto Failover', 'HA Architecture'],
  },
];

export default function OperatorSprawl() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Tokens
  const panelBg     = theme.palette.background.paper;
  const s2          = theme.palette.background.default;
  const line        = isDark ? 'rgba(255,255,255,.07)' : '#E2E8F0';
  const line2       = isDark ? 'rgba(255,255,255,.12)' : '#CBD5E1';
  const t2          = isDark ? 'rgba(255,255,255,.5)'  : '#475569';
  const t3          = isDark ? 'rgba(255,255,255,.25)' : '#94A3B8';
  const redStat     = isDark ? '#FF4D4D' : '#DC2626';
  const greenStat   = isDark ? '#00C48C' : '#059669';
  const greenDot    = isDark ? 'rgba(0,196,140,.7)'   : 'rgba(5,150,105,.7)';

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">

        {/* ── Header ── */}
        <Box textAlign="center" mb={8}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 3,
              fontSize: '11px', fontWeight: 700, letterSpacing: '.12em',
              textTransform: 'uppercase', color: 'primary.main',
              '&::before': {
                content: '""',
                width: '14px', height: '2px',
                borderRadius: '1px',
                bgcolor: 'primary.main',
                display: 'block',
              },
            }}
          >
            Why KubeBlocks
          </Box>

          <Typography
            variant="h4" fontWeight={700}
            sx={{ letterSpacing: '-0.04em', lineHeight: 1.1, mb: 2 }}
          >
            Stop managing{' '}
            <Box
              component="span"
              sx={{
                position: 'relative', display: 'inline-block', pb: '4px',
                '&::after': {
                  content: '""', position: 'absolute',
                  left: 0, right: 0, bottom: 0,
                  height: '2px', borderRadius: '1px',
                  bgcolor: redStat, opacity: 0.6,
                },
              }}
            >
              N&nbsp;operators
            </Box>
            {' '}for N databases
          </Typography>

          <Typography sx={{ fontSize: '15px', color: t2, maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
            Every operator ships its own CRDs, its own backup logic, its own upgrade path. Whether you&apos;re using kubectl, Helm or ArgoCD—you&apos;re learning a new dialect for every engine you add.
          </Typography>
        </Box>

        {/* ── Compare Grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 48px 1fr' },
            alignItems: 'stretch',
          }}
        >

          {/* ════ BEFORE ════ */}
          <Box
            sx={{
              border: `1px solid ${line}`, borderRadius: '16px',
              bgcolor: panelBg, display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              transition: 'border-color .25s',
              '&:hover': { borderColor: line2 },
            }}
          >
            {/* Header */}
            <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: `1px solid ${line}` }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: t3, mb: 0.75 }}>
                Without KubeBlocks
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}>
                Operator Sprawl
              </Typography>
              <Typography sx={{ fontSize: '11.5px', color: t3, mt: 0.5 }}>
                N databases = N CRD schemas = N GitOps configs to maintain
              </Typography>
            </Box>

            {/* DB rows */}
            <Box sx={{ flex: 1, px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75, justifyContent: 'space-evenly' }}>
              {databases.map((db) => {
                const dk = DB_COLORS[db.key];
                const lt = DB_LIGHT[db.key];
                return (
                  <Box
                    key={db.key}
                    sx={{
                      display: 'grid', gridTemplateColumns: '86px 20px 1fr',
                      alignItems: 'center', gap: 1,
                      px: 1.25, py: 1.125, borderRadius: '9px',
                      border: '1px solid transparent',
                      transition: 'background .18s, border-color .18s',
                      '&:hover': { bgcolor: s2, borderColor: line },
                    }}
                  >
                    {/* DB pill */}
                    <Box
                      sx={{
                        height: 26, borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10.5px', fontWeight: 600, letterSpacing: '.03em',
                        bgcolor: isDark ? s2 : lt.bg,
                        border: `1px solid ${isDark ? dk.border : 'transparent'}`,
                        color: isDark ? dk.color : lt.color,
                      }}
                    >
                      {db.name}
                    </Box>
                    {/* Arrow */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: t3 }}>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M0 3.5h9M6.5 1l2.5 2.5L6.5 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                    {/* Operator */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 500, color: t2 }}>
                        {db.name} Operator
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.375 }}>
                        {['Backup', 'Monitor', 'Upgrade'].map((tag) => (
                          <Box
                            key={tag}
                            component="span"
                            sx={{
                              fontSize: '9px', fontWeight: 500, px: 0.75, py: '1.5px',
                              borderRadius: '4px', border: `1px solid ${line2}`,
                              color: t3, letterSpacing: '.03em',
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Before stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: `1px solid ${line}` }}>
              {[
                { n: '5',  l: 'Operators\nto install' },
                { n: '15', l: 'Concerns\nto manage' },
                { n: '∞',  l: 'Complexity\nas you scale' },
              ].map((s, i) => (
                <Box key={i} sx={{ py: 2, px: 1.25, textAlign: 'center', borderRight: i < 2 ? `1px solid ${line}` : 'none' }}>
                  <Typography sx={{ fontSize: '36px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', mb: 0.625, color: redStat }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: t3, lineHeight: 1.4, fontWeight: 500, whiteSpace: 'pre-line' }}>
                    {s.l}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ════ VS ════ */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Box sx={{ flex: 1, width: '1px', background: `linear-gradient(to bottom, transparent, ${line} 25%, ${line} 75%, transparent)` }} />
            <Box
              sx={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${line2}`, bgcolor: s2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: t3, letterSpacing: '.06em' }}>VS</Typography>
            </Box>
            <Box sx={{ flex: 1, width: '1px', background: `linear-gradient(to bottom, transparent, ${line} 25%, ${line} 75%, transparent)` }} />
          </Box>

          {/* Mobile VS */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2, my: 2 }}>
            <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${line} 30%, ${line} 70%, transparent)` }} />
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: `1px solid ${line2}`, bgcolor: s2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: t3, letterSpacing: '.06em' }}>VS</Typography>
            </Box>
            <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${line} 30%, ${line} 70%, transparent)` }} />
          </Box>

          {/* ════ AFTER ════ */}
          <Box
            sx={{
              border: `1px solid ${line}`, borderRadius: '16px',
              bgcolor: panelBg, display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              transition: 'border-color .25s',
              '&:hover': { borderColor: line2 },
            }}
          >
            {/* Header */}
            <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: `1px solid ${line}` }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: t3, mb: 0.75 }}>
                With KubeBlocks
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}>
                One Unified API
              </Typography>
              <Typography sx={{ fontSize: '11.5px', color: t3, mt: 0.5 }}>
                One CRD schema. One GitOps workflow. One team that owns everything.
              </Typography>
            </Box>

            {/* After body */}
            <Box sx={{ flex: 1, px: 2.5, pt: 2, pb: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

              {/* DB chips */}
              <Box sx={{ display: 'flex', gap: 0.625, justifyContent: 'center', flexWrap: 'wrap' }}>
                {databases.map((db) => {
                  const dk = DB_COLORS[db.key];
                  const lt = DB_LIGHT[db.key];
                  return (
                    <Box
                      key={db.key}
                      sx={{
                        height: 24, px: 1.25, borderRadius: '999px',
                        fontSize: '10px', fontWeight: 600, letterSpacing: '.03em',
                        display: 'flex', alignItems: 'center',
                        bgcolor: isDark ? s2 : lt.bg,
                        border: `1px solid ${isDark ? dk.border : 'transparent'}`,
                        color: isDark ? dk.color : lt.color,
                      }}
                    >
                      {db.name}
                    </Box>
                  );
                })}
              </Box>

              {/* Converge lines */}
              <Box sx={{ height: 24 }}>
                <svg width="100%" height="24" viewBox="0 0 480 24" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <line x1="48"  y1="0" x2="240" y2="24" stroke={isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'} strokeWidth="1"/>
                  <line x1="134" y1="0" x2="240" y2="24" stroke={isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'} strokeWidth="1"/>
                  <line x1="240" y1="0" x2="240" y2="24" stroke={isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'} strokeWidth="1"/>
                  <line x1="346" y1="0" x2="240" y2="24" stroke={isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'} strokeWidth="1"/>
                  <line x1="432" y1="0" x2="240" y2="24" stroke={isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'} strokeWidth="1"/>
                </svg>
              </Box>

              {/* KubeBlocks core card */}
              <Box
                sx={{
                  borderRadius: '12px',
                  border: `1px solid rgba(91,127,255,.3)`,
                  background: isDark
                    ? 'linear-gradient(160deg, rgba(91,127,255,.08) 0%, rgba(91,127,255,.03) 100%)'
                    : 'linear-gradient(160deg, rgba(59,91,219,.06) 0%, rgba(59,91,219,.02) 100%)',
                  px: 2.5, pt: 2.25, pb: 2,
                  textAlign: 'center', position: 'relative', overflow: 'hidden',
                  '&::before': {
                    content: '""', position: 'absolute',
                    top: 0, left: '15%', right: '15%', height: '1px',
                    background: `linear-gradient(90deg, transparent, rgba(91,127,255,.6), transparent)`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.125, mb: 0.625 }}>
                  <Box
                    sx={{
                      width: 28, height: 28, borderRadius: '8px',
                      bgcolor: `rgba(91,127,255,.15)`, border: `1px solid rgba(91,127,255,.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="rgba(91,127,255,.9)"/>
                      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="rgba(91,127,255,.5)"/>
                      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="rgba(91,127,255,.5)"/>
                      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="rgba(91,127,255,.9)"/>
                    </svg>
                  </Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', color: isDark ? '#fff' : 'text.primary' }}>
                    KubeBlocks
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '10px', color: `rgba(91,127,255,.7)`, letterSpacing: '.08em', textTransform: 'uppercase', mb: 1.5 }}>
                  Unified API · Single Control Plane
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.625, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['35+ Engines', 'Unified API', 'Kubernetes Native', 'Open Source'].map((tag) => (
                    <Box
                      key={tag}
                      component="span"
                      sx={{
                        fontSize: '9.5px', fontWeight: 500, px: 1.125, py: '2.5px',
                        borderRadius: '999px', border: `1px solid rgba(91,127,255,.2)`,
                        color: `rgba(91,127,255,.7)`, letterSpacing: '.03em',
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Expand arrows */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', px: '60px', height: 20, alignItems: 'flex-start' }}>
                {[0,1,2].map((i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: '1px', height: '13px', background: `linear-gradient(to bottom, ${greenDot}, transparent)` }} />
                    <Box sx={{ borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: `4px solid ${greenDot}` }} />
                  </Box>
                ))}
              </Box>

              {/* Cap cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0.75, pb: 2 }}>
                {capCards.map((cap) => (
                  <Box
                    key={cap.title}
                    sx={{
                      borderRadius: '10px', p: '12px 11px',
                      border: `1px solid ${line}`, bgcolor: s2,
                      transition: 'border-color .2s',
                      '&:hover': { borderColor: line2 },
                    }}
                  >
                    <Typography sx={{ fontSize: '10.5px', fontWeight: 600, color: t2, mb: 1, letterSpacing: '.01em' }}>
                      {cap.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {cap.items.map((item) => (
                        <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: greenDot, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '10px', color: t3 }}>{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* After stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: `1px solid ${line}` }}>
              {[
                { n: '1', l: 'Operator\nto install' },
                { n: '3', l: 'Concerns\nto manage' },
                { n: '0', l: 'Extra complexity\nwhen scaling' },
              ].map((s, i) => (
                <Box key={i} sx={{ py: 2, px: 1.25, textAlign: 'center', borderRight: i < 2 ? `1px solid ${line}` : 'none' }}>
                  <Typography sx={{ fontSize: '36px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', mb: 0.625, color: greenStat }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: t3, lineHeight: 1.4, fontWeight: 500, whiteSpace: 'pre-line' }}>
                    {s.l}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
