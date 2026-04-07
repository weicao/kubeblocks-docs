'use client';

import { Link } from '@/components/Link';
import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

// ── Banner ───────────────────────────────────────────────────────────────────
export default function Banner({ version, stars }: { version?: string; stars?: string }) {
  const theme = useTheme();
  const isDark = theme.palette.mode.includes('dark');

  const bgDark = {
    backgroundImage: `url("/site/home-rectangles.svg")`,
    backgroundColor: '#070707',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    paddingBlock: 14,
  };
  const bgLight = {
    backgroundImage: [
      'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '72px 72px',
    backgroundColor: '#f9fafb',
    paddingBlock: 14,
  };

  const textColor = isDark ? '#FFF' : theme.palette.text.primary;
  const textSecondaryColor = isDark ? alpha('#FFF', 0.8) : theme.palette.text.secondary;

  return (
    <Box sx={isDark ? bgDark : bgLight}>
      <Container>
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
          {version && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: 100,
                border: '1px solid',
                borderColor: 'divider',
                fontSize: 12,
                fontWeight: 500,
                color: 'text.disabled',
                mb: 3,
              }}
            >
              {version} · Production Ready · Open Source · CNCF Landscape
            </Box>
          )}

          <Typography
            variant="h2"
            mb={3}
            sx={{ fontWeight: 'bold', color: textColor }}
          >
            One Operator for{' '}
            <Typography variant="h2" sx={{ fontWeight: 'bold' }} component="span" color="primary">
              Every Database
            </Typography>
            {' '}
            <Box component="span" sx={{ opacity: 0.45 }}>on Kubernetes</Box>
          </Typography>

          <Typography mb={4} sx={{ color: textSecondaryColor, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
            Stop juggling multiple operators. KubeBlocks gives your team a single, production-grade control plane to run and manage any database—MySQL, PostgreSQL, Kafka, MongoDB, and 30+ more—with one unified API.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            mb={6}
          >
            <Button
              variant="contained"
              component={Link}
              href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
              size="large"
              target="_blank"
              sx={{ paddingInline: 4, paddingBlock: 1.5, fontWeight: 'bold' }}
            >
              Try Playground Free →
            </Button>
            <Button
              variant="outlined"
              href="https://kubeblocks.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={{ paddingInline: 4, paddingBlock: 1.5 }}
            >
              Talk to the Team
            </Button>
          </Stack>

          {/* Impact stats */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: { xs: 3, md: 0 },
              maxWidth: { xs: 560, md: 'none' },
              mx: 'auto',
            }}
          >
            {[
              { value: '35+',          label: 'DB Engines' },
              { value: '20K+',         label: 'Managed Instances' },
              { value: '50+',          label: 'Enterprise Customers' },
              { value: stars || '3k+', label: 'GitHub Stars' },
            ].map((s) => (
              <Box key={s.label} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, mb: 0.5, color: 'text.primary' }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: isDark ? 'rgba(255,255,255,0.35)' : 'text.disabled' }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
