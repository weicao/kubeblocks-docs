import { getStaticParams } from '@/locales/server';
import { DOCS_DIR, getMarkDownSideBar, getFirstMenuItem } from '@/utils/markdown';
import { toAbsoluteUrl } from '@/utils/site';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import fs from 'fs';
import type { Metadata } from 'next';
import path from 'path';
import { Link } from '@/components/Link';

type Params = { locale: string };

export async function generateStaticParams() {
  return getStaticParams();
}

const PAGE_TITLE = 'Documentation — KubeBlocks';
const PAGE_DESCRIPTION =
  'Official KubeBlocks documentation. Learn how to install and operate MySQL, PostgreSQL, MongoDB, Redis, Kafka, and 35+ databases on Kubernetes with a unified operator.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/docs' },
  openGraph: {
    url: '/docs',
    type: 'website',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'KubeBlocks' }],
  },
  twitter: {
    card: 'summary',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/logo.png'],
  },
};

type VersionInfo = {
  version: string;
  label: string;
  isLatest: boolean;
  isPreview: boolean;
  firstDocHref?: string;
};

async function getVersions(locale: string): Promise<VersionInfo[]> {
  const localeDir = path.join(DOCS_DIR, locale);
  const enDir = path.join(DOCS_DIR, 'en');
  const baseDir = fs.existsSync(localeDir) ? localeDir : enDir;
  if (!fs.existsSync(baseDir)) return [];

  const versions = fs
    .readdirSync(baseDir)
    .filter((v) => fs.statSync(path.join(baseDir, v)).isDirectory())
    .sort((a, b) => {
      // preview always last
      if (a === 'preview') return 1;
      if (b === 'preview') return -1;
      return b.localeCompare(a);
    });

  const result: VersionInfo[] = [];
  for (let i = 0; i < versions.length; i++) {
    const version = versions[i];
    const versionDir = path.join(baseDir, version);
    const isPreview = version === 'preview';
    const isLatest = !isPreview && i === 0;

    let label = version.replace(/^release-/, '').replace(/_/g, '.');
    if (isPreview) label = 'Preview (main)';

    let firstDocHref: string | undefined;
    const categories = fs
      .readdirSync(versionDir)
      .filter((c) => !c.startsWith('_'))
      .sort();
    for (const category of categories) {
      const menu = await getMarkDownSideBar(path.join(versionDir, category));
      const first = getFirstMenuItem(menu);
      if (first?.href) {
        firstDocHref = first.href;
        break;
      }
    }

    result.push({ version, label, isLatest, isPreview, firstDocHref });
  }

  return result;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'KubeBlocks Documentation',
  description: PAGE_DESCRIPTION,
  url: toAbsoluteUrl('/docs'),
  publisher: {
    '@type': 'Organization',
    name: 'KubeBlocks',
    url: 'https://kubeblocks.io',
  },
};

export default async function DocsRootPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const versions = await getVersions(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          KubeBlocks Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={6} maxWidth={640}>
          {PAGE_DESCRIPTION}
        </Typography>

        <Grid container spacing={3}>
          {versions.map((v) => (
            <Grid key={v.version} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardActionArea
                  component={Link}
                  href={v.firstDocHref ?? `/docs/${v.version}`}
                  sx={{ height: '100%', alignItems: 'flex-start' }}
                >
                  <CardContent>
                    <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                      <Typography variant="h6" component="h2" fontWeight={600}>
                        {v.label}
                      </Typography>
                      {v.isLatest && (
                        <Chip label="Latest" color="primary" size="small" />
                      )}
                      {v.isPreview && (
                        <Chip label="Preview" color="warning" size="small" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {v.isPreview
                        ? 'Upcoming release documentation — may contain unreleased features.'
                        : `Stable release documentation for KubeBlocks ${v.label}.`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
