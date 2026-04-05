'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

type DbKey = 'mysql' | 'pg' | 'redis' | 'mongo' | 'mssql';

const databases: { name: string; key: DbKey }[] = [
  { name: 'MySQL',      key: 'mysql' },
  { name: 'PostgreSQL', key: 'pg' },
  { name: 'Redis',      key: 'redis' },
  { name: 'MongoDB',    key: 'mongo' },
  { name: 'SQL Server', key: 'mssql' },
];

const DB_DARK: Record<DbKey, { bg: string; border: string; color: string }> = {
  mysql: { bg: 'rgba(251,146,60,.15)',  border: 'rgba(251,146,60,.35)',  color: '#FDBA74' },
  pg:    { bg: 'rgba(96,165,250,.12)',  border: 'rgba(96,165,250,.35)',  color: '#93C5FD' },
  redis: { bg: 'rgba(252,165,165,.12)', border: 'rgba(252,165,165,.35)', color: '#FCA5A5' },
  mongo: { bg: 'rgba(134,239,172,.1)',  border: 'rgba(134,239,172,.3)',  color: '#86EFAC' },
  mssql: { bg: 'rgba(203,213,225,.08)', border: 'rgba(203,213,225,.25)', color: '#CBD5E1' },
};

const DB_LIGHT: Record<DbKey, { bg: string; color: string }> = {
  mysql: { bg: '#EA580C', color: '#fff' },
  pg:    { bg: '#2563EB', color: '#fff' },
  redis: { bg: '#DC2626', color: '#fff' },
  mongo: { bg: '#16A34A', color: '#fff' },
  mssql: { bg: '#475569', color: '#fff' },
};

const capCards = [
  {
    title: 'Backup & Recovery',
    items: ['Instant Backup', 'Point-in-Time Recovery', 'Delete Protection'],
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <ellipse cx="6.5" cy="4" rx="4" ry="2" stroke="#34D399" strokeWidth="1.1"/>
        <path d="M2.5 4v5c0 1.1 1.8 2 4 2s4-.9 4-2V4" stroke="#34D399" strokeWidth="1.1"/>
        <path d="M2.5 6.5c0 1.1 1.8 2 4 2s4-.9 4-2" stroke="#34D399" strokeWidth="1.1"/>
      </svg>
    ),
    lightIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <ellipse cx="6.5" cy="4" rx="4" ry="2" stroke="#16A34A" strokeWidth="1.1"/>
        <path d="M2.5 4v5c0 1.1 1.8 2 4 2s4-.9 4-2V4" stroke="#16A34A" strokeWidth="1.1"/>
        <path d="M2.5 6.5c0 1.1 1.8 2 4 2s4-.9 4-2" stroke="#16A34A" strokeWidth="1.1"/>
      </svg>
    ),
  },
  {
    title: 'Observability',
    items: ['Metrics & Logs', 'Slow SQL Analysis', 'TLS Security'],
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2 10L5 6l2.5 2.5L9.5 5l1.5 2" stroke="#34D399" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="#34D399" strokeWidth="1.1"/>
      </svg>
    ),
    lightIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2 10L5 6l2.5 2.5L9.5 5l1.5 2" stroke="#16A34A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="#16A34A" strokeWidth="1.1"/>
      </svg>
    ),
  },
  {
    title: 'Lifecycle',
    items: ['Rolling Upgrade', 'Auto Failover', 'HA Architecture'],
    icon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1.5v2M6.5 9.5v2M1.5 6.5h2M9.5 6.5h2" stroke="#34D399" strokeWidth="1.1" strokeLinecap="round"/>
        <circle cx="6.5" cy="6.5" r="2.5" stroke="#34D399" strokeWidth="1.1"/>
      </svg>
    ),
    lightIcon: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1.5v2M6.5 9.5v2M1.5 6.5h2M9.5 6.5h2" stroke="#16A34A" strokeWidth="1.1" strokeLinecap="round"/>
        <circle cx="6.5" cy="6.5" r="2.5" stroke="#16A34A" strokeWidth="1.1"/>
      </svg>
    ),
  },
];

export default function OperatorSprawl() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Theme-adaptive tokens
  const panelBg       = isDark ? '#0C1426' : '#fff';
  const divider       = isDark ? 'rgba(255,255,255,.05)' : '#E2E8F0';
  const redMain       = isDark ? '#F87171' : '#DC2626';
  const redBorder     = isDark ? 'rgba(248,113,113,.25)' : '#FECACA';
  const redHeaderBg   = isDark ? 'rgba(248,113,113,.08)' : '#FEF2F2';
  const redStat       = isDark ? '#F87171' : '#DC2626';
  const redStatGlow   = isDark ? '0 0 24px rgba(248,113,113,.4)' : 'none';
  const blueMain      = isDark ? '#60A5FA' : '#2563EB';
  const blueBorder    = isDark ? 'rgba(96,165,250,.3)' : '#BFDBFE';
  const blueHeaderBg  = isDark ? 'rgba(59,130,246,.1)' : '#EFF6FF';
  const greenMain     = isDark ? '#34D399' : '#16A34A';
  const greenStat     = isDark ? '#34D399' : '#16A34A';
  const greenStatGlow = isDark ? '0 0 24px rgba(52,211,153,.4)' : 'none';
  const capBg         = isDark ? 'rgba(52,211,153,.05)' : '#F0FDF4';
  const capBorder     = isDark ? 'rgba(52,211,153,.15)' : '#BBF7D0';
  const capTitleColor = isDark ? '#34D399' : '#15803D';
  const capItemColor  = isDark ? '#94A3B8' : '#64748B';
  const opBlockBg     = isDark ? 'rgba(255,255,255,.03)' : '#F1F5F9';
  const opBlockBorder = isDark ? 'rgba(255,255,255,.07)' : '#E2E8F0';
  const eyebrowBg     = isDark ? 'rgba(59,130,246,.08)' : '#EFF6FF';
  const eyebrowBorder = isDark ? 'rgba(59,130,246,.2)' : '#BFDBFE';

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* ── Section Header ── */}
        <Box textAlign="center" mb={6}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: blueMain,
              bgcolor: eyebrowBg, border: `1px solid ${eyebrowBorder}`,
              px: 2.5, py: 0.75, borderRadius: '999px', mb: 3.5,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6, height: 6, borderRadius: '50%',
                bgcolor: blueMain, display: 'inline-block',
                boxShadow: isDark ? '0 0 8px rgba(59,130,246,.6)' : 'none',
                animation: 'os-pulse 2.5s ease-in-out infinite',
                '@keyframes os-pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(0.7)' },
                },
              }}
            />
            Why KubeBlocks
          </Box>

          <Typography
            variant="h4" fontWeight={900}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.15, mb: 2 }}
          >
            Stop Managing{' '}
            <Box
              component="span"
              sx={{
                color: redMain,
                bgcolor: isDark ? 'transparent' : 'rgba(220,38,38,.06)',
                px: isDark ? 0 : 0.75, borderRadius: 1,
              }}
            >
              N&nbsp;Operators
            </Box>
            {' '}for N Databases
          </Typography>

          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            Every database you add shouldn&apos;t multiply your operational burden.
            KubeBlocks replaces operator sprawl with one unified control plane.
          </Typography>
        </Box>

        {/* ── Compare Grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 72px 1fr' },
            alignItems: 'stretch',
          }}
        >
          {/* ════ BEFORE PANEL ════ */}
          <Box
            sx={{
              borderRadius: '24px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              border: `1px solid ${redBorder}`, bgcolor: panelBg,
              boxShadow: isDark
                ? '0 4px 24px rgba(248,113,113,.1)'
                : '0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06), 0 12px 40px rgba(0,0,0,.04)',
              transition: 'transform .3s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            {/* Before header */}
            <Box
              sx={{
                px: 3.5, pt: 3, pb: 2.5,
                bgcolor: redHeaderBg, borderBottom: `1px solid ${divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: '12px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: isDark ? 'rgba(248,113,113,.12)' : '#FEE2E2',
                    border: `1px solid ${isDark ? 'rgba(248,113,113,.25)' : '#FECACA'}`,
                    boxShadow: isDark ? '0 0 16px rgba(248,113,113,.15)' : 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2.5L2.5 17h15L10 2.5z" stroke={redMain} strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 8v4" stroke={redMain} strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="10" cy="14.5" r=".75" fill={redMain}/>
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: redMain, mb: 0.25 }}>
                    Without KubeBlocks
                  </Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: isDark ? '#FCA5A5' : '#B91C1C' }}>
                    Operator Sprawl
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '12.5px', color: 'text.disabled', pl: '52px', lineHeight: 1.5 }}>
                N databases = N operators = N independent concerns
              </Typography>
            </Box>

            {/* DB rows */}
            <Box
              sx={{
                px: 3, py: 2.5,
                display: 'flex', flexDirection: 'column', gap: 1.25,
                flex: 1, justifyContent: 'space-evenly',
              }}
            >
              {databases.map((db) => {
                const dkStyle = DB_DARK[db.key];
                const ltStyle = DB_LIGHT[db.key];
                return (
                  <Box
                    key={db.key}
                    sx={{
                      display: 'grid', gridTemplateColumns: '100px auto 1fr',
                      alignItems: 'center', gap: 1.25,
                      '&:hover .op-block': {
                        bgcolor: isDark ? 'rgba(255,255,255,.05)' : '#fff',
                        borderColor: isDark ? 'rgba(255,255,255,.12)' : '#CBD5E1',
                      },
                    }}
                  >
                    {/* DB pill */}
                    <Box
                      sx={{
                        height: 34, borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em',
                        ...(isDark
                          ? { bgcolor: dkStyle.bg, border: `1px solid ${dkStyle.border}`, color: dkStyle.color }
                          : { bgcolor: ltStyle.bg, color: ltStyle.color }),
                      }}
                    >
                      {db.name}
                    </Box>
                    {/* Arrow */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled' }}>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                    {/* Operator block */}
                    <Box
                      className="op-block"
                      sx={{
                        bgcolor: opBlockBg, border: `1px solid ${opBlockBorder}`,
                        borderRadius: '10px', px: 1.5, py: 1,
                        display: 'flex', flexDirection: 'column', gap: 0.625,
                        transition: 'border-color .2s, background .2s',
                      }}
                    >
                      <Typography sx={{ fontSize: '11.5px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,.75)' : 'text.primary' }}>
                        {db.name} Operator
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Box component="span" sx={{ fontSize: '9px', fontWeight: 700, px: 0.875, py: 0.25, borderRadius: '4px', border: '1px solid', letterSpacing: '0.04em', color: isDark ? '#C4B5FD' : '#6D28D9', borderColor: isDark ? 'rgba(196,181,253,.2)' : '#DDD6FE', bgcolor: isDark ? 'rgba(196,181,253,.08)' : '#F5F3FF' }}>Backup</Box>
                        <Box component="span" sx={{ fontSize: '9px', fontWeight: 700, px: 0.875, py: 0.25, borderRadius: '4px', border: '1px solid', letterSpacing: '0.04em', color: isDark ? '#7DD3FC' : '#0369A1', borderColor: isDark ? 'rgba(125,211,252,.2)' : '#BAE6FD', bgcolor: isDark ? 'rgba(125,211,252,.08)' : '#F0F9FF' }}>Monitor</Box>
                        <Box component="span" sx={{ fontSize: '9px', fontWeight: 700, px: 0.875, py: 0.25, borderRadius: '4px', border: '1px solid', letterSpacing: '0.04em', color: isDark ? '#FDE68A' : '#92400E', borderColor: isDark ? 'rgba(253,230,138,.2)' : '#FDE68A', bgcolor: isDark ? 'rgba(253,230,138,.08)' : '#FFFBEB' }}>Upgrade</Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Before stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${divider}` }}>
              {[
                { n: '5',  label: 'Operators\nto install' },
                { n: '15', label: 'Concerns\nto manage' },
                { n: '∞',  label: 'Complexity\nas you scale' },
              ].map((stat, i) => (
                <Box key={i} sx={{ py: 2.5, px: 1.5, textAlign: 'center', borderRight: i < 2 ? `1px solid ${divider}` : 'none' }}>
                  <Typography sx={{ fontSize: '38px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em', mb: 0.75, color: redStat, textShadow: redStatGlow }}>
                    {stat.n}
                  </Typography>
                  <Typography sx={{ fontSize: '10.5px', color: 'text.disabled', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ════ VS COLUMN ════ */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 1.5,
            }}
          >
            <Box sx={{ flex: 1, width: '1px', minHeight: 48, background: `linear-gradient(to bottom, transparent, ${divider} 30%, ${divider} 70%, transparent)` }} />
            <Box
              sx={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${isDark ? 'rgba(255,255,255,.1)' : '#CBD5E1'}`,
                bgcolor: isDark ? '#101C35' : 'background.paper',
                boxShadow: isDark ? '0 2px 10px rgba(0,0,0,.25)' : '0 1px 4px rgba(0,0,0,.08)',
              }}
            >
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: 'text.secondary', letterSpacing: '0.08em' }}>
                VS
              </Typography>
            </Box>
            <Box sx={{ flex: 1, width: '1px', minHeight: 48, background: `linear-gradient(to bottom, transparent, ${divider} 30%, ${divider} 70%, transparent)` }} />
          </Box>

          {/* ════ AFTER PANEL ════ */}
          <Box
            sx={{
              borderRadius: '24px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              border: `1px solid ${blueBorder}`, bgcolor: panelBg,
              boxShadow: isDark
                ? '0 4px 24px rgba(59,130,246,.1)'
                : '0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06), 0 12px 40px rgba(0,0,0,.04)',
              transition: 'transform .3s ease',
              '&:hover': { transform: 'translateY(-3px)' },
              mt: { xs: 2, md: 0 },
            }}
          >
            {/* After header */}
            <Box
              sx={{
                px: 3.5, pt: 3, pb: 2.5,
                bgcolor: blueHeaderBg, borderBottom: `1px solid ${divider}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: '12px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: isDark ? 'rgba(59,130,246,.12)' : '#DBEAFE',
                    border: `1px solid ${isDark ? 'rgba(59,130,246,.3)' : '#BFDBFE'}`,
                    boxShadow: isDark ? '0 0 16px rgba(59,130,246,.2)' : 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke={greenMain} strokeWidth="1.5"/>
                    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={greenMain} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: blueMain, mb: 0.25 }}>
                    With KubeBlocks
                  </Typography>
                  <Typography sx={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: isDark ? '#fff' : '#1D4ED8' }}>
                    One Control Plane
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '12.5px', color: 'text.disabled', pl: '52px', lineHeight: 1.5 }}>
                Any database. One operator. Zero sprawl.
              </Typography>
            </Box>

            {/* After body */}
            <Box
              sx={{
                px: 2.5, pt: 2, pb: 0,
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
              }}
            >
              {/* DB chips */}
              <Box sx={{ display: 'flex', gap: 0.875, justifyContent: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                {databases.map((db) => {
                  const dkStyle = DB_DARK[db.key];
                  const ltStyle = DB_LIGHT[db.key];
                  return (
                    <Box
                      key={db.key}
                      sx={{
                        height: 28, px: 1.5, borderRadius: '999px',
                        fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.04em',
                        display: 'flex', alignItems: 'center',
                        ...(isDark
                          ? { bgcolor: dkStyle.bg, border: `1px solid ${dkStyle.border}`, color: dkStyle.color }
                          : { bgcolor: ltStyle.bg, color: ltStyle.color }),
                      }}
                    >
                      {db.name}
                    </Box>
                  );
                })}
              </Box>

              {/* Funnel SVG */}
              <Box sx={{ height: 32 }}>
                <svg width="100%" height="32" viewBox="0 0 520 40" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <defs>
                    <marker id="os-dot" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <circle cx="3" cy="3" r="2" fill="#60A5FA" opacity=".9"/>
                    </marker>
                  </defs>
                  <line x1="52"  y1="2" x2="260" y2="36" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" opacity=".6" markerEnd="url(#os-dot)"/>
                  <line x1="143" y1="2" x2="260" y2="36" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" opacity=".6" markerEnd="url(#os-dot)"/>
                  <line x1="260" y1="2" x2="260" y2="36" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" opacity=".6" markerEnd="url(#os-dot)"/>
                  <line x1="377" y1="2" x2="260" y2="36" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" opacity=".6" markerEnd="url(#os-dot)"/>
                  <line x1="468" y1="2" x2="260" y2="36" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="4,3" opacity=".6" markerEnd="url(#os-dot)"/>
                </svg>
              </Box>

              {/* KubeBlocks core card */}
              <Box sx={{ position: 'relative' }}>
                {isDark && (
                  <Box sx={{
                    position: 'absolute', inset: '-16px', borderRadius: '28px', pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,.28) 0%, transparent 65%)',
                    filter: 'blur(16px)',
                  }} />
                )}
                <Box
                  sx={{
                    position: 'relative', borderRadius: '18px', p: 2.5, textAlign: 'center', overflow: 'hidden',
                    background: isDark
                      ? `radial-gradient(ellipse at 30% 20%, rgba(96,165,250,.2) 0%, transparent 50%),
                         radial-gradient(ellipse at 80% 80%, rgba(52,211,153,.1) 0%, transparent 50%),
                         linear-gradient(160deg, #0F2460 0%, #1338A0 40%, #1A4FC4 70%, #1D4ED8 100%)`
                      : 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 40%, #2563EB 70%, #3B82F6 100%)',
                    border: '1px solid rgba(96,165,250,.35)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,.05) inset, 0 8px 32px rgba(0,0,0,.3), 0 24px 64px rgba(37,99,235,.25)',
                    transition: 'box-shadow .25s ease',
                    '&:hover': {
                      boxShadow: '0 0 0 1px rgba(255,255,255,.08) inset, 0 12px 40px rgba(0,0,0,.4), 0 32px 80px rgba(37,99,235,.35)',
                    },
                    '&::after': {
                      content: '""', position: 'absolute', top: 0, left: '10%', right: '10%',
                      height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.375, mb: 1, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2"  y="2"  width="7" height="7" rx="2" fill="rgba(255,255,255,.85)"/>
                        <rect x="11" y="2"  width="7" height="7" rx="2" fill="rgba(255,255,255,.55)"/>
                        <rect x="2"  y="11" width="7" height="7" rx="2" fill="rgba(255,255,255,.55)"/>
                        <rect x="11" y="11" width="7" height="7" rx="2" fill="rgba(255,255,255,.85)"/>
                      </svg>
                    </Box>
                    <Typography sx={{ fontSize: '30px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', textShadow: '0 2px 20px rgba(96,165,250,.4)' }}>
                      KubeBlocks
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '11px', color: 'rgba(147,197,253,.75)', letterSpacing: '0.06em', mb: 1.75, position: 'relative', zIndex: 1, textTransform: 'uppercase' }}>
                    Unified API · Single Control Plane
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    {['35+ Engines', 'One CLI', 'Kubernetes Native', 'Open Source'].map((pill) => (
                      <Box key={pill} component="span" sx={{ fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,.7)', bgcolor: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', px: 1.25, py: 0.375, borderRadius: '999px', letterSpacing: '0.05em' }}>
                        {pill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Expand arrows */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', px: 6, height: 24, alignItems: 'flex-start', pt: 0.375 }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: '1px', height: '16px', background: `linear-gradient(to bottom, ${greenMain}, transparent)` }} />
                    <Box sx={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `5px solid ${greenMain}`, opacity: 0.7 }} />
                  </Box>
                ))}
              </Box>

              {/* Cap cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, pb: 2.5 }}>
                {capCards.map((cap) => (
                  <Box
                    key={cap.title}
                    sx={{
                      borderRadius: '14px', p: '14px 13px',
                      bgcolor: capBg, border: `1px solid ${capBorder}`,
                      position: 'relative', overflow: 'hidden',
                      transition: 'border-color .2s, box-shadow .2s',
                      '&::before': {
                        content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                        background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(52,211,153,.4)' : 'rgba(22,163,74,.3)'}, transparent)`,
                      },
                      '&:hover': {
                        borderColor: isDark ? 'rgba(52,211,153,.35)' : '#86EFAC',
                        boxShadow: `0 4px 16px ${isDark ? 'rgba(52,211,153,.1)' : 'rgba(22,163,74,.08)'}`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875, mb: 1.25 }}>
                      <Box sx={{ width: 24, height: 24, bgcolor: isDark ? 'rgba(52,211,153,.1)' : '#DCFCE7', border: `1px solid ${isDark ? 'rgba(52,211,153,.2)' : '#BBF7D0'}`, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {isDark ? cap.icon : cap.lightIcon}
                      </Box>
                      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: capTitleColor, letterSpacing: '0.02em' }}>
                        {cap.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.625 }}>
                      {cap.items.map((item) => (
                        <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.875 }}>
                          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: greenMain, flexShrink: 0, boxShadow: isDark ? '0 0 4px rgba(52,211,153,.4)' : 'none' }} />
                          <Typography sx={{ fontSize: '10.5px', color: capItemColor }}>{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* After stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${divider}` }}>
              {[
                { n: '1', label: 'Operator\nto install' },
                { n: '3', label: 'Concerns\nto manage' },
                { n: '0', label: 'Extra complexity\nwhen scaling' },
              ].map((stat, i) => (
                <Box key={i} sx={{ py: 2.5, px: 1.5, textAlign: 'center', borderRight: i < 2 ? `1px solid ${divider}` : 'none' }}>
                  <Typography sx={{ fontSize: '38px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em', mb: 0.75, color: greenStat, textShadow: greenStatGlow }}>
                    {stat.n}
                  </Typography>
                  <Typography sx={{ fontSize: '10.5px', color: 'text.disabled', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                    {stat.label}
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
