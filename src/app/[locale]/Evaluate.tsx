'use client';

import { Box, Container, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

export const Evaluate = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const isInChina = useCallback(() => {
    try {
      const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZoneName === 'Asia/Shanghai' || timeZoneName === 'Asia/Urumqi';
    } catch (_err) {
      return -new Date().getTimezoneOffset() / 60 === 8;
    }
  }, []);

  const playerUrl = useMemo(() => {
    return isInChina()
      ? 'https://player.bilibili.com/player.html?bvid=BV1ew41137Sn'
      : 'https://www.youtube.com/embed/KNwpG51Whzg?si=wCQ-31H3OiI7aMtZ';
  }, [isInChina]);

  // Tokens
  const t1       = isDark ? '#f0f6fc'                  : '#0F172A';
  const t2       = isDark ? '#8b949e'                  : '#475569';
  const t3       = isDark ? 'rgba(255,255,255,.25)'    : '#94A3B8';
  const cardBg     = theme.palette.background.paper;
  const cardBorder = theme.palette.divider;
  const cardHover  = theme.palette.action.hover;
  const quoteMark  = isDark ? 'rgba(91,127,255,.08)'   : 'rgba(91,127,255,.06)';

  const quoteCardSx = {
    position: 'relative',
    bgcolor: cardBg,
    border: `1px solid ${cardBorder}`,
    borderRadius: '14px',
    p: '32px',
    overflow: 'hidden',
    transition: 'border-color .2s',
    '&:hover': { borderColor: 'text.disabled', bgcolor: cardHover },
    '&::before': {
      content: '"\\201C"',
      position: 'absolute',
      top: '-10px',
      right: '20px',
      fontSize: '120px',
      color: quoteMark,
      fontFamily: 'Georgia, serif',
      lineHeight: 1,
      pointerEvents: 'none',
      userSelect: 'none',
    },
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: t3, '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: t3, display: 'block' } }}>Community</Box>
          <Typography
            variant="h4" fontWeight={700}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.15, color: t1 }}
          >
            Trusted by engineers
            <Box component="span" sx={{ color: t2, fontWeight: 300 }}> in production</Box>
          </Typography>
        </Box>

        {/* Viktor Farcic */}
        <Grid container spacing={3} mb={3} alignItems="stretch">
          {/* Quote */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ ...quoteCardSx, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontSize: '0.95rem', color: t2, lineHeight: 1.8,
                  fontStyle: 'italic', position: 'relative', zIndex: 1, flex: 1,
                }}
              >
                &ldquo;Whether or not to run a database on Kubernetes is a topic that is often discussed. From my perspective, if you&apos;re already using containers and don&apos;t want to use a fully managed database service, the answer is yes… KubeBlocks is a very unique project that focuses on running multiple databases in Kubernetes. It doesn&apos;t necessarily seek to be the best solution for a particular database, but rather to be the best solution for a wide range of databases. It can be a great fit for Kubernetes users who want to migrate their databases to run on Kubernetes without wanting to lose control.&rdquo;
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mt: '24px' }}>
                <Image
                  src="/site/viktor.png"
                  alt="Viktor Farcic"
                  width={44}
                  height={44}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                />
                <Box>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: t1 }}>
                    Viktor Farcic
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: t3, mt: '1px' }}>
                    Developer Evangelist @Upbound · Google Developer Expert · CDF Ambassador
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Video */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%', minHeight: 280,
                border: `1px solid ${cardBorder}`,
                borderRadius: '14px', overflow: 'hidden',
              }}
            >
              <iframe
                src={playerUrl}
                title="KubeBlocks introduction video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%', minHeight: 280, border: 'none', display: 'block' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Sergy Pronin */}
        <Grid container spacing={3} alignItems="stretch">
          {/* Radar chart */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%', minHeight: 260,
                border: `1px solid ${cardBorder}`,
                borderRadius: '14px', overflow: 'hidden',
                bgcolor: cardBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                p: 3,
              }}
            >
              <Image
                alt="KubeBlocks radar"
                src={`/site/kb_radar_${theme.palette.mode}.png`}
                width={400}
                height={240}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>

          {/* Quote */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ ...quoteCardSx, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontSize: '0.95rem', color: t2, lineHeight: 1.8,
                  fontStyle: 'italic', position: 'relative', zIndex: 1, flex: 1,
                }}
              >
                &ldquo;The minor version of KubeBlocks has a very short release cycle and is very actively developed. I strongly believe that KubeBlocks&apos; Addon concept and documentation on how to create Addon is what makes KubeBlocks have the most contributors. KubeBlocks also provides support for AI, such as Xinference and MilvusDB, which are part of a modern large model technology stack.&rdquo;
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mt: '24px' }}>
                <Image
                  src="/site/sergy_pronin.png"
                  alt="Sergy Pronin"
                  width={44}
                  height={44}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                />
                <Box>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: t1 }}>
                    Sergy Pronin
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: t3, mt: '1px' }}>
                    Product Owner @Percona · Cloud-Native Database Solutions
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};
