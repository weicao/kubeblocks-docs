import { Box, Container, Typography } from '@mui/material';

async function getGithubStars(): Promise<string> {
  try {
    const res = await fetch('https://api.github.com/repos/apecloud/kubeblocks', {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    });
    const data = await res.json();
    const n = data.stargazers_count as number;
    if (!n) return '3k+';
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
    return String(n);
  } catch {
    return '3k+';
  }
}

export default async function GithubStats() {
  const stars = await getGithubStars();

  const stats = [
    { value: '35+',   label: 'Database Engines' },
    { value: '20K+',  label: 'Managed Instances' },
    { value: '50+',   label: 'Enterprise Customers' },
    { value: stars,   label: 'GitHub Stars' },
  ];

  return (
    <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 4, md: 0 },
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={s.label}
              sx={{
                textAlign: 'center',
                borderRight: { md: i < stats.length - 1 ? '1px solid' : 'none' },
                borderColor: { md: 'divider' },
                px: { md: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  mb: 0.75,
                  color: 'primary.main',
                }}
              >
                {s.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'text.disabled',
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
