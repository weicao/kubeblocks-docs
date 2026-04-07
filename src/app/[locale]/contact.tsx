'use client';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';

const checks = ['Open Source', '35+ Database Engines', 'Production-grade HA', 'Active Community'];

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: isDark ? '#09090b' : '#f8fafc',
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-160px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px', pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 30%, ${isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)'}, transparent 65%)`,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack alignItems="center" textAlign="center" sx={{ py: { xs: 8, md: 12 } }} spacing={0}>

          {/* Eyebrow */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 2, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>
            Get Started
          </Box>

          {/* Headline */}
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5, color: isDark ? '#fafafa' : 'text.primary' }}
          >
            Get Started with KubeBlocks,{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Risk-Free.</Box>
          </Typography>

          {/* Sub */}
          <Typography
            sx={{ fontSize: '1.05rem', color: isDark ? '#a1a1aa' : 'text.secondary', maxWidth: 520, lineHeight: 1.75, mb: 4 }}
          >
            Open source and production-ready. Enterprise customers get dedicated onboarding and migration support.
          </Typography>

          {/* Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={4}>
            <Button
              variant="contained"
              size="large"
              href="https://kubeblocks.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 700, px: 3.5, py: 1.5, fontSize: '0.95rem' }}
            >
              Talk to Expert →
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 500, px: 3.5, py: 1.5, fontSize: '0.95rem' }}
            >
              Try Playground
            </Button>
          </Stack>

          {/* Checklist */}
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, sm: 3 }}>
            {checks.map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.82rem', color: isDark ? '#a1a1aa' : 'text.secondary' }}>
                <Box component="span" sx={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>✓</Box>
                {item}
              </Box>
            ))}
          </Stack>

        </Stack>
      </Container>
    </Box>
  );
}
