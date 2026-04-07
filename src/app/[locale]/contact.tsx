'use client';
import {
  alpha,
  Box,
  Button,
  Container,
  darken,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

export default function Contact() {
  const theme = useTheme();
  const background = theme.palette.primary.main;
  const color = '#FFF';
  const colorSecondary = alpha(color, 0.8);

  return (
    <Box
      sx={{
        backgroundImage: `url("/site/home-rectangles.svg")`,
        backgroundColor: theme.palette.mode.includes('dark')
          ? darken(background, 0.3)
          : background,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        paddingBlock: 6,
      }}
    >
      <Container>
        <Box>
          <Stack spacing={4} alignItems="center">
            <Stack flex={1}>
              <Typography
                textAlign="center"
                variant="h4"
                sx={{ color }}
                gutterBottom
              >
                Get started with KubeBlocks, with risk-free trial and migration
                support.
              </Typography>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{ width: '100%' }}
                justifyContent="center"
              >
                <Typography sx={{ color: colorSecondary }}>MySQL</Typography>
                <Typography sx={{ color: colorSecondary }}>
                  PostgreSQL
                </Typography>
                <Typography sx={{ color: colorSecondary }}>Redis</Typography>
                <Typography sx={{ color: colorSecondary }}>Mongo</Typography>
                <Typography sx={{ color: colorSecondary }}>...</Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              size="large"
              color="warning"
              href="https://kubeblocks.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: 1,
                borderColor: '#FFF',
                paddingInline: 4,
                borderRadius: 100,
                background: 'none',
                color: '#FFF',
                boxShadow: 'none',
                fontSize: '1.1em',
              }}
            >
              Start Now, at No Cost!
            </Button>
            <Stack
              direction="row"
              spacing={3}
              flexWrap="wrap"
              justifyContent="center"
              sx={{ fontSize: '0.82rem', color: colorSecondary }}
            >
              {['Open Source', '35+ Engines', 'Production-grade HA', 'Active Community'].map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box component="span" sx={{ color: '#FFF', fontWeight: 700 }}>✓</Box>
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
