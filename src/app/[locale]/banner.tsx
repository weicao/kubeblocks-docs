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

export default function Banner({ version }: { version?: string }) {
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
      'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
      'radial-gradient(ellipse 50% 90% at 18% 50%, rgba(99,131,255,0.18) 0%, transparent 70%)',
      'radial-gradient(ellipse 50% 90% at 82% 50%, rgba(160,99,255,0.18) 0%, transparent 70%)',
      'linear-gradient(135deg, #eef4ff 0%, #f5f0ff 100%)',
    ].join(', '),
    backgroundSize: '91px 91px, 91px 91px, auto, auto, auto',
    paddingBlock: 14,
  };

  const textColor = isDark ? '#FFF' : theme.palette.text.primary;
  const textSecondaryColor = isDark ? alpha('#FFF', 0.8) : theme.palette.text.secondary;

  return (
    <Box sx={isDark ? bgDark : bgLight}>
      <Container>
        <Box textAlign="center">
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              mb: 3, px: 2, py: 0.75, borderRadius: '999px',
              border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              fontSize: '12px', fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.5)' : 'text.secondary',
              letterSpacing: '.01em',
            }}
          >
            The only Kubernetes operator purpose-built for Database-as-a-Service
          </Box>
          <Typography
            variant="h2"
            mb={6}
            ml="auto"
            mr="auto"
            sx={{ fontWeight: 'bold', color: textColor, maxWidth: 1000 }}
          >
            The Unified &nbsp;
            <Typography
              variant="h2"
              sx={{ fontWeight: 'bold' }}
              component="span"
              color="primary"
            >
              Database Operator
            </Typography>
            &nbsp; for Kubernetes
          </Typography>
          <Typography mb={8} sx={{ color: textSecondaryColor, fontSize: 22 }}>
            Stop juggling multiple operators. KubeBlocks gives your team a single, production-grade control plane to run and manage any database—MySQL, PostgreSQL, Kafka, MongoDB, and 30+ more—with one unified API.
          </Typography>

          {version && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 0.625,
                borderRadius: 100,
                border: 1,
                borderColor: isDark ? 'rgba(99,131,255,0.3)' : 'rgba(99,131,255,0.25)',
                bgcolor: isDark ? 'rgba(99,131,255,0.08)' : 'rgba(99,131,255,0.06)',
                fontSize: 12,
                fontWeight: 600,
                color: isDark ? '#93a8f4' : '#5b7fff',
                mb: 3,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 6, height: 6, borderRadius: '50%',
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 6px currentColor',
                  flexShrink: 0,
                }}
              />
              {version} · Production Ready · Open Source · CNCF Landscape
            </Box>
          )}

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
            mt={8}
            mb={2}
          >
            <Button
              variant="contained"
              href="https://kubeblocks.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              sx={{
                paddingInline: 4,
                paddingBlock: 1.5,
                fontWeight: 'bold',
              }}
            >
              Get a Demo
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
              size="large"
              target="_blank"
              sx={{
                paddingInline: 4,
                paddingBlock: 1.5,
              }}
            >
              Try it Free
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
