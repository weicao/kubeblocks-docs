import { Link } from '@/components/Link';
import { ForkRight, LocalOffer, Star } from '@mui/icons-material';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';

async function getGithubStats() {
  try {
    const [repoRes, releaseRes] = await Promise.all([
      fetch('https://api.github.com/repos/apecloud/kubeblocks', {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch('https://api.github.com/repos/apecloud/kubeblocks/releases/latest', {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);
    const repo = await repoRes.json();
    const release = await releaseRes.json();
    return {
      stars: repo.stargazers_count as number,
      forks: repo.forks_count as number,
      version: release.tag_name as string,
    };
  } catch {
    return { stars: 0, forks: 0, version: '' };
  }
}

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default async function GithubStats() {
  const { stars, forks, version } = await getGithubStats();

  const items = [
    ...(stars > 0
      ? [{ icon: <Star fontSize="small" sx={{ color: '#f5a623' }} />, label: `${fmt(stars)} Stars` }]
      : []),
    ...(forks > 0
      ? [{ icon: <ForkRight fontSize="small" sx={{ color: 'text.secondary' }} />, label: `${fmt(forks)} Forks` }]
      : []),
    ...(version
      ? [{ icon: <LocalOffer fontSize="small" sx={{ color: 'text.secondary' }} />, label: version }]
      : []),
    { icon: null, label: '35+ Databases' },
  ];

  if (items.length === 0) return null;

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container>
        <Stack
          component={Link}
          href="https://github.com/apecloud/kubeblocks"
          target="_blank"
          rel="noopener noreferrer"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={3}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ py: 1.5, gap: 1, textDecoration: 'none', color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          {items.map((item, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={0.5}>
              {item.icon}
              <Typography variant="body2" fontWeight={500}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
